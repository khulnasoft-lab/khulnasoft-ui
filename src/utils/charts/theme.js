import {
  GL_COLOR_NEUTRAL_50,
  GL_COLOR_NEUTRAL_100,
  GL_COLOR_NEUTRAL_500,
  GL_COLOR_NEUTRAL_900,
  GL_COLOR_DATA_AQUA_50,
  GL_COLOR_DATA_AQUA_100,
  GL_COLOR_DATA_AQUA_200,
  GL_COLOR_DATA_AQUA_300,
  GL_COLOR_DATA_AQUA_400,
  GL_COLOR_DATA_AQUA_500,
  GL_COLOR_DATA_AQUA_600,
  GL_COLOR_DATA_AQUA_700,
  GL_COLOR_DATA_AQUA_800,
  GL_COLOR_DATA_AQUA_900,
  GL_COLOR_DATA_AQUA_950,
  GL_COLOR_DATA_BLUE_50,
  GL_COLOR_DATA_BLUE_100,
  GL_COLOR_DATA_BLUE_200,
  GL_COLOR_DATA_BLUE_300,
  GL_COLOR_DATA_BLUE_400,
  GL_COLOR_DATA_BLUE_500,
  GL_COLOR_DATA_BLUE_600,
  GL_COLOR_DATA_BLUE_700,
  GL_COLOR_DATA_BLUE_800,
  GL_COLOR_DATA_BLUE_900,
  GL_COLOR_DATA_BLUE_950,
  GL_COLOR_DATA_GREEN_50,
  GL_COLOR_DATA_GREEN_100,
  GL_COLOR_DATA_GREEN_200,
  GL_COLOR_DATA_GREEN_300,
  GL_COLOR_DATA_GREEN_400,
  GL_COLOR_DATA_GREEN_500,
  GL_COLOR_DATA_GREEN_600,
  GL_COLOR_DATA_GREEN_700,
  GL_COLOR_DATA_GREEN_800,
  GL_COLOR_DATA_GREEN_900,
  GL_COLOR_DATA_GREEN_950,
  GL_COLOR_DATA_MAGENTA_50,
  GL_COLOR_DATA_MAGENTA_100,
  GL_COLOR_DATA_MAGENTA_200,
  GL_COLOR_DATA_MAGENTA_300,
  GL_COLOR_DATA_MAGENTA_400,
  GL_COLOR_DATA_MAGENTA_500,
  GL_COLOR_DATA_MAGENTA_600,
  GL_COLOR_DATA_MAGENTA_700,
  GL_COLOR_DATA_MAGENTA_800,
  GL_COLOR_DATA_MAGENTA_900,
  GL_COLOR_DATA_MAGENTA_950,
  GL_COLOR_DATA_ORANGE_50,
  GL_COLOR_DATA_ORANGE_100,
  GL_COLOR_DATA_ORANGE_200,
  GL_COLOR_DATA_ORANGE_300,
  GL_COLOR_DATA_ORANGE_400,
  GL_COLOR_DATA_ORANGE_500,
  GL_COLOR_DATA_ORANGE_600,
  GL_COLOR_DATA_ORANGE_700,
  GL_COLOR_DATA_ORANGE_800,
  GL_COLOR_DATA_ORANGE_950,
  GL_COLOR_DATA_ORANGE_900,
} from '../../tokens/build/js/tokens';
import {
  scrollHandleSvgPath,
  marqueeSelectionSvgPath,
  redoSvgPath,
  clearAllSvgPath,
  downloadSvgPath,
} from '../svgs/svg_paths';

const GL_BORDER_RADIUS_BASE = '0.25rem';

export const themeName = 'gitlab';

export const heatmapHues = [
  GL_COLOR_NEUTRAL_100,
  GL_COLOR_DATA_BLUE_200,
  GL_COLOR_DATA_BLUE_400,
  GL_COLOR_DATA_BLUE_600,
  GL_COLOR_DATA_BLUE_800,
];

