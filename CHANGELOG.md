# Change Log
## [0.7.1] - 2020-10-10
- Added caching for symbol results.

## [0.7.0] - 2020-10-09
- TAL folding support for compiler toggles, comment blocks and begin/end blocks.

## [0.6.1] - 2020-10-05
- Outline update:
  - Page symbol now has a range instead of being a single line.
  - Page following a page no longer appears as a child of the previous page.

## [0.6.0] - 2020-09-05
- Added completions for:
  - TAL keywords
  - TACL built-in functions and variables
- Removed $ from TAL and TACL word separators.

## [0.5.0] - 2020-09-02
- Added TAL indentation rules:
  - Indent on:
    - `for ... do`
    - `while ... do`
    - `do` (until loop)
    - `else`
    - `if ... then`
    - `case ... of`
  - Outdent on:
    - `end`
    - `end;`
- TAL language indentation rules can be disabled by setting `editor.autoIndent` to something other than `full` or `advanced`. For example:
  ```json
  {
    "settings": {
      "[tal]": {
        "editor.autoIndent": "brackets"
      }
    }
  }
  ```

## [0.4.6] - 2020-08-30
- Updated TACL snippets:
  - Shorten `for` snippet. Removed to/downto option.
  - Change `begin/end` snippet to simply insert text without any tab stops.
  - Shorten `case` snippet. Removed label tab stop.
  - Shorten `use` snippet. Removed option to delete assignment.
  - Remove `scan` and `rscan` snippets. Too many variations.
- Removed TACL `begin/end` snippet.

## [0.4.5] - 2020-08-29
- Thanks [cnxguy](https://github.com/cnxguy). Change code to not match begin and end inside double quotes. See [PR #12](https://github.com/knovichikhin/vscode_tal/pull/12).

## [0.4.4] - 2020-08-26
- TACL:
  - Added file names
  - Fixed define names
  - Added define template
  - Fixed numbers: do not highlight numeric part of identifier as number
- TAL: recognize octal numbers

## [0.4.3] - 2020-08-20
- Thanks [cnxguy](https://github.com/cnxguy). Enhanced TACL process parsing. Added defines support. See [PR #10](https://github.com/knovichikhin/vscode_tal/pull/10).
  - System names working
  - Lengths now match Nonstop constraints ($s for example now valid)
  - Special case $0, $receive handled (due to length limits)

## [0.4.2] - 2020-08-19
- Improve how procs/subprocs are tracked. Detect multiple begin/end keywords per line to determine accurate function scope.
- Provide section/page symbols for files without procs/subprocs.

## [0.4.1] - 2020-08-19
- Thanks [cnxguy](https://github.com/cnxguy). Correct behaviour of ?page directives containing brackets embedded within quotes. See [PR #8](https://github.com/knovichikhin/vscode_tal/pull/8) and [PR #9](https://github.com/knovichikhin/vscode_tal/pull/9).
- Added missing compiler directives: fixup, nofixup, datapages, int32index, noint32index, pushint32index, popint32index, warn, nowarn, errorfile, saveabend, nosaveabend, inhibitxx, noinhibitxx, nogmap, highrequesters, highpin, runnamed, errors, fmap, nofmap, pushlist, poplist, resettog, settog, check, nocheck, pushcheck, popcheck, syntax, suppress, nosuppress, nosymbols, noinnerlist, pushinnerlist, popinnerlist, nocompact, pushmap, popmap.

## [0.4.0] - 2020-08-15
- Added support for TACL syntax.

## [0.3.2] - 2020-08-13
- Do not insert TAL built-in functions as snippets.

## [0.3.1] - 2020-08-12
- Detect external and forward proc declarations.
- If a proc has subprocs, mark start of proc body after the last subproc.

## [0.3.0] - 2020-08-11
- Added document symbol lookup for procs and subprocs. The feature can be disabled by settting `tal.enableDocumentSymbol` to `false`.

## [0.2.1] - 2020-08-09
- Update manifest to clean up the package.

## [0.2.0] - 2020-08-09
- Added completions for most TAL built-in functions, such as $len. The feature can be disabled by settting `tal.enableTalFunctionCompletion` to `false`.

## [0.1.1] - 2020-08-09
- Added default TAL configuration to exclude ^ from editor.wordSeparators

## [0.1.0] - 2020-08-07
- Added snippets for for loop, while loop, begin/end, case, use, scan, rscan and if.

## [0.0.9] - 2020-08-06
- Update wordPattern definition to consider ^ symbol a part of a word
- Update extension description with instructions to update editor.wordSeparators to exclude ^

## [0.0.8] - 2020-08-06
- Flag entire storage type int, unsigned, fixed and real as storage.type.tal including width and floating point
- Flag literals preceded by call keyword as entity.name.function.tal

## [0.0.7] - 2020-08-05
- Flag CPU compiler directive as keyword.preprocessor.tal
- Flag open parenthesis ( as punctuation.parenthesis.begin.tal
- Flag close parenthesis ) as punctuation.parenthesis.end.tal

## [0.0.6] - 2018-07-05
- Remove <> from surrounding pairs - it's not intuitive when editing operators.
- Remove ' from auto closing pairs - it's not intuitive when editing operators.
- Remove <> from brackets. There is no need for indentation in this scenario.


## [0.0.5] - 2018-07-04
- Literal preceded by keyword subproc/proc and ^ was incorrectly considered a procedure.
- Built-in TAL functions were not recognised as function calls inside functions.

## [0.0.4] - 2018-02-18
- Highlight compiler directives inside function calls.

## [0.0.3] - 2017-12-04
- Change keywords call, to, downto, by, proc and subproc from generic to control.

## [0.0.2] - 2017-11-22
- Highlight operators inside function calls.
- Added compiler directives extendstack and compact.

## [0.0.1] - 2017-11-22
- Initial release of TAL syntax highlighting.
