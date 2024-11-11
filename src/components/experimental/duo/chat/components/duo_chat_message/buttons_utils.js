/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import iconsPath from '@gitlab/svgs/dist/icons.svg';

export const createButton = (title = 'Insert the code snippet', iconId = 'insert') => {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add(
    'btn',
    'btn-default',
    'btn-md',
    'gl-button',
    'btn-default-secondary',
    'btn-icon'
  );
  button.dataset.title = title;

  // Create an SVG element with the correct namespace
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('gl-button-icon', 'gl-icon', 's16');

  // Create a 'use' element with the correct namespace
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `${iconsPath}#${iconId}`);

  svg.appendChild(use);
  button.appendChild(svg);

  return button;
};
