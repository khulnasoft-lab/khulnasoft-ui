import { GlModal, GlModalDirective, GlButton } from '../../../index';
import { variantOptionsWithNoDefault } from '../../../utils/constants';
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
};

const Template = (args, { argTypes }) => ({
  components: { GlModal, GlButton },
  directives: { GlModalDirective },
  props: Object.keys(argTypes),
  template: generateTemplate(),
});

const generateProps = ({
  variant = variantOptionsWithNoDefault.default,
  contentPagraphs = 1,
  scrollable = false,
  visible = false,
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
  visible,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const OpenedModal = Template.bind({});
OpenedModal.args = generateProps({ visible: true });

export const WithScrollingContent = Template.bind({});
WithScrollingContent.args = generateProps({
  contentPagraphs: 100,
  scrollable: true,
  visible: true,
});

export const WithAHeader = (args, { argTypes }) => ({
  components: { GlModal, GlButton },
  directives: { GlModalDirective },
  props: Object.keys(argTypes),
  template: generateTemplate({
    slots: {
      'modal-header': '<h4>A custom header</h4>',
    },
  }),
});
WithAHeader.args = generateProps({ visible: true });

export const WithoutAFooter = (args, { argTypes }) => ({
  components: { GlModal, GlButton },
  directives: { GlModalDirective },
  props: Object.keys(argTypes),
  template: generateTemplate({
    props: { 'hide-footer': true },
  }),
});
WithoutAFooter.args = generateProps({ visible: true });

export default {
  title: 'base/modal',
  components: { GlModal, GlButton },
  directives: { GlModalDirective },
  bootstrapComponent: 'b-modal',
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    headerBgVariant: {
      control: {
        type: 'select',
        options: variantOptionsWithNoDefault,
      },
    },
    headerBorderVariant: {
      control: {
        type: 'select',
        options: variantOptionsWithNoDefault,
      },
    },
    headerTextVariant: {
      control: {
        type: 'select',
        options: variantOptionsWithNoDefault,
      },
    },
    bodyBgVariant: {
      control: {
        type: 'select',
        options: variantOptionsWithNoDefault,
      },
    },
    bodyTextVariant: {
      control: {
        type: 'select',
        options: variantOptionsWithNoDefault,
      },
    },
    footerBgVariant: {
      control: {
        type: 'select',
        options: variantOptionsWithNoDefault,
      },
    },
    footerBorderVariant: {
      control: {
        type: 'select',
        options: variantOptionsWithNoDefault,
      },
    },
    footerTextVariant: {
      control: {
        type: 'select',
        options: variantOptionsWithNoDefault,
      },
    },
  },
};
