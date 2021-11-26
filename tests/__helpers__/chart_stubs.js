import ChartTooltip from '~/components/charts/tooltip/tooltip.vue';

export const createMockChartInstance = () => ({
  getDom: () => {
    return {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  },
  dispatchAction: jest.fn(),
  setOption: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  resize: jest.fn(),
  convertToPixel: jest.fn().mockReturnValue([]),
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
