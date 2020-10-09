'use strict';

import * as assert from 'assert';
import * as vscode from 'vscode';
import { TALFoldingProvider } from '../../foldingprovider';

suite('TAL Toggle Folding Provider Test', () => {
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

    test('Test no lines between toggles, toggle_no_lines.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/toggle_no_lines.tal');
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talFoldingProvider.provideFoldingRanges(doc, context, token).then((ranges: vscode.FoldingRange[]) => {
                assert.ok(ranges);
                assert.strictEqual(ranges.length, 0);
            });
        });
    });

    test('Test simple toggles, toggle_simple.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/toggle_simple.tal');
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talFoldingProvider.provideFoldingRanges(doc, context, token).then((ranges: vscode.FoldingRange[]) => {
                assert.ok(ranges);
                assert.strictEqual(ranges.length, 4);

                ranges[0].start = 0;
                ranges[0].end = 1;
                ranges[0].kind = vscode.FoldingRangeKind.Region;

                ranges[1].start = 4;
                ranges[1].end = 5;
                ranges[1].kind = vscode.FoldingRangeKind.Region;

                ranges[3].start = 8;
                ranges[3].end = 9;
                ranges[3].kind = vscode.FoldingRangeKind.Region;

                ranges[3].start = 10;
                ranges[3].end = 11;
                ranges[3].kind = vscode.FoldingRangeKind.Region;
            });
        });
    });

    test('Test overlapping toggles, toggle_overlapping.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/toggle_overlapping.tal');
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talFoldingProvider.provideFoldingRanges(doc, context, token).then((ranges: vscode.FoldingRange[]) => {
                assert.ok(ranges);
                assert.strictEqual(ranges.length, 2);

                ranges[0].start = 0;
                ranges[0].end = 3;
                ranges[0].kind = vscode.FoldingRangeKind.Region;

                ranges[1].start = 2;
                ranges[1].end = 4;
                ranges[1].kind = vscode.FoldingRangeKind.Region;
            });
        });
    });

    test('Test toggles without IDs, toggle_no_id.tal', async () => {
        const uri = vscode.Uri.file(testFilesPath + '/toggle_no_id.tal');
        return vscode.workspace.openTextDocument(uri).then(async (doc: vscode.TextDocument) => {
            assert.ok(doc);

            return talFoldingProvider.provideFoldingRanges(doc, context, token).then((ranges: vscode.FoldingRange[]) => {
                assert.ok(ranges);
                assert.strictEqual(ranges.length, 0);
            });
        });
    });
});
