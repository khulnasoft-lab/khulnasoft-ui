import { userEvent } from '@storybook/testing-library';

export const triggerBlurEvent = async () =>
  userEvent.pointer([
    {
      keys: '[MouseLeft]',
      coords: { x: 0, y: 0 },
    },
  ]);
