import GlTruncate from './truncate.vue';
import { POSITION } from './constants';
import readme from './truncate.md';

const template = `
  <gl-truncate
    :text="text"
    :position="position"
    :with-tooltip="withTooltip"
  />
`;

const propDefault = (prop) => GlTruncate.props[prop].default;

const generateProps = ({
  text = 'src/thisIs/AVeryLongFilePath/that/needs/to/be/smartly/truncated/from/the/middle/so/we/dont/lose/important/information/here.vue',
  position = propDefault('position'),
  withTooltip = propDefault('withTooltip'),
} = {}) => ({
  text,
  position,
  withTooltip,
});

const makeStory =
  (options) =>
  (args, { argTypes }) => ({
    components: {
      GlTruncate,
    },
    props: Object.keys(argTypes),
    template,
    ...options,
  });

export const Default = makeStory();
Default.args = generateProps();

export const PositionStart = makeStory();
PositionStart.args = generateProps({ position: POSITION.START });

export const PositionMiddle = makeStory();
PositionMiddle.args = generateProps({ position: POSITION.MIDDLE });

// This is a regression test against https://gitlab.com/gitlab-org/gitlab/-/issues/515533.
// Correct rendering in both cases should be "Gap here" (single space).
// Incorrect rendering would be anything else, like "Gaphere" (no space) or
// "Gap  here" (double space).
export const WhitespacePreservation = makeStory({
  template: `
  <div>
    <gl-truncate
      text="Gap here"
      position="middle"
    />
    <br>
    <gl-truncate
      text="Gap       here"
      position="middle"
    />
  </div>
`,
});
WhitespacePreservation.parameters = {
  controls: {
    // Hide all controls, as this story is used as a visual test only.
    exclude: /.*/,
  },
};

export default {
  title: 'utilities/truncate',
  component: GlTruncate,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
    viewport: {
      defaultViewport: 'breakpointSmall',
    },
  },
  argTypes: {
    text: {
      control: 'text',
    },
    position: {
      options: Object.values(POSITION),
      control: 'select',
    },
    withTooltip: {
      control: 'boolean',
    },
  },
};
