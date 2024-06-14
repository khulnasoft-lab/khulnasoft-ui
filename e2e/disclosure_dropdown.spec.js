import { test } from '@playwright/test';
import { story, axeAnalyzeStory } from './helpers';

test.describe('Disclosure dropdown', async () => {
  async function checkA11yDropdownWithGroupsOpened(page) {
    await page.goto(
      story('base/dropdown/disclosure-dropdown', {
        story: 'groups',
      })
    );

    await axeAnalyzeStory(page);
  }

  async function checkA11yDropdownWithGroupsClosed(page) {
    await page.goto(
      story('base/dropdown/disclosure-dropdown', {
        story: 'groups',
        args: {
          startOpened: false,
        },
      })
    );

    await axeAnalyzeStory(page);
  }

  async function checkA11yDropdownWithCustomGroupItemsAndToggle(page) {
    await page.goto(
      story('base/dropdown/disclosure-dropdown', {
        story: 'custom-groups-items-and-toggle',
      })
    );

    await axeAnalyzeStory(page);
  }

  test('it passes axe accessibility audits', { tag: '@a11y' }, async ({ page }) => {
    await checkA11yDropdownWithGroupsOpened(page);
    await checkA11yDropdownWithGroupsClosed(page);
    await checkA11yDropdownWithCustomGroupItemsAndToggle(page);
  });
});