export const gaugeNeutralHues = [GL_COLOR_NEUTRAL_900, GL_COLOR_NEUTRAL_500];
export const gaugeSafeHues = [GL_COLOR_DATA_BLUE_500, GL_COLOR_DATA_BLUE_900];
export const gaugeWarningHue = GL_COLOR_DATA_ORANGE_500;

/**
 * The default palette is based on the Categorical data palette
 * Categorical data (also known as qualitative or thematic) uses hue to
 * differentiate qualitative data, and lightness to differentiate quantitive data.
 * More info: https://design.khulnasoft.com/data-visualization/color#categorical-data
 */
export const colorPaletteDefault = [
  GL_COLOR_DATA_BLUE_500,
  GL_COLOR_DATA_ORANGE_600,
  GL_COLOR_DATA_AQUA_500,
  GL_COLOR_DATA_GREEN_600,
  GL_COLOR_DATA_MAGENTA_500,
  GL_COLOR_DATA_BLUE_700,
  GL_COLOR_DATA_ORANGE_800,
  GL_COLOR_DATA_AQUA_700,
  GL_COLOR_DATA_GREEN_800,
  GL_COLOR_DATA_MAGENTA_700,
  GL_COLOR_DATA_BLUE_900,
  GL_COLOR_DATA_ORANGE_950,
  GL_COLOR_DATA_AQUA_900,
  GL_COLOR_DATA_GREEN_950,
  GL_COLOR_DATA_MAGENTA_900,
  GL_COLOR_DATA_BLUE_600,
  GL_COLOR_DATA_ORANGE_700,
  GL_COLOR_DATA_AQUA_600,
  GL_COLOR_DATA_GREEN_700,
  GL_COLOR_DATA_MAGENTA_600,
  GL_COLOR_DATA_BLUE_800,
  GL_COLOR_DATA_ORANGE_900,
  GL_COLOR_DATA_AQUA_800,
  GL_COLOR_DATA_GREEN_900,
  GL_COLOR_DATA_MAGENTA_800,
  GL_COLOR_DATA_BLUE_950,
  GL_COLOR_DATA_ORANGE_500,
  GL_COLOR_DATA_AQUA_950,
  GL_COLOR_DATA_GREEN_500,
  GL_COLOR_DATA_MAGENTA_950,
];
export const colorFromDefaultPalette = (index) =>
  colorPaletteDefault[index % colorPaletteDefault.length];

export const colorPaletteDark = [
  GL_COLOR_DATA_BLUE_500,
  GL_COLOR_DATA_ORANGE_400,
  GL_COLOR_DATA_AQUA_500,
  GL_COLOR_DATA_GREEN_400,
  GL_COLOR_DATA_MAGENTA_500,
  GL_COLOR_DATA_BLUE_300,
  GL_COLOR_DATA_ORANGE_200,
  GL_COLOR_DATA_AQUA_300,
  GL_COLOR_DATA_GREEN_200,
  GL_COLOR_DATA_MAGENTA_300,
  GL_COLOR_DATA_BLUE_100,
  GL_COLOR_DATA_ORANGE_50,
  GL_COLOR_DATA_AQUA_100,
  GL_COLOR_DATA_GREEN_50,
  GL_COLOR_DATA_MAGENTA_100,
  GL_COLOR_DATA_BLUE_400,
  GL_COLOR_DATA_ORANGE_300,
  GL_COLOR_DATA_AQUA_400,
  GL_COLOR_DATA_GREEN_300,
  GL_COLOR_DATA_MAGENTA_400,
  GL_COLOR_DATA_BLUE_200,
  GL_COLOR_DATA_ORANGE_100,
  GL_COLOR_DATA_AQUA_200,
  GL_COLOR_DATA_GREEN_100,
  GL_COLOR_DATA_MAGENTA_200,
  GL_COLOR_DATA_BLUE_50,
  GL_COLOR_DATA_ORANGE_500,
  GL_COLOR_DATA_AQUA_50,
  GL_COLOR_DATA_GREEN_500,
  GL_COLOR_DATA_MAGENTA_50,
];

export const colorFromDarkPalette = (index) => colorPaletteDark[index % colorPaletteDark.length];

