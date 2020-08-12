import * as vscode from 'vscode';

export class TALDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    /**
     * Matche proc declaration
     */
    procRe = new RegExp(''
        // Optional data type, e.g. int, int(16), fixed(*), int(foo)
        + /^\s*((?:string|int|unsigned|fixed|real)(?:\s*\(\s*(?:[0-9]{1,2}|\*|[a-zA-Z\^_][a-zA-Z0-9\^_]*)\s*\))?)?/.source
        // proc keyword
        + /\s*(proc)\s+/.source
        // proc name identifier
        + /([a-zA-Z\^_][a-zA-Z0-9\^_]*)/.source,
        'i');

    /**
     * Match subproc declaration
     */
    subprocRe = new RegExp(''
        // Optional data type, e.g. int, int(16), fixed(*), int(foo)
        + /^\s*((?:string|int|unsigned|fixed|real)(?:\s*\(\s*(?:[0-9]{1,2}|\*|[a-zA-Z\^_][a-zA-Z0-9\^_]*)\s*\))?)?/.source
        // subproc keyword
        + /\s*(subproc)\s+/.source
        // subproc name identifier
        + /([a-zA-Z\^_][a-zA-Z0-9\^_]*)/.source,
        'i');

    /**
     * Match proc boundary keywords begin/end/external/forward.
     * Match forward/external keywords to detect forward proc declarations.
     * These are reserved keywords. They can't be declared as variables.
     * So, simply searching for them is sufficient to determine
     * where things beging and end.
     */
    procBoundaryRe = RegExp(''
        + /\b(?<!\^)(begin|end|external|forward)(?!\^)\b/.source,
        'i');

    /**
     * Match begin/end keywords.
     * These are reserved keywords. They can't be declared as variables.
     * So, simply searching for them is sufficient to determine
     * where things beging and end.
     */
    beginEndRe = RegExp(''
        + /\b(?<!\^)(begin|end)(?!\^)\b/.source,
        'i');

    public async provideDocumentSymbols(document: vscode.TextDocument, canceltoken: vscode.CancellationToken): Promise<vscode.DocumentSymbol[]> {
        const symbols: vscode.DocumentSymbol[] = [];

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i).text;
            /**
             * result[1] = storage type
             * result[2] = proc keyword
             * result[3] = proc name
             */
            let result = line.match(this.procRe) || ['', '', '', ''];
            if (result[2].toLowerCase() === 'proc') {
                const procSymbol: vscode.DocumentSymbol = this._mapProc(document, i, result[3]);
                i = procSymbol.range.end.line; // get the last line where mapping stopped
                symbols.push(procSymbol);
            }
        }
        return symbols;
    }

    /**
     * Step through proc. Find its 'begin' and 'end'.
     * Locate subprocs inside.
     *
     * @param document vscode TextDocument
     * @param lineNum Line number in `document` where proc was found
     * @param procName Proc name that will go to DocumentSymbol
     * @return proc DocumentSymbol with subproc children (if any) attached
     */
    private _mapProc(document: vscode.TextDocument, lineNum: number, procName: string): vscode.DocumentSymbol {
        let stack: number = 0; // begin increases stack. end decreases stack. 0=end of proc
        const subprocSymbols: vscode.DocumentSymbol[] = [];
        let procSymbolDetail: string = '';
        let procSymbolKind: vscode.SymbolKind = vscode.SymbolKind.Class

        // Start parsing proc at the line after the proc line
        let i: number = lineNum + 1 < document.lineCount ? lineNum + 1 : lineNum;
        for (; i < document.lineCount; i++) {
            let line: string = document.lineAt(i).text;
            line = this._removeComments(line);

            let result = line.match(this.procBoundaryRe) || ['', ''];
            if (result[1].toLowerCase() === 'begin') {
                stack += 1;
            } else if (result[1].toLowerCase() === 'end') {
                stack -= 1;
                if (stack <= 0) {
                    break;
                }
            } else if (result[1].toLowerCase() === 'external' ||
                       result[1].toLowerCase() === 'forward') {
                /**
                 * These are external or forward proc declarations.
                 * They do not have a body. So, there won't be any begin/end.
                 */
                procSymbolDetail = result[1].toLowerCase();
                procSymbolKind = vscode.SymbolKind.Interface;
                break;
            } else {
                /**
                 * result[1] = storage type
                 * result[2] = proc keyword
                 * result[3] = proc name
                 */
                result = line.match(this.subprocRe) || ['', '', '', ''];
                if (result[2].toLowerCase() === 'subproc') {
                    const subprocSymbol = this._mapSubproc(document, i, result[3]);
                    i = subprocSymbol.range.end.line; // get the last line where mapping stopped
                    subprocSymbols.push(subprocSymbol);
                }
            }
        }

        // In case nothing was found, point to the last line of the document.
        i = i === document.lineCount ? i - 1 : i;

        let procSymbol = new vscode.DocumentSymbol(
            procName,
            procSymbolDetail,
            procSymbolKind,
            new vscode.Range(
                new vscode.Position(lineNum, 0),
                new vscode.Position(i, document.lineAt(i).text.length)
            ),
            document.lineAt(lineNum).range
        );

        // If there is at least 1 subproc and proc body has at least 1 line, mark start of proc body separately
        if (subprocSymbols.length > 0 &&
            subprocSymbols[subprocSymbols.length - 1].range.end.line + 1 <= i) {
            const lastSubproc = subprocSymbols[subprocSymbols.length - 1];
            subprocSymbols.push(new vscode.DocumentSymbol(
                'main: ' + procName,
                '',
                vscode.SymbolKind.Function,
                new vscode.Range(
                    new vscode.Position(lastSubproc.range.end.line + 1, 0),
                    new vscode.Position(i, document.lineAt(i).text.length)
                ),
                new vscode.Range(
                    new vscode.Position(lastSubproc.range.end.line + 1, 0),
                    new vscode.Position(lastSubproc.range.end.line + 1, document.lineAt(lastSubproc.range.end.line + 1).text.length)
                )
            ));
        }

        procSymbol.children = subprocSymbols;
        return procSymbol;
    }

    /**
     * Step through subproc. Find its 'begin' and 'end'.
     *
     * @param document vscode TextDocument
     * @param lineNum Line number in `document` where subproc was found
     * @param procName Subproc name that will go to DocumentSymbol
     * @return subproc DocumentSymbol
     */
    private _mapSubproc(document: vscode.TextDocument, lineNum: number, subprocName: string): vscode.DocumentSymbol {
        let stack: number = 0; // begin increases stack. end decreases stack. 0=end of proc

        // Start parsing proc at the line after the proc line
        let i: number = lineNum + 1 < document.lineCount ? lineNum + 1 : lineNum;
        for (; i < document.lineCount; i++) {
            let line: string = document.lineAt(i).text;
            line = this._removeComments(line);

            let result = line.match(this.beginEndRe) || ['', ''];
            if (result[1].toLowerCase() === 'begin') {
                stack += 1;
            } else if (result[1].toLowerCase() === 'end') {
                stack -= 1;
                if (stack <= 0) {
                    break;
                }
            }
        }

        // In case nothing was found, point to the last line of the document.
        i = i === document.lineCount ? i - 1 : i;

        let subprocSymbol = new vscode.DocumentSymbol(
            subprocName,
            '',
            vscode.SymbolKind.Function,
            new vscode.Range(
                new vscode.Position(lineNum, 0),
                new vscode.Position(i, document.lineAt(i).text.length)
            ),
            document.lineAt(lineNum).range
        );
        return subprocSymbol;
    }

    /**
     * Remove comments if present from source code line
     *
     * @param line A line in a text document
     * @return line with commented out source code removed
     */
    private _removeComments(line: string): string {
        line = line.replace(/--.*/gi, '');        // line comment --
        line = line.replace(/![^!]*(!|$)/gi, ''); // start-end comment !comment!
        return line;
    }
}
