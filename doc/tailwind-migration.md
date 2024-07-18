# Tailwind migration guide

We are transitioning `@gitlab/ui` from custom utilities
to a utility system based on [Tailwind CSS](https://tailwindcss.com/).

We have put significant effort to make this transition as smooth as possible,
and there is a migration script available to automatically migrate a lot of old utility
classes to their Tailwind equivalents.

1. Ensure your CSS build system now utilizes Tailwind as well.
    Make sure your Tailwind config extends `@gitlab/ui/tailwind.defaults` and scans:
    `./node_modules/@gitlab/ui/dist/**/*.{vue,js}`.
    This migration depends on your build system, but here are a few relevant resources.

     - <https://tailwindcss.com/docs/installation>
     - [Adding Tailwind to design.gitlab.com](https://gitlab.com/gitlab-org/gitlab-services/design.gitlab.com/-/merge_requests/3766)
     - [Adding Tailwind to customers.gitlab.com (internal)](https://gitlab.com/gitlab-org/customers-gitlab-com/-/merge_requests/9665)
     - [Tailwind config of gitlab](https://gitlab.com/gitlab-org/gitlab/-/blob/master/config/tailwind.config.js)

2. The following utility classes need to be migrated manually:

     - `gl-transition-slow` => `gl-transition-all gl-duration-slow`
     - `gl-bg-none` => `gl-bg-transparent` (no background color) or `gl-bg-none` (no background image)
     - If updating from a `@gitlab/ui` version < 80, `gl-gap-(x|y)-*` utils [need to be updated](https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/4159)

3. In order to migrate remaining classes automatically, e.g. folder by folder:

    ```bash
    node_modules/@gitlab/ui/bin/migrate_custom_utils_to_tw.bundled.mjs \
      --directories app/assets/ other/folder \
      --tailwind-config tailwind.config.js # optional
    ```

    If you provide a list of files, you can also migrate from stdin:

    ```bash
      cat list_of_files.txt | node_modules/@gitlab/ui/bin/migrate_custom_utils_to_tw.bundled.mjs \
      --from-stdin \
      --tailwind-config tailwind.config.js # optional
    ```

## In the GitLab project

In addition to the `migrate_custom_utils_to_tw` script, GitLab has the `find_frontend_files` script
which can be used to migrate a given frontend asset and its dependencies, all the way down the
dependency tree.

Here's how you would find all the files a page entrypoint relies on:

```sh
scripts/frontend/find_frontend_files.mjs app/assets/javascripts/pages/projects/pipelines/show/index.js
```

It also works with Vue components:

```sh
scripts/frontend/find_frontend_files.mjs app/assets/javascripts/ci/pipeline_details/graph/graph_component_wrapper.vue
```

This scripts results can be piped to the Tailwind migration script using the `--from-stdin` flag.
Here's an example where we are running the migration script in dry mode to see what would get migrated:

```sh
scripts/frontend/find_frontend_files.mjs \
  app/assets/javascripts/ci/pipeline_details/graph/graph_component_wrapper.vue | \
  node_modules/@gitlab/ui/bin/migrate_custom_utils_to_tw.bundled.mjs \
  --tailwind-config config/tailwind.config.js --from-stdin --dry-run
```

If you're happy with the report, execute the migration:

```sh
scripts/frontend/find_frontend_files.mjs \
  app/assets/javascripts/ci/pipeline_details/graph/graph_component_wrapper.vue | \
  node_modules/@gitlab/ui/bin/migrate_custom_utils_to_tw.bundled.mjs \
  --tailwind-config config/tailwind.config.js --from-stdin
```

Remember that these migrations might break some Jest specs. Make sure to run the ones related to your
changes with the `-u` flag to update any snapshots:

```sh
yarn run jest --onlyChanged -u
```

## Caveats

- Some utilities (e.g. `gl-sr-only-focusable`, `gl--flex-center` or `gl-flex-flow-row-wrap`)
  map to multiple classes. They might need extra adjustments depending on the file type.
- HAML might not deal properly with important classes: `.!gl-*`.
  It could mean rewriting class usage to: `%div{class: '!gl-flex' }`

## Useful links

- We have recorded one of these migrations, take a look at the [video](https://youtu.be/R5Qb_XSrCvs)
  to see what the process might look like.
- [This MR](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/158826) is an example of a migration
  done using those scripts.
