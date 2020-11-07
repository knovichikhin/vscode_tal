"use strict";

import * as antlr4ts from "antlr4ts";
import * as antlr4ts_tree from "antlr4ts/tree";
import * as c3 from "antlr4-c3";
import * as vscode from "vscode";
import { TALLexer } from "../talparser/TALLexer";
import { IdentifierContext, TALParser } from "../talparser/TALParser";
import { ProcIdentifierSymbol, TALSymbolTable } from "./symbol";
import { TALSourceListener as TALDetailsListener } from "./listener";

export class TALBackend {
  private talSymbolTable = new TALSymbolTable();

  private parse(tokenStream: antlr4ts.CommonTokenStream): TALParser {
    const parser = new TALParser(tokenStream);
    this.talSymbolTable.clear();
    this.talSymbolTable.tree = parser.program();

    const listener = new TALDetailsListener(this.talSymbolTable);
    antlr4ts_tree.ParseTreeWalker.DEFAULT.walk(
      listener as antlr4ts_tree.ParseTreeListener,
      this.talSymbolTable.tree
    );
    return parser;
  }

  public getCodeCompletionCandidates(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const result: vscode.CompletionItem[] = [];

    const inputStream = antlr4ts.CharStreams.fromString(document.getText());
    const lexer = new TALLexer(inputStream);
    const tokenStream = new antlr4ts.CommonTokenStream(lexer);

    const parser = this.parse(tokenStream);

    const core = new c3.CodeCompletionCore(parser);
    //core.showResult = true;
    core.ignoredTokens = new Set([
      -2, // An error in antlr4-c3
    ]);
    core.preferredRules = new Set([TALParser.RULE_statement]);

    // Search the token index which covers cursor position.
    tokenStream.fill();
    let index = 0;
    for (; ; index++) {
      const token = tokenStream.get(index);
      const t = token.text;
      //console.log(
      //  "For: " + token.text + " " + token.line + ":" + token.charPositionInLine
      //);
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
      console.log("R: " + parser.ruleNames[key]);
    });

    this.talSymbolTable.getAllSymbols(ProcIdentifierSymbol).forEach((s) => {
      result.push(new vscode.CompletionItem(s.name, vscode.CompletionItemKind.Class));
    });

    return result;
  }
}
