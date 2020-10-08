'use strict';

import * as assert from 'assert';
import * as vscode from 'vscode';
import { TALFoldingProvider } from '../../foldingprovider';

suite('TAL Folding Provider Test', () => {
    const talFoldingProvider = new TALFoldingProvider();
    const context = <vscode.FoldingContext>{};
    const tokenSource = new vscode.CancellationTokenSource();
    const token = tokenSource.token;
    const testFilesPath = __dirname + '/../../../src/test/suite/talfoldingprovider';

    test('Test empty file - no ranges, empty.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/empty.tal');
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talFoldingProvider.provideFoldingRanges(doc, context, token).then((ranges: vscode.FoldingRange[]) => {
                assert.ok(ranges);
                assert.strictEqual(ranges.length, 0);
            });
        });
    });
});
