grammar TAL;

unknown
    : ANY+
    ;

// Functions
functionInvocation
    : 'functionInvocation'
    ;

paramList
    : '(' param ( ',' param )* ')'
    ;

param
    : IDENTIFIER ':' arithmeticExpression
    | IDENTIFIER
    ;

// Statements
statement
    : compoundStatement
    | assertStatement
    | assignmentStatement
    | callStatement
    | labeledCaseStatement
    | unlabledCaseStatement
    | doStatement
    | dropStatement
    | forStatement
    | ifStatement
    | moveStatement
    ;

compoundStatement
    : BEGIN ( statement ( ';' statement )* )? ';'?  END
    ;

assertStatement
    : ASSERT INT_CONSTANT ':' condition
    ;

assignmentStatement
    : ( variable ':=' )+ ( arithmeticExpression | conditionalExpression )
    ;

callStatement
    : CALL IDENTIFIER paramList?
    ;

labeledCaseStatement
    : CASE arithmeticExpression OF BEGIN caseAlternative+ ( OTHERWISE ARROW statement )? ';' END
    ;

caseAlternative
    : caseLabel ( ',' caseLabel )* ARROW statement ';'
    ;

caseLabel
    : ( INT_CONSTANT | IDENTIFIER ) ( '..' ( INT_CONSTANT | IDENTIFIER ) )?
    ;

unlabledCaseStatement
    : CASE arithmeticExpression OF BEGIN ( statement ';' )+ ( OTHERWISE statement )? ';' END
    ;

doStatement
    : DO statement UNTIL condition
    ;

dropStatement
    : DROP IDENTIFIER ( ',' IDENTIFIER )*
    ;

forStatement
    : FOR variable ':=' arithmeticExpression ( TO | DOWNTO ) arithmeticExpression ( BY arithmeticExpression )? DO statement
    ;

ifStatement
    : IF ( arithmeticExpression | conditionalExpression ) THEN statement? ( ELSE statement? )?
    ;

moveStatement
    : variable ( '\':=\'' | '\'=:\'' )
    ;

// Name and blocks
name
    : N A M E IDENTIFIER ';';

// Declarations
simpleDeclaration
    : DATA_TYPE simpleDeclarationItem ( ',' simpleDeclarationItem )* ';'
    ;

simpleDeclarationItem
    : simpleDeclarationItemVariable
    | simpleDeclarationItemPointer
    | simpleDecalrationItemStructPointer
    | simpleDeclarationItemArray
    ;

simpleDeclarationItemVariable
    : IDENTIFIER ( ':=' CONSTANT | arithmeticExpression )?
    ;

simpleDeclarationItemPointer
    : ( DOT | EXT ) IDENTIFIER ( ':=' CONSTANT | arithmeticExpression )?
    ;

simpleDecalrationItemStructPointer
    : ( EXT | DOT ) IDENTIFIER '(' IDENTIFIER ')'  ( ':=' CONSTANT | arithmeticExpression )?
    ;

simpleDeclarationItemArray
    : ( EXT | DOT )? IDENTIFIER '[' arithmeticExpression ':' arithmeticExpression ']' ( ':=' constantList )?
    ;

readOnlyArrayDeclaration
    : DATA_TYPE readOnlyArrayDeclarationItem ( ',' readOnlyArrayDeclarationItem )* ';'
    ;

readOnlyArrayDeclarationItem
    : IDENTIFIER ( '[' arithmeticExpression ':' arithmeticExpression ']' )? '=' P_REGISTER ':=' constantList
    ;

structDeclaration
    : STRUCT ( EXT | DOT )? IDENTIFIER ( '[' arithmeticExpression ':' arithmeticExpression ']' )? ';' structDeclarationLayout
    ;

structTemplateDeclaration
    : STRUCT IDENTIFIER '(' '*' ')' ';' structDeclarationLayout
    ;

structReferralDeclaration
    : STRUCT ( EXT | DOT )? IDENTIFIER '(' IDENTIFIER ')' ( '[' arithmeticExpression ':' arithmeticExpression ']' )? ';'
    ;

