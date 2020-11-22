"use strict";

import * as vscode from "vscode";
import { TALBackend } from "./talbackend/backend";

export class TALDocumentSemanticTokensProvider
  implements vscode.DocumentSemanticTokensProvider {
  public constructor(private backend: TALBackend) {}

  async provideDocumentSemanticTokens(
    document: vscode.TextDocument,
    _: vscode.CancellationToken
  ): Promise<vscode.SemanticTokens> {
    //this.backend.getSemanticTokens(document);
    const builder = new vscode.SemanticTokensBuilder(TALSemanticTokensLegend);
    const result = builder.build();
    return result;
  }
}

const tokenTypes = new Map<string, number>();
const tokenModifiers = new Map<string, number>();

export const TALSemanticTokensLegend = (function () {
  const tokenTypesLegend = [
    "comment",
    "string",
    "keyword",
    "number",
    "regexp",
    "operator",
    "namespace",
    "type",
    "struct",
    "class",
    "interface",
    "enum",
    "typeParameter",
    "function",
    "member",
    "macro",
    "variable",
    "parameter",
    "property",
    "label",
  ];
  tokenTypesLegend.forEach((tokenType, index) => tokenTypes.set(tokenType, index));

  const tokenModifiersLegend = [
    "declaration",
    "documentation",
    "readonly",
    "static",
    "abstract",
    "deprecated",
    "modification",
    "async",
    "defaultLibrary",
  ];
  tokenModifiersLegend.forEach((tokenModifier, index) =>
    tokenModifiers.set(tokenModifier, index)
  );

  return new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);
})();
