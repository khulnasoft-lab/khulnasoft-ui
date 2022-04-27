import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';
import brandImage from '../static/img/_logo_with_black_text.svg';

const theme = create({
  base: 'light',
  brandTitle: 'GitLab UI',
  brandImage,
  brandUrl: 'https://gitlab.com/gitlab-org/gitlab-ui',
});

addons.setConfig({
  isFullscreen: false,
  panelPosition: 'right',
  theme,
});
