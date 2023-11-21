import {
  WHITE,
  GRAY_50,
  GRAY_100,
  GRAY_200,
  GRAY_300,
  GRAY_500,
  GRAY_600,
  GRAY_900,
  RED_500,
  DATA_VIZ_AQUA_50,
  DATA_VIZ_AQUA_100,
  DATA_VIZ_AQUA_200,
  DATA_VIZ_AQUA_300,
  DATA_VIZ_AQUA_400,
  DATA_VIZ_AQUA_500,
  DATA_VIZ_AQUA_600,
  DATA_VIZ_AQUA_700,
  DATA_VIZ_AQUA_800,
  DATA_VIZ_AQUA_900,
  DATA_VIZ_AQUA_950,
  DATA_VIZ_BLUE_50,
  DATA_VIZ_BLUE_100,
  DATA_VIZ_BLUE_200,
  DATA_VIZ_BLUE_300,
  DATA_VIZ_BLUE_400,
  DATA_VIZ_BLUE_500,
  DATA_VIZ_BLUE_600,
  DATA_VIZ_BLUE_700,
  DATA_VIZ_BLUE_800,
  DATA_VIZ_BLUE_900,
  DATA_VIZ_BLUE_950,
  DATA_VIZ_GREEN_50,
  DATA_VIZ_GREEN_100,
  DATA_VIZ_GREEN_200,
  DATA_VIZ_GREEN_300,
  DATA_VIZ_GREEN_400,
  DATA_VIZ_GREEN_500,
  DATA_VIZ_GREEN_600,
  DATA_VIZ_GREEN_700,
  DATA_VIZ_GREEN_800,
  DATA_VIZ_GREEN_900,
  DATA_VIZ_GREEN_950,
  DATA_VIZ_MAGENTA_50,
  DATA_VIZ_MAGENTA_100,
  DATA_VIZ_MAGENTA_200,
  DATA_VIZ_MAGENTA_300,
  DATA_VIZ_MAGENTA_400,
  DATA_VIZ_MAGENTA_500,
  DATA_VIZ_MAGENTA_600,
  DATA_VIZ_MAGENTA_700,
  DATA_VIZ_MAGENTA_800,
  DATA_VIZ_MAGENTA_900,
  DATA_VIZ_MAGENTA_950,
  DATA_VIZ_ORANGE_50,
  DATA_VIZ_ORANGE_100,
  DATA_VIZ_ORANGE_200,
  DATA_VIZ_ORANGE_300,
  DATA_VIZ_ORANGE_400,
  DATA_VIZ_ORANGE_500,
  DATA_VIZ_ORANGE_600,
  DATA_VIZ_ORANGE_700,
  DATA_VIZ_ORANGE_800,
  DATA_VIZ_ORANGE_950,
  DATA_VIZ_ORANGE_900,
} from '../../../dist/tokens/js/tokens';
import { scrollHandleSvgPath } from '../svgs/svg_paths';
import { hexToRgba } from '../utils';

const GL_BORDER_RADIUS_BASE = '0.25rem';

export const themeName = 'gitlab';

export const heatmapHues = [
  GRAY_100,
  DATA_VIZ_BLUE_200,
  DATA_VIZ_BLUE_400,
  DATA_VIZ_BLUE_600,
  DATA_VIZ_BLUE_800,
];

export const gaugeNeutralHues = [GRAY_900, GRAY_500];
export const gaugeSafeHues = [DATA_VIZ_BLUE_500, DATA_VIZ_BLUE_900];
export const gaugeWarningHue = DATA_VIZ_ORANGE_500;

/**
 * The default palette is based on the Categorical data palette
 * Categorical data (also known as qualitative or thematic) uses hue to
 * differentiate qualitative data, and lightness to differentiate quantitive data.
 * More info: https://design.gitlab.com/data-visualization/color#categorical-data
 */
export const colorPaletteDefault = [
  DATA_VIZ_BLUE_500,
  DATA_VIZ_ORANGE_600,
  DATA_VIZ_AQUA_500,
  DATA_VIZ_GREEN_600,
  DATA_VIZ_MAGENTA_500,
  DATA_VIZ_BLUE_700,
  DATA_VIZ_ORANGE_800,
  DATA_VIZ_AQUA_700,
  DATA_VIZ_GREEN_800,
  DATA_VIZ_MAGENTA_700,
  DATA_VIZ_BLUE_900,
  DATA_VIZ_ORANGE_950,
  DATA_VIZ_AQUA_900,
  DATA_VIZ_GREEN_950,
  DATA_VIZ_MAGENTA_900,
  DATA_VIZ_BLUE_600,
  DATA_VIZ_ORANGE_700,
  DATA_VIZ_AQUA_600,
  DATA_VIZ_GREEN_700,
  DATA_VIZ_MAGENTA_600,
  DATA_VIZ_BLUE_800,
  DATA_VIZ_ORANGE_900,
  DATA_VIZ_AQUA_800,
  DATA_VIZ_GREEN_900,
  DATA_VIZ_MAGENTA_800,
  DATA_VIZ_BLUE_950,
  DATA_VIZ_ORANGE_500,
  DATA_VIZ_AQUA_950,
  DATA_VIZ_GREEN_500,
  DATA_VIZ_MAGENTA_950,
];
export const colorFromDefaultPalette = (index) =>
  colorPaletteDefault[index % colorPaletteDefault.length];

