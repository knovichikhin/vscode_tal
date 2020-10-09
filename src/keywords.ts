"use strict";

import * as vscode from "vscode";

/**
 * Construct a completion item.
 * @param label CompletionItem label
 * @param detail CompletionItem detail:
 *               A human-readable string with additional information about this item.
 * @param documentation CompletionItem documentation:
 *                      A human-readable string that represents a doc-comment.
 * @param kind The kind of this completion item.
 * @param commitCharacters An optional set of characters that when pressed while this completion is active will accept it first and then type that character.
 * @returns a vscode.CompletionItem
 */
function makeCompletionItem(
  label: string,
  detail: string,
  documentation: string,
  kind: vscode.CompletionItemKind,
  commitCharacters: Array<string>
): vscode.CompletionItem {
  const completionItem = new vscode.CompletionItem(label, kind);
  completionItem.detail = detail;
  completionItem.documentation = new vscode.MarkdownString(documentation);
  completionItem.commitCharacters = commitCharacters;

  return completionItem;
}

export const talLibCompletionItems: vscode.CompletionItem[] = [];
talLibCompletionItems.push(
  makeCompletionItem(
    "$abs",
    "(TAL Function) $abs(expression)",
    "The `$abs` function returns the absolute value of an expression. The returned value has the same data type as the expression.\n\n`expression` - Any expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$alpha",
    "(TAL Function) $alpha(int-expression)",
    "The `$alpha` function tests the right byte of an `int` value for the presence of an alphabetic character.\n\n`int-expression` - An `int` expression",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$bitlength",
    "(TAL Function) $bitlength(variable)",
    "The `$bitlength` function returns the length, in bits, of a variable.\n\n`variable` - The identifier of a simple variable, array element, pointer, structure, or structure data item.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$bitoffset",
    "(TAL Function) $bitoffset(variable)",
    "The `$bitoffset` function returns the number of bits from the address of the zeroth structure occurrence to a structure data item.\n\n`variable` - The fully qualified identifier of a structure data item.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$dbl",
    "(TAL Function) $dbl(expression)",
    "The `$dbl` function returns an `int(32)` value from an `int`, `fixed(0)`, `real`, or `real(64)` expression.\n\n`expression` - An `int`, `fixed(0)`, `real`, or `real(64)` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$dbll",
    "(TAL Function) $dbll(int-expression, int-expression)",
    "The `$dbll` function returns an `int(32)` value from two `int` values.\n\n`int-expression` - An `int` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$dblr",
    "(TAL Function) $dblr(expression)",
    "The `$dblr` function returns an `int(32)` value from an `int`, `fixed(0)`, `real`, or `real(64)` expression and applies rounding to the result.\n\n`expression` - An `int`, `fixed(0)`, `real`, or `real(64)` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$dfix",
    "(TAL Function) $dfix(dbl-expression, fpoint)",
    "The `$dfix` function returns a `fixed(fpoint)` expression from an `int(32)` expression.\n\n`dbl-expression` - An `int(32)` arithmetic expression.\n\n`fpoint` - a value in the range `–19` through `+19` that specifies the position of the implied decimal point in the result. A positive _fpoint_ specifies the number of decimal places to the right of the decimal. A negative _fpoint_ specifies the number of integer places to the left of the decimal point.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$eflt",
    "(TAL Function) $eflt(expression)",
    "The `$eflt` function returns a `real(64)` value from an `int`, `int(32)`, `fixed(fpoint)`, or `real` expression.\n\n`expression` - An `int`, `int(32)`, `fixed(fpoint)`, or `real` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$efltr",
    "(TAL Function) $efltr(expression)",
    "The `$efltr` function returns a `real(64)` value from an `int`, `int(32)`, `fixed(fpoint)`, or `real` expression and applies rounding to the result.\n\n`expression` - An `int`, `int(32)`, `fixed(fpoint)`, or `real` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$fix",
    "(TAL Function) $fix(expression)",
    "The `$fix` function returns a `fixed(0)` value from an `int`, `int(32)`, `real`, or `real(64)` expression.\n\n`expression` - An `int`, `int(32)`, `fixed`, `real`, or `real(64)` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$fixd",
    "(TAL Function) $fixd(fixed-expression)",
    "The `$fixd` function returns an `int(32)` value from a `fixed(0)` expression.\n\n`fixed-expression` - A `fixed` expression, which `$fixd` treats as a `fixed(0)` expression, ignoring any implied decimal point.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$fixi",
    "(TAL Function) $fixi(fixed-expression)",
    "The `$fixi` function returns the __signed__ `int` equivalent of a `fixed(0)` expression.\n\n`fixed-expression` - A `fixed` expression, which `$fixi` treats as a `fixed(0)` expression, ignoring any implied decimal point.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$fixl",
    "(TAL Function) $fixl(fixed-expression)",
    "The `$fixl` function returns the __unsigned__ `int` equivalent of a `fixed(0)` expression.\n\n`fixed-expression` - A `fixed` expression, which `$fixl` treats as a `fixed(0)` expression, ignoring any implied decimal point.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$flt",
    "(TAL Function) $flt(expression)",
    "The `$flt` function returns a `real` value from an `int`, `int(32)`, `fixed(fpoint)`, or `real(64)` expression.\n\n`expression` - An `int`, `int(32)`, `fixed(fpoint)`, or `real(64)` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$fltr",
    "(TAL Function) $fltr(expression)",
    "The `$fltr` function returns a `real` value from an `int`, `int(32)`, `fixed(fpoint)`, or `real(64)` expression and applies rounding to the result.\n\n`expression` - An `int`, `int(32)`, `fixed(fpoint)`, or `real(64)` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$ifix",
    "(TAL Function) $ifix(int-expression, fpoint)",
    "The `$ifix` function returns a `fixed(fpoint)` value from a signed `int` expression.\n\n`int-expression` - A signed INT expression.\n\n`fpoint` - A value in the range `–19` through `+19` that specifies the position of the implied decimal point in the result. A positive _fpoint_ specifies the number of decimal places to the right of the decimal. A negative _fpoint_ specifies the number of integer places to the left of the decimal point.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$int",
    "(TAL Function) $int(expression)",
    "The `$int` function returns an `int` value from the low-order 16 bits of an `int(32)` or `fixed(0)` expression. `$int` returns a fully converted `int` expression from a `real` or `real(64)` expression.\n\n`expression` - An `int`, `int(32)`, `fixed(0)`, `real`, or `real(64)` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$intr",
    "(TAL Function) $intr(expression)",
    "The `$intr` function returns an `int` value from the low-order 16 bits of an `int(32)` or `fixed(0)` expression. `$intr` returns a fully converted and rounded `int` expression from a `real` or `real(64)` expression.\n\n`expression` - An `int`, `int(32)`, `fixed(0)`, `real`, or `real(64)` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$len",
    "(TAL Function) $len(variable)",
    "The `$len` function returns the length, in bytes, of one occurrence of a variable.\n\n`variable` - The identifier of a simple variable, array element, pointer, structure, or structure data item.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$lfix",
    "(TAL Function) $lfix(int-expression, fpoint)",
    "The `$lfix` function returns a `fixed(fpoint)` expression from an __unsigned__ `int` expression.\n\n`int-expression` - An __unsigned__ INT expression.\n\n`fpoint` - A value in the range `–19` through `+19` that specifies the position of the implied decimal point in the result. A positive _fpoint_ specifies the number of decimal places to the right of the decimal. A negative _fpoint_ specifies the number of integer places to the left of the decimal point.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$lmax",
    "(TAL Function) $lmax(int-expression, int-expression)",
    "The `$lmax` function returns the maximum of two __unsigned__ `int` expressions.\n\n`int-expression` - An __unsigned__ INT expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$lmin",
    "(TAL Function) $lmin(int-expression, int-expression)",
    "The `$lmin` function returns the minimum of two __unsigned__ `int` expressions.\n\n`int-expression` - An __unsigned__ INT expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$max",
    "(TAL Function) $max(expression, expression)",
    "The `$max` function returns the maximum of two signed `int`, `int(32)`, `fixed(fpoint)`, `real`, or `real(64)` expressions.\n\n`expression` - A signed `int`, `int(32)`, `fixed(fpoint)`, `real`, or `real(64)` expression. Both expressions must be of the same data type.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$min",
    "(TAL Function) $min(expression, expression)",
    "The `$min` function returns the minimum of two signed `int`, `int(32)`, `fixed(fpoint)`, `real`, or `real(64)` expressions.\n\n`expression` - A signed `int`, `int(32)`, `fixed(fpoint)`, `real`, or `real(64)` expression. Both expressions must be of the same data type.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$numeric",
    "(TAL Function) $numeric(int-expression)",
    "The `$numeric` function tests the right half of an `int` value for the presence of an ASCII numeric character.\n\n`int-expression` - An `int` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$occurs",
    "(TAL Function) $occurs(variable)",
    "The `$occurs` function returns the number of occurrences of a variable.\n\n`variable` - The identifier of:\n- An array, structure, or substructure (but not a template structure)\n- An array declared in a structure",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$offset",
    "(TAL Function) $offset(variable)",
    "The `$offset` function returns the number of bytes from the address of the zeroth structure occurrence to a structure data item.\n\n`variable` - The fully qualified identifier of a structure data item - a substructure, simple variable, array, simple pointer, or structure pointer declared within a structure.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$optional",
    "(TAL Function) $optional(cond-expression, param | param-pair)",
    "The `$optional` function controls whether a given parameter or parameter pair is passed to a `variable` or `extensible` procedure in a D20 or later object file.\n\n`cond-expression` - A conditional expression. If _cond-expression_ is true, _param_ or _param-pair_ is passed. If _cond-expression_ is false, _param_ (or _param-pair_) is not passed.\n\n`param` - A variable identifier or an expression that defines an actual parameter to pass to a formal parameter declared in the called procedure if _cond-expression_ is true.\n\n`param-pair` - An actual parameter pair to pass to a formal parameter pair declared in the called procedure if _cond-expression_ is true. _param-pair_ has the form `string : length`:\n- `string` - the identifier of a `string` array or simple pointer declared inside or outside a structure.\n- `length` - An `int` expression that specifies the length, in bytes, of _string_.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$param",
    "(TAL Function) $param(formal-param)",
    "The `$param` function checks for the presence or absence of an actual parameter in the call that invoked the current procedure or subprocedure.\n\n`formal-param` - The identifier of a formal parameter as specified in the procedure or subprocedure declaration.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$udbl",
    "(TAL Function) $udbl(int-expression)",
    "The `$udbl` function returns an `int(32)` value from an unsigned `int` expression.\n\n`int-expression` - An unsigned `int` expression.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);
talLibCompletionItems.push(
  makeCompletionItem(
    "$xadr",
    "(TAL Function) $xadr(variable)",
    "The `$xadr` function converts a standard address to an extended address.\n\n`variable` - The identifier of a simple variable, pointer, array element, structure, or structure data item. For any other variable, the compiler issues a warning.",
    vscode.CompletionItemKind.Function,
    ["(", "\t"]
  )
);

export const talKeywordCompletionItems: vscode.CompletionItem[] = [];
talKeywordCompletionItems.push(
  makeCompletionItem("and", "", "", vscode.CompletionItemKind.Operator, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("begin", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("by", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("call", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("case", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("define", "", "", vscode.CompletionItemKind.TypeParameter, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("do", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("downto", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("drop", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("else", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("end", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("external", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("fixed", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("for", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("forward", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("if", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("int", "", "", vscode.CompletionItemKind.TypeParameter, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("int(32)", "", "", vscode.CompletionItemKind.TypeParameter, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("land", "", "", vscode.CompletionItemKind.Operator, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("literal", "", "", vscode.CompletionItemKind.TypeParameter, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("lor", "", "", vscode.CompletionItemKind.Operator, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("not", "", "", vscode.CompletionItemKind.Operator, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("of", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("or", "", "", vscode.CompletionItemKind.Operator, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("otherwise", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("proc", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("real", "", "", vscode.CompletionItemKind.TypeParameter, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("real(64)", "", "", vscode.CompletionItemKind.TypeParameter, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("return", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("rscan", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("scan", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("string", "", "", vscode.CompletionItemKind.TypeParameter, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("struct", "", "", vscode.CompletionItemKind.TypeParameter, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("subproc", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("then", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("to", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("unsigned", "", "", vscode.CompletionItemKind.TypeParameter, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("until", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("use", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("variable", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("while", "", "", vscode.CompletionItemKind.Keyword, ["\t"])
);
talKeywordCompletionItems.push(
  makeCompletionItem("xor", "", "", vscode.CompletionItemKind.Operator, ["\t"])
);

export const taclBuiltinKeywords: vscode.CompletionItem[] = [];
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#abend",
    "Built-In Function #ABEND [/options/] [[\\node-name.]{$process-name | cpu,pin} [text]]",
    "Immediately terminates a process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#aborttransaction",
    "Built-In Function #ABORTTRANSACTION",
    "Aborts and backs out a transaction",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#activateprocess",
    "Built-In Function #ACTIVATEPROCESS [[\\node-name.]{$process-name | cpu,pin}]",
    "Returns process or process pair from suspended state to ready state",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#adddsttransition",
    "Built-In Function #ADDDSTTRANSITION low-gmt high-gmt offset",
    "(Super-Group Only)\n\nAdds entry to daylight savings time transition table",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#alterpriority",
    "Built-In Function #ALTERPRIORITY [[\\node-name.]{$process-name | cpu,pin}] pri",
    "Changes execution priority of a process or process pair",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#append",
    "Built-In Function #APPEND to-variable-level [text]",
    "Appends additional lines to a variable level",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#appendv",
    "Built-In Function #APPENDV to-variable-level {from-variable-level | string}",
    "Appends a line from one variable level to another",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#argument",
    "Built-In Function #ARGUMENT [/options/] alternative [alternative] ...",
    "Parses arguments to routines",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#backupcpu",
    "Built-In Function #BACKUPCPU [cpu]",
    "Sets or changes the TACL backup CPU",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#begintransaction",
    "Built-In Function #BEGINTRANSACTION",
    "Starts a new transaction",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#breakpoint",
    "Built-In Function #BREAKPOINT variable-level state",
    "Sets or deletes _DEBUGGER breakpoint for a specific variable level",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#builtins",
    "Built-In Function #BUILTINS [/{FUNCTIONS | VARIABLES}/]",
    "Examines names of TACL built-in functions and variables",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#case",
    "Built-In Function #CASE text enclosure",
    "Chooses one out of a set of options",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#changeuser",
    "Built-In Function #CHANGEUSER [/CHANGEDEFAULTS/] {group-name.user-name | group-id,user-id | alias} password",
    "Logs user on under different user ID",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#charaddr",
    "Built-In Function #CHARADDR variable-level line-addr",
    "Converts line address to character address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#charbreak",
    "Built-In Function #CHARBREAK variable-level char-addr",
    "Inserts line break in variable at character address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#charcount",
    "Built-In Function #CHARCOUNT variable-level",
    "Obtains number of characters in variable",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#chardel",
    "Built-In Function #CHARDEL variable-level char-addr-1 [for char-count | to char-addr-2]",
    "Deletes characters from variable at character address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#charfind",
    "Built-In Function #CHARFIND [/EXACT/] variable-level char-addr text",
    "Locates text in variable, searching forward from character address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#charfindr",
    "Built-In Function #CHARFINDR [/EXACT/] variable-level char-addr text",
    "Locates text in variable, searching backward from character address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#charfindrv",
    "Built-In Function #CHARFINDRV [/EXACT/] variable-level char-addr string",
    "Locates string in variable, searching backward from character address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#charfindv",
    "Built-In Function #CHARFINDV [/EXACT/] string-1 char-addr string-2",
    "Locates string in variable, searching forward from character address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#charget",
    "Built-In Function #CHARGET variable-level char-addr-1 [for char-count | to char-addr-2]",
    "Obtains copy of specified number of characters from a variable",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#chargetv",
    "Built-In Function #CHARGETV var-1 var-2 char-addr-1 [for char-count | to char-addr-2]",
    "Copies specified number of characters from one variable to another",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#charins",
    "Built-In Function #CHARINS string char-addr text",
    "Inserts text into a variable at character address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#charinsv",
    "Built-In Function #CHARINSV variable-level char-addr string",
    "Inserts string into a variable at character address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#coldloadtacl",
    "Built-In Function #COLDLOADTACL",
    "Determines if TACL process is the â€œcold-load TACLâ€",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#comparev",
    "Built-In Function #COMPAREV string-1 string-2",
    "Compares one variable with another",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#compute",
    "Built-In Function #COMPUTE expression",
    "Returns value of expression",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#computejuliandayno",
    "Built-In Function #COMPUTEJULIANDAYNO year month day",
    "Converts Gregorian calendar date to a Julian day number",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#computetimestamp",
    "Built-In Function #COMPUTETIMESTAMP year month day hour min sec milli micro",
    "Converts calendar date to a four-word timestamp",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#computetransid",
    "Built-In Function #COMPUTETRANSID system cpu sequence crash-count",
    "Converts separate components of a transaction ID to one numeric transaction ID",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#contime",
    "Built-In Function #CONTIME timestamp",
    "Converts timestamp to seven-digit date and time",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#convertphandle",
    "Built-In Function #CONVERTPHANDLE {/PROCESSID/ integer-string} | {/INTEGERS/ process-identifier}",
    "Converts a process file identifier to a process handle, or vice versa",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#convertprocesstime",
    "Built-In Function #CONVERTPROCESSTIME process-time",
    "Converts time value obtained by PROCESSTIME option of #PROCESSINFO",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#converttimestamp",
    "Built-In Function #CONVERTTIMESTAMP gmt-timestamp direction [\\node-name]",
    "Converts GMT timestamp to a local-time-based timestamp, or a local-time-based timestamp to a GMT timestamp",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#createfile",
    "Built-In Function #CREATEFILE [/options/] file-name",
    "Creates a file",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#createprocessname",
    "Built-In Function #CREATEPROCESSNAME",
    "Creates unique process name",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#createremotename",
    "Built-In Function #CREATEREMOTENAME \\node-name",
    "Returns process name unique to specified system",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#debugprocess",
    "Built-In Function #DEBUGPROCESS [/NOW/] [\\node-name.]{$process-name | cpu,pin}[, term [\\node-name.]$terminal-name]",
    "Calls debugger for specified process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#def",
    "Built-In Function #DEF variable {{ALIAS | DELTA | MACRO | ROUTINE |TEXT} enclosure} | {{DIRECTORY [segment-spec]} | {STRUCT structure-body}}",
    "Defines a variable",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#defineadd",
    "Built-In Function #DEFINEADD define-name [flag]",
    "Adds a DEFINE to TACL context, using attributes in the working set",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definedelete",
    "Built-In Function #DEFINEDELETE define-name",
    "Deletes a DEFINE from TACL context",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definedeleteall",
    "Built-In Function #DEFINEDELETEALL",
    "Deletes all DEFINEs from TACL context",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#defineinfo",
    "Built-In Function #DEFINEINFO define-name",
    "Gets information about a DEFINE",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definenames",
    "Built-In Function #DEFINENAMES define-template",
    "Gets names of all DEFINEs that match specified template",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definenextname",
    "Built-In Function #DEFINENEXTNAME [define-name]",
    "Gets name of next DEFINE following specified DEFINE in sequence established by the operating system",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definereadattr",
    "Built-In Function #DEFINEREADATTR {define-name | _} {attribute-name | cursor-mode}",
    "Gets value of specified attribute",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definerestore",
    "Built-In Function #DEFINERESTORE [/options/] buffer",
    "Creates or replaces active DEFINE, or replaces working set with contents of DEFINE previously saved with #DEFINESAVE",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definerestorework",
    "Built-In Function #DEFINERESTOREWORK",
    "Restores DEFINE working set from background set",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definesave",
    "Built-In Function #DEFINESAVE [/WORK/] define-name buffer",
    "Saves copy of active DEFINE or working set for later restoration with #DEFINERESTORE",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definesavework",
    "Built-In Function #DEFINESAVEWORK",
    "Saves DEFINE current working set to background set",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definesetattr",
    "Built-In Function #DEFINESETATTR attribute-name [attribute-value]",
    "Modifies value of specified DEFINE attribute in current working set",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definesetlike",
    "Built-In Function #DEFINESETLIKE define-name",
    "Initializes current working set with attributes of an existing DEFINE",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definevalidatework",
    "Built-In Function #DEFINEVALIDATEWORK",
    "Checks DEFINE current working set for consistency",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#delay",
    "Built-In Function #DELAY csecs",
    "Causes TACL to wait for specified time",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#delta",
    "Built-In Function #DELTA [/COMMANDS variable-level/] [text]",
    "Acts as a complex character processor",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#deviceinfo",
    "Built-In Function #DEVICEINFO/options/ {$device-name | file-name}",
    "Gets detailed information about a device",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#empty",
    "Built-In Function #EMPTY [text]",
    "Determines whether specified string contains text",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#emptyv",
    "Built-In Function #EMPTYV [/BLANK/] string",
    "Determines whether a variable level contains any lines",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#emsaddsubject",
    "Built-In Function #EMSADDSUBJECT [/SSID ssid/] buffer-var token-id [token-value]",
    "Adds subject token to event message buffer",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#emsaddsubjectv",
    "Built-In Function #EMSADDSUBJECTV [/SSID ssid/] buffer-var token-id source-var",
    "Adds subject token to event message buffer, obtaining token values from a STRUCT",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#emsget",
    "Built-In Function #EMSGET [/options/] buffer-var get-op",
    "Retrieves token values from SPI buffer",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#emsgetv",
    "Built-In Function #EMSGETV [/options/] buffer-var get-op result-var",
    "Copies token values from SPI buffer to a STRUCT",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#emsinit",
    "Built-In Function #EMSINIT [/options/] buffer-var ssid event-number token-id [token-value] ...",
    "Initializes a STRUCT as event message buffer",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#emsinitv",
    "Built-In Function #EMSINITV [/options/] buffer-var ssid event-number token-id source-var",
    "Initializes STRUCT as event message buffer, obtaining initial values from another STRUCT",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#emstext",
    "Built-In Function #EMSTEXT [/options/] buffer-var",
    "Converts information from event buffer to printable text",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#emstextv",
    "Built-In Function #EMSTEXTV [/options/] buffer-var formatted-var [lengths-var]",
    "Converts information from event buffer to printable text, copies text to a STRUCT",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#endtransaction",
    "Built-In Function #ENDTRANSACTION",
    "Commits data base changes associated with a transaction",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#eof",
    "Built-In Function #EOF variable-level",
    "Sets flag so that a process receives an end-of-file after reading all data in a variable",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#errortext",
    "Built-In Function #ERRORTEXT /options/",
    "Used with exception handlers to catch error text",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#exception",
    "Built-In Function #EXCEPTION",
    "Determines why a routine was invoked during exception handling",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#extract",
    "Built-In Function #EXTRACT variable-level",
    "Deletes first line of a variable level",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#extractv",
    "Built-In Function #EXTRACTV from-variable-level to-variable-level",
    "Moves first line of a variable level to another variable",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#filegetlockinfo",
    "Built-In Function #FILEGETLOCKINFO [/option/] fvname control lockdesc participants",
    "Obtains information about record locks and file locks",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#fileinfo",
    "Built-In Function #FILEINFO /options/ file-name",
    "Gets information about a file",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#filenames",
    "Built-In Function #FILENAMES [/options/] [file-name-template]",
    "Lists file names",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#filter",
    "Built-In Function #FILTER [exception [exception] ... ]",
    "Indicates which exceptions a routine can handle",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#frame",
    "Built-In Function #FRAME",
    "Tracks pushed variables",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#getconfiguration",
    "Built-In Function #GETCONFIGURATION /options/",
    "Obtains settings of flags that affect TACL behavior",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#getprocessstate",
    "Built-In Function #GETPROCESSSTATE [/options/]",
    "Obtains process state information about the current TACL process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#getscan",
    "Built-In Function #GETSCAN",
    "Obtains number of characters passed over by #ARGUMENT",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#history",
    "Built-In Function #HISTORY [/options/]",
    "Operates on commands in history buffer",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#if",
    "Built-In Function #IF [NOT] numeric-expression [enclosure]",
    "Executes one of two options",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#initterm",
    "Built-In Function #INITTERM",
    "Resets your home terminal to its configured settings",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#inlineeof",
    "Built-In Function #INLINEEOF",
    "Sends end-of-file to process running under control of INLINE facility",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#input",
    "Built-In Function #INPUT [/options/] [prompt]",
    "Reads information from TACL primary input file",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#inputv",
    "Built-In Function #INPUTV [/options/] variable-level prompt-string",
    "Reads information from TACL primary input file into a variable level",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#interactive",
    "Built-In Function #INTERACTIVE [/CURRENT/]",
    "Determines whether your TACL is interactive",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#interpretjuliandayno",
    "Built-In Function #INTERPRETJULIANDAYNO julian-day-num",
    "Converts Julian day number to year, month, and day",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#interprettimestamp",
    "Built-In Function #INTERPRETTIMESTAMP four-word-timestamp",
    "Breaks down four-word timestamp to its component parts",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#interprettransid",
    "Built-In Function #INTERPRETTRANSID transid",
    "Converts numeric transaction ID to its separate component values",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#juliantimestamp",
    "Built-In Function #JULIANTIMESTAMP [type [tuid-request]]",
    "Obtains four-word timestamp",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#keep",
    "Built-In Function #KEEP num variable",
    "Removes all but specified level of a variable",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#keys",
    "Built-In Function #KEYS",
    "Displays defined function keys",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#lineaddr",
    "Built-In Function #LINEADDR variable-level char-addr",
    "Converts character address to line address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#linebreak",
    "Built-In Function #LINEBREAK variable-level line-addr char-offset",
    "Inserts line break in variable at line address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#linecount",
    "Built-In Function #LINECOUNT variable-level",
    "Built-In unction Obtains number of lines in a variable",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#linedel",
    "Built-In Function #LINEDEL variable-level line-addr-1 [FOR line-count | TO line-addr-2]",
    "Deletes lines from variable at line address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#linefind",
    "Built-In Function #LINEFIND [/EXACT/] variable-level line-addr text",
    "Locates text in variable, searching forward from line address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#linefindr",
    "Built-In Function #LINEFINDR [/EXACT/] variable-level line-addr text",
    "Locates text in variable, searching backward from line address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#linefindrv",
    "Built-In Function #LINEFINDRV [/EXACT/] variable-level line-addr string",
    "Locates string in variable, searching backward from line address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#linefindv",
    "Built-In Function #LINEFINDV [/EXACT/] variable-level line-addr string",
    "Locates string in variable, searching forward from line address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#lineget",
    "Built-In Function #LINEGET string line-addr-1 [FOR line-count | TO line-addr-2]",
    "Gets copy of specified number of lines from a variable",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#linegetv",
    "Built-In Function #LINEGETV string variable-level line-addr-1 [FOR line-count | TO line-addr-2]",
    "Copies specified number of lines from one variable to another",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#lineins",
    "Built-In Function #LINEINS variable-level line-addr text",
    "Inserts text into a variable at line address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#lineinsv",
    "Built-In Function #LINEINSV variable-level line-addr string",
    "Inserts string into a variable at line address",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#linejoin",
    "Built-In Function #LINEJOIN variable-level line-addr",
    "Deletes line break at end of a line, joining following line to it",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#load",
    "Built-In Function #LOAD [/options/] file-name",
    "Processes a TACL library file",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#xloadedfiles",
    "Built-In Function #XLOADEDFILES [\\node-name.]{$process-name | cpu,pin}",
    "Gets information about all LOADFILES associated with a given process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#lockinfo",
    "Built-In Function #LOCKINFO lock-spec tag buffer",
    "Gets information about record locks",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#logoff",
    "Built-In Function #LOGOFF [/options/]",
    "Logs off current TACL",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#lookupprocess",
    "Built-In Function #LOOKUPPROCESS /options/ specifier",
    "Gets information about a PPD entry",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#loop",
    "Built-In Function #LOOP enclosure",
    "Repeatedly executes one or more statements in a function",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#match",
    "Built-In Function #MATCH template [text]",
    "Determines whether given string satisfies a template",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#mom",
    "Built-In Function #MOM",
    "Obtains identity of creator process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#more",
    "Built-In Function #MORE",
    "Determines whether an entire argument has been consumed",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#mygmom",
    "Built-In Function #MYGMOM",
    "Obtains identity of TACL job ancestor process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#mypid",
    "Built-In Function #MYPID",
    "Obtains your CPU,PIN number",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#mysystem",
    "Built-In Function #MYSYSTEM",
    "Determines name of system executing current TACL",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#newprocess",
    "Built-In Function #NEWPROCESS program-file [/options/] [param-set]",
    "Starts a process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#nextfilename",
    "Built-In Function #NEXTFILENAME [file-name]",
    "Determines file following specified file",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#openinfo",
    "Built-In Function #OPENINFO /options/ {file-name | device-name} tag",
    "Gets information about file openers",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#output",
    "Built-In Function #OUTPUT [/options/] [text]",
    "Writes data to an output file",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#outputv",
    "Built-In Function #OUTPUTV [/options/] string",
    "Writes contents of a variable level to an output file",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#pause",
    "Built-In Function #PAUSE [[\\node-name.]{$process-name | cpu,pin}]",
    "Gives control of your terminal to another process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#pop",
    "Built-In Function #POP variable [[,] variable] ...",
    "Deletes top level of variables",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#process",
    "Built-In Function #PROCESS",
    "Obtains identity of last process created or paused for by TACL",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#processexists",
    "Built-In Function #PROCESSEXISTS [\\node-name.]{$process-name | cpu,pin}",
    "Determines whether a process exists",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#processinfo",
    "Built-In Function #PROCESSINFO /options/ [[\\node-name.]{$process-name | cpu,pin}]",
    "Requests information about a process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#processlaunch",
    "Built-In Function #PROCESSLAUNCH program-file [/options/] [param-set]",
    "Starts a process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#processorstatus",
    "Built-In Function #PROCESSORSTATUS [\\node-name]",
    "Determines status of 16 possible CPUs on a given system",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#processortype",
    "Built-In Function #PROCESSORTYPE [/BOTH | NAME/] {{[\\node-name.]{$process-name | cpu,pin} | cpu-num}",
    "Determines processor type of given system or process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#purge",
    "Built-In Function #PURGE file-name",
    "Deletes a file",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#push",
    "Built-In Function #PUSH variable [[,] variable] ...",
    "Creates new top level for variables",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#raise",
    "Built-In Function #RAISE exception",
    "Defines exception to be filtered by routine",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#rename",
    "Built-In Function #RAISE exception",
    "Changes name of existing disk file",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#reply",
    "Built-In Function #REPLY [text]",
    "Adds text to reply if TACL IN file is $RECEIVE",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#replyv",
    "Built-In Function #REPLYV string",
    "Adds copy of text from variable to reply if TACL IN file is $RECEIVE",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#requester",
    "Built-In Function #REQUESTER [/options/] {CLOSE variable-level} {READ file-name error-var read-var prompt-var} | {WRITE file-name error-var write-var}",
    "Reads from and writes to files",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#reset",
    "Built-In Function #RESET option [option] ...",
    "Sets argument pointer, frame pointer, reply value, and result text",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#rest",
    "Built-In Function #REST",
    "Obtains remaining argument string for current routine",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#result",
    "Built-In Function #RESULT [text]",
    "Supplies text that replaces original invocation of routine",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#return",
    "Built-In Function #RETURN",
    "Exits from a routine immediately",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#routinename",
    "Built-In Function #ROUTINENAME",
    "Obtains name of variable in which containing routine resides",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#segment",
    "Built-In Function #SEGMENT [/USED/]",
    "Obtains name of segment file that TACL is using for its variables",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#segmentconvert",
    "Built-In Function #SEGMENTCONVERT /FORMAT {a | b}/ old-file-name new-file-name",
    "Converts segment file between C00/C10 format and newer format",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#segmentinfo",
    "Built-In Function #SEGMENTINFO /options/ [segment-id]",
    "Gets information about segments",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#segmentversion",
    "Built-In Function #SEGMENTVERSION file-name",
    "Determines whether segment file is C00/C10 format or newer format",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#server",
    "Built-In Function #SERVER /options/ [server-name]",
    "Creates and deletes servers",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#set",
    "Built-In Function #SET {[/options/] variable-level [text]} | {built-in-variable [built-in-text]}",
    "Puts data in a variable level",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#setbytes",
    "Built-In Function #SETBYTES destination source",
    "Copies as many bytes as can fit from one STRUCT or STRUCT item to another",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#setconfiguration",
    "Built-In Function #SETCONFIGURATION /options/ [tacl-image-name]",
    "Sets the configuration of the running TACL process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#setmany",
    "Built-In Function #SETMANY variable-name-list, [text]",
    "Sets more than one variable level",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#setprocessstate",
    "Built-In Function #SETPROCESSSTATE /LOGGEDON | TSNLOGON | STOPONLOGOFF | PROPAGATELOGON | PROPAGATESTOPONLOGOFF/ {0 | 1}",
    "Sets a process state flag for the current TACL process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#setscan",
    "Built-In Function #SETSCAN num",
    "Indicates position at which next #ARGUMENT is to resume processing arguments",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#setsystemclock",
    "Built-In Function #SETSYSTEMCLOCK julian-gmt mode [tuid]",
    "(Super-Group Only)\n\nChanges setting of system clock",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#setv",
    "Built-In Function #SETV dest-variable-level source-string",
    "Use Copies one variable level to another",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#shiftstring",
    "Built-In Function #SHIFTSTRING [/option/] [text]",
    "Changes text from uppercase to lowercase or from lowercase to uppercase",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#sort",
    "Built-In Function #SORT [/option/] [text]",
    "Sorts a list of text",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#spiformatclose",
    "Built-In Function #SPIFORMATCLOSE",
    "Closes an open EMS formatter template file",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#ssget",
    "Built-In Function #SSGET [/options/] buffer-var get-op",
    "Retrieves binary token values from an SPI buffer and returns an external representation of those values",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#ssgetv",
    "Built-In Function #SSGETV [/options/] buffer-var get-op result-var",
    "Copies binary token values from an SPI buffer to a STRUCT",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#ssinit",
    "Built-In Function #SSINIT [/TYPE 0/] buffer-var ssid command [/type-0-option [, type-0-option] ... /] token-id",
    "Prepares a STRUCT for use with other #SSxxx s",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#ssmove",
    "Built-In Function #SSMOVE [/options/] source-var dest-var token-id",
    "Copies tokens from one SPI buffer to another",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#ssnull",
    "Built-In Function #SSNULL token-map struct",
    "Initializes extensible structured tokens",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#ssput",
    "Built-In Function #SSPUT [/options/] buffer-var token-id [token-value [token-value] ...]",
    "Converts external representation of token values to binary form, puts them in SPI buffer",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#ssputv",
    "Built-In Function #SSPUTV [/options/] buffer-var token-id source-var",
    "Copies binary token values from a variable level into an SPI buffer",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#stop",
    "Built-In Function #STOP [/options/] [[\\node-name.]{$process-name | cpu,pin} [text]]",
    "Terminates a process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#suspendprocess",
    "Built-In Function #SUSPENDPROCESS [[\\node-name.]{$process-name | cpu,pin}]",
    "Suspends a process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#switch",
    "Built-In Function #SWITCH",
    "Switches TACL to its backup process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#system",
    "Built-In Function #SYSTEM [\\node-name]",
    "Temporarily changes your default system",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#systemname",
    "Built-In Function #SYSTEMNAME system-number",
    "Requests a system by name",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#systemnumber",
    "Built-In Function #SYSTEMNUMBER \\node-name",
    "Requests a system by number",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#tacloperation",
    "Built-In Function #TACLOPERATION",
    "Determines whether TACL is reading commands from IN or $RECEIVE",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#taclversion",
    "Built-In Function #TACLVERSION /REVISION/",
    "Obtains TACL product number",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#timestamp",
    "Built-In Function #TIMESTAMP",
    "Obtains internal form of CPU interval clock",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#tosversion",
    "Built-In Function #TOSVERSION [\\node-name]",
    "Obtains current RVU of the operating system",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#unframe",
    "Built-In Function #UNFRAME",
    "Pops all variables pushed since #FRAME",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#userid",
    "Built-In Function #USERID user",
    "Specifies a user by user ID",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#username",
    "Built-In Function #USERNAME user",
    "Specifies a user by user name",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#variableinfo",
    "Built-In Function #VARIABLEINFO /options/ variable-level",
    "Gets information about a variable",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#variables",
    "Built-In Function #VARIABLES [/{BREAKPOINT | IO}/]",
    "Obtains names of all variables in your home directory",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#variablesv",
    "Built-In Function #VARIABLESV [/{BREAKPOINT | IO}/] variable-level",
    "Obtains names of all your variables, puts them on separate lines in an existing variable level",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#wait",
    "Built-In Function #WAIT variable-level [variable-level] ...",
    "Specifies variables for which a routine must wait",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#xfileinfo",
    "Built-In Function #XFILEINFO [file-name-template [[,] file-name-template] ...]",
    "Displays information about one or more disk files",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#xfilenames",
    "Built-In Function #XFILENAMES [file-name-template [[,] file-name-template] ...]",
    "Displays the names of all files that satisfy the filename specifications in the file-name-template",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#xfiles",
    "Built-In Function #XFILES [subvol-template [[,] subvol-template ] ...]",
    "Displays the names of files in one or more subvolumes",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#xlogon",
    "Built-In Function #XLOGON {group-name.user-name | group-id,user- id | alias} [‚ {password | old-password‚ new-password | old-password‚ new-password‚ new-password}] [; parameter [, parameter ] ...]",
    "Establishes communication with a TACL process",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#xppd",
    "Built-In Function #XPPD [[\\node-name][.{$process-name | cpu,pin | *}] ...]",
    "Displays the names, cpu,pin designations, and ancestors of one or more processes in the destination control table (DCT)",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#xstatus",
    "Built-In Function #XSTATUS [[\\node-name.]{$process-name | cpu,pin | cpu-number | *}] [, conditions] ... [, DETAIL] [, STOP]",
    "Displays information about one or more running processes",
    vscode.CompletionItemKind.Function,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#assign",
    "Built-In Variable #ASSIGN [/options/ logical-unit]",
    "Holds information about all currently defined unit names",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#breakmode",
    "Built-In Variable #BREAKMODE {DISABLE | ENABLE | POSTPONE}",
    "Affects BREAK key operation",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#characterrules",
    "Built-In Variable #CHARACTERRULES",
    "Holds name of current character-processing rules file",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#defaults",
    "Built-In Variable #DEFAULTS [/{CURRENT | SAVED}/]",
    "Holds volume defaults you set",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#definemode",
    "Built-In Variable #DEFINEMODE {OFF | ON}",
    "Holds flag indicating whether DEFINEs can be used",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#errornumbers",
    "Built-In Variable #ERRORNUMBERS",
    "Holds information about the latest error detected by the current TACL process",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#exit",
    "Built-In Variable #EXIT",
    "Holds state of exit flag",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#helpkey",
    "Built-In Variable #HELPKEY",
    "Holds name of current help key",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#highpin",
    "Built-In Variable #HIGHPIN {ON | OFF}",
    "Specifies the default PIN range for new processes",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#home",
    "Built-In Variable #HOME",
    "Represents your home directory",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#in",
    "Built-In Variable #IN",
    "Holds name of IN file used by TACL",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#informat",
    "Built-In Variable #INFORMAT {PLAIN | QUOTED | TACL}",
    "Represents formatting mode for #INPUT",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#inputeof",
    "Built-In Variable #INPUTEOF",
    "Holds state of INPUTEOF flag",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#inlineecho",
    "Built-In Variable #INLINEECHO",
    "Controls whether TACL echoes to its OUT file lines passed as input to inline processes",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#inlineout",
    "Built-In Variable #INLINEOUT",
    "Controls whether TACL copies to its own OUT file lines written by inline processes to their OUT files",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#inlineprefix",
    "Built-In Variable #INLINEPREFIX",
    "Holds prefix used to identify lines to be passed to inline processes instead of being acted upon by TACL",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#inlineprocess",
    "Built-In Variable #INLINEPROCESS",
    "Holds process ID of current inline process, if such exist",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#inlineto",
    "Built-In Variable #INLINETO",
    "Holds name of variable, if any, to which TACL appends lines written by inline processes to their OUT files",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#inspect",
    "Built-In Variable #INSPECT {OFF | ON | SAVEABEND}",
    "Holds state of INSPECT flag",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#myterm",
    "Built-In Variable #MYTERM",
    "Holds name of your home terminal",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#out",
    "Built-In Variable #OUT",
    "Holds name of OUT file used by TACL",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#outformat",
    "Built-In Variable #OUTFORMAT {PLAIN | PRETTY | TACL}",
    "Represents formatting mode for #OUTPUT",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#param",
    "Built-In Variable #PARAM [param-name]",
    "Holds list of all your parameters, or a specified parameter",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#pmsearchlist",
    "Built-In Variable #PMSEARCHLIST",
    "Holds list of subvolumes to be searched for program and macro files",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#pmsg",
    "Built-In Variable #PMSG",
    "Holds state of PMSG flag",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#prefix",
    "Built-In Variable #PREFIX",
    "Holds contents of prefix string",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#prompt",
    "Built-In Variable #PROMPT",
    "Represents state of prompt flag",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#replyprefix",
    "Built-In Variable #REPLYPREFIX",
    "Holds value of your reply prefix",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#routepmsg",
    "Built-In Variable #ROUTEPMSG {ALL | STANDARD | (message-type [message-type] ...)}",
    "Suppresses the outputting of system and process messages",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#shiftdefault",
    "Built-In Variable #SHIFTDEFAULT {DOWN | NOOP | UP}",
    "Holds #SHIFTSTRING default",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#taclsecurity",
    "Built-In Variable #TACLSECURITY",
    "Represents TACL security",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#trace",
    "Built-In Variable #TRACE",
    "Represents state of TRACE flag",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#uselist",
    "Built-In Variable #USELIST",
    "Holds your use list",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#wakeup",
    "Built-In Variable #WAKEUP",
    "Represents setting of WAKEUP flag",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
taclBuiltinKeywords.push(
  makeCompletionItem(
    "#width",
    "Built-In Variable #WIDTH",
    "Holds value of width register",
    vscode.CompletionItemKind.Variable,
    ["\t"]
  )
);
