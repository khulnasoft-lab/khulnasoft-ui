#!/usr/bin/env sh

if [ "$CI" = true ]; then
  echo "Running in CI"
  if yarn test:visual:internal "${1}" ; then
    echo "Visual regression tests succeeded."
  else
    echo "\nVisual regression tests failed.\nIf the visual changes are expected, run the \`update_screenshots\` manual CI job."
    exit 1
  fi
else
  echo "Visual regression tests can only be run in CI at the moment."
fi
