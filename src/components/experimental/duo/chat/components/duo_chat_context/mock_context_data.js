export const MOCK_CONTEXT_ITEM_FILE = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  isEnabled: true,
  metadata: {
    name: 'strawberry.ts',
    info: {
      project: 'example/garden',
      relFilePath: 'src/plants/strawberry.ts',
    },
  },
  type: 'project_file',
};

export const MOCK_CONTEXT_ITEM_FILE_DISABLED = {
  id: '323e4567-e89b-12d3-a456-426614174002',
  isEnabled: false,
  metadata: {
    name: 'motorbike.cs',
    info: {
      project: 'example/vehicles',
      relFilePath: '/src/VehicleFoo/motorbike.cs',
    },
  },
  type: 'project_file',
};
const mockFiles = [
  MOCK_CONTEXT_ITEM_FILE,
  {
    id: '223e4567-e89b-12d3-a456-426614174001',
    isEnabled: true,
    metadata: {
      name: 'potato.ts',
      info: {
        project: 'example/garden',
        relFilePath: '/src/plants/potato.ts',
      },
    },
    type: 'project_file',
  },
  MOCK_CONTEXT_ITEM_FILE_DISABLED,
];

export const MOCK_CONTEXT_ITEM_ISSUE = {
  id: '423e4567-e89b-12d3-a456-426614174003',
  isEnabled: true,
  metadata: {
    name: 'Implement watering schedule',
    info: {
      project: 'example/garden',
      iid: 1234,
    },
  },
  type: 'issue',
};
export const MOCK_CONTEXT_ITEM_ISSUE_DISABLED = {
  id: 'c463fb31-2a4c-4f8e-a609-97230ac48ae5',
  isEnabled: false,
  metadata: {
    name: 'Fix vehicle colours',
    info: {
      project: 'example/vehicle',
      iid: 91011,
    },
  },
  disabledReasons: ['This foo is not available to bar', 'Lorem something something wow?'],
  type: 'issue',
};

const mockIssues = [
  MOCK_CONTEXT_ITEM_ISSUE,
  {
    id: '523e4567-e89b-12d3-a456-426614174004',
    isEnabled: true,
    metadata: {
      name: 'Refactor plant growth rates',
      info: {
        project: 'example/garden',
        iid: 5678,
      },
    },
    type: 'issue',
  },
  MOCK_CONTEXT_ITEM_ISSUE_DISABLED,
];

export const MOCK_CONTEXT_ITEM_MERGE_REQUEST = {
  id: '623e4567-e89b-12d3-a456-426614174005',
  isEnabled: true,
  metadata: {
    name: 'Improve database performance',
    info: {
      project: 'example/garden',
      iid: 1122,
    },
  },
  type: 'merge_request',
};
export const MOCK_CONTEXT_ITEM_MERGE_REQUEST_DISABLED = {
  id: '4eb665fc-e5e1-49b0-9789-2a16964e461a',
  isEnabled: false,
  metadata: {
    name: 'Fix broken layout at small viewports',
    info: {
      project: 'example/vehicle',
      iid: 5566,
    },
  },
  disabledReasons: ['This foo is not available to bar', 'Lorem something something wow?'],
  type: 'merge_request',
};

const mockMergeRequests = [
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
  {
    id: '723e4567-e89b-12d3-a456-426614174006',
    isEnabled: false,
    metadata: {
      name: 'Add vehicle registration details',
      info: {
        project: 'example/vehicle',
        iid: 3344,
      },
    },
    disabledReasons: ['This foo is not available to bar', 'Lorem something something wow?'],
    type: 'merge_request',
  },
  MOCK_CONTEXT_ITEM_MERGE_REQUEST_DISABLED,
];

export const getMockContextItems = () => {
  const allItems = [...mockFiles, ...mockIssues, ...mockMergeRequests];

  // put disabled items in the back
  const disabledItems = allItems.filter((item) => !item.isEnabled);
  const enabledItems = allItems.filter((item) => item.isEnabled);
  return [...enabledItems, ...disabledItems];
};
