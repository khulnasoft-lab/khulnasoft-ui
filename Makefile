bin_dir = bin

scss_dir = src/scss
scss_js_dir = scss_to_js

# SCSS variables to JavaScript
scss_variables = ${scss_dir}/variables.scss
scss_json = ${scss_js_dir}/scss_variables.json
scss_js = ${scss_js_dir}/scss_variables.js
scss_js_export_script = ${bin_dir}/export_scss.js

${scss_json}: ${scss_variables}
	mkdir -p ${scss_js_dir}
	yarn sass-export ${scss_variables} -d "${scss_dir}" -o ${scss_json}

${scss_js}: ${scss_json} ${scss_js_export_script}
	node ${scss_js_export_script}

# Generate utilities
generate_utilities_script = ${bin_dir}/generate_utilities.js
utilities_mixin_scss = ${scss_dir}/utility-mixins/*.scss
utilities_scss = ${scss_dir}/utilities.scss

${utilities_scss}: ${utilities_mixin_scss} ${generate_utilities_script}
	node ${generate_utilities_script}

.PHONY: copy-fonts

copy-fonts: static/fonts/GitLabSans.woff2 static/fonts/GitLabMono.woff2

static/fonts/GitLabSans.woff2: static/fonts
	cp node_modules/@gitlab/fonts/gitlab-sans/GitLabSans.woff2 $@

static/fonts/GitLabMono.woff2: static/fonts
	cp node_modules/@gitlab/fonts/gitlab-mono/GitLabMono.woff2 $@

static/fonts:
	mkdir -p static/fonts
