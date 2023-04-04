import React, { useContext } from 'react';
import { DocsContext } from '@storybook/addon-docs';
import { Button } from '@storybook/components';

const BASE_URL = 'https://gitlab.com/gitlab-org/gitlab-ui/-/tree/main';

/**
 * Returns a source path given the current story path, if it exists. This works
 * by assuming the story's filename is of the form `.../{basename}.stories.js`,
 * and returns the source path of `.../{basename}.vue` or `{basename}.js`,
 * whichever exists.
 *
 * For example:
 *
 * sourcePathFromStoryPath('./src/components/base/alert/alert.stories.js')
 * // => './src/components/base/alert/alert.vue'
 *
 * @param {string} Story file path, relative to the root directory of the repo.
 * @returns {string} Source file path for component or directive, relative to
 *     the root of the repo.
 */
const sourcePathFromStoryPath = (storyPath) => {
  const sourcePaths = require
    .context('../../../src', true, /^(?!.*(?:(spec|documentation|stories).js$|utils)).*\.(vue|js)$/)
    .keys()
    .map((path) => path.replace(/^\.\//, './src/'));

  const sourcePathRegex = new RegExp(`${storyPath.replace(/\.stories\.js$/, '')}\.(vue|js)$`);

  return sourcePaths.find((path, i, arr) => sourcePathRegex.test(path));
};

export const LinkToSource = (props) => {
  const context = useContext(DocsContext);
  // There is a context.parameters.component.__file property that points to the
  // source file if it's a component, but it does not exist for directives and isn't available
  // in the production bundle.
  const storyFileName = context?.attachedCSFFile?.meta?.parameters?.fileName;
  if (!storyFileName) {
    return null;
  }
  const sourcePath = sourcePathFromStoryPath(storyFileName);
  if (!sourcePath) {
    return null;
  }
  const href = `${BASE_URL}/${sourcePath.replace(/^\.\//, '')}`;
  return (
    <Button
      data-testid="link-to-source"
      href={href}
      rel="noopener"
      target="_blank"
      isLink
      small
      {...props}
    >
      View source
    </Button>
  );
};
