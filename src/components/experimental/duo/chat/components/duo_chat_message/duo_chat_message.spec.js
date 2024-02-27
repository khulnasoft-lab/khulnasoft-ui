import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import GlDuoUserFeedback from '../../../user_feedback/user_feedback.vue';
import { MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE } from '../../mock_data';
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
    renderMarkdown = jest.fn().mockImplementation((val) => `markdown: ${val}`);
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

  describe('rendering with user message', () => {
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

    it('does not render the documentation sources component', () => {
      expect(findDocumentSources().exists()).toBe(false);
    });

    it('does not render the user feedback component', () => {
      expect(findUserFeedback().exists()).toBe(false);
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
          },
        ],
      ]);
    });
  });

  describe('message output', () => {
    it('outputs errors if they are present', async () => {
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

      const contentText = findContent().text();
      expect(contentText).toContain(errors[0]);
      expect(contentText).toContain(errors[1]);
      expect(contentText).toContain(errors[2]);
    });

    it('outputs contentHtml if it is present', async () => {
      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: 'fooHtml barHtml',
          content: 'foo bar',
          chunks: ['a', 'b', 'c'],
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
          contentHtml: '',
          content: 'foo bar',
          chunks: ['a', 'b', 'c'],
        },
      });

      await nextTick();

      expect(findContent().text()).toContain('markdown: foo bar');
    });

    it('outputs chunks if there is no content', async () => {
      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: '',
          content: '',
          chunks: ['a', 'b', 'c'],
        },
      });

      await nextTick();

      expect(findContent().text()).toContain('markdown: abc');
    });

    it('outputs chunks until first undefined', async () => {
      createComponent({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: '',
          content: '',
          chunks: ['a', undefined, 'c'],
        },
      });

      await nextTick();

      expect(findContent().text()).toContain('markdown: a');
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

      wrapper.setProps({
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          contentHtml: 'foo bar',
        },
      });

      await nextTick();
      expect(renderGFM).toHaveBeenCalled();
    });
  });

  describe('default renderers', () => {
    it('outputs errors if they are present', async () => {
      const errors = ['error1', 'error2', 'error3'];

      createComponent({
        options: {
          provide: null,
        },
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors,
          contentHtml: 'fooHtml barHtml',
          content: 'foo bar',
          chunks: ['a', 'b', 'c'],
        },
      });

      await nextTick();

      const contentText = findContent().text();
      expect(contentText).toContain(errors[0]);
      expect(contentText).toContain(errors[1]);
      expect(contentText).toContain(errors[2]);
    });

    it('outputs contentHtml if it is present', async () => {
      createComponent({
        options: {
          provide: null,
        },
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: 'fooHtml barHtml',
          content: 'foo bar',
          chunks: ['a', 'b', 'c'],
        },
      });

      await nextTick();

      expect(findContent().html()).toBe(
        '<div class="gl-markdown gl-compact-markdown">fooHtml barHtml</div>'
      );
    });

    it('outputs markdown content if there is no contentHtml', async () => {
      createComponent({
        options: {
          provide: null,
        },
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: '',
          content: 'foo bar',
          chunks: ['a', 'b', 'c'],
        },
      });

      await nextTick();

      expect(findContent().html()).toBe('<div>\n  <p>foo bar</p>\n</div>');
    });

    it('outputs chunks if there is no content', async () => {
      createComponent({
        options: {
          provide: null,
        },
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: '',
          content: '',
          chunks: ['a', 'b', 'c'],
        },
      });

      await nextTick();

      expect(findContent().html()).toBe('<div>\n  <p>abc</p>\n</div>');
    });

    it('sanitizes html produced by errors', async () => {
      createComponent({
        options: {
          provide: null,
        },
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: ['[click here](javascript:prompt(1))'],
          contentHtml: '',
          content: '',
          chunks: [],
        },
      });

      await nextTick();

      expect(findContent().html()).toBe('<div>\n  <p><a>click here</a></p>\n</div>');
    });

    it('sanitizes html produced by content', async () => {
      createComponent({
        options: {
          provide: null,
        },
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: '',
          content: '[click here](javascript:prompt(1))',
          chunks: [],
        },
      });

      await nextTick();

      expect(findContent().html()).toBe('<div>\n  <p><a>click here</a></p>\n</div>');
    });

    it('sanitizes html produced by chunks', async () => {
      createComponent({
        options: {
          provide: null,
        },
        message: {
          ...MOCK_USER_PROMPT_MESSAGE,
          errors: [],
          contentHtml: '',
          content: '',
          chunks: ['[click here]', '(javascript:prompt(1))'],
        },
      });

      await nextTick();

      expect(findContent().html()).toBe('<div>\n  <p><a>click here</a></p>\n</div>');
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
  });
});
