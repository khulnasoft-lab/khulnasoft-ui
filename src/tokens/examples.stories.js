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

export const Borders = () => ({
  template: `
  <div class="gl-text-base">
    <h2 class="gl-heading-2">Borders on containers</h2>
    <h3 class="gl-heading-4 gl-my-5">Generic (presentational)</h3>
    <div class="gl-grid gl-grid-cols-3 gl-gap-5">
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-default gl-border gl-border-default">default + default</div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-default gl-border gl-border-subtle">default + subtle</div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-default gl-border gl-border-strong">default + strong</div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-subtle gl-border gl-border-subtle">subtle + subtle</div>
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-strong gl-border gl-border-strong">strong + strong</div>
    </div>
    <h3 class="gl-heading-4 gl-my-5">Semantic</h3>
    <div class="gl-grid gl-grid-cols-3 gl-gap-5">
      <div class="gl-grid gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-section gl-border gl-border-section">section + section</div>
    </div>
    <h2 class="gl-heading-2 gl-mt-5">Borders as dividers</h2>
    <h3 class="gl-heading-4 gl-my-5">Generic (presentational)</h3>
    <div class="gl-grid gl-grid-cols-3 gl-gap-5">
      <div class="gl-grid gl-gap-5 gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-default">
        on default
        <div class="gl-w-full gl-border-b gl-border-default"></div>
        <div class="gl-w-full gl-border-b gl-border-subtle"></div>
        <div class="gl-w-full gl-border-b gl-border-strong"></div>
        <div class="gl-w-full gl-border-b gl-border-section"></div>
      </div>
      <div class="gl-grid gl-gap-5 gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-subtle">
        on subtle
        <div class="gl-w-full gl-border-b gl-border-default"></div>
        <div class="gl-w-full gl-border-b gl-border-subtle"></div>
        <div class="gl-w-full gl-border-b gl-border-strong"></div>
        <div class="gl-w-full gl-border-b gl-border-section"></div>
      </div>
      <div class="gl-grid gl-gap-5 gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-strong">
        on strong
        <div class="gl-w-full gl-border-b gl-border-default"></div>
        <div class="gl-w-full gl-border-b gl-border-subtle"></div>
        <div class="gl-w-full gl-border-b gl-border-strong"></div>
        <div class="gl-w-full gl-border-b gl-border-section"></div>
      </div>
    </div>
    <h3 class="gl-heading-4 gl-my-5">Semantic</h3>
    <div class="gl-grid gl-grid-cols-3 gl-gap-5">
      <div class="gl-grid gl-gap-5 gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-overlap">
        on overlap
        <div class="gl-w-full gl-border-b gl-border-default"></div>
        <div class="gl-w-full gl-border-b gl-border-subtle"></div>
        <div class="gl-w-full gl-border-b gl-border-strong"></div>
        <div class="gl-w-full gl-border-b gl-border-section"></div>
      </div>
      <div class="gl-grid gl-gap-5 gl-place-items-center gl-p-5 gl-rounded-lg gl-bg-section">
        on section
        <div class="gl-w-full gl-border-b gl-border-default"></div>
        <div class="gl-w-full gl-border-b gl-border-subtle"></div>
        <div class="gl-w-full gl-border-b gl-border-strong"></div>
        <div class="gl-w-full gl-border-b gl-border-section"></div>
      </div>
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
