grammar TAL;

program
    : variableDeclaration*
    | procDeclaration*
    ;

// Functions
procInvocation
    : identifier '(' expression? ( ',' expression? )* ')'
    ;

procDeclaration
    : DATA_TYPE? PROC identifier ( '=' STRING_LITERAL )? paramList? procAttributes? ';'
      ( paramSpec )* ( procBody | EXTERNAL | FORWARD ) ';'
    ;

paramList
    : '(' param ( ',' param )* ')'
    ;

param
    : identifier ':' expression
    | identifier
    ;

procAttributes
    : procAttribute? ( ',' procAttribute? )*
    ;

procAttribute
    : MAIN
    | INTERRUPT
    | RESIDENT
    | CALLABLE
    | PRIV
    | VARIABLE
    | EXTENSIBLE ( '(' INT_CONSTANT ')' )?
    | LANGUAGE ( CLANG | COBOL | FORTRAN | PASCAL | UNSPECIFIED )
    ;

paramSpec
    : DATA_TYPE? PROC ( '(' '32' ')' )? identifier ( ',' identifier )* ';'
    | DATA_TYPE ( DOT EXT? )? identifier ( '(' identifier ')' )? ( ',' identifier ( '(' identifier ')' )? )* ';'
    | STRUCT ( DOT EXT? ) identifier ( '(' identifier ')' )? ( ',' identifier ( '(' identifier ')' )? )* ';'
    ;

procBody
    : BEGIN variableDeclaration* subprocDeclaration* statements? END ';'
    ;

subprocDeclaration
    : DATA_TYPE? SUBPROC identifier paramList? VARIABLE? ';'
      ( paramSpec )* ( subprocBody | FORWARD ) ';'
    ;

subprocBody
    : BEGIN variableDeclaration* statements? END ';'
    ;


// Statements
statements
    : statement ( ';' statement? )*
    ;

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
    | returnStatement
    | scanStatement
    | storeStatement
    | useStatement
    | whileStatement
    | ';' // Empty statement
    ;

compoundStatement
    : BEGIN ( statements )? END
    ;

assertStatement
    : ASSERT INT_CONSTANT ':' condition
    ;

assignmentStatement
    : ( variable ':=' )+ ( arithmeticExpression | conditionalExpression )
    ;

callStatement
    : CALL procInvocation
    ;

labeledCaseStatement
    : CASE arithmeticExpression OF BEGIN caseAlternative+ ( OTHERWISE ARROW statement )? ';' END
    ;

caseAlternative
    : caseLabel ( ',' caseLabel )* ARROW statement ';'
    ;

caseLabel
    : ( INT_CONSTANT | identifier ) ( '..' ( INT_CONSTANT | identifier ) )?
    ;

unlabledCaseStatement
    : CASE arithmeticExpression OF BEGIN ( statement ';' )+ ( OTHERWISE statement )? ';' END
    ;

doStatement
    : DO statement UNTIL condition
    ;

dropStatement
    : DROP identifier ( ',' identifier )*
    ;

forStatement
    : FOR variable ':=' arithmeticExpression ( TO | DOWNTO ) arithmeticExpression ( BY arithmeticExpression )? DO statement
    ;

ifStatement
    : IF ( arithmeticExpression | conditionalExpression ) THEN statement? ( ELSE statement? )?
    ;

moveStatement
    : variable ( '\':=\'' | '\'=:\'' ) moveStatementSource ( '&' moveStatementSource )* ( '->' variable )?
    ;

moveStatementSource
    : variable FOR arithmeticExpression ( BYTES | WORDS | ELEMENTS )?
    | '[' CONSTANT ']'
    | CONSTANT
    | constantList
    ;

returnStatement
    : RETURN ( arithmeticExpression | conditionalExpression )? ( ',' expression )?
    ;

scanStatement
    : ( SCAN | RSCAN ) variable ( WHILE | UNTIL ) arithmeticExpression ( '->' variable )?
    ;

storeStatement
    : STORE variable ( ',' variable )*
    ;

useStatement
    : USE identifier ( ',' identifier )*
    ;

whileStatement
    : WHILE condition DO statement 
    ;

// Declarations
variableDeclaration
    : simpleDeclaration
    | readOnlyArrayDeclaration
    | structDeclaration
    | structReferralDeclaration
    | structTemplateDeclaration
    | defineDeclaration
    | literalDeclaration
    ;

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
    : identifier ( ':=' CONSTANT | arithmeticExpression )?
    ;

simpleDeclarationItemPointer
    : ( DOT EXT? ) identifier ( ':=' CONSTANT | arithmeticExpression )?
    ;

simpleDecalrationItemStructPointer
    : ( DOT EXT? ) identifier '(' identifier ')'  ( ':=' CONSTANT | arithmeticExpression )?
    ;

simpleDeclarationItemArray
    : ( DOT EXT? )? identifier '[' arithmeticExpression ':' arithmeticExpression ']' ( ':=' constantList )?
    ;

