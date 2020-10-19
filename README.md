## Tandem TAL/TACL source colourizer for Visual Studio Code
This extension provides syntax highlighting for [TAL](https://en.wikipedia.org/wiki/Transaction_Application_Language) (Transaction Application Language) and [TACL](https://en.wikipedia.org/wiki/TACL) (Tandem Advanced Command Language).

### What does it look like?
|TAL|TACL|
|---|----|
|![sample.tal](https://raw.githubusercontent.com/knovichikhin/vscode_tal/master/images/sample.png)|![sample.tacl](https://raw.githubusercontent.com/knovichikhin/vscode_tal/master/images/tacl_sample.png)|

## Additional TAL Features
- TAL [folding](https://code.visualstudio.com/docs/editor/codebasics#_folding) support for compiler toggles (`?if`, `?ifnot` and `?endif`), comment blocks and begin/end blocks. To enable TAL folding support set `editor.foldingStrategy` to `"auto"`.
- More fitting indentation that indents code on single line control statements (e.g. `if`, `else`, `while`, `for`) and outdents code on `end` keyword. To enable TAL indentation handling set `editor.autoIndent` to `"full"` or `"advanced"`.
- TAL proc and subproc view/lookup via [outline](https://code.visualstudio.com/docs/getstarted/userinterface#_outline-view), [breadcrumbs](https://code.visualstudio.com/docs/editor/editingevolved#_breadcrumbs) and [go-to-symbol](https://code.visualstudio.com/docs/editor/editingevolved#_go-to-symbol). To enable TAL symbol support set `tal.enableDocumentSymbol` to `true` (default).
- Completions for TAL standard library and keywords.

Resulting JSON configuration:
```json
{
    "[tal]": {
        "editor.foldingStrategy": "auto",
        "editor.autoIndent": "full"
    }
}
```

## Additional TACL Features
- Completions for TACL standard library functions and variables.
