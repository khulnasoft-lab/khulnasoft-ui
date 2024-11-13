export const Surfaces = () => ({
  template: `
    <div class="gl-grid md:gl-grid-cols-3 gl-gap-5 gl-text-base">
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-default">
        background.color.default
      </div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-subtle">
        background.color.subtle
      </div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-strong">
        background.color.strong
      </div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-overlap">
        background.color.overlap
      </div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-section">
        background.color.section
      </div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-overlay">
        background.color.overlay
      </div>
    </div>
  `,
});

export const Section = () => ({
  template: `
    <div class="gl-border gl-border-section gl-rounded-lg gl-overflow-hidden gl-text-base">
      <div class="gl-border-b gl-border-b-section gl-bg-section gl-p-5">
        background.color.section
      </div>
      <div class="gl-bg-subtle gl-p-5">
        background.color.subtle
      </div>
    </div>
  `,
});

export const Shadows = () => ({
  template: `
    <div class="gl-grid md:gl-grid-cols-3 gl-gap-5 gl-text-base gl-p-8 gl-bg-subtle">
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-overlap gl-shadow-sm">
        sm
      </div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-overlap gl-shadow-md">
        md
      </div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-overlap gl-shadow-lg">
        lg
      </div>
    </div>
  `,
});

export default {
  title: 'tokens/examples',
  component: '',
};
