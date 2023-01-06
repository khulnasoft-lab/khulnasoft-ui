import { GlSparklineChart } from '../../../charts';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import readme from './sparkline.md';

const chartData = [
  ['Mon', 10],
  ['Tue', 15],
  ['Wed', 9],
  ['Thu', 22],
  ['Fri', 29],
  ['Sat', 20],
  ['Sun', 18],
];

const customGradient = [
  colorFromDefaultPalette(0),
  colorFromDefaultPalette(1),
  colorFromDefaultPalette(2),
];

const generateProps = ({
  data = chartData,
  height = 50,
  tooltipLabel = 'tooltipLabel',
  showLastYValue = true,
  gradient,
  smooth,
} = {}) => ({
  data,
  height,
  tooltipLabel,
  showLastYValue,
  gradient,
  smooth,
});

const Template = (args) => ({
  components: { GlSparklineChart },
  props: Object.keys(args),
  template: `
    <div>
      <gl-sparkline-chart
        :data="data"
        :height="height"
        :tooltip-label="tooltipLabel"
        :show-last-y-value="showLastYValue"
        :gradient="gradient"
        :smooth="smooth"
      />
    </div>`,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithoutLastYValue = Template.bind({});
WithoutLastYValue.args = generateProps({ showLastYValue: false });

export const WithChartColorGradient = Template.bind({});
WithChartColorGradient.args = generateProps({ gradient: customGradient });

export const WithSmoothing = Template.bind({});
WithSmoothing.args = generateProps({ smooth: 0.5 });

export default {
  title: 'charts/sparkline-chart',
  component: GlSparklineChart,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
