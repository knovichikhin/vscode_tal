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
}
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
 * ToggleFoldables contains results of ?if/?ifnot/?endif foldables.
 * Only matching toggles are considered foldable.
 * E.g. '?if foo' is not folder by '?endif bar'.
 * But it is folder by '?endif foo'.
 */
enum ToggleType {
    if = 0,
    ifnot = 1
}
interface FoldableToggle {
    foldable: vscode.FoldingRange;
    toggle_type: ToggleType;
    toggle_id: string;
}

export class TALFoldingProvider implements vscode.FoldingRangeProvider {
    /**
     * Match "?if toggle".
     * if/ifnot/endif can appear only at the beginning of the line.
     */
    private toggleRe = new RegExp(''
        // ?if/ifnot/endof compiler directive
        + /^\?(if(?:not)?|endif)\s+/.source
        // Toggle ID (mandatory)
        + /([a-zA-Z0-9^_]+)/.source,
        'i');

    private _cache = new FoldablesCache();

    public async provideFoldingRanges(document: vscode.TextDocument, context: vscode.FoldingContext, token: vscode.CancellationToken): Promise<vscode.FoldingRange[]> {
        const result: vscode.FoldingRange[] = [];
        const foldableToggles: Array<FoldableToggle> = [];
        let lineNum = 0;

        const cached = this._cache.get(document);
        if (cached) {
            return cached;
        }

        for (lineNum = 0; lineNum < document.lineCount; lineNum++) {
            const line = document.lineAt(lineNum).text;
            const foldable = this.parseToggles(line, lineNum, foldableToggles);
            if (foldable !== undefined) {
                result.push(foldable);
            }
        }

        this._cache.set(document, result);
        return result;
    }

    /**
     * Locate ?if, ?ifnot and ?endif toggles and their ranges.
     *
     * @param line Document's current line instance
     * @param lineNum Document's current line number
     * @param foldableToggles Array of intermediate toggle foldables.
     * @return Either a FoldingRange if found or undefined otherwise.
     */
    private parseToggles(line: string, lineNum: number, foldableToggles: FoldableToggle[]): vscode.FoldingRange | undefined {
        let index = -1;
        let result: vscode.FoldingRange | undefined = undefined;

        /**
         * toggle[1] = if, ifnot, endif
         * toggle[2] = toggle-number, toggle-name,
         */
        const toggle = line.match(this.toggleRe) || ['', '', ''];
        switch (toggle[1]) {
            // ?if starts a new folding range
            case "if":
                foldableToggles.push(<FoldableToggle>{
                    foldable: new vscode.FoldingRange(lineNum, lineNum, vscode.FoldingRangeKind.Region),
                    toggle_type: ToggleType.if,
                    toggle_id: toggle[2]});
                break;

            // ?ifnot ends previous ?if folding range if present
            // ?ifnot starts a new folding range, as well.
            case "ifnot":
                // Close off previous ?if
                index = this.lastToggleIndex(foldableToggles, toggle[2], [ToggleType.if]);
                if (index > -1) {
                    // If there is more than 1 line to fold then close off and return previous ?if
                    // Otherwise, simply delete previous opened ?if foldable.
                    if (lineNum - foldableToggles[index].foldable.start > 1) {
                        foldableToggles[index].foldable.end = lineNum - 1;
                        result = foldableToggles.splice(index, 1)[0].foldable;
                    }
                    else
                        foldableToggles.splice(index, 1);
                }

                // Add a new folding range
                foldableToggles.push(<FoldableToggle>{
                    foldable: new vscode.FoldingRange(lineNum, lineNum, vscode.FoldingRangeKind.Region),
                    toggle_type: ToggleType.ifnot,
                    toggle_id: toggle[2]});

                break;

            // ?endif ends previous ?if or ?ifnot folding range if present
            case "endif":
                // Close off previous ?if/?ifnot
                index = this.lastToggleIndex(foldableToggles, toggle[2], [ToggleType.if, ToggleType.ifnot]);
                if (index > -1) {
                    // If there is more than 1 line to fold then close off and return previous ?if/?ifnot
                    // Otherwise, simply delete previous opened ?if/?ifnot foldable.
                    if (lineNum - foldableToggles[index].foldable.start > 1) {
                        foldableToggles[index].foldable.end = lineNum - 1;
                        result = foldableToggles.splice(index, 1)[0].foldable;
                    }
                    else
                        foldableToggles.splice(index, 1);
                }
                break;

            default:
                break;
        }

        return result;
    }

    /**
     * Find last matching ?if or ?endif toggle and return it's index.
     * @param foldables Array of toggle foldables to be searched.
     * @param toggle_id Toggle ID to match
     * @param toggle_types Array of toggle types to match
     * @return index of the matching entry in foldables array or -1 if not found
     */
    private lastToggleIndex(foldables: FoldableToggle[], toggle_id: string, toggle_types: ToggleType[]): number {
        for(let i = foldables.length - 1; i >= 0; i--) {
            if (foldables[i].toggle_id === toggle_id &&
                toggle_types.includes(foldables[i].toggle_type))
                return i;
        }
        return -1;
    }
}
