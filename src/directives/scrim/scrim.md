This directive can be used to add semi-transparent scrim to elements
with scrollable body

Under the hood it uses `pseudo elements`: `::after` for bottom scrim and
`::before` for top scrim.

Events listener for scroll events is throttled in order to improve
performance

## Usage

Default scrim is on bottom

```html
<script>
import { GlScrimDirevtive as Scrim } from '@gitlab/ui';

export default {
  directives: { Scrim },
};
</script>

<template>
  <div v-scrim>Content is scrollable with overflow auto or scroll</div>
</template>
```

Scrim on top of container

```html
<script>
import { GlScrimDirevtive as Scrim } from '@gitlab/ui';

export default {
  directives: { Scrim },
};
</script>

<template>
  <div v-scrim:top>Content is scrollable with overflow auto or scroll</div>
</template>
```

Scrim on both top and bottom of container

```html
<script>
import { GlScrimDirevtive as Scrim } from '@gitlab/ui';

export default {
  directives: { Scrim },
};
</script>

<template>
  <div v-scrim:top_bottom>Content is scrollable with overflow auto or scroll</div>
</template>
```

## Caveats

- Scrim is positioned as `sticky` so scrim would be affected by top
  and bottom padding of element. Better set it to 0
- Element should be scrollable with overflow either `auto` or `hidden`
