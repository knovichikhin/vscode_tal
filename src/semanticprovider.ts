"use strict";

import * as vscode from "vscode";
import {
  AbstractParseTreeVisitor,
  TerminalNode,
  ParseTree,
  RuleNode,
  ErrorNode,
} from "antlr4ts/tree";
import { ProcDeclarationContext } from "./talparser/TALParser";
import { TALVisitor } from "./talparser/TALVisitor";
import { TALBackend } from "./talbackend/backend";

/*
export class TALDocumentSemanticTokensProvider
  implements vscode.DocumentSemanticTokensProvider {
  private _cache = new DocumentCache<vscode.SemanticTokens>();
  private parser: TALParser;

  constructor(parser: TALParser) {
    this.parser = parser;
  }

  async provideDocumentSemanticTokens(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): Promise<vscode.SemanticTokens> {
    const cached = this._cache.get(document);
    if (cached) {
      return cached[0];
    }

    //const tokens = await this.parser.parse(document);

    //const allTokens = this._parseText(document.getText());
    const builder = new vscode.SemanticTokensBuilder(TALSemanticTokensLegend);
    //allTokens.forEach((token) => {
    //    builder.push(token.line, token.startCharacter, token.length, this._encodeTokenType(token.tokenType), this._encodeTokenModifiers(token.tokenModifiers));
    //});
    const result = builder.build();

    this._cache.set(document, new Array(result));
    return result;
  }
}
*/

class SemanticTALVisitor
  extends AbstractParseTreeVisitor<void>
  implements TALVisitor<void> {
  public defaultResult(): void {
    console.log("defaultResult");
  }
  public visitProcDeclaration(ctx: ProcDeclarationContext) {
    console.log(ctx.text);
  }
}

export class TALDocumentSemanticTokensProvider
  implements vscode.DocumentSemanticTokensProvider {
  public constructor(private backend: TALBackend) {}

  async provideDocumentSemanticTokens(
    document: vscode.TextDocument,
    _: vscode.CancellationToken
  ): Promise<vscode.SemanticTokens> {
    console.log("semantic provide: " + document.version);
    this.backend.getSemanticTokens(document);
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
