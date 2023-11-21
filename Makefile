bin_dir = bin

scss_dir = src/scss

# Generate utilities
generate_utilities_script = ${bin_dir}/generate_utilities.js
utilities_mixin_scss = ${scss_dir}/utility-mixins/*.scss
utilities_scss = ${scss_dir}/utilities.scss

${utilities_scss}: ${utilities_mixin_scss} ${generate_utilities_script}
	node ${generate_utilities_script}

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
translations_file = translations.json
collect_translations_script = ${bin_dir}/collect_translations.js
js_vue_files = $(shell find src/ -type f \( -iname \*.js -o -iname \*.vue \))

${translations_file}: ${collect_translations_script} ${js_vue_files}
	node ${collect_translations_script}
