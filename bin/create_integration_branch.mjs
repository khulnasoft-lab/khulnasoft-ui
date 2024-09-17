#!/usr/bin/env node

/* eslint-disable no-console */

import fs from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import childProcess from 'node:child_process';

const { DEPENDENCY_URL, GITLAB_INTEGRATION_REST_TOKEN, CI_COMMIT_REF_NAME } = process.env;

const TMP_DIR = path.join(tmpdir(), 'tmpIntegrationInstall');
const TRACKED_FILES = ['package.json', 'yarn.lock'];
const API_ROOT = 'https://gitlab.com/api/v4';
const GITLAB_PROJECT_ID = encodeURIComponent('gitlab-org/gitlab');
const FORK_PROJECT = 'gitlab-org/frontend/gitlab-ui-integrations';
const FORK_PROJECT_ID = encodeURIComponent(FORK_PROJECT);
const API_ENDPOINT_REPOSITORY_BRANCH = '/projects/:id/repository/branches/:branch';
const API_ENDPOINT_REPOSITORY_RAW_FILE = '/projects/:id/repository/files/:file_path';
const API_ENDPOINT_CREATE_COMMIT = '/projects/:id/repository/commits';
const INTEGRATION_BRANCH_NAME = `gitlab-ui-integration/${CI_COMMIT_REF_NAME}`;

function buildApiUrl(endpoint, params = {}, searchParams = {}) {
  let apiPath = endpoint;

  Object.entries(params).forEach(([key, value]) => {
    apiPath = apiPath.replace(`:${key}`, value);
  });

  const url = new URL(API_ROOT + apiPath);

  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.href;
}

function createTemporaryDirectory() {
  if (fs.existsSync(TMP_DIR)) {
    return;
  }
  fs.mkdirSync(TMP_DIR);
}

async function remoteBranchExists() {
  const response = await fetch(
    buildApiUrl(API_ENDPOINT_REPOSITORY_BRANCH, {
      id: FORK_PROJECT_ID,
      branch: encodeURIComponent(INTEGRATION_BRANCH_NAME),
    })
  );
  return response.status === 200;
}

async function pullFileFromProject(file, project, branch) {
  console.log(`Fetching ${file} from the remote repository.`);
  const response = await fetch(
    buildApiUrl(
      API_ENDPOINT_REPOSITORY_RAW_FILE,
      {
        id: project,
        file_path: encodeURIComponent(file),
      },
      {
        ref: branch,
      }
    )
  );
  const json = await response.json();
  const localFilePath = path.join(TMP_DIR, file);
  console.log(`Writing output to ${localFilePath}.`);
  fs.writeFileSync(localFilePath, Buffer.from(json.content, 'base64'), 'utf-8');
}

function installGitLabUIDevBuild() {
  console.log(`Installing development build from ${DEPENDENCY_URL}.`);
  childProcess.execSync(`yarn add --ignore-scripts @gitlab/ui@${DEPENDENCY_URL}`, {
    cwd: TMP_DIR,
  });
}

async function pushChangesToFork(createBranch = true) {
  console.log('Pushing changes to the forked repository.');

  const payload = {
    ...(createBranch ? { start_branch: 'master' } : {}),
    branch: INTEGRATION_BRANCH_NAME,
    commit_message: `GitLab UI integration test for ${CI_COMMIT_REF_NAME}`,
    actions: TRACKED_FILES.map((file) => ({
      action: 'update',
      file_path: file,
      content: fs.readFileSync(path.join(TMP_DIR, file), 'utf-8'),
    })),
  };

  const res = await fetch(
    buildApiUrl(API_ENDPOINT_CREATE_COMMIT, {
      id: FORK_PROJECT_ID,
    }),
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'PRIVATE-TOKEN': GITLAB_INTEGRATION_REST_TOKEN,
        'Content-Type': 'application/json',
      },
    }
  );

  const createMRLink = `https://gitlab.com/${FORK_PROJECT}/-/merge_requests/new?merge_request%5Bsource_branch%5D=${INTEGRATION_BRANCH_NAME}`;

  if (createBranch && res.status === 201) {
    console.log(
      `Integration branch created successfully. Follow this link to create an MR: ${createMRLink}.`
    );
    return;
  }

  if (!createBranch && res.status === 201) {
    console.log(
      `Integration branch updated successfully. If you haven't created an MR yet, follow this link to create one: ${createMRLink}.`
    );
    return;
  }

  if (!createBranch && res.status === 400) {
    console.warn(
      `The integration branch is already up-to-date. If you haven't created an MR yet, follow this link to create one: ${createMRLink}.`
    );
    return;
  }

  console.error(`Could not push the changes. See below for more information about the failure.`);
  console.error(res);
}

try {
  const branchExists = await remoteBranchExists();

  if (branchExists) {
    console.log(
      `The branch \`${INTEGRATION_BRANCH_NAME}\` exists on the remote so we will update it.`
    );
  } else {
    console.log(`A new branch \`${INTEGRATION_BRANCH_NAME}\` will be created on the remote.`);
  }

  const sourceProject = branchExists ? FORK_PROJECT_ID : GITLAB_PROJECT_ID;
  const sourceBranch = branchExists ? INTEGRATION_BRANCH_NAME : 'master';

  createTemporaryDirectory();
  await Promise.all(
    TRACKED_FILES.map((file) => pullFileFromProject(file, sourceProject, sourceBranch))
  );
  installGitLabUIDevBuild();
  await pushChangesToFork(!branchExists);
} catch (error) {
  console.error('Could not create integration branch.');
  console.error(error);
  process.exitCode = 1;
}
