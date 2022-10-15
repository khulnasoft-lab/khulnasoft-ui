/* eslint-disable no-loop-func */
import prettier from 'prettier';

const ATTRIBUTES_VALUE_TO_REMOVE = ['disabled', 'readonly'];
const ATTRIBUTES_TO_REMOVE = ['slot-scope'];

export function test(received) {
  return received instanceof Element || (typeof received === 'string' && received.startsWith('<'));
}

export function print(received) {
  let content;
  if (typeof received === 'string') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = received;
    content = wrapper.firstElementChild;
  } else {
    content = received.cloneNode(true);
  }

  // Remove comment nodes
  const treeWalker = document.createTreeWalker(
    content,
    // eslint-disable-next-line no-bitwise
    NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
  );

  let { currentNode } = treeWalker;

  const nodesToDelete = [];
  while (currentNode) {
    if (currentNode instanceof Comment) {
      nodesToDelete.push(currentNode);
    }

    if (currentNode instanceof Element) {
      ATTRIBUTES_TO_REMOVE.forEach((attr) => currentNode.removeAttribute(attr));
      ATTRIBUTES_VALUE_TO_REMOVE.forEach((attr) => {
        if (currentNode.hasAttribute(attr)) {
          currentNode.setAttribute(attr, '');
        }
      });

      Array.from(currentNode.attributes)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .forEach((attr) => {
          currentNode.removeAttribute(attr.name);
          currentNode.setAttribute(attr.name, attr.value);
        });
    }

    currentNode = treeWalker.nextNode();
  }
  nodesToDelete.forEach((n) => n.remove());

  return prettier.format(content.outerHTML, { parser: 'html' });
}
