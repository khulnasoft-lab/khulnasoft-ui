import { withKnobs, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../documentation/documented_stories';
import { GlResizeObserverDirective } from '../../index';
import readme from './resize_observer.md';

documentedStoriesOf('directives/resize-observer-directive', readme)
  .addParameters({ storyshots: false })
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {
      elementWidth: {
        default: select('elementWidth', ['100%', '75%', '50%'], '100%'),
      },
      elementHeight: {
        default: select('elementHeight', ['100%', '75%', '50%'], '100%'),
      },
    },
    directives: {
      'gl-resize-observer': GlResizeObserverDirective,
    },
    data() {
      return {
        width: 0,
        height: 0,
      };
    },
    computed: {
      wrapperStyles() {
        return {
          height: '400px',
        };
      },
      elementStyles() {
        return {
          height: this.elementHeight,
          width: this.elementWidth,
        };
      },
    },
    methods: {
      handleResize({ contentRect: { width, height } }) {
        this.width = Math.round(width);
        this.height = Math.round(height);
      },
    },
    template: `
      <div
        :style="wrapperStyles"
        class="d-flex justify-content-center align-items-center">
        <div
          v-gl-resize-observer="handleResize"
          :style="elementStyles"
          class="d-flex position-relative justify-content-center align-items-center bg-light text-dark">
            <span class="d-inline-block p-2">
              I am {{ width }}px wide and {{ height }}px high.
            </span>
        </div>
      </div>
    `,
  }));
