"use strict";

import * as vscode from "vscode";
import {
  taclBuiltinKeywords,
  talKeywordCompletionItems,
  talLibCompletionItems,
} from "./keywords";
import { TALBackend } from "./talbackend/backend";

export class TALCompletionItemProvider implements vscode.CompletionItemProvider {
  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    // Include TAL built-in functions if tal.enableTalFunctionCompletion is turned on
    if (
      vscode.workspace.getConfiguration("tal").get("enableTalFunctionCompletion") === true
    ) {
      return talKeywordCompletionItems.concat(talLibCompletionItems);
    }

    return talKeywordCompletionItems;
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
