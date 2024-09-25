import { h, nextTick } from 'vue';
import { mount, shallowMount } from '@vue/test-utils';
import * as Vue from 'vue';
import GlEmptyState from '../../../regions/empty_state/empty_state.vue';
import GlExperimentBadge from '../../experiment_badge/experiment_badge.vue';
import GlCard from '../../../base/card/card.vue';
import GlDropdownItem from '../../../base/dropdown/dropdown_item.vue';
import GlPopover from '../../../base/popover/popover.vue';
import DuoChatLoader from './components/duo_chat_loader/duo_chat_loader.vue';
import DuoChatPredefinedPrompts from './components/duo_chat_predefined_prompts/duo_chat_predefined_prompts.vue';
import DuoChatConversation from './components/duo_chat_conversation/duo_chat_conversation.vue';
import GlDuoChat from './duo_chat.vue';
import {
  INCLUDE_SLASH_COMMAND,
  MOCK_RESPONSE_MESSAGE,
  MOCK_USER_PROMPT_MESSAGE,
  SLASH_COMMANDS as slashCommands,
} from './mock_data';

import {
  MESSAGE_MODEL_ROLES,
  CHAT_RESET_MESSAGE,
  CHAT_CLEAN_MESSAGE,
  CHAT_CLEAR_MESSAGE,
  CHAT_INCLUDE_MESSAGE,
} from './constants';

const invalidSlashCommands = [
  {
    name: '/foo',
  },
  {
    description: '/bar',
  },
  {
    shouldSubmit: true,
  },
];

const mockContextItemMenuHandleKeyUp = jest.fn();
const MockContextItemMenu = {
  name: 'MockContextItemMenu',
  template: '<div>Mock context item menu</div>',
  props: ['open'],
  methods: {
    handleKeyUp: mockContextItemMenuHandleKeyUp,
  },
};

const generatePartialSlashCommands = () => {
  const res = [];
  slashCommands.forEach((command) => {
    res.push(command.name.slice(0, command.name.length - 1));
  });
  return res;
};

