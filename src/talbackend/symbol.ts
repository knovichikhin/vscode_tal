"use strict";

import * as antlr4ts from "antlr4ts";
import * as c3 from "antlr4-c3";

enum SymbolKind {
  globalVariable,
  procName,
  localVariable,
  subprocName,
  subLocalVariable,
}

export class ProcIdentifierSymbol extends c3.ScopedSymbol {}

export class TALSymbolTable extends c3.SymbolTable {
  public tree: antlr4ts.ParserRuleContext | undefined; // Set by owner after each parse run

  public constructor() {
    super("File Symbols", { allowDuplicateSymbols: false });
  }
}
