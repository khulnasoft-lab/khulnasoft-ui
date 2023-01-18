import { required, min, max } from './validators';

export const VALIDATOR_ACCESSIBILITY_INPUT_ATTRIBUTES = [
  {
    validator: required,
    generateAttributes: () => ({
      'aria-required': true,
    }),
  },
  {
    validator: min,
    generateAttributes: ({ min: minValue }) => ({
      'aria-valuemin': minValue,
    }),
  },
  {
    validator: max,
    generateAttributes: ({ max: maxValue }) => ({
      'aria-valuemax': maxValue,
    }),
  },
];
