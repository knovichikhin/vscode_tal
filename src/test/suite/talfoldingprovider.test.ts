"use strict";

import * as assert from "assert";
import * as vscode from "vscode";
import { TALFoldingProvider } from "../../foldingprovider";
import { TALBackend } from "../../talbackend/backend";

suite("TAL Toggle Folding Provider Test", () => {
  const talBackend = new TALBackend();
  const talFoldingProvider = new TALFoldingProvider(talBackend);
  const context = <vscode.FoldingContext>{};
  const tokenSource = new vscode.CancellationTokenSource();
  const token = tokenSource.token;
  const testFilesPath = __dirname + "/../../../src/test/suite/talfoldingprovider";

  test("Test empty file - no ranges, empty.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/empty.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 0);
          });
      });
  });

  test("Test no lines between toggles, toggle_no_lines.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/toggle_no_lines.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 0);
          });
      });
  });

  test("Test simple toggles, toggle_simple.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/toggle_simple.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 4);

            assert.strictEqual(ranges[0].start, 0);
            assert.strictEqual(ranges[0].end, 1);
            assert.strictEqual(ranges[0].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[1].start, 4);
            assert.strictEqual(ranges[1].end, 5);
            assert.strictEqual(ranges[1].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[2].start, 8);
            assert.strictEqual(ranges[2].end, 9);
            assert.strictEqual(ranges[2].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[3].start, 10);
            assert.strictEqual(ranges[3].end, 11);
            assert.strictEqual(ranges[3].kind, vscode.FoldingRangeKind.Region);
          });
      });
  });

  test("Test overlapping toggles, toggle_overlapping.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/toggle_overlapping.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 2);

            assert.strictEqual(ranges[0].start, 0);
            assert.strictEqual(ranges[0].end, 3);
            assert.strictEqual(ranges[0].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[1].start, 2);
            assert.strictEqual(ranges[1].end, 4);
            assert.strictEqual(ranges[1].kind, vscode.FoldingRangeKind.Region);
          });
      });
  });

  test("Test toggles without IDs, toggle_no_id.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/toggle_no_id.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 0);
          });
      });
  });

  test("Test mixed case toggles, toggle_upper_case.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/toggle_upper_case.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 4);

            assert.strictEqual(ranges[0].start, 0);
            assert.strictEqual(ranges[0].end, 1);
            assert.strictEqual(ranges[0].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[1].start, 4);
            assert.strictEqual(ranges[1].end, 5);
            assert.strictEqual(ranges[1].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[2].start, 8);
            assert.strictEqual(ranges[2].end, 9);
            assert.strictEqual(ranges[2].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[3].start, 10);
            assert.strictEqual(ranges[3].end, 11);
            assert.strictEqual(ranges[3].kind, vscode.FoldingRangeKind.Region);
          });
      });
  });
});

suite("TAL Comment Blocks Folding Provider Test", () => {
  const talBackend = new TALBackend();
  const talFoldingProvider = new TALFoldingProvider(talBackend);
  const context = <vscode.FoldingContext>{};
  const tokenSource = new vscode.CancellationTokenSource();
  const token = tokenSource.token;
  const testFilesPath = __dirname + "/../../../src/test/suite/talfoldingprovider";

  test("Test basic comment blocks, comments_simple.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/comments_simple.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 7);

            assert.strictEqual(ranges[0].start, 2);
            assert.strictEqual(ranges[0].end, 3);
            assert.strictEqual(ranges[0].kind, vscode.FoldingRangeKind.Comment);

            assert.strictEqual(ranges[1].start, 5);
            assert.strictEqual(ranges[1].end, 6);
            assert.strictEqual(ranges[1].kind, vscode.FoldingRangeKind.Comment);

            assert.strictEqual(ranges[2].start, 8);
            assert.strictEqual(ranges[2].end, 9);
            assert.strictEqual(ranges[2].kind, vscode.FoldingRangeKind.Comment);

            assert.strictEqual(ranges[3].start, 11);
            assert.strictEqual(ranges[3].end, 12);
            assert.strictEqual(ranges[3].kind, vscode.FoldingRangeKind.Comment);

            assert.strictEqual(ranges[4].start, 14);
            assert.strictEqual(ranges[4].end, 15);
            assert.strictEqual(ranges[4].kind, vscode.FoldingRangeKind.Comment);

            assert.strictEqual(ranges[5].start, 17);
            assert.strictEqual(ranges[5].end, 18);
            assert.strictEqual(ranges[5].kind, vscode.FoldingRangeKind.Comment);

            assert.strictEqual(ranges[6].start, 23);
            assert.strictEqual(ranges[6].end, 24);
            assert.strictEqual(ranges[6].kind, vscode.FoldingRangeKind.Comment);
          });
      });
  });

  test("Test comment block with toggles, comments_with_toggles.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/comments_with_toggles.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 3);

            assert.strictEqual(ranges[0].start, 0);
            assert.strictEqual(ranges[0].end, 1);
            assert.strictEqual(ranges[0].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[1].start, 2);
            assert.strictEqual(ranges[1].end, 4);
            assert.strictEqual(ranges[1].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[2].start, 3);
            assert.strictEqual(ranges[2].end, 4);
            assert.strictEqual(ranges[2].kind, vscode.FoldingRangeKind.Comment);
          });
      });
  });

  test("Test tricky comments, comments_tricky.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/comments_tricky.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 0);
          });
      });
  });
});

