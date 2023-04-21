#!/usr/bin/env sh

if [ -z "${CI_MERGE_REQUEST_SOURCE_PROJECT_PATH}" ]; then
  echo "ERROR: CI_MERGE_REQUEST_SOURCE_PROJECT_PATH is not set"
  echo "This is supposed to run in a merge request in CI and not locally"
  exit 1
fi

echo "Setting commit author to GitLab Bot..."
git config --global user.email "gitlab-bot@gitlab.com"
git config --global user.name "GitLab Bot"

# Get back onto the source branch, since we might be on a merged result commit.
echo "Checkout out $CI_MERGE_REQUEST_SOURCE_BRANCH_NAME..."
git checkout "$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME"

echo "Creating chore commit..."
git add .
git commit -m 'chore: update snapshots'

#
# Utilizing CI_MERGE_REQUEST_SOURCE_PROJECT_PATH in order to be able to push to forks
# See: https://docs.gitlab.com/ee/user/project/merge_requests/allow_collaboration.html
#
echo "Pushing to branch ${CI_MERGE_REQUEST_SOURCE_BRANCH_NAME} on ${CI_MERGE_REQUEST_SOURCE_PROJECT_PATH}"

git push \
  "https://gitlab-bot:${GITLAB_TOKEN}@gitlab.com/${CI_MERGE_REQUEST_SOURCE_PROJECT_PATH}.git" \
  "HEAD:${CI_MERGE_REQUEST_SOURCE_BRANCH_NAME}" >/dev/null 2>&1
