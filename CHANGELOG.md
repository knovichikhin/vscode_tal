# Change Log
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