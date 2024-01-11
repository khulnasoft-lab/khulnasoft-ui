# Troubleshooting

## `yarn build -w` results a "JavaScript heap out of memory error"

Watching for changes in GitLab UI files can be memory intensive. You can increase the amount of
memory you can use to run the process.

```sh
NODE_OPTIONS="--max-old-space-size=4096" yarn build -w
```

We are keeping track of this problem at <https://gitlab.com/gitlab-org/gitlab-ui/issues/614>

## Caching on GitLab CI

We are caching our `node_modules/` folder on GitLab CI. This should not lead to problems, as we
are basing the cache hash on:

- .gitlab-ci.yml
- yarn.lock

So any time our dependencies or CI config, we will create a new cache. The advantage of this is:
As long as these stay the same, we can cache even across branches!

In the unlikely event we are seeing build errors, the cache can be manually
[reset by maintainer](https://docs.gitlab.com/ee/ci/caching/#clearing-the-cache-manually).
