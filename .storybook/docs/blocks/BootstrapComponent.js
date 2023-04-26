import React, { useContext } from 'react';
import { DocsContext } from '@storybook/addon-docs';

export const BootstrapComponent = () => {
  const context = useContext(DocsContext);
  const bootstrapComponentName = context?.attachedCSFFile?.meta.parameters?.bootstrapComponent;
  if (!bootstrapComponentName) {
    return null;
  }
  const bootstrapComponentLink =
    context.parameters?.bootstrapComponentLink ||
    `https://bootstrap-vue.org/docs/components/${bootstrapComponentName
      .replace('b-', '')
      .toLowerCase()}`;
  return (
    <>
      <h3 id="under-the-hood">BootstrapVue component</h3>
      <p>
        This component uses{' '}
        <a data-testid="bv-component-link" href={bootstrapComponentLink} target="blank">
          <code>&lt;{bootstrapComponentName}&gt;</code>
        </a>{' '}
        from BootstrapVue internally. So please take a look also there at their extensive
        documentation.
      </p>
    </>
  );
};
