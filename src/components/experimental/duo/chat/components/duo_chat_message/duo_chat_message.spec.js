import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import GlDuoUserFeedback from '../../../user_feedback/user_feedback.vue';
import GlIcon from '../../../../../base/icon/icon.vue';
import {
  MOCK_USER_PROMPT_MESSAGE,
  MOCK_RESPONSE_MESSAGE,
  generateSeparateChunks,
} from '../../mock_data';
import DocumentationSources from '../duo_chat_message_sources/duo_chat_message_sources.vue';
import GlDuoChatMessage from './duo_chat_message.vue';

describe('DuoChatMessage', () => {
  let wrapper;

  const findContentWrapper = () => wrapper.findComponent({ ref: 'content-wrapper' });
  const findContent = () => wrapper.findComponent({ ref: 'content' });
  const findErrorMessage = () => wrapper.findComponent({ ref: 'error-message' });
  const findDocumentSources = () => wrapper.findComponent(DocumentationSources);
  const findUserFeedback = () => wrapper.findComponent(GlDuoUserFeedback);
  const findCopyCodeButton = () => wrapper.find('copy-code');
  const findErrorIcon = () => wrapper.findComponent(GlIcon);
  const mockMarkdownContent = 'foo **bar**';

  let renderMarkdown;
  let renderGFM;

  const componentFactory = ({ message = MOCK_USER_PROMPT_MESSAGE, options = {} } = {}) => {
    return shallowMount(GlDuoChatMessage, {
      provide: {
        renderMarkdown,
        renderGFM,
      },
      ...options,
      propsData: {
        message,
      },
    });
  };

  const createComponent = (args) => {
    wrapper = componentFactory(args);
  };

  beforeEach(() => {
    renderMarkdown = jest.fn().mockImplementation((val) => val);
    renderGFM = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('registers the custom `copy-code` element', () => {
    expect(customElements.get('copy-code')).toBeUndefined();
    createComponent();
    expect(customElements.get('copy-code')).toBeDefined();
  });

  describe('rendering', () => {
    beforeEach(() => {
      renderMarkdown.mockImplementation(() => mockMarkdownContent);
    });

    it('renders html content of the message by default', () => {
      createComponent();
      expect(renderMarkdown).not.toHaveBeenCalled();
      expect(wrapper.html()).toContain(MOCK_USER_PROMPT_MESSAGE.contentHtml);
    });

    it('converts the message `content` to Markdown if there is no contentHtml', () => {
      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          contentHtml: undefined,
        },
      });
      expect(renderMarkdown).toHaveBeenCalledWith(MOCK_USER_PROMPT_MESSAGE.content);
      expect(findContent().text()).toBe(mockMarkdownContent);
    });

    it('does not render the documentation sources component', () => {
      expect(findDocumentSources().exists()).toBe(false);
    });

    it('does not render the user feedback component', () => {
      expect(findUserFeedback().exists()).toBe(false);
    });

    it('does not render the error icon', () => {
      expect(findErrorIcon().exists()).toBe(false);
    });
  });

  describe('rendering with assistant message', () => {
    beforeEach(() => {
      createComponent({
        message: MOCK_RESPONSE_MESSAGE,
      });
    });

    it('renders the `copy-code` button for the code snippet', () => {
      expect(findCopyCodeButton().exists()).toBe(true);
    });

    it('renders the documentation sources component by default', () => {
      expect(findDocumentSources().exists()).toBe(true);
      expect(findDocumentSources().props('sources')).toEqual(MOCK_RESPONSE_MESSAGE.extras.sources);
    });

    it('does not render the error icon', () => {
      expect(findErrorIcon().exists()).toBe(false);
    });

    it.each([null, undefined, ''])(
      'does not render sources component when `sources` is %s',
      (sources) => {
        createComponent({
          message: {
            ...MOCK_RESPONSE_MESSAGE,
            extras: {
              sources,
            },
          },
        });
        expect(findDocumentSources().exists()).toBe(false);
      }
    );

    it('renders the user feedback component', () => {
      expect(findUserFeedback().exists()).toBe(true);
    });

    it('proxies and enhances the emitted event from the User Feedback component', () => {
      findUserFeedback().vm.$emit('feedback', {
        feedbackChoices: ['incorrect'],
        extendedTextFeedback: 'exampleText',
      });
      expect(wrapper.emitted('track-feedback')).toEqual([
        [
          {
            feedbackChoices: ['incorrect'],
            extendedTextFeedback: 'exampleText',
            didWhat: '',
            improveWhat: '',
            message: MOCK_RESPONSE_MESSAGE,
          },
        ],
      ]);
    });
  });

  describe('message output', () => {
    it('renders the warning icon when message has errors', () => {
      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: ['foo'],
        },
      });
      expect(findErrorIcon().exists()).toBe(true);
      expect(findErrorMessage().text()).toBe('foo');
      expect(findContentWrapper().classes()).toContain('has-error');
    });

    it('outputs errors as icon if they are present', async () => {
      const errors = ['error1', 'error2', 'error3'];

      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors,
          contentHtml: 'fooHtml barHtml',
          content: 'foo bar',
          chunks: ['a', 'b', 'c'],
        },
      });

      await nextTick();

      const errorMessage = findErrorMessage().text();
      expect(errorMessage).toContain(errors[0]);
      expect(errorMessage).toContain(errors[1]);
      expect(errorMessage).toContain(errors[2]);
    });

    it('outputs errors if message has no content', async () => {
      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          contentHtml: '',
          content: '',
          errors: ['error'],
        },
      });
      await nextTick();
      expect(findErrorMessage().text()).toBe('error');
    });

    it('outputs contentHtml if it is present', async () => {
      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: 'fooHtml barHtml',
          content: 'foo bar',
        },
      });

      await nextTick();

      expect(findContent().text()).toContain('fooHtml barHtml');
    });

    it('outputs markdown content if there is no contentHtml', async () => {
      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: undefined,
          content: 'foo bar',
        },
      });

      await nextTick();

      expect(findContent().text()).toContain('foo bar');
    });

    it('hydrates the message with GFM when mounting with contentHtml', async () => {
      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          contentHtml: 'foo bar',
        },
      });
      await nextTick();
      expect(renderGFM).toHaveBeenCalled();
    });

    it('hydrates the message with GFM when updating with contentHtml', async () => {
      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          contentHtml: '',
        },
      });

      await wrapper.setProps({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          contentHtml: 'foo bar',
        },
      });
      expect(renderGFM).toHaveBeenCalled();
    });

    it('sanitizes html produced by content', async () => {
      createComponent({
        options: {
          provide: null,
        },
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: undefined,
          content: '[click here](javascript:prompt(1))',
        },
      });

      await nextTick();

      expect(findContent().html()).toContain('<p><a>click here</a></p>');
    });

    it('deprecated: sanitizes html produced by chunks', async () => {
      createComponent({
        options: {
          provide: null,
        },
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: undefined,
          content: '',
          chunks: ['[click here]', '(javascript:prompt(1))'],
        },
      });

      await nextTick();

      expect(findContent().html()).toContain('<p><a>click here</a></p>');
    });

    it('sanitizes contentHtml', async () => {
      createComponent({
        options: {
          provide: null,
        },
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: `<a href="javascript:prompt(1)">click here</a>`,
          content: '',
          chunks: [],
        },
      });

      await nextTick();

      expect(findContent().html()).toBe(
        '<div class="gl-markdown gl-compact-markdown"><a>click here</a></div>'
      );
    });

    describe('message updates watcher', () => {
      const newContent = 'new foo content';
      beforeEach(() => {
        createComponent();
      });

      it('listens to the message changes', async () => {
        expect(findContent().text()).toContain(MOCK_USER_PROMPT_MESSAGE.content);
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        await wrapper.setProps({
          message: {
            ...MOCK_USER_PROMPT_MESSAGE,
            contentHtml: `<p>${newContent}</p>`,
          },
        });
        expect(findContent().text()).not.toContain(MOCK_USER_PROMPT_MESSAGE.content);
        expect(findContent().text()).toContain(newContent);
      });

      it('prioritises the output of contentHtml over content', async () => {
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        await wrapper.setProps({
          message: {
            ...MOCK_USER_PROMPT_MESSAGE,
            contentHtml: `<p>${MOCK_USER_PROMPT_MESSAGE.content}</p>`,
            content: newContent,
          },
        });
        expect(findContent().text()).not.toContain(newContent);
        expect(findContent().text()).toContain(MOCK_USER_PROMPT_MESSAGE.content);
      });

      it('outputs errors if message has no content', async () => {
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        await wrapper.setProps({
          message: {
            ...MOCK_USER_PROMPT_MESSAGE,
            contentHtml: '',
            content: '',
            errors: ['error'],
          },
        });
        await nextTick();
        expect(findContent().exists()).toBe(false);

        expect(findErrorMessage().text()).toBe('error');
        expect(findErrorIcon().exists()).toBe(true);
      });

      it('hydrates the output message with GLFM if its not a chunk', async () => {
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        await wrapper.setProps({
          message: {
            ...MOCK_USER_PROMPT_MESSAGE,
            contentHtml: `<p>${newContent}</p>`,
          },
        });
        expect(renderGFM).toHaveBeenCalled();
      });
    });

    describe('updates to the message', () => {
      const [CHUNK1, CHUNK2, CHUNK3] = generateSeparateChunks(3);
      const consolidatedContent = CHUNK1.content + CHUNK2.content;

      beforeEach(() => {
        createComponent({ message: MOCK_RESPONSE_MESSAGE });
      });

      it('does not handle message updates with chunks for the user messages', async () => {
        createComponent({ message: MOCK_USER_PROMPT_MESSAGE });
        expect(findContent().text()).toContain(MOCK_USER_PROMPT_MESSAGE.content);
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        await wrapper.setProps({
          message: {
            ...MOCK_USER_PROMPT_MESSAGE,
            content: 'foo bar',
            chunkId: 1,
          },
        });
        expect(findContent().text()).toContain(MOCK_USER_PROMPT_MESSAGE.content);
      });

      it('does not fail if the message has no chunkId', async () => {
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        await wrapper.setProps({
          message: {
            ...CHUNK1,
            chunkId: null,
          },
        });
        expect(findContent().text()).toContain(CHUNK1.content);
      });

      it('renders chunks correctly when the chunks arrive out of order', async () => {
        expect(CHUNK1.content).toBe('chunk #1');
        expect(CHUNK2.content).toBe('chunk #2');
        expect(CHUNK3.content).toBe('chunk #3');
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        await wrapper.setProps({
          message: CHUNK2,
        });
        expect(findContent().text()).toBe('');

        await wrapper.setProps({
          message: CHUNK1,
        });
        expect(findContent().text()).toBe(CHUNK1.content + CHUNK2.content);

        await wrapper.setProps({
          message: CHUNK3,
        });
        expect(findContent().text()).toBe(CHUNK1.content + CHUNK2.content + CHUNK3.content);
      });

      it('renders the chunks as they arrive when they arrive in the correct order', async () => {
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        await wrapper.setProps({
          message: CHUNK1,
        });
        expect(findContent().text()).toBe(CHUNK1.content);

        await wrapper.setProps({
          message: CHUNK2,
        });
        expect(findContent().text()).toBe(consolidatedContent);
      });

      it('treats the initial message content as chunk if message has chunkId', async () => {
        createComponent({
          message: CHUNK1,
        });
        await nextTick();
        expect(findContent().text()).toBe(CHUNK1.content);

        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        await wrapper.setProps({
          message: CHUNK2,
        });
        expect(findContent().text()).toBe(consolidatedContent);
      });

      it('does not hydrate the chunk messages with GLFM', async () => {
        createComponent({
          propsData: {
            message: CHUNK1,
          },
        });
        await nextTick();
        renderGFM.mockClear();
        expect(renderGFM).not.toHaveBeenCalled();

        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/devoutputs errors if message has no contentelopment/fe_guide/style/vue.html#setting-component-state
        await wrapper.setProps({
          message: CHUNK2,
        });
        expect(renderGFM).not.toHaveBeenCalled();
      });

      it.each`
        content    | contentHtml  | errors            | expectedContent
        ${'alpha'} | ${'beta'}    | ${['foo', 'bar']} | ${'foo; bar'}
        ${'alpha'} | ${'beta'}    | ${[]}             | ${'beta'}
        ${'alpha'} | ${undefined} | ${['foo', 'bar']} | ${'foo; bar'}
        ${'alpha'} | ${undefined} | ${[]}             | ${'alpha'}
        ${''}      | ${'beta'}    | ${['foo', 'bar']} | ${'foo; bar'}
        ${''}      | ${'beta'}    | ${[]}             | ${'beta'}
        ${''}      | ${undefined} | ${['foo', 'bar']} | ${'foo; bar'}
      `(
        'outputs "$expectedContent" and hydrates this content when content is "$content", contentHtml is "$contentHtml" and errors is "$errors" with "chunkId: null"',
        async ({ content, contentHtml, errors, expectedContent } = {}) => {
          createComponent({
            propsData: {
              message: CHUNK1,
            },
          });
          await nextTick();
          renderGFM.mockClear();
          expect(renderGFM).not.toHaveBeenCalled();

          // setProps is justified here because we are testing the component's
          // reactive behavior which consistutes an exception
          // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
          await wrapper.setProps({
            message: {
              ...CHUNK2,
              chunkId: null,
              content,
              contentHtml,
              errors,
            },
          });

          expect(findContentWrapper().text()).toBe(expectedContent);
        }
      );
    });
  });
});
