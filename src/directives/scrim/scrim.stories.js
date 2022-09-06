import { GlMarkdown } from '../../index';
import { generateStaticContent, generateContent } from '../../utils/static_content';
import { GlScrimDirective as Scrim, SCRIM_POSITION } from './scrim';
import readme from './scrim.md';

const components = { GlMarkdown };

const directives = {
  Scrim,
};

const scrollContent = generateContent([
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
]);

const generateProps = ({ position = SCRIM_POSITION.BOTTOM } = {}) => ({
  position,
});

const defaultTemplate = (content, scrollPosition = SCRIM_POSITION.BOTTOM) => `
    <div
      v-scrim:${[scrollPosition]}
      style="height: 300px; overflow-y: auto"
      class="gl-h-20 gl-px-4 gl-border-solid gl-border-1 gl-border-l-gray-100 gl-border-r-gray-100 gl-border-b-gray-100 gl-border-t-gray-100">
      ${content}
    </div>
`;

export const Default = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  directives,
  template: defaultTemplate(scrollContent),
});

Default.args = generateProps();

export const TopBottomScrim = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  directives,
  template: defaultTemplate(scrollContent, SCRIM_POSITION.TOP_BOTTOM),
});

TopBottomScrim.args = generateProps();

export const NarrowElementScroll = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  directives,
  template: `
    <div class="gl-display-flex gl-flex-wrap gl-gap-3">
      ${defaultTemplate(scrollContent)}
      ${defaultTemplate(scrollContent)}
      ${defaultTemplate(scrollContent)}
      ${defaultTemplate(scrollContent, SCRIM_POSITION.TOP_BOTTOM)}
      ${defaultTemplate(scrollContent, SCRIM_POSITION.TOP)}
    </div>
  `,
});

NarrowElementScroll.args = generateProps();

export const StaticContentExample = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  directives,
  components,
  template: `
    <div
      v-scrim:${[SCRIM_POSITION.TOP_BOTTOM]}
      style="height: 700px; overflow-y: auto"
      class="gl-px-4 gl-border-solid gl-border-1 gl-border-l-gray-100 gl-border-r-gray-100 gl-border-b-gray-100 gl-border-t-gray-100"
    >
      ${generateStaticContent(3)}
    </div>
  `,
});

StaticContentExample.args = generateProps();

export default {
  title: 'directives/gl-scrim',
  component: Scrim,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
