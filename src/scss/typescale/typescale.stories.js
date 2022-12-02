import has from 'lodash/has';
import typescaleDocs from './typescale.md';
import uiTypescaleDemoContent from './typescale_demo.html';
import uiTypescaleDemoStyles from './typescale_demo.scss';
import uiTypefaceContent from './typeface_demo.html';

const createTypescaleDemoComponent = (componentName, typescaleCSS, demoContent) => {
  if (!has(window, 'customElements') || customElements.get(componentName)) {
    return;
  }
  class TypescaleDemo extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      const wrapper = document.createElement('body');

      style.textContent = typescaleCSS;
      wrapper.innerHTML = demoContent;

      shadow.appendChild(style);
      shadow.appendChild(wrapper);
    }
  }

  customElements.define(componentName, TypescaleDemo);
};

createTypescaleDemoComponent('ui-typescale-demo', uiTypescaleDemoStyles, uiTypescaleDemoContent);
createTypescaleDemoComponent('ui-typeface-demo', uiTypescaleDemoStyles, uiTypefaceContent);

const component = {
  template: '<ui-typescale-demo />',
};

const typefaceComponent = {
  template: '<ui-typeface-demo />',
};

export const Default = () => component;
Default.parameters = {
  viewport: {
    defaultViewport: 'breakpointExtraLarge',
  },
};

export const Typefaces = () => typefaceComponent;
Typefaces.parameters = Default.parameters;

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'scss/typescale',
  parameters: {
    docs: {
      description: {
        component: typescaleDocs,
      },
    },
  },
};
