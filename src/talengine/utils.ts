"use strict";

// Non-unicode whitespace. TAL is officially ASCII only.
export function isWhiteSpace(code: number) {
  switch (code) {
    case 0x09: // \t horizontal tab
    case 0x0a: // \n new line
    case 0x0b: // \v vertical tab
    case 0x0c: // \f form feed
    case 0x0d: // \r carriage return
    case 0x20: // space
    case 0xa0: // non-break space
      return true;
  }

  return false;
}
