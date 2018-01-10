import { Rules, RuleFailure, RuleWalker } from 'tslint';

import {
    importNamesAdf,
} from "../adf/component-data";
import * as ts from 'typescript';
import { replaceAll } from '../typescript/literal';

const failureMessage = 'Import can be switched.';

export class Rule extends Rules.AbstractRule {

    apply(sourceFile: ts.SourceFile): RuleFailure[] {
        return this.applyWithWalker(new SwitchImportRule(sourceFile, this.getOptions()));
    }
}

export class SwitchImportRule extends RuleWalker {

    visitImportDeclaration(importDeclaration: ts.ImportDeclaration) {

        let updatedText = importDeclaration.getText();

        importNamesAdf.forEach(importName => {
            updatedText = replaceAll(updatedText, importName.oldadf, importName.newadf);
        });


        if (updatedText !== importDeclaration.getText()) {
            const replacement = this.createReplacement(importDeclaration.getStart(),
                importDeclaration.getWidth(), updatedText);

            this.addFailureAtNode(importDeclaration, failureMessage, replacement);
        }
    }
}
