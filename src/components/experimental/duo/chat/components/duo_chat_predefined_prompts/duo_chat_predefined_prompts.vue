<script>
/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import GlButton from '../../../../../base/button/button.vue';

export default {
  name: 'GlDuoChatPredefinedPrompts',
  components: {
    GlButton,
  },
  props: {
    /**
     * Array of predefined prompts to display. Every prompt should be a string which will be converted into a prompt when clicked.
     */
    prompts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(prompt) {
      /**
       * Emits the prompt string that was clicked.
       */
      this.$emit('click', prompt);
    },
  },
};
</script>
<template>
  <div class="gl-text-right">
    <div v-for="(prompt, index) in prompts" :key="`question-${index}`" class="gl-mt-3">
      <gl-button category="secondary" variant="confirm" @click="handleClick(prompt)"
        ><span class="gl-whitespace-normal">{{ prompt }}</span></gl-button
      >
    </div>
  </div>
</template>
