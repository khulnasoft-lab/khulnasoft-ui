import GlIcon from '../components/base/icon/icon.vue';

export const Default = () => ({
  components: { GlIcon },
  template: `
    <div class="gl-grid gl-gap-3 gl-text-base">
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-status-neutral gl-text-status-neutral">
        <gl-icon class="gl-fill-status-neutral" name="error" />
        <span class="gl-flex-1">status.neutral</span>
      </div>
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-status-info gl-text-status-info">
        <gl-icon class="gl-fill-status-info" name="error" />
        <span class="gl-flex-1">status.info</span>
      </div>
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-status-success gl-text-status-success">
        <gl-icon class="gl-fill-status-success" name="error" />
        <span class="gl-flex-1">status.success</span>
      </div>
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-status-warning gl-text-status-warning">
        <gl-icon class="gl-fill-status-warning" name="error" />
        <span class="gl-flex-1">status.warning</span>
      </div>
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-status-danger gl-text-status-danger">
        <gl-icon class="gl-fill-status-danger" name="error" />
        <span class="gl-flex-1">status.danger</span>
      </div>
      <div class="gl-flex gl-gap-3 gl-items-center gl-p-3 gl-rounded-lg gl-bg-status-brand gl-text-status-brand">
        <gl-icon class="gl-fill-status-brand" name="error" />
        <span class="gl-flex-1">status.brand</span>
      </div>
    </div>
  `,
});

export default {
  title: 'tokens/status',
  component: '',
};
