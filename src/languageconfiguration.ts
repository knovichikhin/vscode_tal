"use strict";

import * as vscode from "vscode";

export function getTALLanguageConfiguration(): vscode.LanguageConfiguration {
  return {
    onEnterRules: [
      // Continue -- style comment
      {
        beforeText: /^\s*--.*/,
        afterText: /.+$/,
        action: {
          indentAction: vscode.IndentAction.None,
          appendText: "-- ",
        },
      },
      // Continue !! style comment
      {
        beforeText: /^\s*!.*/,
        afterText: /.+$/,
        action: {
          indentAction: vscode.IndentAction.None,
          appendText: "! ",
        },
      },
      // These onEnterRules facilitate the following TAL style:
      // block-statement
      // ....begin
      // ....end;
      // next statement

      // Indent code on:
      // for ... do
      // while ... do
      // do (until loop)
      // else
      // if ... then
      // case ... of
      //
      // Do not indent on multiline block statements.
      {
        // prettier-ignore
        beforeText: RegExp(
                    /^\s*/.source +
                    // Match block-statement keywords:
                    // for|while ... do
                    // do|else
                    // if ... then
                    // case ... of
                    /(\b(?<!\^)(for|while)(?!\^)\b .* \b(?<!\^)do(?!\^)\b|\b(?<!\^)(do|else)(?!\^)\b|\b(?<!\^)if(?!\^)\b .* \b(?<!\^)then(?!\^)\b|\b(?<!\^)case(?!\^)\b .* \b(?<!\^)of(?!\^)\b)/.source +
                    // Match !! or -- comment styles if present
                    /\s*(![^!]*(!|$)\s*|--.*)*$/.source,
                    "i"
                ),
        action: { indentAction: vscode.IndentAction.Indent },
      },
      // Outdent code on:
      // end
      // end;
      // Followed by optional --comment and/or !comment!
      {
        // prettier-ignore
        beforeText: RegExp(
                    /^\s*/.source +
                    // Match 'end', 'end;' or 'end ;'
                    /\b(?<!\^)end(?!\^)(\b|\s*;)\s*/.source +
                    // Match !! or -- comment styles if present
                    /(![^!]*(!|$)\s*|--.*)*$/.source,
                    "i"
                ),
        action: { indentAction: vscode.IndentAction.Outdent },
      },
    ],
  };
}
