import {
  isElementFocusable,
  isElementTabbable,
  focusFirstFocusableElement,
  stopEvent,
  getHorizontalBoundingClientRect,
} from './utils';

describe('isElementFocusable', () => {
  const myBtn = () => document.querySelector('button');
  const myInput = () => document.querySelector('input');

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should return true for a button', () => {
    document.body.innerHTML = '<button> My Button </button>';

    expect(isElementFocusable(myBtn())).toBe(true);
  });

  it('should return false for an element with a z-index of -1', () => {
    document.body.innerHTML = '<button z-index="-1"> My Button </button>';

    expect(isElementFocusable(myBtn())).toBe(false);
  });

  it('should return true for an input', () => {
    document.body.innerHTML = '<input type="text" />';

    expect(isElementFocusable(myInput())).toBe(true);
  });

  it('should return false for an input with a type hidden', () => {
    document.body.innerHTML = '<input type="hidden" />';

    expect(isElementFocusable(myInput())).toBe(false);
  });

  it('should return false for a disabled button', () => {
    document.body.innerHTML = '<button disabled> My Button </button>';

    expect(isElementFocusable(myBtn())).toBe(false);
  });

  it('should return true for an anchor tag with an href attribute', () => {
    document.body.innerHTML = '<a href="mylink"> My Link </a>';
    const myAnchor = document.querySelector('a');

    expect(isElementFocusable(myAnchor)).toBe(true);
  });

  it('should return true for an anchor tag without an href attribute', () => {
    document.body.innerHTML = '<a href=""> My Link </a>';
    const myAnchor = document.querySelector('a');

    expect(isElementFocusable(myAnchor)).toBe(false);
  });
});

describe('isElementTabbable', () => {
  const myDiv = () => document.querySelector('div');

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should return false for a div without tabindex', () => {
    document.body.innerHTML = '<div> Fake button </div>';

    expect(isElementTabbable(myDiv())).toBe(false);
  });

  it('should return false for a div with a tabindex less than 0', () => {
    document.body.innerHTML = '<div tabindex="-1"> Fake button </div>';

    expect(isElementTabbable(myDiv())).toBe(false);
  });

  it('should return true for a div with a tabindex equal to 0', () => {
    document.body.innerHTML = '<div tabindex="0"> Fake button </div>';

    expect(isElementTabbable(myDiv())).toBe(true);
  });

  it('should return true for a div with a tabindex greater than 0', () => {
    document.body.innerHTML = '<div tabindex="0"> Fake button </div>';

    expect(isElementTabbable(myDiv())).toBe(true);
  });
});

describe('focusFirstFocusableElement', () => {
  const myBtn = () => document.querySelector('button');
  const myInput = () => document.querySelector('input');

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('Focus the first element of the list if available', () => {
    document.body.innerHTML = '<div><div><button></button><input /></div></div>';

    focusFirstFocusableElement([myBtn(), myInput()]);

    expect(document.activeElement).toBe(myBtn());
  });

  it('Focus the second element of the list if the first is not valid', () => {
    document.body.innerHTML = '<div><div><button disabled></button><input /></div></div>';

    focusFirstFocusableElement([myBtn(), myInput()]);

    expect(document.activeElement).toBe(myInput());
  });
});

describe('stopEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const event = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    stopImmediatePropagation: jest.fn(),
  };

  it('calls preventDefault and stopPropagation by default', () => {
    stopEvent(event);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(event.stopImmediatePropagation).not.toHaveBeenCalled();
  });

  it('completely stops the event when stopImmediatePropagation is true', () => {
    stopEvent(event, { stopImmediatePropagation: true });

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(event.stopImmediatePropagation).toHaveBeenCalledTimes(1);
  });

  it('calls event stop methods set to true', () => {
    stopEvent(event, {
      preventDefault: false,
      stopPropagation: false,
      stopImmediatePropagation: true,
    });

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopPropagation).not.toHaveBeenCalled();
    expect(event.stopImmediatePropagation).toHaveBeenCalledTimes(1);
  });

  describe('getHorizontalBoundingClientRect', () => {
    describe('when there is a reference element', () => {
      let mainElement;

      const [
        MAIN_LEFT_BOUNDARY,
        MAIN_WIDTH,
        MAIN_TOP_BOUNDARY,
        MAIN_HEIGHT,
        DOCUMENT_TOP_BOUNDARY,
        DOCUMENT_HEIGHT,
      ] = [10, 20, 30, 40, 0, 50];

      beforeEach(() => {
        mainElement = document.createElement('main');
        jest.spyOn(mainElement, 'getBoundingClientRect').mockImplementation(() => {
          return {
            x: MAIN_LEFT_BOUNDARY,
            width: MAIN_WIDTH,
            y: MAIN_TOP_BOUNDARY,
            height: MAIN_HEIGHT,
          };
        });
        Object.defineProperty(document.documentElement, 'clientHeight', {
          get() {
            return DOCUMENT_HEIGHT;
          },
        });
      });

      afterEach(() => {
        mainElement = null;
      });

      it("returns the element's horizontal boundaries and the document's vertical boundaries", () => {
        expect(getHorizontalBoundingClientRect(mainElement)).toEqual({
          x: MAIN_LEFT_BOUNDARY,
          width: MAIN_WIDTH,
          y: DOCUMENT_TOP_BOUNDARY,
          height: DOCUMENT_HEIGHT,
        });
      });
    });

    describe('when there is no reference element', () => {
      it('returns `null`', () => {
        expect(getHorizontalBoundingClientRect(null)).toEqual(null);
      });
    });
  });
});
