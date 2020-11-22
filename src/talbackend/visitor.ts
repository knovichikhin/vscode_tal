"use strict";

import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import * as c3 from "antlr4-c3";
import { TALVisitor } from "../talparser/TALVisitor";
import { ProcIdentifierContext } from "../talparser/TALParser";

export class TALSymbolTableVisitor
  extends AbstractParseTreeVisitor<c3.SymbolTable>
  implements TALVisitor<c3.SymbolTable> {
  constructor(
    protected readonly symbolTable = new c3.SymbolTable("", {}),
    protected scope = symbolTable.addNewSymbolOfType(c3.ScopedSymbol, undefined)
  ) {
    super();
  }

  protected defaultResult(): c3.SymbolTable {
    return this.symbolTable;
  }

  public visitProcIdentifier(ctx: ProcIdentifierContext): c3.SymbolTable {
    this.symbolTable.addNewSymbolOfType(c3.ClassSymbol, this.scope, ctx.text);
    return this.visitChildren(ctx);
  }
}
