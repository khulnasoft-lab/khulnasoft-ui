<template>
  <div class="tabs gl-tabs">
    <ul role="tablist" class="nav gl-tabs-nav">
      <li role="presentation" class="nav-item">
        <a
          role="tab"
          target="_self"
          href="#"
          class="nav-link gl-tab-nav-item gl-tab-nav-item-active gl-tab-nav-item-active-indigo"
          >Tab 1</a
        >
      </li>
      <li role="presentation" class="nav-item">
        <a role="tab" target="_self" href="#" class="nav-link gl-tab-nav-item">Tab 2</a>
      </li>
    </ul>
    <div class="tab-content gl-tab-content">
      <div role="tabpanel" class="tab-pane active">Tab panel 1</div>
      <div role="tabpanel" class="tab-pane">Tab panel 2</div>
    </div>
  </div>
</template>
