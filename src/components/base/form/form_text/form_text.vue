<script>
import { BFormText } from 'bootstrap-vue';

export default {
  ...BFormText.options,
  name: 'GlFormText',
  render(createElement, context) {
    return BFormText.options.render(createElement, context);
  },
};
</script>
