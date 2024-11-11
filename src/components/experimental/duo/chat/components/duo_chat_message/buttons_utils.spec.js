/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import iconsPath from '@gitlab/svgs/dist/icons.svg';
import { createButton } from './buttons_utils';

describe('createButton', () => {
  it('should create a button with default title and icon', () => {
    const button = createButton();
    const svg = button.querySelector('svg');
    const use = svg.querySelector('use');

    expect(button).toBeDefined();
    expect(button.type).toBe('button');
    expect(button.classList).toContain('btn');
    expect(button.classList).toContain('btn-default');
    expect(button.dataset.title).toBe('Insert the code snippet');
    expect(button.shadowRoot).toBeNull();
    expect(svg).toBeDefined();
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(use.getAttribute('href')).toBe(`${iconsPath}#insert`);
  });

  it('should create a button with a custom title and icon', () => {
    const customTitle = 'Custom Title';
    const customIconId = 'custom-icon';
    const button = createButton(customTitle, customIconId);
    const svg = button.querySelector('svg');
    const use = svg.querySelector('use');

    expect(button.dataset.title).toBe(customTitle);
    expect(use.getAttribute('href')).toBe(`${iconsPath}#${customIconId}`);
  });
});
