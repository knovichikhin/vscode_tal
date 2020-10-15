"use strict";

import * as assert from "assert";
import * as vscode from "vscode";
import { TALParser } from "../../talengine/parser";
import { Token } from "../../talengine/tokens";

suite("TAL Engine Test", () => {
  const parser = new TALParser();
  const tokenSource = new vscode.CancellationTokenSource();
  const token = tokenSource.token;
  const testFilesPath = __dirname + "/../../../src/test/suite/talfoldingprovider";

  test("Engine - no ranges, comments_simple.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/comments_simple.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return parser.parse(doc).then((tokens: Token[]) => {
          assert.ok(tokens);
        });
      });
  });
});
