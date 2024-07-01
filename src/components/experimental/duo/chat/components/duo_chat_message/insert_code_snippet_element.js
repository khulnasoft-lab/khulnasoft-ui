import { createButton } from './buttons_utils';

export class InsertCodeSnippetElement extends HTMLElement {
  constructor(codeBlock) {
    super();
    const btn = createButton();
    const wrapper = codeBlock;
    this.appendChild(btn);
    btn.addEventListener('click', () => {
      if (wrapper) {
        wrapper.dispatchEvent(
          new CustomEvent('insert-code-snippet', { bubbles: true, cancelable: true })
        );
      }
    });
  }
}
