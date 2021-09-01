import { withKnobs, select, boolean, text as textKnob } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  GlAvatar,
  GlIcon,
  GlDropdown,
  GlDropdownDivider,
  GlDropdownSectionHeader,
  GlDropdownItem,
  GlDropdownText,
  GlDropdownForm,
} from '../../../../index';
import {
  newButtonCategoryOptions,
  newDropdownVariantOptions,
  newButtonSizeOptions,
} from '../../../utils/constants';
import readme from './dropdown.md';

const components = {
  GlAvatar,
  GlIcon,
  GlDropdown,
  GlDropdownDivider,
  GlDropdownSectionHeader,
  GlDropdownItem,
  GlDropdownText,
  GlDropdownForm,
};

function addClass(component) {
  component.$el.querySelectorAll('.btn').forEach((el) => el.classList.add('gl-button'));
}

function generateProps({
  category = GlDropdown.props.category.default,
  variant = GlDropdown.props.variant.default,
  size = GlDropdown.props.size.default,
  block = false,
  icon = '',
  text = '',
  textSrOnly = false,
  loading = false,
  headerText = '',
  hideHeaderBorder = true,
  showClearAll = false,
  clearAllText = '',
  showHighlightedItemsTitle = false,
  highlightedItemsTitle = '',
} = {}) {
  const props = {
    category: {
      type: String,
      default: select('category', newButtonCategoryOptions, category),
    },
    variant: {
      type: String,
      default: select('variant', Object.values(newDropdownVariantOptions), variant),
    },
    size: {
      type: String,
      default: select('size', newButtonSizeOptions, size),
    },
    block: {
      type: Boolean,
      default: boolean('block', block),
    },
    disabled: {
      type: Boolean,
      default: boolean('disabled', false),
    },
    text: {
      type: String,
      default: textKnob('text', text),
    },
    textSrOnly: {
      type: Boolean,
      default: boolean('text sr-only', textSrOnly),
    },
    icon: {
      type: String,
      default: textKnob('icon svg name', icon),
    },
    split: {
      type: Boolean,
      default: boolean('split', false),
    },
    toggleClass: {
      type: String,
      default: textKnob('toggle class', ''),
    },
    loading: {
      type: Boolean,
      default: boolean('loading', loading),
    },
    headerText: {
      type: String,
      default: textKnob('header text', headerText),
    },
    hideHeaderBorder: {
      type: Boolean,
      default: boolean('no header border', hideHeaderBorder),
    },
    showClearAll: {
      type: Boolean,
      default: boolean('show clear all', showClearAll),
    },
    clearAllText: {
      type: String,
      default: textKnob('clear all text', clearAllText),
    },
    showHighlightedItemsTitle: {
      type: Boolean,
      default: boolean('show highlighted items title', showHighlightedItemsTitle),
    },
    highlightedItemsTitle: {
      type: String,
      default: textKnob('Highlighted items title', highlightedItemsTitle),
    },
    right: {
      type: Boolean,
      default: boolean('right', false),
    },
  };

  return props;
}

function wrap([template]) {
  return `
    <gl-dropdown
      ref="dropdown"
      :category="category"
      :variant="variant"
      :size="size"
      :block="block"
      :disabled="disabled"
      :text="text"
      :text-sr-only="textSrOnly"
      :icon="icon"
      :split="split"
      :toggle-class="toggleClass"
      :header-text="headerText"
      :hide-header-border="hideHeaderBorder"
      :show-clear-all="showClearAll"
      :clear-all-text="clearAllText"
      :show-highlighted-items-title="showHighlightedItemsTitle"
      :highlighted-items-title="highlightedItemsTitle"
      :loading="loading"
      :right="right"
    >
      ${template}
    </gl-dropdown>`;
}

function clickDropdown(component) {
  component.$nextTick(() => component.$el.querySelector('.dropdown-toggle').click());
}

