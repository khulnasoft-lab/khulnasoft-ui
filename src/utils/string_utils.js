/**
 * Split the given string after each occurrence of each of the given symbols.
 *
 * Symbols are strings, and can be of length one or more. Zero-length symbols
 * are ignored.
 *
 * Unlike with `String::split`, the symbol is left in results, with
 * the split occurring _after_ the symbol.
 *
 * For example:
 *
 *     splitAfterSymbols(['/'], 'a/b/c')    // ['a/', 'b/', 'c']
 *     splitAfterSymbols(['foo'], 'foobar') // ['foo', 'bar']
 *
 * @param {string[]} symbols The symbols to split the string by.
 * @param {string} string The string to split.
 * @returns {string[]} The resulting strings.
 */
export const splitAfterSymbols = (symbols, string) => {
  const textParts = [];
  let textPartStartIndex = 0;

  if (string.length === 0) {
    return [string];
  }

  for (let i = 0; i < string.length; ) {
    let symbolFound = false;

    for (let j = 0; j < symbols.length; j += 1) {
      const symbol = symbols[j];

      if (!symbol) {
        // eslint-disable-next-line no-continue
        continue;
      }

      symbolFound = string.slice(i, i + symbol.length) === symbol;

      if (symbolFound) {
        const textPartEndIndex = i + symbol.length;
        const textPart = string.slice(textPartStartIndex, textPartEndIndex);
        textParts.push(textPart);
        textPartStartIndex = textPartEndIndex;
        i = textPartStartIndex;
        break;
      }
    }

    if (!symbolFound) {
      i += 1;
    }
  }

  const final = string.slice(textPartStartIndex);
  if (final) {
    textParts.push(final);
  }

  return textParts;
};

export const getAvatarChar = (name) => {
  if (name) {
    // Check if first character is an emjoi
    const match = name.match(/^\p{Emoji}/u);
    if (match) {
      // Return the first match
      return match[0];
    }
    return name.charAt(0).toUpperCase();
  }

  return '';
};
