import ChartTooltip from '~/components/charts/tooltip/tooltip.vue';

export const createMockChartInstance = () => {
  const dom = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    getAttribute: jest.fn().mockReturnValue(''),
  };
  const zr = {
    on: jest.fn(),
    off: jest.fn(),
  };

  return {
    // temporary workaround to ensure compatibility with @vue/compat
    __v_isReadonly: true,

    dispatchAction: jest.fn(),
    setOption: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    resize: jest.fn(),
    convertToPixel: jest.fn().mockReturnValue([]),
    getOption: jest.fn().mockReturnValue({
      series: [],
    }),
    getDom: () => {
      return dom;
    },
    getZr: () => {
      return zr;
    },
  };
};

export const chartTooltipStubData = {
  title: 'Stub tooltip title',
  content: 'Stub tooltip content',
  params: {
    seriesData: [
      {
        seriesName: 'Oranges (1)',
        seriesIndex: 0,
        color: 'orange1',
        borderColor: 'orange2',
        value: ['Count', 9],
      },
      {
        seriesName: 'Apples (2)',
        seriesIndex: 1,
        color: 'red1',
        borderColor: 'red2',
        value: ['Count', 10],
      },
    ],
  },
};

export const ChartTooltipStub = {
  props: ChartTooltip.props,
  name: ChartTooltip.name,
  data() {
    return chartTooltipStubData;
  },
  template: `
     <div>
       <slot name="title" v-bind="{ title, params }" />
       <slot v-bind="{ content, params }">
         <slot name="tooltip-value" :value="params.seriesData[0].value[1]"></slot>
       </slot>
     </div>`,
};
