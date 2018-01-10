import { Rules, RuleFailure, RuleWalker } from 'tslint';

import { classNamesAdf } from "../adf/component-data";
import { classNames } from '../material/component-data';

import * as ts from 'typescript';
import { replaceAll } from '../typescript/literal';

const failureMessage = 'constructor type can be switched.';

export class Rule extends Rules.AbstractRule {

    apply(sourceFile: ts.SourceFile): RuleFailure[] {
        return this.applyWithWalker(new SwitchTypeConstructorRule(sourceFile, this.getOptions()));
    }
}

export class SwitchTypeConstructorRule extends RuleWalker {

    visitConstructorType(node: ts.FunctionOrConstructorTypeNode) {

        let updatedText = node.getText();


        classNamesAdf.forEach(typeName => {
            updatedText = replaceAll(updatedText, typeName.oldadf, typeName.newadf);
        });

        classNames.forEach(typeName => {
            updatedText = replaceAll(updatedText, typeName.md, typeName.mat);
        });

        if (updatedText !== node.getText()) {
            const replacement = this.createReplacement(node.getStart(),
                node.getWidth(), updatedText);

            this.addFailureAtNode(node, failureMessage, replacement);
        }
    }
}
