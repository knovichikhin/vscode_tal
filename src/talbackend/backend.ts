"use strict";
import * as antlr4ts from "antlr4ts";
import * as antlr4ts_c3 from "antlr4-c3";
import * as vscode from "vscode";
import { TALLexer } from "../talparser/TALLexer";
import { IdentifierContext, TALParser } from "../talparser/TALParser";
import { Token } from "antlr4ts";
import { CandidatesCollection } from "antlr4-c3";

export class TALBackend {
  public getCodeCompletionCandidates(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const result: vscode.CompletionItem[] = [];

    const inputStream = antlr4ts.CharStreams.fromString(document.getText());
    const lexer = new TALLexer(inputStream);
    const tokenStream = new antlr4ts.CommonTokenStream(lexer);

    const parser = new TALParser(tokenStream);
    parser.removeErrorListeners();
    const tree = parser.program();

    const core = new antlr4ts_c3.CodeCompletionCore(parser);
    core.ignoredTokens = new Set([
      -2, // An error in antlr4-c3
    ]);
    core.preferredRules = new Set([
        TALParser.RULE_procDeclaration,
        TALParser.RULE_procInvocation,
        TALParser.RULE_identifier,
    ]);

    // Search the token index which covers cursor position.
    tokenStream.fill();
    let index = 0;
    for (; ; index++) {
      const token = tokenStream.get(index);
      //console.log("For: " + token.text);
      if (token.type === Token.EOF || token.line > position.line + 1) {
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
    console.log(candidates.rules.size, candidates.tokens.size);
    candidates.tokens.forEach((following: number[], type: number) => {
      console.log(
        "T: " +
          parser.vocabulary.getSymbolicName(type) +
          ", " +
          parser.vocabulary.getDisplayName(type)
      );
      following.forEach((i) => {
        console.log(
          "  >" +
            parser.vocabulary.getSymbolicName(type) +
            ", " +
            parser.vocabulary.getDisplayName(type)
        );
      });
      switch (type) {
        case TALLexer.FORWARD:
        case TALLexer.EXTERNAL:
        case TALLexer.CALL:
        case TALLexer.DO:
        case TALLexer.UNTIL:
        case TALLexer.FOR:
        case TALLexer.TO:
        case TALLexer.DOWNTO:
        case TALLexer.BY:
        case TALLexer.IF:
        case TALLexer.THEN:
        case TALLexer.RETURN:
        case TALLexer.SCAN:
        case TALLexer.RSCAN:
        case TALLexer.USE:
        case TALLexer.WHILE: {
          result.push(
            new vscode.CompletionItem(
              parser.vocabulary.getDisplayName(type).toLowerCase(),
              vscode.CompletionItemKind.User
            )
          );
          break;
        }
        
        default: {
            break;
        }
      }
    });

    candidates.rules.forEach((callStack, key) => {
      console.log("R: " + parser.vocabulary.getDisplayName(key) + callStack);
    });

    return result;
  }
}
