/**
 * Webpack 4 uses md4 internally because it is fast.
 * Some loaders also use md5 directly.
 * Node >= 17 ships with OpenSSL@3 by default, which dropped support for md4
 *
 * This is a hack to monkey patch the crypto function to use
 * another algorithm if md4 or md5 is expected.
 *
 * https://github.com/webpack/webpack/issues/14532
 * https://github.com/webpack/webpack/issues/13572#issuecomment-923736472
 *
 * This hack can be removed once we upgrade to webpack v5 as
 * it includes native support for configuring hash options:
 * https://github.com/webpack/webpack/pull/14306
 *
 * See also:
 * - Same Hack in GitLab: https://gitlab.com/gitlab-org/gitlab/-/blob/58402335dfcdd3a195e01a2633a50574e1128d5f/config/helpers/patched_crypto.js
 * - MR: https://gitlab.com/gitlab-org/gitlab/-/merge_requests/78581
 */
const crypto = require('crypto');

const cryptoHashOriginal = crypto.createHash;

crypto.createHash = (algorithm) =>
  cryptoHashOriginal(['md4', 'md5'].includes(algorithm) ? 'sha256' : algorithm);

module.exports = crypto;