const axes = {
  axisLabel: {
    margin: 8,
    show: true,
    color: 'var(--gl-chart-axis-text-color)',
    hideOverlap: true,
  },
  axisLine: {
    show: false,
  },
  axisPointer: {
    lineStyle: {
      type: 'solid',
      color: 'var(--gl-chart-axis-pointer-color)',
    },
    label: {
      show: false,
    },
  },
  axisTick: {
    show: true,
    alignWithLabel: true,
    lineStyle: {
      color: 'var(--gl-chart-axis-line-color)',
    },
  },
  nameGap: 30,
  nameTextStyle: {
    fontWeight: 'bold',
  },
  splitLine: {
    lineStyle: {
      color: ['var(--gl-chart-axis-line-color)'],
    },
  },
  splitArea: {
    show: false,
  },
};

const isLineChartWithoutArea = (options) =>
  Array.isArray(options?.series) &&
  options.series.some((series) => series.type === 'line' && !series.areaStyle);

export const createTheme = (options = {}) => ({
  color: colorPaletteDefault,
  backgroundColor: 'transparent',
  textStyle: {
    color: 'var(--gl-text-color-default)',
  },
  markLine: {
    silent: true,
    symbol: 'none',
    label: {
      show: false,
    },
    lineStyle: {
      color: 'var(--gl-chart-threshold-line-color)',
      width: 1,
      type: 'dashed',
    },
  },
  markArea: {
    silent: true,
    itemStyle: {
      color: 'var(--gl-chart-threshold-area-color)',
    },
  },
  dataZoom: {
    borderColor: 'transparent',
    filterMode: 'none',
    brushSelect: false,
    dataBackground: {
      lineStyle: {
        width: 2,
        color: 'var(--gl-chart-axis-line-color)',
        opacity: 1,
      },
      // render unfilled zoom-graph if the series is a line chart without area styles
      // more details: https://gitlab.com/khulnasoft-org/khulnasoft-ui/-/merge_requests/2364#note_666637306
      areaStyle: isLineChartWithoutArea(options)
        ? {} // Use empty object instead of null, see https://gitlab.com/khulnasoft-org/khulnasoft-ui/-/merge_requests/2185#note_707711029 for more context
        : {
            color: 'var(--gl-background-color-strong)',
            opacity: 1,
          },
    },
    fillerColor: 'var(--gl-chart-zoom-filler-color)',
    handleIcon: scrollHandleSvgPath,
    emphasis: {
      handleStyle: {
        color: 'var(--gl-chart-zoom-handle-color)',
      },
    },
    handleStyle: {
      borderColor: 'transparent',
      color: 'var(--gl-chart-zoom-handle-color)',
    },
    handleSize: '50%',
    labelFormatter: () => null,
    textStyle: {
      color: 'var(--gl-chart-axis-text-color)',
    },
  },
  toolbox: {
    top: '-5',
    left: 'center',
    itemSize: 14,
    emphasis: {
      iconStyle: {
        borderWidth: 0,
        color: 'var(--gl-icon-color-default)',
        textFill: 'var(--gl-feedback-strong-text-color)',
        textBackgroundColor: 'var(--gl-feedback-strong-background-color)',
        textBorderRadius: GL_BORDER_RADIUS_BASE,
        textPadding: [8, 12],
      },
    },
    iconStyle: {
      color: 'var(--gl-icon-color-default)',
      borderWidth: 0,
    },
    itemGap: 8,
    feature: {
      dataZoom: {
        title: {
          zoom: 'Click to zoom in on a portion of the graph',
          back: 'Remove selection',
        },
        icon: {
          zoom: marqueeSelectionSvgPath,
          back: redoSvgPath,
        },
      },
      restore: {
        title: 'Remove all selections and return chart to default state',
        icon: clearAllSvgPath,
      },
      saveAsImage: {
        title: 'Save chart as an image',
        name: 'graph',
        icon: downloadSvgPath,
      },
    },
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: GL_COLOR_NEUTRAL_50,
        },
      },
      emphasis: {
        textStyle: {
          color: GL_COLOR_NEUTRAL_50,
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
