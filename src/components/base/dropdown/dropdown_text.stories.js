import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlDropdownText } from '../../../index';
import readme from './dropdown_text.md';

const components = {
  GlDropdownText,
};

documentedStoriesOf('base/dropdown/dropdown-text', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-dropdown-text>Some text</gl-dropdown-text></ul>',
  }));
