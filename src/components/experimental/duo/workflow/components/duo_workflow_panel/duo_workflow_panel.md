<!--
This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).

Please use the corresponding component in Duo-UI going forward.
All future development and maintenance for Duo components should take place in Duo-UI.

For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
-->

This is the main UI panel used in the larger Duo Workflow Plan UI for the IDE
and WebUI.

## Usage

To use this component, import it and fill out the available slots:

- `title`: the main title for the panel
- `subtitle`: the small text adjacent to the title
- `content`: the content of the panel, hidden away when the collapse is toggled

Also provide an icon via the `headerIcon` prop. This icon is displayed adjacent
to the title.

You can pass `expanded` prop set to `false` if you need a section to be
collapsed by default. You can also listen to `toggle-panel` event to know
when the expanded state changed.

Translations for the title of the single button can be provided either via the
props `expandButtonTitle` and `collapseTitleButton` or via the translation
configuration:

```js
setConfigs({
  translations: {
    'GlDuoWorkflowPanel.expandButtonTitle': __('Expand Panel'),
    'GlDuoWorkflowPanel.collapseButtonTitle': __('Collapse Panel'),
  },
});
```

These translations are tied to the action of the button, not its state, so
ensure they are set properly!
