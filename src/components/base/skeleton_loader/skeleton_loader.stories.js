import { GlSkeletonLoader } from '../../../../index';
import readme from './skeleton_loader.md';

const Template = (args) => ({
  components: { GlSkeletonLoader },
  props: Object.keys(args),
  template: `
  <div style="background: #fff; border: 1px solid #dfdfdf; box-shadow: 0 1px 2px rgba(0,0,0,0.1); width: 359px; height: 135px; padding: 1rem; border-radius: 0.25rem;">
    <div style="width: 327px; height: 102px;">
      <gl-skeleton-loader :width="327" :height="102">
        <rect width="276" height="16" rx="4" />
        <rect y="18" width="237" height="16" rx="4" />
        <rect y="42" width="118" height="16" rx="8" />
        <rect x="122" y="42" width="130" height="16" rx="8" />
        <rect y="62" width="106" height="16" rx="8" />
        <rect x="110" y="62" width="56" height="16" rx="8" />
        <rect x="256" y="42" width="71" height="16" rx="8" />
        <rect y="86" width="38" height="16" rx="4" />
      </gl-skeleton-loader>
    </div>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {};

export default {
  title: 'base/skeleton-loader',
  component: GlSkeletonLoader,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
    controls: {
      disable: true,
    },
  },
};
