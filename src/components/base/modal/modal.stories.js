import { GlModalDirective } from '../../../directives/modal';
import GlButton from '../button/button.vue';
import { variantOptionsWithNoDefault } from '../../../utils/constants';
import GlModal from './modal.vue';
import readme from './modal.md';

const generateTemplate = ({ props = {}, slots = {} } = {}) => {
  const extraProps = Object.entries(props)
    .map(([key, value]) => `:${key}="${value}"`)
    .join('\n        ');

  return `
    <div>
      <gl-button v-gl-modal-directive="'test-modal-id'" category="primary" variant="confirm">
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
        :visible="$options.viewMode !== 'docs'"
        :scrollable="scrollable"
        :no-focus-on-show="noFocusOnShow"
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
};

const Template = (args, { argTypes, viewMode }) => ({
  components: { GlModal, GlButton },
  directives: { GlModalDirective },
  props: Object.keys(argTypes),
  template: generateTemplate(),
  viewMode,
});

const generateProps = ({
  variant = variantOptionsWithNoDefault.default,
  contentPagraphs = 1,
  scrollable = false,
  noFocusOnShow = false,
} = {}) => ({
  headerBgVariant: variant,
  headerBorderVariant: variant,
  headerTextVariant: variant,
  bodyBgVariant: variant,
  bodyTextVariant: variant,
  footerBgVariant: variant,
  footerBorderVariant: variant,
  footerTextVariant: variant,
  contentParagraphs: contentPagraphs,
  scrollable,
  noFocusOnShow,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithScrollingContent = Template.bind({});
WithScrollingContent.args = generateProps({
  contentPagraphs: 100,
  scrollable: true,
});

export const WithAHeader = (args, { argTypes, viewMode }) => ({
  components: { GlModal, GlButton },
  directives: { GlModalDirective },
  props: Object.keys(argTypes),
  template: generateTemplate({
    slots: {
      'modal-header': '<h4>A custom header</h4>',
    },
  }),
  viewMode,
});
WithAHeader.args = generateProps();

export const WithoutAFooter = (args, { argTypes, viewMode }) => ({
  components: { GlModal, GlButton },
  directives: { GlModalDirective },
  props: Object.keys(argTypes),
  template: generateTemplate({
    props: { 'hide-footer': true },
  }),
  viewMode,
});
WithoutAFooter.args = generateProps();

export const WithoutFocus = Template.bind({});
WithoutFocus.args = generateProps({
  noFocusOnShow: true,
});

export default {
  title: 'base/modal',
  component: GlModal,
  directives: { GlModalDirective },
  bootstrapComponent: 'b-modal',
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    headerBgVariant: {
      options: variantOptionsWithNoDefault,
      control: 'select',
    },
    headerBorderVariant: {
      options: variantOptionsWithNoDefault,
      control: 'select',
    },
    headerTextVariant: {
      options: variantOptionsWithNoDefault,
      control: 'select',
    },
    bodyBgVariant: {
      options: variantOptionsWithNoDefault,
      control: 'select',
    },
    bodyTextVariant: {
      options: variantOptionsWithNoDefault,
      control: 'select',
    },
    footerBgVariant: {
      options: variantOptionsWithNoDefault,
      control: 'select',
    },
    footerBorderVariant: {
      options: variantOptionsWithNoDefault,
      control: 'select',
    },
    footerTextVariant: {
      options: variantOptionsWithNoDefault,
      control: 'select',
    },
  },
};
