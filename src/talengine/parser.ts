"use strict";

import * as vscode from "vscode";
import { Lexer } from "./lexer";
import { Token, TokenType } from "./tokens";

interface CachedDocument {
  readonly version: number;
  readonly tokens: Token[];
}

class TokenCache {
  private cachedDocuments = new Map<string, CachedDocument>();

  public get(document: vscode.TextDocument): Token[] | undefined {
    const cachedDocument = this.cachedDocuments.get(document.uri.toString());

    if (cachedDocument) {
      // Invalidate cache on the same but edited document
      if (cachedDocument.version !== document.version) {
        this.cachedDocuments.delete(document.uri.toString());
        return undefined;
      }

      return cachedDocument.tokens;
    }

    return undefined;
  }

  public set(document: vscode.TextDocument, tokens: Token[]): void {
    this.cachedDocuments.set(document.uri.toString(), <CachedDocument>{
      version: document.version,
      tokens: tokens,
    });
  }
}

export class TALParser {
  private _cache = new TokenCache();
  public async parse(document: vscode.TextDocument): Promise<Token[]> {
    const lexer = new Lexer(document);
    const tokens: Array<Token> = [];
    let token: Token;

    const cached = this._cache.get(document);
    if (cached) {
      return cached;
    }
    do {
      token = lexer.getNextToken();
      //const line = document.lineAt(token.start.line).text;
      //console.error(line.substring(token.start.character, token.end.character + 1));
      tokens.push(token);
    } while (token.type !== TokenType.eof);

    this._cache.set(document, tokens);
    return tokens;
  }
}
