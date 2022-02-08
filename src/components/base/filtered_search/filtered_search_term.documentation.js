import * as description from './filtered_search_term.md';

export default {
  description,
  bootstrapComponent: null,
  propsInfo: {
    availableTokens: {
      additionalInfo: 'Tokens available for this filtered search instance',
    },
    active: {
      additionalInfo: 'If this term token is currently active',
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
    { event: 'activate', description: 'Emitted when this term token is clicked' },
    { event: 'deactivate', description: 'Emitted when this term token loses its focus' },
    {
      event: 'destroy',
      description: 'Emitted when token value is empty and backspace is pressed',
    },
    {
      event: 'replace',
      args: [{ arg: 'token', description: '(Object) Replacement token configuration' }],
      description: 'Emitted when autocomplete entry is selected',
    },
    {
      event: 'split',
      args: [
        {
          arg: 'newTokens',
          description: '(Array) Token configurations',
        },
      ],
      description: 'Emitted when Space is pressed in-between term text',
    },
  ],
};