subStructDeclaration // with optional redefinition
    : STRUCT IDENTIFIER ( '[' arithmeticExpression ':' arithmeticExpression ']' )? ( '=' IDENTIFIER )? ';' structDeclarationLayout
    ;

subStructReferralDeclaration // with optional redefinition
    : STRUCT IDENTIFIER '(' IDENTIFIER ')' ( '[' arithmeticExpression ':' arithmeticExpression ']' )? ( '=' IDENTIFIER )? ';'
    ;

structDeclarationLayout
    : BEGIN structDeclarationLayoutItem+ END ';'
    ;

structDeclarationLayoutItem
    : DATA_TYPE IDENTIFIER ( ',' IDENTIFIER )* ';' // simple variable
    | DATA_TYPE IDENTIFIER '[' arithmeticExpression ':' arithmeticExpression ']' ( ',' IDENTIFIER '[' arithmeticExpression ':' arithmeticExpression ']' )* ';' // array variable
    | subStructDeclaration
    | subStructReferralDeclaration
    | DATA_TYPE ( EXT | DOT ) IDENTIFIER ( ',' ( EXT | DOT ) IDENTIFIER )* ';' // simple pointers
    | DATA_TYPE ( EXT | DOT ) IDENTIFIER  '=' IDENTIFIER ';' // simple pointers with optional redefinition
    | ( STRUCT | INT ) ( EXT | DOT ) IDENTIFIER '(' IDENTIFIER ')' ( ',' ( EXT | DOT ) IDENTIFIER '(' IDENTIFIER ')' )* ';' // struct pointers
    | ( STRUCT | INT ) ( EXT | DOT ) IDENTIFIER '(' IDENTIFIER ')' '=' IDENTIFIER ';' // struct pointers with optional redefinition
    | ( FILLER | BIT_FILLER ) INT_CONSTANT ';'
    | DATA_TYPE IDENTIFIER ( '[' arithmeticExpression ':' arithmeticExpression ']' )? '=' IDENTIFIER ';' // redefinition
    ;

literalDeclaration
    : LITERAL literalDeclarationItem ( ',' literalDeclarationItem )* ';'
    ;

literalDeclarationItem
    : IDENTIFIER ( '=' CONSTANT )?
    ;

defineDeclaration
    : DEFINE defineDeclarationItem ( ',' defineDeclarationItem )* ';'
    ;

defineDeclarationItem
    : IDENTIFIER defineParamList? '=' ( STRING_LITERAL | ANY )* '#'
    ;

defineParamList
    : '(' IDENTIFIER ( ',' IDENTIFIER )* ')'
    ;

// Expressions
expression
    : relationalExpression
    | groupComparisonExpression
    | arithmeticExpression
    | conditionalExpression
    ;

groupComparisonExpression
    : variable relationalOperator groupComparisonOperand ( ARROW variable )?
    ;

groupComparisonOperand
    : variable FOR arithmeticExpression ( BYTES | WORDS | ELEMENTS )?
    | CONSTANT | IDENTIFIER
    | '[' CONSTANT | IDENTIFIER ']'
    | constantList
    ;

ifExpression
    : IF ifExpressionElement THEN ifExpressionElement ( ELSE ifExpressionElement )?
    ;

ifExpressionElement
    : ( arithmeticExpression | conditionalExpression )
    ;

caseExpression
    : CASE arithmeticExpression OF BEGIN caseExpressionElement+ ( OTHERWISE caseExpressionElement )? END
    ;

caseExpressionElement
    : ( arithmeticExpression | conditionalExpression ) ';'
    ;

assignmentExpression
    : ( variable ':=' )+ ( arithmeticExpression | conditionalExpression )
    ;

conditionalExpression
    : NOT? condition ( ( AND | OR )? NOT? condition )*
    ;

condition
    : relationalExpression
    | groupComparisonExpression
    | arithmeticExpression
    | relationalOperator
    ;

