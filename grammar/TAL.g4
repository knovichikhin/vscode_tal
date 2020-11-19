grammar TAL;

program
    : ( variableDeclaration | procDeclaration | nameDeclaration | blockDeclaration )+
    ;

// Block Stuff
nameDeclaration
    : NAME nameIdentifier ';'
    ;

// Block optionally encapsulates variable declaration
// For the purpose of parsing TAL treat it as a regular statement.
blockDeclaration
    : BLOCK blockIdentifier ( ( AT | BELOW ) '(' INT_CONSTANT ')' )? ';'
    ;

// Functions

// This is a proc, define or stdlib invocation
procInvocation
    : stdlibIdentifier procInvocationParamList? // built-in
    | identifier procInvocationParamList
    | identifier defineInvocationParamList
    ;

procInvocationParamList
    : '(' procInvocationParam? ( ',' procInvocationParam? )* ')'
    ;

procInvocationParam
    : expression ':' expression
    | expression
    ;

defineInvocationParamList
    : '(' defineInvocationParam? ( ( ',' | DEFINE_COMA ) defineInvocationParam? )* ')'
    ;

defineInvocationParam
    : expression ':' expression
    | expression
    // Right hand side of move statement inside define invocation
    | moveStatementSource ( '&' moveStatementSource )* ( '->' variable )?
    ;

procDeclaration
    : dataType? procKeyword procIdentifier ( '=' STRING_LITERAL )? procDeclarationParamList? procDeclarationAttributes ';'
      procDeclarationParamSpec* ( procDeclarationBody | EXTERNAL | FORWARD ) ';'
    ;

procIdentifier
    : identifier
    ;

procDeclarationParamList
    : '(' procDeclarationParam ( ',' procDeclarationParam )* ')'
    ;

procDeclarationParam
    : identifier ':' identifier
    | identifier
    ;

procDeclarationAttributes
    : procDeclarationAttribute? ( ',' procDeclarationAttribute? )*
    ;

procDeclarationAttribute
    : MAIN
    | INTERRUPT
    | RESIDENT
    | CALLABLE
    | PRIV
    | VARIABLE
    | EXTENSIBLE ( '(' INT_CONSTANT ')' )?
    | LANGUAGE ( CLANG | COBOL | FORTRAN | PASCAL | UNSPECIFIED )
    ;

procDeclarationParamSpec
    : dataType? PROC ( '(' INT_CONSTANT ')' )? identifier ( ',' identifier )* ';'
    | dataType ( '.' EXT? )? identifier ( '(' identifier ')' )? ( ',' identifier ( '(' identifier ')' )? )* ';'
    | STRUCT ( '.' EXT? ) identifier ( '(' identifier ')' )? ( ',' identifier ( '(' identifier ')' )? )* ';'
    ;

procDeclarationBody
    : beginKeyword variableDeclaration* subprocDeclaration* statements? endKeyword
    ;

subprocDeclaration
    : dataType? subprocKeyword identifier procDeclarationParamList? VARIABLE? ';'
      ( procDeclarationParamSpec )* ( subprocDeclarationBody | FORWARD ) ';'
    ;

subprocDeclarationBody
    : beginKeyword variableDeclaration* statements? endKeyword
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
    | procInvocation
    | identifier // identifier by itself is also procInvocation without params
    ;

compoundStatement
    : beginKeyword statements? endKeyword
    ;

assertStatement
    : ASSERT INT_CONSTANT ':' expression
    ;

assignmentStatement
    // procInvocation covers defines
    : ( ( variable BIT_EXTRACT? | procInvocation ) ':=' )+ expression
    ;

callStatement
    : callKeyword ( procInvocation | identifier )
    ;

labeledCaseStatement
    : caseKeyword expression ofKeyword
      beginKeyword
      caseAlternative* ( otherwiseKeyword '->' statement? ';' )?
      endKeyword
    ;

caseAlternative
    : caseLabel ( ',' caseLabel )* '->' statement ';'
    ;

caseLabel
    : ( INT_CONSTANT | identifier ) ( '..' ( INT_CONSTANT | identifier ) )?
    | STRING_LITERAL
    ;

unlabledCaseStatement
    : caseKeyword expression ofKeyword
      beginKeyword
      ( statement ';' )* ( otherwiseKeyword statement? ';' )?
      endKeyword
    ;

