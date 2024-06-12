<script>
import { BFormText } from '../../../../vendor/bootstrap-vue/src/components/form/form-text';

export default {
  ...BFormText.options,
  name: 'GlFormText',
  render(createElement, context) {
    return BFormText.options.render(createElement, context);
  },
};
</script>
