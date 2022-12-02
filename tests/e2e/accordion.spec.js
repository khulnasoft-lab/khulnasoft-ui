import { test, expect } from '@playwright/test';

test('clicking on collapsed chevron icon expands accordion item then collapses when clicked again', async ({
  page,
}) => {
  await page.goto('?path=/story/base-accordion--default');

  const accordionContentId = '[data-testid="accordion-item-collapse-accordion-item-2"]';

  await expect(page.locator(accordionContentId)).not.toBeVisible();

  await page.locator('button', { hasText: 'Item 1' }).click();

  await expect(page.locator(accordionContentId)).toBeVisible();

  await page.locator('button', { hasText: 'Item 1' }).click();

  await expect(page.locator(accordionContentId)).not.toBeVisible();
});
