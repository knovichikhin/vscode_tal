'use strict';

import * as assert from 'assert';
import * as vscode from 'vscode';
import { TALDocumentSymbolProvider } from '../../symbolprovider';

suite('TAL Symbol Provider Test', () => {
    const talSymbolProvider = new TALDocumentSymbolProvider();
    const tokenSource = new vscode.CancellationTokenSource();
    const token = tokenSource.token;
    const testFilesPath = __dirname + '/../../../src/test/suite/talsymbolprovider'

    test('Test empty file - no symbols, empty.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/empty.tal')
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talSymbolProvider.provideDocumentSymbols(doc, token).then((symbols: vscode.DocumentSymbol[]) => {
                assert.ok(symbols);
                assert.equal(symbols.length, 0);
            });
        });
    });

    test('Test happy procs scenarios, procs_happy.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/procs_happy.tal')
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talSymbolProvider.provideDocumentSymbols(doc, token).then((symbols: vscode.DocumentSymbol[]) => {
                assert.ok(symbols);
                assert.equal(symbols.length, 6);

                assert.equal(symbols[0].children.length, 0);
                assert.equal(symbols[0].detail, '');
                assert.equal(symbols[0].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[0].name, 'test_1');
                assert.equal(symbols[0].selectionRange.start.line, 0);
                assert.equal(symbols[0].selectionRange.end.line, 0);
                assert.equal(symbols[0].range.start.line, 0);
                assert.equal(symbols[0].range.end.line, 2);

                assert.equal(symbols[1].children.length, 0);
                assert.equal(symbols[1].detail, '');
                assert.equal(symbols[1].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[1].name, 'test_2');
                assert.equal(symbols[1].selectionRange.start.line, 3);
                assert.equal(symbols[1].selectionRange.end.line, 3);
                assert.equal(symbols[1].range.start.line, 3);
                assert.equal(symbols[1].range.end.line, 8);

                assert.equal(symbols[2].children.length, 0);
                assert.equal(symbols[2].detail, 'external');
                assert.equal(symbols[2].kind, vscode.SymbolKind.Interface);
                assert.equal(symbols[2].name, 'test_external_1');
                assert.equal(symbols[2].selectionRange.start.line, 9);
                assert.equal(symbols[2].selectionRange.end.line, 9);
                assert.equal(symbols[2].range.start.line, 9);
                assert.equal(symbols[2].range.end.line, 9);

                assert.equal(symbols[3].children.length, 0);
                assert.equal(symbols[3].detail, 'external');
                assert.equal(symbols[3].kind, vscode.SymbolKind.Interface);
                assert.equal(symbols[3].name, 'test_external_2');
                assert.equal(symbols[3].selectionRange.start.line, 10);
                assert.equal(symbols[3].selectionRange.end.line, 10);
                assert.equal(symbols[3].range.start.line, 10);
                assert.equal(symbols[3].range.end.line, 14);

                assert.equal(symbols[4].children.length, 0);
                assert.equal(symbols[4].detail, 'forward');
                assert.equal(symbols[4].kind, vscode.SymbolKind.Interface);
                assert.equal(symbols[4].name, 'test_forward_1');
                assert.equal(symbols[4].selectionRange.start.line, 15);
                assert.equal(symbols[4].selectionRange.end.line, 15);
                assert.equal(symbols[4].range.start.line, 15);
                assert.equal(symbols[4].range.end.line, 15);

                assert.equal(symbols[5].children.length, 0);
                assert.equal(symbols[5].detail, 'forward');
                assert.equal(symbols[5].kind, vscode.SymbolKind.Interface);
                assert.equal(symbols[5].name, 'test_forward_2');
                assert.equal(symbols[5].selectionRange.start.line, 16);
                assert.equal(symbols[5].selectionRange.end.line, 16);
                assert.equal(symbols[5].range.start.line, 16);
                assert.equal(symbols[5].range.end.line, 20);
            });
        });
    });
    test('Test tricky procs scenarios, procs_tricky.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/procs_tricky.tal')
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talSymbolProvider.provideDocumentSymbols(doc, token).then((symbols: vscode.DocumentSymbol[]) => {
                assert.ok(symbols);
                assert.equal(symbols.length, 6);

                assert.equal(symbols[0].children.length, 0);
                assert.equal(symbols[0].detail, '');
                assert.equal(symbols[0].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[0].name, 'test_contains_procs_inside_1');
                assert.equal(symbols[0].selectionRange.start.line, 0);
                assert.equal(symbols[0].selectionRange.end.line, 0);
                assert.equal(symbols[0].range.start.line, 0);
                assert.equal(symbols[0].range.end.line, 3);

                assert.equal(symbols[1].children.length, 0);
                assert.equal(symbols[1].detail, '');
                assert.equal(symbols[1].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[1].name, 'test_contains_procs_inside_2');
                assert.equal(symbols[1].selectionRange.start.line, 4);
                assert.equal(symbols[1].selectionRange.end.line, 4);
                assert.equal(symbols[1].range.start.line, 4);
                assert.equal(symbols[1].range.end.line, 7);

                assert.equal(symbols[2].children.length, 0);
                assert.equal(symbols[2].detail, '');
                assert.equal(symbols[2].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[2].name, 'test_ends_too_early');
                assert.equal(symbols[2].selectionRange.start.line, 8);
                assert.equal(symbols[2].selectionRange.end.line, 8);
                assert.equal(symbols[2].range.start.line, 8);
                assert.equal(symbols[2].range.end.line, 9);

                assert.equal(symbols[3].children.length, 0);
                assert.equal(symbols[3].detail, '');
                assert.equal(symbols[3].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[3].name, 'test_external_with_body');
                assert.equal(symbols[3].selectionRange.start.line, 12);
                assert.equal(symbols[3].selectionRange.end.line, 12);
                assert.equal(symbols[3].range.start.line, 12);
                assert.equal(symbols[3].range.end.line, 14);

                assert.equal(symbols[4].children.length, 0);
                assert.equal(symbols[4].detail, '');
                assert.equal(symbols[4].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[4].name, 'test_forward_with_body');
                assert.equal(symbols[4].selectionRange.start.line, 16);
                assert.equal(symbols[4].selectionRange.end.line, 16);
                assert.equal(symbols[4].range.start.line, 16);
                assert.equal(symbols[4].range.end.line, 18);

                assert.equal(symbols[5].children.length, 0);
                assert.equal(symbols[5].detail, '');
                assert.equal(symbols[5].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[5].name, 'test_end_of_file');
                assert.equal(symbols[5].selectionRange.start.line, 20);
                assert.equal(symbols[5].selectionRange.end.line, 20);
                assert.equal(symbols[5].range.start.line, 20);
                assert.equal(symbols[5].range.end.line, 20);
            });
        });
    });
    test('Test happy subprocs scenarios, subprocs_happy.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/subprocs_happy.tal')
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talSymbolProvider.provideDocumentSymbols(doc, token).then((symbols: vscode.DocumentSymbol[]) => {
                assert.ok(symbols);
                assert.equal(symbols.length, 1);

                assert.equal(symbols[0].children.length, 4);
                assert.equal(symbols[0].detail, '');
                assert.equal(symbols[0].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[0].name, 'test_1');
                assert.equal(symbols[0].selectionRange.start.line, 0);
                assert.equal(symbols[0].selectionRange.end.line, 0);
                assert.equal(symbols[0].range.start.line, 0);
                assert.equal(symbols[0].range.end.line, 17);

                assert.equal(symbols[0].children[0].children.length, 0);
                assert.equal(symbols[0].children[0].detail, '');
                assert.equal(symbols[0].children[0].kind, vscode.SymbolKind.Method);
                assert.equal(symbols[0].children[0].name, 'sub_test_1');
                assert.equal(symbols[0].children[0].selectionRange.start.line, 2);
                assert.equal(symbols[0].children[0].selectionRange.end.line, 2);
                assert.equal(symbols[0].children[0].range.start.line, 2);
                assert.equal(symbols[0].children[0].range.end.line, 4);

                assert.equal(symbols[0].children[1].children.length, 0);
                assert.equal(symbols[0].children[1].detail, '');
                assert.equal(symbols[0].children[1].kind, vscode.SymbolKind.Method);
                assert.equal(symbols[0].children[1].name, 'sub_test_2');
                assert.equal(symbols[0].children[1].selectionRange.start.line, 6);
                assert.equal(symbols[0].children[1].selectionRange.end.line, 6);
                assert.equal(symbols[0].children[1].range.start.line, 6);
                assert.equal(symbols[0].children[1].range.end.line, 10);

                assert.equal(symbols[0].children[2].children.length, 0);
                assert.equal(symbols[0].children[2].detail, '');
                assert.equal(symbols[0].children[2].kind, vscode.SymbolKind.Method);
                assert.equal(symbols[0].children[2].name, 'sub_test_3');
                assert.equal(symbols[0].children[2].selectionRange.start.line, 12);
                assert.equal(symbols[0].children[2].selectionRange.end.line, 12);
                assert.equal(symbols[0].children[2].range.start.line, 12);
                assert.equal(symbols[0].children[2].range.end.line, 15);

                assert.equal(symbols[0].children[3].children.length, 0);
                assert.equal(symbols[0].children[3].detail, '');
                assert.equal(symbols[0].children[3].kind, vscode.SymbolKind.Function);
                assert.equal(symbols[0].children[3].name, 'main: ' + symbols[0].name);
                assert.equal(symbols[0].children[3].selectionRange.start.line, 16);
                assert.equal(symbols[0].children[3].selectionRange.end.line, 16);
                assert.equal(symbols[0].children[3].range.start.line, 16);
                assert.equal(symbols[0].children[3].range.end.line, 17);
            });
        });
    });
    test('Test tricky subprocs scenarios, subprocs_tricky.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/subprocs_tricky.tal')
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talSymbolProvider.provideDocumentSymbols(doc, token).then((symbols: vscode.DocumentSymbol[]) => {
                assert.ok(symbols);
                assert.equal(symbols.length, 2);

                assert.equal(symbols[0].children.length, 4);
                assert.equal(symbols[0].detail, '');
                assert.equal(symbols[0].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[0].name, 'test_1');
                assert.equal(symbols[0].selectionRange.start.line, 0);
                assert.equal(symbols[0].selectionRange.end.line, 0);
                assert.equal(symbols[0].range.start.line, 0);
                assert.equal(symbols[0].range.end.line, 28);

                assert.equal(symbols[0].children[0].children.length, 0);
                assert.equal(symbols[0].children[0].detail, '');
                assert.equal(symbols[0].children[0].kind, vscode.SymbolKind.Method);
                assert.equal(symbols[0].children[0].name, 'sub_test_1');
                assert.equal(symbols[0].children[0].selectionRange.start.line, 2);
                assert.equal(symbols[0].children[0].selectionRange.end.line, 2);
                assert.equal(symbols[0].children[0].range.start.line, 2);
                assert.equal(symbols[0].children[0].range.end.line, 6);

                assert.equal(symbols[0].children[1].children.length, 0);
                assert.equal(symbols[0].children[1].detail, '');
                assert.equal(symbols[0].children[1].kind, vscode.SymbolKind.Method);
                assert.equal(symbols[0].children[1].name, 'sub_test_2');
                assert.equal(symbols[0].children[1].selectionRange.start.line, 8);
                assert.equal(symbols[0].children[1].selectionRange.end.line, 8);
                assert.equal(symbols[0].children[1].range.start.line, 8);
                assert.equal(symbols[0].children[1].range.end.line, 14);

                assert.equal(symbols[0].children[2].children.length, 0);
                assert.equal(symbols[0].children[2].detail, '');
                assert.equal(symbols[0].children[2].kind, vscode.SymbolKind.Method);
                assert.equal(symbols[0].children[2].name, 'sub_test_3');
                assert.equal(symbols[0].children[2].selectionRange.start.line, 16);
                assert.equal(symbols[0].children[2].selectionRange.end.line, 16);
                assert.equal(symbols[0].children[2].range.start.line, 16);
                assert.equal(symbols[0].children[2].range.end.line, 17);

                assert.equal(symbols[0].children[3].children.length, 0);
                assert.equal(symbols[0].children[3].detail, '');
                assert.equal(symbols[0].children[3].kind, vscode.SymbolKind.Function);
                assert.equal(symbols[0].children[3].name, 'main: ' + symbols[0].name);
                assert.equal(symbols[0].children[3].selectionRange.start.line, 18);
                assert.equal(symbols[0].children[3].selectionRange.end.line, 18);
                assert.equal(symbols[0].children[3].range.start.line, 18);
                assert.equal(symbols[0].children[3].range.end.line, 28);

                assert.equal(symbols[1].children.length, 1);
                assert.equal(symbols[1].detail, '');
                assert.equal(symbols[1].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[1].name, 'test_2');
                assert.equal(symbols[1].selectionRange.start.line, 32);
                assert.equal(symbols[1].selectionRange.end.line, 32);
                assert.equal(symbols[1].range.start.line, 32);
                assert.equal(symbols[1].range.end.line, 34);

                assert.equal(symbols[1].children[0].children.length, 0);
                assert.equal(symbols[1].children[0].detail, '');
                assert.equal(symbols[1].children[0].kind, vscode.SymbolKind.Method);
                assert.equal(symbols[1].children[0].name, 'sub_no_body');
                assert.equal(symbols[1].children[0].selectionRange.start.line, 34);
                assert.equal(symbols[1].children[0].selectionRange.end.line, 34);
                assert.equal(symbols[1].children[0].range.start.line, 34);
                assert.equal(symbols[1].children[0].range.end.line, 34);
            });
        });
    });
    test('Test begin/end keywords, begin_end_keywords.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/begin_end_keywords.tal')
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talSymbolProvider.provideDocumentSymbols(doc, token).then((symbols: vscode.DocumentSymbol[]) => {
                assert.ok(symbols);
                assert.equal(symbols.length, 3);

                assert.equal(symbols[0].children.length, 0);
                assert.equal(symbols[0].detail, '');
                assert.equal(symbols[0].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[0].name, 'test_1');
                assert.equal(symbols[0].selectionRange.start.line, 0);
                assert.equal(symbols[0].selectionRange.end.line, 0);
                assert.equal(symbols[0].range.start.line, 0);
                assert.equal(symbols[0].range.end.line, 8);

                assert.equal(symbols[1].children.length, 2);
                assert.equal(symbols[1].detail, '');
                assert.equal(symbols[1].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[1].name, 'test_2');
                assert.equal(symbols[1].selectionRange.start.line, 9);
                assert.equal(symbols[1].selectionRange.end.line, 9);
                assert.equal(symbols[1].range.start.line, 9);
                assert.equal(symbols[1].range.end.line, 20);

                assert.equal(symbols[1].children[0].children.length, 0);
                assert.equal(symbols[1].children[0].detail, '');
                assert.equal(symbols[1].children[0].kind, vscode.SymbolKind.Method);
                assert.equal(symbols[1].children[0].name, 'sub_test_2');
                assert.equal(symbols[1].children[0].selectionRange.start.line, 11);
                assert.equal(symbols[1].children[0].selectionRange.end.line, 11);
                assert.equal(symbols[1].children[0].range.start.line, 11);
                assert.equal(symbols[1].children[0].range.end.line, 19);

                assert.equal(symbols[1].children[1].children.length, 0);
                assert.equal(symbols[1].children[1].detail, '');
                assert.equal(symbols[1].children[1].kind, vscode.SymbolKind.Function);
                assert.equal(symbols[1].children[1].name, 'main: ' + symbols[1].name);
                assert.equal(symbols[1].children[1].selectionRange.start.line, 20);
                assert.equal(symbols[1].children[1].selectionRange.end.line, 20);
                assert.equal(symbols[1].children[1].range.start.line, 20);
                assert.equal(symbols[1].children[1].range.end.line, 20);

                assert.equal(symbols[2].children.length, 0);
                assert.equal(symbols[2].detail, '');
                assert.equal(symbols[2].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[2].name, 'test_3');
                assert.equal(symbols[2].selectionRange.start.line, 21);
                assert.equal(symbols[2].selectionRange.end.line, 21);
                assert.equal(symbols[2].range.start.line, 21);
                assert.equal(symbols[2].range.end.line, 23);
            });
        });
    });
    test('Test begin/end enclosed in strings, begin_end_strings.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/begin_end_strings.tal')
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talSymbolProvider.provideDocumentSymbols(doc, token).then((symbols: vscode.DocumentSymbol[]) => {
                assert.ok(symbols);
                assert.equal(symbols.length, 3);

                assert.equal(symbols[0].children.length, 0);
                assert.equal(symbols[0].detail, '');
                assert.equal(symbols[0].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[0].name, 'test_1');
                assert.equal(symbols[0].selectionRange.start.line, 0);
                assert.equal(symbols[0].selectionRange.end.line, 0);
                assert.equal(symbols[0].range.start.line, 0);
                assert.equal(symbols[0].range.end.line, 16);

                assert.equal(symbols[1].children.length, 2);
                assert.equal(symbols[1].detail, '');
                assert.equal(symbols[1].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[1].name, 'test_2');
                assert.equal(symbols[1].selectionRange.start.line, 17);
                assert.equal(symbols[1].selectionRange.end.line, 17);
                assert.equal(symbols[1].range.start.line, 17);
                assert.equal(symbols[1].range.end.line, 36);

                assert.equal(symbols[1].children[0].children.length, 0);
                assert.equal(symbols[1].children[0].detail, '');
                assert.equal(symbols[1].children[0].kind, vscode.SymbolKind.Method);
                assert.equal(symbols[1].children[0].name, 'sub_test_2');
                assert.equal(symbols[1].children[0].selectionRange.start.line, 19);
                assert.equal(symbols[1].children[0].selectionRange.end.line, 19);
                assert.equal(symbols[1].children[0].range.start.line, 19);
                assert.equal(symbols[1].children[0].range.end.line, 35);

                assert.equal(symbols[1].children[1].children.length, 0);
                assert.equal(symbols[1].children[1].detail, '');
                assert.equal(symbols[1].children[1].kind, vscode.SymbolKind.Function);
                assert.equal(symbols[1].children[1].name, 'main: ' + symbols[1].name);
                assert.equal(symbols[1].children[1].selectionRange.start.line, 36);
                assert.equal(symbols[1].children[1].selectionRange.end.line, 36);
                assert.equal(symbols[1].children[1].range.start.line, 36);
                assert.equal(symbols[1].children[1].range.end.line, 36);

                assert.equal(symbols[2].children.length, 0);
                assert.equal(symbols[2].detail, '');
                assert.equal(symbols[2].kind, vscode.SymbolKind.Class);
                assert.equal(symbols[2].name, 'test_3');
                assert.equal(symbols[2].selectionRange.start.line, 37);
                assert.equal(symbols[2].selectionRange.end.line, 37);
                assert.equal(symbols[2].range.start.line, 37);
                assert.equal(symbols[2].range.end.line, 39);
            });
        });
    });
});
