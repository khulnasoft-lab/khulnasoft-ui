import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import GlSkeletonLoader from '../../../../../../base/skeleton_loader/skeleton_loader.vue';
import GlModal from '../../../../../../base/modal/modal.vue';
import { MOCK_CONTEXT_ITEM_FILE } from '../mock_context_data';
import {
  CONTEXT_ITEM_CATEGORY_LOCAL_GIT,
  LANGUAGE_IDENTIFIER_DIFF,
  LANGUAGE_IDENTIFIER_PLAINTEXT,
  LANGUAGE_IDENTIFIER_PREFIX,
} from '../constants';
import GlDuoChatContextItemDetailsModal from './duo_chat_context_item_details_modal.vue';

describe('GlDuoChatContextItemDetailsModal', () => {
  let wrapper;
  let renderGFM;

  const createComponent = (propsData = {}) => {
    renderGFM = jest.fn();
    wrapper = shallowMount(GlDuoChatContextItemDetailsModal, {
      propsData,
      provide: { renderGFM },
    });
  };

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);

  const findModal = () => wrapper.findComponent(GlModal);
  const findLoadingState = () => wrapper.findComponent(GlSkeletonLoader);
  const findContent = () => findByTestId('context-item-content');

  function expectLanguageIdentifierClass(cls) {
    const [el] = renderGFM.mock.calls.at(0);
    const elMarkup = el.innerHTML.toString();
    expect(elMarkup).toContain(cls);
  }

  describe('default behaviour', () => {
    it('renders an open modal', () => {
      createComponent({ contextItem: MOCK_CONTEXT_ITEM_FILE });

      expect(findModal().props()).toEqual(
        expect.objectContaining({
          dismissLabel: 'Close',
          actionPrimary: {
            text: 'Close',
          },
          actionCancel: null,
          actionSecondary: null,
          size: 'lg',
          visible: true,
        })
      );
    });

    it.each([
      { metadata: { title: 'WOW' }, expected: 'WOW' },
      { metadata: { title: undefined }, expected: 'Preview' },
    ])('sets modal title to contextItem value or fallbacks', ({ metadata, expected }) => {
      const contextItem = {
        ...MOCK_CONTEXT_ITEM_FILE,
        metadata: {
          enabled: true,
          ...metadata,
        },
      };
      createComponent({ contextItem });

      expect(findModal().props('title')).toEqual(expected);
    });

    it('emits "close" event when modal closes', () => {
      createComponent({ contextItem: MOCK_CONTEXT_ITEM_FILE });
      findModal().vm.$emit('change', false);

      expect(wrapper.emitted('close')).toHaveLength(1);
    });

    it('emits "close" event when modal primary action is triggered', () => {
      createComponent({ contextItem: MOCK_CONTEXT_ITEM_FILE });
      findModal().vm.$emit('primary');

      expect(wrapper.emitted('close')).toHaveLength(1);
    });
  });

  describe('when context item does not have content', () => {
    beforeEach(() => {
      const contextItem = {
        ...MOCK_CONTEXT_ITEM_FILE,
        content: undefined,
      };
      createComponent({ contextItem });
    });

    it('should display the loading state', () => {
      expect(findLoadingState().exists()).toBe(true);
    });

    it('should not display content', () => {
      expect(findContent().exists()).toBe(false);
    });

    describe('when context item content finishes loading', () => {
      beforeEach(async () => {
        const hydratedContextItem = {
          ...MOCK_CONTEXT_ITEM_FILE,
          content: 'water',
        };
        wrapper.setProps({ contextItem: hydratedContextItem });
        await nextTick();
      });

      it('should not show the loading state', () => {
        expect(findLoadingState().exists()).toBe(false);
      });

      it('should format content with provided "renderGFM" function', async () => {
        expect(renderGFM).toHaveBeenCalledTimes(1);
        const [el] = renderGFM.mock.calls.at(0);
        const elMarkup = el.innerHTML.toString();
        expect(elMarkup).toContain('water');
      });

      it('should apply necessary class for external highlight-js to perform syntax highlighting', () => {
        expect(renderGFM).toHaveBeenCalledTimes(1);
        const [el] = renderGFM.mock.calls.at(0);
        const elMarkup = el.innerHTML.toString();
        expect(elMarkup).toContain('js-syntax-highlight');
      });

      describe('language identifier classes', () => {
        it('should apply "language-diff" for a contextItem fo category "git"', async () => {
          wrapper.setProps({
            contextItem: {
              ...MOCK_CONTEXT_ITEM_FILE,
              category: CONTEXT_ITEM_CATEGORY_LOCAL_GIT,
              content: 'ding',
            },
          });
          await nextTick();

          expectLanguageIdentifierClass(LANGUAGE_IDENTIFIER_DIFF);
        });

        it.each(['ts', 'js', 'md', 'sh'])(
          'should apply "language-%s" when file extension is "%s"',
          async (extension) => {
            wrapper.setProps({
              contextItem: {
                ...MOCK_CONTEXT_ITEM_FILE,
                metadata: {
                  ...MOCK_CONTEXT_ITEM_FILE.metadata,
                  relativePath: `wow/so/cool.${extension}`,
                },
                content: 'ding',
              },
            });
            await nextTick();

            expectLanguageIdentifierClass(`${LANGUAGE_IDENTIFIER_PREFIX}${extension}`);
          }
        );

        it('should apply "language-plaintext" when file type is unknown', async () => {
          wrapper.setProps({
            contextItem: {
              ...MOCK_CONTEXT_ITEM_FILE,
              metadata: {
                ...MOCK_CONTEXT_ITEM_FILE.metadata,
                relativePath: `this/file/has/no/extension/ohno`,
              },
              content: 'ding',
            },
          });
          await nextTick();

          expectLanguageIdentifierClass(LANGUAGE_IDENTIFIER_PLAINTEXT);
        });
      });
    });
  });
});
