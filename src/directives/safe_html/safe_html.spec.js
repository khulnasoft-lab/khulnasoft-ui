import { shallowMount } from '@vue/test-utils';
import { forbiddenDataAttrs } from './constants';
import { SafeHtmlDirective as safeHtml } from './safe_html';

/* eslint-disable no-script-url */
const invalidProtocolUrls = [
  'javascript:alert(1)',
  'jAvascript:alert(1)',
  'data:text/html,<script>alert(1);</script>',
  ' javascript:',
  'javascript :',
];
/* eslint-enable no-script-url */
const validProtocolUrls = ['slack://open', 'x-devonthink-item://90909', 'x-devonthink-item:90909'];

describe('safe html directive', () => {
  let wrapper;

  const createComponent = ({ template, html, config } = {}) => {
    const defaultTemplate = `<div v-safe-html="rawHtml"></div>`;
    const defaultHtml = 'hello <script>alert(1)</script>world';

    const component = {
      directives: {
        safeHtml,
      },
      data() {
        return {
          rawHtml: html || defaultHtml,
          config: config || {},
        };
      },
      template: template || defaultTemplate,
    };

    wrapper = shallowMount(component);
  };

  describe('default', () => {
    it('should remove the script tag', () => {
      createComponent();

      expect(wrapper.html()).toEqual('<div>hello world</div>');
    });

    it('should remove javascript hrefs', () => {
      createComponent({ html: '<a href="javascript:prompt(1)">click here</a>' });

      expect(wrapper.html()).toEqual('<div><a>click here</a></div>');
    });

    it('should remove any existing children', () => {
      createComponent({
        template: `<div v-safe-html="rawHtml">foo <i>bar</i></div>`,
      });

      expect(wrapper.html()).toEqual('<div>hello world</div>');
    });

    describe('with non-http links', () => {
      it.each(validProtocolUrls)('should allow %s', (url) => {
        createComponent({
          html: `<a href="${url}">internal link</a>`,
        });
        expect(wrapper.html()).toContain(`<a href="${url}">internal link</a>`);
      });

      it.each(invalidProtocolUrls)('should not allow %s', (url) => {
        createComponent({
          html: `<a href="${url}">internal link</a>`,
        });
        expect(wrapper.html()).toContain(`<a>internal link</a>`);
      });
    });

    describe('handles data attributes correctly', () => {
      const acceptedDataAttrs = ['data-safe', 'data-random'];

      it.each(forbiddenDataAttrs)('removes %s attributes', (attr) => {
        createComponent({
          html: `<a ${attr}="true"></a>`,
        });

        expect(wrapper.html()).toEqual('<div><a></a></div>');
      });

      it.each(acceptedDataAttrs)('does not remove %s attributes', (attr) => {
        const attrWithValue = `${attr}="true"`;

        createComponent({
          html: `<a ${attrWithValue}="true"></a>`,
        });

        expect(wrapper.html()).toEqual(`<div><a ${attrWithValue}></a></div>`);
      });
    });
  });

  describe('advance config', () => {
    const template = '<div v-safe-html:[config]="rawHtml"></div>';
    it('should only allow <b> tags', () => {
      createComponent({
        template,
        html: '<a href="javascript:prompt(1)"><b>click here</b></a>',
        config: { ALLOWED_TAGS: ['b'] },
      });

      expect(wrapper.html()).toEqual('<div><b>click here</b></div>');
    });

    it('should strip all html tags', () => {
      createComponent({
        template,
        html: '<a href="javascript:prompt(1)"><u>click here</u></a>',
        config: { ALLOWED_TAGS: [] },
      });

      expect(wrapper.html()).toEqual('<div>click here</div>');
    });
  });
});
