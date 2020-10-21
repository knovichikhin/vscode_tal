grammar TAL;

primaryexpression
    : ANY+
    ;

// Data types
UNSIGNED : U N S I G N E D LEFTPAREN DIGIT_SEQUENCE RIGHTPAREN;
STRING : S T R I N G;
FIXED
    : F I X E D ( LEFTPAREN ( '*' | SIGN? DIGIT_SEQUENCE )? RIGHTPAREN)?
    | I N T LEFTPAREN '64' RIGHTPAREN
    ;
INT32 : I N T LEFTPAREN '32' RIGHTPAREN;
INT : I N T ( LEFTPAREN '16' RIGHTPAREN )?;
REAL64 : R E A L LEFTPAREN '64' RIGHTPAREN;
REAL : R E A L ( LEFTPAREN '32' RIGHTPAREN )?;
LITERAL : L I T E R A L;
STRUCT : S T R U C T;

// Reserved keywords
CASE : C A S E;
CALL : C A L L;
BEGIN : B E G I N;
DO : D O;
ELSE : E L S E;
END : E N D;
FOR : F O R;
GOTO : G O T O;
IF : I F;
LABEL : L A B E L;
OF : O F;
OTHERWISE : O T H E R W I S E;
RETURN : R E T U R N;
THEN : T H E N;
UNTIL : U N T I L;
WHILE : W H I L E;
TO : T O;
DOWNTO : D O W N T O;
BY : B Y;
PROC : P R O C;
SUBPROC : S U B P R O C;

LEFTPAREN : '(';
RIGHTPAREN : ')';
LEFTBRACKET : '[';
RIGHTBRACKET : ']';

// Operators
LESS : '<' | '\'<\'';
LESSEQUAL : '<=' | '\'<=\'';
GREATER : '>' | '\'>\'';
GREATEREQUAL : '>=' | '\'>=\'';

LEFTSHIFT : '<<' | '\'<<\'';
RIGHTSHIFT : '>>' | '\'>>\'';

PLUS : '+' | '\'+\'';
MINUS : '-' | '\'-\'';
DIV : '/' | '\'/\'';
MOD : '\'\\\'';

AND : A N D;
OR : O R;
LAND : L A N D;
LOR : L O R;
NOT : N O T;

AT : '@';
BIT_EXTRACT : '.<' DIGIT_SEQUENCE ( COLON DIGIT_SEQUENCE )? '>';
COLON : ':';
SEMI : ';';
COMMA : ',';

ASSIGN
    : ':='
    | '=:'
    | '\':=\''
    | '\'=:\''
    ;

EQUAL : '=' | '\'=\'';
NOTEQUAL : '<>' | '\'<>\'';

ARROW : '->';
DOT : '.';

DIRECTIVE_START
    : '?' { this.charPositionInLine === 0; }
    ;

IDENTIFIER
    : [a-zA-Z^_] [a-zA-Z0-9^_]*
    ;

NUMERIC_CONSTANT
    : REAL64_CONSTANT
    | REAL_CONSTANT
    | FIXED_CONSTANT
    | INT32_CONSTANT
    | INT_CONSTANT
    ;

INT_CONSTANT
    : HEXADECIMAL_CONSTANT
    | OCTAL_CONSTANT
    | BINARY_CONSTANT
    | DECIMAL_CONSTANT
    ;

INT32_CONSTANT
    : HEXADECIMAL_CONSTANT '%' [dD]
    | OCTAL_CONSTANT [dD]
    | BINARY_CONSTANT [dD]
    | DECIMAL_CONSTANT [dD]
    ;

FIXED_CONSTANT
    : HEXADECIMAL_CONSTANT '%' [fF]
    | OCTAL_CONSTANT [fF]
    | BINARY_CONSTANT [fF]
    | DECIMAL_CONSTANT ( '.' DECIMAL_CONSTANT )? [fF]
    ;

REAL_CONSTANT
    : DECIMAL_CONSTANT '.' DECIMAL_CONSTANT EXPONENT_PART_REAL
    ;

