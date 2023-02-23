/* eslint-disable import/no-default-export */
import { ToastPlugin } from 'bootstrap-vue';
import isFunction from 'lodash/isFunction';
import CloseButton from '../../shared_components/close_button/close_button.vue';

const DEFAULT_OPTIONS = {
  autoHideDelay: 5000,
  toastClass: 'gl-toast',
  isStatus: true,
  noCloseButton: true,
  toaster: 'b-toaster-bottom-left',
};

let toastsCount = 0;

function renderTitle(h, toast, options) {
  const nodes = [
    h(CloseButton, {
      class: ['gl-toast-close-button', 'gl-close-btn-color-inherit'],
      on: {
        click: toast.hide,
      },
    }),
  ];
  if (options.action) {
    nodes.splice(
      0,
      0,
      h(
        'a',
        {
          role: 'button',
          class: ['gl-toast-action'],
          on: {
            click: (e) => options.action.onClick(e, toast),
          },
        },
        options.action.text
      )
    );
  }
  return nodes;
}

function showToast(message, options = {}) {
  const id = `gl-toast-${toastsCount}`;
  toastsCount += 1;
  const hide = () => {
    this.$bvToast.hide(id);
  };
  const toast = { id, hide };

  if (isFunction(options.onComplete)) {
    const toastHiddenCallback = (e) => {
      if (e.componentId === id) {
        this.$root.$off('bv::toast:hidden', toastHiddenCallback);
        options.onComplete(e);
      }
    };

    this.$root.$on('bv::toast:hidden', toastHiddenCallback);
  }

  this.$bvToast.toast(message, {
    ...DEFAULT_OPTIONS,
    id,
    title: renderTitle(this.$createElement, toast, options),
  });
  return toast;
}

/**
 * Note: This is not a typical Vue component and needs to be registered before instantiating a Vue app.
 * Once registered, the toast will be globally available throughout your app.
 *
 * See https://gitlab-org.gitlab.io/gitlab-ui/ for detailed documentation.
 */
export default {
  install(Vue) {
    Vue.use(ToastPlugin);

    Vue.mixin({
      beforeCreate() {
        if (this.$toast) {
          return;
        }
        this.$toast = { show: showToast.bind(this) };
      },
    });
  },
};
