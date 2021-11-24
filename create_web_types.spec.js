/* eslint-disable no-param-reassign */
import { kebabCase, flow, camelCase, upperFirst } from 'lodash';

import * as componentDocumentation from './documentation/components_documentation';
import * as components from './index';

const pascalCase = flow(camelCase, upperFirst);

const path = require('path');
const fs = require('fs');

// Import project `package.json`
const bootstrapVueWebTypes = require('bootstrap-vue/dist/web-types.json');
const pkg = require('./package.json');

const libraryName = pkg.name;
const libraryVersion = pkg.version;

const computePropType = ({ type }) => {
  if (!type) {
    return 'any';
  }

  type = type || Object;
  if (Array.isArray(type)) {
    // Array of types
    return type.map((t) => computePropType({ type: t })).join('|');
  }

  if (typeof type === 'undefined') {
    return 'any';
  }

  if (typeof type !== 'string') {
    type = type.name;
  }

  if (type === 'Array') {
    // For simplicity return arrays of any type entries
    return 'any[]';
  }

  // For browser types, we leave them capitalized, otherwise we return a lowercase TypeScript name
  return ['Boolean', 'String', 'Number', 'Function', 'Object'].indexOf(type) > -1
    ? type.toLowerCase()
    : type;
};

const computePropDefault = ({ default: def, type }) => {
  // Default could be a function that returns a non-primitive type
  def = typeof def === 'function' ? def.call({}) : def;
  if (type === Boolean || (Array.isArray(type) && type[0] === Boolean && !def)) {
    def = Boolean(def);
  } else if (def === undefined) {
    def = null;
  }
  return JSON.stringify(def);
};

// eslint-disable-next-line jest/expect-expect
it('generates web-types.json', () => {
  const tags = Object.keys(components).map((componentName) => {
    const component = components[componentName];

    const tag = {
      name: kebabCase(componentName),
      source: {
        module: libraryName,
        symbol: componentName,
      },
      'doc-url': '',
      attributes: !component.props
        ? []
        : Object.keys(component.props).map((propName) => {
            const prop = component.props[propName];

            return {
              name: propName,
              value: {
                kind: 'expression',
                type: computePropType(prop),
              },
              default: computePropDefault(prop),
              'doc-url': '',
              required: prop.required,
            };
          }),
    };

    const documentation = componentDocumentation[`${componentName}Documentation`];
    const bootstrapComponent = documentation?.bootstrapComponent;

    if (bootstrapComponent) {
      const bootstrapComponentPascalCase = pascalCase(bootstrapComponent);

      const bootstrapVueComponentDefinition = bootstrapVueWebTypes.contributions.html.tags.find(
        (bootstrapVueTag) => bootstrapVueTag.name === bootstrapComponentPascalCase
      );

      tag.attributes = [...tag.attributes, ...(bootstrapVueComponentDefinition?.attributes || [])];
    }

    return tag;
  });

  const webTypes = {
    $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    name: libraryName,
    version: libraryVersion,
    contributions: {
      html: {
        'types-syntax': 'typescript',
        'description-markup': 'markdown',
        // Components get placed here
        tags,
      },
    },
  };

  const webTypesJson = JSON.stringify(webTypes, null, 2);
  fs.writeFileSync(path.resolve(__dirname, 'dist/web-types.json'), webTypesJson);
});
