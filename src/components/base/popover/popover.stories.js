import { withKnobs, select, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { popoverPlacements } from '../../../utils/constants';

const contentString = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat a nisi non
  pellentesque. Pellentesque efficitur vulputate rutrum. Fusce nisl magna, porttitor in
  massa ac, porta condimentum libero. Ut id lacus tristique, egestas arcu non, molestie nisi.
`;

const template = `
  <div class="gl-display-flex gl-justify-content-center gl-p-6">
    <gl-button id="pop-top">{{placement}}</gl-button>
    <gl-popover target="pop-top"
      triggers="hover focus"
      :title="title"
      :placement="placement"
      content="${contentString}"
      data-testid="popover-with-props"
      show
      />
  </div>
  `;

const scopedSlotTemplate = `
  <div class="gl-display-flex gl-justify-content-center gl-p-6">
    <gl-button id="pop-top-two" data-testid="popover-button-click">{{placement}}</gl-button>
    <gl-popover target="pop-top-two"
      triggers="click"
      :placement="placement"
      content="${contentString}"
    >
      <template #title>
        <span data-testid="popover-title">Popover title</span>
      </template>
    </gl-popover>
  </div>
`;

function generateProps({ placement = popoverPlacements.top, title = 'Popover', triggers } = {}) {
  return {
    placement: {
      type: String,
      default: select('placement', popoverPlacements, placement),
    },
    title: {
      type: String,
      default: text('title', title),
    },
    triggers: {
      type: String,
      default: text('hover focus', triggers),
    },
  };
}

documentedStoriesOf('base/popover', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    template,
    props: generateProps(),
  }))
  .add(
    'on click',
    () => ({
      template: scopedSlotTemplate,
      props: generateProps(),
    }),
    { storyshots: false }
  );
