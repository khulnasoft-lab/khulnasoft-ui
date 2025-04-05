Tabs are used to divide content into meaningful, related sections. Tabs allow users to focus on one
specific view at a time while maintaining sight of all the relevant content options available. Each
tab, when active, will reveal it’s own unique content.

## Using the component Vue

~~~html
<gl-tabs>
  <gl-tab title="Tab 1">
    Tab panel 1
  </gl-tab>
  <gl-tab title="Tab 2">
    Tab panel 2
  </gl-tab>
</gl-tabs>
~~~

## Using the component HTML

~~~html
<div class="tabs gl-tabs">
  <ul role="tablist" class="nav gl-tabs-nav">
    <li role="presentation" class="nav-item">
      <a
        role="tab"
        target="_self"
        href="#"
        class="nav-link gl-tab-nav-item gl-tab-nav-item-active gl-tab-nav-item-active-indigo"
      >Tab 1</a>
    </li>
    <li role="presentation" class="nav-item">
      <a role="tab" target="_self" href="#" class="nav-link gl-tab-nav-item">Tab 2</a>
    </li>
  </ul>
  <div class="tab-content gl-tab-content">
    <div role="tabpanel" class="tab-pane gl-tab-content active">Tab panel 1</div>
    <div role="tabpanel" class="tab-pane gl-tab-content">Tab panel 2</div>
  </div>
</div>
~~~

## Adding Action Buttons to the Tabs

Tabs start and end slot can be populated via props: `action-primary`, `action-secondary` and
`action-tertiary`. These props allow you to handle how a primary, secondary and tertiary button will
behave and look. The props receive an object as such:

~~~js
{
  text: 'Save Changes',
  attributes: {
    variant: 'info',
    disabled: this.someState,
    class: 'some-class',
    ...
  }
}
~~~

## Scrollable tab buttons

By default, `GlTab` will wrap tab buttons when they overflow the container. To
enable horizontally scrolling for the tab buttons, use the `GlScrollableTabs`
component. This is a separate Vue component because of some limitations:

- The action props (e.g., `action-primary`) are not respected in `GlScrollableTabs`. At the
  moment, BootstrapVue does not provide a reliable way for us to achieve this desired combination.

`GlScrollableTabs` composes `GlTabs` and passes through every listener, slot, or prop (with the above
exceptions).

~~~html
<gl-scrollable-tabs>
  <gl-tab v-for="tab in tabs" :key="tab.key" :title="tab.title"> {{ tab.content }} </gl-tab>
</gl-scrollable-tabs>
~~~
