import * as vscode from 'vscode';

class Keyword {
    // CompletionItem label
    label: string;
    // CompletionItem detail:
    // A human-readable string with additional information about this item,
    // like type or symbol information.
    detail: string;
    // CompletionItem documentation:
    // A human-readable string that represents a doc-comment.
    documentation: string;
    // The kind of this completion item.
    //Based on the kind an icon is chosen by the editor.
    kind: vscode.CompletionItemKind;

    constructor(label: string, detail: string, documentation: string, kind: vscode.CompletionItemKind) {
        this.label = label;
        this.detail = detail;
        this.documentation = documentation;
        this.kind = kind;
    }
}

const keywords: Array<Keyword> = [];
keywords.push(
    new Keyword(
        '$abs',
        '(TAL Function) $abs(expression)',
        'The `$abs` function returns the absolute value of an expression. The returned value has the same data type as the expression.\n\n`expression` - Any expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$alpha',
        '(TAL Function) $alpha(int-expression)',
        'The `$alpha` function tests the right byte of an `int` value for the presence of an alphabetic character.\n\n`int-expression` - An `int` expression',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$bitlength',
        '(TAL Function) $bitlength(variable)',
        'The `$bitlength` function returns the length, in bits, of a variable.\n\n`variable` - The identifier of a simple variable, array element, pointer, structure, or structure data item.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$bitoffset',
        '(TAL Function) $bitoffset(variable)',
        'The `$bitoffset` function returns the number of bits from the address of the zeroth structure occurrence to a structure data item.\n\n`variable` - The fully qualified identifier of a structure data item.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$dbl',
        '(TAL Function) $dbl(expression)',
        'The `$dbl` function returns an `int(32)` value from an `int`, `fixed(0)`, `real`, or `real(64)` expression.\n\n`expression` - An `int`, `fixed(0)`, `real`, or `real(64)` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$dbll',
        '(TAL Function) $dbll(int-expression, int-expression)',
        'The `$dbll` function returns an `int(32)` value from two `int` values.\n\n`int-expression` - An `int` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$dblr',
        '(TAL Function) $dblr(expression)',
        'The `$dblr` function returns an `int(32)` value from an `int`, `fixed(0)`, `real`, or `real(64)` expression and applies rounding to the result.\n\n`expression` - An `int`, `fixed(0)`, `real`, or `real(64)` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$dfix',
        '(TAL Function) $dfix(dbl-expression, fpoint)',
        'The `$dfix` function returns a `fixed(fpoint)` expression from an `int(32)` expression.\n\n`dbl-expression` - An `int(32)` arithmetic expression.\n\n`fpoint` - a value in the range `–19` through `+19` that specifies the position of the implied decimal point in the result. A positive _fpoint_ specifies the number of decimal places to the right of the decimal. A negative _fpoint_ specifies the number of integer places to the left of the decimal point.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$eflt',
        '(TAL Function) $eflt(expression)',
        'The `$eflt` function returns a `real(64)` value from an `int`, `int(32)`, `fixed(fpoint)`, or `real` expression.\n\n`expression` - An `int`, `int(32)`, `fixed(fpoint)`, or `real` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$efltr',
        '(TAL Function) $efltr(expression)',
        'The `$efltr` function returns a `real(64)` value from an `int`, `int(32)`, `fixed(fpoint)`, or `real` expression and applies rounding to the result.\n\n`expression` - An `int`, `int(32)`, `fixed(fpoint)`, or `real` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$fix',
        '(TAL Function) $fix(expression)',
        'The `$fix` function returns a `fixed(0)` value from an `int`, `int(32)`, `real`, or `real(64)` expression.\n\n`expression` - An `int`, `int(32)`, `fixed`, `real`, or `real(64)` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$fixd',
        '(TAL Function) $fixd(fixed-expression)',
        'The `$fixd` function returns an `int(32)` value from a `fixed(0)` expression.\n\n`fixed-expression` - A `fixed` expression, which `$fixd` treats as a `fixed(0)` expression, ignoring any implied decimal point.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$fixi',
        '(TAL Function) $fixi(fixed-expression)',
        'The `$fixi` function returns the __signed__ `int` equivalent of a `fixed(0)` expression.\n\n`fixed-expression` - A `fixed` expression, which `$fixi` treats as a `fixed(0)` expression, ignoring any implied decimal point.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$fixl',
        '(TAL Function) $fixl(fixed-expression)',
        'The `$fixl` function returns the __unsigned__ `int` equivalent of a `fixed(0)` expression.\n\n`fixed-expression` - A `fixed` expression, which `$fixl` treats as a `fixed(0)` expression, ignoring any implied decimal point.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$flt',
        '(TAL Function) $flt(expression)',
        'The `$flt` function returns a `real` value from an `int`, `int(32)`, `fixed(fpoint)`, or `real(64)` expression.\n\n`expression` - An `int`, `int(32)`, `fixed(fpoint)`, or `real(64)` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$fltr',
        '(TAL Function) $fltr(expression)',
        'The `$fltr` function returns a `real` value from an `int`, `int(32)`, `fixed(fpoint)`, or `real(64)` expression and applies rounding to the result.\n\n`expression` - An `int`, `int(32)`, `fixed(fpoint)`, or `real(64)` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$ifix',
        '(TAL Function) $ifix(int-expression, fpoint)',
        'The `$ifix` function returns a `fixed(fpoint)` value from a signed `int` expression.\n\n`int-expression` - A signed INT expression.\n\n`fpoint` - A value in the range `–19` through `+19` that specifies the position of the implied decimal point in the result. A positive _fpoint_ specifies the number of decimal places to the right of the decimal. A negative _fpoint_ specifies the number of integer places to the left of the decimal point.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$int',
        '(TAL Function) $int(expression)',
        'The `$int` function returns an `int` value from the low-order 16 bits of an `int(32)` or `fixed(0)` expression. `$int` returns a fully converted `int` expression from a `real` or `real(64)` expression.\n\n`expression` - An `int`, `int(32)`, `fixed(0)`, `real`, or `real(64)` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$intr',
        '(TAL Function) $intr(expression)',
        'The `$intr` function returns an `int` value from the low-order 16 bits of an `int(32)` or `fixed(0)` expression. `$intr` returns a fully converted and rounded `int` expression from a `real` or `real(64)` expression.\n\n`expression` - An `int`, `int(32)`, `fixed(0)`, `real`, or `real(64)` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$len',
        '(TAL Function) $len(variable)',
        'The `$len` function returns the length, in bytes, of one occurrence of a variable.\n\n`variable` - The identifier of a simple variable, array element, pointer, structure, or structure data item.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$lfix',
        '(TAL Function) $lfix(int-expression, fpoint)',
        'The `$lfix` function returns a `fixed(fpoint)` expression from an __unsigned__ `int` expression.\n\n`int-expression` - An __unsigned__ INT expression.\n\n`fpoint` - A value in the range `–19` through `+19` that specifies the position of the implied decimal point in the result. A positive _fpoint_ specifies the number of decimal places to the right of the decimal. A negative _fpoint_ specifies the number of integer places to the left of the decimal point.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$lmax',
        '(TAL Function) $lmax(int-expression, int-expression)',
        'The `$lmax` function returns the maximum of two __unsigned__ `int` expressions.\n\n`int-expression` - An __unsigned__ INT expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$lmin',
        '(TAL Function) $lmin(int-expression, int-expression)',
        'The `$lmin` function returns the minimum of two __unsigned__ `int` expressions.\n\n`int-expression` - An __unsigned__ INT expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$max',
        '(TAL Function) $max(expression, expression)',
        'The `$max` function returns the maximum of two signed `int`, `int(32)`, `fixed(fpoint)`, `real`, or `real(64)` expressions.\n\n`expression` - A signed `int`, `int(32)`, `fixed(fpoint)`, `real`, or `real(64)` expression. Both expressions must be of the same data type.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$min',
        '(TAL Function) $min(expression, expression)',
        'The `$min` function returns the minimum of two signed `int`, `int(32)`, `fixed(fpoint)`, `real`, or `real(64)` expressions.\n\n`expression` - A signed `int`, `int(32)`, `fixed(fpoint)`, `real`, or `real(64)` expression. Both expressions must be of the same data type.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$numeric',
        '(TAL Function) $numeric(int-expression)',
        'The `$numeric` function tests the right half of an `int` value for the presence of an ASCII numeric character.\n\n`int-expression` - An `int` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$occurs',
        '(TAL Function) $occurs(variable)',
        'The `$occurs` function returns the number of occurrences of a variable.\n\n`variable` - The identifier of:\n- An array, structure, or substructure (but not a template structure)\n- An array declared in a structure',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$offset',
        '(TAL Function) $offset(variable)',
        'The `$offset` function returns the number of bytes from the address of the zeroth structure occurrence to a structure data item.\n\n`variable` - The fully qualified identifier of a structure data item - a substructure, simple variable, array, simple pointer, or structure pointer declared within a structure.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$optional',
        '(TAL Function) $optional(cond-expression, param | param-pair)',
        'The `$optional` function controls whether a given parameter or parameter pair is passed to a `variable` or `extensible` procedure in a D20 or later object file.\n\n`cond-expression` - A conditional expression. If _cond-expression_ is true, _param_ or _param-pair_ is passed. If _cond-expression_ is false, _param_ (or _param-pair_) is not passed.\n\n`param` - A variable identifier or an expression that defines an actual parameter to pass to a formal parameter declared in the called procedure if _cond-expression_ is true.\n\n`param-pair` - An actual parameter pair to pass to a formal parameter pair declared in the called procedure if _cond-expression_ is true. _param-pair_ has the form `string : length`:\n- `string` - the identifier of a `string` array or simple pointer declared inside or outside a structure.\n- `length` - An `int` expression that specifies the length, in bytes, of _string_.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$param',
        '(TAL Function) $param(formal-param)',
        'The `$param` function checks for the presence or absence of an actual parameter in the call that invoked the current procedure or subprocedure.\n\n`formal-param` - The identifier of a formal parameter as specified in the procedure or subprocedure declaration.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$udbl',
        '(TAL Function) $udbl(int-expression)',
        'The `$udbl` function returns an `int(32)` value from an unsigned `int` expression.\n\n`int-expression` - An unsigned `int` expression.',
        vscode.CompletionItemKind.Function));
keywords.push(
    new Keyword(
        '$xadr',
        '(TAL Function) $xadr(variable)',
        'The `$xadr` function converts a standard address to an extended address.\n\n`variable` - The identifier of a simple variable, pointer, array element, structure, or structure data item. For any other variable, the compiler issues a warning.',
        vscode.CompletionItemKind.Function));


export class TALCompletionItemProvider implements vscode.CompletionItemProvider {
    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        const items: vscode.CompletionItem[] = [];

        keywords.forEach(k => {
            let completionItem = new vscode.CompletionItem(k.label, k.kind);
            completionItem.commitCharacters = ['\('];
            completionItem.detail = k.detail;
            completionItem.documentation = new vscode.MarkdownString(k.documentation);
            items.push(completionItem);
        });

        return items
    }
}
