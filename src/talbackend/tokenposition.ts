"use strict";

import * as tree from "antlr4ts/tree";
import * as vscode from "vscode";

/**
 * Find token corresponding to source code line and position.
 * @param parseTree ATN produced by parser
 * @param position Cursor position. Line number in position must start with 1, not 0.
 * @returns Token number if found
 */
export function computeTokenIndex(
  parseTree: tree.ParseTree,
  position: vscode.Position
): number | undefined {
  if (parseTree instanceof tree.TerminalNode) {
    return computeTokenIndexOfTerminalNode(parseTree, position);
  } else {
    return computeTokenIndexOfChildNode(parseTree, position);
  }
}

function computeTokenIndexOfTerminalNode(
  parseTree: tree.TerminalNode,
  position: vscode.Position
): number | undefined {
  const start = parseTree.symbol.charPositionInLine;
  const stop = parseTree.symbol.charPositionInLine + parseTree.text.length;

  // parseTree.symbol.tokenIndex !== -1 refers to an error node, such as
  // <missing XYZ>. These nodes do not have an index because they are missing.
  // In this case, skip and go to the next node that will point to incomplete
  // input. E.g if missing "XYZ", next node could be "X".
  if (
    parseTree.symbol.tokenIndex !== -1 &&
    parseTree.symbol.line === position.line &&
    start <= position.character &&
    stop >= position.character
  ) {
    return parseTree.symbol.tokenIndex;
  } else {
    return undefined;
  }
}

function computeTokenIndexOfChildNode(
  parseTree: tree.ParseTree,
  position: vscode.Position
): number | undefined {
  for (let i = 0; i < parseTree.childCount; i++) {
    const index = computeTokenIndex(parseTree.getChild(i), position);
    if (index !== undefined) {
      return index;
    }
  }
  return undefined;
}
