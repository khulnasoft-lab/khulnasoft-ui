/**
 * Removes descriptions from tokens
 *
 * A preprocessor function to remove $description from tokens so they
 * are not included as comments in the generated output files.
 *
 * Usage:
 *
 * ```javascript
 * StyleDictionary.registerPreprocessor({
 *   name: 'stripDescriptions',
 *   preprocessor: stripDescriptionsPreprocessor,
 * });
 * ```
 *
 * @param {Object} dictionary - StyleDictionary's dictionary object
 * @returns {Object} - Modified dictionary object
 */
const stripDescriptionsPreprocessor = (dictionary) => {
  function stripDescription(node) {
    if (typeof node !== 'object') {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map((el) => stripDescription(el));
    }

    const entries = Object.entries(node)
      // recursively traverse token objects and skip $description attributes
      .filter(([k]) => k !== '$description')
      .map(([k, v]) => [k, stripDescription(v)]);
    return Object.fromEntries(entries);
  }

  return stripDescription(dictionary);
};

module.exports = {
  stripDescriptionsPreprocessor,
};
