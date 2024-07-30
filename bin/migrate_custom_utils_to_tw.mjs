#!/usr/bin/env node
/* eslint-disable no-continue, no-nested-ternary, no-await-in-loop */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { format, resolveConfig } from 'prettier';
import { sync as globbySync } from 'globby';
import * as tailwindPlugin from 'prettier-plugin-tailwindcss';
import { tailwindEquivalents } from './lib/tailwind_equivalents.mjs';
import { parseMigrations, runMigrations } from './lib/tailwind_migrations.mjs';

function isFrontendFile(file) {
  return file.endsWith('.js') || file.endsWith('.vue');
}

function isPositiveAnswer(answer) {
  const a = answer.toLowerCase();
  return ['y', 'yes', ''].includes(a);
}

function createRewriter(dryRun, migrationsToDo) {
  return async function rewrite(file) {
    const contents = await readFile(file, { encoding: 'utf8' });

    const newContents = runMigrations(contents, migrationsToDo);

    if (contents === newContents) {
      console.warn(`No changes to ${file}`);
      return false;
    }

    if (dryRun) {
      console.warn(`Would fix up ${file}`);
      return false;
    }

    await writeFile(file, newContents, { encoding: 'utf8' });
    console.warn(`Fixed ${file}`);
    return true;
  };
}

async function prettify(tailwindConfig, files) {
  for (const file of files) {
    const contents = await readFile(file, { encoding: 'utf8' });
    const prettierConfig = (await resolveConfig(file)) || {};
    const newContents = await format(contents, {
      filepath: file,
      ...prettierConfig,
      plugins: [tailwindPlugin],
      tailwindConfig,
    });
    if (contents === newContents) {
      console.warn(`${file} did not need to be prettified`);
    } else {
      await writeFile(file, newContents, { encoding: 'utf8' });
      console.warn(`Prettified ${file}`);
    }
  }
}

function validateMigrations(processedMigrations) {
  const errors = [];

  for (const { from, to } of processedMigrations) {
    if (from.endsWith('!') !== /!-?gl/.test(to)) {
      errors.push(`Inconsistent importance: ${from}, ${to}`);
    }
  }

  // Make sure there are no duplicates
  const froms = new Set();
  const tos = new Set();
  for (const { from, to } of processedMigrations) {
    froms.add(from);
    tos.add(to);
  }

  // Make sure important class exists for each non-important class.
  // It doesn't matter if the classes don't exist, it's fast enough to check
  // for them anyway.
  for (const { from } of processedMigrations) {
    if (from.endsWith('!')) continue;

    if (!froms.has(`${from}!`)) {
      errors.push(`Missing important class for ${from}`);
    }
  }

  // Make sure responsive breakpoints are consistent
  for (const { from, to } of processedMigrations) {
    for (const bp of ['xs', 'sm', 'md', 'lg', 'xl']) {
      if (from.includes(`-${bp}-`) !== to.startsWith(`${bp}:`)) {
        errors.push(`Inconsistent breakpoints: ${from}, ${to}`);
      }
    }
  }

  // Make sure no legacy classes are substrings Tailwind classes, which could
  // cause replacement errors. This *shouldn't* occur, but might as well check
  // for it anyway. For instance:
  //   1. Replace legacy class "gl-foo-bar" with Tailwind class "gl-qux-baz"
  //   2. Replace legacy class "gl-qux" with Tailwind class "gl-qux-foo"
  //   3. The Tailwind class "gl-qux-baz" is now borked to "gl-qux-foo-baz"
  for (const from of froms) {
    for (const to of tos) {
      if (to.includes(from)) {
        errors.push(`Tailwind class "${to}" contains legacy class "${from}" as substring`);
      }
    }
  }

  // Double-check we sorted classes correctly
  processedMigrations.forEach(({ from }, i, arr) => {
    const nextFrom = arr[i + 1]?.from;
    if (from.length < nextFrom?.length ?? -Infinity) {
      errors.push(`Incorrect ordering: ${from} followed by ${nextFrom}`);
    }
  });

  if (errors.length > 0) {
    console.error([`Invalid migrations (${errors.length})\n`, ...errors].join('\n'));
    return false;
  }

  return true;
}

async function getFilesAndDirectories(directories, dryRun) {
  // prettier-ignore
  const directoriesPattern = directories.length === 0 ?
    process.cwd()
    : directories.length === 1 ?
      directories[0]
      : `{${directories.join(',')}}`;

  const extensions = ['haml', 'rb', 'vue', 'js', 'snap', 'html'];
  const filesPattern = `${directoriesPattern}/**/*.{${extensions.join(',')}}`;

  return {
    pattern: filesPattern,
    directories: dryRun
      ? globbySync(directoriesPattern, { onlyDirectories: true, gitignore: true })
      : [],
    files: globbySync(filesPattern, { onlyFiles: true, gitignore: true }),
  };
}

