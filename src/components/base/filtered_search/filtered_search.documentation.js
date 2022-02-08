import examples from './examples';
import * as description from './filtered_search.md';

export default {
  description,
  followsDesignSystem: true,
  bootstrapComponent: null,
  examples,
  propsInfo: {
    value: {
      additionalInfo: 'If provided, used as value of filtered search',
    },
    historyItems: {
      additionalInfo: 'If provided, used as history items for this component',
    },
    availableTokens: {
      additionalInfo: 'Available tokens',
    },
    placeholder: {
      additionalInfo: 'If provided, used as history items for this component',
    },
    recentSearchesHeader: {
      additionalInfo: 'i18n for recent searches title within history dropdown',
    },
    clearButtonTitle: {
      additionalInfo: 'i18n for clear button title',
    },
    closeButtonTitle: {
      additionalInfo: 'i18n for close button title within history dropdown',
    },
    clearRecentSearchesText: {
      additionalInfo: 'i18n for recent searches clear text',
    },
    suggestionsListClass: {
      additionalInfo:
        'Additional classes to add to the suggestion list menu. NOTE: this not reactive, and the value must be available and fixed when the component is instantiated',
    },
    searchButtonAttributes: {
      additionalInfo: 'HTML attributes to add to the search button',
    },
    searchInputAttributes: {
      additionalInfo: 'HTML attributes to add to the search input',
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
          arg: 'tokens',
          description: '(Array)',
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
        'Slot to customize history item in history dropdown. Used only if using history items',
    },
  ],
};
