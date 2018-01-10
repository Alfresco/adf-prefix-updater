import { RuleWalker } from 'tslint';
import * as ts from 'typescript';

export class DecoratorWalker extends RuleWalker {

    protected visitDecorator(decorator: ts.Decorator, decoratorName: string) {}

    visitNode(node: ts.Node) {
        if (node.kind === ts.SyntaxKind.Decorator) {
            const decorator = node as ts.Decorator;
            const decoratorName = this.getDecoratorName(decorator);

            if(decoratorName){
                if (decoratorName === 'Input' || decoratorName === 'Output' || decoratorName === 'ContentChild' || decoratorName === 'ContentChildren' || decoratorName === 'ViewChild' || decoratorName === 'ViewChildren') {
                    this.visitDecorator(decorator, decoratorName);
                }
            }

        }

        super.visitNode(node);
    }

    getDecoratorName(decorator: ts.Decorator) {
        let baseExpr = <any>decorator.expression || {};
        let expr = baseExpr.expression || {};
        return expr.text;
    }
}
