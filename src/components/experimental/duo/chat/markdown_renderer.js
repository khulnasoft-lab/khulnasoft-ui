/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

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
