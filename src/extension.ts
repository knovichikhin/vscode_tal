"use strict";

import * as vscode from "vscode";
import { TALFoldingProvider } from "./foldingprovider";
import { TACLCompletionItemProvider, TALCompletionItemProvider } from "./keywordprovider";
import { getTALLanguageConfiguration } from "./languageconfiguration";
import { TALDocumentSymbolProvider } from "./symbolprovider";

export function activate(context: vscode.ExtensionContext) {
  if (
    vscode.workspace.getConfiguration("tal").get("enableTalFunctionCompletion") === true
  ) {
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        "tal",
        new TALCompletionItemProvider()
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
        new TALDocumentSymbolProvider()
      )
    );
  }

  context.subscriptions.push(
    vscode.languages.registerFoldingRangeProvider("tal", new TALFoldingProvider())
  );

  vscode.languages.setLanguageConfiguration("tal", getTALLanguageConfiguration());
}
