Pagination is used to help users parse a large number of items on a page,
whenever there are too many results to show at once. Pagination breaks up
results into several pages with controls for navigating forward and backward, or
to a specific page.

## Usage

The simplest way to use `GlKeysetPagination` with a paginated GraphQL response
is to `v-bind` to the
[`PageInfo`](https://docs.gitlab.com/ee/api/graphql/reference/#pageinfo) type
returned by the endpoint:

```html
<gl-keyset-pagination v-bind="pageInfo" />
```

This is possible because the default field names of the `PageInfo` type align
with the `props` of this component.

## Dos and don'ts

**✅ Do** provide the `prevText` and `nextText` props with translatable strings.
The default strings ("Prev" and "Next") are hardcoded in this component and
can't be translated.

Example:

```html
<gl-keyset-pagination v-bind="pageInfo" :prev-text="__('Prev')" :next-text="__('Next')" />
```

**✅ Do** use this component for paginating GraphQL requests<sup>1</sup> (or any
endpoint that uses keyset pagination).

**❌ Don't** use this component for paginating REST requests<sup>1</sup> (or any
endpoint that uses offset pagination).

For offset pagination, use the [`GlPagination`
component](/?path=/story/base-pagination--default) instead.

For more information on the difference between offset and keyset pagination see
[our documentation on GraphQL
pagination](https://docs.gitlab.com/ee/development/graphql_guide/pagination.html).

<small><sup>1</sup>There's no intrinsic reason why GraphQL endpoints can't
support offset pagination (in fact, [the official
documentation](https://graphql.org/learn/pagination/#pagination-and-edges) shows
an example offset pagination implementation) or why REST endpoints can't support
keyset pagination. This is simply how we've chosen to implement our REST and
GraphQL endpoints at GitLab.</small>

## Pajamas reference

<https://design.gitlab.com/components/pagination>
