import * as description from './filtered_search_token_segment.md';

export default {
  description,
  bootstrapComponent: null,
  propsInfo: {
    active: {
      additionalInfo: 'If this term token is currently active',
    },
    options: {
      additionalInfo: '',
    },
    optionTextField: {
      additionalInfo: '',
    },
    customInputKeydownHandler: {
      additionalInfo: '',
    },
    value: {
      additionalInfo: 'Current term value',
    },
    searchInputAttributes: {
      additionalInfo: 'HTML attributes to add to the search input',
    },
    isLastToken: {
      additionalInfo: 'If this is the last token',
    },
  },
  events: [
    { event: 'activate', description: 'Emitted on mousedown event on the main component' },
    { event: 'backspace', description: 'Emitted when Backspace is pressed and the value is empty' },
    {
      event: 'complete',
      description: 'Emitted when suggestion is selected from the suggestion list',
    },
    { event: 'submit', description: 'Emitted when Enter is pressed and no suggestion is selected' },
    {
      event: 'split',
      args: [
        {
          arg: 'newStrings',
          description: '(Array of strings) New strings to be converted into term tokens',
        },
      ],
      description: 'Emitted when Space appears in token segment value',
    },
  ],
};
