"use strict";

import * as antlr4ts from "antlr4ts";
import * as antlr4ts_tree from "antlr4ts/tree";
import * as c3 from "antlr4-c3";
import * as vscode from "vscode";
import { TALLexer } from "../talparser/TALLexer";
import { IdentifierContext, TALParser } from "../talparser/TALParser";
import { ProcIdentifierSymbol, TALSymbolTable } from "./symbol";
import { TALSourceListener as TALDetailsListener } from "./listener";
import { DocumentCache } from "./cache";
import { Parser } from "antlr4ts";

export class TALBackend {
  private talSymbolTable: TALSymbolTable | undefined;

  public readonly documentSymbolCache = new DocumentCache<vscode.DocumentSymbol[]>();
  public readonly foldingRangeCache = new DocumentCache<vscode.FoldingRange[]>();

  public getCodeCompletionCandidates(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const result: vscode.CompletionItem[] = [];

    const source = this.getLocalSource(document, position);
    if (source === "") return result;

    const inputStream = antlr4ts.CharStreams.fromString(source);
    const lexer = new TALLexer(inputStream);
    const tokenStream = new antlr4ts.CommonTokenStream(lexer);

    const parser = this.parse(tokenStream);

    const core = new c3.CodeCompletionCore(parser);
    core.showResult = true;
    core.ignoredTokens = new Set([
      -2, // An error in antlr4-c3
    ]);
    core.preferredRules = new Set([
      TALParser.RULE_forStatement,
      TALParser.RULE_doStatement,
      TALParser.RULE_ifStatement,
    ]);

    // Search the token index which covers cursor position.
    console.time("fill");
    tokenStream.fill();
    console.timeEnd("fill");

    let index = 0;
    for (; ; index++) {
      const token = tokenStream.get(index);
      //console.log(token.text + " - " + token.line + ":" + token.charPositionInLine);
      if (token.type === antlr4ts.Token.EOF || token.line > position.line + 1) {
        break;
      }

      if (token.line === position.line + 1) {
        const length = token.text?.length || 0;
        if (token.charPositionInLine + length >= position.character) {
          break;
        }
      }
    }

    const candidates = core.collectCandidates(index);
    candidates.rules.forEach((callStack, key) => {
      console.log(document.version + " R: " + parser.ruleNames[key]);
      switch(key) {
        case TALParser.RULE_forStatement: {
          result.push(new vscode.CompletionItem("for", vscode.CompletionItemKind.Keyword));
          break;
        }

        case TALParser.RULE_ifStatement: {
          result.push(new vscode.CompletionItem("if", vscode.CompletionItemKind.Keyword));
          break;
        }

        case TALParser.RULE_doStatement: {
          result.push(new vscode.CompletionItem("do", vscode.CompletionItemKind.Keyword));
          break;
        }
      }
    });

    //this.talSymbolTable?.getAllSymbols(ProcIdentifierSymbol).forEach((s) => {
    //  result.push(new vscode.CompletionItem(s.name, vscode.CompletionItemKind.Class));
    //});

    return result;
  }

  private parse(tokenStream: antlr4ts.CommonTokenStream): TALParser {
    const parser = new TALParser(tokenStream);
    this.talSymbolTable = new TALSymbolTable();
    console.time("parse");
    this.talSymbolTable.tree = parser.program();
    console.timeEnd("parse");

    //console.time("parse1");
    //const listener = new TALDetailsListener(this.talSymbolTable);
    //antlr4ts_tree.ParseTreeWalker.DEFAULT.walk(
    //  listener as antlr4ts_tree.ParseTreeListener,
    //  this.talSymbolTable.tree
    //);
    //console.timeEnd("parse1");
    return parser;
  }

  private getLocalSource(
    document: vscode.TextDocument,
    position: vscode.Position
  ): string {
    let result = "";
    const cached = this.documentSymbolCache.get(document, true);
    if (cached) {
      for(const i of cached) {
        if (i.range.contains(position)) {
          result = document.getText(i.range);
          break;
        }
      }
    }

    return result;
  }
}
