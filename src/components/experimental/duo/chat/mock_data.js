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
  content: '_Duo Chat message_ comming from AI',
  contentHtml: '<p><em>Duo Chat message</em> comming from AI</p>',
  role: MESSAGE_MODEL_ROLES.assistant,
  extras: {
    sources: MOCK_SOURCES,
  },
  requestId: '987',
  errors: [],
  timestamp: '2021-04-21T12:00:00.000Z',
};
