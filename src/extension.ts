"use strict";

import * as vscode from "vscode";
import { TALFoldingProvider } from "./foldingprovider";
import {
  TACLCompletionItemProvider,
  TALCompletionItemProviderContext,
} from "./keywordprovider";
import { getTALLanguageConfiguration } from "./languageconfiguration";
import { TALDocumentSemanticTokensProvider, TALSemanticTokensLegend } from "./semanticprovider";
import { TALDocumentSymbolProvider } from "./symbolprovider";
import { TALBackend } from "./talbackend/backend";

export function activate(context: vscode.ExtensionContext) {
  const talBackend = new TALBackend();

  if (vscode.workspace.getConfiguration("tal").get("enableDocumentSymbol") === true) {
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        "tal",
        new TALCompletionItemProviderContext(talBackend)
      )
    );

    context.subscriptions.push(
      vscode.languages.registerDocumentSemanticTokensProvider(
        "tal",
        new TALDocumentSemanticTokensProvider(talBackend),
        TALSemanticTokensLegend
      )
  );
  }

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      "tacl",
      new TACLCompletionItemProvider()
    )
  );

  if (vscode.workspace.getConfiguration("tal").get("enableDocumentSymbol") === true) {
    context.subscriptions.push(
      vscode.languages.registerDocumentSymbolProvider(
        "tal",
        new TALDocumentSymbolProvider(talBackend)
      )
    );
  }

  context.subscriptions.push(
    vscode.languages.registerFoldingRangeProvider(
      "tal",
      new TALFoldingProvider(talBackend)
    )
  );

  vscode.languages.setLanguageConfiguration("tal", getTALLanguageConfiguration());
}
