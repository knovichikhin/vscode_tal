"use strict";

import * as antlr4ts from "antlr4ts";
import * as c3 from "antlr4-c3";
import * as vscode from "vscode";
import { TALLexer } from "../talparser/TALLexer";
import { TALParser } from "../talparser/TALParser";
import { DocumentCache } from "./cache";
import { computeTokenIndex } from "./tokenposition";

interface ILocalSource {
  source: string;
  position: vscode.Position;
}

export class TALBackend {
  private readonly preferredRules = new Set([
    TALParser.RULE_forStatementForKeyword,
    TALParser.RULE_forStatementToKeyword,
    TALParser.RULE_forStatementByKeyword,
    TALParser.RULE_forStatementDoKeyword,
    TALParser.RULE_ifStatementIfKeyword,
    TALParser.RULE_ifStatementThenKeyword,
    TALParser.RULE_ifStatementElseKeyword,
  ]);
  public readonly documentSymbolCache = new DocumentCache<vscode.DocumentSymbol[]>();
  public readonly foldingRangeCache = new DocumentCache<vscode.FoldingRange[]>();

  public getCodeCompletionCandidates(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const result: vscode.CompletionItem[] = [];

    const scope = this.getLocalSource(document, position);
    if (scope === undefined) {
      return result;
    }

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const lines = scope.source.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) console.log(i + ": " + lines[i]);
    console.log("old pos line: " + document.lineAt(position.line).text);
    console.log("old pos l/cl: " + position.line + ":" + position.character);
    console.log("new pos line: " + lines[scope.position.line]);
    console.log("new pos l/cl: " + scope.position.line + ":" + scope.position.character);
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

    const inputStream = antlr4ts.CharStreams.fromString(scope.source);
    const lexer = new TALLexer(inputStream);
    const tokenStream = new antlr4ts.CommonTokenStream(lexer);

//    console.time(">> parse");
    const parser = new TALParser(tokenStream);
    const tree = parser.program();
//    console.timeEnd(">> parse");

    const index = computeTokenIndex(tree, scope.position.translate(1));
    if (index === undefined) {
      return result;
    }
    const token = tokenStream.get(index);
    console.log(
      index + ">>" + token.text + " - " + token.line + ":" + token.charPositionInLine
    );

    const core = new c3.CodeCompletionCore(parser);
    //core.showResult = true;
    core.preferredRules = this.preferredRules;

    const candidates = core.collectCandidates(index);
    this.getCodeCompletionCandidatesItems(result, candidates);

    candidates.rules.forEach((callStack, key) => {
      console.log(document.version + " R: " + parser.ruleNames[key]);
    });

    return result;
  }

  private getCodeCompletionCandidatesItems(
    items: vscode.CompletionItem[],
    candidates: c3.CandidatesCollection
  ): void {
    candidates.rules.forEach((callStack, key) => {
      switch (key) {
        // For statement
        case TALParser.RULE_forStatementForKeyword:
          items.push(new vscode.CompletionItem("for", vscode.CompletionItemKind.Keyword));
          break;
        case TALParser.RULE_forStatementToKeyword:
          items.push(new vscode.CompletionItem("to", vscode.CompletionItemKind.Keyword));
          items.push(
            new vscode.CompletionItem("downto", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_forStatementByKeyword:
          items.push(new vscode.CompletionItem("by", vscode.CompletionItemKind.Keyword));
          break;
        case TALParser.RULE_forStatementDoKeyword:
          items.push(new vscode.CompletionItem("do", vscode.CompletionItemKind.Keyword));
          break;

        // If statement
        case TALParser.RULE_ifStatementIfKeyword:
          items.push(new vscode.CompletionItem("if", vscode.CompletionItemKind.Keyword));
          break;
        case TALParser.RULE_ifStatementThenKeyword:
          items.push(
            new vscode.CompletionItem("then", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_ifStatementElseKeyword:
          items.push(
            new vscode.CompletionItem("else", vscode.CompletionItemKind.Keyword)
          );
          break;
      }
    });
  }

  // Return source local to cursor position and cursor position
  // adjusted relatively to the new source snipper.
  private readonly MAX_SCOPE_LINES = 300;
  private getLocalSource(
    document: vscode.TextDocument,
    position: vscode.Position
  ): ILocalSource | undefined {
    const cached = this.documentSymbolCache.get(document, true);

    // If the document does not have any ranges get up to 300 lines before cursor
    if (!cached || cached.length === 0) {
      const startPos = new vscode.Position(
        Math.max(0, position.line - this.MAX_SCOPE_LINES),
        0
      );
      const endPos = document.lineAt(position.line).range.end;
      const cursorPos = new vscode.Position(
        Math.max(0, position.line - this.MAX_SCOPE_LINES), // FIXME
        position.character
      );

      return {
        source: document.getText(
          document.validateRange(new vscode.Range(startPos, endPos))
        ),
        position: cursorPos,
      };
    }

    // Source before the first region.
    if (cached[0].range.start.isAfter(position)) {
      return {
        source: document.getText(
          new vscode.Range(new vscode.Position(0, 0), cached[0].range.start.translate(-1))
        ),
        position: position,
      };
    }

    // Source after the last region
    if (cached[cached.length - 1].range.start.isBefore(position)) {
      return {
        source: document.getText(
          new vscode.Range(
            cached[0].range.end.translate(1),
            document.lineAt(document.lineCount - 1).range.end
          )
        ),
        position: position,
      };
    }

    for (let i = 0; i < cached.length; i++) {
      // Source from inside a region
      if (cached[i].range.contains(position)) {
        return {
          source: document.getText(cached[i].range),
          position: position.translate(-cached[i].range.start.line),
        };
        break;
      }
    }

    return undefined;
  }
}
