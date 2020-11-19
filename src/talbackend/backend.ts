"use strict";

import * as antlr4ts from "antlr4ts";
import * as c3 from "antlr4-c3";
import * as vscode from "vscode";
import { TALLexer } from "../talparser/TALLexer";
import { TALParser } from "../talparser/TALParser";
import { DocumentCache } from "./cache";
import { computeTokenIndex } from "./tokenposition";
import { TALSymbolTableVisitor } from "./visitor";

interface ILocalSource {
  source: string;
  position: vscode.Position;
}

export class TALBackend {
  private readonly preferredRules = new Set([
    TALParser.RULE_forKeyword,
    TALParser.RULE_toKeyword,
    TALParser.RULE_byKeyword,
    TALParser.RULE_ifKeyword,
    TALParser.RULE_thenKeyword,
    TALParser.RULE_elseKeyword,
    TALParser.RULE_caseKeyword,
    TALParser.RULE_ofKeyword,
    TALParser.RULE_otherwiseKeyword,
    TALParser.RULE_beginKeyword,
    TALParser.RULE_endKeyword,
    TALParser.RULE_callKeyword,
    TALParser.RULE_doKeyword,
    TALParser.RULE_dropKeyword,
    TALParser.RULE_procKeyword,
    TALParser.RULE_subprocKeyword,
    TALParser.RULE_returnKeyword,
    TALParser.RULE_scanKeyword,
    TALParser.RULE_untilKeyword,
    TALParser.RULE_useKeyword,
    TALParser.RULE_whileKeyword,
  ]);
  public readonly documentSymbolCache = new DocumentCache<vscode.DocumentSymbol[]>();
  public readonly foldingRangeCache = new DocumentCache<vscode.FoldingRange[]>();

  public getSemanticTokens(
    document: vscode.TextDocument,
  ): void {
    const inputStream = antlr4ts.CharStreams.fromString(document.getText());
    const lexer = new TALLexer(inputStream);
    const tokenStream = new antlr4ts.CommonTokenStream(lexer);
    const parser = new TALParser(tokenStream);
    const tree = parser.program();
    const symbolTable = new TALSymbolTableVisitor().visit(tree);
  }

  public getCodeCompletionCandidates(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const result: vscode.CompletionItem[] = [];

    const scope = this.getLocalSource(document, position);
    if (scope === undefined) {
      return result;
    }

    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    //const lines = scope.source.split(/\r?\n/);
    //for (let i = 0; i < lines.length; i++) console.log(i + ": " + lines[i]);
    //console.log("old pos line: " + document.lineAt(position.line).text);
    //console.log("old pos l/cl: " + position.line + ":" + position.character);
    //console.log("new pos line: " + lines[scope.position.line]);
    //console.log("new pos l/cl: " + scope.position.line + ":" + scope.position.character);
    //console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

    const inputStream = antlr4ts.CharStreams.fromString(scope.source);
    const lexer = new TALLexer(inputStream);
    const tokenStream = new antlr4ts.CommonTokenStream(lexer);
    const parser = new TALParser(tokenStream);
    const tree = parser.program();

    // Find cursor token position. In ANTLR line position starts at 1.
    // Advance VSC position by 1 to fit ANTLR.
    const index = computeTokenIndex(tree, scope.position.translate(1));
    if (index === undefined) {
      return result;
    }

    const core = new c3.CodeCompletionCore(parser);
    //core.showResult = true;
    core.preferredRules = this.preferredRules;

    const candidates = core.collectCandidates(index);
    this.getCodeCompletionCandidatesItems(result, candidates);

    return result;
  }

