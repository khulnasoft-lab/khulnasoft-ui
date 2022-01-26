#!/usr/bin/env sh

set -e

BASE_IMAGE=registry.gitlab.com/gitlab-org/gitlab-build-images:gitlab-puppeteer
CURRENT_PUPPETEER_VERSION=$(grep '^puppeteer@' -A 1 yarn.lock | grep 'version' | sed 's#.*"\(.*\)".*#\1#')

echo "puppeteer version: $PUPPETEER_VERSION"

if ! [ "$CURRENT_PUPPETEER_VERSION" = "$PUPPETEER_VERSION" ]; then
    echo "The puppeteer version in .gitlab-ci.yml ($PUPPETEER_VERSION) and yarn.lock ($CURRENT_PUPPETEER_VERSION) do not match"
    echo "Please ensure that they both have the same value!"
    echo "If you are testing this script locally, setting the ENV variable PUPPETEER_VERSION=$CURRENT_PUPPETEER_VERSION will help you bypass this check."
    exit 1
fi

TARGET_IMAGE=${PUPPETEER_IMAGE:-gitlab-ui-puppeteer:$PUPPETEER_VERSION}

if DOCKER_CLI_EXPERIMENTAL=enabled docker manifest inspect "$TARGET_IMAGE" 2> /dev/null > /dev/null; then
    echo "Docker image $TARGET_IMAGE already exists"
    exit 0
else
    echo "Building target image $TARGET_IMAGE"
fi

docker build . \
  -f Dockerfile.puppeteer \
  --build-arg "PUPPETEER_VERSION=$PUPPETEER_VERSION" \
  --tag "$TARGET_IMAGE"

if [ -n "$CI_REGISTRY" ]; then
    echo "Everything is fine, we are pushing $TARGET_IMAGE"
    docker push "$TARGET_IMAGE"
else
    echo "Not pushing $TARGET_IMAGE, as we do not seem to be in a CI environment"
fi
