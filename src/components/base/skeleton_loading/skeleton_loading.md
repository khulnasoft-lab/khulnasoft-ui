The Skeleton Loading component has been deprecated, please use [Skeleton Loader](https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-skeleton-loader--default).

How to replace this component with [Skeleton Loader](https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-skeleton-loader--default):

1. Update imports
   - `import { GlSkeletonLoading } from '@gitlab/ui'` -> `import { GlSkeletonLoader } from '@gitlab/ui'`
2. Update component definitions
   - `components: { GlSkeletonLoading }` -> `components: { GlSkeletonLoader }`
3. Update template
   - `<gl-skeleton-loading />` -> `<gl-skeleton-loader />`
