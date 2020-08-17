# Change Log
## [0.4.1] - 2020-08-17
- Reorder compiler directives to match single lines first (Avoid embedded parentheses triggering multi-line).

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