describe('GlDuoChat', () => {
  let scrollIntoViewMock;
  let wrapper;

  const createComponent = ({
    propsData = {},
    slots = {},
    scopedSlots = {},
    mountFn = shallowMount,
  } = {}) => {
    jest.spyOn(DuoChatLoader.methods, 'computeTransitionWidth').mockImplementation();

    wrapper = mountFn(GlDuoChat, {
      propsData,
      slots,
      scopedSlots,
      stubs: {
        DuoChatLoader,
        GlEmptyState,
        GlDuoChatContextItemMenu: MockContextItemMenu,
        GlPopover,
      },
    });
  };

  const findChatComponent = () => wrapper.find('[data-testid="chat-component"]');
  const findChatHistoryComponent = () => wrapper.find('[data-testid="chat-history"]');
  const findCloseButton = () => wrapper.find('[data-testid="chat-close-button"]');
  const findChatConversations = () => wrapper.findAllComponents(DuoChatConversation);
  const findCustomLoader = () => wrapper.findComponent(DuoChatLoader);
  const findError = () => wrapper.find('[data-testid="chat-error"]');
  const findHeader = () => wrapper.find('[data-testid="chat-header"]');
  const findFooter = () => wrapper.find('[data-testid="chat-footer"]');
  const findPromptForm = () => wrapper.find('[data-testid="chat-prompt-form"]');
  const findBadge = () => wrapper.findComponent(GlExperimentBadge);
  const findEmptyState = () => wrapper.findComponent(GlEmptyState);
  const findEmptyStateDescription = () =>
    wrapper.find('[data-testid="gl-duo-chat-empty-state-description"]');
  const findEmptyStateSecondaryDescription = () =>
    wrapper.find('[data-testid="gl-duo-chat-empty-state-secondary-description"]');
  const findPredefined = () => wrapper.findComponent(DuoChatPredefinedPrompts);
  const findChatInput = () => wrapper.find('[data-testid="chat-prompt-input"]');
  const findCloseChatButton = () => wrapper.find('[data-testid="chat-close-button"]');
  const findSlashCommandsCard = () => wrapper.findComponent(GlCard);
  const findSlashCommands = () => wrapper.findAllComponents(GlDropdownItem);
  const findSelectedSlashCommand = () => wrapper.find('.active-command');
  const findSubmitButton = () => wrapper.find('[data-testid="chat-prompt-submit-button"]');
  const findCancelButton = () => wrapper.find('[data-testid="chat-prompt-cancel-button"]');
  const findContextItemMenu = () => wrapper.findComponent(MockContextItemMenu);
  const findIncludeSlashCommand = () =>
    findSlashCommands().wrappers.find((w) => w.text().includes(CHAT_INCLUDE_MESSAGE));

  const setPromptInput = (val) => findChatInput().vm.$emit('input', val);

  beforeEach(() => {
    scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  const promptStr = 'foo';
  const messages = [
    {
      role: MESSAGE_MODEL_ROLES.user,
      content: promptStr,
    },
  ];

  describe('rendering', () => {
    it('does not fail if no messages are passed', () => {
      createComponent({
        propsData: { messages: null },
      });

      expect(findChatConversations()).toHaveLength(0);
      expect(findEmptyState().exists()).toBe(true);
    });

    it.each`
      desc                                  | component            | shouldRender
      ${'renders root component'}           | ${findChatComponent} | ${true}
      ${'renders experimental label'}       | ${findBadge}         | ${true}
      ${'renders empty state'}              | ${findEmptyState}    | ${true}
      ${'renders predefined prompts'}       | ${findPredefined}    | ${true}
      ${'does not render loading skeleton'} | ${findCustomLoader}  | ${false}
      ${'does not render chat error'}       | ${findError}         | ${false}
      ${'does render chat input'}           | ${findChatInput}     | ${true}
    `('$desc', ({ component, shouldRender }) => {
      createComponent();

      expect(component().exists()).toBe(shouldRender);
    });

    it('does not render the experimental label if it is explicitely disabled', () => {
      createComponent({
        propsData: {
          badgeType: null,
        },
      });
      expect(findBadge().exists()).toBe(false);
    });

    describe('when messages exist', () => {
      it('scrolls to the bottom on load', async () => {
        createComponent({ propsData: { messages } });

        await nextTick();

        expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('conversations', () => {
      it('renders conversation with correct props', () => {
        const newMessages = [
          {
            role: MESSAGE_MODEL_ROLES.user,
            content: 'How are you?',
          },
          {
            role: MESSAGE_MODEL_ROLES.assistant,
            content: 'Great!',
          },
        ];
        const canceledRequestIds = [1];
        createComponent({ propsData: { messages: newMessages, canceledRequestIds } });
        expect(findChatConversations().at(0).props('messages')).toEqual(newMessages);
        expect(findChatConversations().at(0).props('canceledRequestIds')).toEqual(
          canceledRequestIds
        );
        expect(findChatConversations().at(0).props('showDelimiter')).toEqual(false);
      });

      it('renders one conversation when no reset message is present', () => {
        const newMessages = [
          {
            role: MESSAGE_MODEL_ROLES.user,
            content: 'How are you?',
          },
          {
            role: MESSAGE_MODEL_ROLES.assistant,
            content: 'Great!',
          },
        ];
        createComponent({ propsData: { messages: newMessages } });

        expect(findChatConversations().length).toEqual(1);
        expect(findChatConversations().at(0).props('showDelimiter')).toEqual(false);
      });

      it('does not render conversations when no message is present', () => {
        createComponent({ propsData: { messages: [] } });

        expect(findChatConversations().length).toEqual(0);
      });

      it('splits it up into multiple conversations when reset message is present', () => {
        const newMessages = [
          {
            role: MESSAGE_MODEL_ROLES.user,
            content: 'Message 1',
          },
          {
            role: MESSAGE_MODEL_ROLES.assistant,
            content: 'Great!',
          },
          {
            role: MESSAGE_MODEL_ROLES.user,
            content: CHAT_RESET_MESSAGE,
          },
        ];
        createComponent({ propsData: { messages: newMessages } });

        expect(findChatConversations().length).toEqual(2);
        expect(findChatConversations().at(0).props('showDelimiter')).toEqual(false);
        expect(findChatConversations().at(1).props('showDelimiter')).toEqual(true);
      });

      it('correctly passes payload when insert-code-snippet event is emitted from a conversation', () => {
        createComponent({ propsData: { messages } });

        findChatConversations().at(0).vm.$emit('insert-code-snippet', 'foo');
        expect(wrapper.emitted()['insert-code-snippet'][0]).toEqual(['foo']);
      });
    });

    describe('slots', () => {
      const slotContent = 'As Gregor Samsa awoke one morning from uneasy dreams';

      it.each`
        slot           | content        | isChatAvailable
        ${'subheader'} | ${slotContent} | ${false}
        ${'subheader'} | ${slotContent} | ${true}
      `(
        'renders the $content passed to the $slot slot when isChatAvailable is $isChatAvailable',
        ({ slot, content, isChatAvailable }) => {
          createComponent({
            propsData: { isChatAvailable },
            slots: { [slot]: content },
          });
          expect(wrapper.text()).toContain(content);
        }
      );
    });

    it('sets correct props on the Experiment badge', () => {
      const badgeHelpPageUrl = 'https://foo.bar';
      const containerId = 'chat-component';
      createComponent({ propsData: { badgeHelpPageUrl } });
      expect(findBadge().props('helpPageUrl')).toBe(badgeHelpPageUrl);
      expect(findBadge().attributes('container-id')).toBe(containerId);
    });

    it.each`
      badgeType       | expectedProp
      ${'experiment'} | ${'experiment'}
      ${'beta'}       | ${'beta'}
      ${undefined}    | ${'experiment'}
    `(
      'sets correct props on the Experiment badge when badgeType is "$badgeType"',
      ({ badgeType, expectedProp }) => {
        createComponent({ propsData: { badgeType } });
        expect(findBadge().props('type')).toBe(expectedProp);
      }
    );

    describe('showHeader', () => {
      it.each`
        desc                 | showHeader   | shouldRender
        ${'renders'}         | ${undefined} | ${true}
        ${'does not render'} | ${false}     | ${false}
        ${'renders'}         | ${true}      | ${true}
      `('$desc the header when  showHeader is "$showHeader"', ({ showHeader, shouldRender }) => {
        createComponent({ propsData: { showHeader } });
        expect(findHeader().exists()).toBe(shouldRender);
      });
    });

    describe('emptyStateTitle', () => {
      it.each`
        emptyStateTitle   | expectedTitle
        ${undefined}      | ${'Ask a question'}
        ${''}             | ${''}
        ${'custom title'} | ${'custom title'}
      `(
        'displays "$expectedTitle" when emptyStateTitle is "$emptyStateTitle"',
        ({ emptyStateTitle, expectedTitle }) => {
          createComponent({ propsData: { emptyStateTitle } });
          expect(findEmptyState().props('title')).toBe(expectedTitle);
        }
      );
    });

    describe('emptyStateDescription', () => {
      it.each`
        emptyStateDescription   | expectedDescription
        ${undefined}            | ${'GitLab Duo Chat is your AI-powered assistant.'}
        ${''}                   | ${''}
        ${'custom description'} | ${'custom description'}
      `(
        'displays "$expectedDescription" when emptyStateDescription is "$emptyStateDescription"',
        ({ emptyStateDescription, expectedDescription }) => {
          createComponent({ propsData: { emptyStateDescription } });
          expect(findEmptyStateDescription().text()).toBe(expectedDescription);
        }
      );
    });

    describe('emptyStateSecondaryDescription', () => {
      it.each`
        emptyStateSecondaryDescription | expectedDescription
        ${undefined}                   | ${'Responses may be inaccurate. Verify before use.'}
        ${''}                          | ${''}
        ${'custom description'}        | ${'custom description'}
      `(
        'displays "$expectedDescription" when emptyStateSecondaryDescription is "$emptyStateSecondaryDescription"',
        ({ emptyStateSecondaryDescription, expectedDescription }) => {
          createComponent({ propsData: { emptyStateSecondaryDescription } });
          expect(findEmptyStateSecondaryDescription().text()).toBe(expectedDescription);
        }
      );
    });

    describe('prompt placeholder', () => {
      it.each`
        chatPromptPlaceholder   | commands         | expectedPlaceholder
        ${undefined}            | ${undefined}     | ${'GitLab Duo Chat'}
        ${''}                   | ${undefined}     | ${'GitLab Duo Chat'}
        ${'custom placeholder'} | ${undefined}     | ${'custom placeholder'}
        ${undefined}            | ${[]}            | ${'GitLab Duo Chat'}
        ${''}                   | ${[]}            | ${'GitLab Duo Chat'}
        ${'custom placeholder'} | ${[]}            | ${'custom placeholder'}
        ${undefined}            | ${slashCommands} | ${'Type "/" for slash commands'}
        ${''}                   | ${slashCommands} | ${'Type "/" for slash commands'}
        ${'custom placeholder'} | ${slashCommands} | ${'custom placeholder'}
      `(
        'displays "$expectedPlaceholder" when chatPromptPlaceholder is "$chatPromptPlaceholder", and slashCommands are "$commands"',
        ({ chatPromptPlaceholder, commands, expectedPlaceholder }) => {
          createComponent({ propsData: { chatPromptPlaceholder, slashCommands: commands } });
          expect(findChatInput().attributes('placeholder')).toBe(expectedPlaceholder);
        }
      );
    });
  });

  describe('chat', () => {
    const clickSubmit = () =>
      findPromptForm().vm.$emit('submit', {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });

    it('does render the prompt input by default', () => {
      createComponent({ propsData: { messages } });
      expect(findChatInput().exists()).toBe(true);
    });

    it('does not render the prompt input if `isChatAvailable` prop is `false`', () => {
      createComponent({ propsData: { messages, isChatAvailable: false } });
      expect(findChatInput().exists()).toBe(false);
    });

    describe('submit/cancel button', () => {
      beforeEach(() => {
        createComponent({ propsData: {}, mountFn: mount });
      });

      it('renders the submitButton initially', () => {
        expect(findSubmitButton().exists()).toBe(true);
        expect(findCancelButton().exists()).toBe(false);
      });

      it('renders the cancel button after prompt was submitted', async () => {
        await setPromptInput('TEST!');
        clickSubmit();
        await nextTick();
        expect(findSubmitButton().exists()).toBe(false);
        expect(findCancelButton().exists()).toBe(true);
      });

      it('renders submit button after request was canceled', async () => {
        await setPromptInput('TEST!');
        clickSubmit();
        await nextTick();

        const cancelButton = findCancelButton();
        await cancelButton.trigger('click');
        await nextTick();

        expect(findSubmitButton().exists()).toBe(true);
        expect(findCancelButton().exists()).toBe(false);
      });
    });

    describe('submit', () => {
      const ENTER = 'Enter';

      it('trims the prompt', () => {
        const question = ' foo bar ';
        const expectedPrompt = 'foo bar';
        createComponent({
          propsData: { isChatAvailable: true, messages: [] },
        });
        setPromptInput(question);
        clickSubmit();
        expect(wrapper.emitted('send-chat-prompt')).toEqual([[expectedPrompt]]);
      });

      it.each`
        trigger                                                                      | event                                | action          | expectEmitted
        ${() => clickSubmit()}                                                       | ${'Submit button click'}             | ${'submit'}     | ${[[promptStr]]}
        ${() => findChatInput().trigger('keyup', { key: ENTER })}                    | ${`Clicking ${ENTER}`}               | ${'submit'}     | ${[[promptStr]]}
        ${() => findChatInput().trigger('keyup', { key: ENTER, metaKey: true })}     | ${`Clicking ${ENTER} + ⌘`}           | ${'not submit'} | ${undefined}
        ${() => findChatInput().trigger('keyup', { key: ENTER, altKey: true })}      | ${`Clicking ${ENTER} + ⎇`}           | ${'not submit'} | ${undefined}
        ${() => findChatInput().trigger('keyup', { key: ENTER, shiftKey: true })}    | ${`Clicking ${ENTER} + ⬆︎`}         | ${'not submit'} | ${undefined}
        ${() => findChatInput().trigger('keyup', { key: ENTER, ctrlKey: true })}     | ${`Clicking ${ENTER} + CTRL`}        | ${'not submit'} | ${undefined}
        ${() => findChatInput().trigger('keyup', { key: ENTER, isComposing: true })} | ${`Clicking ${ENTER} + isComposing`} | ${'not submit'} | ${undefined}
      `('$event should $action the prompt form', ({ trigger, expectEmitted } = {}) => {
        createComponent({
          propsData: { messages: [], isChatAvailable: true },
        });
        setPromptInput(promptStr);
        trigger();
        expect(wrapper.emitted('send-chat-prompt')).toEqual(expectEmitted);
      });

      it('on composition, discards the first enter after composition has ended', async () => {
        // IMEs allow the user to edit the composition after the composition has ended, which requires another press on
        // enter to confirm the composition
        createComponent({
          propsData: { messages: [], isChatAvailable: true },
        });

        setPromptInput(promptStr);

        await findChatInput().vm.$emit('compositionend');

        await findChatInput().trigger('keyup', { key: ENTER });

        expect(wrapper.emitted('send-chat-prompt')).toBeUndefined();

        await findChatInput().trigger('keyup', { key: ENTER });

        expect(wrapper.emitted('send-chat-prompt')).toEqual([[promptStr]]);
      });

      it.each`
        desc                                              | msgs
        ${''}                                             | ${[]}
        ${'with just a user message'}                     | ${[MOCK_USER_PROMPT_MESSAGE]}
        ${'with a user message, and a complete response'} | ${[MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE]}
      `('prevents submission when loading $desc', async ({ msgs } = {}) => {
        createComponent({
          propsData: { isChatAvailable: true, messages: msgs },
        });

        setPromptInput(promptStr);
        clickSubmit();
        await nextTick();

        expect(wrapper.emitted('send-chat-prompt')).toEqual([[promptStr]]);

        setPromptInput(promptStr);
        clickSubmit();
        await nextTick();

        expect(wrapper.emitted('send-chat-prompt').length).toBe(1);
      });

      it.each([
        [[{ ...MOCK_RESPONSE_MESSAGE, content: undefined, chunks: [''] }]],
        [
          [
            MOCK_USER_PROMPT_MESSAGE,
            { ...MOCK_RESPONSE_MESSAGE, content: undefined, chunks: [''] },
          ],
        ],
        [[{ ...MOCK_RESPONSE_MESSAGE, chunkId: 1 }]],
      ])('prevents submission when streaming (messages = "%o")', async (msgs = []) => {
        createComponent({
          propsData: { isChatAvailable: true, messages: msgs },
        });

        setPromptInput(promptStr);
        clickSubmit();
        await nextTick();

        expect(wrapper.emitted('send-chat-prompt')).toEqual([[promptStr]]);

        setPromptInput(promptStr);
        clickSubmit();
        await nextTick();

        expect(wrapper.emitted('send-chat-prompt').length).toBe(1);
      });

      it('resets the prompt after form submission', async () => {
        createComponent();
        await setPromptInput(promptStr);
        expect(findChatInput().props('value')).toBe(promptStr);

        clickSubmit();
        await nextTick();

        expect(findChatInput().props('value')).toBe('');
      });

      it('focuses on prompt after form submission', async () => {
        const focusSpy = jest.fn();
        jest.spyOn(HTMLElement.prototype, 'focus').mockImplementation(function focusMockImpl() {
          focusSpy(this);
        });
        createComponent();
        await setPromptInput('TEST!');

        clickSubmit();
        await nextTick();

        expect(focusSpy).toHaveBeenCalledWith(findChatInput().element);
      });
    });

    describe('clean / clear', () => {
      it('does not render cancel button on clean', async () => {
        createComponent({
          propsData: { messages, isChatAvailable: true },
          mountFn: mount,
        });
        setPromptInput(CHAT_CLEAN_MESSAGE);
        clickSubmit();

        await nextTick();
        expect(findSubmitButton().exists()).toBe(true);
        expect(findCancelButton().exists()).toBe(false);
      });

      it('does not render cancel button on clear', async () => {
        createComponent({
          propsData: { messages, isChatAvailable: true },
          mountFn: mount,
        });
        setPromptInput(CHAT_CLEAR_MESSAGE);
        clickSubmit();

        await nextTick();
        expect(findSubmitButton().exists()).toBe(true);
        expect(findCancelButton().exists()).toBe(false);
      });
    });

    describe('reset', () => {
      it('emits the event with the reset prompt', async () => {
        createComponent({
          propsData: { messages, isChatAvailable: true },
          mountFn: mount,
        });
        setPromptInput(CHAT_RESET_MESSAGE);
        clickSubmit();

        expect(wrapper.emitted('send-chat-prompt')).toEqual([[CHAT_RESET_MESSAGE]]);
        expect(findChatConversations().length).toEqual(1);
        await nextTick();
        expect(findSubmitButton().exists()).toBe(true);
        expect(findCancelButton().exists()).toBe(false);
      });

      it('reset does nothing when chat is loading', () => {
        createComponent({
          propsData: { messages, isChatAvailable: true, isLoading: true },
        });
        setPromptInput(CHAT_RESET_MESSAGE);
        clickSubmit();

        expect(wrapper.emitted('send-chat-prompt')).toBeUndefined();
        expect(findChatConversations().length).toEqual(1);
      });

      it('reset does nothing when there are no messages', () => {
        createComponent({
          propsData: { messages: [], isChatAvailable: true },
        });
        setPromptInput(CHAT_RESET_MESSAGE);
        clickSubmit();

        expect(wrapper.emitted('send-chat-prompt')).toBeUndefined();
        expect(findChatConversations().length).toEqual(0);
      });

      it('reset does nothing when last message was a reset message', () => {
        const existingMessages = [
          ...messages,
          {
            role: MESSAGE_MODEL_ROLES.user,
            content: CHAT_RESET_MESSAGE,
          },
        ];
        createComponent({
          propsData: {
            isLoading: false,
            messages: existingMessages,
            isChatAvailable: true,
          },
        });
        setPromptInput(CHAT_RESET_MESSAGE);
        clickSubmit();

        expect(wrapper.emitted('send-chat-prompt')).toBeUndefined();

        expect(findChatConversations().length).toEqual(2);
        expect(findChatConversations().at(0).props('messages')).toEqual(messages);
        expect(findChatConversations().at(1).props('messages')).toEqual([]);
      });
    });

    describe('cancel', () => {
      it('emits cancel event on cancel button click', async () => {
        createComponent({ propsData: {}, mountFn: mount });
        await setPromptInput('TEST!');
        clickSubmit();
        await nextTick();
        const cancelButton = findCancelButton();
        expect(cancelButton.exists()).toBe(true);
        await cancelButton.trigger('click');
        expect(wrapper.emitted('chat-cancel').length).toBe(1);
      });

      it('cancel button toggles correctly when last message contains incomplete stream chunks', async () => {
        const unfinishedStreamMessage = { ...MOCK_RESPONSE_MESSAGE, chunkId: 1 };
        const propsBase = () => ({
          messages: [unfinishedStreamMessage],
          canceledRequestIds: [MOCK_RESPONSE_MESSAGE.requestId],
          isLoading: false,
        });
        createComponent({ propsData: propsBase(), mountFn: mount });

        // Expect submit button
        expect(findSubmitButton().exists()).toBe(true);
        expect(findCancelButton().exists()).toBe(false);

        // User submits a new prompt, which resets button state
        await setPromptInput('TEST!');
        clickSubmit();
        await nextTick();

        // Expect cancel button
        expect(findSubmitButton().exists()).toBe(false);
        expect(findCancelButton().exists()).toBe(true);

        // User message is added
        wrapper.setProps({
          ...propsBase(),
          messages: [unfinishedStreamMessage, MOCK_USER_PROMPT_MESSAGE],
        });
        await nextTick();

        // This should not reset the button state
        // Expect cancel button
        expect(findSubmitButton().exists()).toBe(false);
        expect(findCancelButton().exists()).toBe(true);

        // Set isLoading to true
        wrapper.setProps({
          ...propsBase(),
          messages: [unfinishedStreamMessage, MOCK_USER_PROMPT_MESSAGE],
          isLoading: true,
        });
        await nextTick();

        // Expect cancel button
        expect(findSubmitButton().exists()).toBe(false);
        expect(findCancelButton().exists()).toBe(true);
      });
    });

    describe('when chat has a content-items-menu component in slot', () => {
      beforeEach(() => {
        createComponent({
          mountFn: mount,
          propsData: {
            slashCommands: [...slashCommands, INCLUDE_SLASH_COMMAND],
            predefinedPrompts: ['Foo bar baz?'],
          },
          scopedSlots: {
            'context-items-menu': ({ isOpen, setRef, onClose, focusPrompt }) => {
              // Vue 2/3 vNode creation has different structure
              return Vue.version.startsWith('3')
                ? h(MockContextItemMenu, {
                    open: isOpen,
                    onClose,
                    onFocusPrompt: focusPrompt,
                    ref: setRef,
                  })
                : h(MockContextItemMenu, {
                    props: {
                      open: isOpen,
                    },
                    on: {
                      close: onClose,
                      'focus-prompt': focusPrompt,
                    },
                    ref: setRef,
                  });
            },
          },
        });
      });

      it('does not open context menu by default', () => {
        expect(findContextItemMenu().exists()).toBe(true);
        expect(findContextItemMenu().props('open')).toBe(false);
      });

      it('shows "/include" slash command in list', async () => {
        await setPromptInput('/');
        await nextTick();

        expect(findIncludeSlashCommand().exists()).toBe(true);
      });

      it.each(['/include', '/incl'])(
        'opens context menu when running "%s" command',
        async (command) => {
          await setPromptInput(command);
          await nextTick();

          findChatInput().trigger('keyup', { key: 'Enter' });
          await nextTick();
          await nextTick();

          expect(findContextItemMenu().props('open')).toBe(true);
        }
      );

      it('opens context menu when manually typing full "/include" command', async () => {
        await setPromptInput('/include');
        await nextTick();

        findChatInput().trigger('keyup', { key: '' });
        await nextTick();

        expect(findContextItemMenu().props('open')).toBe(true);
      });

      describe('when the context menu is open', () => {
        beforeEach(async () => {
          await setPromptInput('/include');
          await nextTick();

          findChatInput().trigger('keyup', { key: 'Enter' });
          await nextTick();
        });

        it('does not show the slash command menu', () => {
          expect(findSlashCommandsCard().exists()).toBe(false);
        });

        it('closes context menu when calling onClose', async () => {
          findContextItemMenu().vm.$emit('close');
          await nextTick();

          expect(findContextItemMenu().props('open')).toBe(false);
        });

        it('closes context menu when clicking a predefined prompt', async () => {
          findPredefined().vm.$emit('click', 'Some predefined prompt');
          await nextTick();

          expect(findContextItemMenu().props('open')).toBe(false);
        });

        it.each(['/', '', 'how does bread?'])(
          'closes context menu when prompt is modified to "%s"',
          async (newPrompt) => {
            await setPromptInput(newPrompt);
            findChatInput().trigger('keyup', { key: 'ArrowRight' });
            await nextTick();

            expect(findContextItemMenu().props('open')).toBe(false);
          }
        );

        it('focuses on prompt when calling focusPrompt', async () => {
          const focusSpy = jest.fn();
          jest.spyOn(HTMLElement.prototype, 'focus').mockImplementation(function focusMockImpl() {
            focusSpy(this);
          });

          findContextItemMenu().vm.$emit('focus-prompt');
          await nextTick();

          expect(focusSpy).toHaveBeenCalledWith(findChatInput().element);
        });

        it('passes keyboard events to component ref when the menu is open', async () => {
          findChatInput().trigger('keyup', { key: 'ArrowDown' });
          expect(mockContextItemMenuHandleKeyUp).toHaveBeenCalledWith(
            expect.objectContaining({ key: 'ArrowDown' })
          );

          findChatInput().trigger('keyup', { key: 'ArrowUp' });
          expect(mockContextItemMenuHandleKeyUp).toHaveBeenCalledWith(
            expect.objectContaining({ key: 'ArrowUp' })
          );

          findChatInput().trigger('keyup', { key: 'Z' });
          expect(mockContextItemMenuHandleKeyUp).toHaveBeenCalledWith(
            expect.objectContaining({ key: 'Z' })
          );
        });
      });
    });

    describe('refs used by external consumers', () => {
      // VSCode uses the prompt ref to manually trigger focus in the prompt input when running some VSCode commands
      // https://gitlab.com/gitlab-org/gitlab-vscode-extension/blob/main/webviews/vue2/gitlab_duo_chat/src/App.vue#L112
      describe('prompt ref', () => {
        it('adds prompt ref which external consumer uses', async () => {
          createComponent({ propsData: { messages }, mountFn: mount });
          await nextTick();

          expect(wrapper.vm.$refs.prompt).toBeDefined();
          expect(wrapper.vm.$refs.prompt.$el.focus).toEqual(expect.any(Function));
        });
      });
    });
  });

  describe('when closed', () => {
    beforeEach(async () => {
      createComponent();

      findCloseButton().vm.$emit('click');
      await nextTick();
    });

    it('is hidden', () => {
      expect(findChatComponent().exists()).toBe(false);
    });

    it('when starts loading, resets hidden status', async () => {
      // setProps is justified here because we are testing the component's
      // reactive behavior which consistutes an exception
      // See https://docs.gitlab.com/ee/development/fe_guide/style/vue.html#setting-component-state
      wrapper.setProps({
        isLoading: true,
      });
      await nextTick();
      expect(findChatComponent().exists()).toBe(true);
    });
  });

  describe('interaction', () => {
    it('renders custom loader when isLoading', () => {
      createComponent({ propsData: { isLoading: true } });
      expect(findCustomLoader().exists()).toBe(true);
    });

    it('renders alert if error', () => {
      const errorMessage = 'Something went Wrong';
      createComponent({ propsData: { error: errorMessage } });
      expect(findError().text()).toBe(errorMessage);
    });

    it('hides the chat on button click and emits an event', async () => {
      createComponent({ propsData: { messages } });
      expect(findChatComponent().exists()).toBe(true);
      findCloseChatButton().vm.$emit('click');
      await nextTick();
      expect(findChatComponent().exists()).toBe(false);
      expect(wrapper.emitted('chat-hidden')).toBeDefined();
    });

    it('does not render the empty state when there are messages available', () => {
      createComponent({ propsData: { messages } });
      expect(findEmptyState().exists()).toBe(false);
    });

    describe('scrolling', () => {
      let element;

      const setupScrolledToBottom = () => {
        jest.spyOn(element, 'scrollTop', 'get').mockReturnValue(100);
        jest.spyOn(element, 'offsetHeight', 'get').mockReturnValue(100);
        jest.spyOn(element, 'scrollHeight', 'get').mockReturnValue(200);
      };

      const setupScrolledUp = () => {
        jest.spyOn(element, 'scrollTop', 'get').mockReturnValue(50);
        jest.spyOn(element, 'offsetHeight', 'get').mockReturnValue(100);
        jest.spyOn(element, 'scrollHeight', 'get').mockReturnValue(200);
      };

      beforeEach(() => {
        createComponent({ propsData: { messages, isChatAvailable: true } });
        element = findChatHistoryComponent().element;
      });

      it('when scrolling to the bottom it removes the scrim class', async () => {
        setupScrolledToBottom();

        findChatHistoryComponent().trigger('scroll');
        await nextTick();

        expect(findFooter().classes()).not.toContain('duo-chat-drawer-body-scrim-on-footer');
      });

      it('when scrolling up it adds the scrim class', async () => {
        setupScrolledUp();

        findChatHistoryComponent().trigger('scroll');
        await nextTick();

        expect(findFooter().classes()).toContain('duo-chat-drawer-body-scrim-on-footer');
      });

      it('scrolls chat to bottom when a new message is received', async () => {
        setupScrolledToBottom();
        scrollIntoViewMock.mockClear();

        findChatHistoryComponent().trigger('scroll');
        await nextTick();

        expect(scrollIntoViewMock).toHaveBeenCalledTimes(0);

        wrapper.setProps({
          messages: [...messages, MOCK_USER_PROMPT_MESSAGE],
        });
        await nextTick(); // allow messages "watch" to run
        await nextTick(); // then scrollToBottom waits for nextTick

        expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
      });

      describe('when the user has explicitly scrolled up', () => {
        beforeEach(() => {
          setupScrolledUp();
          scrollIntoViewMock.mockClear();

          findChatHistoryComponent().trigger('scroll');
          return nextTick();
        });

        it('does not scroll chat to bottom when a new assistant message is received', async () => {
          expect(scrollIntoViewMock).toHaveBeenCalledTimes(0);

          wrapper.setProps({
            messages: [...messages, MOCK_RESPONSE_MESSAGE],
          });
          await nextTick(); // allow messages "watch" to run
          await nextTick(); // then scrollToBottom would wait for nextTick

          expect(scrollIntoViewMock).toHaveBeenCalledTimes(0);
        });

        it('does scrolls chat to bottom when a new user message is received', async () => {
          expect(scrollIntoViewMock).toHaveBeenCalledTimes(0);

          wrapper.setProps({
            messages: [...messages, MOCK_USER_PROMPT_MESSAGE],
          });
          await nextTick(); // allow messages "watch" to run
          await nextTick(); // then scrollToBottom would wait for nextTick

          expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('predefined prompts', () => {
      const prompts = ['what is a fork'];

      beforeEach(() => {
        createComponent({ propsData: { predefinedPrompts: prompts } });
      });

      it('passes on predefined prompts', () => {
        expect(findPredefined().props().prompts).toEqual(prompts);
      });

      it('listens to the click event and sends the predefined prompt', async () => {
        findPredefined().vm.$emit('click', prompts[0]);

        await nextTick();

        expect(wrapper.emitted('send-chat-prompt')).toEqual([[prompts[0]]]);
      });
    });
  });

  describe('slash commands', () => {
    const slashCommandsNames = slashCommands.map((command) => command.name);
    const slashCommandsOnly = (commands = []) =>
      slashCommandsNames.filter((name) => commands.includes(name));

    describe('rendering', () => {
      describe('without slash commands', () => {
        it('does not render slash commands by default', () => {
          createComponent();
          expect(findSlashCommandsCard().exists()).toBe(false);
        });

        it('does not render slash commands when prompt is "/"', async () => {
          createComponent();
          setPromptInput('/');

          await nextTick();
          expect(findSlashCommandsCard().exists()).toBe(false);
        });
      });

      describe('with slash commands', () => {
        it('does not render slash commands by default', async () => {
          createComponent({
            propsData: {
              slashCommands,
            },
          });

          await nextTick();
          expect(findSlashCommandsCard().exists()).toBe(false);
        });

        it('renders all slash commands when prompt is "/"', async () => {
          createComponent({
            propsData: {
              slashCommands,
            },
          });
          setPromptInput('/');

          await nextTick();
          expect(findSlashCommandsCard().exists()).toBe(true);
          expect(findSlashCommands()).toHaveLength(slashCommands.length);

          slashCommands.forEach((command, index) => {
            expect(findSlashCommands().at(index).text()).toContain(command.name);
            expect(findSlashCommands().at(index).text()).toContain(command.description);
          });
        });

        it('prevents passing down invalid slash commands', () => {
          expect(() => {
            wrapper = shallowMount(GlDuoChat, {
              propsData: {
                slashCommands: [...slashCommands, ...invalidSlashCommands],
              },
            });
          }).toHaveLength(0);
        });

        it('does not render the "/include" command when there is no context-menu component rendered in the named slot', async () => {
          createComponent({
            mountFn: mount,
            propsData: {
              slashCommands: [...slashCommands, INCLUDE_SLASH_COMMAND],
            },
            scopedSlots: {},
          });
          setPromptInput('/');

          await nextTick();

          expect(findIncludeSlashCommand()).toBeUndefined();
        });

        describe('when the prompt includes the "/" character or no characters', () => {
          it.each(['', '//', '\\', 'foo', '/foo'])(
            'does not render the slash commands if prompt is "$prompt"',
            async (prompt) => {
              createComponent({
                propsData: {
                  slashCommands,
                },
              });
              setPromptInput(prompt);

              await nextTick();
              expect(findSlashCommandsCard().exists()).toBe(false);
            }
          );
        });

        describe('when prompt presents a partial match to an existing slash command', () => {
          it.each(generatePartialSlashCommands())(
            'renders the slash commands when prompt is "%s" and is a partial match',
            async (prompt) => {
              createComponent({
                propsData: {
                  slashCommands,
                },
              });
              setPromptInput(prompt);

              await nextTick();
              expect(findSlashCommandsCard().exists()).toBe(true);
            }
          );
        });

        describe('when the prompt matches a complete slash command', () => {
          it.each(slashCommands.map((command) => command.name))(
            'does not render the slash commands when prompt is "%s"',
            async (prompt) => {
              createComponent({
                propsData: {
                  slashCommands,
                },
              });
              setPromptInput(prompt);

              await nextTick();
              expect(findSlashCommandsCard().exists()).toBe(false);
            }
          );
        });
      });
    });

    describe('interaction', () => {
      describe('filtering when user types in partial slash command', () => {
        it.each`
          prompt       | expectedCommands
          ${'/'}       | ${slashCommandsNames}
          ${'/t'}      | ${slashCommandsOnly(['/tests'])}
          ${'/tes'}    | ${slashCommandsOnly(['/tests'])}
          ${'/test'}   | ${slashCommandsOnly(['/tests'])}
          ${'/e'}      | ${slashCommandsOnly(['/explain'])}
          ${'/explai'} | ${slashCommandsOnly(['/explain'])}
          ${'/r'}      | ${slashCommandsOnly(['/reset', '/refactor'])}
          ${'/re'}     | ${slashCommandsOnly(['/reset', '/refactor'])}
          ${'/res'}    | ${slashCommandsOnly(['/reset'])}
          ${'/ref'}    | ${slashCommandsOnly(['/refactor'])}
          ${'/foo'}    | ${[]}
        `(
          'shows $expectedCommands when prompt is $prompt',
          async ({ prompt, expectedCommands } = {}) => {
            createComponent({
              propsData: {
                slashCommands,
              },
            });
            setPromptInput(prompt);

            await nextTick();
            expect(findSlashCommands()).toHaveLength(expectedCommands.length);
            expectedCommands.forEach((command) => {
              expect(findSlashCommandsCard().text()).toContain(command);
            });
          }
        );
      });

      describe('keyboard navigation', () => {
        beforeEach(() => {
          createComponent({
            propsData: {
              slashCommands,
              messages,
            },
          });
          setPromptInput('/');
        });

        it('toggles through commands on ArrowDown', async () => {
          for (const command of slashCommandsNames) {
            expect(findSelectedSlashCommand().text()).toContain(command);
            findChatInput().trigger('keyup', { key: 'ArrowDown' });
            // eslint-disable-next-line no-await-in-loop
            await nextTick();
          }
        });

        it('toggles through commands on ArrowUp', async () => {
          const arr = [...slashCommandsNames].reverse();
          arr.unshift(slashCommandsNames[0]); // it still has the top most command selected on the first run
          for (const command of arr) {
            expect(findSelectedSlashCommand().text()).toContain(command);
            findChatInput().trigger('keyup', { key: 'ArrowUp' });
            // eslint-disable-next-line no-await-in-loop
            await nextTick();
          }
        });

        describe('on Enter', () => {
          const navigateToCommand = async (index) => {
            const command = slashCommandsNames[index];
            if (index) {
              for (let i = 0; i < index; i += 1) {
                findChatInput().trigger('keyup', { key: 'ArrowDown' });
              }
            }
            await nextTick();
            return command;
          };

          it('selects correct command and updates input if command should not submit right away', async () => {
            const commandIndex = slashCommands.findIndex((cmd) => !cmd.shouldSubmit);
            const command = await navigateToCommand(commandIndex);

            expect(findSelectedSlashCommand().text()).toContain(command);
            findChatInput().trigger('keyup', { key: 'Enter' });
            await nextTick();
            expect(findChatInput().props('value')).toBe(`${command} `);
            expect(wrapper.emitted('send-chat-prompt')).toBe(undefined);
          });

          it('selects correct command and submits the prompt if command should submit right away', async () => {
            const commandIndex = slashCommands.findIndex((cmd) => cmd.shouldSubmit);
            const command = await navigateToCommand(commandIndex);

            expect(findSelectedSlashCommand().text()).toContain(command);
            findChatInput().trigger('keyup', { key: 'Enter' });
            await nextTick();
            expect(wrapper.emitted('send-chat-prompt')).toEqual([[command]]);
          });
        });
      });

      describe('mouse navigation', () => {
        beforeEach(() => {
          createComponent({
            propsData: {
              slashCommands,
              messages,
            },
          });
          setPromptInput('/');
        });

        it('updates the selected command when hovering over it', async () => {
          expect(findSelectedSlashCommand().text()).toContain(slashCommandsNames[0]);
          findSlashCommands().at(2).trigger('mouseenter');
          await nextTick();
          expect(findSelectedSlashCommand().text()).toContain(slashCommandsNames[2]);
          expect(findSelectedSlashCommand().text()).not.toContain(slashCommandsNames[0]);
        });

        describe('click', () => {
          it('selects correct command and updates input if command should not submit right away', async () => {
            const commandIndex = slashCommands.findIndex((cmd) => !cmd.shouldSubmit);

            findSlashCommands().at(commandIndex).trigger('mouseenter');
            await nextTick();

            expect(findSelectedSlashCommand().text()).toContain(slashCommandsNames[commandIndex]);

            findSelectedSlashCommand().vm.$emit('click');
            await nextTick();

            expect(findChatInput().props('value')).toBe(`${slashCommandsNames[commandIndex]} `);
            expect(wrapper.emitted('send-chat-prompt')).toBe(undefined);
          });

          it('selects correct command and submits the prompt if command should submit right away', async () => {
            const commandIndex = slashCommands.findIndex((cmd) => cmd.shouldSubmit);

            findSlashCommands().at(commandIndex).trigger('mouseenter');
            await nextTick();

            expect(findSelectedSlashCommand().text()).toContain(slashCommandsNames[commandIndex]);

            findSelectedSlashCommand().vm.$emit('click');
            await nextTick();

            expect(wrapper.emitted('send-chat-prompt')).toEqual([
              [slashCommandsNames[commandIndex]],
            ]);
          });
        });
      });
    });
  });
});
