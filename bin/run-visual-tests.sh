#!/usr/bin/env sh

if [ "$CI" = true ]; then
  echo "Running in CI"

  args="${1}"
  json="--json --outputFile tests/results.json"

  if [ -n "$CI_NODE_INDEX" ]; then
    args="${args} --shard $CI_NODE_INDEX/$CI_NODE_TOTAL"
  fi

  if ! yarn test:visual:internal "${args} ${json}"; then
    echo "Some tests failed. Due to flakyness we are retrying them..."
    yarn test:visual:internal "${args}"
  fi
else
  echo "Visual regression tests can only be run in CI at the moment."
  exit 1
fi
