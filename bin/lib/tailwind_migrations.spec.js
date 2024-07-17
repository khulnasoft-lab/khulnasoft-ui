/* eslint-disable import/extensions */
import { parseMigrations, runMigrations } from './tailwind_migrations.mjs';
import { tailwindEquivalents } from './tailwind_equivalents.mjs';
/* eslint-enable  import/extensions */

describe('runMigrations', () => {
  let migrationsToDo;
  beforeAll(async () => {
    migrationsToDo = await parseMigrations(tailwindEquivalents);
  });

  it.each([
    ['<div class="gl-focus-bg-gray-50!">', '<div class="focus:!gl-bg-gray-50">'],
    ['<div class="gl-display-flex! gl-flex-grow-0!">', '<div class="!gl-flex !gl-grow-0">'],
  ])('migrates classes properly', (input, output) => {
    expect(runMigrations(input, migrationsToDo)).toBe(output);
  });

  it.each(['<gl-spinner class="foo">'])(
    'ignores things that start with gl- but are not targets',
    (input) => {
      expect(runMigrations(input, migrationsToDo)).toBe(input);
    }
  );

  it.each([
    ['<div class="gl--flex-center">', '<div class="gl-flex gl-items-center gl-justify-center">'],
    [
      '<div class="gl--flex-center!">',
      '<div class="!gl-flex !gl-items-center !gl-justify-center">',
    ],
    ['.gl--flex-center', '.gl-flex.gl-items-center.gl-justify-center'],
    ['.gl--flex-center!', '.!gl-flex.!gl-items-center.!gl-justify-center'],
  ])('migrates gl--flex-center properly', (input, output) => {
    expect(runMigrations(input, migrationsToDo)).toBe(output);
  });
});
