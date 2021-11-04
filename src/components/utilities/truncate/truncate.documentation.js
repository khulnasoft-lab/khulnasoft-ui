import examples from './examples';
import description from './truncate.md';

export default {
  description,
  examples,
  propsInfo: {
    text: {
      additionalInfo: 'Text to be ellipsized',
    },
    position: {
      additionalInfo: 'Ellipsis position',
      enum: 'truncateOptions',
    },
    withTooltip: {
      additionalInfo: 'Display the full text in a tooltip only if it is being truncated',
    },
  },
};