doStatement
    : doKeyword statement? untilKeyword expression
    ;

dropStatement
    : dropKeyword identifier ( ',' identifier )*
    ;

forStatement
    : forKeyword variable ':=' expression toKeyword expression ( byKeyword expression )? doKeyword statement?
    ;

ifStatement
    : ifKeyword expression thenKeyword statement? ( elseKeyword statement? )?
    ;

moveStatement
    // procInvocation covers defines
    : ( variable | procInvocation ) MOVE
      moveStatementSource ( '&' moveStatementSource )* ( '->' variable )?
    ;

moveStatementSource
    // procInvocation is a stand in for a define, e.g. `def_foo(x) for 20 bytes`
    : ( variable | procInvocation ) FOR expression ( BYTES | WORDS | ELEMENTS )?
    | identifier // could be a define, such as `define move = var for 10 bytes#;`
    | procInvocation // could be a define, such as `define move(X) = var for X bytes#;`
    | '[' constant ']'
    | constant
    | constantList
    ;

returnStatement
    : returnKeyword expression? ( ',' expression )?
    ;

scanStatement
    : scanKeyword variable ( whileKeyword | untilKeyword ) expression ( '->' variable )?
    ;

storeStatement
    : STORE variable ( ',' variable )*
    ;

useStatement
    : useKeyword identifier ( ',' identifier )*
    ;

whileStatement
    : whileKeyword expression doKeyword statement?
    ;

// Declarations
variableDeclaration
    : dataType simpleDeclaration ( ',' simpleDeclaration )* ';'
    | STRUCT structReferralDeclaration ( ',' structReferralDeclaration )* ';'
    | DEFINE defineDeclaration ( ',' defineDeclaration )* ';'
    | LITERAL literalDeclaration ( ',' literalDeclaration )* ';'
    | readOnlyArrayDeclaration
    | structDeclaration
    | structTemplateDeclaration
    ;

simpleDeclaration
    : simpleDeclarationVariable
    | simpleDeclarationPointer
    | simpleDecalrationStructPointer
    | simpleDeclarationArray
    ;

simpleDeclarationVariable
    : identifier ( ':=' expression )?
    ;

simpleDeclarationPointer
    : ( '.' EXT? ) identifier ( ':=' expression )?
    ;

simpleDecalrationStructPointer
    : ( '.' EXT? ) identifier '(' identifier ')' ( ':=' expression )?
    ;

simpleDeclarationArray
    : ( '.' EXT? )? identifier '[' expression ':' expression ']' ( ':=' constantList )?
    ;

readOnlyArrayDeclaration
    : dataType readOnlyArrayDeclarationItem ( ',' readOnlyArrayDeclarationItem )* ';'
    ;

readOnlyArrayDeclarationItem
    : identifier ( '[' expression ':' expression ']' )? '=' P_REGISTER ':=' constantList
    ;

structDeclaration
    : STRUCT ( '.' EXT? )? identifier ( '[' expression ':' expression ']' )? ';' structDeclarationLayout
    ;

structTemplateDeclaration
    : STRUCT identifier '(' '*' ')' ( FIELDALIGN '(' SHARED2 ')' )? ';' structDeclarationLayout
    ;

structReferralDeclaration
    : ( '.' EXT? )? identifier '(' identifier ')' ( '[' expression ':' expression ']' )?
    ;

subStructDeclaration // with optional redefinition
    : STRUCT structIdentifier ( '[' expression ':' expression ']' )? ( '=' structIdentifier )? ';' structDeclarationLayout
    ;

subStructReferralDeclaration // with optional redefinition
    : STRUCT structIdentifier '(' identifier ')' ( '[' expression ':' expression ']' )? ( '=' structIdentifier )? ';'
    ;

structDeclarationLayout
    : beginKeyword structDeclarationLayoutDeclaration+ endKeyword ';'
    ;

