# Testing GitLab UI changes in GitLab

When introducing major, or potentially breaking changes in GitLab UI, you might want to verify that
they properly integrate in GitLab before they are released in a new `@gitlab/ui` version.

This can be done either by building the `@gitlab/ui` package locally, or by using the package that
is built everytime a pipeline runs against your branch.

See [Updating GitLab UI Packages](doc/updating-gitlab-ui-packages.md) for information on how the
`@gitlab/ui` package is kept up to date in various other projects.

## Testing your changes in a local GitLab instance

During development, you can link your local `@gitlab/ui` package changes to the GitLab project.
This means you don't need to update `package.json`, and can easily test changes.

Run the following commands to link the `@gitlab/ui` package:

```shell
yarn link
yarn build -w
```

Then, run the following command in the `gitlab` project:

```shell
yarn link @gitlab/ui
```

Once you are done run `yarn unlink @gitlab/ui` within the `gitlab` project.

Alternatively, [yalc](https://github.com/wclr/yalc) can be used instead to link projects.

1. Install `yalc` with `yarn global add yalc`
1. Navigate to the `@gitlab/ui` directory and publish the package with `yalc publish`.
1. Navigate to the `gitlab` project and add published package with `yalc add @gitlab/ui`.
1. Run `yarn install --check-files` to pull package updates.

To propagate changes in the `@gitlab/ui` project automatically to all installations use
the following command `yalc publish --push`.

## Using the remote development package

This approach relies on the development package that's built and published as an artifact by the
`build_package` CI job. This is especially useful if the changes you are making in GitLab UI require
some code to be migrated in GitLab as you will be able to open a GitLab MR to preemptively integrate
your changes before they are released with a new version of `@gitlab/ui`.

Your development flow would then look like this:

1. Push your changes to GitLab UI.
1. A development package is built by the `build_package` job.
1. Create a new branch in GitLab and install the development package.
1. Do any required migration in the GitLab branch, push it and open an MR against it.
1. Get your GitLab UI _and_ GitLab MRs reviewed.
1. Get the GitLab UI MR merged.
1. A new version of `@gitlab/ui` containing your changes is released.
1. Update the GitLab MR to use the newly released version of `@gitlab/ui` instead of the development
   build.
1. Get your GitLab MR merged.

To help with this process, GitLab UI exposes a `create_integration_branch` manual CI job that will
automatically create (or update) an integration branch in GitLab and install the `@gitlab/ui`
development build.

![Create integration branch CI job location](../images/create_integration_branch.png 'Create integration branch CI job location')

You would then only need to create a new Merge Request from that branch by following the link at
the end of the `create_integration_branch` job's output.

![Integration branch link location](../images/integration_branch_job_log.png 'Integration branch link location')

Once you create the GitLab integration Merge Request, add a note to the GitLab UI Merge Request
with a link pointing to it. This way, the reviewers can use the integration Merge Request to run
their own verifications.
