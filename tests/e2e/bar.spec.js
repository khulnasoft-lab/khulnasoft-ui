import { test, expect } from '@playwright/test';

test('clicking on collapsed chevron icon expands accordion item then collapses when clicked again', async ({
  page,
}) => {
  await page.goto('?path=/story/charts-bar-chart--default&viewMode=story');

  // meant to trigger mousemouse here?
  await page.locator('path:last-child').hover();

  await page.screenshot({
    path: `tests/screenshots/debug.png`,
    fullPage: true,
  });

  await expect(page.locator('.popover-header', { hasText: 'Erin (User)' })).toBeVisible();
  await expect(page.locator('.popover-header', { hasText: 'Pushes per day' })).toBeVisible();
  await expect(page.locator('.popover-header', { hasText: '30' })).toBeVisible();
});
