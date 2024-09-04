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

  const code = '\n\nfunction sum(a, b) {\n  return a + b;\n}';
  const findButton = () => document.querySelector('insert-code-snippet button');
  const findButtonIcon = () => document.querySelector('insert-code-snippet button svg use');
  const findCodeElement = () => document.querySelector('.js-markdown-code');

  describe.each`
    includeCodeBlockInConstructor
    ${true}
    ${false}
  `(
    'when includeCodeBlockInConstructor is $includeCodeBlockInConstructor',
    (includeCodeBlockInConstructor) => {
      beforeEach(() => {
        document.body.innerHTML = `<div class="wrapper js-markdown-code"><pre><code>${code}</code></pre><insert-code-snippet></insert-code-snippet></div>`;
        const codeBlock = includeCodeBlockInConstructor ? findCodeElement() : undefined;
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
        const spy = jest.fn();
        let wrapper;

        beforeEach(() => {
          wrapper = findCodeElement();
          wrapper.addEventListener('insert-code-snippet', spy);
          findButton().click();
        });

        afterEach(() => {
          wrapper.removeEventListener('insert-code-snippet', spy);
        });

        it('throws custom event on click', () => {
          const [event] = spy.mock.calls[0];

          expect(spy).toHaveBeenCalledTimes(1);
          expect(event).toEqual(
            expect.objectContaining({
              detail: {
                code: code.trim(),
              },
              bubbles: true,
              cancelable: true,
              target: wrapper,
            })
          );
        });
      });
    }
  );
});
