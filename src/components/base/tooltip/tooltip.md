Using the tooltip component is recommended if you have HTML content.
It is also currently required if the tooltip content needs to change while it's visible
(see [this upstream issue][this upstream issue]). In all other cases, please use the directive.

[this upstream issue]: https://github.com/bootstrap-vue/bootstrap-vue/issues/2142

## Using the component

~~~html
<gl-button ref="someButton">
  ...
</gl-button>

<gl-tooltip :target="() => $refs.someButton">
  some <em>tooltip<em/> text
</gl-tooltip>
~~~

## Using the directive

You will need to import and register `GlTooltipDirective` before you can use it.

~~~html
<script>
import { GlTooltipDirective } from '@gitlab/ui';

export default {
  directives: {
    GlTooltip: GlTooltipDirective,
  },
};
</script>

<element
  v-gl-tooltip.${modifier}
  title="some tooltip text"
>
  ...
</element>
~~~

## Directive attributes

`v-gl-tooltip` directive uses the same attributes as [`v-b-tooltip`][`v-b-tooltip`].

## Under the hood

Tooltip uses [`<b-tooltip>`][`<b-tooltip>`] and [`v-b-tooltip`][`v-b-tooltip`] internally.

[`<b-tooltip>`]: https://bootstrap-vue.org/docs/components/tooltip

[`v-b-tooltip`]: https://bootstrap-vue.org/docs/directives/tooltip
