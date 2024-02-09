// eslint-disable-next-line no-restricted-imports
import { Marked } from 'marked';
import markedBidi from 'marked-bidi';

const duoMarked = new Marked([
  {
    async: false,
    breaks: false,
    gfm: false,
  },
  markedBidi(),
]);

export function renderDuoChatMarkdownPreview(md) {
  try {
    return md ? duoMarked.parse(md.toString()) : '';
  } catch {
    return md;
  }
}
