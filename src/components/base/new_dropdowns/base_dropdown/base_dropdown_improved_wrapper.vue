<script>
import { OutsideDirective } from '../../../../directives/outside/outside';

export default {
  name: 'BaseDropdownImprovedWrapper',
  directives: { Outside: OutsideDirective },
};
</script>

<template>
  <div v-outside.click.focusin="(event) => $emit('close', event)">
    <slot></slot>
  </div>
</template>
