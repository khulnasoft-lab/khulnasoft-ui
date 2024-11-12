/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import { createButton } from './buttons_utils';

const CODE_MARKDOWN_CLASS = 'js-markdown-code';

export class InsertCodeSnippetElement extends HTMLElement {
  #actionButton;

  #codeBlock;

  constructor(codeBlock) {
    super();
    this.#actionButton = createButton();

    // we handle two possible cases here:
    // 1. we use constructor parameter if the element is created in Javscript and inserted in the document
    // 2. we find the wrapping element containing code if the element is received from the server
    this.#codeBlock = codeBlock ?? this.closest(`.${CODE_MARKDOWN_CLASS}`);
  }

  #handleClick = () => {
    if (this.#codeBlock) {
      this.#codeBlock.dispatchEvent(
        new CustomEvent('insert-code-snippet', {
          bubbles: true,
          cancelable: true,
          detail: {
            code: this.#codeBlock.textContent.trim(),
          },
        })
      );
    }
  };

  connectedCallback() {
    this.appendChild(this.#actionButton);
    this.#actionButton.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    this.#actionButton.removeEventListener('click', this.#handleClick);
  }
}
