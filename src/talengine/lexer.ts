// Tokenizer for a TAL vscode.Document

"use strict";

import * as vscode from "vscode";
import { Token, TokenType } from "./tokens";
import { isWhiteSpace } from "./utils";

export class Lexer {
  private document: vscode.TextDocument;
  private charPos: number; // char pos in a line
  private lineNum: number; // line pos in a doc
  private lineText: string; // doc line
  private eof: boolean;

  constructor(document: vscode.TextDocument) {
    this.document = document;
    this.charPos = 0;
    this.lineNum = 0;
    this.lineText = this.document.lineAt(this.lineNum).text;
    this.eof = false;
  }

  public getNextToken(): Token {
    let token = new Token(
      TokenType.eof,
      new vscode.Position(this.lineNum, this.charPos),
      new vscode.Position(this.lineNum, this.charPos)
    );

    for (; ; this.advance()) {
      // EOF
      if (this.eof) {
        token = new Token(
          TokenType.eof,
          new vscode.Position(this.lineNum, this.charPos),
          new vscode.Position(this.lineNum, this.charPos)
        );
        break;
      }

      // Skip whitespace
      while (isWhiteSpace(this.lineText.charCodeAt(this.charPos) || -1)) {
        if (!this.advance()) break; // EOF
      }

      // Start/end comment `!`. Terminated by ! or new line
      if (this.currChar() === "!") {
        token.type = TokenType.comment;
        token.start = new vscode.Position(this.lineNum, this.charPos);
        this.advance();

        while (this.currChar() !== "!" && token.start.line === this.lineNum) {
          if (!this.advance()) break; // EOF
        }

        if (token.start.line === this.lineNum) {
          // Closed by `!`
          token.end = new vscode.Position(this.lineNum, this.charPos);
          // advance past closing `!`
          this.advance();
        } else {
          // Closed by new line
          token.end = new vscode.Position(
            token.start.line,
            this.document.lineAt(token.start.line).text.length - 1
          );
        }
        break;
      }

      // Line comment `--`. Terminated by new line
      if (this.currChar(2) === "--") {
        token.type = TokenType.comment;
        token.start = new vscode.Position(this.lineNum, this.charPos);
        token.end = new vscode.Position(this.lineNum, this.lineText.length - 1);
        this.advanceNextLine();
        break;
      }

      // Operators
      if (this.isOperator(token)) {
        break;
      }
    }

    return token;
  }

  /**
   * Get current document character or optionally a slice
   * from the current line.
   * @param length number of characters to return. Default 1.
   * @returns current character or undefined if out of bound
   */
  private currChar(length = 1): string {
    return this.lineText.slice(this.charPos, this.charPos + length);
  }

  /**
   * Advance document position X number of characters
   * @param length number of characters to advance. Default 1.
   * @returns true if reachable or false if EOF
   */
  private advance(length = 1): boolean {
    while (length > 0) {
      if (this.charPos + length < this.lineText.length) {
        // Advance current line
        this.charPos += length;
        length = 0;
      } else if (this.lineNum + 1 < this.document.lineCount) {
        // Advance to the next line, count empty line as 1 character.
        if (this.lineText.length === this.charPos) {
          length -= 1;
        } else {
          length -= this.lineText.length - this.charPos;
        }
        this.lineText = this.document.lineAt(++this.lineNum).text;
        this.charPos = 0;
      } else {
        // EOF, point to the last valid position
        this.charPos = Math.abs(this.lineText.length - 1);
        this.eof = true;
        return false;
      }
    }

    return true;
  }

  /**
   * Advance document to the next line
   * @returns true if reachable or false if EOF
   */
  private advanceNextLine(): boolean {
    if (this.lineNum < this.document.lineCount) {
      this.lineText = this.document.lineAt(++this.lineNum).text;
      this.charPos = 0;
      return true;
    }

    // EOF, point to the last valid position
    this.charPos = Math.abs(this.lineText.length - 1);
    this.eof = true;
    return false;
  }

  private isOperator(token: Token): boolean {
    return false;
  }
}
