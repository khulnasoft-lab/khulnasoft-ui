import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'GitLab UI',
  brandImage: 'https://about.gitlab.com/images/press/logo/png/gitlab-logo-gray-rgb.png',
  brandUrl: 'https://gitlab.com/gitlab-org/gitlab-ui',
});

addons.setConfig({
  isFullscreen: false,
  panelPosition: 'right',
  theme,
});
