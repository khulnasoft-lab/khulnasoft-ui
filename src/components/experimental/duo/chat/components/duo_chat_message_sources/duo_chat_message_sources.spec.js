import { shallowMount } from '@vue/test-utils';
import GlIcon from '../../../../../base/icon/icon.vue';
import GlLink from '../../../../../base/link/link.vue';
import { DOCUMENTATION_SOURCE_TYPES } from '../../constants';
import GlDuoChatMessageSources from './duo_chat_message_sources.vue';

const dummySourceBase = {
  title: 'Foo',
  source_type: DOCUMENTATION_SOURCE_TYPES.HANDBOOK.value,
  stage: 'foo-stage',
  group: 'bar-group',
  date: new Date('December 31, 2020 23:59:59'),
  author: 'Gregor Samsa',
};

describe('Duo Chat Message Sources', () => {
  let wrapper;

  const findListItems = () => wrapper.findAll('[data-testid="source-list-item"]');
  const findSourceIcons = () => wrapper.findAllComponents(GlIcon);
  const findSourceTitles = () => wrapper.findAllComponents(GlLink);

  const createComponent = ({ propsData = {} } = {}) => {
    wrapper = shallowMount(GlDuoChatMessageSources, {
      propsData,
    });
  };

  it('does not render anything if sources is an empty Array', () => {
    createComponent({
      propsData: {
        sources: [],
      },
    });
    expect(wrapper.text()).toBe('');
  });

  it('renders sources passed down as a prop', () => {
    createComponent({
      propsData: {
        sources: [
          dummySourceBase,
          {
            ...dummySourceBase,
            title: 'Bar',
          },
        ],
      },
    });
    expect(findListItems().length).toBe(2);
  });

  it.each`
    type                                         | expectedIcon
    ${DOCUMENTATION_SOURCE_TYPES.HANDBOOK.value} | ${DOCUMENTATION_SOURCE_TYPES.HANDBOOK.icon}
    ${DOCUMENTATION_SOURCE_TYPES.DOC.value}      | ${DOCUMENTATION_SOURCE_TYPES.DOC.icon}
    ${DOCUMENTATION_SOURCE_TYPES.BLOG.value}     | ${DOCUMENTATION_SOURCE_TYPES.BLOG.icon}
    ${'foo'}                                     | ${'document'}
  `('renders the correct icon for $type type', ({ type, expectedIcon } = {}) => {
    createComponent({
      propsData: {
        sources: [
          {
            ...dummySourceBase,
            source_type: type,
          },
        ],
      },
    });
    expect(findSourceIcons().at(0).props('name')).toBe(expectedIcon);
  });

  it.each`
    sourceExtension                                           | expectedTitle
    ${{ title: 'Foo' }}                                       | ${'Foo'}
    ${{ source_type: DOCUMENTATION_SOURCE_TYPES.DOC.value }}  | ${`${dummySourceBase.stage} / ${dummySourceBase.group}`}
    ${{ source_type: DOCUMENTATION_SOURCE_TYPES.BLOG.value }} | ${`${dummySourceBase.date} / ${dummySourceBase.author}`}
    ${{}}                                                     | ${'Source'}
  `('renders the correct title for $sourceExtension', ({ sourceExtension, expectedTitle } = {}) => {
    createComponent({
      propsData: {
        sources: [
          {
            ...dummySourceBase,
            title: '',
            ...sourceExtension,
          },
        ],
      },
    });
    expect(findSourceTitles().at(0).text()).toBe(expectedTitle);
  });
});
