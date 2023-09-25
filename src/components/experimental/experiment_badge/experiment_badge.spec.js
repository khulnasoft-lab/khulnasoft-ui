import { shallowMount } from '@vue/test-utils';
import GlBadge from '../../base/badge/badge.vue';
import GlPopover from '../../base/popover/popover.vue';
import GlLink from '../../base/link/link.vue';
import GlSprintf from '../../utilities/sprintf/sprintf.vue';
import GlExperimentBadge, { i18n } from './experiment_badge.vue';

jest.mock('lodash/uniqueId', () => () => 'fakeUniqueId');

describe('GlExperimentBadge', () => {
  let wrapper;

  const findBadge = () => wrapper.findComponent(GlBadge);
  const findPopover = () => wrapper.findComponent(GlPopover);
  const findHelpLink = () => wrapper.findComponent(GlLink);

  const createComponent = (props = {}) => {
    wrapper = shallowMount(GlExperimentBadge, {
      propsData: {
        ...props,
      },
      stubs: {
        GlSprintf,
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  it('renders main components', () => {
    expect(findBadge().exists()).toBe(true);
    expect(findPopover().exists()).toBe(true);
  });

  it('sets correct props on the badge', () => {
    const badgeType = 'neutral';
    const badgeSize = 'md';
    expect(findBadge().props('variant')).toBe(badgeType);
    expect(findBadge().props('size')).toBe(badgeSize);
    expect(findBadge().find('span').text()).toBe(i18n.EXPERIMENT_BADGE);
  });

  it('sets correct props on the popover', () => {
    expect(findPopover().props('triggers')).toBe('click');
    expect(findPopover().props('title')).toBe(i18n.EXPERIMENT_POPOVER_TITLE);
  });

  it('correctly sets the placement of the popover', () => {
    const popoverPlacement = 'right';
    createComponent({ popoverPlacement });
    expect(findPopover().props('placement')).toBe(popoverPlacement);
  });

  it('sets the link to the help page if passed', () => {
    const experimentHelpPageUrl = 'https://gitlab.com';
    createComponent({ experimentHelpPageUrl });
    expect(findHelpLink().attributes('href')).toBe(experimentHelpPageUrl);
  });

  it('generates the unique ID to connect the button and the popover', () => {
    expect(findBadge().attributes('id')).toBe('fakeUniqueId');
    expect(findPopover().attributes('target')).toBe('fakeUniqueId');
  });
});
