export const mockItems = [
  {
    text: 'Mark as draft',
    href: 'https://gitlab.com',
    extraAttrs: {
      target: '_blank',
      rel: 'nofollow',
      'data-method': 'put',
    },
  },
  {
    text: 'Create new',
    href: 'https://gitlab.com/gitlab-org/gitlab/-/merge_requests/new',
    extraAttrs: {
      rel: 'nofollow',
      target: '_blank',
    },
  },
  {
    text: 'Edit merge request',
    to: '/edit',
    extraAttrs: {
      'data-uuid': '1234',
    },
  },
  {
    text: 'Close merge request',
    action: () => {
      // eslint-disable-next-line no-console
      console.log('CLOSED');
    },
    extraAttrs: {
      class: 'gl-text-red-500!',
      rel: 'nofollow',
      'data-method': 'put',
    },
  },
];

export const mockItemsCustomItem = [
  {
    text: 'Assigned to you',
    href: 'https://gitlab.com/dashboard/merge_requests?assignee_username=root',
    count: '2',
    extraAttrs: {
      target: '_blank',
      rel: 'nofollow',
    },
  },
  {
    text: 'Review requests from you',
    href: 'https://gitlab.com/dashboard/merge_requests?reviewer_username=root',
    count: 0,
    extraAttrs: {
      target: '_blank',
      rel: 'nofollow',
    },
  },
  {
    text: 'I am only visible on mobile!',
    action: () => {
      // eslint-disable-next-line no-console
      console.log('clicked!');
    },
    wrapperClass: 'gl-sm-display-none!',
  },
];

export const mockGroupsCustomItem = [
  {
    name: 'Merge requests',
    items: [
      {
        text: 'Assigned to you',
        href: 'https://gitlab.com/dashboard/merge_requests?assignee_username=root',
        count: 1,
      },
      {
        text: 'Review requests from you',
        href: 'https://gitlab.com/dashboard/merge_requests?reviewer_username=root',
        count: 4,
      },
    ],
  },
];

export const mockGroups = [
  {
    name: 'This project',
    items: [
      {
        text: 'New issue',
        href: 'https://gitlab.com/gitlab-org/gitlab/-/issues/new',
        extraAttrs: {
          target: '_blank',
          rel: 'nofollow',
        },
      },
      {
        text: 'New merge request',
        href: 'https://gitlab.com/gitlab-org/gitlab/-/merge_requests/new',
        extraAttrs: {
          target: '_blank',
          rel: 'nofollow',
        },
      },
      {
        text: 'New snippet',
        href: 'https://gitlab.com/gitlab-org/gitlab/-/snippets/new',
        extraAttrs: {
          target: '_blank',
          rel: 'nofollow',
        },
      },
    ],
  },
  {
    name: 'GitLab',
    items: [
      {
        text: 'New project',
        href: 'https://gitlab.com/projects/new',
        extraAttrs: {
          target: '_blank',
          rel: 'nofollow',
        },
      },
      {
        text: 'New group',
        href: 'https://gitlab.com/groups/new',
        extraAttrs: {
          target: '_blank',
          rel: 'nofollow',
        },
      },
      {
        text: 'New snippet',
        href: 'https://gitlab.com/snippets/new',
        extraAttrs: {
          target: '_blank',
          rel: 'nofollow',
        },
      },
    ],
  },
];

export const mockProfileGroups = [
  {
    items: [
      {
        text: 'Set status',
        href: 'https://gitlab.com',
        icon: 'status_success',
        extraAttrs: {
          target: '_blank',
          rel: 'nofollow',
        },
      },
      {
        text: 'Edit profile',
        href: '#',
        extraAttrs: {
          target: '_blank',
          rel: 'nofollow',
        },
      },
      {
        text: 'Preferences',
        href: '#',
        extraAttrs: {
          target: '_blank',
          rel: 'nofollow',
        },
      },
    ],
  },
  {
    items: [
      {
        text: 'Sign out',
        action: () => {
          // eslint-disable-next-line no-alert
          window.confirm('Are you sure?');
        },
      },
    ],
  },
];
