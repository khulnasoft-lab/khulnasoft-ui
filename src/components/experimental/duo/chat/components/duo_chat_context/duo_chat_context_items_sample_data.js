import { faker } from '@faker-js/faker';

export const categories = [
  { label: 'Files', value: 'file', icon: 'document' },
  { label: 'Issues', value: 'issue', icon: 'issues' },
  { label: 'Merge Requests', value: 'merge_request', icon: 'merge-request' },
];

const generateFile = () => ({
  id: faker.string.uuid(),
  name: faker.system.fileName({ extensionCount: { min: 1, max: 3 } }),
  isEnabled: faker.datatype.boolean(),
  info: {
    project: `${faker.internet.domainWord()  }/${  faker.internet.domainWord()}`,
    relFilePath: faker.system.filePath(),
  },
  type: 'file',
  subType: faker.helpers.arrayElement(['open_tab', 'local_file_search']),
});

const generateIssue = () => ({
  id: faker.string.uuid(),
  name: faker.hacker.phrase(),
  isEnabled: faker.datatype.boolean(),
  info: {
    project: `${faker.internet.domainWord()  }/${  faker.internet.domainWord()}`,
    iid: faker.number.int({ min: 1000, max: 9999 }),
    disabledReasons: faker.datatype.boolean() ? [faker.lorem.sentence(), faker.lorem.sentence()] : [],
  },
  type: 'issue',
});

const generateMergeRequest = () => ({
  id: faker.string.uuid(),
  name: faker.git.commitMessage(),
  isEnabled: faker.datatype.boolean(),
  info: {
    project: `${faker.internet.domainWord()  }/${  faker.internet.domainWord()}`,
    iid: faker.number.int({ min: 1000, max: 9999 }),
  },
  type: 'merge_request',
});

export const generateSampleContextItems = (count = 100) => {
  const items = Array.from({ length: count }, () => {
    const type = faker.helpers.arrayElement(['file', 'issue', 'merge_request']);
    switch (type) {
      case 'file':
        return generateFile();
      case 'issue':
        return generateIssue();
      case 'merge_request':
        return generateMergeRequest();
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  // put disabled items in the back
  const disabledItems = items.filter((item) => !item.isEnabled);
  const enabledItems = items.filter((item) => item.isEnabled);
  return [...enabledItems, ...disabledItems];
};