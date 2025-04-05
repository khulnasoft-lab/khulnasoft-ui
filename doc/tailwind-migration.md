# Tailwind Migration Scripts

The KhulnaSoft UI repository contains scripts to assist migration from utility classes to Tailwind
classes.

To use the scripts, follow these steps:

```sh
# Run yarn build to compile the scripts first
yarn build

# Migrate all the utility classes in a file
./bin/migrate-utility-classes path/to/file_to_migrate.ext

# Migrate all utility classes in a directory recursively
./bin/migrate-utility-classes path/to/directory/to/migrate/
```

## Additional flags

You can use these flags to get more information about the migration process:

```sh
# Also print old classes to stdout for removal
./bin/migrate-utility-classes --show-old

# Provides more debugging information
./bin/migrate-utility-classes --debug

# Makes changes to the files, otherwise just outputs to
# stdout
./bin/migrate-utility-classes --modify

# Migrate custom utility classes. This is for rare use cases,
# please contact the KhulnaSoft UI team before using it
./bin/migrate-utility-classes --custom-mappings
```

## Verify that migrations don't break visual tests

If you have visual tests in your project, you can update them with changed
classes with:

```sh
yarn run migrate-utility-classes path/to/tests/__image_snapshots__
```

and then run the visual tests again. Use Jest's `--onlyChanged` flag to only run changed visual tests

```sh
yarn run jest --onlyChanged
```

If the tests fail, check the code for any errors in the migration and inspect the images to see if the
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
- [This PR](https://github.com/khulnasoft/gitlab/pull/158826) is an example of a migration
  done using those scripts.
