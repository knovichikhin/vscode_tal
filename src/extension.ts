import * as vscode from 'vscode';
import { TALCompletionItemProvider } from './keywordprovider';
import { TALDocumentSymbolProvider } from './symbolprovider';

export function activate(context: vscode.ExtensionContext) {
    // Register TAL keyword completion provider if tal.enableTalFunctionCompletion is turned on
    if (vscode.workspace.getConfiguration('tal').get('enableTalFunctionCompletion') === true) {
        const talCompletionItemProvider = vscode.languages.registerCompletionItemProvider('tal', new TALCompletionItemProvider());
        context.subscriptions.push(talCompletionItemProvider);
    }

    // Register document breadcrumbs provider if tal.enableDocumentSymbol is turned on
    if (vscode.workspace.getConfiguration('tal').get('enableDocumentSymbol') === true) {
        const talSymbolProvider = vscode.languages.registerDocumentSymbolProvider('tal', new TALDocumentSymbolProvider());
        context.subscriptions.push();
    }
}
