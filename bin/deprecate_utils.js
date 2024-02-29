/* eslint-disable no-console */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const { isEqual, sortBy } = require('lodash');
const { processSingleFile, mixinsPath } = require('./generate_utilities');

// Check if required commands exists:
try {
  execSync('which rg');
} catch {
  console.error(
    'Error: Deprecate utils depend on rg, please install it to proceed (e.g. brew install rg)'
  );

  process.exit(1);
}

const removePseudoClasses = (selector) =>
  selector.replace(':hover', '').replace(':active', '').replace(':focus', '');

const compareUtilsToTailwind = (gitlabUiScss, gitlabUiCss, tailwindCss) => {
  const colorRulesToParse = ['color', 'background-color', 'border-color'];
  const gitlabUiScssSelectors = [];

  const parsedTailwind = [];
  const parsedGitlabUiCss = [];

  postcss.parse(tailwindCss).walkRules((rule) => {
    parsedTailwind.push({
      selector: rule.selector,
      nodes: rule.nodes.flatMap((node) => {
        if (node.prop.startsWith('--tw-')) {
          return [];
        }

        // If it is a color rule, remove CSS variable and use HEX fallback
        if (colorRulesToParse.includes(node.prop)) {
          const [, , fallbackHex] = node.value.match(/var\((--[a-z-0-9]+), (#[a-z0-9]+)\)/);

          if (fallbackHex) {
            return {
              prop: node.prop,
              value: fallbackHex,
            };
          }
        }

        return [
          {
            prop: node.prop,
            value: node.value
              // Replace leading zeros since GitLab UI utilities don't have leading zeros
              .replace(/^0./, '.'),
          },
        ];
      }),
    });
  });

  gitlabUiScss.root.walkRules((rule) => {
    gitlabUiScssSelectors.push(removePseudoClasses(rule.selector));
  });

  postcss.parse(gitlabUiCss).walkRules((rule) => {
    rule.selectors.forEach((selector) => {
      const selectorWithoutPseudoClasses = removePseudoClasses(selector);
      if (gitlabUiScssSelectors.includes(selectorWithoutPseudoClasses)) {
        parsedGitlabUiCss.push({
          selector: selectorWithoutPseudoClasses,
          nodes: rule.nodes.map((node) => {
            return {
              prop: node.prop,
              value: node.value,
            };
          }),
        });
      }
    });
  });

  const { matched, notMatched, matchedImportant, matchedStateful } = parsedGitlabUiCss.reduce(
    (accumulator, util) => {
      // Remove stateful modifiers and important and then check if it matches Tailwind selector
      const matchedTailwind = parsedTailwind.find((tailwindUtil) => {
        return (
          tailwindUtil.selector ===
          util.selector.replace(/gl-(hover|active|focus)-/, 'gl-').replace('\\!', '')
        );
      });

      // If there is no selector match, return `false`
      if (!matchedTailwind) {
        accumulator.notMatched.push(util);
        return accumulator;
      }

      // If the length of the nodes don't match we know the utils are not a match so return `false`
      if (matchedTailwind.nodes.length !== util.nodes.length) {
        accumulator.notMatched.push(util);
        return accumulator;
      }

      // First sort the nodes by property name (e.g. `display` or `margin-top`) so we know the
      // nodes are in the same order. Then compare to see if they are the same.
      const nodesMatch = isEqual(
        sortBy(matchedTailwind.nodes, ['prop']),
        sortBy(util.nodes, ['prop'])
      );

      if (!nodesMatch) {
        accumulator.notMatched.push(util);
        return accumulator;
      }

      // If it is an `!important` selector add to `matchedImportant`
      if (util.selector.endsWith('\\!')) {
        accumulator.matchedImportant.push(util);
        return accumulator;
      }

      // If it is a stateful selector add to `matchedStateful`
      if (/\.gl-(hover|active|focus)-/.test(util.selector)) {
        accumulator.matchedStateful.push(util);
        return accumulator;
      }

      // It is a regular selector (not important or stateful) that matches
      accumulator.matched.push(util);
      return accumulator;
    },
    {
      matched: [],
      notMatched: [],
      matchedImportant: [],
      matchedStateful: [],
    }
  );

  return {
    matched: matched.map((util) => util.selector.replace('.', '')),
    notMatched: notMatched.map((util) => util.selector.replace('.', '')),
    matchedImportant: matchedImportant.map((util) => util.selector.replace('.', '')),
    matchedStateful: matchedStateful.map((util) => util.selector.replace('.', '')),
  };
};

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

  const tempDir = path.join(__dirname, 'temp');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Build Tailwind CSS
  // Set `safelist` on temp `tailwind.config.js` so that we generate all utility classes
  const tailwindConfig = fs
    .readFileSync(path.join(__dirname, '../tailwind.config.js'), 'utf8')
    .replace('presets: [defaults],', 'presets: [defaults],safelist: [{pattern: /./}],')
    .replace('./tailwind.defaults', '../../tailwind.defaults');

  fs.writeFileSync(path.join(tempDir, 'tailwind.config.js'), tailwindConfig);
  fs.writeFileSync(path.join(tempDir, 'tailwind.input.css'), '@tailwind utilities;');

  execSync(
    `npx tailwindcss -i ${path.join(tempDir, 'tailwind.input.css')} -o ${path.join(
      tempDir,
      'tailwind.output.css'
    )} -c ${path.join(tempDir, 'tailwind.config.js')}`
  );

  // Build GitLab UI CSS
  execSync('yarn build');

  const [mixinsFile, gitlabDir] = args;
  const gitlabUiScss = await processSingleFile(mixinsFile);
  const gitLabUiCss = fs.readFileSync(path.join(__dirname, '../dist/utility_classes.css'), 'utf8');

  const tailwindCss = fs.readFileSync(path.join(tempDir, 'tailwind.output.css'), 'utf8');

  // Compare utils
  const { matched, notMatched, matchedImportant, matchedStateful } = compareUtilsToTailwind(
    gitlabUiScss,
    gitLabUiCss,
    tailwindCss
  );

  // Deprecate utils that don't match
  for (let i = 0; i < notMatched.length; i += 1) {
    const util = notMatched[i];
    const deprecatedName = util.replace(/^gl-/, 'gl-deprecated-');

    execSync(
      `rg -F "${util}" ${gitlabDir}/{./ee/,./}app/ --files-with-matches | xargs sed -i '' 's/${util}/${deprecatedName}/g'`
    );
  }

  // Move `!` to Tailwind format (e.g. !gl-text-gray-900)
  for (let i = 0; i < matchedImportant.length; i += 1) {
    const util = matchedImportant[i];
    const utilWithoutEscape = util.replace('\\!', '!');
    const utilWithoutImportant = util.replace('\\!', '');
    const tailwindUtil = `!${utilWithoutImportant}`;

    execSync(
      `rg -F "${utilWithoutEscape}" ${gitlabDir}/{./ee/,./}app/ --files-with-matches | xargs sed -i '' 's/${utilWithoutEscape}/${tailwindUtil}/g'`
    );
  }

  // Move stateful modifier to Tailwind format (e.g. hover:gl-text-gray-900)
  for (let i = 0; i < matchedStateful.length; i += 1) {
    const util = matchedStateful[i];
    const [fullMatch, statefulModifier] = util.match(/gl-(hover|active|focus)-/);
    const utilWithoutStatefulModifier = util.replace(fullMatch, 'gl-');
    const tailwindUtil = `${statefulModifier}:${utilWithoutStatefulModifier}`;

    execSync(
      `rg -F "${util}" ${gitlabDir}/{./ee/,./}app/ --files-with-matches | xargs sed -i '' 's/${util}/${tailwindUtil}/g'`
    );
  }

  const mixinsFileWithMatchedRemoved = matched.reduce((accumulator, util) => {
    return accumulator.replace(new RegExp(`@mixin ${util}(\\([^\\)]+\\))* {\n[^}]+\n}`, 'g'), '');
  }, fs.readFileSync(path.join(mixinsPath, mixinsFile), 'utf8'));

  const mixinsFileWithMatchedRemovedAndNotMatchedPrefixed = notMatched.reduce(
    (accumulator, util) => {
      return accumulator.replace(util, util.replace(/^gl-/, 'gl-deprecated-'));
    },
    mixinsFileWithMatchedRemoved
  );

  fs.writeFileSync(
    path.join(mixinsPath, mixinsFile),
    mixinsFileWithMatchedRemovedAndNotMatchedPrefixed
  );

  process.stdout.write('\n');

  process.stdout.write(
    'The following utils do not match, they have been deprecated in `gitlab-org/gitlab` and `gitlab-org/gitlab-ui`.\n\n'
  );
  process.stdout.write(JSON.stringify(notMatched, null, 2));

  process.stdout.write('\n');
  process.stdout.write('\n');

  process.stdout.write(
    'The following `!important` utilities match Tailwind but `!` needs to be moved to the front of the selector, they have been updated in `gitlab-org/gitlab`.\n\n'
  );
  process.stdout.write(JSON.stringify(matchedImportant, null, 2));

  process.stdout.write('\n');
  process.stdout.write('\n');

  process.stdout.write(
    'The following stateful utilities match Tailwind but the stateful modifier needs to be moved to the front of the selector, they have been updated in `gitlab-org/gitlab`.\n\n'
  );
  process.stdout.write(JSON.stringify(matchedStateful, null, 2));

  process.stdout.write('\n');
  process.stdout.write('\n');

  process.stdout.write(
    'The following utilities are a perfect match to Tailwind and do not need to be updated in `gitlab-org/gitlab`, they have been removed from `gitlab-org/gitlab-ui`.\n\n'
  );
  process.stdout.write(JSON.stringify(matched, null, 2));
};

main();
