import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  GlFilteredSearch,
  GlFilteredSearchToken,
  GlFilteredSearchSuggestion,
  GlLoadingIcon,
  GlToken,
  GlAvatar,
} from '../../../index';
import { setStoryTimeout } from '../../../utils/test_utils';
import readme from './filtered_search.md';

const fakeUsers = [
  { id: 1, name: 'User Alpha', username: 'alpha' },
  { id: 2, name: 'User Beta', username: 'beta' },
  { id: 3, name: 'User Gamma', username: 'gamma' },
  { id: 4, name: 'User Delta', username: 'delta' },
  { id: 5, name: 'User Epsilon', username: 'epsilon' },
];

const fakeMilestones = [
  { id: 1, title: '12.7', name: '%12.7' },
  { id: 2, title: '12.8', name: '%12.8' },
  { id: 3, title: '12.9', name: '%12.9' },
  { id: 4, title: '12.10', name: '%12.10' },
  { id: 5, title: 'Backlog', name: 'Backlog' },
];

const fakeLabels = [
  { id: 1, title: 'Bug', color: '#D9534F', text_color: '#FFFFFF' },
  { id: 2, title: 'Enhancement', color: '#F0AD4E', text_color: '#FFFFFF' },
  { id: 3, title: 'Backlog', color: '#cccccc', text_color: '#333333' },
  { id: 4, title: 'Feature', color: '#A8D695', text_color: '#333333' },
  { id: 5, title: 'Documentation', color: '#5CB85C', text_color: '#FFFFFF' },
];

const UserToken = {
  name: 'UserToken',
  components: { GlFilteredSearchToken, GlFilteredSearchSuggestion, GlLoadingIcon, GlAvatar },
  props: ['value', 'active'],
  inheritAttrs: false,
  data() {
    return {
      loadingView: false,
      loadingSuggestions: false,
      users: [],
      activeUser: null,
    };
  },
  methods: {
    loadView() {
      this.loadingView = true;
      setStoryTimeout(() => {
        this.loadingView = false;
        this.activeUser = fakeUsers.find((u) => u.username === this.value.data);
      }, 1000);
    },
    loadSuggestions() {
      this.loadingSuggestions = true;
      setStoryTimeout(() => {
        this.loadingSuggestions = false;
        this.users = fakeUsers;
      }, 2000);
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'value.data': function () {
      if (this.active) {
        this.loadSuggestions();
      }
    },
    active: {
      immediate: true,
      handler(newValue) {
        if (!newValue) {
          this.loadView();
        } else {
          this.loadSuggestions();
        }
      },
    },
  },
  template: `
    <gl-filtered-search-token
      v-bind="{ ...this.$props, ...this.$attrs }"
      v-on="$listeners"
    >
      <template #view="{ inputValue }">
        <gl-loading-icon size="sm" v-if="loadingView" />
        <gl-avatar :size="16" :entity-name="inputValue" shape="circle" v-else />
        {{ activeUser ? activeUser.name : inputValue }}
      </template>
      <template #suggestions>
        <template v-if="loadingSuggestions">
          <gl-loading-icon />
        </template>
        <template v-else>
        <gl-filtered-search-suggestion :key="user.id" v-for="user in users" :value="user.username">
          <div class="gl-display-flex">
            <gl-avatar :size="32" :entity-name="user.username" />
            <div>
              <p class="gl-m-0">{{ user.name }}</p>
              <p class="gl-m-0">@{{ user.username }}</p>
            </div>
          </div>
        </gl-filtered-search-suggestion>
        </template>
      </template>
    </gl-filtered-search-token>
  `,
};

const MilestoneToken = {
  name: 'MilestoneToken',
  components: { GlFilteredSearchToken, GlFilteredSearchSuggestion, GlLoadingIcon },
  props: ['value', 'active'],
  inheritAttrs: false,
  data() {
    return {
      loadingView: false,
      loadingSuggestions: false,
      milestones: [],
    };
  },
  methods: {
    loadSuggestions() {
      this.loadingSuggestions = true;
      setStoryTimeout(() => {
        this.loadingSuggestions = false;
        this.milestones = fakeMilestones;
      }, 2000);
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'value.data': function () {
      if (this.active) {
        this.loadSuggestions();
      }
    },
    active: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.loadSuggestions();
        }
      },
    },
  },
  template: `
    <gl-filtered-search-token
      v-bind="{ ...this.$props, ...this.$attrs }"
      v-on="$listeners"
    >
      <template #suggestions>
        <gl-filtered-search-suggestion value="None">None</gl-filtered-search-suggestion>
        <gl-filtered-search-suggestion value="Any">Any</gl-filtered-search-suggestion>
        <gl-filtered-search-suggestion value="Upcoming">Upcoming</gl-filtered-search-suggestion>
        <gl-filtered-search-suggestion value="Started">Started</gl-filtered-search-suggestion>
        <gl-dropdown-divider v-if="loadingSuggestions || milestones.length" />
        <template v-if="loadingSuggestions">
          <gl-loading-icon />
        </template>
        <template v-else>
        <gl-filtered-search-suggestion :key="milestone.id" v-for="milestone in milestones" :value="milestone.name">
        {{ milestone.title }}
        </gl-filtered-search-suggestion>
        </template>
      </template>
    </gl-filtered-search-token>
  `,
};

