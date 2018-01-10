#  ADF 1.X.X -> 2.0.0 UPDATER
Switches the `alfresco and activiti` prefix to `adf` in ADF apps.
The ADF prefix updater is going to update automatically all the following problems:

Change all alfresco- activiti- old prefix with adf-
Change all md- old prefix with mat- prefix
Change all the old import with the new import for more details give a look to the last section
Change all the old class name with the new class name 
Change all the old type using the new types

## Installation
```bash
npm i -g adf-switcher
```

## Usage

```bash
# Show the help for the tool
adf-switcher --help

# Run the tool to update prefixes
adf-switcher -p path/to/project/tsconfig.json

# Run the tool to update prefixes with additional style
# files not referenced by an Angular component, where --extra-css
# accepts a glob pointing to the style files
adf-switcher -p path/to/project/tsconfig.json --extra-css 'custom/**/*.css' 
```

