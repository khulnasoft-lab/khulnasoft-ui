import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlDropdownSectionHeader } from '../../../index';
import readme from './dropdown_section_header.md';

const components = {
  GlDropdownSectionHeader,
};

documentedStoriesOf('base/dropdown/dropdown-section-header', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-dropdown-section-header>Some header</gl-dropdown-section-header></ul>',
  }));
