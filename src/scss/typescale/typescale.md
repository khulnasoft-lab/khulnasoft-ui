GitLab UI typescale is an implementation of the Pajamas [typescale specification](https://www.figma.com/file/qEddyqCrI7kPSBjGmwkZzQ/Pajamas-UI-Kit---Beta?node-id=542%3A2).

## Usage

When you import GitLab UI SCSS, the typescale is not applied automatically. To apply the UI
Typescale, include the `gl-typescale-ui` `@mixin` in your application SCSS code:

```scss
@import '@gitlab/ui/src/scss/gitlab_ui';

@include gl-typescale-ui;
```

You can also include the Typescale and omit the rest of GitLab UI CSS. The following
code demonstrates the minimal configuration required to use the UI Typescale in a project:

```scss
@import '@gitlab/ui/src/scss/variables';
@import '@gitlab/ui/src/scss/mixins';
@import '@gitlab/ui/src/scss/utility-mixins/index';
@import '@gitlab/ui/src/scss/typescale/index';

@include gl-typescale-ui;
```

## Implementation notes

### Font stack

The Typescale uses the following font stack:

- Regular: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', Ubuntu,
  Cantarell, 'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji'`
- Monospace: `'Menlo', 'DejaVu Sans Mono', 'Liberation Mono', 'Consolas', 'Ubuntu Mono',
  'Courier New', 'andale mono', 'lucida console', monospace`

### Font-size

Text size is determined by the following parameters:

- Content type:
  - UI: default
  - Markdown: `markdown`
  - Compact Markdown: `compact-markdown`
- Media breakpoints:
  - `min-width: 0`: default
  - `min-width: 768px`: `md`
  - `min-width: 992px`: `lg`
  - `min-width: 1200px`: `xl`
- Font family:
  - Regular: default
  - Monospace: `monospace`
- Element type:
  - small paragraph / UI text: `sm`
  - medium paragraph / UI text: default
  - large paragraph / UI text: `lg`
  - headers: `h1..h6`

#### Variables

Typescale variables are located in the `scss/variables.scss`. They follow the naming convention:
`$gl-font-size-[content-type]-[font-family]-[element-type]-[breakpoint]`. Default typescale
parameters are omitted from the variable name. For example:

```sass
// content-type: UI, font-family: regular, element-type: h1, media breakpoint: default
$gl-font-size-h1: px-to-rem(23px);

// content-type: markdown, font-family: regular, element-type: h1, media-breakpoint: min-width: 1200px
$gl-font-size-markdown-h1-xl: px-to-rem(32px); 

// content-type: compact markdown, font-family: regular, element-type: large paragraph / label
$gl-font-size-compact-markdown-lg: px-to-rem(15px); 
```

### Line-height

The minimum line-height in Pajamas’ typescale specification is `16px`/`1rem`. Label text, which is
any text that is neither paragraph nor a header, uses this line-height. Paragraphs have a
line-height of `20px`/`1.25rem`. You can see the line-height for other typescale’s elements in the
[typescale sketch file](https://gitlab-org.gitlab.io/gitlab-design/hosted/pedro/%23168-responsive-type-spec-previews/).
