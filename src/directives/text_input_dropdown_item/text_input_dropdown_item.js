const FOCUS_CLASS = 'gl-bg-gray-50';

/**
 * @param {import("vue").DirectiveBinding} binding
 * @return boolean
 */
const isFocused = (binding) => {
  return Boolean(binding.value?.focus);
};

/**
 * @param {import("vue").DirectiveBinding} binding
 * @return boolean
 */
const shouldHandleFocus = (binding) => {
  return binding.value || binding.oldValue;
};

/**
 * @param {Element} el
 * @param {import("vue").DirectiveBinding} binding
 */
const handleUpdate = (el, binding) => {
  // why: dropdown items for text input should not be tabbable
  el.querySelectorAll('button')?.forEach((x) => x.setAttribute('tabindex', '-1'));

  if (!shouldHandleFocus(binding)) {
    return;
  }

  const focus = isFocused(binding);

  el.classList.toggle(FOCUS_CLASS, focus);
  el.setAttribute('aria-selected', String(focus));

  if (focus) {
    el.scrollIntoView({ block: 'end' });
  }
};

/**
 * @param {Element} el
 * @param {import("vue").DirectiveBinding} binding
 */
export const TextInputDropdownItemDirective = {
  bind: handleUpdate,
  componentUpdated: handleUpdate,
};