structDeclarationLayoutDeclaration
    : dataType structDeclarationLayoutDeclarationItem ( ',' structDeclarationLayoutDeclarationItem )* ';'
    | subStructDeclaration
    | subStructReferralDeclaration
    | dataType ( '.' EXT? ) structIdentifier  '=' structIdentifier ';' // simple pointers with optional redefinition
    | ( STRUCT | INT ) ( '.' EXT? ) structIdentifier '(' structIdentifier ')' ( ',' ( '.' EXT? ) structIdentifier '(' structIdentifier ')' )* ';' // struct pointers
    | ( STRUCT | INT ) ( '.' EXT? ) structIdentifier '(' structIdentifier ')' '=' structIdentifier ';' // struct pointers with optional redefinition
    | ( FILLER | BIT_FILLER ) INT_CONSTANT ';'
    | dataType structIdentifier ( '[' expression ':' expression ']' )? '=' structIdentifier ';' // redefinition
    ;

structDeclarationLayoutDeclarationItem
    : ( '.' EXT? )? structIdentifier // simple variable or pointer
    | structIdentifier '[' expression ':' expression ']' // array variable
    ;

// literal can be define using other literals and arithmetic expressions
literalDeclaration
    : literalDefineIdentifier ( '=' expression )?
    ;

defineDeclaration
    : literalDefineIdentifier defineParamList? '=' defineBody '#'
    ;

defineParamList
    : '(' identifier ( ',' identifier )* ')'
    ;

defineBody
    : ~( '#' )* // Anything can go inside define, stop at terminator
    ;

// Expressions
expression
    : unaryOperator expression
    | expression ( LEFT_SHIFT | RIGHT_SHIFT ) expression
    | expression ( ULEFT_SHIFT | URIGHT_SHIFT ) expression
    | expression ( MULT | DIV  ) expression
    | expression ( UMULT | UDIV | MOD ) expression
    | expression ( PLUS | MINUS ) expression
    | expression ( UPLUS | UMINUS ) expression
    | expression ( LOR | LAND | XOR ) expression
    | expression relationalOperator expression
    | NOT expression
    | expression AND expression
    | expression OR expression
    | groupComparisonExpression
    | relationalOperator // e.g. if < then...
    | ifExpression // special arithmetic expression
    | caseExpression // special arithmetic expression
    | assignmentExpression // special arithmetic expression
    | procInvocation
    | variable
    | constant
    | '(' expression ')' BIT_EXTRACT
    | '(' expression ')'
    ;

// E.g. if d_array = s_array for 10 elements -> @pointer
groupComparisonExpression
    : ( variable | procInvocation ) relationalOperator groupComparisonOperand
    ;

groupComparisonOperand
    : ( variable | procInvocation ) FOR expression ( BYTES | WORDS | ELEMENTS )? ( '->' variable )?
    | constant
    | literalDefineIdentifier // literal
    | '[' ( constant | literalDefineIdentifier ) ']'
    | constantList
    ;

// E.g. var := if length > 0 then 10 else 20;
ifExpression
    : ifKeyword expression thenKeyword expression ( elseKeyword expression )?
    ;

// E.g.
// x := case a of
//          begin
//          b;
//          c;
//          otherwise -1;
//          end;
caseExpression
    : caseKeyword expression ofKeyword
      beginKeyword caseExpressionElement+
      ( otherwiseKeyword caseExpressionElement )?
      endKeyword
    ;

caseExpressionElement
    : expression ';'
    ;

// E.g. if (a := a - 1) then...
assignmentExpression
    : ( variable BIT_EXTRACT? ':=' )+ expression
    ;

relationalOperator
    : EQUAL
    | LESS
    | GREATER
    | LESS_EQUAL
    | GREATER_EQUAL
    | NOT_EQUAL
    | UEQUAL
    | ULESS
    | UGREATER
    | ULESS_EQUAL
    | UGREATER_EQUAL
    | UNOT_EQUAL
    ;

unaryOperator
    : '-'
    | '+'
    ;

variable
    : pointerVariable
    | structVariable BIT_EXTRACT?
    | arrayVariable BIT_EXTRACT?
    | identifier BIT_EXTRACT?
    ;

arrayVariable
    : identifier '[' expression ']'
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
    | procInvocation '*' '[' constantListSequence ']'
    ;

constantListSequence
    : ( numericConstant | literalDefineIdentifier | STRING_LITERAL | repetitionConstantList )
      ( ',' ( numericConstant | literalDefineIdentifier | STRING_LITERAL | repetitionConstantList ) )*
    ;

// Data types
dataType
    : UNSIGNED
    | STRING
    | FIXED
    | INT32
    | INT
    | REAL64
    | REAL
    ;

