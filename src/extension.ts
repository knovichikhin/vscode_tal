import * as vscode from 'vscode';
import { TALCompletionItemProvider } from './keywordprovider';

export function activate(context: vscode.ExtensionContext) {
	// Register TAL keyword completion provider if tal.enableTalFunctionCompletion is turned on
    if (vscode.workspace.getConfiguration('tal').get('enableTalFunctionCompletion') === true) {
        const talCompletionItemProvider = vscode.languages.registerCompletionItemProvider('tal', new TALCompletionItemProvider());
        context.subscriptions.push(talCompletionItemProvider);
    }
}
