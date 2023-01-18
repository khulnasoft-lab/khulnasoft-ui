import { isFunction } from 'lodash';

export const required = (value) => value !== '' && value !== null;

export const min = (value, { min: minValue }) => value.length > minValue;

export const max = (value, { max: maxValue }) => value.length < maxValue;

export const matches = (value, { otherValue }) => {
  if (isFunction(otherValue)) {
    return value === otherValue();
  }

  return value === otherValue;
};
