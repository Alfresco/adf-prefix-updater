import { Rules, RuleFailure } from 'tslint';

import { classNamesAdf } from "../adf/component-data";
import { classNames } from '../material/component-data';

import * as ts from 'typescript';
import { replaceAll } from '../typescript/literal';
import {DecoratorWalker} from '../tslint/decorator-walker';

const failureMessage = 'literal type can be switched.';

export class Rule extends Rules.AbstractRule {

    apply(sourceFile: ts.SourceFile): RuleFailure[] {
        return this.applyWithWalker(new SwitchDecoratorRule(sourceFile, this.getOptions()));
    }
}

export class SwitchDecoratorRule extends DecoratorWalker {

    getDecoratorName(decorator: ts.Decorator) {
        let baseExpr = <any>decorator.expression || {};
        let expr = baseExpr.expression || {};
        return expr.text;
    }

    visitDecorator(node: ts.Decorator, decoratorName: string) {

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
