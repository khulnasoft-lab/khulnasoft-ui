import has from 'lodash/has';

export const tokensValidator = (tokens) => tokens.every((token) => has(token, 'id'));
