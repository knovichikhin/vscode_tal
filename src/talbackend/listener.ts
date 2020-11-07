"use strict";

import * as antlr4ts from "antlr4ts";
import * as c3 from "antlr4-c3";
import { TALListener } from "../talparser/TALListener";
import { ProcIdentifierSymbol, TALSymbolTable } from "./symbol";
import { ProcDeclarationIdentifierContext } from "../talparser/TALParser";

export class TALSourceListener implements TALListener {
  public constructor(private talSymbolTable: TALSymbolTable) {}

  // Collect proc names
  public enterProcDeclarationIdentifier(ctx: ProcDeclarationIdentifierContext): void {
    this.talSymbolTable.addNewSymbolOfType(ProcIdentifierSymbol, undefined, ctx.text);
    //console.log(ctx.text);
  }
}
