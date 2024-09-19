# Modifications to Vendored Code

**Library**: BootstrapVue  
**Version**: 2.23.1

This file documents modifications made to the original BootstrapVue component files.

## Removed variants

The following files have been modified from the original:

- `README.md`: Removed variants.

The following variants of the property `variant` have been removed as they are no longer supported
in our implementation:

- `secondary`
- `info`
- `light`
- `dark`

It was not necessary to adapt `.js` files for this change, as the propery `variant` accepts any
string. It would still be technically possible to pass down one of the removed variants.
