import { Rules, RuleFailure, RuleWalker } from 'tslint';
import {
    elementSelectors,
    attributeSelectors,
    removeAttributeBackets,
} from "../material/component-data";

import {
    elementSelectorsAdf,
    attributeSelectorsAdf
} from "../adf/component-data";
import * as ts from 'typescript';
import { replaceAll } from '../typescript/literal';

/** Message that is being sent to TSLint if a string literal still uses the outdated prefix. */
const failureMessage = 'String literal can be switched';

/**
 * Rule that walks through every string literal, which includes the outdated Material and ADF prefix and
 * is part of a call expression. Those string literals will be changed to the new prefix.
 */
export class Rule extends Rules.AbstractRule {

    apply(sourceFile: ts.SourceFile): RuleFailure[] {
        return this.applyWithWalker(new SwitchStringLiteralsWalker(sourceFile, this.getOptions()));
    }
}

export class SwitchStringLiteralsWalker extends RuleWalker {

    visitStringLiteral(stringLiteral: ts.StringLiteral) {
        if (stringLiteral.parent.kind !== ts.SyntaxKind.CallExpression) {
            return;
        }

        let updatedText = stringLiteral.getText();

        elementSelectors.forEach(selector => {
            updatedText = replaceAll(updatedText, selector.md, selector.mat);
        });

        elementSelectorsAdf.forEach(selector => {
            updatedText = replaceAll(updatedText, selector.oldadf, selector.newadf);
        });

        attributeSelectors.forEach(attribute => {
            updatedText = replaceAll(updatedText,
                removeAttributeBackets(attribute.md), removeAttributeBackets(attribute.mat));
        });

        attributeSelectorsAdf.forEach(attribute => {
            updatedText = replaceAll(updatedText,
                removeAttributeBackets(attribute.oldadf), removeAttributeBackets(attribute.newadf));
        });

        if (updatedText !== stringLiteral.getText()) {
            const replacement = this.createReplacement(stringLiteral.getStart(),
                stringLiteral.getWidth(), updatedText);

            this.addFailureAtNode(stringLiteral, failureMessage, replacement);
        }
    }
}
