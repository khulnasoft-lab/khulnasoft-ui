<script>
import { OutsideDirective } from '../../../../directives/outside/outside';

export default {
  name: 'BaseDropdownDeprecatedWrapper',
  directives: { Outside: OutsideDirective },
};
</script>

<template>
  <div v-outside="(event) => $emit('close', event)">
    <slot></slot>
  </div>
</template>
