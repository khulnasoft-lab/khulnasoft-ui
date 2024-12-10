import GlIcon from '../components/base/icon/icon.vue';

export const Default = () => ({
  components: { GlIcon },
  template: `
    <div class="gl-grid gl-gap-3 gl-text-base">
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-feedback-strong gl-text-feedback-strong">
        <gl-icon class="gl-fill-feedback-strong" name="error" />
        <span class="gl-flex-1">feedback.strong</span>
      </div>
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-feedback-neutral gl-text-feedback-neutral">
        <gl-icon class="gl-fill-feedback-neutral" name="error" />
        <span class="gl-flex-1">feedback.neutral</span>
      </div>
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-feedback-info gl-text-feedback-info">
        <gl-icon class="gl-fill-feedback-info" name="error" />
        <span class="gl-flex-1">feedback.info</span>
      </div>
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-feedback-success gl-text-feedback-success">
        <gl-icon class="gl-fill-feedback-success" name="error" />
        <span class="gl-flex-1">feedback.success</span>
      </div>
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-feedback-warning gl-text-feedback-warning">
        <gl-icon class="gl-fill-feedback-warning" name="error" />
        <span class="gl-flex-1">feedback.warning</span>
      </div>
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-feedback-danger gl-text-feedback-danger">
        <gl-icon class="gl-fill-feedback-danger" name="error" />
        <span class="gl-flex-1">feedback.danger</span>
      </div>
    </div>
  `,
});

export default {
  title: 'tokens/feedback',
  component: '',
};