readOnlyArrayDeclaration
    : DATA_TYPE readOnlyArrayDeclarationItem ( ',' readOnlyArrayDeclarationItem )* ';'
    ;

readOnlyArrayDeclarationItem
    : identifier ( '[' arithmeticExpression ':' arithmeticExpression ']' )? '=' P_REGISTER ':=' constantList
    ;

structDeclaration
    : STRUCT ( DOT EXT? )? identifier ( '[' arithmeticExpression ':' arithmeticExpression ']' )? ';' structDeclarationLayout
    ;

structTemplateDeclaration
    : STRUCT identifier '(' '*' ')' ';' structDeclarationLayout
    ;

structReferralDeclaration
    : STRUCT ( DOT EXT? )? identifier '(' identifier ')' ( '[' arithmeticExpression ':' arithmeticExpression ']' )? ';'
    ;

subStructDeclaration // with optional redefinition
    : STRUCT structIdentifier ( '[' arithmeticExpression ':' arithmeticExpression ']' )? ( '=' structIdentifier )? ';' structDeclarationLayout
    ;

subStructReferralDeclaration // with optional redefinition
    : STRUCT structIdentifier '(' identifier ')' ( '[' arithmeticExpression ':' arithmeticExpression ']' )? ( '=' structIdentifier )? ';'
    ;

structDeclarationLayout
    : BEGIN structDeclarationLayoutDeclaration+ END ';'
    ;

structDeclarationLayoutDeclaration
    : DATA_TYPE structDeclarationLayoutDeclarationItem ( ',' structDeclarationLayoutDeclarationItem )* ';'
    | subStructDeclaration
    | subStructReferralDeclaration
    | DATA_TYPE ( DOT EXT? ) structIdentifier  '=' structIdentifier ';' // simple pointers with optional redefinition
    | ( STRUCT | INT ) ( DOT EXT? ) structIdentifier '(' structIdentifier ')' ( ',' ( DOT EXT? ) structIdentifier '(' structIdentifier ')' )* ';' // struct pointers
    | ( STRUCT | INT ) ( DOT EXT? ) structIdentifier '(' structIdentifier ')' '=' structIdentifier ';' // struct pointers with optional redefinition
    | ( FILLER | BIT_FILLER ) INT_CONSTANT ';'
    | DATA_TYPE structIdentifier ( '[' arithmeticExpression ':' arithmeticExpression ']' )? '=' structIdentifier ';' // redefinition
    ;

structDeclarationLayoutDeclarationItem
    : ( DOT EXT? )? structIdentifier // simple variable or pointer
    | structIdentifier '[' arithmeticExpression ':' arithmeticExpression ']' // array variable
    ;

literalDeclaration
    : LITERAL literalDeclarationItem ( ',' literalDeclarationItem )* ';'
    ;

literalDeclarationItem
    : literalDefineIdentifier ( '=' CONSTANT )?
    ;

defineDeclaration
    : DEFINE defineDeclarationItem ( ',' defineDeclarationItem )* ';'
    ;

defineDeclarationItem
    : literalDefineIdentifier defineParamList? '=' ( STRING_LITERAL | ANY )* '#'
    ;

defineParamList
    : '(' identifier ( ',' identifier )* ')'
    ;

// Expressions
expression
    : '(' expression ')'
    | relationalExpression
    | groupComparisonExpression
    | arithmeticExpression
    | conditionalExpression
    | ifExpression
    | caseExpression
    | assignmentExpression
    | variable
    | CONSTANT
    | procInvocation
    ;

groupComparisonExpression
    : '(' groupComparisonExpression ')'
    | variable relationalOperator groupComparisonOperand ( ARROW variable )?
    ;

groupComparisonOperand
    : variable FOR arithmeticExpression ( BYTES | WORDS | ELEMENTS )?
    | CONSTANT | identifier
    | '[' CONSTANT | identifier ']'
    | constantList
    ;

ifExpression
    : '(' ifExpression ')'
    | IF ifExpressionElement THEN ifExpressionElement ( ELSE ifExpressionElement )?
    ;

ifExpressionElement
    : ( arithmeticExpression | conditionalExpression )
    ;

caseExpression
    : '(' caseExpression ')'
    | CASE arithmeticExpression OF BEGIN caseExpressionElement+ ( OTHERWISE caseExpressionElement )? END
    ;

caseExpressionElement
    : ( arithmeticExpression | conditionalExpression ) ';'
    ;

assignmentExpression
    : '(' assignmentExpression ')'
    | ( variable ':=' )+ ( arithmeticExpression | conditionalExpression )
    ;

conditionalExpression
    : '(' conditionalExpression ')'
    | NOT? condition ( ( AND | OR )? NOT? condition )*
    ;

condition
    : relationalExpression
    | groupComparisonExpression
    | arithmeticExpression
    | relationalOperator
    ;

relationalExpression
    : '(' relationalExpression ')'
    | operand relationalOperator operand
    ;