export const colorPaletteDark = [
  DATA_VIZ_BLUE_500,
  DATA_VIZ_ORANGE_400,
  DATA_VIZ_AQUA_500,
  DATA_VIZ_GREEN_400,
  DATA_VIZ_MAGENTA_500,
  DATA_VIZ_BLUE_300,
  DATA_VIZ_ORANGE_200,
  DATA_VIZ_AQUA_300,
  DATA_VIZ_GREEN_200,
  DATA_VIZ_MAGENTA_300,
  DATA_VIZ_BLUE_100,
  DATA_VIZ_ORANGE_50,
  DATA_VIZ_AQUA_100,
  DATA_VIZ_GREEN_50,
  DATA_VIZ_MAGENTA_100,
  DATA_VIZ_BLUE_400,
  DATA_VIZ_ORANGE_300,
  DATA_VIZ_AQUA_400,
  DATA_VIZ_GREEN_300,
  DATA_VIZ_MAGENTA_400,
  DATA_VIZ_BLUE_200,
  DATA_VIZ_ORANGE_100,
  DATA_VIZ_AQUA_200,
  DATA_VIZ_GREEN_100,
  DATA_VIZ_MAGENTA_200,
  DATA_VIZ_BLUE_50,
  DATA_VIZ_ORANGE_500,
  DATA_VIZ_AQUA_50,
  DATA_VIZ_GREEN_500,
  DATA_VIZ_MAGENTA_50,
];

export const colorFromDarkPalette = (index) => colorPaletteDark[index % colorPaletteDark.length];

const axes = {
  axisLabel: {
    margin: 8,
    show: true,
    color: `var(--gray-600, ${GRAY_600})`,
    hideOverlap: true,
  },
  axisLine: {
    show: false,
  },
  axisPointer: {
    lineStyle: {
      type: 'solid',
      color: GRAY_600,
    },
    label: {
      show: false,
    },
  },
  axisTick: {
    show: true,
    alignWithLabel: true,
    lineStyle: {
      color: GRAY_200,
    },
  },
  nameGap: 30,
  nameTextStyle: {
    fontWeight: 'bold',
  },
  splitLine: {
    lineStyle: {
      color: [GRAY_200],
    },
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: [hexToRgba(GRAY_50, 0.3), hexToRgba(GRAY_300, 0.3)],
    },
  },
};

const isLineChartWithoutArea = (options) =>
  Array.isArray(options?.series) &&
  options.series.some((series) => series.type === 'line' && !series.areaStyle);

export const createTheme = (options = {}) => ({
  color: colorPaletteDefault,
  backgroundColor: 'transparent',
  textStyle: {
    color: `var(--gl-text-color, ${GRAY_900})`,
  },
  markLine: {
    silent: true,
    symbol: 'none',
    label: {
      show: false,
    },
    lineStyle: {
      color: RED_500,
      width: 1,
      type: 'dashed',
    },
  },
  markArea: {
    silent: true,
    itemStyle: {
      color: hexToRgba(RED_500, 0.1),
    },
  },
  dataZoom: {
    borderColor: 'transparent',
    filterMode: 'none',
    brushSelect: false,
    dataBackground: {
      lineStyle: {
        width: 2,
        color: GRAY_200,
        opacity: 1,
      },
      // render unfilled zoom-graph if the series is a line chart without area styles
      // more details: https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/2364#note_666637306
      areaStyle: isLineChartWithoutArea(options)
        ? {} // Use empty object instead of null, see https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/2185#note_707711029 for more context
        : {
            color: GRAY_50,
            opacity: 1,
          },
    },
    fillerColor: hexToRgba(GRAY_200, 0.23),
    handleIcon: scrollHandleSvgPath,
    handleStyle: {
      borderColor: 'transparent',
      color: GRAY_500,
    },
    handleSize: '50%',
    labelFormatter: () => null,
    textStyle: {
      color: GRAY_600,
    },
  },
  toolbox: {
    top: '-5',
    left: 'center',
    itemSize: 14,
    emphasis: {
      iconStyle: {
        borderWidth: 0,
        color: GRAY_900,
        textBackgroundColor: WHITE,
        textBorderRadius: GL_BORDER_RADIUS_BASE,
        textPadding: [8, 12],
      },
    },
    iconStyle: {
      color: GRAY_500,
      borderWidth: 0,
    },
    itemGap: 8,
    feature: {
      dataZoom: {
        title: {
          zoom: 'Click to zoom in on a portion of the graph',
          back: 'Remove selection',
        },
      },
      restore: {
        title: 'Remove all selections and return chart to default state',
      },
      saveAsImage: {
        title: 'Save chart as an image',
        name: 'graph',
      },
    },
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: GRAY_50,
        },
      },
      emphasis: {
        textStyle: {
          color: GRAY_50,
        },
      },
    },
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: 1,
      },
    },
    lineStyle: {
      normal: {
        width: 2,
      },
    },
    symbolSize: '6',
    symbol: 'circle',
    showSymbol: false,
    smooth: false,
  },
  categoryAxis: axes,
  valueAxis: axes,
  logAxis: axes,
  timeAxis: axes,
});