constant
    : ( '+' | '-' )? numericConstant
    | STRING_LITERAL
    ;

numericConstant
    : REAL64_CONSTANT
    | REAL_CONSTANT
    | FIXED_CONSTANT
    | INT32_CONSTANT
    | INT_CONSTANT
    ;

// Global Reserved Keywords - these rules trigger autocomplete
beginKeyword : BEGIN;
byKeyword : BY;
callKeyword : CALL;
caseKeyword : CASE;
doKeyword : DO;
toKeyword : TO | DOWNTO;
dropKeyword : DROP;
elseKeyword : ELSE;
endKeyword : END;
forKeyword : FOR;
ifKeyword : IF;
ofKeyword : OF;
otherwiseKeyword : OTHERWISE;
procKeyword : PROC;
returnKeyword : RETURN;
scanKeyword : RSCAN | SCAN;
subprocKeyword : SUBPROC;
thenKeyword : THEN;
untilKeyword : UNTIL;
useKeyword : USE;
whileKeyword : WHILE;

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
    | AT
    | BELOW
    | BLOCK
    | PRIVATE
    | NAME
    | FIELDALIGN
    | SHARED2
    ;

stdlibIdentifier
    : STDLIB_IDENTIFIER
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
    | AT
    | BELOW
    | BLOCK
    | PRIVATE
    | NAME
    | FIELDALIGN
    | SHARED2
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
    | AT
    | BELOW
    | BLOCK
    | PRIVATE
    | NAME
    | FIELDALIGN
    | SHARED2
    ;

blockIdentifier
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
    | PRIVATE
    | NAME
    | FIELDALIGN
    | SHARED2
    ;

nameIdentifier
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
    | AT
    | BELOW
    | BLOCK
    | PRIVATE
    | FIELDALIGN
    | SHARED2
    ;

// LEXER

STDLIB_IDENTIFIER : '$' [a-zA-Z]+ ;

UNSIGNED : U N S I G N E D WS? '(' WS? DIGIT_SEQUENCE WS? ')';
STRING : S T R I N G;
FIXED
    : F I X E D ( WS? '(' WS? ( '*' | SIGN? DIGIT_SEQUENCE )? WS? ')' )?
    | I N T WS? '(' WS? '64' WS? ')'
    ;
INT32 : I N T WS? '(' WS? '32' WS? ')';
INT : I N T ( WS? '(' WS? '16' WS? ')' )?;
REAL64 : R E A L WS? '(' WS? '64' WS? ')';
REAL : R E A L ( WS? '(' WS? '32' WS? ')' )?;

// Special Data Types
LITERAL : L I T E R A L;
STRUCT : S T R U C T;
DEFINE : D E F I N E;

// Skip end block to avoid ambiguity with end keyword
END_BLOCK : WS? END WS+ BLOCK WS? ';' -> skip;

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
AT : A T;                //block declaration
BELOW : B E L O W;       //block declaration
BLOCK : B L O C K;       //block declaration
PRIVATE : P R I V A T E; //block declaration
NAME : N A M E;          //block declaration

EXT : E X T;

BIT_FILLER : B I T '_' F I L L E R; // reserved inside struct
FILLER : F I L L E R;               // reserved inside struct

BYTES : B Y T E S;          // reserved inside literal/define declaration
WORDS : W O R D S;          // reserved inside literal/define declaration
ELEMENTS : E L E M E N T S; // reserved inside literal/define declaration

CLANG : C;                           // function declaration
COBOL : C O B O L;                   // function declaration
EXTENSIBLE : E X T E N S I B L E;    // function declaration
FORTRAN : F O R T R A N;             // function declaration
LANGUAGE : L A N G U A G E;          // function declaration
UNSPECIFIED : U N S P E C I F I E D; // function declaration
PASCAL : P A S C A L;                // function declaration

FIELDALIGN : F I E L D A L I G N; // Emitted by DDL compiler
SHARED2 : S H A R E D [2];        // Emitted by DDL compiler

ARROW : '->';

// Operators
LESS : '<';
ULESS : '\'<\'';
LESS_EQUAL : '<=';
ULESS_EQUAL : '\'<=\'';
GREATER : '>';
UGREATER : '\'>\'';
GREATER_EQUAL : '>=';
UGREATER_EQUAL : '\'>=\'';
EQUAL : '=';
UEQUAL : '\'=\'';
NOT_EQUAL : '<>';
UNOT_EQUAL : '\'<>\'';

