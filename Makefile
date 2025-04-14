bin_dir = bin

.PHONY: copy-fonts

copy-fonts: static/fonts/GitLabSans.woff2 static/fonts/GitLabSans-Italic.woff2 \
	static/fonts/GitLabMono.woff2 static/fonts/GitLabMono-Italic.woff2

static/fonts/GitLabSans%: static/fonts
	cp node_modules/@gitlab/fonts/gitlab-sans/$(notdir $@) $@

static/fonts/GitLabMono%: static/fonts
	cp node_modules/@gitlab/fonts/gitlab-mono/$(notdir $@) $@

static/fonts:
	mkdir -p static/fonts

# Translations
translations_file = translations.js
collect_translations_script = $(bin_dir)/collect_translations.js
js_vue_files = $(shell find src/ -type f \( -iname \*.js -o -iname \*.vue \))

$(translations_file): $(collect_translations_script) $(js_vue_files)
	node $(collect_translations_script) > $(translations_file)

# Design tokens
tokens_src_dir := src/tokens
tokens_built_dir := src/tokens/build
tokens_dist_dir := dist/tokens
tokens_src_files := $(shell find $(tokens_src_dir) -name '*.json' -not -path '$(tokens_built_dir)/*')
# There are other targets, but since all are rewritten as part of every build,
# we only need to check some.
tokens_built_files := $(tokens_built_dir)/css/tokens.css $(tokens_dist_dir)/css/tokens.css
tokens_build_script := ./bin/build_tokens.mjs

.PHONY: tokens
tokens: $(tokens_built_files)

$(tokens_built_files): $(tokens_src_files) $(tokens_build_script) package.json yarn.lock
	node $(tokens_build_script)
	@test -f $@ || (echo "Error: $@ was not created" && exit 1)
