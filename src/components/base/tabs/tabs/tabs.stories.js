import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { range } from 'lodash';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { GlTabs, GlTab, GlScrollableTabs } from '../../../../../index';
import { colorThemes } from '../../../../utils/constants';
import docs from './tabs.md';

const ScrollableTabsGenerator = {
  components: {
    GlScrollableTabs,
    GlTab,
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  computed: {
    tabs() {
      return range(this.count).map((i) => ({
        title: `Tab ${i + 1}`,
        content: `Tab panel ${i + 1} content...`,
      }));
    },
  },
  template: `
    <gl-scrollable-tabs v-bind="$attrs">
      <gl-tab v-for="tab in tabs" :key="tab.title" :title="tab.title">
        {{ tab.content }}
      </gl-tab>
    </gl-scrollable-tabs>
  `,
};

const createBaseStory = () => ({
  components: {
    GlTabs,
    GlTab,
  },
  props: {
    theme: {
      type: String,
      default: select('theme', [...Object.keys(colorThemes), 'gl-dark'], 'indigo'),
    },
    syncActiveTabWithQueryParams: {
      type: Boolean,
      default: boolean('sync-active-tab-with-query-params', false),
    },
  },
});

documentedStoriesOf('base/tabs/tabs', docs)
  .addDecorator(withKnobs)
  .add('default', () => ({
    ...createBaseStory(),
    template: `
      <gl-tabs :theme="theme" :sync-active-tab-with-query-params="syncActiveTabWithQueryParams">
        <gl-tab title="Tab 1">
          Tab panel 1
        </gl-tab>
        <gl-tab title="Tab 2">
          Tab panel 2
        </gl-tab>
        <gl-tab title="Tab 3">
          Tab panel 3
        </gl-tab>
        <gl-tab title="Tab 4">
          Tab panel 4
        </gl-tab>
        <gl-tab title="Tab 5">
          Tab panel 5
        </gl-tab>
        <gl-tab title="Tab 6">
          Tab panel 6
        </gl-tab>
        <gl-tab title="Tab 7">
          Tab panel 7
        </gl-tab>
        <gl-tab title="Tab 8">
          Tab panel 8
        </gl-tab>
        <gl-tab title="Tab 9">
          Tab panel 9
        </gl-tab>
        <gl-tab title="Tab 10">
          Tab panel 10
        </gl-tab>
        <gl-tab title="Tab 11">
          Tab panel 11
        </gl-tab>
        <gl-tab title="Tab 12">
          Tab panel 12
        </gl-tab>
        <gl-tab title="Tab 13" query-param-value="thirteenth">
          Tab panel 13
        </gl-tab>
        <gl-tab title="Tab 14">
          Tab panel 14
        </gl-tab>
      </gl-tabs>
    `,
  }))
  .add('contentless tab', () => ({
    ...createBaseStory(),
    template: `
      <gl-tabs :theme="theme">
        <gl-tab title="Regular tab">
          <p>Regular tab content.</p>
          <p>The contentless tab is not selectable, as it has no content. This is useful for displaying things that aren't really tabs after the list of tabs.</p>
        </gl-tab>
        <gl-tab title="Another tab">
          <p>Another tab's content.</p>
        </gl-tab>
        <template #tabs-end>
          <li class="gl-tab-nav-item">
            Contentless tab
          </li>
        </template>
      </gl-tabs>
    `,
  }))
  .add('empty state', () => ({
    ...createBaseStory(),
    template: `
      <gl-tabs :theme="theme">
        <template #empty>
          This content is only displayed when there are no tabs. Useful for dynamically added/removed tabs.
        </template>
      </gl-tabs>
    `,
  }))
  .add('justified tabs', () => ({
    ...createBaseStory(),
    template: `
      <gl-tabs :theme="theme" justified>
        <gl-tab title="Tab 1">
          <p>Tab panel 1</p>
        </gl-tab>
        <gl-tab title="Tab 2">
          <p>Tab panel 2</p>
        </gl-tab>
      </gl-tabs>
    `,
  }))
  .add('with counter badges', () => ({
    ...createBaseStory(),
    template: `
      <gl-tabs>
        <gl-tab>
          <template #title>
            <span>Tab</span>
            <gl-badge size="sm" class="gl-tab-counter-badge">500</gl-badge>
            <span class="sr-only">items</span>
          </template>
          Tab panel 1
        </gl-tab>
        <gl-tab>
          <template #title>
            <span>Tab</span>
            <gl-badge size="sm" class="gl-tab-counter-badge">250</gl-badge>
            <span class="sr-only">items</span>
          </template>
          Tab panel 2
        </gl-tab>
        <gl-tab>
          <template #title>
            <span>Tab</span>
          </template>
          Tab panel 3
        </gl-tab>
      </gl-tabs>
    `,
  }))
  .add('with scroll', () => ({
    ...createBaseStory(),
    components: {
      ScrollableTabsGenerator,
    },
    template: '<scrollable-tabs-generator :count="50" :theme="theme" />',
  }))
  .add(
    'with scroll and growing',
    () => ({
      ...createBaseStory(),
      components: {
        ScrollableTabsGenerator,
      },
      data() {
        return {
          count: 2,
          intervalId: 0,
        };
      },
      mounted() {
        this.intervalId = setInterval(() => {
          this.count += 1;
        }, 2000);
      },
      template: '<scrollable-tabs-generator :count="count" :theme="theme" />',
    }),
    { storyshots: false }
  );
