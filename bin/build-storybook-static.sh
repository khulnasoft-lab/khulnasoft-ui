#!/usr/bin/env sh

set -e

if [ -z "$CI" ]; then
  echo "This script is only meant to run in CI."
  exit 1
fi

DEST=public
if [ "$VUE_VERSION" = "3" ]; then
  DEST=public/vue3
fi
mkdir -p "$DEST"

apt-get update
apt-get install -y brotli gzip
echo "Building storybook..."
yarn storybook-static
mv storybook/* "$DEST"
# See: https://docs.gitlab.com/ee/user/project/pages/introduction.html#serving-compressed-assets
echo "Compressing assets..."
find public -type f -regex '.*\.\(htm\|html\|txt\|text\|js\|json\|css\|svg\|xml\)$' -exec gzip -f -k {} \;
find public -type f -regex '.*\.\(htm\|html\|txt\|text\|js\|json\|css\|svg\|xml\)$' -exec brotli -f -k {} \;
ls -alth "$DEST"
