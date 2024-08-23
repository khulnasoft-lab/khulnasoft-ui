import { Parser } from 'marked';
import { renderDuoChatMarkdownPreview } from './markdown_renderer';

describe('Duo Chat Markdown renderer', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a few edge cases', () => {
    expect(renderDuoChatMarkdownPreview('')).toEqual('');
    expect(renderDuoChatMarkdownPreview(null)).toEqual('');
    expect(renderDuoChatMarkdownPreview(undefined)).toEqual('');
    expect(renderDuoChatMarkdownPreview(5)).toEqual('<p dir="auto">5</p>\n');
  });

  it('renders a simple paragraph', () => {
    expect(renderDuoChatMarkdownPreview('Hello world')).toEqual('<p dir="auto">Hello world</p>\n');
  });

  it('adds the action buttons to the markdown code block', () => {
    expect(renderDuoChatMarkdownPreview('```js\nconsole.log(1)\n```')).toContain(
      '<copy-code></copy-code><insert-code-snippet></insert-code-snippet>'
    );
  });

  it('adds syntax highlighting', () => {
    expect(renderDuoChatMarkdownPreview('```js\nconsole.log(1)\n```')).toContain('hljs-');
  });

  it('auto-closes an open code block', () => {
    const t = renderDuoChatMarkdownPreview('```yaml\n# comment');
    expect(t).toEqual(
      '<div class="gl-relative markdown-code-block js-markdown-code"><pre><code class="language-yaml"><span class="hljs-comment"># comment</span>\n</code></pre>\n<copy-code></copy-code><insert-code-snippet></insert-code-snippet></div>'
    );
  });

  it('renders standard markdown syntax', () => {
    expect(renderDuoChatMarkdownPreview('*italic*')).toEqual(`<p dir="auto"><em>italic</em></p>\n`);
    expect(renderDuoChatMarkdownPreview('_italic_')).toEqual(`<p dir="auto"><em>italic</em></p>\n`);
    expect(renderDuoChatMarkdownPreview('**bold**')).toEqual(
      `<p dir="auto"><strong>bold</strong></p>\n`
    );
    expect(renderDuoChatMarkdownPreview('~~strike~~')).toEqual(`<p dir="auto">~~strike~~</p>\n`);
    expect(renderDuoChatMarkdownPreview('https://example.org')).toEqual(
      `<p dir="auto">https://example.org</p>\n`
    );
    expect(renderDuoChatMarkdownPreview('[example](https://example.org)')).toEqual(
      `<p dir="auto"><a href="https://example.org">example</a></p>\n`
    );
    expect(renderDuoChatMarkdownPreview('1. first\n2. second')).toEqual(
      `<ol dir="auto">\n<li>first</li>\n<li>second</li>\n</ol>\n`
    );
    expect(renderDuoChatMarkdownPreview('- first\n- second')).toEqual(
      `<ul dir="auto">\n<li>first</li>\n<li>second</li>\n</ul>\n`
    );
    expect(renderDuoChatMarkdownPreview('* first\n* second')).toEqual(
      `<ul dir="auto">\n<li>first</li>\n<li>second</li>\n</ul>\n`
    );
  });

  it('returns content as-is if marked throws', () => {
    jest.spyOn(Parser.prototype, 'parse').mockImplementationOnce(() => {
      throw new Error('I am a broken parser');
    });

    expect(renderDuoChatMarkdownPreview('Hello world')).toEqual('Hello world');
  });
});
