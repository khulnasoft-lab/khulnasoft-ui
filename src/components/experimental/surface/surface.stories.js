import { defineComponent, h } from 'vue';

const TokenDisplay = defineComponent({
  props: {
    name: String,
    value: String,
  },
  setup(props) {
    return () => h('div', {
      style: {
        width: '240px',
        height: '120px',
        backgroundColor: `var(${props.value})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        margin: '8px',
        color: 'var(--gl-text-color-default)',
        fontSize: '0.875em',
        textAlign: 'center',
        wordBreak: 'break-word',
        padding: '8px',
      }
    }, props.name);
  }
});

const ContainerDisplay = defineComponent({
  props: {
    headerValue: String,
    contentValue: String,
    borderValue: String,
  },
  setup(props) {
    return () => h('div', {
      style: {
        width: '100%',
        height: '240px',
        border: `1px solid var(${props.borderValue})`,
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '16px',
      }
    }, [
      h('div', {
        style: {
          backgroundColor: `var(${props.headerValue})`,
          borderBottom: `1px solid var(${props.borderValue})`,
          padding: '16px',
          color: 'var(--gl-text-color-default)',
          fontSize: '0.875em',
        }
      }, 'container.header.background.color'),
      h('div', {
        style: {
          backgroundColor: `var(${props.contentValue})`,
          padding: '16px',
          flex: 1,
          color: 'var(--gl-text-color-default)',
          fontSize: '0.875em',
        }
      }, 'container.content.background.color')
    ]);
  }
});

const SurfaceTokensComponent = defineComponent({
  components: { TokenDisplay, ContainerDisplay },
  setup() {
    const backgroundTokens = {
      'background.color.body': '--gl-background-color-body',
      'background.color.default': '--gl-background-color-default',
      'background.color.subtle': '--gl-background-color-subtle',
      'background.color.strong': '--gl-background-color-strong',
      'background.color.disabled': '--gl-background-color-disabled',
      'background.color.overlay': '--gl-background-color-overlay',
    };

    const containerTokens = {
      header: '--gl-container-header-background-color',
      content: '--gl-container-content-background-color',
      border: '--gl-container-border-color',
    };

    return { backgroundTokens, containerTokens };
  },
  template: `
    <div>
      <h2 style="margin-bottom: 16px">Background</h2>
      <div style="display: flex; flex-wrap: wrap;">
        <TokenDisplay
          v-for="(value, name) in backgroundTokens"
          :key="name"
          :name="name"
          :value="value"
        />
      </div>

      <h2 style="margin-top: 32px; margin-bottom: 16px">Container</h2>
      <ContainerDisplay
        :headerValue="containerTokens.header"
        :contentValue="containerTokens.content"
        :borderValue="containerTokens.border"
      />
    </div>
  `
});

export default {
  title: 'Experimental/surfaces',
  component: SurfaceTokensComponent,
};

export const BackgroundAndContainer = () => ({
  components: { SurfaceTokensComponent },
  template: '<SurfaceTokensComponent />',
});