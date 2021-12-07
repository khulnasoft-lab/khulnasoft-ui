<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  computed: {
    state() {
      return this.name.length >= 4;
    },
    invalidFeedback() {
      let feedbackText = 'This field is required.';

      if (this.name.length > 4) {
        feedbackText = '';
      } else if (this.name.length > 0) {
        feedbackText = 'Enter at least 4 characters.';
      }

      return feedbackText;
    },
  },
};
</script>
<template>
  <gl-form-group
    label="Name"
    description="Enter a first and last name."
    :invalid-feedback="invalidFeedback"
    :state="state"
    label-for="input1"
  >
    <gl-form-input id="input1" v-model.trim="name" :state="state" />
  </gl-form-group>
</template>
