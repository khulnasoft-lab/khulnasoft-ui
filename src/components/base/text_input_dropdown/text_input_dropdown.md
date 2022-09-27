<!--
Briefly describe the component's purpose here.
This should correspond to the short description in Pajamas' website: https://design.gitlab.com/components/status/
-->

## Usage

The `GlTextInputDropdown` component is aimed at solving all use cases that a dropdown does just triggered
on the click of a search input.

Instead of recreating complex dropdown positioning logic, this component reuses Bootstrap's dropdown
mixin.

## Dos and don'ts

Use this component to encapsulate the features of `GlTokenSelector` and `GlCombobox`

Do not use this component when the items are not grouped or they are loaded synchronously before.
We already have the above components to solve those use cases.

<!--
## Browser compatibility

If the component requires any polyfill or fallback on certain browsers, describe those requirements
here.
-->

<!--
## Edge cases

If the component has some known limitations, describe them here.
-->

<!--
## Deprecation warning

If and when this component introduced API changes that would require deprecating old APIs, describe
the changes here, and provide a migration paths to the new API.
-->
