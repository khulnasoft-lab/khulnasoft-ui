import first from 'lodash/first';
import last from 'lodash/last';
import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';

const emptyList = [''];

export const TERM_TOKEN_TYPE = 'filtered-search-term';

export const INTENT_ACTIVATE_PREVIOUS = 'intent-activate-previous';

export function isEmptyData(data, multiSelect) {
  return multiSelect ? isEqual(data, emptyList) || isEqual(data, []) || !data : data === '';
}

export function isEmptyTerm(token, multiSelect) {
  return token.type === TERM_TOKEN_TYPE && isEmptyData(token.value.data, multiSelect);
}

export function normalizeTokens(tokens) {
  const result = [];
  tokens.forEach((token) => {
    if (isEmptyTerm(token)) {
      return;
    }

    if (token.type !== TERM_TOKEN_TYPE) {
      result.push({ ...token });
    } else if (result.length > 0 && typeof result[result.length - 1] === 'string') {
      result[result.length - 1] += ` ${token.value.data}`;
    } else {
      result.push(token.value.data);
    }
  });
  return result;
}

function assertValidTokens(tokens) {
  if (!Array.isArray(tokens) && !typeof tokens === 'string') {
    throw new TypeError('Either string or array of tokens is expected');
  }
}

export function needDenormalization(tokens) {
  if (typeof tokens === 'string') {
    return true;
  }

  assertValidTokens(tokens);

  return tokens.some((t) => typeof t === 'string' || !t.id);
}

let tokenIdCounter = 0;
const getTokenId = () => {
  const tokenId = `token-${tokenIdCounter}`;
  tokenIdCounter += 1;
  return tokenId;
};
/**
 * Ensure the given token has an `id` property, which `GlFilteredSearch` relies
 * on as a unique key for the token.
 *
 * If the given token does not have an `id`, it returns a shallow copy of the
 * token with an `id`. Otherwise, it returns the given token.
 *
 * @param {object} token The token to check.
 * @returns {object} A token with an `id`.
 */
export function ensureTokenId(token) {
  if (!token.id) {
    return {
      ...token,
      id: getTokenId(),
    };
  }

  return token;
}

export function createEmptyData(multiSelect) {
  return multiSelect ? emptyList : '';
}

export function createTerm({ data = '', multiSelect } = {}) {
  return {
    id: getTokenId(),
    type: TERM_TOKEN_TYPE,
    value: {
      data: multiSelect ? [data] : data,
    },
  };
}

export function denormalizeTokens(inputTokens, multiSelect) {
  assertValidTokens(inputTokens);

  const tokens = Array.isArray(inputTokens) ? inputTokens : [inputTokens];

  const result = [];
  tokens.forEach((t) => {
    if (typeof t === 'string') {
      const stringTokens = t.split(' ').filter(Boolean);
      stringTokens.forEach((strToken) => result.push(createTerm({ data: strToken, multiSelect })));
    } else {
      result.push(ensureTokenId(t));
    }
  });
  return result;
}

export function splitOnQuotes(str) {
  if (first(str) === "'" && last(str) === "'") {
    return [str];
  }

  if (first(str) === '"' && last(str) === '"') {
    return [str];
  }

  const queue = str.split(' ');
  const result = [];
  let waitingForMatchingQuote = false;
  let quoteContent = '';

  while (queue.length) {
    const part = queue.shift();
    const quoteIndex = part.indexOf('"');
    if (quoteIndex === -1) {
      if (waitingForMatchingQuote) {
        quoteContent += ` ${part}`;
      } else {
        result.push(part);
      }
    } else {
      const [firstPart, secondPart] = part.split('"', 2);

      if (waitingForMatchingQuote) {
        waitingForMatchingQuote = false;
        quoteContent += ` ${firstPart}"`;
        result.push(quoteContent);
        quoteContent = '';
        if (secondPart.length) {
          queue.unshift(secondPart);
        }
      } else {
        waitingForMatchingQuote = true;
        if (firstPart.length) {
          result.push(firstPart);
        }
        quoteContent = `"${secondPart}`;
      }
    }
  }
  return result;
}

/**
 *  wraps the incoming token in double quotes.
 *  Eg. Foo Bar becomes "Foo Bar"
 *
 *  1. token must have space.
 *  2. token should not already have a quote around it.
 */
export function wrapTokenInQuotes(token) {
  if (!isString(token)) {
    return token;
  }

  if (!token.includes(' ')) {
    return token;
  }

  const quotes = ["'", '"'];

  // If the token starts and ends with a quote, eg. "Foo Bar", then return the original token.
  if (quotes.some((quote) => first(token) === quote && last(token) === quote)) {
    return token;
  }

  return `"${token}"`;
}
