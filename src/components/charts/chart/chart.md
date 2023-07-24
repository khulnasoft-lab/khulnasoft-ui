### ECharts Wrapper

The chart component is a Vue component wrapper around [Apache ECharts](https://echarts.apache.org/en/api.html#echarts).
The chart component accepts width and height props in order to allow the user to make it responsive.

> Note: When implementing a chart type that does not already have a GitLab UI component, you can use
> this component alonside the [ECharts options](https://echarts.apache.org/en/api.html#echarts) to
> build your chart. Each type of chart should still follow the general guidelines in the
> [pajamas documentation](https://design.gitlab.com/data-visualization/charts).

### EChart Lifecycle

This component emits the following events during the ECharts lifecycle:

- `created`: emitted after calling `echarts.init`
- `updated`: emitted after calling `echarts.setOption`

In all cases, the event payload is the
[echart instance](https://echarts.apache.org/en/api.html#echartsInstance).
