#!/usr/bin/env node

/* eslint-disable no-console */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import childProcess from 'node:child_process';

const { CI_COMMIT_REF_NAME, GITLAB_INTEGRATION_USER, GITLAB_INTEGRATION_TOKEN, DEPENDENCY_URL } =
  process.env;
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_GITLAB_DIR = path.join(SCRIPT_DIR, 'gitlabTmp');
const INTEGRATION_BRANCH = `gitlab-ui-integration-${CI_COMMIT_REF_NAME}`;

function execInGitLabDir(cmd) {
  return childProcess.execSync(cmd, { cwd: LOCAL_GITLAB_DIR });
}

function branchExists(branchName) {
  const res = execInGitLabDir(`git ls-remote --heads origin ${branchName}`);
  return res.toString().trim().length > 0;
}

function installDevPackage() {
  console.log(`Installing development build from ${DEPENDENCY_URL}.`);
  return execInGitLabDir(`yarn add @gitlab/ui@${DEPENDENCY_URL}`);
}

function localBranchDiffersFromOrigin(branchName) {
  const stat = execInGitLabDir(`git diff --stat origin/${branchName}`);
  return stat.toString().trim().length > 0;
}

function commitAndPushChanges() {
  // Commit changes
  console.log('Committing changes.');
  execInGitLabDir('git add package.json yarn.lock');
  execInGitLabDir(`git commit -m "GitLab UI integration branch for ${CI_COMMIT_REF_NAME}"`);

  // Push
  console.log('Pushing changes to the remote.');
  execInGitLabDir(
    `git push -u https://${GITLAB_INTEGRATION_USER}:${GITLAB_INTEGRATION_TOKEN}@gitlab.com/gitlab-org/gitlab.git HEAD`
  );
}

function main() {
  // Setup
  console.log('Setting git user.');
  childProcess.execSync(`git config --global user.name "GitLab UI Integration Test"`);
  childProcess.execSync(
    `git config --global user.email "${GITLAB_INTEGRATION_USER}@noreply.gitlab.com"`
  );

  console.log(`Cloning into ${LOCAL_GITLAB_DIR}.`);
  childProcess.execSync(
    `git clone --depth=1 https://gitlab.com/gitlab-org/gitlab.git ${LOCAL_GITLAB_DIR}`
  );

  if (branchExists(INTEGRATION_BRANCH)) {
    console.log(`Branch ${INTEGRATION_BRANCH} already exists, checking it out.`);
    execInGitLabDir(`git remote set-branches origin '*'`);
    execInGitLabDir(`git fetch origin ${INTEGRATION_BRANCH}`);
    execInGitLabDir(`git checkout ${INTEGRATION_BRANCH}`);
    installDevPackage();

    if (localBranchDiffersFromOrigin(INTEGRATION_BRANCH)) {
      commitAndPushChanges();
    } else {
      console.log(
        "The remote branch is up-to-date. Follow this link to create an MR:"
      );
      console.log(
        `https://gitlab.com/gitlab-org/gitlab/-/merge_requests/new?merge_request%5Bsource_branch%5D=${INTEGRATION_BRANCH}`
      );
    }
  } else {
    console.log(`Branch ${INTEGRATION_BRANCH} does not exist, creating it.`);
    execInGitLabDir(`git checkout -b ${INTEGRATION_BRANCH}`);
    installDevPackage();
    commitAndPushChanges();
  }
}

main();
