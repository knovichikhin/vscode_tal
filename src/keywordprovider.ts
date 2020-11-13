"use strict";

import * as vscode from "vscode";
import { TALBackend } from "./talbackend/backend";
import { taclBuiltinKeywords, talLibCompletionItems } from "./keywords";

export class TALCompletionItemProvider implements vscode.CompletionItemProvider {
  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    return talLibCompletionItems;
  }
}

export class TACLCompletionItemProvider implements vscode.CompletionItemProvider {
  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    return taclBuiltinKeywords;
  }
}

export class TALCompletionItemProviderContext implements vscode.CompletionItemProvider {
  public constructor(private backend: TALBackend) {}

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    const result = this.backend.getCodeCompletionCandidates(document, position);
    return result;
  }
}
