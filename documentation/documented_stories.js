import { storiesOf } from '@storybook/vue';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import { configureReadme } from 'storybook-readme';

import 'url-search-params-polyfill';

import { componentValidator as isValidComponent } from './all_components';
import GlComponentDocumentation from './components/component_documentation_generator.vue';
import GlExampleExplorer from './components/example_explorer.vue';

/**
 * This functions returns the component's name from the current window location's search
 *
 * Assume you have this Structure:
 * - Base
 *    - Form
 *       - Form-Group
 *          - Default
 *          - With Validations
 *
 * The URI would look like this: `iframe.html?id=base-form-form-group--with-validations`
 *
 * The actual component name we are looking for is `GlFormGroup`.
 * We know that we can remove the last part.
 * But unfortunately from `base-form-form-group` we cannot guess which of the following is the component name:
 *   - GlBaseFormFormGroup
 *   - GlFormFormGroup
 *   - GlFormGroup
 *   - GlGroup
 *
 * So we are going to through loop all of these and return the first valid component (`GlFormGroup`)
 *
 * @returns {string}
 */
function getComponentName() {
  const urlParams = new URLSearchParams(window.location.search);

  const storySlug = urlParams.get('id').split('--')[0];
  const splitSlug = storySlug.split('-');

  let componentName;

  do {
    splitSlug.shift();
    componentName = `Gl${upperFirst(camelCase(splitSlug.join('-')))}`;
  } while (splitSlug.length > 0 && !isValidComponent(componentName));

  if (!isValidComponent(componentName)) {
    throw new Error('Could not find a matching component');
  }

  return componentName;
}

export const setupStorybookReadme = () =>
  configureReadme({
    StoryPreview: {
      disableForComponents: [
        'GlTableLite',
        'GlAlert',
        'GlSparklineChart',
        'GlSprintf',
        'GlLink',
        'GlChart',
        'GlBadge',
        'GlButtonGroup',
        'GlOutsideDirective',
        'GlBanner',
        'GlBreadcrumb',
        'GlBroadcastMessage',
        'GlCollapse',
        'GlToken',
        'GlButton',
        'GlEmptyState',
        'GlSorting',
        'GlSortingItem',
        'GlIcon',
        'GlDashboardSkeleton',
        'GlToggle',
        'GlNavbar',
        'GlProgressBar',
        'GlPath',
        'GlFriendlyWrap',
        'GlLoadingIcon',
        'GlDeprecatedSkeletonLoading',
        'GlCard',
        'GlFormCheckbox',
        'GlAccordion',
        'GlAccordionItem',
        'GlDaterangePicker',
        'GlBarChart',
        'GlCarousel',
        'GlMarkdown',
        'GlTokenSelector',
        'GlTooltip',
        'GlFormTextarea',
        'GlFormInput',
        'GlSegmentedControl',
        'GlAvatar',
        'GlAvatarLink',
        'GlPagination',
        'GlSkeletonLoader',
      ],
      components: {
        GlComponentDocumentation,
        GlExampleExplorer,
      },
      data() {
        return {
          componentName: null,
          error: '',
          // Style the preview component container
          // Default container forcefully centers the preview element
          styles: {
            padding: '50px 35px',
            margin: '16px 0',
            border: '1px dashed rgb(229, 229, 229)',
          },
        };
      },
      // We infer the component's name from the URL so that we can load related examples and docs.
      // This needs to be done in the created hook to make sure that componentName is always set
      // to a valid value once the story loads.
      created() {
        try {
          this.componentName = getComponentName();
          this.error = '';
        } catch (error) {
          this.componentName = false;
          this.error = error.message;
        }
      },
      template: `
      <div>
          <div class="story-container" v-if="$options.disableForComponents.includes(componentName)">
              <slot></slot>
          </div>
          <template v-else>
              <div class="story-container" v-bind:style="styles"><slot></slot></div>
              {{ error }}
              <template v-if="componentName">
                  <gl-example-explorer :componentName="componentName" />
                  <gl-component-documentation :componentName="componentName" />
              </template>
          </template>
      </div>`,
    },
  });

export const documentedStoriesOf = (name, readme) => {
  const story = storiesOf(name, module);
  if (process.env.NODE_ENV !== 'test') {
    story.addParameters({
      readme: {
        content: readme,
      },
    });
  }
  return story;
};
