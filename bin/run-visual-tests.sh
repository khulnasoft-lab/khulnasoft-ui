#!/usr/bin/env sh

if [ "$CI" = true ]; then
  echo "Running in CI"
  yarn test:visual:internal "${1}"
else
  echo "Visual regression tests can only be run in CI at the moment."
fi
