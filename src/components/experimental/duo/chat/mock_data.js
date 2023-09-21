import { DOCUMENTATION_SOURCE_TYPES, MESSAGE_MODEL_ROLES } from './constants';

const MOCK_SOURCES = [
  {
    title: 'GitLab Handbook',
    source_type: DOCUMENTATION_SOURCE_TYPES.HANDBOOK.value,
    source_url: '/handbook/',
  },
  {
    stage: 'Mock Stage',
    group: 'Mock Group',
    source_type: DOCUMENTATION_SOURCE_TYPES.DOC.value,
    source_url: '/company/team/',
  },
  {
    date: '2023-04-21',
    author: 'Test User',
    source_type: DOCUMENTATION_SOURCE_TYPES.BLOG.value,
    source_url: '/blog/',
  },
];

export const MOCK_RESPONSE_MESSAGE = {
  id: '123',
  content:
    'To create a new template:\n\n1. Create a new Markdown (`.md`) file inside the `.gitlab/issue_templates/` or `.gitlab/merge_request_templates/` directory in your repository.\n2. Commit the template file to your default branch.\n\nTo check if this has worked correctly, create a new issue or merge request and see if you can find your template in the **Choose a template** dropdown list.',
  contentHtml:
    '\u003cp data-sourcepos="1:1-1:25" dir="auto"\u003eTo create a new template:\u003c/p\u003e\n\u003col data-sourcepos="3:1-5:0" dir="auto"\u003e\n\u003cli data-sourcepos="3:1-3:143"\u003eCreate a new Markdown (\u003ccode\u003e.md\u003c/code\u003e) file inside the \u003ccode\u003e.gitlab/issue_templates/\u003c/code\u003e or \u003ccode\u003e.gitlab/merge_request_templates/\u003c/code\u003e directory in your repository.\u003c/li\u003e\n\u003cli data-sourcepos="4:1-5:0"\u003eCommit the template file to your default branch.\u003c/li\u003e\n\u003c/ol\u003e\n\u003cp data-sourcepos="6:1-6:156" dir="auto"\u003eTo check if this has worked correctly, create a new issue or merge request and see if you can find your template in the \u003cstrong\u003eChoose a template\u003c/strong\u003e dropdown list.\u003c/p\u003e',
  role: MESSAGE_MODEL_ROLES.assistant,
  extras: {
    sources: MOCK_SOURCES,
  },
  requestId: '987',
  errors: [],
  timestamp: '2021-04-21T12:00:00.000Z',
};

export const MOCK_CHUNK_RESPONSE_MESSAGE = {
  chunkId: 1,
  content: 'chunk',
  role: MESSAGE_MODEL_ROLES.assistant,
  requestId: '987',
  errors: [],
  timestamp: '2021-04-21T12:00:00.000Z',
};

export const MOCK_RESPONSE_MESSAGE_FOR_STREAMING = {
  id: '123',
  content: `To change your password in GitLab:

  Log in to your GitLab account.
  Select your avatar in the top right corner and choose Edit profile.
  On the left sidebar, select Password.
  Enter your current password in the Current password field.
  Enter your new password in the New password and Password confirmation fields.
  Select Save password.
  If you don't know your current password, select the I forgot my password link to reset it.
  
  GitLab enforces password requirements when you choose a new password.`,
  contentHtml: '',
  role: 'assistant',
  extras: {},
  requestId: '987',
  errors: [],
  timestamp: '2021-04-21T12:00:00.000Z',
};

export const generateMockResponseChunks = (requestId) => {
  const chunks = [];
  const chunkSize = 5;
  const chunkCount = Math.ceil(MOCK_RESPONSE_MESSAGE_FOR_STREAMING.content.length / chunkSize);
  for (let i = 0; i < chunkCount; i += 1) {
    const chunk = {
      ...MOCK_RESPONSE_MESSAGE_FOR_STREAMING,
      requestId,
      content: MOCK_RESPONSE_MESSAGE_FOR_STREAMING.content.substring(
        i * chunkSize,
        (i + 1) * chunkSize
      ),
      chunkId: i,
    };
    chunks.push(chunk);
  }
  return chunks;
};

export const MOCK_USER_PROMPT_MESSAGE = {
  id: '456',
  content: 'How to create a new template?',
  contentHtml: '',
  role: MESSAGE_MODEL_ROLES.user,
  requestId: '987',
  errors: [],
  timestamp: '2021-04-21T12:00:00.000Z',
  extras: null,
};