LEFT_SHIFT : '<<';
ULEFT_SHIFT : '\'<<\'';
RIGHT_SHIFT : '>>';
URIGHT_SHIFT : '\'>>\'';

CONCATENATION : '&';

ASSIGN : ':=';

MOVE
    : '\':=\''
    | '\'=:\''
    ;

PLUS : '+';
UPLUS : '\'+\'';
MINUS : '-';
UMINUS : '\'-\'';
MULT : '*';
UMULT : '\'*\'';
DIV : '/';
UDIV : '\'/\'';
MOD : '\'\\\'';

OR : O R;
LAND : L A N D;
LOR : L O R;
NOT : N O T;
XOR : X O R;

P_REGISTER : '\'' P '\'';
BASE_ADDRESS : '\'' ( G | L | S ) '\'';
BIT_EXTRACT : '.<' DIGIT_SEQUENCE ( ':' DIGIT_SEQUENCE )? '>';

ADDRESS_OF : '@';
POUND : '#';
LPAREN : '(';
RPAREN : ')';
LBRACKET : '[';
RBRACKET : ']';
COLON : ':';
SEMI : ';';
COMA : ',';
DEFINE_COMA : '\',\'';
CASE_RANGE : '..';
DOT : '.';

// Skip directives
DIRECTIVE
    : DIRECTIVE_START ~[\r\n]* -> skip
    ;

fragment
DIRECTIVE_START
    : { this.charPositionInLine === 0; }? '?'
    ;

IDENTIFIER
    : [a-zA-Z^_] [a-zA-Z0-9^_]*
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

fragment EXPONENT_PART_REAL
    : [eE] SIGN? DIGIT DIGIT?
    ;

fragment EXPONENT_PART_REAL64
    : [lL] SIGN? DIGIT DIGIT?
    ;

fragment SIGN
    : '+' | '-'
    ;

fragment DECIMAL_CONSTANT
    : DIGIT_SEQUENCE
    ;

fragment DIGIT_SEQUENCE
    : DIGIT+
    ;

fragment DIGIT
    : [0-9]
    ;

fragment BINARY_CONSTANT
    : BINARY_BASE BINARY_DIGIT_SEQUENCE
    ;

fragment BINARY_DIGIT_SEQUENCE
    : BINARY_DIGIT+
    ;

fragment BINARY_BASE
    : '%' [bB]
    ;

fragment BINARY_DIGIT
    : [0-1]
    ;

fragment OCTAL_CONSTANT
    : OCTAL_BASE OCTAL_DIGIT_SEQUENCE
    ;

fragment OCTAL_DIGIT_SEQUENCE
    : OCTAL_DIGIT+
    ;

fragment OCTAL_BASE
    : '%'
    ;

fragment OCTAL_DIGIT
    : [0-7]
    ;

fragment HEXADECIMAL_CONSTANT
    : HEXADECIMAL_BASE HEXADECIMAL_DIGIT_SEQUENCE
    ;

fragment HEXADECIMAL_DIGIT_SEQUENCE
    : HEXADECIMAL_DIGIT+
    ;

fragment HEXADECIMAL_BASE
    : '%' [hH]
    ;

fragment HEXADECIMAL_DIGIT
    : [0-9a-fA-F]
    ;

STRING_LITERAL
    : '"' ('""' | ~["])* '"'
    ;

BLOCKCOMMENT
    : '!' ~[!\r\n]* ( '!' )? -> channel(HIDDEN)
    ;

LINECOMMENT
    : '--' ~[\r\n]* -> channel(HIDDEN)
    ;

WS
    : [ \f\t]+ -> channel(HIDDEN)
    ;

NEWLINE
    : ( '\r' '\n'? | '\n' ) -> channel(HIDDEN)
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

// Illegal Characters
//
// This is an illegal character trap which is always the last rule in the
// lexer specification. It matches a single character of any value and being
// the last rule in the file will match when no other rule knows what to do
// about the character. It is reported as an error but is not passed on to the
// parser. This means that the parser to deal with the gramamr file anyway
// but we will not try to analyse or code generate from a file with lexical
// errors.
ERRCHAR
   : . -> skip
   ;