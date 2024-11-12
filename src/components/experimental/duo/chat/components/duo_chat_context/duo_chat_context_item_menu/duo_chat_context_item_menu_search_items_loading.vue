<script>
/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import { translate } from '../../../../../../../utils/i18n';

export default {
  name: 'GlDuoChatContextItemMenuSearchItemsLoading',
  props: {
    rows: {
      type: Number,
      required: true,
    },
  },
  i18n: {
    loadingMessage: translate('GlDuoChatContextItemMenu.loadingMessage', 'Loading...'),
  },
};
</script>

<template>
  <div>
    <div
      v-for="index in rows"
      :key="index"
      class="gl-mx-3 gl-mb-4 gl-pt-3"
      data-testid="search-results-loading"
    >
      <div class="gl-mb-2 gl-flex">
        <div class="gl-animate-skeleton-loader gl-mr-3 gl-h-5 gl-w-5 gl-rounded-base"></div>
        <div class="gl-animate-skeleton-loader gl-h-5 gl-grow gl-rounded-base"></div>
      </div>
      <div class="gl-animate-skeleton-loader gl-h-4 gl-w-1/2 gl-rounded-base"></div>
    </div>
    <span class="gl-sr-only">{{ $options.i18n.loadingMessage }}</span>
  </div>
</template>
