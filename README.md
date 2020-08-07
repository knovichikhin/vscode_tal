# TAL source colouriser for Visual Studio Code
Syntax highlighting for TAL: Transaction Application Language.

## What does it look like?
 ![sample.tal](https://raw.githubusercontent.com/manoutoftime/vscode_tal/master/images/sample.png)

## Selecting TAL words with circumflex
TAL allows circumflex in variables, function names and other identifiers.
However, VSCode does not consider circumflex as a part of a word by default.
This means when a user double clicks a variable that includes a circumflex only part of the variable is selected.

In order to enable VSCode editor to recognize circumflex as a part of a word,
user has to define `editor.wordSeparators` that excludes circumflex. To do so for TAL only, add the following settings to your settings.json.

```
{
    "[tal]": {
        "editor.wordSeparators": "`~!@#$%&*()-=+[{]}\\|;:'\",.<>/?"
    }
}
```
