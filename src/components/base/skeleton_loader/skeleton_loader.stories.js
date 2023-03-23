import { makeContainer } from '../../../utils/story_decorators/container';
import GlSkeletonLoader from './skeleton_loader.vue';
import readme from './skeleton_loader.md';

const defaultValue = (prop) => GlSkeletonLoader.props[prop].default;

const generateProps = ({
  width = defaultValue('width'),
  height = defaultValue('height'),
  preserveAspectRatio = defaultValue('preserveAspectRatio'),
  lines = defaultValue('lines'),
  equalWidthLines = defaultValue('equalWidthLines'),
} = {}) => ({
  width,
  height,
  preserveAspectRatio,
  lines,
  equalWidthLines,
});

const template = (slotContent = '') => `
    <gl-skeleton-loader
      :width="width"
      :height="height"
      :preserveAspectRatio="preserveAspectRatio"
      :lines="lines"
      :equalWidthLines="equalWidthLines"
    >${slotContent}</gl-skeleton-loader>
`;

export const Default = (args) => ({
  components: { GlSkeletonLoader },
  props: Object.keys(args),
  template: template(),
});
Object.assign(Default, {
  args: generateProps(),
  parameters: {
    controls: {
      // When not providing custom shapes in the default slot, these are the
      // only props you're likely to want to modify.
      include: ['width', 'lines', 'equalWidthLines'],
    },
  },
});

export const WithCustomShapes = (args) => ({
  components: { GlSkeletonLoader },
  props: Object.keys(args),
  template: template(`
    <rect width="276" height="16" rx="4" />
    <rect y="18" width="237" height="16" rx="4" />
    <rect y="42" width="118" height="16" rx="8" />
    <rect x="122" y="42" width="130" height="16" rx="8" />
    <rect y="62" width="106" height="16" rx="8" />
    <rect x="110" y="62" width="56" height="16" rx="8" />
    <rect x="256" y="42" width="71" height="16" rx="8" />
    <rect y="86" width="38" height="16" rx="4" />
  `),
});
Object.assign(WithCustomShapes, {
  args: generateProps({
    width: 327,
    height: 102,
  }),
  parameters: {
    controls: {
      // With custom shapes, other props become useful, although they're a bit
      // counterintuitive.
      include: ['width', 'height', 'preserveAspectRatio'],
    },
  },
  decorators: [makeContainer({ width: '250px' })],
});

export default {
  title: 'base/skeleton-loader',
  component: GlSkeletonLoader,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
