import { CopyCodeElement } from './copy_code_element';

describe('copy-code element', () => {
  customElements.define('copy-code', CopyCodeElement);
  const code = 'function sum(a, b) {\n  return a + b;\n}';
  const findCustomElement = () => document.querySelector('copy-code');
  const findButton = () => document.querySelector('copy-code button');
  const findButtonIcon = () => document.querySelector('copy-code button svg use');

  beforeEach(() => {
    document.body.innerHTML = `<div><pre><code>${code}</code></pre><copy-code></copy-code></div>`;
  });

  it('should create a button', () => {
    expect(customElements.get('copy-code')).toBeDefined();
  });

  it('does not setup shadowDom on the custom element', () => {
    expect(findCustomElement().shadowRoot).toBeNull();
  });

  it('adds a button to the DOM as a direct child', () => {
    expect(findButton()).toBeDefined();
  });

  it('adds the correct icon to the button', () => {
    expect(findButtonIcon().getAttribute('href')).toContain('#copy-to-clipboard');
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
