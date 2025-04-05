This intersection observer component is an invisible watcher that emits events when it appears and
dissapears from view.

It acts a a vue-friendly wrapper around the [intersection observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

Because of it's simplicity you can use it for a lot of different things.
It's especially helpful for the lazy loading of images, and infinite scrolling of lists.

Anything slotted inside this component will become the element that is being observed.

This slot can also be used as a fallback for the browsers that don't support the intersection
observer, or in the case that the observer fails to work.
For example, adding a "Fetch more posts" button inside an observer that should fetch more posts
automatically when visible. If the observer fails to work for any reason, the button will still be
clickable, and the experience preserved. Please use a fallback wherever possible as
**the intersection observer API is not supported in IE11**.
