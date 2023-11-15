import iconsPath from '@gitlab/svgs/dist/icons.svg';

const createButton = () => {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add(
    'btn',
    'btn-default',
    'btn-md',
    'gl-button',
    'btn-default-secondary',
    'btn-icon'
  );
  button.dataset.title = 'Copy to clipboard';

  // Create an SVG element with the correct namespace
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('gl-button-icon', 'gl-icon', 's16');

  // Create a 'use' element with the correct namespace
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `${iconsPath}#copy-to-clipboard`);

  svg.appendChild(use);
  button.appendChild(svg);

  return button;
};

export class CopyCodeElement extends HTMLElement {
  constructor() {
    super();
    const btn = createButton();
    const wrapper = this.parentNode;

    this.appendChild(btn);
    btn.addEventListener('click', async () => {
      const textToCopy = wrapper.innerText;
      await navigator.clipboard.writeText(textToCopy);
    });
  }
}
