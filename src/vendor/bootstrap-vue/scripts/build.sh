#!/usr/bin/env bash
set -e

BV_VERSION=$(node -p "require('./package.json').version")
BV_BANNER=$(node -p "require('./scripts/banner')")

echo "Building BootstrapVue ${BV_VERSION}"
echo ''

echo 'Checking plugin metadata...'
node ./scripts/check-plugin-meta.mjs || exit 1
echo 'Done.'
echo ''

# Cleanup
rm -rf dist esm

echo 'Compile JS...'
rollup -c scripts/rollup.config.js
echo 'Done.'
echo ''

echo 'Compiling ESM modular build...'
NODE_ENV=esm babel src \
    --out-dir esm \
    --ignore 'src/**/*.spec.js' \
    --ignore 'src/browser.js'
echo "${BV_BANNER}" | cat - esm/index.js > esm/tmp.js && mv -f esm/tmp.js esm/index.js
echo 'Done.'
echo ''

echo 'Minify JS...'
# We instruct terser to preserve our `Bv*Event` class names and
# safe types (i.e. `Element`, etc.) when mangling top level names
terser dist/bootstrap-vue.js \
    --compress typeofs=false \
    --mangle reserved=['BvEvent','BvModalEvent','Element','HTMLElement','SVGElement'] \
    --toplevel \
    --keep-classnames \
    --comments "/^!/" \
    --source-map "content=dist/bootstrap-vue.js.map,includeSources,url=bootstrap-vue.min.js.map" \
    --output dist/bootstrap-vue.min.js
terser dist/bootstrap-vue.common.js \
    --compress typeofs=false \
    --mangle reserved=['BvEvent','BvModalEvent','Element','HTMLElement','SVGElement'] \
    --toplevel \
    --keep-classnames \
    --comments "/^!/" \
    --source-map "content=dist/bootstrap-vue.common.js.map,includeSources,url=bootstrap-vue.common.min.js.map" \
    --output dist/bootstrap-vue.common.min.js
terser dist/bootstrap-vue.esm.js \
    --compress typeofs=false \
    --mangle reserved=['BvEvent','BvModalEvent','Element','HTMLElement','SVGElement'] \
    --toplevel \
    --keep-classnames \
    --comments "/^!/" \
    --source-map "content=dist/bootstrap-vue.esm.js.map,includeSources,url=bootstrap-vue.esm.min.js.map" \
    --output dist/bootstrap-vue.esm.min.js
echo 'Done.'
echo ''
