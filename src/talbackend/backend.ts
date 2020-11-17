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
    console.log("pos: " + scope.position.line);
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

    const inputStream = antlr4ts.CharStreams.fromString(scope.source);
    const lexer = new TALLexer(inputStream);
    const tokenStream = new antlr4ts.CommonTokenStream(lexer);

    console.time("parse");
    const parser = new TALParser(tokenStream);
    const tree = parser.program();
    console.timeEnd("parse");

    // Alternate search
    console.time("altFill");
    const index = computeTokenIndex(tree, scope.position.translate(1));
    console.timeEnd("altFill");
    if (index === undefined) {
      return result;
    }
    const token = tokenStream.get(index);
    console.log(
      index + ">>" + token.text + " - " + token.line + ":" + token.charPositionInLine
    );

    const core = new c3.CodeCompletionCore(parser);
    //core.showResult = true;
    core.preferredRules = new Set([
      TALParser.RULE_forStatementForKeyword,
      TALParser.RULE_forStatementToKeyword,
      TALParser.RULE_forStatementByKeyword,
      TALParser.RULE_forStatementDoKeyword,
      TALParser.RULE_ifStatementIfKeyword,
      TALParser.RULE_ifStatementThenKeyword,
      TALParser.RULE_ifStatementElseKeyword,
    ]);

    const candidates = core.collectCandidates(index);
    this.getCodeCompletionCandidatesItems(result, candidates);

    candidates.rules.forEach((callStack, key) => {
      console.log(document.version + " R: " + parser.ruleNames[key]);
    });

    //this.talSymbolTable?.getAllSymbols(ProcIdentifierSymbol).forEach((s) => {
    //  result.push(new vscode.CompletionItem(s.name, vscode.CompletionItemKind.Class));
    //});

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

  // Get source local to cursor position
  // Adjust document position to point to local position
  private getLocalSource(
    document: vscode.TextDocument,
    position: vscode.Position
  ): ILocalSource | undefined {
    let result = undefined;

    const cached = this.documentSymbolCache.get(document, true);
    if (cached) {
      for (let i = 0; i < cached.length; i++) {
        if (cached[i].range.contains(position)) {
          result = {
            source: document.getText(cached[i].range),
            position: position.translate(-cached[i].range.start.line),
          };
          break;
        }
      }
    }

    return result;
  }
}
