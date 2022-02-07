import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlDropdownDivider } from '../../../index';
import readme from './dropdown_divider.md';

const components = {
  GlDropdownDivider,
};

documentedStoriesOf('base/dropdown/dropdown-divider', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-dropdown-divider /></ul>',
  }));