documentedStoriesOf('base/dropdown', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps({ text: 'Some dropdown' }),
    components,
    template: wrap`
      <gl-dropdown-item>First item</gl-dropdown-item>
      <gl-dropdown-item>Second item</gl-dropdown-item>
      <gl-dropdown-item>Third item</gl-dropdown-item>
      <gl-dropdown-item>Fourth item</gl-dropdown-item>
      <gl-dropdown-item>Fifth item</gl-dropdown-item>
      <gl-dropdown-item>Sixth item</gl-dropdown-item>
      <gl-dropdown-item>Seventh item</gl-dropdown-item>
      <gl-dropdown-item>Eighth item</gl-dropdown-item>
      <gl-dropdown-item>Ninth item</gl-dropdown-item>
      <gl-dropdown-item>Tenth item</gl-dropdown-item>
      <gl-dropdown-item>Eleventh item</gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('secondary', () => ({
    props: generateProps({
      text: 'Some dropdown',
      category: newButtonCategoryOptions.secondary,
      variant: newDropdownVariantOptions.confirm,
    }),
    components,
    template: wrap`
      <gl-dropdown-item>First item</gl-dropdown-item>
      <gl-dropdown-item>Second item</gl-dropdown-item>
      <gl-dropdown-item>Third item</gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with form', () => ({
    props: generateProps({ text: 'Some dropdown' }),
    components,
    template: wrap`
      <gl-dropdown-form class="gl-px-4">
        <gl-button>One</gl-button>
        <gl-button>Two</gl-button>
        <gl-button>Three</gl-button>
      </gl-dropdown-form>`,
    mounted() {
      clickDropdown(this);
    },
  }))
  .add('with divider', () => ({
    props: generateProps({ text: 'Some dropdown' }),
    components,
    template: wrap`
      <gl-dropdown-item>First item</gl-dropdown-item>
      <gl-dropdown-item>Second item</gl-dropdown-item>
      <gl-dropdown-divider />
      <gl-dropdown-item>Third item</gl-dropdown-item>
      <gl-dropdown-item>Fourth item</gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with header and footer', () => ({
    props: generateProps({ text: 'Some dropdown', headerText: 'Header', hideHeaderBorder: true }),
    components,
    template: wrap`
      <template #header>
        <gl-search-box-by-type />
      </template>
      <gl-dropdown-item>First item</gl-dropdown-item>
      <gl-dropdown-item>Second item</gl-dropdown-item>
      <gl-dropdown-item>Third item</gl-dropdown-item>
      <gl-dropdown-item>Fourth item</gl-dropdown-item>
      <gl-dropdown-item>Fifth item</gl-dropdown-item>
      <gl-dropdown-item>Sixth item</gl-dropdown-item>
      <gl-dropdown-item>Seventh item</gl-dropdown-item>
      <gl-dropdown-item>Eigth item</gl-dropdown-item>
      <template #footer>
        <gl-dropdown-item>First footer item</gl-dropdown-item>
        <gl-dropdown-item>Second footer item</gl-dropdown-item>
      </template>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with section header', () => ({
    props: generateProps({ text: 'Some dropdown' }),
    components,
    template: wrap`
      <gl-dropdown-section-header>Header title</gl-dropdown-section-header>
      <gl-dropdown-item>First item</gl-dropdown-item>
      <gl-dropdown-item>Second item</gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with checked items', () => ({
    props: generateProps({ text: 'Some dropdown' }),
    components,
    template: wrap`
      <gl-dropdown-item :is-check-item="true" :is-checked="true">Checked item</gl-dropdown-item>
      <gl-dropdown-item :is-check-item="true">Unchecked item</gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with avatar and secondary text', () => ({
    props: generateProps({ text: 'Some dropdown' }),
    components,
    template: wrap`
      <gl-dropdown-item
        avatar-url="./img/avatar.png"
        secondary-text="@sytses"
      >
        Sid Sijbrandij
      </gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with icons', () => ({
    props: generateProps({ text: 'Some dropdown' }),
    components,
    template: wrap`
      <gl-dropdown-item
        icon-color="info"
        icon-name="status_running"
        icon-right-name="retry"
        icon-right-aria-label="Retry"
      >
        Status running
      </gl-dropdown-item>
      <gl-dropdown-item
        icon-color="success"
        icon-name="status_success"
        icon-right-name="cancel"
        icon-right-aria-label="Cancel"
      >
        Status success
      </gl-dropdown-item>
      <gl-dropdown-item
        icon-color="warning"
        icon-name="status_warning"
        icon-right-name="cancel"
        icon-right-aria-label="Cancel"
      >
        Status warning
      </gl-dropdown-item>
      <gl-dropdown-item
        icon-color="danger"
        icon-name="status_failed"
        icon-right-name="cancel"
        icon-right-aria-label="Cancel"
      >
        Status failed
      </gl-dropdown-item>
      <gl-dropdown-item
        icon-name="status_manual"
        icon-right-name="cancel"
        icon-right-aria-label="Cancel"
      >
        Status manual
      </gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('full width', () => ({
    props: generateProps({ text: 'Some dropdown', block: true }),
    components,
    template: wrap`
      <gl-dropdown-item>First item</gl-dropdown-item>
      <gl-dropdown-item>Second item</gl-dropdown-item>
      <gl-dropdown-item>Last item</gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with short text and wide width', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-dropdown
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        style="width: 300px;"
      >
        <gl-dropdown-item>First item</gl-dropdown-item>
        <gl-dropdown-item>Last item</gl-dropdown-item>
      </gl-dropdown>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with long text and narrow width', () => ({
    props: generateProps({ block: true }),
    components,
    template: `
      <gl-dropdown
        text="Truncated text dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        style="width: 160px;"
      >
        <gl-dropdown-item>First item</gl-dropdown-item>
        <gl-dropdown-item>Last item</gl-dropdown-item>
      </gl-dropdown>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with item text that does not wrap', () => ({
    props: generateProps({ text: 'Some dropdown' }),
    components,
    template: wrap`
      <gl-dropdown-item icon-right-name="star" icon-right-aria-label="Some action">
        Normal item
      </gl-dropdown-item>
      <gl-dropdown-item icon-right-name="star" icon-right-aria-label="Some action">
        <div class="gl-text-truncate">ellipsis/should/truncate/this/item</div>
      </gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('icon only', () => ({
    props: generateProps({ icon: 'ellipsis_v', text: 'More actions', textSrOnly: true }),
    components,
    template: wrap`
      <gl-dropdown-item>First item</gl-dropdown-item>
      <gl-dropdown-item>Second item</gl-dropdown-item>
      <gl-dropdown-item>Last item</gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with loading state', () => ({
    props: generateProps({ text: 'Some dropdown', loading: true }),
    components,
    template: wrap`
      <gl-dropdown-item>First item</gl-dropdown-item>
      <gl-dropdown-item>Last item</gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with clear all', () => ({
    props: generateProps({
      text: 'Some dropdown',
      showClearAll: true,
      clearAllText: 'Clear all',
    }),
    components,
    template: wrap`
      <gl-dropdown-item :is-check-item="true" :is-checked="true">First item</gl-dropdown-item>
      <gl-dropdown-item :is-check-item="true" :is-checked="true">Second item</gl-dropdown-item>
      <gl-dropdown-item :is-check-item="true" :is-checked="true">Third item</gl-dropdown-item>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with highlighted items', () => ({
    props: generateProps({
      text: 'Some dropdown',
      showHighlightedItemsTitle: true,
      highlightedItemsTitle: 'Highlights',
    }),
    components,
    template: wrap`
      <template #highlighted-items>
        <gl-dropdown-item :is-check-item="true" :is-checked="true">First item</gl-dropdown-item>
        <gl-dropdown-item :is-check-item="true" :is-checked="true">Second item</gl-dropdown-item>
      </template>
      <gl-dropdown-item>Third item</gl-dropdown-item>
      <gl-dropdown-item>Fourth item</gl-dropdown-item>
      `,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }));
