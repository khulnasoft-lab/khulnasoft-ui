/**
 * Returns a text only version of HTML string.
 *
 * Aims to work in Vue 2 and Vue 3, regardless of whitespace compilation settings,
 * imitating innerText.
 *
 * See: https://vuejs.org/api/application.html#app-config-compileroptions-whitespace
 *
 * @param {String} htmlString - HTML string.
 * @returns Text contents in the HTML.
 */
export const textContentWithSpaces = (htmlString) => {
  return htmlString
    .replace(/<[\S\s.]*?>/g, '') // remove html tags and comments
    .replace(/\s+/g, ' ') // removes repeated whitespace
    .trim();
};
