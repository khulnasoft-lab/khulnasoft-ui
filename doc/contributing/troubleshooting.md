# Troubleshooting

## `pnpm build -w` results a "JavaScript heap out of memory error"

Watching for changes in KhulnaSoft UI files can be memory intensive. You can increase the amount of
memory you can use to run the process.

```sh
NODE_OPTIONS="--max-old-space-size=4096" pnpm build -w
```

We are keeping track of this problem at <https://github.com/khulnasoft/khulnasoft-ui/issues/614>

## Caching on GitHub Actions

We are caching our `node_modules/` folder on GitHub Actions. This should not lead to problems, as we
are basing the cache on:

- Node.js version
- pnpm-lock.yaml

So any time our dependencies change, we will create a new cache. The advantage of this is:
As long as these stay the same, we can cache even across branches!

In the unlikely event we are seeing build errors, the cache can be manually
[cleared through GitHub Actions](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows#managing-caches).
