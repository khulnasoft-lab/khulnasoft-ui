#!/usr/bin/env bash

export NODE_ENV=test
export IS_VISUAL_TEST=true

function build_command() {
  local TEST_COMMAND="yarn run test:visual:internal"

  # Updating snapshots if corresponding CI variable is set
  if [ -n "$UPDATE_SNAPSHOT" ]; then
    export JEST_IMAGE_SNAPSHOT_TRACK_OBSOLETE=true
    TEST_COMMAND="$TEST_COMMAND --updateSnapshot"
  fi

  # Running in parallel
  if [ -n "$CI_NODE_INDEX" ]; then
    TEST_COMMAND="$TEST_COMMAND --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL"
  fi
  echo "yarn run server-test http-get://localhost:9001 '$TEST_COMMAND'"
}

CMD=$(build_command)

if [ "$CI" = true ]; then
  echo "Running in CI: $CMD"
  $CMD
else
  echo "Running locally (in docker): $CMD"
  if which docker >/dev/null; then
    CID_FILE="/tmp/gitlab_ui_storyshots_$(date +%s).cid"
    PUPPETEER_VERSION=$(grep '^puppeteer@' -A 1 yarn.lock | grep 'version' | sed 's#.*"\(.*\)".*#\1#')
    docker build --build-arg "PUPPETEER_VERSION=$PUPPETEER_VERSION" -f Dockerfile.storyshots . -t gitlab-ui-storyshots &&
      docker run \
        --env NODE_ENV \
        --env IS_VISUAL_TEST \
        --env JEST_IMAGE_SNAPSHOT_TRACK_OBSOLETE \
        --cidfile "$CID_FILE" \
        -v "$(pwd)/tests":/tests gitlab-ui-storyshots \
        $CMD

    echo "Cleaning up..."
    CID=$(cat "$CID_FILE")
    docker rm "$CID"
    rm "$CID_FILE"
  else
    printf "Docker must be installed to run this script.\nhttps://www.docker.com/"
    exit 1
  fi
fi
