import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlModal, GlModalDirective, GlButton } from '../../../../index';
import { variantOptionsWithNoDefault } from '../../../utils/constants';
import readme from './modal.md';

const components = {
  GlModal,
  GlButton,
};

const directives = {
  GlModalDirective,
};

function generateTemplate({ props = {}, slots = {} } = {}) {
  const extraProps = Object.entries(props)
    .map(([key, value]) => `:${key}="${value}"`)
    .join('\n        ');

  return `
    <div>
      <gl-button
        v-gl-modal-directive="'test-modal-id'"
        category="primary"
        variant="confirm" 
        data-testid="show-modal-button">
        Open modal
      </gl-button>
      <gl-modal
        :header-bg-variant="headerBgVariant"
        :header-border-variant="headerBorderVariant"
        :header-text-variant="headerTextVariant"
        :body-bg-variant="bodyBgVariant"
        :body-text-variant="bodyTextVariant"
        :footer-bg-variant="footerBgVariant"
        :footer-border-variant="footerBorderVariant"
        :footer-text-variant="footerTextVariant"
        ${extraProps}
        :action-primary="{text: 'Okay'}"
        :action-secondary="{text: 'Discard Changes'}"
        :action-cancel="{text: 'Cancel'}"
        :visible="visible"
        :scrollable="scrollable"
        modal-id="test-modal-id"
        title="Example title"
        no-fade
      >
      <p v-for="n in contentParagraphs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      ${Object.entries(slots).map(
        ([slot, contents]) => `<template #${slot}>${contents}</template>`
      )}
      </gl-modal>
    </div>
  `;
}

function generateProps({
  variant = variantOptionsWithNoDefault.default,
  contentPagraphs = 1,
  scrollable = false,
  visible = false,
} = {}) {
  return {
    headerBgVariant: {
      type: String,
      default: select('header bg', variantOptionsWithNoDefault, variant),
    },
    headerBorderVariant: {
      type: String,
      default: select('header border', variantOptionsWithNoDefault, variant),
    },
    headerTextVariant: {
      type: String,
      default: select('header text', variantOptionsWithNoDefault, variant),
    },
    bodyBgVariant: {
      type: String,
      default: select('body bg', variantOptionsWithNoDefault, variant),
    },
    bodyTextVariant: {
      type: String,
      default: select('body text', variantOptionsWithNoDefault, variant),
    },
    footerBgVariant: {
      type: String,
      default: select('footer bg', variantOptionsWithNoDefault, variant),
    },
    footerBorderVariant: {
      type: String,
      default: select('footer border', variantOptionsWithNoDefault, variant),
    },
    footerTextVariant: {
      type: String,
      default: select('footer text', variantOptionsWithNoDefault, variant),
    },
    contentParagraphs: {
      type: Number,
      default: number('content paragraphs', contentPagraphs),
    },
    scrollable: {
      type: Boolean,
      default: boolean('scrollable', scrollable),
    },
    visible: {
      type: Boolean,
      default: visible,
    },
  };
}

documentedStoriesOf('base/modal', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    directives,
    template: generateTemplate(),
  }))
  .add('opened modal', () => ({
    props: generateProps({ visible: true }),
    components,
    directives,
    template: generateTemplate(),
  }))
  .add('with scrolling content', () => ({
    props: generateProps({ contentPagraphs: 100, scrollable: true, visible: true }),
    components,
    directives,
    template: generateTemplate(),
  }))
  .add('with a header', () => ({
    props: generateProps({ visible: true }),
    components,
    directives,
    template: generateTemplate({
      slots: {
        'modal-header': '<h4>A custom header</h4>',
      },
    }),
  }))
  .add('without a footer', () => ({
    props: generateProps({ visible: true }),
    components,
    directives,
    template: generateTemplate({
      props: { 'hide-footer': true },
    }),
  }));
