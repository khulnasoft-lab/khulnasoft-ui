import examples from './examples';
import description from './search_box_by_click.md';

export default {
  followsDesignSystem: true,
  description,
  examples,
  propsInfo: {
    value: {
      additionalInfo: 'If provided, used as value of search input',
    },
    historyItems: {
      type: Array,
      required: false,
      additionalInfo: 'If provided, used as history items for this component',
    },
    placeholder: {
      type: String,
      required: false,
      additionalInfo: 'If provided, used as history items for this component',
    },
    disabled: {
      type: Boolean,
      required: false,
      additionalInfo: 'If provided and true, disables the input and controls',
    },
    recentSearchesHeader: {
      type: String,
      required: false,
      default: 'Recent searches',
      additionalInfo: 'i18n for recent searches title within history dropdown',
    },
    clearButtonTitle: {
      type: String,
      required: false,
      default: 'Clear',
      additionalInfo: 'i18n for clear button title',
    },
    closeButtonTitle: {
      type: String,
      required: false,
      default: 'Close',
      additionalInfo: 'i18n for close button title within history dropdown',
    },
    clearRecentSearchesText: {
      type: String,
      required: false,
      default: 'Clear recent searches',
      additionalInfo: 'i18n for recent searches clear text',
    },
    tooltipContainer: {
      additionalInfo:
        'Container for tooltip. Valid values: DOM node, selector string or `false` for default',
    },
    searchButtonAttributes: {
      additionalInfo: 'HTML attributes to add to the search button',
    },
  },
  events: [
    {
      event: 'clear',
      description: 'Emitted when search is cleared',
    },
    {
      event: 'submit',
      args: [
        {
          arg: 'value',
          description: 'Search value',
        },
      ],
      description: 'Emitted when search is submitted',
    },
    {
      event: 'history-item-selected',
      args: [
        {
          arg: 'value',
          description: 'History item',
        },
      ],
      description: 'Emitted when item from history is selected',
    },
    {
      event: 'clear-history',
      description: 'Emitted when clear history button is clicked',
    },
  ],
  slots: [
    {
      name: 'history-item',
      description:
        'Slot to customize history item in history dropdown. Used only with history-items prop',
    },
  ],
};
