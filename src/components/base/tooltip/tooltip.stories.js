import { GlTooltipDirective } from '../../../directives/tooltip';
import GlButton from '../button/button.vue';
import GlTooltip from './tooltip.vue';
import readme from './tooltip.md';

function makeTooltip(modifier = '') {
  return {
    components: { GlTooltip, GlButton },
    directives: {
      GlTooltip: GlTooltipDirective,
    },
    template: `
    <div class="gl-display-flex gl-align-items-center gl-justify-content-center gl-p-7 gl-m-7">
      <gl-button
        v-gl-tooltip${modifier}
        title="some tooltip text"
      >
          Tooltip
      </gl-button>
    </div>
  `,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('button').focus());
    },
  };
}

export const TopDefault = (args, argTypes) => ({
  ...makeTooltip(),
  props: Object.keys(argTypes),
});

export const Right = (args, argTypes) => ({
  ...makeTooltip('.right'),
  props: Object.keys(argTypes),
});

export const Bottom = (args, argTypes) => ({
  ...makeTooltip('.bottom'),
  props: Object.keys(argTypes),
});

export const Left = (args, argTypes) => ({
  ...makeTooltip('.left'),
  props: Object.keys(argTypes),
});

// A default export contains higher-level info about the component and the stories' settings.
export default {
  title: 'base/tooltip',
  component: GlTooltip,
  parameters: {
    bootstrapComponent: 'b-tooltip',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