const LabelToken = {
  name: 'LabelToken',
  components: { GlFilteredSearchToken, GlFilteredSearchSuggestion, GlLoadingIcon, GlToken },
  props: ['value', 'active'],
  inheritAttrs: false,
  data() {
    return {
      loadingView: false,
      loadingSuggestions: false,
      labels: [],
      activeLabel: null,
    };
  },
  computed: {
    currentValue() {
      return this.value.data.toLowerCase();
    },
    containerStyle() {
      if (this.activeLabel) {
        const { color, text_color } = this.activeLabel;

        return { backgroundColor: color, color: text_color };
      }
      return {};
    },
  },
  methods: {
    loadView() {
      this.loadingView = true;
      setStoryTimeout(() => {
        this.loadingView = false;
        this.activeLabel = fakeLabels.find((l) => l.title === this.value.data);
      }, 100);
    },
    loadSuggestions() {
      this.loadingSuggestions = true;
      setStoryTimeout(() => {
        this.loadingSuggestions = false;
        this.labels = fakeLabels;
      }, 2000);
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'value.data': function () {
      if (this.active) {
        this.loadSuggestions();
      }
    },
    active: {
      immediate: true,
      handler(newValue) {
        if (!newValue) {
          this.loadView();
        } else {
          this.loadSuggestions();
        }
      },
    },
  },
  template: `
    <gl-filtered-search-token
      v-bind="{ ...this.$props, ...this.$attrs }"
      v-on="$listeners"
    >
      <template #view-token="{ inputValue, cssClasses, listeners }">
        <gl-token variant="search-value" :class="cssClasses" :style="containerStyle" v-on="listeners">
          {{ activeLabel ? activeLabel.title : inputValue }}
        </gl-token>
      </template>
      <template #suggestions>
        <gl-filtered-search-suggestion value="None">None</gl-filtered-search-suggestion>
        <gl-filtered-search-suggestion value="Any">Any</gl-filtered-search-suggestion>
        <gl-dropdown-divider v-if="loadingSuggestions || labels.length" />
        <template v-if="loadingSuggestions">
          <gl-loading-icon />
        </template>
        <template v-else>
        <gl-filtered-search-suggestion :key="label.id" v-for="label in labels" :value="label.title">
          <div class="d-flex">
            <span
              :style="{ backgroundColor: label.color, height: '16px', width: '16px' }"
              class="d-inline-block mr-2"
            ></span>
            {{ label.title }}
          </div>
        </gl-filtered-search-suggestion>
        </template>
      </template>
    </gl-filtered-search-token>
  `,
};

const tokens = [
  {
    type: 'author',
    icon: 'pencil',
    title: 'Author',
    dataType: 'user',
    unique: true,
    token: UserToken,
  },
  { type: 'user', icon: 'user', title: 'Assignee', dataType: 'user', token: UserToken },
  { type: 'milestone', icon: 'clock', title: 'Milestone', unique: true, token: MilestoneToken },
  { type: 'label', icon: 'labels', title: 'Label', token: LabelToken },
  { type: 'weight', icon: 'weight', title: 'Weight', unique: true, token: GlFilteredSearchToken },
  {
    type: 'confidential',
    icon: 'eye-slash',
    title: 'Confidential',
    unique: true,
    token: GlFilteredSearchToken,
    options: [
      { icon: 'eye-slash', value: 'Yes', title: 'Yes' },
      { icon: 'eye', value: 'No', title: 'No' },
    ],
  },
];

const components = {
  GlFilteredSearch,
};

documentedStoriesOf('base/filtered-search', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    data() {
      return {
        tokens,
        value: [
          { type: 'author', value: { data: 'beta', operator: '=' } },
          { type: 'label', value: { data: 'Bug', operator: '=' } },
          'raw text',
        ],
      };
    },
    components,
    template: `<gl-filtered-search :available-tokens="tokens" :value="value" />`,
  }));
