import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlDropdownItem } from '../../../index';
import readme from './dropdown_item.md';

const components = {
  GlDropdownItem,
};

documentedStoriesOf('base/dropdown/dropdown-item', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-dropdown-item>Some item</gl-dropdown-item></ul>',
  }))
  .add('checked', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-dropdown-item is-checked is-check-item>Some item</gl-dropdown-item></ul>',
  }))
  .add('checked with avatar', () => ({
    props: {},
    components,
    template: `<ul class="list-unstyled">
      <gl-dropdown-item
        is-checked
        is-check-item
        is-check-centered
        avatar-url="./img/avatar.png"
        secondary-text="@sytses"
      >
        Sid Sijbrandij
      </gl-dropdown-item></ul>`,
  }))
  .add('checked with secondary text', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-dropdown-item is-checked is-check-item secondary-text="Lorem ipsum dolar sit amit...">Some item</gl-dropdown-item></ul>',
  }));
