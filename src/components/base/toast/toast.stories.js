import Vue from 'vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlToast } from '../../../../index';
import readme from './toast.md';

Vue.use(GlToast);

function generateDefault() {
  return () => ({
    template: `<gl-button @click="showToast()">Show default toast</gl-button>`,
    methods: {
      showToast() {
        this.$toast.show('This is the default toast.');
      },
    },
    mounted() {
      this.showToast();
    },
  });
}

function generateWithActions() {
  return () => ({
    template: `<gl-button @click="showToast()">Show toast with actions</gl-button>`,
    methods: {
      showToast() {
        this.$toast.show('This is a toast with an action.', {
          action: {
            text: 'Undo',
            onClick: () => {},
          },
        });
      },
    },
    mounted() {
      this.showToast();
    },
  });
}

function generateWithLink() {
  return () => ({
    template: `<gl-button @click="showToast()">Show toast with actions</gl-button>`,
    methods: {
      showToast() {
        this.$toast.show('This is a toast with a link.', {
          action: {
            text: 'Visit GitLab.com',
            link: {
              href: 'https://gitlab.com/',
              target: '_blank',
            },
          },
        });
      },
    },
    mounted() {
      this.showToast();
    },
  });
}

function generateLong() {
  return () => ({
    template: `<gl-button @click="showToast()">Show toast with a long content</gl-button>`,
    methods: {
      showToast() {
        this.$toast.show(
          'This is a toast with a long content and an action. Notice how the text wraps to multiple lines when the max-width is reached.',
          {
            action: {
              text: 'Undo action',
              onClick: () => {},
            },
          }
        );
      },
    },
    mounted() {
      this.showToast();
    },
  });
}

documentedStoriesOf('base/toast', readme)
  .add('default', generateDefault())
  .add('with actions', generateWithActions())
  .add('with links', generateWithLink())
  .add('with long content', generateLong());
