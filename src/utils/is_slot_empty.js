import Vue from 'vue';

// Fragment will be available only in Vue.js 3
const { Fragment, Comment, Text } = Vue;

function callIfNeeded(fnOrResult, args) {
  return fnOrResult instanceof Function ? fnOrResult(args) : fnOrResult;
}

export function isVnodeEmpty(vnode) {
  if (!vnode || (Comment && vnode.type === Comment)) {
    return true;
  }

  if (Text && vnode.type === Text && !vnode.children.trim()) {
    // Vue.js 3 text string is located in the children
    return true;
  }

  if (Array.isArray(vnode)) {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    return vnode.every(isVnodeEmpty);
  }

  if (Fragment && vnode.type === Fragment) {
    // Vue.js 3 fragment, check children
    // eslint-disable-next-line unicorn/no-array-callback-reference
    return vnode.children.every(isVnodeEmpty);
  }

  return false;
}

export function isSlotEmpty(vueInstance, slot, slotArgs) {
  const isVue3 = Boolean(Fragment);

  const slotContent = isVue3
    ? // we need to check both $slots and $scopedSlots due to https://github.com/vuejs/core/issues/8869
      // additionally, in @vue/compat $slot might be a function instead of array of vnodes (sigh)
      callIfNeeded(vueInstance.$slots[slot] || vueInstance.$scopedSlots[slot], slotArgs)
    : vueInstance.$scopedSlots[slot]?.(slotArgs);

  // eslint-disable-next-line unicorn/no-array-callback-reference
  return isVnodeEmpty(slotContent);
}
