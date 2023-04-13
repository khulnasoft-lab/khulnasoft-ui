<script>
export default {
  name: 'GlDashboardSkeleton',
  props: {
    /**
     * Number of cards to be shown
     */
    cards: {
      type: Number,
      required: false,
      default: 3,
    },
  },
};
</script>
<template>
  <div class="row dashboard-cards">
    <div v-for="index in cards" :key="index" class="col-12 col-md-6 col-xl-4 px-2">
      <div class="rounded-top py-4 bg-light"></div>
      <div class="dashboard-card-body card-body bg-secondary">
        <div class="row">
          <div class="col-1 align-self-center">
            <div class="bg-light p-3 rounded-circle"></div>
          </div>

          <div class="col-10 col-sm-6 align-self-center pl-4">
            <div class="dashboard-card-skeleton-info bg-light py-2 w-100 mb-2"></div>
            <div class="dashboard-card-skeleton-info bg-light py-2 w-100"></div>
          </div>

          <div class="col-sm-5 align-self-center d-none d-sm-block">
            <div class="dashboard-card-skeleton-info bg-light py-2 w-100"></div>
          </div>
        </div>

        <div class="dashboard-card-footer bg-light py-3 mt-3"></div>
      </div>
    </div>
  </div>
</template>
