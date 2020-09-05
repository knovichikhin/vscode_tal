'use strict';

import * as vscode from 'vscode';
import { TACLCompletionItemProvider, TALCompletionItemProvider } from './keywordprovider';
import { getTALLanguageConfiguration } from './languageconfiguration';
import { TALDocumentSymbolProvider } from './symbolprovider';

export function activate(context: vscode.ExtensionContext) {
    const talCompletionItemProvider = vscode.languages.registerCompletionItemProvider('tal', new TALCompletionItemProvider());
    context.subscriptions.push(talCompletionItemProvider);

    const taclCompletionItemProvider = vscode.languages.registerCompletionItemProvider('tacl', new TACLCompletionItemProvider());
    context.subscriptions.push(taclCompletionItemProvider);

    // Register document breadcrumbs provider if tal.enableDocumentSymbol is turned on
    if (vscode.workspace.getConfiguration('tal').get('enableDocumentSymbol') === true) {
        const talSymbolProvider = vscode.languages.registerDocumentSymbolProvider('tal', new TALDocumentSymbolProvider());
        context.subscriptions.push(talSymbolProvider);
    }

    vscode.languages.setLanguageConfiguration('tal', getTALLanguageConfiguration());
}
