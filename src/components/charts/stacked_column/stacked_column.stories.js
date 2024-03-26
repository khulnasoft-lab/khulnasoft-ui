import { GlStackedColumnChart } from '../../../charts';
import {
  mockDefaultStackedLineData,
  mockDefaultStackedBarData,
  mockSecondaryData,
} from '../../../utils/charts/mock_data';
import { toolbox } from '../../../utils/charts/story_config';
import { columnOptions } from '../../../utils/constants';
import {
  DATA_VIZ_ORANGE_600,
  DATA_VIZ_AQUA_500,
  DATA_VIZ_GREEN_600,
  DATA_VIZ_MAGENTA_500,
} from '../../../../dist/tokens/js/tokens';
import readme from './stacked_column.md';

const template = `
  <gl-stacked-column-chart
    :bars="bars"
    :lines="lines"
    :option="option"
    :presentation="presentation"
    :group-by="groupBy"
    :x-axis-type="xAxisType"
    :x-axis-title="xAxisTitle"
    :y-axis-title="yAxisTitle"
    :secondary-data="secondaryData"
    :secondary-data-title="secondaryDataTitle"
    :height="height"
    :custom-palette="customPalette"
  />
`;

const mockSecondaryDataTitle = 'Merges';

const generateProps = ({
  bars = mockDefaultStackedBarData,
  lines = [],
  option = {},
  groupBy = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  xAxisType = 'category',
  xAxisTitle = 'January - December 2018',
  yAxisTitle = 'Commits',
  presentation = columnOptions.stacked,
  secondaryData = [],
  secondaryDataTitle = '',
  height = null,
  customPalette,
} = {}) => ({
  bars,
  lines,
  option,
  presentation,
  groupBy,
  xAxisType,
  xAxisTitle,
  yAxisTitle,
  secondaryDataTitle,
  secondaryData,
  height,
  customPalette,
});

const Template = (args, { argTypes }) => ({
  components: { GlStackedColumnChart },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const Tiled = Template.bind({});
Tiled.args = generateProps({ presentation: columnOptions.tiled });

export const StackedWithLineData = Template.bind({});
StackedWithLineData.args = generateProps({ lines: mockDefaultStackedLineData });

export const TiledWithLineData = Template.bind({});
TiledWithLineData.args = generateProps({
  presentation: columnOptions.tiled,
  lines: mockDefaultStackedLineData,
});

export const WithZoomAndScroll = Template.bind({});
WithZoomAndScroll.args = generateProps({
  option: {
    dataZoom: [
      {
        startValue: 1,
      },
    ],
  },
});

export const WithToolbox = Template.bind({});
WithToolbox.args = generateProps({
  option: {
    toolbox,
  },
});

export const SecondaryYAxis = Template.bind({});
SecondaryYAxis.args = generateProps({
  secondaryData: mockSecondaryData,
  secondaryDataTitle: mockSecondaryDataTitle,
});

export const SecondaryYAxisLine = Template.bind({});
SecondaryYAxisLine.args = generateProps({
  secondaryData: [{ ...mockSecondaryData[0], type: 'line' }],
  secondaryDataTitle: mockSecondaryDataTitle,
});

export const WithCustomColorPalette = Template.bind({});
WithCustomColorPalette.args = generateProps({
  customPalette: [DATA_VIZ_ORANGE_600, DATA_VIZ_AQUA_500, DATA_VIZ_GREEN_600, DATA_VIZ_MAGENTA_500],
});

export default {
  title: 'charts/stacked-column-chart',
  component: GlStackedColumnChart,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
