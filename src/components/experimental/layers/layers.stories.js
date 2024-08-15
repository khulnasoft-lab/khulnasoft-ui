import { ref } from 'vue';

export default {
  title: 'Experimental/layers',
  component: {
    template: '<div>Layer Tokens Component</div>'
  }
};

const Template = () => ({
  setup() {
    const tokens = ref({
      depth: [0, 1, 2, 3],
      emphasis: ['contained', 'subtle', 'strong'],
    });

    return { tokens };
  },
  template: `
    <div>
      <h2 class="gl-mb-6">Depth</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 2rem;">
        <div v-for="depth in tokens.depth" :key="'depth-' + depth">
          <div
            :style="{
              width: '240px',
              height: '120px',
              backgroundColor: \`var(--gl-layer-depth-\${depth}-background-color)\`,
              boxShadow: \`var(--gl-layer-depth-\${depth}-shadow)\`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }"
          >
            depth {{ depth }}
          </div>
        </div>
      </div>

      <h2 class="gl-mb-6">Emphasis</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <div v-for="emphasis in tokens.emphasis" :key="'emphasis-' + emphasis">
          <div
            :style="{
              width: '240px',
              height: '120px',
              backgroundColor: \`var(--gl-layer-emphasis-\${emphasis}-background-color)\`,
              border: emphasis === 'contained' ? \`1px solid var(--gl-layer-emphasis-\${emphasis}-border-color)\` : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }"
          >
            {{ emphasis }}
          </div>
        </div>
      </div>
    </div>
  `,
});

export const LayerTokens = Template.bind({});
LayerTokens.args = {};