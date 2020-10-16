"use strict";

import * as vscode from "vscode";
import { DocumentCache } from "./cache";

export class TALDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
  /**
   * Match proc declaration
   */
  // prettier-ignore
  private procRe = new RegExp(
        // Optional data type, e.g. int, int(16), fixed(*), int(foo)
        /^\s*((?:string|int|unsigned|fixed|real)(?:\s*\(\s*(?:[0-9]{1,2}|\*|[a-zA-Z^_][a-zA-Z0-9^_]*)\s*\))?)?/.source +
        // proc keyword
        /\s*(proc)\s+/.source +
        // proc name identifier
        /([a-zA-Z^_][a-zA-Z0-9^_]*)/.source,
        "i"
    );

  /**
   * Match subproc declaration
   */
  // prettier-ignore
  private subprocRe = new RegExp(
        // Optional data type, e.g. int, int(16), fixed(*), int(foo)
        /^\s*((?:string|int|unsigned|fixed|real)(?:\s*\(\s*(?:[0-9]{1,2}|\*|[a-zA-Z^_][a-zA-Z0-9^_]*)\s*\))?)?/.source +
        // subproc keyword
        /\s*(subproc)\s+/.source +
        // subproc name identifier
        /([a-zA-Z^_][a-zA-Z0-9^_]*)/.source,
        "i"
    );

  /**
   * Forward proc declarations.
   * Match forward/external keywords to detect forward proc declarations.
   * These are reserved keywords. They can't be declared as variables.
   * So, simply searching for them is sufficient to determine
   * that this proc does not have a body.
   */
  // prettier-ignore

  private forwardProcRe = RegExp(
        /\b(?<!\^)(external|forward)(?!\^)\b/.source,
        "i"
    );

  /**
   * Match begin/end keywords.
   * These are reserved keywords. They can't be declared as variables.
   * So, simply searching for them is sufficient to determine
   * where things begin and end.
   */
  // prettier-ignore
  private beginRe = RegExp(
        /\b(?<!\^)(begin)(?=([^"]*"[^"]*")*[^"]*$)(?!\^)\b/.source,
        "ig"
    );
  // prettier-ignore
  private endRe = RegExp(
        /\b(?<!\^)(end)(?=([^"]*"[^"]*")*[^"]*$)(?!\^)\b/.source,
        "ig"
    );

  /**
   * Match "?section section_name".
   * Only one "?section" directive can appear on a source line.
   * This section continues until the next section or until EOF.
   */
  // prettier-ignore
  private sectionRe = new RegExp(
        // ?section identifier
        /^\?\s*section\s+/.source +
        // Section name
        /([a-zA-Z^_][a-zA-Z0-9^_]*)/.source,
        "i"
    );

  // sectionSymbolKind must be different from pageSymbolKind
  private readonly sectionSymbolKind = vscode.SymbolKind.Package;

  /**
   * Match '?page "heading"'.
   * "?page" directive can appear alongside other directives
   * on the same source line. Although, this is not generally
   * the case for the sake of code clarity. For this reason
   * (and for simplicity) match ?page only at the beginning
   * of a line.
   */
  // prettier-ignore
  private pageRe = new RegExp(
        // ?page identifier
        /^\?\s*page\s*/.source +
        // Optional heading
        /(?:"([^"]*)")/.source,
        "i"
    );

  // pageSymbolKind must be different from sectionSymbolKind
  private readonly pageSymbolKind = vscode.SymbolKind.String;

  private readonly _cache = new DocumentCache<vscode.DocumentSymbol>();

  public async provideDocumentSymbols(
    document: vscode.TextDocument,
    canceltoken: vscode.CancellationToken
  ): Promise<vscode.DocumentSymbol[]> {
    const procSymbols: vscode.DocumentSymbol[] = []; // Procs and subproc symbols
    const sectionSymbols: vscode.DocumentSymbol[] = []; // Sections and pages symbols
    let lineNum = 0;

    const cached = this._cache.get(document);
    if (cached) {
      return cached;
    }

    console.time(">old sp:");
    for (lineNum = 0; lineNum < document.lineCount; lineNum++) {
      const line = document.lineAt(lineNum).text;

      // Look for procs/subprocs while skipping lines.
      if (this._mapProc(document, lineNum, line, procSymbols)) {
        // get the last line where mapping stopped to continue parsing from this line
        lineNum = procSymbols[procSymbols.length - 1].range.end.line;
      } else {
        // Look for a section. Otherwise, look for a page.
        if (!this._mapSection(document, lineNum, line, sectionSymbols)) {
          this._mapPage(document, lineNum, line, sectionSymbols);
        }
      }
    }

    // If a document has procs/subprocs then present those.
    // If, however, it's a document without procs then present sections/pages instead.
    if (procSymbols.length > 0) {
      console.timeEnd(">old sp:");
      this._cache.set(document, procSymbols);
      return procSymbols;
    }

    // If a section or top level page is already started then by encountering EOF
    // it must must end
    if (sectionSymbols.length > 0) {
      sectionSymbols[sectionSymbols.length - 1].range = new vscode.Range(
        sectionSymbols[sectionSymbols.length - 1].range.start,
        new vscode.Position(lineNum - 1, document.lineAt(lineNum - 1).text.length)
      );

      // Also, close off last child page if present in the last section.
      if (
        sectionSymbols[sectionSymbols.length - 1].kind === this.sectionSymbolKind &&
        sectionSymbols[sectionSymbols.length - 1].children.length > 0
      ) {
        sectionSymbols[sectionSymbols.length - 1].children[
          sectionSymbols[sectionSymbols.length - 1].children.length - 1
        ].range = new vscode.Range(
          sectionSymbols[sectionSymbols.length - 1].children[
            sectionSymbols[sectionSymbols.length - 1].children.length - 1
          ].range.start,
          new vscode.Position(lineNum - 1, document.lineAt(lineNum - 1).text.length)
        );
      }
    }

    console.timeEnd(">old sp:");
    this._cache.set(document, sectionSymbols);
    return sectionSymbols;
  }

  /**
   * Step through proc. Find its 'begin' and 'end'.
   * Locate subprocs inside.
   *
   * @param document Document being parsed
   * @param lineNum Document's current  line number
   * @param line Document's current line instance
   * @param procSymbols An array of proc symbols
   * @return Returns true if proc symbol is found. Return false, otherwise.
   */
  private _mapProc(
    document: vscode.TextDocument,
    lineNum: number,
    line: string,
    procSymbols: vscode.DocumentSymbol[]
  ): boolean {
    let stack = 0; // begin increases stack. end decreases stack. 0=end of proc
    let endNum = 0;
    let result: string[] = [];

    /**
     * Match proc start
     * result[1] = storage type
     * result[2] = proc keyword
     * result[3] = proc name
     */
    result = line.match(this.procRe) || ["", "", "", ""];
    if (result[2].toLowerCase() !== "proc") {
      return false;
    }

    const procSymbol = new vscode.DocumentSymbol(
      result[3],
      "",
      vscode.SymbolKind.Class,
      document.lineAt(lineNum).range,
      document.lineAt(lineNum).range
    );
    procSymbols.push(procSymbol);

    // proc + external/forward declaration on the same line
    result = line.match(this.forwardProcRe) || ["", ""];
    if (result[1].toLowerCase() === "external" || result[1].toLowerCase() === "forward") {
      /**
       * These are external or forward proc declarations.
       * They do not have a body. So, there won't be any begin/end.
       */
      procSymbol.detail = result[1].toLowerCase();
      procSymbol.kind = vscode.SymbolKind.Interface;
      return true;
    }

    // End parsing here if this is the end of the document
    if (lineNum + 1 >= document.lineCount) {
      return true;
    }

    // Start parsing proc at the line after the proc line
    for (lineNum += 1; lineNum < document.lineCount; lineNum++) {
      line = document.lineAt(lineNum).text;
      line = this._removeComments(line);

      // External and forward procs do not have begin/end body.
      // Therefore, once at least 1 begin is found external and forward
      // produce a compiler error.
      if (stack <= 0) {
        result = line.match(this.forwardProcRe) || ["", ""];
        if (
          result[1].toLowerCase() === "external" ||
          result[1].toLowerCase() === "forward"
        ) {
          /**
           * These are external or forward proc declarations.
           * They do not have a body. So, there won't be any begin/end.
           */
          procSymbol.detail = result[1].toLowerCase();
          procSymbol.kind = vscode.SymbolKind.Interface;
          break;
        }
      }

      // Get number of begins on the line
      stack += (line.match(this.beginRe) || []).length;

      // Get number of ends on the line and terminate proc stack only if any ends are found.
      // This is to avoid exiting procs where begin/end are not immediately found.
      endNum = (line.match(this.endRe) || []).length;
      if (endNum > 0) {
        stack -= endNum;

        // If the stack is 0 or negative then the subproc is complete
        if (stack <= 0) {
          break;
        }
      }

      // Look for subprocs while skipping lines.
      if (this._mapSubproc(document, lineNum, line, procSymbol)) {
        // get the last line where mapping stopped
        lineNum = procSymbol.children[procSymbol.children.length - 1].range.end.line;
      }
    }

    // In case of EOF, point to the last line of the document.
    lineNum = lineNum === document.lineCount ? lineNum - 1 : lineNum;

    procSymbol.range = new vscode.Range(
      procSymbol.range.start,
      new vscode.Position(lineNum, document.lineAt(lineNum).text.length)
    );

    // If there is at least 1 subproc and proc body has at least 1 line,
    // mark start of proc body separately
    if (
      procSymbol.children.length > 0 &&
      procSymbol.children[procSymbol.children.length - 1].range.end.line + 1 <= lineNum
    ) {
      const lastSubproc = procSymbol.children[procSymbol.children.length - 1];
      procSymbol.children.push(
        new vscode.DocumentSymbol(
          "main: " + procSymbol.name,
          "",
          vscode.SymbolKind.Function,
          new vscode.Range(
            new vscode.Position(lastSubproc.range.end.line + 1, 0),
            new vscode.Position(lineNum, document.lineAt(lineNum).text.length)
          ),
          document.lineAt(lastSubproc.range.end.line + 1).range
        )
      );
    }

    return true;
  }

  /**
   * Step through proc. Find its 'begin' and 'end'.
   * Locate subprocs inside.
   *
   * @param document Document being parsed
   * @param lineNum Document's current  line number
   * @param line Document's current line instance
   * @param procSymbol A proc symbol to attach subprocs to
   * @return Returns true if subproc symbol is found. Return false, otherwise.
   */
  private _mapSubproc(
    document: vscode.TextDocument,
    lineNum: number,
    line: string,
    procSymbol: vscode.DocumentSymbol
  ): boolean {
    let stack = 0; // begin increases stack. end decreases stack. 0=end of proc
    let endNum = 0;
    let result: string[] = [];

    /**
     * result[1] = storage type
     * result[2] = subproc keyword
     * result[3] = subproc name
     */
    result = line.match(this.subprocRe) || ["", "", "", ""];
    if (result[2].toLowerCase() !== "subproc") {
      return false;
    }

    const subprocSymbol = new vscode.DocumentSymbol(
      result[3],
      "",
      vscode.SymbolKind.Method,
      document.lineAt(lineNum).range,
      document.lineAt(lineNum).range
    );
    procSymbol.children.push(subprocSymbol);

    // End parsing here if this is the end of the document
    if (lineNum + 1 >= document.lineCount) {
      return true;
    }

    // Start parsing subproc at the line after the subproc line
    for (lineNum += 1; lineNum < document.lineCount; lineNum++) {
      let line: string = document.lineAt(lineNum).text;
      line = this._removeComments(line);

      // Get number of begins on the line
      stack += (line.match(this.beginRe) || []).length;

      // Get number of ends on the line and terminate subproc stack only if any ends are found
      // This is to skip lines without any begins/ends right after the subproc declaration
      // without exiting out of the subproc parsing.
      endNum = (line.match(this.endRe) || []).length;
      if (endNum > 0) {
        stack -= endNum;

        // If the stack is 0 or negative then the subproc is complete
        if (stack <= 0) {
          break;
        }
      }
    }

    // In case of EOF, point to the last line of the document.
    lineNum = lineNum === document.lineCount ? lineNum - 1 : lineNum;

    subprocSymbol.range = new vscode.Range(
      subprocSymbol.range.start,
      new vscode.Position(lineNum, document.lineAt(lineNum).text.length)
    );

    return true;
  }

  /**
   * Detect and collect section symbol.
   *
   * @param document Document being parsed
   * @param lineNum Document's current  line number
   * @param line Document's current line instance
   * @param sectionSymbols An array of section symbols
   * @return Returns true if section symbol is found. Return false, otherwise.
   */
  private _mapSection(
    document: vscode.TextDocument,
    lineNum: number,
    line: string,
    sectionSymbols: vscode.DocumentSymbol[]
  ): boolean {
    /**
     * Match section line
     * result[1] = section name
     */
    const result = line.match(this.sectionRe) || ["", ""];
    if (result[1] !== "") {
      /**
       * If one section or top level page already started then by encountering
       * new section the previous section or top level page must end.
       * Update previous item range.
       */
      if (sectionSymbols.length > 0) {
        sectionSymbols[sectionSymbols.length - 1].range = new vscode.Range(
          sectionSymbols[sectionSymbols.length - 1].range.start,
          new vscode.Position(lineNum - 1, document.lineAt(lineNum - 1).text.length)
        );

        // Also, close off last child page if present in the previous section.
        if (
          sectionSymbols[sectionSymbols.length - 1].kind === this.sectionSymbolKind &&
          sectionSymbols[sectionSymbols.length - 1].children.length > 0
        ) {
          sectionSymbols[sectionSymbols.length - 1].children[
            sectionSymbols[sectionSymbols.length - 1].children.length - 1
          ].range = new vscode.Range(
            sectionSymbols[sectionSymbols.length - 1].children[
              sectionSymbols[sectionSymbols.length - 1].children.length - 1
            ].range.start,
            new vscode.Position(lineNum - 1, document.lineAt(lineNum - 1).text.length)
          );
        }
      }

      // Add new section
      const sectionSymbol = new vscode.DocumentSymbol(
        result[1],
        "",
        this.sectionSymbolKind,
        document.lineAt(lineNum).range,
        document.lineAt(lineNum).range
      );
      sectionSymbols.push(sectionSymbol);
      return true;
    }

    return false;
  }

  /**
   * Detect and collect page symbol.
   *
   * @param document Document being parsed
   * @param lineNum Document's current  line number
   * @param line Document's current line instance
   * @param sectionSymbols An array of section symbols
   * @return Returns true if page symbol is found. Return false, otherwise.
   */
  private _mapPage(
    document: vscode.TextDocument,
    lineNum: number,
    line: string,
    sectionSymbols: vscode.DocumentSymbol[]
  ): boolean {
    /**
     * Match page line
     * result[1] = page heading
     */
    const result = line.match(this.pageRe) || ["", ""];
    if (result[1] !== "") {
      /**
       * If previous item is a page then by encountering a new page
       * the previous page must end. Update previous item range.
       */
      if (
        sectionSymbols.length > 0 &&
        sectionSymbols[sectionSymbols.length - 1].kind === this.pageSymbolKind
      ) {
        sectionSymbols[sectionSymbols.length - 1].range = new vscode.Range(
          sectionSymbols[sectionSymbols.length - 1].range.start,
          new vscode.Position(lineNum - 1, document.lineAt(lineNum - 1).text.length)
        );
      } else if (
        /**
         * If previous item is a section then this page is a child of that section.
         * If parent section already has at least 1 page child then by encountering
         * a new page the previous page must end. Update previous item range.
         */
        sectionSymbols.length > 0 &&
        sectionSymbols[sectionSymbols.length - 1].kind === this.sectionSymbolKind &&
        sectionSymbols[sectionSymbols.length - 1].children.length > 0
      ) {
        sectionSymbols[sectionSymbols.length - 1].children[
          sectionSymbols[sectionSymbols.length - 1].children.length - 1
        ].range = new vscode.Range(
          sectionSymbols[sectionSymbols.length - 1].children[
            sectionSymbols[sectionSymbols.length - 1].children.length - 1
          ].range.start,
          new vscode.Position(lineNum - 1, document.lineAt(lineNum - 1).text.length)
        );
      }

      // A new page
      const page = new vscode.DocumentSymbol(
        result[1],
        "",
        this.pageSymbolKind,
        document.lineAt(lineNum).range,
        document.lineAt(lineNum).range
      );

      // If in the middle of a section then this page is belongs to the last section
      if (
        sectionSymbols.length > 0 &&
        sectionSymbols[sectionSymbols.length - 1].kind === this.sectionSymbolKind
      ) {
        sectionSymbols[sectionSymbols.length - 1].children.push(page);
        // Otherwise, this page appears by itself
      } else {
        sectionSymbols.push(page);
      }

      return true;
    }

    return false;
  }

  /**
   * Remove comments if present from source code line
   *
   * @param line A line in a text document
   * @return line with commented out source code removed
   */
  private _removeComments(line: string): string {
    line = line.replace(/--.*/gi, ""); // line comment --
    line = line.replace(/![^!]*(!|$)/gi, ""); // start-end comment !comment!
    return line;
  }
}
