import * as ts from 'typescript';
import { getExportDeclaration, getImportDeclaration } from '../typescript/imports';

/** Name of the Angular ADF module specifier. */
export const adfModuleSpecifier = [
    'ng2-activiti-analytics',
    'ng2-activiti-diagrams',
    'ng2-activiti-form',
    'ng2-activiti-processlist',
    'ng2-activiti-tasklist',
    'ng2-alfresco-core',
    'ng2-alfresco-datatable',
    'ng2-alfresco-documentlist',
    'ng2-alfresco-login',
    'ng2-alfresco-search',
    'ng2-alfresco-social',
    'ng2-alfresco-tag',
    'ng2-alfresco-upload',
    'ng2-alfresco-userinfo',
    'ng2-alfresco-viewer',
    'ng2-alfresco-webscript'];

/** Whether the specified node is part of an ADF import declaration. */
export function isAdfImportDeclaration(node: ts.Node) {
    let importName = getImportDeclaration(node).moduleSpecifier.getText();
    return adfModuleSpecifier.indexOf(importName);
}

/** Whether the specified node is part of an ADF export declaration. */
export function isAdfExportDeclaration(node: ts.Node) {
    let exportName = getExportDeclaration(node).moduleSpecifier.getText();
    return adfModuleSpecifier.indexOf(exportName);
}