relationalExpression
    : operand relationalOperator operand
    ;

relationalOperator
    : LESS | LESSEQUAL | GREATER | GREATEREQUAL | EQUAL | NOTEQUAL
    ;

arithmeticExpression
    : unaryOperator? operand ( arithmeticOperator operand )*
    | '(' arithmeticExpression ')' BIT_EXTRACT?
    ;

arithmeticOperator
    : PLUS
    | MINUS
    | DIV
    | MOD
    | MULT
    | LOR
    | LAND
    | XOR
    | LEFTSHIFT
    | RIGHTSHIFT
    ;

unaryOperator
    : PLUS
    | MINUS
    ;

operand
    : variable | CONSTANT | expression | functionInvocation
    | '(' operand ')'
    ;

variable
    : pointerVariable
    | arrayVariable BIT_EXTRACT?
    | IDENTIFIER BIT_EXTRACT?
    ;

arrayVariable
    : IDENTIFIER '[' ( arithmeticExpression | assignmentExpression ) ']'
    ;

pointerVariable
    : '@' arrayVariable
    | '@' IDENTIFIER
    ;

// A constant list is a list of one or more constants
// E.g. `[ "A", "BCD" , "...", "Z" ]` or `10 * [0]`
constantList
    : repetitionConstantList
    | '[' repetitionConstantList ']'
    | '[' constantListSequence ']'
    ;

repetitionConstantList
    : INT_CONSTANT '*' '[' constantListSequence ']'
    ;

constantListSequence
    : NUMERIC_CONSTANT ( ',' constantListSequence )*
    | STRING_LITERAL ( ',' constantListSequence )*
    | repetitionConstantList ( ',' constantListSequence )*
    ;

// LEXER

// Data types
DATA_TYPE
    : UNSIGNED
    | STRING
    | FIXED
    | INT32
    | INT
    | REAL64
    | REAL
    ;

UNSIGNED : U N S I G N E D '(' DIGIT_SEQUENCE ')';
STRING : S T R I N G;
FIXED
    : F I X E D ( '(' ( '*' | SIGN? DIGIT_SEQUENCE )? ')')?
    | I N T '(' '64' ')'
    ;
INT32 : I N T '(' '32' ')';
INT : I N T ( '(' '16' ')' )?;
REAL64 : R E A L '(' '64' ')';
REAL : R E A L ( '(' '32' ')' )?;

// Special Data Types
LITERAL : L I T E R A L;
STRUCT : S T R U C T;
DEFINE : D E F I N E;

// Reserved keywords
CASE : C A S E;
CALL : C A L L;
BEGIN : B E G I N;
DO : D O;
DROP : D R O P;
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
ASSERT : A S S E R T;

// Non-reserved keywords
BYTES : B Y T E S;
WORDS : W O R D S;
ELEMENTS : E L E M E N T S;
FILLER : F I L L E R; // inside struct only
BIT_FILLER : B I T '_' F I L L E R; // inside struct only

// Operators
LESS : '<' | '\'<\'';
LESSEQUAL : '<=' | '\'<=\'';
GREATER : '>' | '\'>\'';
GREATEREQUAL : '>=' | '\'>=\'';

LEFTSHIFT : '<<' | '\'<<\'';
RIGHTSHIFT : '>>' | '\'>>\'';

PLUS : '+' | '\'+\'';
MINUS : '-' | '\'-\'';
MULT : '*' | '\'*\'';
DIV : '/' | '\'/\'';
MOD : '\'\\\'';

AND : A N D;
OR : O R;
LAND : L A N D;
LOR : L O R;
NOT : N O T;
XOR : X O R;

P_REGISTER : '\'' P '\'';
EXT : '.' E X T;
BIT_EXTRACT : '.<' DIGIT_SEQUENCE ( ':' DIGIT_SEQUENCE )? '>';

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

CONSTANT
    : NUMERIC_CONSTANT
    | STRING_LITERAL
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
