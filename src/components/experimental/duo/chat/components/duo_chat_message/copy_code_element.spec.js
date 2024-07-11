import { CopyCodeElement } from './copy_code_element';
import * as buttonUtils from './buttons_utils';

describe('copy-code element', () => {
  customElements.define('copy-code', CopyCodeElement);
  const code = 'function sum(a, b) {\n  return a + b;\n}';
  const findButton = () => document.querySelector('copy-code button');
  const findButtonIcon = () => document.querySelector('copy-code button svg use');

  const setupDOM = () => {
    document.body.innerHTML = `<div><pre><code>${code}</code></pre><copy-code></copy-code></div>`;
  };

  beforeEach(() => {
    setupDOM();
  });

  it('should create a button', () => {
    expect(customElements.get('copy-code')).toBeDefined();
  });

  it('adds the correct icon to the button', () => {
    expect(findButtonIcon().getAttribute('href')).toContain('#copy-to-clipboard');
  });

  it('calls createButton with the correct parameters', () => {
    const createButtonSpy = jest.spyOn(buttonUtils, 'createButton');
    setupDOM();

    expect(createButtonSpy).toHaveBeenCalledWith('Copy to clipboard', 'copy-to-clipboard');
  });

  describe('interaction', () => {
    let copiedText = '';

    beforeEach(() => {
      Object.defineProperty(HTMLElement.prototype, 'innerText', {
        get() {
          return this.textContent.trim();
        },
        configurable: true,
      });

      global.navigator.clipboard = {
        writeText: jest.fn().mockImplementation((text) => {
          copiedText = text;
          return Promise.resolve();
        }),
        readText: jest.fn().mockImplementation(() => Promise.resolve(copiedText)),
      };
    });

    afterEach(() => {
      // In JSDOM, `innerText` doesn't exist on the prototype.
      // However, we can not set it to `undefined` as the property description should be an object
      Object.defineProperty(HTMLElement.prototype, 'innerText', {});

      jest.resetAllMocks();
    });

    it('copies the content of the parentNode to the clipboard when the button is clicked', async () => {
      findButton().click();
      const text = await navigator.clipboard.readText();
      expect(text).toBe(code);
    });
  });
});
