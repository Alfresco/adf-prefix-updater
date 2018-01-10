import { Rules, RuleFailure, RuleWalker } from 'tslint';

import { classNamesAdf } from "../adf/component-data";
import { classNames } from '../material/component-data';
import * as ts from 'typescript';
import { replaceAll } from '../typescript/literal';

const failureMessage = 'literal type can be switched.';

export class Rule extends Rules.AbstractRule {

    apply(sourceFile: ts.SourceFile): RuleFailure[] {
        return this.applyWithWalker(new SwitchFunctionRule(sourceFile, this.getOptions()));
    }
}

export class SwitchFunctionRule extends RuleWalker {

    visitVariableDeclaration(node: ts.VariableDeclaration) {

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

    visitPropertyDeclaration(node: ts.PropertyDeclaration) {

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

    visitTypeLiteral(node: ts.TypeLiteralNode) {

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

    visitParameterDeclaration(node: ts.ParameterDeclaration) {

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

    visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {

        let updatedText = node.getText();

        classNames.forEach(typeName => {
            updatedText = replaceAll(updatedText, typeName.md, typeName.mat);
        });

        classNamesAdf.forEach(typeName => {
            updatedText = replaceAll(updatedText, typeName.oldadf, typeName.newadf);
        });

        if (updatedText !== node.getText()) {
            const replacement = this.createReplacement(node.getStart(),
                node.getWidth(), updatedText);

            this.addFailureAtNode(node, failureMessage, replacement);
        }
    }
}
