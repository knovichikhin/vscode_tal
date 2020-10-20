"use strict";

import * as vscode from "vscode";
import { TALFoldingProvider } from "./foldingprovider";
import { TACLCompletionItemProvider, TALCompletionItemProvider } from "./keywordprovider";
import { getTALLanguageConfiguration } from "./languageconfiguration";
import {
  TALDocumentSemanticTokensProvider,
  TALSemanticTokensLegend,
} from "./semanticprovider";
import { TALDocumentSymbolProvider } from "./symbolprovider";
import { TALParser } from "./talengine/parser";

export function activate(context: vscode.ExtensionContext) {
  const talParser = new TALParser();

  const talCompletionItemProvider = vscode.languages.registerCompletionItemProvider(
    "tal",
    new TALCompletionItemProvider()
  );
  context.subscriptions.push(talCompletionItemProvider);

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

  const talDocumentSemanticTokensProvider = vscode.languages.registerDocumentSemanticTokensProvider(
    "tal",
    new TALDocumentSemanticTokensProvider(talParser),
    TALSemanticTokensLegend
  );
  context.subscriptions.push(talDocumentSemanticTokensProvider);

  vscode.languages.setLanguageConfiguration("tal", getTALLanguageConfiguration());
}
