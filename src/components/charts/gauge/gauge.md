Some layout problems can be encountered with this component. Specifically, when the gauge chart's
axis labels or detail text have larger widths, they can overlap with the chart elements.

Also, when the containing element of the gauge chart has either of a small calculated `width` and
`height`, its axis width could become bulkier in relation to other chart elements. This is because
at this time [eCharts only allows for setting the axis line width in absolute units](https://echarts.apache.org/en/option.html#series-gauge.axisLine.lineStyle.width).

This issue is to be addressed by [https://gitlab.com/gitlab-org/gitlab-ui/-/issues/916](https://gitlab.com/gitlab-org/gitlab-ui/-/issues/916).
