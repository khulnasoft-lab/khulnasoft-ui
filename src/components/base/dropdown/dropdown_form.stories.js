import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlDropdownForm, GlButton } from '../../../index';
import readme from './dropdown_form.md';

const components = {
  GlDropdownForm,
  GlButton,
};

documentedStoriesOf('base/dropdown/dropdown-form', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template:
      '<ul class="list-unstyled"><gl-dropdown-form><gl-button>One</gl-button></gl-dropdown-form></ul>',
  }));
