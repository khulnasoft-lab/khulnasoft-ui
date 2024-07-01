import { InsertCodeSnippetElement } from './insert_code_snippet_element';
import { createButton } from './buttons_utils';

jest.mock('./buttons_utils');

describe('insert-code-snippet element', () => {
  let button;

  beforeAll(() => {
    button = document.createElement('button');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#insert');
    svg.appendChild(use);
    button.appendChild(svg);
    createButton.mockImplementation(() => button);
  });

  customElements.define('insert-code-snippet', InsertCodeSnippetElement);

  const code = 'function sum(a, b) {\n  return a + b;\n}';
  const findButton = () => document.querySelector('insert-code-snippet button');
  const findButtonIcon = () => document.querySelector('insert-code-snippet button svg use');
  const findCodeElement = () => document.querySelector('pre code');

  beforeEach(() => {
    document.body.innerHTML = `<div class="wrapper"><pre><code>${code}</code></pre><insert-code-snippet></insert-code-snippet></div>`;
    const codeBlock = findCodeElement().parentElement;
    const insertCodeSnippetElement = new InsertCodeSnippetElement(codeBlock);
    document.querySelector('insert-code-snippet').replaceWith(insertCodeSnippetElement);
  });

  it('should create a button', () => {
    expect(customElements.get('insert-code-snippet')).toBeDefined();
  });

  it('adds the correct icon to the button', () => {
    expect(findButtonIcon().getAttribute('href')).toContain('#insert');
  });

  describe('interaction', () => {
    it('throws custom event on click', () => {
      const wrapper = findCodeElement().parentElement;
      const spy = jest.spyOn(wrapper, 'dispatchEvent');

      findButton().click();

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'insert-code-snippet',
          bubbles: true,
          cancelable: true,
        })
      );

      spy.mockRestore();
    });
  });
});
