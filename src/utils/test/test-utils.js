// Common test utilities

/**
 * Find an element by its data-testid attribute
 * @param {string} testId - The value of the data-testid attribute
 * @param {object} wrapper - The wrapper object from enzyme
 * @returns {object} The found element
 */
export const findByTestId = (testId, wrapper) => wrapper.find(`[data-testid="${testId}"]`);