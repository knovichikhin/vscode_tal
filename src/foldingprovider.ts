'use strict';

import * as vscode from 'vscode';

/**
 * VSCode requests folding results every time user
 * selects a document. E.g. active document is Foo.tal.
 * Folding results will be requested if user selects document
 * Bar.tal and then again Foo.tal. Meanwhile, Foo.tal is unchanged.
 * FoldableCache class implement a simple cache mechanism where it
 * provide already computed results for the same unchanged document
 * based on document URI.
 * There is no reason to track document per URI and version
 * because version is incremenet on any document change including
 * undo/redo.
 * Instead different document version will be used to invalidate
 * cache.
 */
interface CachedDocument {
    readonly version: number;
    readonly foldables: vscode.FoldingRange[];
};
class FoldablesCache {
    private cachedDocuments = new Map<string, CachedDocument>();

    public get(document: vscode.TextDocument): vscode.FoldingRange[] | undefined {
        const cachedDocument = this.cachedDocuments.get(document.uri.toString());

        if (cachedDocument) {
            // Invalidate cache on the same but edited document
            if (cachedDocument.version !== document.version) {
                this.cachedDocuments.delete(document.uri.toString());
                return undefined;
            }

            return cachedDocument.foldables;
        }

        return undefined;
    }

    public set(document: vscode.TextDocument, foldables: vscode.FoldingRange[]): void {
        this.cachedDocuments.set(
            document.uri.toString(),
            <CachedDocument> {
                version: document.version,
                foldables: foldables,
            }
        );
    }
}

/**
 * ToggleFoldables contains results of ?if/ifnot/endif foldables.
 * Toggle is the ?if toggle. Only matching toggles are considered foldable.
 * E.g. '?if foo' is not folder by '?endif bar'.
 */
interface FoldableToggle {
    foldable: vscode.FoldingRange;
    toggle: string;
};

export class TALFoldingProvider implements vscode.FoldingRangeProvider {
    /**
     * Match "?if toggle".
     * if/ifnot/endif can appear only at the beginning of the line.
     */
    private toggleRe = new RegExp(''
        // ?if/ifnot/endof compiler directive
        + /^\?(if(not)?|endif)\s+/.source
        // Toggle ID
        + /([a-zA-Z0-9\^_]*)/.source,
        'i');

    private _cache = new FoldablesCache();

    public async provideFoldingRanges(document: vscode.TextDocument, context: vscode.FoldingContext, token: vscode.CancellationToken): Promise<vscode.FoldingRange[]> {
        const foldables: vscode.FoldingRange[] = [];
        const foldableToggles: Array<FoldableToggle> = [];
        let lineNum: number = 0;

        const cached = this._cache.get(document);
        if (cached) {
            return cached;
        }

        for (lineNum = 0; lineNum < document.lineCount; lineNum++) {
            const line = document.lineAt(lineNum).text;
            if (line.startsWith("?if")) {
                foldables.push(new vscode.FoldingRange(lineNum, lineNum, vscode.FoldingRangeKind.Region));
            }
            else
            if (line.startsWith("?endif")) {
                if (foldables.length > 0) {
                    foldables[foldables.length-1].end = lineNum;
                }
            }
        }

        const combined_result = ([] as vscode.FoldingRange[]).concat(foldables, Array.from(foldableToggles, i => i.foldable));
        this._cache.set(document, combined_result);
        return combined_result;
    }

    private parseToggles(line: string, lineNum: number, foldables: FoldableToggle[]): void {
        /**
         * result[1] = ?if, ?ifnot, ?endif
         * result[2] = toggle-number, toggle-name,
         */
        const result = line.match(this.toggleRe) || ['', '', ''];
        if (result[2].length > 0) {
            switch (result[1]) {
                // ?if starts a new folding range
                case "?if":                
                    foldables.push(<FoldableToggle>{
                                    foldable: new vscode.FoldingRange(lineNum, lineNum, vscode.FoldingRangeKind.Region),
                                    toggle: result[2]});
                    break;

                // ?ifnot ends previous ?if folding range if present
                // ?ifnot starts a new folding range, as well.
                case "?ifnot":
                    break;
                
                case "?endif":
                    break;
            
                default:
                    break;
            }
        }
    }
}