suite("TAL Begin/End Blocks Folding Provider Test", () => {
  const talBackend = new TALBackend();
  const talFoldingProvider = new TALFoldingProvider(talBackend);
  const context = <vscode.FoldingContext>{};
  const tokenSource = new vscode.CancellationTokenSource();
  const token = tokenSource.token;
  const testFilesPath = __dirname + "/../../../src/test/suite/talfoldingprovider";

  test("Test basic stack blocks, stacks_simple.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/stacks_simple.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 3);

            assert.strictEqual(ranges[0].start, 5);
            assert.strictEqual(ranges[0].end, 6);
            assert.strictEqual(ranges[0].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[1].start, 3);
            assert.strictEqual(ranges[1].end, 7);
            assert.strictEqual(ranges[1].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[2].start, 1);
            assert.strictEqual(ranges[2].end, 8);
            assert.strictEqual(ranges[2].kind, vscode.FoldingRangeKind.Region);
          });
      });
  });

  test("Test stack blocks with multiple begin/end on a line, stacks_multiple.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/stacks_multiple.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 7);

            assert.strictEqual(ranges[0].start, 3);
            assert.strictEqual(ranges[0].end, 5);
            assert.strictEqual(ranges[0].kind, vscode.FoldingRangeKind.Region);
            assert.strictEqual(ranges[1].start, 1);
            assert.strictEqual(ranges[1].end, 6);
            assert.strictEqual(ranges[1].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[2].start, 12);
            assert.strictEqual(ranges[2].end, 15);
            assert.strictEqual(ranges[2].kind, vscode.FoldingRangeKind.Region);
            assert.strictEqual(ranges[3].start, 10);
            assert.strictEqual(ranges[3].end, 16);
            assert.strictEqual(ranges[3].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[4].start, 22);
            assert.strictEqual(ranges[4].end, 24);
            assert.strictEqual(ranges[4].kind, vscode.FoldingRangeKind.Region);
            assert.strictEqual(ranges[5].start, 22);
            assert.strictEqual(ranges[5].end, 25);
            assert.strictEqual(ranges[5].kind, vscode.FoldingRangeKind.Region);
            assert.strictEqual(ranges[6].start, 20);
            assert.strictEqual(ranges[6].end, 26);
            assert.strictEqual(ranges[6].kind, vscode.FoldingRangeKind.Region);
          });
      });
  });

  test("Test tricky begin/end blocks, stacks_tricky.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/stacks_tricky.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 1);

            assert.strictEqual(ranges[0].start, 2);
            assert.strictEqual(ranges[0].end, 3);
            assert.strictEqual(ranges[0].kind, vscode.FoldingRangeKind.Region);
          });
      });
  });

  test("Test mixed case begin/end blocks, stacks_upper_case.tal", async () => {
    const uri = vscode.Uri.file(testFilesPath + "/stacks_upper_case.tal");
    return vscode.workspace
      .openTextDocument(uri)
      .then(async (doc: vscode.TextDocument) => {
        assert.ok(doc);

        return talFoldingProvider
          .provideFoldingRanges(doc, context, token)
          .then((ranges: vscode.FoldingRange[]) => {
            assert.ok(ranges);
            assert.strictEqual(ranges.length, 2);

            assert.strictEqual(ranges[0].start, 1);
            assert.strictEqual(ranges[0].end, 2);
            assert.strictEqual(ranges[0].kind, vscode.FoldingRangeKind.Region);

            assert.strictEqual(ranges[1].start, 6);
            assert.strictEqual(ranges[1].end, 7);
            assert.strictEqual(ranges[1].kind, vscode.FoldingRangeKind.Region);
          });
      });
  });
});
