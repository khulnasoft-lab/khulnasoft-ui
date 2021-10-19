import { select, text, number, withKnobs } from '@storybook/addon-knobs';
import Vue from 'vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlTooltipDirective } from '../../../directives/tooltip';
import { avatarSizeOptions, avatarShapeOptions, tooltipPlacements } from '../../../utils/constants';
import readme from './avatar.md';

Vue.directive('gl-tooltip', GlTooltipDirective);

function generateImageProps() {
  const defaultSize = avatarSizeOptions[1];
  const props = {
    size: {
      type: Number,
      default: select('size', avatarSizeOptions, defaultSize),
    },
    shape: {
      type: String,
      default: select('shape', avatarShapeOptions, 'circle'),
    },
  };

  return props;
}

function generateProjectFallbackProps() {
  const defaultSize = avatarSizeOptions[1];
  const props = {
    entityId: {
      type: Number,
      default: number('entityId', 123),
    },
    entityName: {
      type: String,
      default: text('entityName', 'Some Project'),
    },
    size: {
      type: Number,
      default: select('size', avatarSizeOptions, defaultSize),
    },
  };

  return props;
}

function generateTooltipProps() {
  const props = {
    tooltipText: {
      type: String,
      default: text('tooltipText', 'Avatar tooltip'),
    },
    placement: {
      type: String,
      default: select('placement', tooltipPlacements, 'top'),
    },
  };

  return props;
}

documentedStoriesOf('base/avatar', readme)
  .addDecorator(withKnobs)
  .add('image', () => ({
    props: generateImageProps(),
    template: `
      <gl-avatar
        :size="size"
        :shape="shape"
        src="https://about.gitlab.com/images/press/gitlab-summit-south-africa.jpg"
      />
    `,
  }))
  .add('project-fallback', () => ({
    props: generateProjectFallbackProps(),
    template: `
      <gl-avatar
        :entity-name="entityName"
        :entity-id="entityId"
        :size="size"
        shape="rect" />
    `,
  }))
  .add('with-tooltip', () => ({
    props: {
      ...generateImageProps(),
      ...generateTooltipProps(),
    },
    template: `
      <gl-avatar
        :size="size"
        :shape="shape"
        :title="tooltipText"
        src="https://about.gitlab.com/images/press/gitlab-summit-south-africa.jpg"
        v-gl-tooltip="{ placement }"
      />
    `,
  }));
