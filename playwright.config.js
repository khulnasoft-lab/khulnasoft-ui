/* eslint-disable import/no-default-export */

import { defineConfig, devices } from '@playwright/test';

const BROWSER_DESKTOP_CHROME = 'Desktop Chrome';
const BROWSER_DESKTOP_FIREFOX = 'Desktop Firefox';
const BROWSER_DESKTOP_SAFARI = 'Desktop Safari';

function createProject(
  name,
  {
    browsers = [BROWSER_DESKTOP_CHROME, BROWSER_DESKTOP_FIREFOX, BROWSER_DESKTOP_SAFARI],
    options = {},
  } = {}
) {
  return browsers.map((browser) => ({
    name,
    use: {
      ...devices[browser],
      video: 'retain-on-failure',
    },
    ...options,
  }));
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:9001',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    ...createProject('default', { options: { grepInvert: /@a11y/ } }),
    ...createProject('a11y', { browsers: [BROWSER_DESKTOP_FIREFOX], options: { grep: /@a11y/ } }),
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'yarn storybook:run',
    url: 'http://localhost:9001',
    reuseExistingServer: !process.env.CI,
  },
});
