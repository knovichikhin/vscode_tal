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
  readonly cache: Array<T>;
}

export class DocumentCache<T> {
  private cachedDocuments = new Map<string, CachedDocument<T>>();

  public get(document: vscode.TextDocument): Array<T> | undefined {
    const cachedDocument = this.cachedDocuments.get(document.uri.toString());

    if (cachedDocument) {
      // Invalidate cache on the same but edited document
      if (cachedDocument.version !== document.version) {
        this.cachedDocuments.delete(document.uri.toString());
        return undefined;
      }

      return cachedDocument.cache;
    }

    return undefined;
  }

  public set(document: vscode.TextDocument, cache: Array<T>): void {
    this.cachedDocuments.set(document.uri.toString(), <CachedDocument<T>>{
      version: document.version,
      cache: cache,
    });
  }
}
