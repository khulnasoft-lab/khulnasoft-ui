#!/usr/bin/env sh

if [ "$CI" = true ]; then
  echo "Running in CI"

  args="${1}"
  json="--json --outputFile tests/results.json"

  if ! yarn test:visual:internal "${args} ${json}"; then
    echo "Some tests failed. Due to flakyness we are retrying them..."
    yarn test:visual:internal "${args}"
  fi
else
  echo "Visual regression tests can only be run in CI at the moment."
fi
