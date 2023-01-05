export const TERM_TOKEN_TYPE = 'filtered-search-term';

export const INTENT_ACTIVATE_PREVIOUS = 'intent-activate-previous';

export function isEmptyTerm(token) {
  return token.type === TERM_TOKEN_TYPE && token.value.data.trim() === '';
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
      // TODO: Consider concatenating _all_ free text terms, rather than just
      // consecutive ones
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

export function createTerm(data = '') {
  return {
    id: getTokenId(),
    type: TERM_TOKEN_TYPE,
    value: { data },
  };
}

export function denormalizeTokens(inputTokens) {
  assertValidTokens(inputTokens);

  const tokens = Array.isArray(inputTokens) ? inputTokens : [inputTokens];

  return tokens.reduce((result, t) => {
    if (typeof t === 'string') {
      const trimmedText = t.trim();
      if (trimmedText) result.push(createTerm(trimmedText));
    } else {
      result.push(ensureTokenId(t));
    }

    return result;
  }, []);
}

export const termTokenDefinition = {
  type: TERM_TOKEN_TYPE,
  icon: 'title',
  title: 'Search for this text',
};