function getArgsParser() {
  const NO_EQUIVALENTS = Symbol('no-equivalents');

  return yargs(hideBin(process.argv))
    .usage(
      'Usage: $0 [--migrations <path>] [--tailwind-config <path>] [--directory <path...>] [--from-stdin] [--dry-run]'
    )
    .option('directories', {
      alias: 'd',
      array: true,
      describe: 'Space separated path segments.',
      default: [process.cwd()],
    })
    .option('tailwind-config', {
      alias: 't',
      type: 'string',
      describe: 'Optional. Path to tailwind config. Defaulting to GitLab UI default',
      default: fileURLToPath(new URL('../tailwind.defaults.js', import.meta.url)),
    })
    .option('migrations', {
      alias: 'm',
      type: 'string',
      describe:
        'Optional. Path to migrations JSON file, with { oldClass: newClass, ... } structure',
      default: NO_EQUIVALENTS,
      defaultDescription: 'Defaults to definitions from @gitlab/ui',
      coerce: async (value) => {
        if (value === NO_EQUIVALENTS) {
          return tailwindEquivalents;
        }
        return JSON.parse(await readFile(value, 'utf-8'));
      },
    })
    .option('validate-migrations', {
      describe: "Don't run validations against migrations",
      type: 'boolean',
      default: true,
    })
    .option('dry-run', {
      describe: "Don't actually update files, but print more info",
      type: 'boolean',
      default: false,
    })
    .option('from-stdin', {
      describe: "Don't actually update files, but print more info",
      type: 'boolean',
      default: false,
    })
    .option('single-step-migration', {
      describe:
        'Run the migration in a single step. This means that migrated files are prettified with the Tailwind plugin immediately. Leave this disabled to have a chance to commit migrate files before `prettier-plugin-tailwindcss` re-orders classes.',
      type: 'boolean',
      default: false,
    })
    .help('help');
}

async function main() {
  const argsParser = getArgsParser();

  const program = await argsParser.parseAsync();

  console.warn(program);

  const migrations = await parseMigrations(program.migrations);

  if (migrations.length === 0) {
    console.warn('No migrations provided. Defaulting to built-in migrations');
    argsParser.showHelp();
    return;
  }

  if (program.validateMigrations && !validateMigrations(migrations)) return;

  if (program.dryRun) {
    console.warn('Will do approximately %d class migrations:', migrations.length);
    console.warn(migrations.map((m) => `\t${m.from} => ${m.to}`).join('\n'));
  }

  const rewrite = createRewriter(program.dryRun, migrations);
  let files = [];

  if (program.fromStdin) {
    console.warn('Reading files from stdin:');
    for await (const file of readline.createInterface({ input: process.stdin })) {
      if (file.trim()) {
        files.push(file);
      }
    }
  } else {
    const filesAndDirectories = await getFilesAndDirectories(
      program.directories ?? [],
      program.dryRun
    );
    files = filesAndDirectories.files;
    const { pattern, directories } = filesAndDirectories;
    if (program.dryRun) {
      console.warn(
        [`Running on %d files across %d directories`, `(using pattern: %s).`].join('\n'),
        files.length,
        directories.length,
        pattern
      );

      console.warn('Directories searched:');
      console.warn(`\t${directories.join('\n\t')}`);
    }
  }

  let migratedFilesCount = 0;
  for (const file of files) {
    if (await rewrite(file)) {
      migratedFilesCount += 1;
    }
  }

  if (migratedFilesCount === 0) {
    console.warn('No files needed to be migrated');
    return;
  }

  const filesToBePrettified = files.filter((file) => isFrontendFile(file));
  if (filesToBePrettified.length === 0) {
    console.warn('No files to be prettified');
    return;
  }

  if (!program.singleStepMigration) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const answer = await rl.question(`
Files have been migrated and will now be prettified.
Make sure to commit the changes before proceeding if you would like to track
the diff before CSS classes get re-ordered by the Tailwind Prettier plugin.
Continue? (Y/n) `);
    rl.close();
    if (isPositiveAnswer(answer)) {
      await prettify(program.tailwindConfig, filesToBePrettified);
    }
  } else {
    await prettify(program.tailwindConfig, filesToBePrettified);
  }
}

main();
