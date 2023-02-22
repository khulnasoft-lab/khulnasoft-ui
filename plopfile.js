/* eslint-disable no-param-reassign */
const path = require('path');
const promptDirectory = require('inquirer-select-directory');
const snakeCase = require('lodash/snakeCase');

const componentsPath = path.join('src', 'components');
const baseComponentsPath = path.join(componentsPath, 'base');
const templateFolder = 'templates';

const commonActions = [
  {
    type: 'add',
    path: `{{componentDirAbsolute}}/{{name}}.spec.js`,
    templateFile: `${templateFolder}/spec.js.hbs`,
  },
  {
    type: 'append',
    pattern: 'ADD COMPONENT EXPORTS - needed for yarn generate:component. Do not remove',
    path: 'src/index.js',
    template: `export { default as Gl{{pascalCase name}} } from '.{{componentDir}}/{{name}}.vue';`,
  },
  {
    type: 'append',
    pattern: 'ADD COMPONENT IMPORTS - needed for yarn generate:component. Do not remove',
    path: 'src/scss/components.scss',
    template: `@import '..{{innerDir}}/{{name}}';`,
  },
  {
    type: 'add',
    path: `{{componentDirAbsolute}}/{{name}}.stories.js`,
    templateFile: `${templateFolder}/story.js.hbs`,
  },
  {
    type: 'add',
    path: `{{componentDirAbsolute}}/{{name}}.scss`,
  },
];

const makePrompts = (prompts = []) => [
  ...prompts,
  {
    type: 'confirm',
    name: 'useDefaultComponentDir',
    message: `The component will be placed in ${baseComponentsPath}, does that look right?`,
  },
  {
    when: (answers) => !answers.useDefaultComponentDir,
    type: 'directory',
    name: 'absoluteDir',
    message: 'Where should we put this component?',
    basePath: componentsPath,
  },
];

const setCommonData = (data) => {
  data.componentDirAbsolute =
    data.absoluteDir || path.join(__dirname, baseComponentsPath, data.name);
  data.componentDir = data.componentDirAbsolute.replace(__dirname, '');
  data.innerDir = data.componentDir
    .split(path.sep)
    .filter((el) => el !== 'src')
    .join(path.sep);
  data.pathToRootDir = data.componentDir.split(path.sep).filter(Boolean).fill('..').join(path.sep);
};

module.exports = (plop) => {
  plop.setPrompt('directory', promptDirectory);

  plop.setGenerator('Create Component', {
    description: 'Create basic empty component',
    prompts: makePrompts([
      {
        type: 'input',
        name: 'name',
        message: 'Component name in snake_case, e.g. progress_bar:\n',
      },
    ]),
    actions(data) {
      setCommonData(data);

      const actions = [
        ...commonActions,
        {
          type: 'add',
          path: `{{componentDirAbsolute}}/{{name}}.vue`,
          templateFile: `${templateFolder}/component.vue.hbs`,
        },
        {
          type: 'add',
          path: `{{componentDirAbsolute}}/{{name}}.md`,
          templateFile: `${templateFolder}/component.md.hbs`,
        },
      ];

      return actions;
    },
  });

  plop.setGenerator('Wrap BootstrapVue Component', {
    description: 'Create a gl_ component as a simple wrapper',
    prompts: makePrompts([
      {
        type: 'input',
        name: 'bootstrapVueComponentName',
        message: 'BS component name in PascalCase, e.g. BTable:\n',
      },
    ]),
    actions(data) {
      data.name = snakeCase(data.bootstrapVueComponentName).replace(/^b_/, '');
      setCommonData(data);

      const actions = [
        ...commonActions,
        {
          type: 'add',
          path: `{{componentDirAbsolute}}/{{name}}.vue`,
          templateFile: `${templateFolder}/bs_component.vue.hbs`,
        },
      ];

      return actions;
    },
  });
};
