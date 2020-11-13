/**
 * VSCode requests results every time user selects a document.
 * E.g. assume active document is Foo.tal. VSCode will request results
 * if user selects Bar.tal and then again when user selects Foo.tal.
 * Meanwhile, both documents are unchanged.
 * Cache class implements a simple caching mechanism where it
 * provides already computed results for the same unchanged document
 * based on document URI.
 * Cache class uses document version to invalidate cache.
 */

"use strict";

import * as vscode from "vscode";

interface CachedDocument<T> {
  readonly version: number;
  readonly cache: T;
}

export class DocumentCache<T> {
  private cachedDocuments = new Map<string, CachedDocument<T>>();

  public get(document: vscode.TextDocument, latest = false): T | undefined {
    const cachedDocument = this.cachedDocuments.get(document.uri.toString());

    if (cachedDocument) {
      if (cachedDocument.version !== document.version) {
        if (latest) {
          return cachedDocument.cache;
        }
        return undefined;
      }

      return cachedDocument.cache;
    }

    return undefined;
  }

  public set(document: vscode.TextDocument, cache: T): void {
    this.cachedDocuments.set(document.uri.toString(), <CachedDocument<T>>{
      version: document.version,
      cache: cache,
    });
  }

  public del(document: vscode.TextDocument): void {
    this.cachedDocuments.delete(document.uri.toString());
  }
}
