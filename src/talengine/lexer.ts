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
      TokenType.eofmarker,
      new vscode.Position(this.lineNum, this.charPos),
      new vscode.Position(this.lineNum, this.charPos)
    );

    for (; ; this.advance()) {
      this.skipCommentsWhitespace();

      // EOF
      if (this.eof) {
        token = new Token(
          TokenType.eofmarker,
          new vscode.Position(this.lineNum, this.charPos),
          new vscode.Position(this.lineNum, this.charPos)
        );
        break;
      }

      if (this.isNumber(token)) {
        break;
      }
    }

    return token;
  }

  /**
   * Get number of characters from the current line
   * from the current line.
   * @param length number of characters to return. Default 1.
   * @returns current character or empty string if out of bound
   */
  private charSpan(length = 1): string {
    const span = this.lineText.slice(this.charPos, this.charPos + length);
    return span.length === length ? span : "";
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

  private skipCommentsWhitespace(): void {
    for (;;) {
      // Skip whitespace
      while (isWhiteSpace(this.lineText.charCodeAt(this.charPos) || -1)) {
        if (!this.advance()) return; // EOF
      }

      // Start/end comment `!`. Terminated by ! or new line
      if (this.charSpan() === "!") {
        const saveLineNum = this.lineNum;
        this.advance();

        while (this.charSpan() !== "!" && saveLineNum === this.lineNum) {
          if (!this.advance()) return; // EOF
        }

        if (saveLineNum === this.lineNum) {
          // advance past closing `!`
          this.advance();
        }
      }

      // Line comment `--`. Terminated by new line
      if (this.charSpan(2) === "--") {
        if (!this.advanceNextLine()) return; // EOF
      }

      if (
        this.charSpan() !== "!" &&
        this.charSpan(2) !== "--" &&
        !isWhiteSpace(this.lineText.charCodeAt(this.charPos) || -1)
      ) {
        return; // Non-comment or whitespace
      }
    }
  }

  private isOperator(token: Token): boolean {
    return false;
  }

  // Return a number
  private numberRe = new RegExp(
    /((%h[0-9a-fA-F]([0-9a-fA-F]*)?)|(%[0-7]([0-7]*)?)|(%b[01]([01]*)?)|(\b([0-9]([0-9]*)?\.?[0-9]*([0-9]*)?)|(\.[0-9]([0-9]*)?))((e|l)(\+|-)?[0-9]([0-9]*)?)?)(d|%d|f|%f)?\b/.source,
    "i"
  );
  private isNumber(token: Token): boolean {
    let numLen = 0;

    switch (this.charSpan(2).toLowerCase()) {
      // Hex or binary
      case "%b":
      case "%h":
        if (!this.numberRe.test(this.charSpan(3))) {
          token.start = new vscode.Position(this.lineNum, this.charPos);
          token.end = new vscode.Position(this.lineNum, this.charPos + 2);
          token.type = TokenType.invalidNumber;
          this.advance(2);
          return true;
        }

        for (numLen = 4; this.numberRe.test(this.charSpan(numLen)); numLen++);
        token.start = new vscode.Position(this.lineNum, this.charPos);
        token.end = new vscode.Position(this.lineNum, this.charPos + numLen - 1);
        token.type = TokenType.number;
        this.advance(numLen - 1);
        return true;

      default:
        break;
    }

    switch (this.charSpan()) {
      // Octal. Make sure there is at least 2 characters
      // available. Then fall through to check the number.
      case "%":
        if (!this.numberRe.test(this.charSpan(2))) {
          token.start = new vscode.Position(this.lineNum, this.charPos);
          token.end = new vscode.Position(this.lineNum, this.charPos + 1);
          token.type = TokenType.invalidNumber;
          this.advance(1);
          return true;
        }

        for (numLen = 3; this.numberRe.test(this.charSpan(numLen)); numLen++);
        token.start = new vscode.Position(this.lineNum, this.charPos);
        token.end = new vscode.Position(this.lineNum, this.charPos + numLen - 1);
        token.type = TokenType.number;
        this.advance(numLen - 1);
        return true;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (numLen = 2; this.numberRe.test(this.charSpan(numLen)); numLen++);
        token.start = new vscode.Position(this.lineNum, this.charPos);
        token.end = new vscode.Position(this.lineNum, this.charPos + numLen - 1);
        token.type = TokenType.number;
        this.advance(numLen - 1);
        return true;

      default:
        break;
    }

    return false;
  }

  private isID(token: Token): boolean {
    return false;
  }
}
