"use strict";

import * as vscode from "vscode";
import { TALFoldingProvider } from "./foldingprovider";
import {
  TACLCompletionItemProvider,
  TALCompletionItemProvider,
  TALCompletionItemProviderContext,
} from "./keywordprovider";
import { getTALLanguageConfiguration } from "./languageconfiguration";
import { TALDocumentSymbolProvider } from "./symbolprovider";
import { TALBackend } from "./talbackend/backend";

export function activate(context: vscode.ExtensionContext) {
  const talBackend = new TALBackend();

  const talCompletionItemProvider = vscode.languages.registerCompletionItemProvider(
    "tal",
    new TALCompletionItemProvider()
  );
  context.subscriptions.push(talCompletionItemProvider);

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      "tal",
      new TALCompletionItemProviderContext(talBackend),
      " ",
      ".",
      "@",
      "(",
      "[",
    )
  );

  const taclCompletionItemProvider = vscode.languages.registerCompletionItemProvider(
    "tacl",
    new TACLCompletionItemProvider()
  );
  context.subscriptions.push(taclCompletionItemProvider);

  // Register document breadcrumbs provider if tal.enableDocumentSymbol is turned on
  if (vscode.workspace.getConfiguration("tal").get("enableDocumentSymbol") === true) {
    const talSymbolProvider = vscode.languages.registerDocumentSymbolProvider(
      "tal",
      new TALDocumentSymbolProvider()
    );
    context.subscriptions.push(talSymbolProvider);
  }

  const talFoldingProvider = vscode.languages.registerFoldingRangeProvider(
    "tal",
    new TALFoldingProvider()
  );
  context.subscriptions.push(talFoldingProvider);

  vscode.languages.setLanguageConfiguration("tal", getTALLanguageConfiguration());
}
