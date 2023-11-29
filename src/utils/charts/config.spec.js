import merge from 'lodash/merge';
import { GlBreakpointInstance } from '../breakpoints';
import { columnOptions } from '../constants';
import { hexToRgba } from '../utils';
import {
  getDataZoomConfig,
  getThresholdConfig,
  mergeSeriesToOptions,
  parseAnnotations,
  generateBarSeries,
  generateLineSeries,
  getTooltipTitle,
  getTooltipContent,
} from './config';
import {
  mockDefaultDataZoomConfig,
  mockDefaultChartOptions,
  mockDefaultStackedBarData,
  mockDefaultLineData,
} from './mock_data';
import { colorFromDefaultPalette } from './theme';

describe('chart config helpers', () => {
  describe('getThresholdConfig', () => {
    const makeThreshold = (threshold, operator) => [
      {
        threshold,
        operator,
      },
    ];

    it('returns empty object for no thresholds', () => {
      expect(getThresholdConfig([])).toEqual({});
    });

    it('draws area below line for < threshold', () => {
      const threshold = 3;
      const thresholds = makeThreshold(threshold, '<');
      const expectedLineData = [{ yAxis: threshold }];
      const expectedAreaData = [[{ yAxis: Number.NEGATIVE_INFINITY }, { yAxis: threshold }]];

      const { markLine, markArea } = getThresholdConfig(thresholds);

      expect(markLine.data).toEqual(expectedLineData);
      expect(markArea.data).toEqual(expectedAreaData);
    });

    it('draws line only for = threshold', () => {
      const threshold = 7;
      const thresholds = makeThreshold(threshold, '=');
      const expectedLineData = [{ yAxis: threshold }];
      const expectedAreaData = [];

      const { markLine, markArea } = getThresholdConfig(thresholds);

      expect(markLine.data).toEqual(expectedLineData);
      expect(markArea.data).toEqual(expectedAreaData);
    });

    it('draws area above line for > threshold', () => {
      const threshold = 9000;
      const thresholds = makeThreshold(threshold, '>');
      const expectedLineData = [{ yAxis: threshold }];
      const expectedAreaData = [[{ yAxis: threshold }, { yAxis: Infinity }]];

      const { markLine, markArea } = getThresholdConfig(thresholds);

      expect(markLine.data).toEqual(expectedLineData);
      expect(markArea.data).toEqual(expectedAreaData);
    });
  });

  describe('parseAnnotations', () => {
    const makeAnnotation = ({ min, max }) => [
      {
        min,
        max,
      },
    ];

    it('returns empty object for no annotations', () => {
      expect(parseAnnotations([])).toEqual({
        areas: [],
        lines: [],
        points: [],
      });
    });

    it('draws an annotation range between two fixed points', () => {
      const annotation = makeAnnotation({
        min: 10,
        max: 40,
      });
      const expectedLineData = [];
      const expectedAreaData = [[{ xAxis: 10 }, { xAxis: 40 }]];

      const { lines, areas } = parseAnnotations(annotation);

      expect(lines).toEqual(expectedLineData);
      expect(areas).toEqual(expectedAreaData);
    });

    it('draws an annotation range with infinity upper bound', () => {
      const annotation = makeAnnotation({
        min: 10,
        max: Infinity,
      });
      const expectedLineData = [];
      const expectedAreaData = [[{ xAxis: 10 }, { xAxis: Infinity }]];

      const { lines, areas } = parseAnnotations(annotation);

      expect(lines).toEqual(expectedLineData);
      expect(areas).toEqual(expectedAreaData);
    });

    it('draws an annotation range with infinity lower bound', () => {
      const annotation = makeAnnotation({
        min: Number.NEGATIVE_INFINITY,
        max: 10,
      });
      const expectedLineData = [];
      const expectedAreaData = [[{ xAxis: -Infinity }, { xAxis: 10 }]];

      const { lines, areas } = parseAnnotations(annotation);

      expect(lines).toEqual(expectedLineData);
      expect(areas).toEqual(expectedAreaData);
    });

    it('draws an annotation range without upper bound', () => {
      const annotation = makeAnnotation({
        min: 10,
      });
      const expectedLineData = [];
      const expectedAreaData = [[{ xAxis: 10 }, { xAxis: undefined }]];

      const { lines, areas } = parseAnnotations(annotation);

      expect(lines).toEqual(expectedLineData);
      expect(areas).toEqual(expectedAreaData);
    });

    it('draws an annotation range without lower bound', () => {
      const annotation = makeAnnotation({
        max: 10,
      });
      const expectedLineData = [];
      const expectedAreaData = [[{ xAxis: undefined }, { xAxis: 10 }]];

      const { lines, areas } = parseAnnotations(annotation);

      expect(lines).toEqual(expectedLineData);
      expect(areas).toEqual(expectedAreaData);
    });

    it('draws an annotation line', () => {
      const annotation = makeAnnotation({
        min: 10,
        max: 10,
      });
      const expectedLineData = [{ xAxis: 10 }];
      const expectedAreaData = [];

      const { lines, areas } = parseAnnotations(annotation);

      expect(lines).toEqual(expectedLineData);
      expect(areas).toEqual(expectedAreaData);
    });

    it('draws multiple annotation lines', () => {
      const annotation1 = makeAnnotation({
        min: 10,
        max: 10,
      });
      const annotation2 = makeAnnotation({
        min: 30,
        max: 30,
      });
      const expectedLineData = [{ xAxis: 10 }, { xAxis: 30 }];
      const expectedAreaData = [];

      const { lines, areas } = parseAnnotations([...annotation1, ...annotation2]);

      expect(lines).toEqual(expectedLineData);
      expect(areas).toEqual(expectedAreaData);
    });
  });

  describe('getDataZoomConfig', () => {
    describe('on large viewports (lg, xl)', () => {
      it('creates a basic dataZoomConfig with inside scrolling being disabled', () => {
        const actual = getDataZoomConfig();
        const expected = mockDefaultDataZoomConfig;

        expect(actual).toEqual(expected);
      });
    });

    describe('on small viewports', () => {
      it('creates a basic dataZoomConfig with inside scrolling being enabled', () => {
        jest.spyOn(GlBreakpointInstance, 'getBreakpointSize').mockImplementationOnce(() => 'sm');
        const actual = getDataZoomConfig();
        const dataZoomWithInsideEnabled = [
          {
            bottom: 22,
            filterMode: 'none',
            minSpan: 0.01,
            type: 'slider',
          },
          {
            type: 'inside',
            filterMode: 'none',
            minSpan: 0.01,
            disabled: false,
          },
        ];
        const expected = merge(mockDefaultDataZoomConfig, {
          dataZoom: dataZoomWithInsideEnabled,
        });

        expect(actual).toEqual(expected);
      });
    });

    it('allows the filterMode to be set', () => {
      const actual = getDataZoomConfig({ filterMode: 'filter' });
      // After https://gitlab.com/gitlab-org/gitlab-ui/issues/240
      // all default dataZoom configs will have slider & inside.
      // inside is specifically to enable touch zoom for mobile devices
      const dataZoomWithFilter = [
        {
          type: 'slider',
          filterMode: 'filter',
          minSpan: null,
        },
        {
          type: 'inside',
          filterMode: 'filter',
          minSpan: null,
          disabled: true,
        },
      ];
      const expected = merge(mockDefaultDataZoomConfig, {
        dataZoom: dataZoomWithFilter,
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('mergeSeriesToOptions', () => {
    const series = {
      areaStyle: {
        opacity: 0.2,
        color: '#1f78d1',
      },
      showSymbol: false,
      lineStyle: {
        color: '#1f78d1',
      },
      itemStyle: {
        color: '#1f78d1',
      },
      symbol: 'circle',
      type: 'line',
      width: 2,
      name: 'Values',
      data: [
        [0, 5],
        [4, 3],
        [8, 10],
      ],
    };

    it('create chart options with invalid series props', () => {
      const chartOptionsOutput = {
        ...mockDefaultChartOptions,
        series: [],
      };
      expect(mergeSeriesToOptions(mockDefaultChartOptions)).toEqual(chartOptionsOutput);
      expect(mergeSeriesToOptions(mockDefaultChartOptions, [])).toEqual(chartOptionsOutput);
    });

    it('creates chart options with single series object passed as data prop', () => {
      // data for chart can also be passed as a data prop which is transformed to series
      const chartOptions = mergeSeriesToOptions({
        ...mockDefaultChartOptions,
        series,
      });

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(1);
    });

    it('creates chart options with single series array passed as data prop', () => {
      const chartOptions = mergeSeriesToOptions({
        ...mockDefaultChartOptions,
        series: [series],
      });

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(1);
    });

    it('creates chart options with multiple series array passed as data prop', () => {
      const chartOptions = mergeSeriesToOptions({
        ...mockDefaultChartOptions,
        series: [series, series],
      });

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(2);
    });

    it('creates chart options with single series object passed as series prop', () => {
      const chartOptions = mergeSeriesToOptions(mockDefaultChartOptions, series);

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(1);
    });

    it('creates chart options with single series array passed as series prop', () => {
      const chartOptions = mergeSeriesToOptions(mockDefaultChartOptions, [series]);

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(1);
    });

    it('creates chart options with multiple series array passed as series prop', () => {
      const chartOptions = mergeSeriesToOptions(mockDefaultChartOptions, [series, series]);

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(2);
    });
  });

  describe('generateBarSeries', () => {
    const defaultBarColors = {
      itemStyle: { color: hexToRgba(colorFromDefaultPalette(1), 0.2) },
      emphasis: { itemStyle: { color: hexToRgba(colorFromDefaultPalette(1), 0.4) } },
    };
    const barDefaultParams = {
      name: 'Bar chart',
      color: colorFromDefaultPalette(0),
      stack: columnOptions.stacked,
    };

    it.each`
      param           | value                         | result
      ${'name'}       | ${'Cool new bar chart'}       | ${{ name: 'Cool new bar chart' }}
      ${'color'}      | ${colorFromDefaultPalette(1)} | ${defaultBarColors}
      ${'data'}       | ${mockDefaultStackedBarData}  | ${{ data: mockDefaultStackedBarData }}
      ${'stack'}      | ${columnOptions.tiled}        | ${{ stack: columnOptions.tiled }}
      ${'yAxisIndex'} | ${3}                          | ${{ yAxisIndex: 3 }}
    `('with $param set will contain $result', ({ param, value, result }) => {
      expect(
        generateBarSeries({
          ...barDefaultParams,
          [param]: value,
        })
      ).toMatchObject(result);
    });
  });
  describe('generateLineSeries', () => {
    const defaultLineColors = {
      itemStyle: { color: colorFromDefaultPalette(1) },
      lineStyle: { color: colorFromDefaultPalette(1) },
    };
    const lineDefaultParams = { name: 'Line chart', color: colorFromDefaultPalette(0) };

    it.each`
      param           | value                         | result
      ${'name'}       | ${'Cool new line chart'}      | ${{ name: 'Cool new line chart' }}
      ${'color'}      | ${colorFromDefaultPalette(1)} | ${defaultLineColors}
      ${'data'}       | ${mockDefaultLineData}        | ${{ data: mockDefaultLineData }}
      ${'yAxisIndex'} | ${2}                          | ${{ yAxisIndex: 2 }}
    `('with $param set will contain $result', ({ param, value, result }) => {
      expect(
        generateLineSeries({
          ...lineDefaultParams,
          [param]: value,
        })
      ).toMatchObject(result);
    });
  });

  describe('getTooltipTitle', () => {
    it('returns an empty value', () => {
      expect(getTooltipTitle()).toBe('');
    });

    it('returns title for single series', () => {
      expect(
        getTooltipTitle({
          seriesData: [{ value: ['Value 1', 99] }],
        })
      ).toBe('Value 1');
    });

    it('returns title for multiple series', () => {
      expect(
        getTooltipTitle({
          seriesData: [{ value: ['Value 1', 99] }, { value: ['Value 2', 100] }],
        })
      ).toBe('Value 1, Value 2');
    });

    it('returns title for multiple repeated series', () => {
      expect(
        getTooltipTitle({
          seriesData: [{ value: ['Value 1', 99] }, { value: ['Value 1', 99] }],
        })
      ).toBe('Value 1');
    });

    it('returns title for multiple series with an axis name', () => {
      expect(
        getTooltipTitle(
          {
            seriesData: [{ value: ['Value 1', 99] }, { value: ['Value 2', 100] }],
          },
          'Time'
        )
      ).toBe('Value 1, Value 2 (Time)');
    });
  });

  describe('getTooltipContent', () => {
    it('returns an empty value', () => {
      expect(getTooltipContent()).toEqual({});
    });

    it('returns content for single series', () => {
      expect(
        getTooltipContent({
          seriesData: [{ value: ['Value 1', 99], seriesName: 'Series 1', color: '#aaa' }],
        })
      ).toEqual({ 'Series 1': { color: '', value: 99 } });
    });

    it('returns content for single series with an axis name', () => {
      expect(
        getTooltipContent(
          {
            seriesData: [{ value: ['Value 1', 99], seriesName: 'Series 1', color: '#aaa' }],
          },
          'Amount'
        )
      ).toEqual({ Amount: { color: '', value: 99 } });
    });

    it('returns content for multiple series', () => {
      expect(
        getTooltipContent({
          seriesData: [
            { value: ['Value 1', 99], seriesName: 'Series 1', color: '#aaa' },
            { value: ['Value 2', 99], seriesName: 'Series 2', color: '#bbb' },
          ],
        })
      ).toEqual({
        'Series 1': { color: '#aaa', value: 99 },
        'Series 2': { color: '#bbb', value: 99 },
      });
    });

    it('returns content for multiple repeated series', () => {
      expect(
        getTooltipContent({
          seriesData: [
            { value: ['Value 1', 99], seriesName: 'Series 1', color: '#aaa' },
            { value: ['Value 1', 99], seriesName: 'Series 1', color: '#aaa' },
          ],
        })
      ).toEqual({ 'Series 1': { color: '#aaa', value: 99 } });
    });
  });
});
