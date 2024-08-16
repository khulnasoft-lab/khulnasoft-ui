const TokenDisplay = {
  name: 'TokenDisplay',
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  render() {
    return this.$createElement(
      'div',
      {
        style: {
          width: '240px',
          height: '120px',
          backgroundColor: `var(${this.value})`,
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
        },
      },
      this.name
    );
  },
};

const ContainerDisplay = {
  name: 'ContainerDisplay',
  props: {
    headerValue: {
      type: String,
      required: true,
    },
    contentValue: {
      type: String,
      required: true,
    },
    borderValue: {
      type: String,
      required: true,
    },
  },
  render() {
    return this.$createElement(
      'div',
      {
        style: {
          width: '100%',
          height: '240px',
          border: `1px solid var(${this.borderValue})`,
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '16px',
        },
      },
      [
        this.$createElement(
          'div',
          {
            style: {
              backgroundColor: `var(${this.headerValue})`,
              borderBottom: `1px solid var(${this.borderValue})`,
              padding: '16px',
              color: 'var(--gl-text-color-default)',
              fontSize: '0.875em',
            },
          },
          'container.header.background.color'
        ),
        this.$createElement(
          'div',
          {
            style: {
              backgroundColor: `var(${this.contentValue})`,
              padding: '16px',
              flex: 1,
              color: 'var(--gl-text-color-default)',
              fontSize: '0.875em',
            },
          },
          'container.content.background.color'
        ),
      ]
    );
  },
};

const SurfaceTokensComponent = {
  name: 'SurfaceTokensComponent',
  components: { TokenDisplay, ContainerDisplay },
  data() {
    return {
      backgroundTokens: {
        'background.color.body': '--gl-background-color-body',
        'background.color.default': '--gl-background-color-default',
        'background.color.subtle': '--gl-background-color-subtle',
        'background.color.strong': '--gl-background-color-strong',
        'background.color.disabled': '--gl-background-color-disabled',
        'background.color.overlay': '--gl-background-color-overlay',
      },
      containerTokens: {
        header: '--gl-container-header-background-color',
        content: '--gl-container-content-background-color',
        border: '--gl-container-border-color',
      },
    };
  },
  render() {
    return this.$createElement('div', [
      this.$createElement('h2', { style: { marginBottom: '16px' } }, 'Background'),
      this.$createElement(
        'div',
        { style: { display: 'flex', flexWrap: 'wrap' } },
        Object.entries(this.backgroundTokens).map(([name, value]) =>
          this.$createElement(TokenDisplay, { key: name, props: { name, value } })
        )
      ),
      this.$createElement(
        'h2',
        { style: { marginTop: '32px', marginBottom: '16px' } },
        'Container'
      ),
      this.$createElement(ContainerDisplay, {
        props: {
          headerValue: this.containerTokens.header,
          contentValue: this.containerTokens.content,
          borderValue: this.containerTokens.border,
        },
      }),
    ]);
  },
};

export default {
  title: 'Experimental/surfaces',
  component: SurfaceTokensComponent,
};

export const BackgroundAndContainer = () => ({
  components: { SurfaceTokensComponent },
  render() {
    return this.$createElement(SurfaceTokensComponent);
  },
});
