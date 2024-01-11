import DOMPurify from 'dompurify';
import GlSafeHtml from './safe_html';
import readme from './safe_html.md';

const { sanitize } = DOMPurify;

const generateProps = ({
  unsafeHTML = '<a href="javascript:alert(document.domain)">Click me</a>',
} = {}) => ({
  unsafeHTML,
});

export const Default = (_args, { argTypes }) => ({
  directives: {
    GlSafeHtml,
  },
  props: Object.keys(argTypes),
  computed: {
    sanitizedHtml() {
      return sanitize(this.unsafeHTML);
    },
  },
  template: `
  <table class="gl-table">
    <thead>
      <tr>
        <th>Directive</th>
        <th>Output</th>
        <th>Rendered</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>v-html</strong></td>
        <td><code>{{ unsafeHTML }}</code></td>
        <td>N/A for security reasons</td>
      </tr>
      <tr>
        <td><strong>v-safe-html</strong></td>
        <td><code>{{ sanitizedHtml }}</code></td>
        <td v-gl-safe-html="unsafeHTML"></td>
      </tr>
    </tbody>
  </table>
  `,
});
Default.args = generateProps();

export default {
  title: 'directives/safe-html-directive',
  component: GlSafeHtml,
  tags: ['skip-visual-test'],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
