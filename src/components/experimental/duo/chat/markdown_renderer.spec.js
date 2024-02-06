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
    expect(renderDuoChatMarkdownPreview(5)).toEqual('<p>5</p>\n');
  });

  it('renders a simple paragraph', () => {
    expect(renderDuoChatMarkdownPreview('Hello world')).toEqual('<p>Hello world</p>\n');
  });

  it('auto-closes an open code block', () => {
    expect(renderDuoChatMarkdownPreview('```yaml\n# comment')).toEqual(
      '<pre><code class="language-yaml"># comment\n</code></pre>\n'
    );
  });

  it('renders standard markdown syntax', () => {
    expect(renderDuoChatMarkdownPreview('*italic*')).toEqual(`<p><em>italic</em></p>\n`);
    expect(renderDuoChatMarkdownPreview('_italic_')).toEqual(`<p><em>italic</em></p>\n`);
    expect(renderDuoChatMarkdownPreview('**bold**')).toEqual(`<p><strong>bold</strong></p>\n`);
    expect(renderDuoChatMarkdownPreview('~~strike~~')).toEqual(`<p><del>strike</del></p>\n`);
    expect(renderDuoChatMarkdownPreview('https://example.org')).toEqual(
      `<p><a href="https://example.org">https://example.org</a></p>\n`
    );
    expect(renderDuoChatMarkdownPreview('[example](https://example.org)')).toEqual(
      `<p><a href="https://example.org">example</a></p>\n`
    );
    expect(renderDuoChatMarkdownPreview('1. first\n2. second')).toEqual(
      `<ol>\n<li>first</li>\n<li>second</li>\n</ol>\n`
    );
    expect(renderDuoChatMarkdownPreview('- first\n- second')).toEqual(
      `<ul>\n<li>first</li>\n<li>second</li>\n</ul>\n`
    );
    expect(renderDuoChatMarkdownPreview('* first\n* second')).toEqual(
      `<ul>\n<li>first</li>\n<li>second</li>\n</ul>\n`
    );
  });

  it('returns content as-is if marked throws', () => {
    jest.spyOn(Parser.prototype, 'parse').mockImplementationOnce(() => {
      throw new Error('I am a broken parser');
    });

    expect(renderDuoChatMarkdownPreview('Hello world')).toEqual('Hello world');
  });
});
