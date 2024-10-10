Skeleton loaders are to be used when pages or sections can be progressively populated with content,
such as text and images, as they become available. Generally speaking the first batch of content
will be the lightest to load and is followed by secondary and tertiary content batches. Each loading
step will add in more detail to the page until no skeleton loaders are present anymore. Content
should replace skeleton objects immediately when the data is available.

The skeleton loader component accepts shapes which in return will create a skeleton state with a
loading animation. Any skeleton state components should be created with
`<gl-skeleton-loader></gl-skeleton-loader>`. If no shape is passed via the slot the default skeleton
will be used. See "Default" and "Default With Custom Props" examples.

## The `.gl-animate-skeleton-loader` class

Skeleton loaders can also be composed with a `.gl-animate-skeleton-loader`
CSS class. This CSS-based approach is easier to make responsive and match mocked elements.
Feel free to use this approach if it suits your use case and please leave your
feedback in this [Feedback for css-based skeleton loading
indicator](https://gitlab.com/gitlab-org/gitlab-ui/-/issues/2319) issue.
To improve developer experience and simplify matching Pajamas styles we're considering
several improvements in the future, including adding more CSS util classes for
this animation, or creating a dedicated component.  Here is an example of how
you could replicate the default `<gl-skeleton-loader />` behavior with the
CSS-based approach:

```html
<div>
  <div class="gl-animate-skeleton-loader gl-h-4 gl-rounded-base gl-my-3 !gl-max-w-20"></div>
  <div class="gl-animate-skeleton-loader gl-h-4 gl-rounded-base gl-my-3 !gl-max-w-30"></div>
  <div class="gl-animate-skeleton-loader gl-h-4 gl-rounded-base gl-my-3 !gl-max-w-26"></div>
</div>
```

**USAGE NOTES:** if you're using `gl-max-w-xx` you'll need to add
important (e.g. `!gl-max-w-20`). This is because `.gl-animate-skeleton-loader` already
has a `max-width` statement, and we need to override it. You can override it
only with lower numbers. Width rules (`gl-w-xx`) don't need an override, you
can use them as-is. If you want to "synchronize" two elements next to each
other, try adding `animation-delay` to offset elements.

More complex example (with different shapes and an animation delay for offset elements):

```html
<div class="gl-display-flex gl-flex-direction-column gl-gap-2 gl-w-30">
  <div class="gl-animate-skeleton-loader gl-h-8 gl-rounded-base gl-mb-4"></div>
  <div class="gl-display-flex gl-flex-direction-row gl-gap-2">
    <div class="gl-animate-skeleton-loader gl-h-8 gl-w-8 gl-rounded-full"></div>
    <div class="gl-flex-grow-1" style="animation-delay: 100ms">
      <div class="gl-animate-skeleton-loader gl-h-4 gl-rounded-base gl-my-2"></div>
      <div class="gl-animate-skeleton-loader gl-h-4 gl-rounded-base gl-my-2"></div>
      <div class="gl-animate-skeleton-loader gl-display-inline-block gl-h-4 gl-w-10 gl-rounded-base gl-my-2"></div>
      <div
        class="gl-animate-skeleton-loader gl-display-inline-block gl-h-4 gl-w-10 gl-rounded-base gl-my-2"
        style="animation-delay: 250ms"></div>
    </div>
  </div>
</div>
```

## Progressive Loading

Determine if progressive loading is available, if it is break apart the skeleton to load data as it
becomes readily available. If progessive loading is not available, replace the entire skeleton when
the data is available.

## Under the hood

Skeleton Loader is a port of [vue-content-loader](https://github.com/egoist/vue-content-loader).
Some changes have been made to the code to better suit our codebase, such as removing props and
refactoring into a SFC. Please take a look at their documentation and a useful [UI tool](http://danilowoz.com/create-vue-content-loader/)
for seeing the code output for `svg` shapes.
