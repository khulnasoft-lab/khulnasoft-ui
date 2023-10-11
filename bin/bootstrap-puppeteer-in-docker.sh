#!/usr/bin/env bash
# Use the unofficial bash strict mode: http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail; export FS=$'\n\t'

# Workaround for https://github.com/GoogleChrome/puppeteer/issues/290
apt-get update
apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgbm-dev libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# Install all security updates for current debian version
apt-get install -yq debsecan
source /etc/os-release
apt-get install -yq $(debsecan --suite $VERSION_CODENAME --format packages --only-fixed)
apt-get remove -yq debsecan

# Cleanup after apt
apt-get autoremove -yq
apt-get clean -yqq
rm -rf /var/lib/apt/lists/*

# Install noto:
# copied from https://gitlab.com/gitlab-org/gitlab-build-images/-/blob/1dfcccc222d6396f8591b6bb9362e170888591a3/scripts/install-chrome
function download_noto() {
  local NOTO_VERSION
  # https://github.com/googlefonts/noto-emoji/releases/tag/v2.038
  NOTO_VERSION="v2.038"
  curl --silent -O --location --fail "https://github.com/googlefonts/noto-emoji/raw/${NOTO_VERSION}/fonts/NotoColorEmoji.ttf"
  echo "NotoColorEmoji.ttf"
}

echo "Installing Noto emoji font"
FONT_FILE=$(download_noto)

mkdir -p /usr/local/share/fonts
mv "$FONT_FILE" /usr/local/share/fonts/
chmod 644 "/usr/local/share/fonts/${FONT_FILE}"
ls -la /usr/local/share/fonts/

fc-cache -fv
fc-match --sort
