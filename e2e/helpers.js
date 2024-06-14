import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';

export function story(title, { storyName = 'default', args = null } = {}) {
  const query = {
    id: `${title.replace(/\//g, '-')}--${storyName}`,
    viewMode: 'story',
  };

  if (args) {
    query.args = Object.entries(args)
      .map((entry) => entry.join(':'))
      .join(';');
  }

  return `iframe.html?${new URLSearchParams(query)}`;
}

export async function axeAnalyzeStory(page) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .include('#storybook-root')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
}
