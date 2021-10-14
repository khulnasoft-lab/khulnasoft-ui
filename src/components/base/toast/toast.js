/* eslint-disable import/no-default-export */
import { ToastPlugin } from 'bootstrap-vue';
import { isFunction } from 'lodash';
import GlLink from '../link/link.vue';
import CloseButton from '../../shared_components/close_button/close_button.vue';

const DEFAULT_OPTIONS = {
  autoHideDelay: 5000,
  toastClass: 'gl-toast',
  noCloseButton: true,
  toaster: 'b-toaster-bottom-left',
};
const TOAST_ACTION_CLASSES = ['gl-toast-action'];

let toastsCount = 0;

function renderTitle(h, toast, options) {
  const renderActionButton = () =>
    h(
      'a',
      {
        role: 'button',
        class: TOAST_ACTION_CLASSES,
        on: {
          click: (e) => options.action.onClick(e, toast),
        },
      },
      options.action.text
    );

  const renderActionLink = () =>
    h(
      GlLink,
      {
        class: TOAST_ACTION_CLASSES,
        attrs: options.action.link,
      },
      options.action.text
    );

  const nodes = [
    h(CloseButton, {
      class: ['gl-toast-close-button', 'gl-close-btn-color-inherit'],
      on: {
        click: toast.hide,
      },
    }),
  ];
  if (options.action) {
    const action = options.action.onClick ? renderActionButton() : renderActionLink();
    nodes.splice(0, 0, action);
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
    this.$root.$on('bv::toast:hidden', (e) => {
      if (e.componentId === id) {
        options.onComplete(e);
      }
    });
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
    // This workaround is necessary for us to be able to mock $bvToasts in tests
    // https://stackoverflow.com/questions/55523639/vue-test-utils-could-not-overwrite-property-route-this-is-usually-caused-by-a
    if (process.env.NODE_ENV !== 'test') {
      Vue.use(ToastPlugin);
    }

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
