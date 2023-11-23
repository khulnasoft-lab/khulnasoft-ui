/* eslint-disable no-console */
const { exec } = require('child_process');
const path = require('path');
const { processSingleFile, mixinsPath } = require('./generate_utilities');

/**
 * Deprecates a set of utility mixins.
 * Usage:
 * node bin/deprecate_utils.js <mixins_file> <gitlab_directory>
 *
 * Example:
 * node bin/deprecate_utils.js color.scss /Users/bob/projects/gdk/gitlab
 *
 * @returns {void}
 */
const main = async () => {
  const [, , ...args] = process.argv;
  if (args.length < 2) {
    console.error('Missing arguments');
    process.exitCode = 1;
    return;
  }
  const [mixinsFile, gitlabDir] = args;
  const mixinsFilePath = path.join(mixinsPath, mixinsFile);
  const utils = await processSingleFile(mixinsFilePath);
  for (let i = 0; i < utils.length; i += 1) {
    const util = utils[i];
    const deprecatedName = util.replace(/^gl-/, 'gl-deprecated-');
    process.stdout.write(`Updating util '${util}' usages to '${deprecatedName}'. `);
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => {
      exec(
        `rg -F "${util}" ${gitlabDir}/{./ee/,./}app/ --files-with-matches | xargs sed -i '' 's/${util}/${deprecatedName}/g'`,
        () => {
          process.stdout.write('Done.\n');
          resolve();
        }
      );
    });
  }
  console.log('Renaming mixins.');
  exec(`sed -i '' 's/@mixin gl-/@mixin gl-deprecated-/g' ${mixinsFilePath}`);
};

main();
