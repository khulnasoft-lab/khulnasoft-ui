import { isString, isNumber } from 'lodash';

const isOption = (item) => Boolean(item) && (isString(item.value) || isNumber(item.value));

const isGroup = ({ options } = {}) => Array.isArray(options) && options.every(isOption);

const hasNoDuplicates = (array) => array.length === new Set(array).size;

const flattenedOptions = (items) => items.flatMap((item) => (isOption(item) ? item : item.options));

const isAllOptionsOrAllGroups = (items) => items.every(isOption) || items.every(isGroup);

const hasUniqueValues = (items) =>
  hasNoDuplicates(flattenedOptions(items).map(({ value }) => value));

const hasUniqueGroups = (items) => hasNoDuplicates(items.filter(isGroup).map(({ text }) => text));

const itemsValidator = (items) =>
  isAllOptionsOrAllGroups(items) && hasUniqueValues(items) && hasUniqueGroups(items);

export { isOption, itemsValidator, flattenedOptions };