REAL64_CONSTANT
    : DECIMAL_CONSTANT '.' DECIMAL_CONSTANT EXPONENT_PART_REAL64
    ;

fragment
EXPONENT_PART_REAL
    : [eE] SIGN? DIGIT DIGIT?
    ;

fragment
EXPONENT_PART_REAL64
    : [lL] SIGN? DIGIT DIGIT?
    ;

fragment
SIGN
    : '+' | '-'
    ;

fragment
DECIMAL_CONSTANT
    : DIGIT_SEQUENCE
    ;

fragment
DIGIT_SEQUENCE
    : DIGIT+
    ;

fragment
DIGIT
    : [0-9]
    ;

fragment
BINARY_CONSTANT
    : BINARY_BASE BINARY_DIGIT_SEQUENCE
    ;

fragment
BINARY_DIGIT_SEQUENCE
    : BINARY_DIGIT+
    ;

fragment
BINARY_BASE
    : '%' [bB]
    ;

fragment
BINARY_DIGIT
    : [0-1]
    ;

fragment
OCTAL_CONSTANT
    : OCTAL_BASE OCTAL_DIGIT_SEQUENCE
    ;

fragment
OCTAL_DIGIT_SEQUENCE
    : OCTAL_DIGIT+
    ;

fragment
OCTAL_BASE
    : '%'
    ;

fragment
OCTAL_DIGIT
    : [0-7]
    ;

fragment
HEXADECIMAL_CONSTANT
    : HEXADECIMAL_BASE HEXADECIMAL_DIGIT_SEQUENCE
    ;

fragment
HEXADECIMAL_DIGIT_SEQUENCE
    : HEXADECIMAL_DIGIT+
    ;

fragment
HEXADECIMAL_BASE
    : '%' [hH]
    ;

fragment
HEXADECIMAL_DIGIT
    : [0-9a-fA-F]
    ;

STRING_LITERAL
    : '"' SCHAR_SEQUENCE? '"'
    ;

fragment
SCHAR_SEQUENCE
    : SCHAR+
    ;

fragment
SCHAR
    : ~["]
    | ESCAPEDQUOTE
    ;

fragment
ESCAPEDQUOTE
    : '""'
    ;

WHITESPACE
    : [ \f\t]+ -> skip
    ;

NEWLINE
    : ( '\r' '\n'? | '\n' ) -> skip
    ;

BLOCKCOMMENT
    : '!' ~[!\r\n]* ( '!' | [\r\n] ) -> skip
    ;

LINECOMMENT
    : '--' ~[\r\n]* -> skip
    ;

// TAL is case insensitive

fragment A
   : ('a' | 'A')
   ;


fragment B
   : ('b' | 'B')
   ;


fragment C
   : ('c' | 'C')
   ;


fragment D
   : ('d' | 'D')
   ;


fragment E
   : ('e' | 'E')
   ;


fragment F
   : ('f' | 'F')
   ;


fragment G
   : ('g' | 'G')
   ;


fragment H
   : ('h' | 'H')
   ;


fragment I
   : ('i' | 'I')
   ;


fragment J
   : ('j' | 'J')
   ;


fragment K
   : ('k' | 'K')
   ;


fragment L
   : ('l' | 'L')
   ;


fragment M
   : ('m' | 'M')
   ;


fragment N
   : ('n' | 'N')
   ;


fragment O
   : ('o' | 'O')
   ;


fragment P
   : ('p' | 'P')
   ;


fragment Q
   : ('q' | 'Q')
   ;


fragment R
   : ('r' | 'R')
   ;


fragment S
   : ('s' | 'S')
   ;


fragment T
   : ('t' | 'T')
   ;


fragment U
   : ('u' | 'U')
   ;


fragment V
   : ('v' | 'V')
   ;


fragment W
   : ('w' | 'W')
   ;


fragment X
   : ('x' | 'X')
   ;


fragment Y
   : ('y' | 'Y')
   ;


fragment Z
   : ('z' | 'Z')
   ;

ANY
    : .;
