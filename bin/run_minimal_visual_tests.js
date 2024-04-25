/* eslint-disable no-console */
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const { glob } = require('glob');

const MESSAGE_RUNNING_FULL_SUITE =
  'Running full test suite as changes to the following file might far-reaching:';
const MESSAGE_RUNNING_MINIMAL_SUITE =
  'The following stories seem to be affected by the changes and will be tested in a minimal test run:';
const MESSAGE_NOT_RUNNING = 'Skipping visual tests as no story seems to be affected.';
const MESSAGE_NO_TESTABLE_STORY = 'No testable story found.';

/**
 * Those file patterns are considered NOT far-reaching. Changing any of them should not trigger a
 * full test run.
 */
const FILE_PATTERNS_OVERRIDES = [
  /^\.gitlab\//,
  /^cypress\//,
  /^danger\//,
  /Dangerfile$/,
  /^templates\//,
  /\.md$/,
  /\.rb$/,
  /^\.eslint.*/,
  /^\.git/,
  '.markdownlint.yaml',
  '.npmignore',
  /^\.prettier/,
  /^\.stylelint/,
  'lefthook.yml',
  'LICENSE',
  'plopfile.js',
  /\.spec\.js$/,
];

/**
 * Returns a list of changed files by comparing the base SHA to the current commit.
 *
 * @returns {String[]} Array of file paths.
 */
const getChangedFiles = () => {
  const { CI_MERGE_REQUEST_DIFF_BASE_SHA, CI_COMMIT_SHA } = process.env;
  const { stdout } = spawnSync(
    'git',
    ['diff', '--name-only', CI_MERGE_REQUEST_DIFF_BASE_SHA, CI_COMMIT_SHA],
    { encoding: 'utf-8' }
  );

  return stdout.split('\n').filter(Boolean);
};

/**
 * Pretty-prints a list of paths.
 *
 * @param {String[]} paths
 */
const printFilesList = (paths) => {
  paths.forEach((p) => {
    console.log(`* ${path.basename(p)}`);
  });
};

/**
 * Attempts to find .stories.js files next to the given file.
 *
 * @param {String} file
 * @returns {String[]} A list of paths corresponding to the file's sibling stories.
 */
const getSiblingStories = (file) => {
  const dirname = path.dirname(file);
  return glob.sync(`${dirname}/*.stories.js`);
};

/**
 * Runs visual regression tests against given stories. If no story is provided, it runs the
 * full-blown visual regression test suite.
 *
 * @param {Set} stories Stories to run the tests against.
 * @returns {Promise} A Promise that resolves if the tests were successful or if no test was run.
 *                    Rejects if the tests fail.
 */
const runVisualTests = (stories) => {
  return new Promise((resolve, reject) => {
    let ignoreChildFailureMessage;

    const child = spawn(`yarn`, ['test:visual'], {
      env: {
        ...process.env,
        ...(stories?.size
          ? {
              STORIES: [...stories].map((story) => path.join('..', story)).join(','),
            }
          : {}),
      },
    });

    child.stdout.pipe(process.stdout);

    child.stderr.on('data', (chunk) => {
      const str = chunk.toString();
      if (!str.includes('webpack.Progress')) {
        process.stderr.write(chunk);
      }
      if (str.includes('Your test suite must contain at least one test.')) {
        ignoreChildFailureMessage = MESSAGE_NO_TESTABLE_STORY;
      }
    });

    child.on('exit', (code) => {
      if (code === 0 || ignoreChildFailureMessage) {
        resolve(ignoreChildFailureMessage);
      } else {
        const error = new Error('Visual test(s) failed');
        error.status = code;
        reject(error);
      }
    });
  });
};

async function main() {
  const changedFiles = getChangedFiles();
  const affectedStories = new Set();
  let farReachingFile;

  for (let i = 0; i < changedFiles.length; i += 1) {
    const file = changedFiles[i];
    const skipFile = FILE_PATTERNS_OVERRIDES.some((filePatternsOverride) =>
      file.match(filePatternsOverride)
    );

    // eslint-disable-next-line no-continue
    if (skipFile) continue;

    const siblingStories = getSiblingStories(file);

    if (!siblingStories.length) {
      farReachingFile = file;
      break;
    }

    siblingStories.forEach((siblingStory) => affectedStories.add(siblingStory));
  }

  if (farReachingFile) {
    console.log(MESSAGE_RUNNING_FULL_SUITE, farReachingFile);
    return runVisualTests();
  }

  if (affectedStories.size) {
    console.log(MESSAGE_RUNNING_MINIMAL_SUITE);
    printFilesList(affectedStories);
    return runVisualTests(affectedStories);
  }

  return MESSAGE_NOT_RUNNING;
}

main()
  .then((message) => console.log(message))
  .catch((error) => {
    console.error(error.message);
    process.exitCode = error.status ?? 1;
  });
