import { mount } from '@vue/test-utils';
import merge from 'lodash/merge';
import { OutsideDirective } from './outside';

describe('outside directive', () => {
  let wrapper;
  let onClick;

  // These tests can be flaky due to their reliance on event timestamps. While
  // a delay of 1ms *should* be enough to get different event timestamps (and
  // therefore avoid incorrect test failures), for some reason it isn't enough
  // to guarantee it. So, we use 2ms, which seems to eliminate the flakiness.
  // Jest's fake timers unfortunately do not seem to affect event timestamps,
  // so can't be used here.
  const delay = (ms = 2) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const find = (testid) => wrapper.find(`[data-testid="${testid}"]`);

  const defaultTemplate = `
    <div data-testid="outside">
      <div v-outside="onClick" data-testid="bound">
        <div data-testid="inside"></div>
      </div>
    </div>
  `;

  const createComponent = async (component) => {
    wrapper = mount(
      merge(
        {
          directives: {
            outside: OutsideDirective,
          },
          methods: {
            onClick,
          },
          template: defaultTemplate,
        },
        component
      ),
      {
        attachTo: document.body,
      }
    );

    // Ensure a realistic delay between the directive being bound and the user
    // clicking somewhere, due to timestamp-checking logic.
    await delay();
  };

  beforeEach(() => {
    jest.clearAllMocks();
    onClick = jest.fn();
  });

  describe('given a callback', () => {
    it.each`
      target       | expectedCalls
      ${'outside'} | ${[[expect.any(MouseEvent)]]}
      ${'bound'}   | ${[]}
      ${'inside'}  | ${[]}
    `(
      'is called with $expectedCalls when clicking on $target element',
      async ({ target, expectedCalls }) => {
        await createComponent();

        find(target).trigger('click');

        expect(onClick.mock.calls).toEqual(expectedCalls);
      }
    );
  });

  describe('given multiple instances', () => {
    let onClickSibling;

    beforeEach(async () => {
      onClickSibling = jest.fn();

      await createComponent({
        methods: {
          onClickSibling,
        },
        template: `
          <div data-testid="outside">
            <div v-outside="onClick" data-testid="first"></div>
            <div v-outside="onClickSibling" data-testid="sibling"></div>
          </div>
        `,
      });
    });

    it.each`
      target       | onClickCalls                  | onClickSiblingCalls
      ${'outside'} | ${[[expect.any(MouseEvent)]]} | ${[[expect.any(MouseEvent)]]}
      ${'first'}   | ${[]}                         | ${[[expect.any(MouseEvent)]]}
      ${'sibling'} | ${[[expect.any(MouseEvent)]]} | ${[]}
    `(
      'calls the expected callbacks when $target is clicked',
      ({ target, onClickCalls, onClickSiblingCalls }) => {
        find(target).trigger('click');

        expect(onClick.mock.calls).toEqual(onClickCalls);
        expect(onClickSibling.mock.calls).toEqual(onClickSiblingCalls);
      }
    );
  });

  describe('global event binding', () => {
    beforeEach(() => {
      jest.spyOn(document, 'addEventListener');
      jest.spyOn(document, 'removeEventListener');
    });

    it('throws if not passed a callback', async () => {
      await expect(
        createComponent({
          data: () => ({ foo: null }),
          template: '<div v-outside="foo"></div>',
        })
      ).rejects.toThrow('must be a function');

      expect(global.console).toHaveLoggedVueErrors();
      expect(document.addEventListener).not.toHaveBeenCalled();
    });

    it('detaches the global listener when last binding is removed', async () => {
      await createComponent();

      wrapper.destroy();

      document.body.dispatchEvent(new MouseEvent('click'));

      expect(onClick).not.toHaveBeenCalled();
    });

    it('only unbinds once there are no instances', async () => {
      await createComponent({
        data: () => ({
          instances: 2,
        }),
        template: `
          <div>
            <div v-if="instances >= 1" v-outside="onClick"></div>
            <div v-if="instances >= 2" v-outside="onClick"></div>
          </div>
        `,
      });

      wrapper.setData({ instances: 1 });
      await wrapper.vm.$nextTick();

      document.body.dispatchEvent(new MouseEvent('click'));

      expect(onClick).toHaveBeenCalledTimes(1);

      wrapper.setData({ instances: 0 });
      await wrapper.vm.$nextTick();

      document.body.dispatchEvent(new MouseEvent('click'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('given an arg', () => {
    const templateWithArg = (eventType) => `
      <div data-testid="outside">
        <div v-outside:${eventType}="onClick" data-testid="bound"></div>
      </div>`;

    it('works with click', async () => {
      await createComponent({
        template: templateWithArg('click'),
      });

      find('outside').trigger('click');

      expect(onClick.mock.calls).toEqual([[expect.any(MouseEvent)]]);
    });

    it.each(['mousedown', 'keyup', 'foo'])(
      'does not work with any other event, like %s',
      async (eventType) => {
        jest.spyOn(document, 'addEventListener');

        await expect(
          createComponent({
            template: templateWithArg(eventType),
          })
        ).rejects.toThrow(`Cannot bind ${eventType} events`);

        expect(global.console).toHaveLoggedVueErrors();

        expect(document.addEventListener).not.toHaveBeenCalled();

        find('outside').trigger('click');

        expect(onClick.mock.calls).toEqual([]);
      }
    );
  });

  describe('multiple instances on the same element', () => {
    let onClickInner;

    beforeEach(async () => {
      onClickInner = jest.fn();

      const HigherOrder = {
        directives: {
          outside: OutsideDirective,
        },
        methods: {
          onClickInner,
        },
        template: '<div v-outside="onClickInner"></div>',
      };

      await createComponent({
        components: {
          HigherOrder,
        },
        template: `
          <div data-testid="outside">
            <higher-order v-outside="onClick" />
          </div>
        `,
      });
    });

    it('calls only the inner-most instance', () => {
      find('outside').trigger('click');

      expect(onClickInner.mock.calls).toEqual([[expect.any(MouseEvent)]]);
      expect(onClick.mock.calls).toEqual([]);
    });
  });

  describe('click event fired before directive binding', () => {
    // This *attempts* to simulate something like the following situation:
    //
    //     <button @click="show = true">Show</button>
    //     <div v-if="show" v-outside="onClick"></div>
    //
    // Without checking event timestamps, clicking on the button the first time
    // would actually call the `onClick` handler. This is because browsers fire
    // microtask ticks *during* event propagation, which means that Vue binds
    // the directive to and inserts the new element into the DOM *before* the
    // click event propagates up to the document node. This is something Vue
    // itself has to deal with:
    // https://github.com/vuejs/vue/blob/v2.6.12/src/platforms/web/runtime/modules/events.js#L53-L58
    //
    // Unfortunately, that behaviour doesn't seem to happen in Jest/jsdom. The
    // click event propagates to the document *before* the Vue binds the
    // directive to and inserts the new element into the DOM. So, instead, we
    // explicitly construct an event with a timeStamp guaranteed to be earlier
    // than when the directive is bound, in order to test the logic.
    let earlyEvent;

    const createEvent = () => new MouseEvent('click', { bubbles: true });

    beforeEach(async () => {
      earlyEvent = createEvent();

      // As jsdom uses low-resolution timestamps on events and to avoid a flaky
      // test, we _must_ wait at least 1 millisecond to ensure the binding
      // timestamp is strictly larger than the event's timestamp, which means
      // waiting _before_ mounting our test component.
      await delay();
      await createComponent();
    });

    it('does not call the outside click handler', async () => {
      find('outside').element.dispatchEvent(earlyEvent);

      expect(onClick).not.toHaveBeenCalled();
    });

    it('does call the click handler with a later event', async () => {
      // Use the same createEvent helper, rather than Wrapper#trigger, to give
      // confidence that the previous test isn't a false positive
      const lateEvent = createEvent();
      find('outside').element.dispatchEvent(lateEvent);

      expect(onClick.mock.calls).toEqual([[lateEvent]]);
    });
  });

  describe('given a callback that throws', () => {
    let onClickThrow;

    beforeEach(async () => {
      onClickThrow = jest.fn(() => {
        throw new Error('mock error');
      });

      jest.spyOn(global.console, 'error');
      await createComponent({
        methods: {
          onClickThrow,
        },
        template: `
          <div data-testid="outside">
            <div v-outside="onClickThrow" data-testid="sibling"></div>
            <div v-outside="onClick" data-testid="first"></div>
          </div>
        `,
      });

      find('outside').trigger('click');
    });

    it('still calls other listeners', () => {
      expect(onClick.mock.calls).toEqual([[expect.any(MouseEvent)]]);
    });

    it('logs the error to the console', () => {
      expect(onClickThrow).toHaveBeenCalledTimes(1);

      const thrownError = onClickThrow.mock.results[0].value;
      expect(global.console.error.mock.calls).toEqual([[thrownError]]);
    });
  });

  describe('mousedown before click', () => {
    it('respects mousedown event before click', async () => {
      await createComponent();

      find('inside').trigger('mousedown');
      find('outside').trigger('click');

      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
