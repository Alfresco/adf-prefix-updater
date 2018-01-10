/** Interface that describes a collection of component information. */
export interface AdfNameData {
  oldadf: string;
  newadf: string;
}

/** Export the class name data as part of a module. This means that the data is cached. */
export const classNamesAdf: AdfNameData[] = require('./data/class-names.json');

/** Export the input names data as part of a module. This means that the data is cached. */
export const inputNamesAdf: AdfNameData[] = require('./data/input-names.json');

/** Export the element selectors data as part of a module. This means that the data is cached. */
export const elementSelectorsAdf: AdfNameData[] = require('./data/element-selectors.json');

/** Export the attribute selectors data as part of a module. This means that the data is cached. */
export const exportAsNamesAdf: AdfNameData[] = require('./data/export-as-names.json');

/** Export the attribute selectors data as part of a module. This means that the data is cached. */
export const attributeSelectorsAdf: AdfNameData[] = require('./data/attribute-selectors.json');

/** Export the property names as part of a module. This means that the data is cached. */
export const propertyNamesAdf: AdfNameData[] = require('./data/property-names.json');

/** Export the packages names as part of a module. This means that the data is cached. */
export const importNamesAdf: AdfNameData[] = require('./data/import-names.json');

/** Export the deprecated attribute names as part of a module. This means that the data is cached. */
export const deprecatedAttributeAdf: AdfNameData[] = require('./data/deprecated-attribute.json');
