#!/bin/bash

yarn build-tokens
git diff --exit-code ./src/tokens/build
if [ $? -ne 0 ]; then
  echo "Tokens build is outdated. Please run \`yarn build-tokens\` and commit the changes"
  exit 1
else
  echo "Tokens build is up-to-date."
  exit 0
fi
