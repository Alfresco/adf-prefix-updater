import {Rules, RuleFailure, ProgramAwareRuleWalker} from 'tslint';
import {relative} from 'path';
import {getOriginalSymbolFromNode} from '../typescript/identifiers';
import {
  isExportSpecifierNode,
  isImportSpecifierNode,
  isNamespaceImportNode
} from '../typescript/imports';
import {
  isMaterialImportDeclaration,
  isMaterialExportDeclaration,
} from '../material/typescript-specifiers';
import {
  isAdfExportDeclaration,
  isAdfImportDeclaration,
} from '../adf/typescript-specifiers';
import {classNames} from '../material/component-data';
import { classNamesAdf} from '../adf/component-data';
import * as ts from 'typescript';

/** Message that is being sent to TSLint if an identifier still uses the outdated prefix. */
const failureMessage = 'Identifier can be switched from "Md" prefix to "Mat".';

/**
 * Rule that walks through every identifier that is part of Angular Material and ADF and replaces the
 * outdated prefix with the new one.
 */
export class Rule extends Rules.TypedRule {

  applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): RuleFailure[] {
    return this.applyWithWalker(
        new SwitchIdentifiersWalker(sourceFile, this.getOptions(), program));
  }
}

export class SwitchIdentifiersWalker extends ProgramAwareRuleWalker {

  /** List of Angular Material namespace declarations in the current source file. */
  materialNamespaceDeclarations: ts.Declaration[] = [];

  /** Method that is called for every identifier inside of the specified project. */
  visitIdentifier(identifier: ts.Identifier) {
    // Store Angular Material namespace identifers in a list of declarations.
    // Namespace identifiers can be: `import * as md from '@angular/material';`
    this._storeNamespaceImports(identifier);

    // For identifiers that aren't listed in the className data, the whole check can be
    // skipped safely.
    if (!classNames.some(data => data.md === identifier.text) && !classNamesAdf.some(data => data.oldadf === identifier.text)) {
      return;
    }

    const symbol =  {
      name : identifier.text
    };

    if (isExportSpecifierNode(identifier) && isMaterialExportDeclaration(identifier)) {
      return this.createIdentifierFailure(identifier, symbol);
    }

    if (isExportSpecifierNode(identifier) && isAdfExportDeclaration(identifier)) {
      return this.createAdfIdentifierFailure(identifier, symbol);
    }

    if (isImportSpecifierNode(identifier) && isMaterialImportDeclaration(identifier)) {
        return this.createIdentifierFailure(identifier, symbol);
    }

    if (isImportSpecifierNode(identifier) && isAdfImportDeclaration(identifier)) {
        return this.createAdfIdentifierFailure(identifier, symbol);
    }

  }

  /** Creates a failure and replacement for the specified identifier. */
  private createIdentifierFailure(identifier: ts.Identifier, symbol: any) {
    const classData = classNames.find(data => data.md === symbol.name);

    if (!classData) {
      console.error(`Could not find updated prefix for identifier "${identifier.getText()}" in ` +
          ` in file ${this._getRelativeFileName()}.`);
      return;
    }

    const replacement = this.createReplacement(
        identifier.getStart(), identifier.getWidth(), classData.mat);

    this.addFailureAtNode(identifier, failureMessage, replacement);
  }

  /** Creates a failure and replacement for the specified identifier. */
  private createAdfIdentifierFailure(identifier: ts.Identifier, symbol: any) {
    const classAdfData = classNamesAdf.find(data => data.oldadf === symbol.name);

    if (!classAdfData) {
      console.error(`Could not find updated prefix for identifier "${identifier.getText()}" in ` +
          ` in file ${this._getRelativeFileName()}.`);
      return;
    }

    const replacement = this.createReplacement(
        identifier.getStart(), identifier.getWidth(), classAdfData.newadf);

    this.addFailureAtNode(identifier, failureMessage, replacement);
  }

  /** Checks namespace imports from Angular Material and stores them in a list. */
  private _storeNamespaceImports(identifier: ts.Identifier) {
    // In some situations, developers will import Angular Material completely using a namespace
    // import. This is not recommended, but should be still handled in the migration tool.
    if (isNamespaceImportNode(identifier) && isMaterialImportDeclaration(identifier)) {
      const symbol = getOriginalSymbolFromNode(identifier, this.getTypeChecker());

      if (symbol) {
        return this.materialNamespaceDeclarations.push(symbol.valueDeclaration);
      }
    }
  }

  /** Returns the current source file path relative to the root directory of the project. */
  private _getRelativeFileName(): string {
    return relative(this.getProgram().getCurrentDirectory(), this.getSourceFile().fileName);
  }
}
