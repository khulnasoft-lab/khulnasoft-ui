#!/bin/bash

./bin/collect_translations.js
git diff --exit-code ./translations.json
if [ $? -ne 0 ]; then
  echo "Translatable labels dictionary is outdated. Please run \`./bin/collect_translations.js\` and commit the changes"
  exit 1
else
  echo "Translatable labels dictionary is up-to-date."
  exit 0
fi