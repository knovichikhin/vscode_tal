"use strict";

import * as assert from "assert";
import * as vscode from "vscode";
import { TALDocumentSymbolProvider } from "../../symbolprovider";

suite("TAL Symbol Provider Test", () => {
  const talSymbolProvider = new TALDocumentSymbolProvider();
  const tokenSource = new vscode.CancellationTokenSource();
  const token = tokenSource.token;
  const testFilesPath = __dirname + "/../../../src/test/suite/talsymbolprovider";

  test("Test empty file - no symbols, empty.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/empty.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 0);
          });
      });
  });

  test("Test happy procs scenarios, procs_happy.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/procs_happy.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 6);

            assert.strictEqual(symbols[0].children.length, 0);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[0].name, "test_1");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 2);

            assert.strictEqual(symbols[1].children.length, 0);
            assert.strictEqual(symbols[1].detail, "");
            assert.strictEqual(symbols[1].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[1].name, "test_2");
            assert.strictEqual(symbols[1].selectionRange.start.line, 3);
            assert.strictEqual(symbols[1].selectionRange.end.line, 3);
            assert.strictEqual(symbols[1].range.start.line, 3);
            assert.strictEqual(symbols[1].range.end.line, 8);

            assert.strictEqual(symbols[2].children.length, 0);
            assert.strictEqual(symbols[2].detail, "external");
            assert.strictEqual(symbols[2].kind, vscode.SymbolKind.Interface);
            assert.strictEqual(symbols[2].name, "test_external_1");
            assert.strictEqual(symbols[2].selectionRange.start.line, 9);
            assert.strictEqual(symbols[2].selectionRange.end.line, 9);
            assert.strictEqual(symbols[2].range.start.line, 9);
            assert.strictEqual(symbols[2].range.end.line, 9);

            assert.strictEqual(symbols[3].children.length, 0);
            assert.strictEqual(symbols[3].detail, "external");
            assert.strictEqual(symbols[3].kind, vscode.SymbolKind.Interface);
            assert.strictEqual(symbols[3].name, "test_external_2");
            assert.strictEqual(symbols[3].selectionRange.start.line, 10);
            assert.strictEqual(symbols[3].selectionRange.end.line, 10);
            assert.strictEqual(symbols[3].range.start.line, 10);
            assert.strictEqual(symbols[3].range.end.line, 14);

            assert.strictEqual(symbols[4].children.length, 0);
            assert.strictEqual(symbols[4].detail, "forward");
            assert.strictEqual(symbols[4].kind, vscode.SymbolKind.Interface);
            assert.strictEqual(symbols[4].name, "test_forward_1");
            assert.strictEqual(symbols[4].selectionRange.start.line, 15);
            assert.strictEqual(symbols[4].selectionRange.end.line, 15);
            assert.strictEqual(symbols[4].range.start.line, 15);
            assert.strictEqual(symbols[4].range.end.line, 15);

            assert.strictEqual(symbols[5].children.length, 0);
            assert.strictEqual(symbols[5].detail, "forward");
            assert.strictEqual(symbols[5].kind, vscode.SymbolKind.Interface);
            assert.strictEqual(symbols[5].name, "test_forward_2");
            assert.strictEqual(symbols[5].selectionRange.start.line, 16);
            assert.strictEqual(symbols[5].selectionRange.end.line, 16);
            assert.strictEqual(symbols[5].range.start.line, 16);
            assert.strictEqual(symbols[5].range.end.line, 20);
          });
      });
  });

  test("Test tricky procs scenarios, procs_tricky.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/procs_tricky.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 6);

            assert.strictEqual(symbols[0].children.length, 0);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[0].name, "test_contains_procs_inside_1");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 3);

            assert.strictEqual(symbols[1].children.length, 0);
            assert.strictEqual(symbols[1].detail, "");
            assert.strictEqual(symbols[1].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[1].name, "test_contains_procs_inside_2");
            assert.strictEqual(symbols[1].selectionRange.start.line, 4);
            assert.strictEqual(symbols[1].selectionRange.end.line, 4);
            assert.strictEqual(symbols[1].range.start.line, 4);
            assert.strictEqual(symbols[1].range.end.line, 7);

            assert.strictEqual(symbols[2].children.length, 0);
            assert.strictEqual(symbols[2].detail, "");
            assert.strictEqual(symbols[2].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[2].name, "test_ends_too_early");
            assert.strictEqual(symbols[2].selectionRange.start.line, 8);
            assert.strictEqual(symbols[2].selectionRange.end.line, 8);
            assert.strictEqual(symbols[2].range.start.line, 8);
            assert.strictEqual(symbols[2].range.end.line, 9);

            assert.strictEqual(symbols[3].children.length, 0);
            assert.strictEqual(symbols[3].detail, "");
            assert.strictEqual(symbols[3].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[3].name, "test_external_with_body");
            assert.strictEqual(symbols[3].selectionRange.start.line, 12);
            assert.strictEqual(symbols[3].selectionRange.end.line, 12);
            assert.strictEqual(symbols[3].range.start.line, 12);
            assert.strictEqual(symbols[3].range.end.line, 14);

            assert.strictEqual(symbols[4].children.length, 0);
            assert.strictEqual(symbols[4].detail, "");
            assert.strictEqual(symbols[4].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[4].name, "test_forward_with_body");
            assert.strictEqual(symbols[4].selectionRange.start.line, 16);
            assert.strictEqual(symbols[4].selectionRange.end.line, 16);
            assert.strictEqual(symbols[4].range.start.line, 16);
            assert.strictEqual(symbols[4].range.end.line, 18);

            assert.strictEqual(symbols[5].children.length, 0);
            assert.strictEqual(symbols[5].detail, "");
            assert.strictEqual(symbols[5].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[5].name, "test_end_of_file");
            assert.strictEqual(symbols[5].selectionRange.start.line, 20);
            assert.strictEqual(symbols[5].selectionRange.end.line, 20);
            assert.strictEqual(symbols[5].range.start.line, 20);
            assert.strictEqual(symbols[5].range.end.line, 20);
          });
      });
  });

  test("Test happy subprocs scenarios, subprocs_happy.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/subprocs_happy.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 1);

            assert.strictEqual(symbols[0].children.length, 4);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[0].name, "test_1");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 17);

            assert.strictEqual(symbols[0].children[0].children.length, 0);
            assert.strictEqual(symbols[0].children[0].detail, "");
            assert.strictEqual(symbols[0].children[0].kind, vscode.SymbolKind.Method);
            assert.strictEqual(symbols[0].children[0].name, "sub_test_1");
            assert.strictEqual(symbols[0].children[0].selectionRange.start.line, 2);
            assert.strictEqual(symbols[0].children[0].selectionRange.end.line, 2);
            assert.strictEqual(symbols[0].children[0].range.start.line, 2);
            assert.strictEqual(symbols[0].children[0].range.end.line, 4);

            assert.strictEqual(symbols[0].children[1].children.length, 0);
            assert.strictEqual(symbols[0].children[1].detail, "");
            assert.strictEqual(symbols[0].children[1].kind, vscode.SymbolKind.Method);
            assert.strictEqual(symbols[0].children[1].name, "sub_test_2");
            assert.strictEqual(symbols[0].children[1].selectionRange.start.line, 6);
            assert.strictEqual(symbols[0].children[1].selectionRange.end.line, 6);
            assert.strictEqual(symbols[0].children[1].range.start.line, 6);
            assert.strictEqual(symbols[0].children[1].range.end.line, 10);

            assert.strictEqual(symbols[0].children[2].children.length, 0);
            assert.strictEqual(symbols[0].children[2].detail, "");
            assert.strictEqual(symbols[0].children[2].kind, vscode.SymbolKind.Method);
            assert.strictEqual(symbols[0].children[2].name, "sub_test_3");
            assert.strictEqual(symbols[0].children[2].selectionRange.start.line, 12);
            assert.strictEqual(symbols[0].children[2].selectionRange.end.line, 12);
            assert.strictEqual(symbols[0].children[2].range.start.line, 12);
            assert.strictEqual(symbols[0].children[2].range.end.line, 15);

            assert.strictEqual(symbols[0].children[3].children.length, 0);
            assert.strictEqual(symbols[0].children[3].detail, "");
            assert.strictEqual(symbols[0].children[3].kind, vscode.SymbolKind.Function);
            assert.strictEqual(symbols[0].children[3].name, "main: " + symbols[0].name);
            assert.strictEqual(symbols[0].children[3].selectionRange.start.line, 16);
            assert.strictEqual(symbols[0].children[3].selectionRange.end.line, 16);
            assert.strictEqual(symbols[0].children[3].range.start.line, 16);
            assert.strictEqual(symbols[0].children[3].range.end.line, 17);
          });
      });
  });

  test("Test tricky subprocs scenarios, subprocs_tricky.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/subprocs_tricky.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 2);

            assert.strictEqual(symbols[0].children.length, 4);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[0].name, "test_1");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 28);

            assert.strictEqual(symbols[0].children[0].children.length, 0);
            assert.strictEqual(symbols[0].children[0].detail, "");
            assert.strictEqual(symbols[0].children[0].kind, vscode.SymbolKind.Method);
            assert.strictEqual(symbols[0].children[0].name, "sub_test_1");
            assert.strictEqual(symbols[0].children[0].selectionRange.start.line, 2);
            assert.strictEqual(symbols[0].children[0].selectionRange.end.line, 2);
            assert.strictEqual(symbols[0].children[0].range.start.line, 2);
            assert.strictEqual(symbols[0].children[0].range.end.line, 6);

            assert.strictEqual(symbols[0].children[1].children.length, 0);
            assert.strictEqual(symbols[0].children[1].detail, "");
            assert.strictEqual(symbols[0].children[1].kind, vscode.SymbolKind.Method);
            assert.strictEqual(symbols[0].children[1].name, "sub_test_2");
            assert.strictEqual(symbols[0].children[1].selectionRange.start.line, 8);
            assert.strictEqual(symbols[0].children[1].selectionRange.end.line, 8);
            assert.strictEqual(symbols[0].children[1].range.start.line, 8);
            assert.strictEqual(symbols[0].children[1].range.end.line, 14);

            assert.strictEqual(symbols[0].children[2].children.length, 0);
            assert.strictEqual(symbols[0].children[2].detail, "");
            assert.strictEqual(symbols[0].children[2].kind, vscode.SymbolKind.Method);
            assert.strictEqual(symbols[0].children[2].name, "sub_test_3");
            assert.strictEqual(symbols[0].children[2].selectionRange.start.line, 16);
            assert.strictEqual(symbols[0].children[2].selectionRange.end.line, 16);
            assert.strictEqual(symbols[0].children[2].range.start.line, 16);
            assert.strictEqual(symbols[0].children[2].range.end.line, 17);

            assert.strictEqual(symbols[0].children[3].children.length, 0);
            assert.strictEqual(symbols[0].children[3].detail, "");
            assert.strictEqual(symbols[0].children[3].kind, vscode.SymbolKind.Function);
            assert.strictEqual(symbols[0].children[3].name, "main: " + symbols[0].name);
            assert.strictEqual(symbols[0].children[3].selectionRange.start.line, 18);
            assert.strictEqual(symbols[0].children[3].selectionRange.end.line, 18);
            assert.strictEqual(symbols[0].children[3].range.start.line, 18);
            assert.strictEqual(symbols[0].children[3].range.end.line, 28);

            assert.strictEqual(symbols[1].children.length, 1);
            assert.strictEqual(symbols[1].detail, "");
            assert.strictEqual(symbols[1].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[1].name, "test_2");
            assert.strictEqual(symbols[1].selectionRange.start.line, 32);
            assert.strictEqual(symbols[1].selectionRange.end.line, 32);
            assert.strictEqual(symbols[1].range.start.line, 32);
            assert.strictEqual(symbols[1].range.end.line, 34);

            assert.strictEqual(symbols[1].children[0].children.length, 0);
            assert.strictEqual(symbols[1].children[0].detail, "");
            assert.strictEqual(symbols[1].children[0].kind, vscode.SymbolKind.Method);
            assert.strictEqual(symbols[1].children[0].name, "sub_no_body");
            assert.strictEqual(symbols[1].children[0].selectionRange.start.line, 34);
            assert.strictEqual(symbols[1].children[0].selectionRange.end.line, 34);
            assert.strictEqual(symbols[1].children[0].range.start.line, 34);
            assert.strictEqual(symbols[1].children[0].range.end.line, 34);
          });
      });
  });

  test("Test begin/end keywords, begin_end_keywords.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/begin_end_keywords.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 3);

            assert.strictEqual(symbols[0].children.length, 0);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[0].name, "test_1");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 8);

            assert.strictEqual(symbols[1].children.length, 2);
            assert.strictEqual(symbols[1].detail, "");
            assert.strictEqual(symbols[1].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[1].name, "test_2");
            assert.strictEqual(symbols[1].selectionRange.start.line, 9);
            assert.strictEqual(symbols[1].selectionRange.end.line, 9);
            assert.strictEqual(symbols[1].range.start.line, 9);
            assert.strictEqual(symbols[1].range.end.line, 20);

            assert.strictEqual(symbols[1].children[0].children.length, 0);
            assert.strictEqual(symbols[1].children[0].detail, "");
            assert.strictEqual(symbols[1].children[0].kind, vscode.SymbolKind.Method);
            assert.strictEqual(symbols[1].children[0].name, "sub_test_2");
            assert.strictEqual(symbols[1].children[0].selectionRange.start.line, 11);
            assert.strictEqual(symbols[1].children[0].selectionRange.end.line, 11);
            assert.strictEqual(symbols[1].children[0].range.start.line, 11);
            assert.strictEqual(symbols[1].children[0].range.end.line, 19);

            assert.strictEqual(symbols[1].children[1].children.length, 0);
            assert.strictEqual(symbols[1].children[1].detail, "");
            assert.strictEqual(symbols[1].children[1].kind, vscode.SymbolKind.Function);
            assert.strictEqual(symbols[1].children[1].name, "main: " + symbols[1].name);
            assert.strictEqual(symbols[1].children[1].selectionRange.start.line, 20);
            assert.strictEqual(symbols[1].children[1].selectionRange.end.line, 20);
            assert.strictEqual(symbols[1].children[1].range.start.line, 20);
            assert.strictEqual(symbols[1].children[1].range.end.line, 20);

            assert.strictEqual(symbols[2].children.length, 0);
            assert.strictEqual(symbols[2].detail, "");
            assert.strictEqual(symbols[2].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[2].name, "test_3");
            assert.strictEqual(symbols[2].selectionRange.start.line, 21);
            assert.strictEqual(symbols[2].selectionRange.end.line, 21);
            assert.strictEqual(symbols[2].range.start.line, 21);
            assert.strictEqual(symbols[2].range.end.line, 23);
          });
      });
  });

  test("Test begin/end enclosed in strings, begin_end_strings.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/begin_end_strings.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 3);

            assert.strictEqual(symbols[0].children.length, 0);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[0].name, "test_1");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 16);

            assert.strictEqual(symbols[1].children.length, 2);
            assert.strictEqual(symbols[1].detail, "");
            assert.strictEqual(symbols[1].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[1].name, "test_2");
            assert.strictEqual(symbols[1].selectionRange.start.line, 17);
            assert.strictEqual(symbols[1].selectionRange.end.line, 17);
            assert.strictEqual(symbols[1].range.start.line, 17);
            assert.strictEqual(symbols[1].range.end.line, 36);

            assert.strictEqual(symbols[1].children[0].children.length, 0);
            assert.strictEqual(symbols[1].children[0].detail, "");
            assert.strictEqual(symbols[1].children[0].kind, vscode.SymbolKind.Method);
            assert.strictEqual(symbols[1].children[0].name, "sub_test_2");
            assert.strictEqual(symbols[1].children[0].selectionRange.start.line, 19);
            assert.strictEqual(symbols[1].children[0].selectionRange.end.line, 19);
            assert.strictEqual(symbols[1].children[0].range.start.line, 19);
            assert.strictEqual(symbols[1].children[0].range.end.line, 35);

            assert.strictEqual(symbols[1].children[1].children.length, 0);
            assert.strictEqual(symbols[1].children[1].detail, "");
            assert.strictEqual(symbols[1].children[1].kind, vscode.SymbolKind.Function);
            assert.strictEqual(symbols[1].children[1].name, "main: " + symbols[1].name);
            assert.strictEqual(symbols[1].children[1].selectionRange.start.line, 36);
            assert.strictEqual(symbols[1].children[1].selectionRange.end.line, 36);
            assert.strictEqual(symbols[1].children[1].range.start.line, 36);
            assert.strictEqual(symbols[1].children[1].range.end.line, 36);

            assert.strictEqual(symbols[2].children.length, 0);
            assert.strictEqual(symbols[2].detail, "");
            assert.strictEqual(symbols[2].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[2].name, "test_3");
            assert.strictEqual(symbols[2].selectionRange.start.line, 37);
            assert.strictEqual(symbols[2].selectionRange.end.line, 37);
            assert.strictEqual(symbols[2].range.start.line, 37);
            assert.strictEqual(symbols[2].range.end.line, 39);
          });
      });
  });

  /**
   * In this case sections are ignored and only procs are returned.
   */
  test("Test procs and sections mixed, procs_sections.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/procs_sections.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 6);

            assert.strictEqual(symbols[0].children.length, 0);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[0].name, "test_1");
            assert.strictEqual(symbols[0].selectionRange.start.line, 2);
            assert.strictEqual(symbols[0].selectionRange.end.line, 2);
            assert.strictEqual(symbols[0].range.start.line, 2);
            assert.strictEqual(symbols[0].range.end.line, 4);

            assert.strictEqual(symbols[1].children.length, 0);
            assert.strictEqual(symbols[1].detail, "");
            assert.strictEqual(symbols[1].kind, vscode.SymbolKind.Class);
            assert.strictEqual(symbols[1].name, "test_2");
            assert.strictEqual(symbols[1].selectionRange.start.line, 7);
            assert.strictEqual(symbols[1].selectionRange.end.line, 7);
            assert.strictEqual(symbols[1].range.start.line, 7);
            assert.strictEqual(symbols[1].range.end.line, 12);

            assert.strictEqual(symbols[2].children.length, 0);
            assert.strictEqual(symbols[2].detail, "external");
            assert.strictEqual(symbols[2].kind, vscode.SymbolKind.Interface);
            assert.strictEqual(symbols[2].name, "test_external_1");
            assert.strictEqual(symbols[2].selectionRange.start.line, 13);
            assert.strictEqual(symbols[2].selectionRange.end.line, 13);
            assert.strictEqual(symbols[2].range.start.line, 13);
            assert.strictEqual(symbols[2].range.end.line, 13);

            assert.strictEqual(symbols[3].children.length, 0);
            assert.strictEqual(symbols[3].detail, "external");
            assert.strictEqual(symbols[3].kind, vscode.SymbolKind.Interface);
            assert.strictEqual(symbols[3].name, "test_external_2");
            assert.strictEqual(symbols[3].selectionRange.start.line, 16);
            assert.strictEqual(symbols[3].selectionRange.end.line, 16);
            assert.strictEqual(symbols[3].range.start.line, 16);
            assert.strictEqual(symbols[3].range.end.line, 20);

            assert.strictEqual(symbols[4].children.length, 0);
            assert.strictEqual(symbols[4].detail, "forward");
            assert.strictEqual(symbols[4].kind, vscode.SymbolKind.Interface);
            assert.strictEqual(symbols[4].name, "test_forward_1");
            assert.strictEqual(symbols[4].selectionRange.start.line, 21);
            assert.strictEqual(symbols[4].selectionRange.end.line, 21);
            assert.strictEqual(symbols[4].range.start.line, 21);
            assert.strictEqual(symbols[4].range.end.line, 21);

            assert.strictEqual(symbols[5].children.length, 0);
            assert.strictEqual(symbols[5].detail, "forward");
            assert.strictEqual(symbols[5].kind, vscode.SymbolKind.Interface);
            assert.strictEqual(symbols[5].name, "test_forward_2");
            assert.strictEqual(symbols[5].selectionRange.start.line, 24);
            assert.strictEqual(symbols[5].selectionRange.end.line, 24);
            assert.strictEqual(symbols[5].range.start.line, 24);
            assert.strictEqual(symbols[5].range.end.line, 28);
          });
      });
  });

  test("Test sections and pages, sections_pages.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/sections_pages.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 6);

            assert.strictEqual(symbols[0].children.length, 0);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[0].name, "1");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 1);

            assert.strictEqual(symbols[1].children.length, 0);
            assert.strictEqual(symbols[1].detail, "");
            assert.strictEqual(symbols[1].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[1].name, "2");
            assert.strictEqual(symbols[1].selectionRange.start.line, 2);
            assert.strictEqual(symbols[1].selectionRange.end.line, 2);
            assert.strictEqual(symbols[1].range.start.line, 2);
            assert.strictEqual(symbols[1].range.end.line, 8);

            assert.strictEqual(symbols[2].children.length, 0);
            assert.strictEqual(symbols[2].detail, "");
            assert.strictEqual(symbols[2].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[2].name, "3");
            assert.strictEqual(symbols[2].selectionRange.start.line, 9);
            assert.strictEqual(symbols[2].selectionRange.end.line, 9);
            assert.strictEqual(symbols[2].range.start.line, 9);
            assert.strictEqual(symbols[2].range.end.line, 10);

            assert.strictEqual(symbols[3].children.length, 3);
            assert.strictEqual(symbols[3].detail, "");
            assert.strictEqual(symbols[3].kind, vscode.SymbolKind.Package);
            assert.strictEqual(symbols[3].name, "test_1");
            assert.strictEqual(symbols[3].selectionRange.start.line, 11);
            assert.strictEqual(symbols[3].selectionRange.end.line, 11);
            assert.strictEqual(symbols[3].range.start.line, 11);
            assert.strictEqual(symbols[3].range.end.line, 21);

            assert.strictEqual(symbols[3].children[0].children.length, 0);
            assert.strictEqual(symbols[3].children[0].detail, "");
            assert.strictEqual(symbols[3].children[0].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[3].children[0].name, "1");
            assert.strictEqual(symbols[3].children[0].selectionRange.start.line, 13);
            assert.strictEqual(symbols[3].children[0].selectionRange.end.line, 13);
            assert.strictEqual(symbols[3].children[0].range.start.line, 13);
            assert.strictEqual(symbols[3].children[0].range.end.line, 14);

            assert.strictEqual(symbols[3].children[1].children.length, 0);
            assert.strictEqual(symbols[3].children[1].detail, "");
            assert.strictEqual(symbols[3].children[1].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[3].children[1].name, "2");
            assert.strictEqual(symbols[3].children[1].selectionRange.start.line, 15);
            assert.strictEqual(symbols[3].children[1].selectionRange.end.line, 15);
            assert.strictEqual(symbols[3].children[1].range.start.line, 15);
            assert.strictEqual(symbols[3].children[1].range.end.line, 17);

            assert.strictEqual(symbols[3].children[2].children.length, 0);
            assert.strictEqual(symbols[3].children[2].detail, "");
            assert.strictEqual(symbols[3].children[2].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[3].children[2].name, "3");
            assert.strictEqual(symbols[3].children[2].selectionRange.start.line, 18);
            assert.strictEqual(symbols[3].children[2].selectionRange.end.line, 18);
            assert.strictEqual(symbols[3].children[2].range.start.line, 18);
            assert.strictEqual(symbols[3].children[2].range.end.line, 21);

            assert.strictEqual(symbols[4].children.length, 0);
            assert.strictEqual(symbols[4].detail, "");
            assert.strictEqual(symbols[4].kind, vscode.SymbolKind.Package);
            assert.strictEqual(symbols[4].name, "test_2");
            assert.strictEqual(symbols[4].selectionRange.start.line, 22);
            assert.strictEqual(symbols[4].selectionRange.end.line, 22);
            assert.strictEqual(symbols[4].range.start.line, 22);
            assert.strictEqual(symbols[4].range.end.line, 27);

            assert.strictEqual(symbols[5].children.length, 0);
            assert.strictEqual(symbols[5].detail, "");
            assert.strictEqual(symbols[5].kind, vscode.SymbolKind.Package);
            assert.strictEqual(symbols[5].name, "no_new_line");
            assert.strictEqual(symbols[5].selectionRange.start.line, 28);
            assert.strictEqual(symbols[5].selectionRange.end.line, 28);
            assert.strictEqual(symbols[5].range.start.line, 28);
            assert.strictEqual(symbols[5].range.end.line, 28);
          });
      });
  });

  test("Test pages, pages.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/pages.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 3);

            assert.strictEqual(symbols[0].children.length, 0);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[0].name, "1");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 1);

            assert.strictEqual(symbols[1].children.length, 0);
            assert.strictEqual(symbols[1].detail, "");
            assert.strictEqual(symbols[1].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[1].name, "2");
            assert.strictEqual(symbols[1].selectionRange.start.line, 2);
            assert.strictEqual(symbols[1].selectionRange.end.line, 2);
            assert.strictEqual(symbols[1].range.start.line, 2);
            assert.strictEqual(symbols[1].range.end.line, 8);

            assert.strictEqual(symbols[2].children.length, 0);
            assert.strictEqual(symbols[2].detail, "");
            assert.strictEqual(symbols[2].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[2].name, "no_new_line");
            assert.strictEqual(symbols[2].selectionRange.start.line, 9);
            assert.strictEqual(symbols[2].selectionRange.end.line, 9);
            assert.strictEqual(symbols[2].range.start.line, 9);
            assert.strictEqual(symbols[2].range.end.line, 9);
          });
      });
  });

  test("Test page with data before EOF, page_eof_with_data.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/page_eof_with_data.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 1);

            assert.strictEqual(symbols[0].children.length, 0);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[0].name, "last_page");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 1);
          });
      });
  });

  test("Test section with data before EOF, section_eof_with_data.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/section_eof_with_data.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 1);

            assert.strictEqual(symbols[0].children.length, 0);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.Package);
            assert.strictEqual(symbols[0].name, "last_section");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 1);
          });
      });
  });

  test("Test section/page with data before EOF, section_page_eof_with_data.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/section_page_eof_with_data.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talSymbolProvider
          .provideDocumentSymbols(doc, token)
          .then((symbols: vscode.DocumentSymbol[]) => {
            assert.ok(symbols);
            assert.strictEqual(symbols.length, 1);

            assert.strictEqual(symbols[0].children.length, 1);
            assert.strictEqual(symbols[0].detail, "");
            assert.strictEqual(symbols[0].kind, vscode.SymbolKind.Package);
            assert.strictEqual(symbols[0].name, "last_section");
            assert.strictEqual(symbols[0].selectionRange.start.line, 0);
            assert.strictEqual(symbols[0].selectionRange.end.line, 0);
            assert.strictEqual(symbols[0].range.start.line, 0);
            assert.strictEqual(symbols[0].range.end.line, 2);

            assert.strictEqual(symbols[0].children[0].children.length, 0);
            assert.strictEqual(symbols[0].children[0].detail, "");
            assert.strictEqual(symbols[0].children[0].kind, vscode.SymbolKind.String);
            assert.strictEqual(symbols[0].children[0].name, "last_page");
            assert.strictEqual(symbols[0].children[0].selectionRange.start.line, 1);
            assert.strictEqual(symbols[0].children[0].selectionRange.end.line, 1);
            assert.strictEqual(symbols[0].children[0].range.start.line, 1);
            assert.strictEqual(symbols[0].children[0].range.end.line, 2);
          });
      });
  });
});
