import * as chartComponents from '../src/charts';
import * as components from '../src';

export const gitlabComponents = { ...components, ...chartComponents };
export const gitlabChartComponents = { ...chartComponents };

export const componentValidator = (componentName) =>
  Object.keys(gitlabComponents).includes(componentName);
