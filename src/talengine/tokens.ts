"use strict";

import * as vscode from "vscode";

export enum TokenType {
  unknown,
  assign,
  begin,
  closingparenthesis,
  colon,
  comma,
  comment,
  dot,
  end,
  eof,
  id,
  integerconst,
  integerdivision,
  integer,
  minus,
  multiplication,
  openingparenthesis,
  plus,
  program,
  realconst,
  realdivision,
  real,
  semi,
  variable,
  procedure,
  mod,
  true,
  false,
  boolean,
  equals,
  notequals,
  greaterthan,
  lessthan,
  greaterequals,
  lessequals,
  if,
  then,
  else,
  char,
  charconstant,
  and,
  or,
  not,
  for,
  to,
  downto,
  do,
  while,
  repeat,
  until,
  doubledot,
  array,
  of,
  openingbracket,
  closingbracket,
}

export class Token {
  public type: TokenType;
  public start: vscode.Position;
  public end: vscode.Position;

  constructor(type: TokenType, start: vscode.Position, end: vscode.Position) {
    this.type = type;
    this.start = start;
    this.end = end;
  }
}
