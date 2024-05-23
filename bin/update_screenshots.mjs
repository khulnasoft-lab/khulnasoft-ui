#!/usr/bin/env node

/* eslint-disable no-console, no-await-in-loop */

// Note: This script has no dependencies except node built-ins.
// If we can, we should keep it so, then we don't need to yarn install
import path from 'node:path';
import { env } from 'node:process';
import { rm, copyFile, readFile, readdir } from 'node:fs/promises';

if (!env.CI_MERGE_REQUEST_SOURCE_PROJECT_PATH) {
  console.error('ERROR: CI_MERGE_REQUEST_SOURCE_PROJECT_PATH is not set');
  console.error('This is supposed to run in a merge request in CI and not locally');
  process.exit(1);
}

const ROOT_DIR = path.join(import.meta.dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT_DIR, 'tests/__image_snapshots__');
const UPDATED_SCREENSHOT_DIR = path.join(SCREENSHOT_DIR, '__received_output__');

async function listFiles(dirname, pattern = /./) {
  const entries = await readdir(dirname, { withFileTypes: true });

  return entries.flatMap((entry) => {
    return entry.isFile() && pattern.test(entry.name) ? path.join(dirname, entry.name) : [];
  });
}

async function loadUsedScreenshots() {
  const paths = await listFiles(SCREENSHOT_DIR, /^__seen_snapshots_/);
  const allFiles = Promise.all(
    paths.map(async (file) => {
      const content = (await readFile(file, 'utf-8'))
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => path.join(ROOT_DIR, line));

      console.warn(`Read ${path.basename(file)}, found ${content.length} used screenshots`);
      await rm(file);

      return content;
    })
  );
  return (await allFiles).flat();
}

const checkedInScreenshots = await listFiles(SCREENSHOT_DIR, /\.png$/);
try {
  console.warn(`Checking for updated screenshots in ${UPDATED_SCREENSHOT_DIR}`)
  const updatedScreenshots = await listFiles(UPDATED_SCREENSHOT_DIR, /\.png$/);

  for (const screenshot of updatedScreenshots) {
    const targetName = path.basename(screenshot).replace(/-received\.png$/, '.png');
    console.warn(`Screenshot ${targetName} seems to be updated. Moving file...`);
    const target = path.join(path.resolve(screenshot), `../../${targetName}`);
    await copyFile(screenshot, target);
    await rm(screenshot);
  }
} catch (e){
  if(e.code === 'ENOENT'){
    console.warn(`${UPDATED_SCREENSHOT_DIR} doesn't exist, so likely no screenshots needed updating`)
  } else {
    console.error('Uncaught exception occurred...')
    console.error(e)
    process.exit(1)
  }
}

const usedScreenshots = await loadUsedScreenshots();

if (usedScreenshots.length) {
  console.warn(`The visual specs used ${usedScreenshots} screenshots. Checking whether we have unused ones...`)
  for (const screenshot of checkedInScreenshots) {
    if (!usedScreenshots.includes(screenshot)) {
      console.warn(`Screenshot ${path.basename(screenshot)} seems unused. Removing...`);
      await rm(screenshot);
    }
  }
} else {
  console.warn(`No usage reports found, skipping deletion of screenshots.`)
}

console.warn('bin/update_screenshots.mjs complete. byebye.')
