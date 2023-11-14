import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import GlDuoUserFeedback from '../../../user_feedback/user_feedback.vue';
import {
  MOCK_USER_PROMPT_MESSAGE,
  MOCK_RESPONSE_MESSAGE,
  MOCK_CHUNK_RESPONSE_MESSAGE,
} from '../../mock_data';
import DocumentationSources from '../duo_chat_message_sources/duo_chat_message_sources.vue';
import GlDuoChatMessage from './duo_chat_message.vue';

describe('DuoChatMessage', () => {
  let wrapper;

  const findContent = () => wrapper.findComponent({ ref: 'content' });
  const findDocumentSources = () => wrapper.findComponent(DocumentationSources);
  const findUserFeedback = () => wrapper.findComponent(GlDuoUserFeedback);
  const findCopyCodeButton = () => wrapper.find('copy-code');
  const mockMarkdownContent = 'foo **bar**';

  let renderMarkdown;
  let renderGFM;

  const componentFactory = ({ message = MOCK_USER_PROMPT_MESSAGE, options = {} } = {}) => {
    return shallowMount(GlDuoChatMessage, {
      ...options,
      propsData: {
        message,
      },
      provide: {
        renderMarkdown,
        renderGFM,
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
      createComponent();
    });

    it('converts the message `content` to Markdown', () => {
      expect(renderMarkdown).toHaveBeenCalledWith(MOCK_USER_PROMPT_MESSAGE.content);
    });

    it('renders message content', () => {
      expect(wrapper.text()).toBe(mockMarkdownContent);
    });

    describe('user message', () => {
      it('does not render the documentation sources component', () => {
        expect(findDocumentSources().exists()).toBe(false);
      });

      it('does not render the user feedback component', () => {
        expect(findUserFeedback().exists()).toBe(false);
      });
    });
  });

  describe('rendering - with assistant message', () => {
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

    it('proxies the emitted event from the User Feedback component', () => {
      findUserFeedback().vm.$emit('feedback', 'foo');
      expect(wrapper.emitted('track-feedback')).toEqual([['foo']]);
    });
  });

  describe('message output', () => {
    it('hydrates the message with GLFM when mounting the component', async () => {
      createComponent();
      await nextTick();
      expect(renderGFM).toHaveBeenCalled();
    });

    it('outputs errors if message has no content', async () => {
      const errors = ['foo', 'bar', 'baz'];

      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          contentHtml: '',
          content: '',
          errors,
        },
      });

      await nextTick();

      expect(findContent().text()).toContain(errors[0]);
      expect(findContent().text()).toContain(errors[1]);
      expect(findContent().text()).toContain(errors[2]);
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
        wrapper.setProps({
          message: {
            ...MOCK_USER_PROMPT_MESSAGE,
            contentHtml: `<p>${newContent}</p>`,
          },
        });
        await nextTick();
        expect(findContent().text()).not.toContain(MOCK_USER_PROMPT_MESSAGE.content);
        expect(findContent().text()).toContain(newContent);
      });

      it('prioritises the output of contentHtml over content', async () => {
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        wrapper.setProps({
          message: {
            ...MOCK_USER_PROMPT_MESSAGE,
            contentHtml: `<p>${MOCK_USER_PROMPT_MESSAGE.content}</p>`,
            content: newContent,
          },
        });
        await nextTick();
        expect(findContent().text()).not.toContain(newContent);
        expect(findContent().text()).toContain(MOCK_USER_PROMPT_MESSAGE.content);
      });

      it('outputs errors if message has no content', async () => {
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        wrapper.setProps({
          message: {
            ...MOCK_USER_PROMPT_MESSAGE,
            contentHtml: '',
            content: '',
            errors: ['error'],
          },
        });
        await nextTick();
        expect(findContent().text()).not.toContain(newContent);
        expect(findContent().text()).not.toContain(MOCK_USER_PROMPT_MESSAGE.content);
        expect(findContent().text()).toContain('error');
      });

      it('merges all the errors for output', async () => {
        const errors = ['foo', 'bar', 'baz'];
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        wrapper.setProps({
          message: {
            ...MOCK_USER_PROMPT_MESSAGE,
            contentHtml: '',
            content: '',
            errors,
          },
        });
        await nextTick();
        expect(findContent().text()).toContain(errors[0]);
        expect(findContent().text()).toContain(errors[1]);
        expect(findContent().text()).toContain(errors[2]);
      });

      it('hydrates the output message with GLFM if its not a chunk', async () => {
        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        wrapper.setProps({
          message: {
            ...MOCK_USER_PROMPT_MESSAGE,
            contentHtml: `<p>${newContent}</p>`,
          },
        });
        await nextTick();
        expect(renderGFM).toHaveBeenCalled();
      });
    });
  });

  describe('updates to the message', () => {
    const content1 = 'chunk #1';
    const content2 = ' chunk #2';
    const content3 = ' chunk #3';
    const chunk1 = {
      ...MOCK_CHUNK_RESPONSE_MESSAGE,
      content: content1,
      chunkId: 1,
    };
    const chunk2 = {
      ...MOCK_CHUNK_RESPONSE_MESSAGE,
      content: content2,
      chunkId: 2,
    };
    const chunk3 = {
      ...MOCK_CHUNK_RESPONSE_MESSAGE,
      content: content3,
      chunkId: 3,
    };

    beforeEach(() => {
      createComponent();
    });

    it('does not fail if the message has no chunkId', async () => {
      // setProps is justified here because we are testing the component's
      // reactive behavior which consistutes an exception
      // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
      wrapper.setProps({
        message: {
          ...MOCK_CHUNK_RESPONSE_MESSAGE,
          content: content1,
        },
      });
      await nextTick();
      expect(findContent().text()).toBe(content1);
    });

    it('renders chunks correctly when the chunks arrive out of order', async () => {
      // setProps is justified here because we are testing the component's
      // reactive behavior which consistutes an exception
      // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
      wrapper.setProps({
        message: chunk2,
      });
      await nextTick();
      expect(findContent().text()).toBe('');

      wrapper.setProps({
        message: chunk1,
      });
      await nextTick();
      expect(findContent().text()).toBe(content1 + content2);

      wrapper.setProps({
        message: chunk3,
      });
      await nextTick();
      expect(findContent().text()).toBe(content1 + content2 + content3);
    });

    it('renders the chunks as they arrive', async () => {
      const consolidatedContent = content1 + content2;

      // setProps is justified here because we are testing the component's
      // reactive behavior which consistutes an exception
      // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
      wrapper.setProps({
        message: chunk1,
      });
      await nextTick();
      expect(findContent().text()).toBe(content1);

      wrapper.setProps({
        message: chunk2,
      });
      await nextTick();
      expect(findContent().text()).toBe(consolidatedContent);
    });

    it('treats the initial message content as chunk if message has chunkId', async () => {
      createComponent({
        message: chunk1,
      });
      await nextTick();
      expect(findContent().text()).toBe(content1);

      // setProps is justified here because we are testing the component's
      // reactive behavior which consistutes an exception
      // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
      wrapper.setProps({
        message: chunk2,
      });
      await nextTick();
      expect(findContent().text()).toBe(content1 + content2);
    });

    it('does not hydrate the chunk messages with GLFM', async () => {
      createComponent({
        propsData: {
          message: chunk1,
        },
      });
      await nextTick();
      renderGFM.mockClear();
      expect(renderGFM).not.toHaveBeenCalled();

      // setProps is justified here because we are testing the component's
      // reactive behavior which consistutes an exception
      // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
      wrapper.setProps({
        message: chunk2,
      });
      await nextTick();
      expect(renderGFM).not.toHaveBeenCalled();
    });

    it('does not re-render when chunk is received after final message', async () => {
      const finalMessageContent = content1 + content2;

      // setProps is justified here because we are testing the component's
      // reactive behavior which consistutes an exception
      // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
      await wrapper.setProps({
        message: chunk1,
      });
      expect(findContent().text()).toBe(content1);

      await wrapper.setProps({
        message: {
          ...MOCK_RESPONSE_MESSAGE,
          content: finalMessageContent,
          contentHtml: finalMessageContent,
          chunkId: null,
        },
      });
      expect(findContent().text()).toBe(finalMessageContent);

      await wrapper.setProps({
        message: chunk2,
      });
      expect(findContent().text()).toBe(finalMessageContent);
    });

    it.each`
      content    | contentHtml | errors            | expectedContent
      ${'alpha'} | ${'beta'}   | ${['foo', 'bar']} | ${'beta'}
      ${'alpha'} | ${'beta'}   | ${[]}             | ${'beta'}
      ${'alpha'} | ${''}       | ${['foo', 'bar']} | ${'alpha'}
      ${'alpha'} | ${''}       | ${[]}             | ${'alpha'}
      ${''}      | ${'beta'}   | ${['foo', 'bar']} | ${'beta'}
      ${''}      | ${'beta'}   | ${[]}             | ${'beta'}
      ${''}      | ${''}       | ${['foo', 'bar']} | ${'foo; bar'}
    `(
      'outputs "$expectedContent" and hydrates this content when content is "$content", contentHtml is "$contentHtml" and errors is "$errors" with "chunkId: null"',
      async ({ content, contentHtml, errors, expectedContent } = {}) => {
        createComponent({
          propsData: {
            message: chunk1,
          },
        });
        renderGFM.mockClear();
        expect(renderGFM).not.toHaveBeenCalled();

        // setProps is justified here because we are testing the component's
        // reactive behavior which consistutes an exception
        // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
        wrapper.setProps({
          message: {
            ...MOCK_CHUNK_RESPONSE_MESSAGE,
            chunkId: null,
            content,
            contentHtml,
            errors,
          },
        });
        await nextTick();
        expect(renderGFM).toHaveBeenCalled();
        expect(findContent().text()).toBe(expectedContent);
      }
    );
  });
});