relationalOperator
    : LESS | LESSEQUAL | GREATER | GREATEREQUAL | EQUAL | NOTEQUAL
    ;

arithmeticExpression
    : '(' arithmeticExpression ')' BIT_EXTRACT?
    | '(' arithmeticExpression ')'
    | unaryOperator? operand ( arithmeticOperator operand )*
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
    : '(' operand ')'
    | variable | CONSTANT | procInvocation
    ;

variable
    : pointerVariable
    | structVariable BIT_EXTRACT?
    | arrayVariable BIT_EXTRACT?
    | identifier BIT_EXTRACT?
    ;

arrayVariable
    : identifier '[' ( arithmeticExpression | assignmentExpression ) ']'
    ;

pointerVariable
    : '@' structVariable
    | '@' arrayVariable
    | '@' identifier
    ;

structVariable
    : structVariableItem ( '.' structVariableItem )+
    ;

structVariableItem
    : ( arrayVariable | identifier )
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

// Context-sensitive identifiers
identifier
    : IDENTIFIER
    | EXT
    | BIT_FILLER
    | FILLER
    | BYTES
    | WORDS
    | ELEMENTS
    | COBOL
    | EXTENSIBLE
    | CLANG
    | FORTRAN
    | LANGUAGE
    | UNSPECIFIED
    | PASCAL
    ;

structIdentifier
    : IDENTIFIER
    | EXT
    | BYTES
    | WORDS
    | ELEMENTS
    | COBOL
    | EXTENSIBLE
    | CLANG
    | FORTRAN
    | LANGUAGE
    | UNSPECIFIED
    | PASCAL
    ;

literalDefineIdentifier
    : IDENTIFIER
    | EXT
    | BIT_FILLER
    | FILLER
    | COBOL
    | EXTENSIBLE
    | CLANG
    | FORTRAN
    | LANGUAGE
    | UNSPECIFIED
    | PASCAL
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

// Global Reserved Keywords
AND : A N D;
ASSERT : A S S E R T;
BEGIN : B E G I N;
BY : B Y;
CALL : C A L L;
CALLABLE : C A L L A B L E;
CASE : C A S E;
CODE : C O D E;
DO : D O;
DOWNTO : D O W N T O;
DROP : D R O P;
ELSE : E L S E;
END : E N D;
ENTRY : E N T R Y;
EXTERNAL : E X T E R N A L;
FOR : F O R;
FORWARD : F O R W A R D;
GOTO : G O T O;
IF : I F;
INTERRUPT : I N T E R R U P T;
LABEL : L A B E L;
MAIN : M A I N;
OF : O F;
OTHERWISE : O T H E R W I S E;
PRIV : P R I V;
PROC : P R O C;
RESIDENT : R E S I D E N T;
RETURN : R E T U R N;
RSCAN : R S C A N;
SCAN : S C A N;
STACK : S T A C K;
STORE : S T O R E;
SUBPROC : S U B P R O C;
THEN : T H E N;
TO : T O;
UNTIL : U N T I L;
USE : U S E;
VARIABLE : V A R I A B L E;
WHILE : W H I L E;

// Non-reserved keywords
//block declaration -> AT : A T;
//block declaration -> BELOW : B E L O W

// do not use as identifier if name declaration is present
//block declaration -> BLOCK : B L O C K
//block declaration -> PRIVATE : P R I V A T E

EXT : E X T;

BIT_FILLER : B I T '_' F I L L E R; // reserved inside struct
FILLER : F I L L E R;               // reserved inside struct

BYTES : B Y T E S;          // reserved inside literal/define declaration
WORDS : W O R D S;          // reserved inside literal/define declaration
ELEMENTS : E L E M E N T S; // reserved inside literal/define declaration

CLANG : C;                            // function declaration
COBOL : C O B O L;                   // function declaration
EXTENSIBLE : E X T E N S I B L E;    // function declaration
FORTRAN : F O R T R A N;             // function declaration
LANGUAGE : L A N G U A G E;          // function declaration
UNSPECIFIED : U N S P E C I F I E D; // function declaration
PASCAL : P A S C A L;                // function declaration

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

OR : O R;
LAND : L A N D;
LOR : L O R;
NOT : N O T;
XOR : X O R;

P_REGISTER : '\'' P '\'';
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

// Skip directives
DIRECTIVE
    : DIRECTIVE_START ~[\r\n]* -> skip
    ;

fragment
DIRECTIVE_START
    : '?' { this.charPositionInLine === 0; }
    ;

// Skip unit name
NAME
    : N A M E ( WHITESPACE | NEWLINE )+ IDENTIFIER ';' -> skip
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
    : '"' ('""' | ~["])* '"'
    ;

BLOCKCOMMENT
    : '!' ~[!\r\n]* ( '!' )? -> skip
    ;

LINECOMMENT
    : '--' ~[\r\n]* -> skip
    ;

WHITESPACE
    : [ \f\t]+ -> skip
    ;

NEWLINE
    : ( '\r' '\n'? | '\n' ) -> skip
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

ANY : .;