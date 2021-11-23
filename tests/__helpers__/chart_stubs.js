import ChartTooltip from '~/components/charts/tooltip/tooltip.vue';

export const createMockChartInstance = () => ({
  getDom: () => {
    return {
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  },
  on: () => {},
  off: () => {},
  convertToPixel: () => {},
  getOption: () => {
    return {
      series: [],
    };
  },
});

export const ChartTooltipStub = {
  props: ChartTooltip.props,
  name: 'chart-tooltip',
  template: `
     <div>
       <slot name="title" />
       <slot />
     </div>`,
};
