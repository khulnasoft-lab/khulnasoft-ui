/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import GlSkeletonLoader from '../../../../../../base/skeleton_loader/skeleton_loader.vue';
import GlModal from '../../../../../../base/modal/modal.vue';
import { MOCK_CONTEXT_ITEM_DEPENDENCY, MOCK_CONTEXT_ITEM_FILE } from '../mock_context_data';
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
  const findContentError = () => findByTestId('content-error-alert');

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
          actionCancel: null,
          actionPrimary: null,
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

    it('does not emit "close" event when modal becomes visible', () => {
      createComponent({ contextItem: MOCK_CONTEXT_ITEM_FILE });
      findModal().vm.$emit('change', true);

      expect(wrapper.emitted('close')).toBeUndefined();
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
      describe('for "file" items', () => {
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
          it('should apply "language-diff" for a contextItem of category "git"', async () => {
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

      describe('for "dependencies" items', () => {
        describe('when the content cannot be parsed', () => {
          beforeEach(async () => {
            wrapper.setProps({
              contextItem: { ...MOCK_CONTEXT_ITEM_DEPENDENCY, content: 'i-am<not>-valid{JSON!' },
            });
            await nextTick();
          });

          it('should not show the loading state', () => {
            expect(findLoadingState().exists()).toBe(false);
          });

          it('should show the content error', () => {
            expect(findContentError().exists()).toBe(true);
          });

          it('should not render any content', () => {
            expect(findContent().exists()).toBe(false);
          });
        });

        describe('when the content is valid', () => {
          beforeEach(async () => {
            wrapper.setProps({ contextItem: MOCK_CONTEXT_ITEM_DEPENDENCY });
            await nextTick();
          });

          it('should not show the loading state', () => {
            expect(findLoadingState().exists()).toBe(false);
          });

          it('should not show the content error', () => {
            expect(findContentError().exists()).toBe(false);
          });

          it('should not call the "renderGFM" function', () => {
            expect(renderGFM).not.toHaveBeenCalled();
          });

          it('should render content summary', () => {
            expect(findContent().text()).toContain('Project dependencies from package.json');
          });

          it('should render dependencies content', () => {
            const text = findContent().text();

            expect(text).toContain('javascript');

            expect(text).toContain('@types/node@16.11.7');
            expect(text).toContain('@vue/compiler-sfc@3.2.37');
            expect(text).toContain('typescript@4.5.5');
            expect(text).toContain('vue@3.2.37');
          });
        });
      });
    });
  });
});
