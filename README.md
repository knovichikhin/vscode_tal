## Tandem TAL/TACL source colourizer for Visual Studio Code
This extension provides syntax highlighting for [TAL](https://en.wikipedia.org/wiki/Transaction_Application_Language) (Transaction Application Language) and [TACL](https://en.wikipedia.org/wiki/TACL) (Tandem Advanced Command Language).

### What does it look like?
|TAL|TACL|
|---|----|
|![sample.tal](https://raw.githubusercontent.com/knovichikhin/vscode_tal/master/images/sample.png)|![sample.tacl](https://raw.githubusercontent.com/knovichikhin/vscode_tal/master/images/tacl_sample.png)|

## Additional TAL Features
- This extension enables [folding](https://code.visualstudio.com/docs/editor/codebasics#_folding) support for compiler toggles, comment blocks and begin/end blocks. To enable TAL folding support set `editor.foldingStrategy` to `"auto"`.
- Additional indentation option that indents code on single line control statements (e.g. `if`, `else`, `while`, `for`) and outdents code on `end` keyword. To enable TAL indentation handling set `editor.autoIndent` to `"full"` or `"advanced"`.

Resulting JSON configuration:
```json
{
    "[tal]": {
        "editor.foldingStrategy": "auto",
        "editor.autoIndent": "full"
    }
}
```
