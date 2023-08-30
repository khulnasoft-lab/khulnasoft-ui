import { i18n } from '../config';

/**
 * Mark a label as translatable.
 *
 * @param {string} key Translation key to be leveraged by the consumer to provide a generic translation at configuration time.
 * @param {string} defaultValue A fallback value to be relied on if the consumer doesn't have translation capabilities.
 * @returns {string} The translated label.
 */
export const translate = (key, defaultValue) => i18n[key] ?? defaultValue;