  private getCodeCompletionCandidatesItems(
    items: vscode.CompletionItem[],
    candidates: c3.CandidatesCollection
  ): void {
    candidates.rules.forEach((callStack, key) => {
      switch (key) {
        // For statement
        case TALParser.RULE_forKeyword:
          items.push(new vscode.CompletionItem("for", vscode.CompletionItemKind.Keyword));
          break;
        case TALParser.RULE_toKeyword:
          items.push(new vscode.CompletionItem("to", vscode.CompletionItemKind.Keyword));
          items.push(
            new vscode.CompletionItem("downto", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_byKeyword:
          items.push(new vscode.CompletionItem("by", vscode.CompletionItemKind.Keyword));
          break;

        // If statement
        case TALParser.RULE_ifKeyword:
          items.push(new vscode.CompletionItem("if", vscode.CompletionItemKind.Keyword));
          break;
        case TALParser.RULE_thenKeyword:
          items.push(
            new vscode.CompletionItem("then", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_elseKeyword:
          items.push(
            new vscode.CompletionItem("else", vscode.CompletionItemKind.Keyword)
          );
          break;

        // Case statement
        case TALParser.RULE_caseKeyword:
          items.push(
            new vscode.CompletionItem("case", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_ofKeyword:
          items.push(new vscode.CompletionItem("of", vscode.CompletionItemKind.Keyword));
          break;
        case TALParser.RULE_otherwiseKeyword:
          items.push(
            new vscode.CompletionItem("otherwise", vscode.CompletionItemKind.Keyword)
          );
          break;

        // Misc
        case TALParser.RULE_beginKeyword:
          items.push(
            new vscode.CompletionItem("begin", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_endKeyword:
          items.push(new vscode.CompletionItem("end", vscode.CompletionItemKind.Keyword));
          break;
        case TALParser.RULE_callKeyword:
          items.push(
            new vscode.CompletionItem("call", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_doKeyword:
          items.push(new vscode.CompletionItem("do", vscode.CompletionItemKind.Keyword));
          break;
        case TALParser.RULE_dropKeyword:
          items.push(
            new vscode.CompletionItem("drop", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_procKeyword:
          items.push(
            new vscode.CompletionItem("proc", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_subprocKeyword:
          items.push(
            new vscode.CompletionItem("subproc", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_returnKeyword:
          items.push(
            new vscode.CompletionItem("return", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_scanKeyword:
          items.push(
            new vscode.CompletionItem("scan", vscode.CompletionItemKind.Keyword)
          );
          items.push(
            new vscode.CompletionItem("rscan", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_untilKeyword:
          items.push(
            new vscode.CompletionItem("until", vscode.CompletionItemKind.Keyword)
          );
          break;
        case TALParser.RULE_useKeyword:
          items.push(new vscode.CompletionItem("use", vscode.CompletionItemKind.Keyword));
          break;
        case TALParser.RULE_whileKeyword:
          items.push(
            new vscode.CompletionItem("while", vscode.CompletionItemKind.Keyword)
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

    // If the document does not have any ranges or the cursor is
    // before the first range get up to 300 lines before cursor
    if (
      !cached ||
      cached.length === 0 ||
      (cached.length > 0 && cached[0].range.start.isAfter(position))
    ) {
      const startPos = new vscode.Position(
        Math.max(0, position.line - this.MAX_SCOPE_LINES),
        0
      );
      const endPos = document.lineAt(position.line).range.end;

      return {
        source: document.getText(new vscode.Range(startPos, endPos)),
        position: position.translate(-startPos.line),
      };
    }

    // Source after the last region get the lines between cursor
    // and last range up to 300 lines
    if (cached[cached.length - 1].range.end.isBefore(position)) {
      const startPos = new vscode.Position(
        Math.max(
          cached[cached.length - 1].range.end.line + 1,
          position.line - this.MAX_SCOPE_LINES
        ),
        0
      );
      const endPos = document.lineAt(position.line).range.end;

      return {
        source: document.getText(new vscode.Range(startPos, endPos)),
        position: position.translate(-startPos.line),
      };
    }

    // Source from inside a region
    for (let i = 0; i < cached.length; i++) {
      if (cached[i].range.contains(position)) {
        return {
          source: document.getText(
            new vscode.Range(
              cached[i].range.start,
              document.lineAt(position.line).range.end
            )
          ),
          position: position.translate(-cached[i].range.start.line),
        };
      }
    }

    // Source from between regions up to 300 lines
    for (let i = 1; i < cached.length; i++) {
      if (
        cached[i - 1].range.end.isBefore(position) &&
        cached[i].range.start.isAfter(position)
      ) {
        const startPos = new vscode.Position(
          Math.max(
            cached[i - 1].range.end.line + 1,
            position.line - this.MAX_SCOPE_LINES
          ),
          0
        );
        const endPos = document.lineAt(position.line).range.end;

        return {
          source: document.getText(new vscode.Range(startPos, endPos)),
          position: position.translate(-startPos.line),
        };
      }
    }

    return undefined;
  }
}
