# Lefthook

You can use [lefthook] to setup Git hooks in KhulnaSoft UI so that changed files are linted upon
committing changes. To install `lefthook`, run the following command:

```sh
yarn lefthook install
```

It is recommended to use `lefthook` as it might help you catch formatting issues before they make it
to the remote and trigger a timely and costly pipeline that is guaranteed to fail.

## Bypassing lefthook

If you'd like to bypass the verification step when committing, you can do so by setting the
`LEFTHOOK` variable to `0` when running the `git` command. For example:

```sh
LEFTHOOK=0 git commit -m "chore: reticulate splines"
```

[lefthook]: https://www.npmjs.com/package/@arkweid/lefthook
