# [80.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v80.4.0...v80.5.0) (2024-05-07)


### Features

* **DesignTokens:** check in token build files ([4e92530](https://gitlab.com/gitlab-org/gitlab-ui/commit/4e9253008e12e7deaa8e8faa29e5c3fe0d618418))

# [80.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v80.3.0...v80.4.0) (2024-05-07)


### Bug Fixes

* linting errors ([52938a5](https://gitlab.com/gitlab-org/gitlab-ui/commit/52938a58ec1b51a0544c44633c9f13949da0fc35))


### Features

* **README:** Add design tokens mention ([3ff1f07](https://gitlab.com/gitlab-org/gitlab-ui/commit/3ff1f0702af61ba1efc3592e5759c95e6111f110))

# [80.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v80.2.0...v80.3.0) (2024-05-06)


### Features

* **GlSearchBoxByClick:** Migrate dropdown ([51de3bc](https://gitlab.com/gitlab-org/gitlab-ui/commit/51de3bcc652017d7218839673c9579e6a22d1446))

# [80.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v80.1.0...v80.2.0) (2024-05-03)


### Features

* **GlFilteredSearch:** pass appliedTokens prop to nested token ([4eea90a](https://gitlab.com/gitlab-org/gitlab-ui/commit/4eea90a9358c0fa07e25878b515970d0f6bbf297))

# [80.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v80.0.1...v80.1.0) (2024-05-03)


### Features

* **GlDrawer:** Fix alignment of close button ([8bd418a](https://gitlab.com/gitlab-org/gitlab-ui/commit/8bd418ad69b7ca9588d8eeb0fe21ca290a730a7f))

## [80.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v80.0.0...v80.0.1) (2024-05-02)


### Bug Fixes

* **Dropdown:** Fix disclosure dropdown a11y issues ([34d2c4d](https://gitlab.com/gitlab-org/gitlab-ui/commit/34d2c4d496f66c2c9e9129793e6a0c4189d77ec9))

# [80.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v79.4.1...v80.0.0) (2024-05-01)


### Features

* **CSS:** remove `gl-gap-x/y-*` CSS utility classes ([1ad137a](https://gitlab.com/gitlab-org/gitlab-ui/commit/1ad137a008249acc4983c133e8d3d5136f9b9288))
* **DesignTokens:** Update to use default for deprecated text.primary ([24c8e3b](https://gitlab.com/gitlab-org/gitlab-ui/commit/24c8e3b8e2f0c753cedf8b37070c8145f8acc37f))


### BREAKING CHANGES

* **CSS:** these utility classes were using margin to adjust
spacing and were causing a conflict with Tailwind utility classes.
Usage of these utilities should be migrated to Tailwind `gap`
utilities.

## [79.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v79.4.0...v79.4.1) (2024-04-25)


### Bug Fixes

* **GlKeysetPagination:** set default prev text to "Previous" ([e245aaa](https://gitlab.com/gitlab-org/gitlab-ui/commit/e245aaab8be4835c3ee01d4917d0499289e16a68))

# [79.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v79.3.0...v79.4.0) (2024-04-25)


### Bug Fixes

* **GlBreadcrumb:** Fix containerWidth calc with ResizeObserver ([daa8013](https://gitlab.com/gitlab-org/gitlab-ui/commit/daa80133e1e56383fb857c12cc9384c553a2b389))
* **GlBreadcrumb:** Fix details in resize calc ([4025e2e](https://gitlab.com/gitlab-org/gitlab-ui/commit/4025e2e0af2a41aa843ccd7c6f1fae25fd2ac170))
* **GlBreadcrumb:** Watch autoResize prop and react to change ([b4808bf](https://gitlab.com/gitlab-org/gitlab-ui/commit/b4808bfaa59646a6155b394d4c22d4a1c85c6cfb))


### Features

* **GlBreadcrumb:** Add boolean prop to disable auto-resize ([0dad528](https://gitlab.com/gitlab-org/gitlab-ui/commit/0dad528cb2774c3c7bd9ccdafb7f9c8b00a88c23))

# [79.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v79.2.0...v79.3.0) (2024-04-25)


### Features

* **DesignTokens:** add new text colors and deprecate pilot text colors ([818f109](https://gitlab.com/gitlab-org/gitlab-ui/commit/818f109b4151319a7d51025a8eae9bcf2a6e37e4))

# [79.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v79.1.1...v79.2.0) (2024-04-24)


### Bug Fixes

* **dropdowns:** ignore vertical boundaries ([3fec816](https://gitlab.com/gitlab-org/gitlab-ui/commit/3fec81641a0f625810a89a05129737767792df13))


### Features

* **GlDuoChatMessage:** output errors ([f4c804a](https://gitlab.com/gitlab-org/gitlab-ui/commit/f4c804abc033a7b23823366d2b1fa1e065abf056))

## [79.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v79.1.0...v79.1.1) (2024-04-24)


### Bug Fixes

* **GlFormTextarea:** fix bug when `value` prop is `null` ([dffde58](https://gitlab.com/gitlab-org/gitlab-ui/commit/dffde58ea067b8b0a59cd4e4e264f5a1ee477541))

# [79.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v79.0.0...v79.1.0) (2024-04-24)


### Features

* **GlFilteredSearch:** Improve dropdown styles ([ac13b05](https://gitlab.com/gitlab-org/gitlab-ui/commit/ac13b05b092e78e4c61bfd601d7b595c2bf8a04d))
* **GlFilteredSearch:** Improve dropdown styles ([47ae89a](https://gitlab.com/gitlab-org/gitlab-ui/commit/47ae89a019cd33ae4582d61c08c6b48a677cc4f1))

# [79.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.19.0...v79.0.0) (2024-04-22)


### Features

* **BaseDropdown:** Use a "main" element boundary when available ([ee0cd82](https://gitlab.com/gitlab-org/gitlab-ui/commit/ee0cd82b8b2ae6986052877250884ce9cd43df21))


### BREAKING CHANGES

* **BaseDropdown:** This change slightly alters the default positioning
of GlDisclosureDropdown and GlListbox.

If the dropdown is placed inside a <main> element: The disclosure
will use main as a boundary to not overflow it. This change aims
to smartly reduce the need to use custom "placement" ('right'
and 'bottom-end') options, especially when the dropdown is placed
on the right side, such as in contextual menus.

If the dropdown is not placed in a <main> element, behavior does
change.

# [78.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.18.0...v78.19.0) (2024-04-22)


### Features

* **GlFormTextarea:** add support for character count ([1b359aa](https://gitlab.com/gitlab-org/gitlab-ui/commit/1b359aabb514831bddaeca108132427ecde4ae64))

# [78.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.17.0...v78.18.0) (2024-04-19)


### Features

* **GlDisclosureDropdown:** Reorder dropdown items in example ([7145be6](https://gitlab.com/gitlab-org/gitlab-ui/commit/7145be686e16ae286e1189071a15e58403aaa635))

# [78.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.16.0...v78.17.0) (2024-04-19)


### Features

* **GlLabel:** Fix size for legacy label implementations (HAML) ([56c497c](https://gitlab.com/gitlab-org/gitlab-ui/commit/56c497c2d0f49149707a6df8425eac26782f4d42))

# [78.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.15.2...v78.16.0) (2024-04-18)


### Features

* **GlFormInput:** wrap `gl-form-input` in `gl-form-group` ([468ccac](https://gitlab.com/gitlab-org/gitlab-ui/commit/468ccacd8d3ec0c7dd5e89758ee70e330e7c1552))

## [78.15.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.15.1...v78.15.2) (2024-04-18)


### Bug Fixes

* **GlCard:** Fixing header and foter inner border radii ([1c28af7](https://gitlab.com/gitlab-org/gitlab-ui/commit/1c28af7aeabc3df2c13038fda97c42d294a0e476))

## [78.15.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.15.0...v78.15.1) (2024-04-17)


### Bug Fixes

* **GlKeysetPagination:** externalize labels ([9057c19](https://gitlab.com/gitlab-org/gitlab-ui/commit/9057c1910477f1e5a9252900b3c67cd10c2eb2bf))

# [78.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.14.1...v78.15.0) (2024-04-16)


### Features

* **label:** Reduce label variants ([b411a2d](https://gitlab.com/gitlab-org/gitlab-ui/commit/b411a2d58309acbccfb56b78b8f5e8ce61eadf0e))

## [78.14.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.14.0...v78.14.1) (2024-04-15)


### Bug Fixes

* Isolate DuoChat styles from GlDrawer component ([fa8bd24](https://gitlab.com/gitlab-org/gitlab-ui/commit/fa8bd2456c5ae783492f326deec87733878aa9f8))

# [78.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.13.0...v78.14.0) (2024-04-12)


### Features

* **tailwind:** add transparent to supported colors ([8b43228](https://gitlab.com/gitlab-org/gitlab-ui/commit/8b43228294ee2c0d5adf864e5281fe73e9f79cc0))

# [78.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.12.0...v78.13.0) (2024-04-11)


### Features

* **tailwind:** add data-viz colors to the preset ([9b31bd0](https://gitlab.com/gitlab-org/gitlab-ui/commit/9b31bd063e8284921048729ed4f130dcf312de82))

# [78.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.11.0...v78.12.0) (2024-04-10)


### Features

* **GlBaseDropdown:** Migrates "placement" values to match floating-ui placements ([a9f37b6](https://gitlab.com/gitlab-org/gitlab-ui/commit/a9f37b6bcca96a3c0cc8ab22f7664d4b2bfbe613))

# [78.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.10.1...v78.11.0) (2024-04-10)


### Features

* **GlHeatmap:** Add prop to show/hide tooltip ([77a0484](https://gitlab.com/gitlab-org/gitlab-ui/commit/77a0484dcb95f19fb32aa30069465fd64a1dec9b))

## [78.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.10.0...v78.10.1) (2024-04-09)


### Bug Fixes

* **GlLabel:** Add fallback value to focus ring CSS variable ([2f3c184](https://gitlab.com/gitlab-org/gitlab-ui/commit/2f3c184818c3c16cd825558ea69b92adfa90d640))

# [78.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.9.0...v78.10.0) (2024-04-08)


### Features

* **GlDuoChat:** detect streaming based on chunkId ([6cdfe5c](https://gitlab.com/gitlab-org/gitlab-ui/commit/6cdfe5cd823ed0e832a5ec51870421ff4c532dbc))
* **GlDuoChatMessage:** Handle streaming in the component ([082ab86](https://gitlab.com/gitlab-org/gitlab-ui/commit/082ab867597972bb18ba5287ac69126f38e17619))

# [78.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.8.1...v78.9.0) (2024-04-04)


### Features

* **DuoChat:** add mandatory field indicator on DuoChat Feedback Modal ([df7d4a5](https://gitlab.com/gitlab-org/gitlab-ui/commit/df7d4a55e799695c9d972ba029758136c0892990))

## [78.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.8.0...v78.8.1) (2024-04-04)


### Bug Fixes

* Vertical alignment of Duo loader ([b8cc06b](https://gitlab.com/gitlab-org/gitlab-ui/commit/b8cc06b77d15379a15a53269131115de540980d6))

# [78.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.7.0...v78.8.0) (2024-04-04)


### Features

* **GlFormFields:** add support for additional slots ([6ff8a22](https://gitlab.com/gitlab-org/gitlab-ui/commit/6ff8a22adbbfa0df280482cf9681f7b751f11e43))

# [78.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.6.1...v78.7.0) (2024-04-03)


### Features

* **BaseDropdown:** Adds "right-start" placement ([c1c82d6](https://gitlab.com/gitlab-org/gitlab-ui/commit/c1c82d651dc1327e2f6d1404fa14b4509a4e80fa))

## [78.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.6.0...v78.6.1) (2024-04-02)


### Bug Fixes

* update light theme colors for text and background ([a566158](https://gitlab.com/gitlab-org/gitlab-ui/commit/a566158555cacf3c0fbe8802daef342b4d6eaa57))

# [78.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.5.0...v78.6.0) (2024-03-25)


### Features

* **css:** Add gl-lg-display-grid css class ([9dfa9d9](https://gitlab.com/gitlab-org/gitlab-ui/commit/9dfa9d972f0a388843af3b4ec95c451072f06488))

# [78.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.4.0...v78.5.0) (2024-03-25)


### Features

* publish internal Tailwind utils ([069353a](https://gitlab.com/gitlab-org/gitlab-ui/commit/069353a3c64e1add589db9dd776570e874d80067))

# [78.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.3.0...v78.4.0) (2024-03-25)


### Features

* **GlDuoChat:** trim the prompt ([89b1253](https://gitlab.com/gitlab-org/gitlab-ui/commit/89b125332b9674d97848cdb8586338147fa10b20))

# [78.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.2.3...v78.3.0) (2024-03-22)


### Bug Fixes

* **GlDisclosureDropdown:** Prevent unwanted slot overrides in Vue 3 ([6aef295](https://gitlab.com/gitlab-org/gitlab-ui/commit/6aef29519a86cbc187218ebe34437e98ddcdebd1))


### Features

* **GlBreadcrumb:** Always show as many breadcrumbs as possible ([b58ba76](https://gitlab.com/gitlab-org/gitlab-ui/commit/b58ba764e40ee70eace928f4ffa849eeafff0455))

## [78.2.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.2.2...v78.2.3) (2024-03-21)


### Bug Fixes

* **GlBaseDropdown:** Check focused element before closing the dropdown ([54948dd](https://gitlab.com/gitlab-org/gitlab-ui/commit/54948dd3d8848f5ac0fc8d3cb225745401fbe7ea))
* **GlBaseDropdown:** Close menu with escape key on toggle ([990f65d](https://gitlab.com/gitlab-org/gitlab-ui/commit/990f65d07b831a784ddb8ec1c494e4e055d54c5c))

## [78.2.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.2.1...v78.2.2) (2024-03-20)


### Bug Fixes

* Show sort icon on hover in table header ([ab36e49](https://gitlab.com/gitlab-org/gitlab-ui/commit/ab36e4913769ac4fab2f96c667bd884f968f6893))

## [78.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.2.0...v78.2.1) (2024-03-19)


### Bug Fixes

* **GlDuoChat:** clear prompt after /clean ([d3fcd9f](https://gitlab.com/gitlab-org/gitlab-ui/commit/d3fcd9f5aa20db65162cebf5ce0f52445725c87c))

# [78.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.1.2...v78.2.0) (2024-03-14)


### Features

* **css:** Add easing variables ([33a3973](https://gitlab.com/gitlab-org/gitlab-ui/commit/33a39733abb383509ab70f88b8ecd26925a7aff3))

## [78.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.1.1...v78.1.2) (2024-03-13)


### Bug Fixes

* Repair right alignment for table header ([3051537](https://gitlab.com/gitlab-org/gitlab-ui/commit/30515372b8b6212cab60b0cf50671a7cd36a392a))

## [78.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.1.0...v78.1.1) (2024-03-05)


### Bug Fixes

* **GlDuoChat:** allow typing prompt while streaming ([bc107bf](https://gitlab.com/gitlab-org/gitlab-ui/commit/bc107bf7b4e84ec787142ed5b43f299ec6c7ea0b))

# [78.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v78.0.0...v78.1.0) (2024-03-05)


### Features

* **GlDuoChat:** explicitly disable Experimental Badge ([d701cc9](https://gitlab.com/gitlab-org/gitlab-ui/commit/d701cc95e9af956ce17c3b4c75ea4d481cadde59))

# [78.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v77.7.0...v78.0.0) (2024-03-05)


### Features

* **GlDuoChat:** refactor hasFeedback to rely on props ([97d1664](https://gitlab.com/gitlab-org/gitlab-ui/commit/97d166494f7af33f36779863fedc8084ea3254fe))


### BREAKING CHANGES

* **GlDuoChat:** This commit refactors the
GlDuoChat Feedback indicator on every message
to use the information coming in from props
not from localState.

# [77.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v77.6.0...v77.7.0) (2024-03-04)


### Features

* **GlLink:** adding deprecated export for upcoming breaking changes ([4a633ce](https://gitlab.com/gitlab-org/gitlab-ui/commit/4a633ce456e7a6dd4675365fddf0df83216ffc30))

# [77.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v77.5.0...v77.6.0) (2024-03-01)


### Features

* **GlDisclosureDropdownItem:** Support Vue router links ([2bff76d](https://gitlab.com/gitlab-org/gitlab-ui/commit/2bff76de9f1c675eea407d92b646018395be0b2e))

# [77.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v77.4.0...v77.5.0) (2024-03-01)


### Features

* **DuoChat:** Make DuoChat fullWidth by default ([5c8c0ea](https://gitlab.com/gitlab-org/gitlab-ui/commit/5c8c0ea0266ea3bef347327a5f0bdbbd49885c37))
* **tailwind:** add text color design tokens to the preset ([d3535f9](https://gitlab.com/gitlab-org/gitlab-ui/commit/d3535f9a2b65d3722dcd0033bfe97770583a8760))

# [77.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v77.3.0...v77.4.0) (2024-02-28)


### Features

* **css:** add two utils ([c1d2b05](https://gitlab.com/gitlab-org/gitlab-ui/commit/c1d2b05a5a829d43da01d735ab601e8a48b7d21e))
* **css:** remove edits to position.scss ([306f0b4](https://gitlab.com/gitlab-org/gitlab-ui/commit/306f0b43c08e813b2bc618c1517183b4fa5a5413))

# [77.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v77.2.0...v77.3.0) (2024-02-28)


### Features

* **GlCollapsibleListbox:** Render correctly in button group ([aa7b93a](https://gitlab.com/gitlab-org/gitlab-ui/commit/aa7b93abfa807f01b1353723a5f3af3d808a9506))

# [77.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v77.1.0...v77.2.0) (2024-02-27)


### Features

* **tailwind:** add screens to the preset ([d6835dd](https://gitlab.com/gitlab-org/gitlab-ui/commit/d6835ddac49021e38452eb36d647e4ae59bc4ac2))

# [77.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v77.0.0...v77.1.0) (2024-02-27)


### Features

* **DuoChat:** Improve the feedback mechanism in the DuoChat ([235077d](https://gitlab.com/gitlab-org/gitlab-ui/commit/235077d5a20a8a3848233450d8d1c9190008cc15))

# [77.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v76.1.0...v77.0.0) (2024-02-27)


### Bug Fixes

* migrate internal positioning utilities to Tailwind ([bc9ad6a](https://gitlab.com/gitlab-org/gitlab-ui/commit/bc9ad6a8ed21e7a7c673daa23bd8a2bbddeaf30a))
* remove legacy positioning utilities ([8d0450a](https://gitlab.com/gitlab-org/gitlab-ui/commit/8d0450a9077c19e3ae0a49f8e80cd0887ec8ee65))


### BREAKING CHANGES

* Positioning utilities have been removed. Consumers should enable the
following Tailwind CSS core plugins:
* `float`
* `inset`
* `position`

# [76.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v76.0.1...v76.1.0) (2024-02-27)


### Features

* **DesignTokens:** add text design tokens ([7eb5a49](https://gitlab.com/gitlab-org/gitlab-ui/commit/7eb5a49ef97ba40a9d0c1ceb4e2d23b156dc7863))

## [76.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v76.0.0...v76.0.1) (2024-02-27)


### Bug Fixes

* **tailwind:** add font sizes to the preset ([02f26b3](https://gitlab.com/gitlab-org/gitlab-ui/commit/02f26b34c39bd0d84e86cec938eefa1f3a15e003))
* **tailwind:** add font weights to the preset ([84fe175](https://gitlab.com/gitlab-org/gitlab-ui/commit/84fe175a0dfcaf704ab6041479444b58e3608a7e))

# [76.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v75.2.0...v76.0.0) (2024-02-22)


### Bug Fixes

* make `gl-content-empty` mixin internal ([51195ac](https://gitlab.com/gitlab-org/gitlab-ui/commit/51195acf5782cef88542591b14b992698e61f0ab))
* make `gl-mask-chevron-down` mixin internal ([d58d804](https://gitlab.com/gitlab-org/gitlab-ui/commit/d58d8048505dd604b19bf6e20e8c3094b3e96a7b))
* remove legacy `gl-appearance-none` utility mixin ([000795e](https://gitlab.com/gitlab-org/gitlab-ui/commit/000795ed87b4a823c532a9bd14993c1effbf2a83))
* remove mix blend mode utilities ([f3b6b2c](https://gitlab.com/gitlab-org/gitlab-ui/commit/f3b6b2ced8b452ed568a1a416979f34be267e434))
* remove table layout utilities ([20f9027](https://gitlab.com/gitlab-org/gitlab-ui/commit/20f9027de4659b7b8e826dd14718dd7e2707ecc2))
* remove user select utility mixins ([a9ee4bd](https://gitlab.com/gitlab-org/gitlab-ui/commit/a9ee4bdc377d6f4200774b3ef2717edc0923b9e6))


### BREAKING CHANGES

* The `gl-content-empty` utility has been removed. Consumer that need
content utilities can enable the `content` Tailwind core plugin.
* The table user select utilities have been removed. Consumer that need
such utilities can enable the `userSelect` Tailwind core plugin.
* The table layout utility has been removed. Consumer that need such
utility can enable the `tableLayout` Tailwind core plugin.
* The appearance utility has been removed. Consumer that need such
utility can enable the `appearance` Tailwind core plugin.
* The mix blend mode utility has been removed. Consumer that need such
utility can enable the `mixBlendMode` Tailwind core plugin.
* The `gl-mask-chevron-down` utility has been removed.

# [75.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v75.1.0...v75.2.0) (2024-02-22)


### Features

* **GlMarkdown:** Use heading scale ([19c39b6](https://gitlab.com/gitlab-org/gitlab-ui/commit/19c39b6f7bd71624b2d9630fd62128a0fbe0c56a))

# [75.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v75.0.0...v75.1.0) (2024-02-22)


### Features

* **GlDrawer:** Emit "opened" event in transition after-enter hook ([f752b36](https://gitlab.com/gitlab-org/gitlab-ui/commit/f752b3675cf15597412fa28f89df699edcf56f57))

# [75.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.9.3...v75.0.0) (2024-02-21)


### Bug Fixes

* remove isolation utils ([cbc7cf2](https://gitlab.com/gitlab-org/gitlab-ui/commit/cbc7cf20134440e85d9bdc7a61a20b7cdfcdd714))


### BREAKING CHANGES

* This removes the isolation CSS utilities.
Isolation should now be applied via Tailwind CSS utils instead.

## [74.9.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.9.2...v74.9.3) (2024-02-20)


### Bug Fixes

* **DuoChat:** Force a scroll-bar if we have messages ([31f846a](https://gitlab.com/gitlab-org/gitlab-ui/commit/31f846a73604a7bcb094a140366a31aa53199869))

## [74.9.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.9.1...v74.9.2) (2024-02-20)


### Bug Fixes

* Align left margin for inactive state ([5e20544](https://gitlab.com/gitlab-org/gitlab-ui/commit/5e205440d96b613fdec9f324f70dfc8a0bb11692))
* Decrease left margin for icon ([1b2e829](https://gitlab.com/gitlab-org/gitlab-ui/commit/1b2e829d1b810521b864ac23f878a88ca2fc6ff7))
* Make icon darker again ([6350e75](https://gitlab.com/gitlab-org/gitlab-ui/commit/6350e7530835496fb3c68dba8e68b0251574a146))
* Move icon sort position in table ([28f2599](https://gitlab.com/gitlab-org/gitlab-ui/commit/28f25991ec085bf3100d3b1bab380c50547995d2))
* Simplify if statements and width ([21bc5b2](https://gitlab.com/gitlab-org/gitlab-ui/commit/21bc5b2d3bc4a9fcfc4bcfba512ca6a329f0c95f))

## [74.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.9.0...v74.9.1) (2024-02-20)


### Bug Fixes

* **dropdown:** set aria-expanded to string ([8fbae07](https://gitlab.com/gitlab-org/gitlab-ui/commit/8fbae078b59eb2ec17c00b2fb288cb99017e1f2c))

# [74.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.8.0...v74.9.0) (2024-02-19)


### Features

* **GlFilteredSearch:** Add showSearchButton to GlFilteredSearch ([cb119b1](https://gitlab.com/gitlab-org/gitlab-ui/commit/cb119b1d48749436ba2a055bee0d6e189d64026f))

# [74.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.7.1...v74.8.0) (2024-02-19)


### Features

* Adds align-items: flex-start for md ([fc1a07b](https://gitlab.com/gitlab-org/gitlab-ui/commit/fc1a07b6e681f05680c618d8549ec4b3d269a8d0))

## [74.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.7.0...v74.7.1) (2024-02-19)


### Bug Fixes

* run prettier ([0e78123](https://gitlab.com/gitlab-org/gitlab-ui/commit/0e7812316d2b0e1c7da14f61980e01040023985e))

# [74.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.6.0...v74.7.0) (2024-02-15)


### Features

* **add purple-500 class:** Add utility classes for purple-500 ([8a02d5a](https://gitlab.com/gitlab-org/gitlab-ui/commit/8a02d5a03eee42c0014bc9b9ca29b75269ba351e))

# [74.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.5.0...v74.6.0) (2024-02-14)


### Features

* **GlFormFields:** Add prop for server field validations ([6c23b37](https://gitlab.com/gitlab-org/gitlab-ui/commit/6c23b37773d0944953d9068de2bcec00a0e74a8f))

# [74.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.4.0...v74.5.0) (2024-02-12)


### Bug Fixes

* **DuoChat:** Move global error to header ([7d026ef](https://gitlab.com/gitlab-org/gitlab-ui/commit/7d026effca6cf9fb9a352e09784da401936285c5))


### Features

* **DuoChat:** Remove unused hero header ([30ab50c](https://gitlab.com/gitlab-org/gitlab-ui/commit/30ab50c30e72f10cca8600d21b5f71238a4dd2c4))

# [74.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.3.1...v74.4.0) (2024-02-09)


### Features

* **DuoChat:** Add default markdown renderer for streaming messages ([07fea1c](https://gitlab.com/gitlab-org/gitlab-ui/commit/07fea1ce41a0a42be2860b5652e5e8b35330ae83))

## [74.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.3.0...v74.3.1) (2024-02-08)


### Bug Fixes

* **DuoChat:** Stick to bottom of history while streaming answers ([647442a](https://gitlab.com/gitlab-org/gitlab-ui/commit/647442a497987618f603ff7dc81e734ce7508511))

# [74.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.2.0...v74.3.0) (2024-02-08)


### Features

* **css:** adds gl-md-flex-basis-13 utility class ([9bfde57](https://gitlab.com/gitlab-org/gitlab-ui/commit/9bfde57d475b4e937c84f121c7b35af10c72491d))

# [74.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.1.0...v74.2.0) (2024-02-06)


### Features

* **GlSorting:** add `block` prop ([8d76bea](https://gitlab.com/gitlab-org/gitlab-ui/commit/8d76bea901fd7944670fdc9925c0a80c17d7595d))

# [74.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v74.0.0...v74.1.0) (2024-02-06)


### Bug Fixes

* **Gap:** remove `gl-gap-y-6` addition ([7c04d9f](https://gitlab.com/gitlab-org/gitlab-ui/commit/7c04d9f9aa6329f770ac25fcabf8b16b5f907643))


### Features

* **utilities:** add styles from CustomersDot ([260b697](https://gitlab.com/gitlab-org/gitlab-ui/commit/260b6971146db2fca70c9ad6bb1a48218f851909))

# [74.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v73.3.1...v74.0.0) (2024-02-05)


### Features

* Disable colored tooltip and popover variants ([0278dc4](https://gitlab.com/gitlab-org/gitlab-ui/commit/0278dc4bfb6296cdb82b8544467b77914a4311a5))


### BREAKING CHANGES

* Remove Pajamas non-compliant Tooltip and Popover
coloring options.

## [73.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v73.3.0...v73.3.1) (2024-02-02)


### Bug Fixes

* **DuoChat:** Handle large text in chat input ([df6578d](https://gitlab.com/gitlab-org/gitlab-ui/commit/df6578d9ddda20175302b91adfcf85d89ba52675))

# [73.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v73.2.0...v73.3.0) (2024-02-02)


### Features

* **GlBreadcrumb:** Add ariaLabel prop ([5527740](https://gitlab.com/gitlab-org/gitlab-ui/commit/5527740d8b6399224b6bd4acbfd672b9786a3c91))

# [73.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v73.1.1...v73.2.0) (2024-02-02)


### Features

* **GlDuoChat:** Adds empty state and prompt input placeholder props ([6d0b8d0](https://gitlab.com/gitlab-org/gitlab-ui/commit/6d0b8d08dd6158883b0b35efb0cc1d5ebd3222ed))

## [73.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v73.1.0...v73.1.1) (2024-02-01)


### Bug Fixes

* **GlBadge:** Pass aria label through if any ([5f3d8ec](https://gitlab.com/gitlab-org/gitlab-ui/commit/5f3d8ec5a09bc0963ea3282da758ba3c7469935c))

# [73.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v73.0.1...v73.1.0) (2024-01-31)


### Features

* **GlDuoChat:** Adds showHeader prop ([694f75f](https://gitlab.com/gitlab-org/gitlab-ui/commit/694f75fe5480416eef5ffd08ab32f6ed76da22ee))

## [73.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v73.0.0...v73.0.1) (2024-01-30)


### Bug Fixes

* **Typography:** Change name of display heading ([e00a243](https://gitlab.com/gitlab-org/gitlab-ui/commit/e00a2439b797fb92b6ee2d248e7c0b11afb91181)), closes [/gitlab.com/gitlab-org/gitlab-services/design.gitlab.com/-/merge_requests/3707#note_1749912712](https://gitlab.com//gitlab.com/gitlab-org/gitlab-services/design.gitlab.com/-/merge_requests/3707/issues/note_1749912712)

# [73.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.14.0...v73.0.0) (2024-01-30)


### Features

* remove deprecated GlDropdown usage from GlSorting ([9621e68](https://gitlab.com/gitlab-org/gitlab-ui/commit/9621e6872f650570a106a5534ed007c1b76c40f3))


### BREAKING CHANGES

* Remove `GlSortingItem` component and deprecated API
from GlSorting

# [72.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.13.0...v72.14.0) (2024-01-30)


### Features

* **tailwindcss:** extend config with colors and spacing scale ([2c7a006](https://gitlab.com/gitlab-org/gitlab-ui/commit/2c7a006e4c605c58a753d8bfbc8ceb0bdc101cf8))

# [72.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.12.4...v72.13.0) (2024-01-30)


### Features

* **GlDuoChat:** slash commands for chat as a prop ([af86eb8](https://gitlab.com/gitlab-org/gitlab-ui/commit/af86eb883fad3b63b012c25fbe19f4cfa773f8ba))

## [72.12.4](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.12.3...v72.12.4) (2024-01-26)


### Bug Fixes

* **GlBadge:** add `aria-label` atrribute to fix a11y violation ([b5c0c4e](https://gitlab.com/gitlab-org/gitlab-ui/commit/b5c0c4eae223c984ac2e9d8691d77cdec949aada))

## [72.12.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.12.2...v72.12.3) (2024-01-25)


### Bug Fixes

* Change caret position for tailwind package ([e2887d7](https://gitlab.com/gitlab-org/gitlab-ui/commit/e2887d750f78683dd63544269155f1ad52286b55))

## [72.12.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.12.1...v72.12.2) (2024-01-25)


### Bug Fixes

* **GlCollapsibleListbox:** remove aria-owns attribute from search ([c9520a6](https://gitlab.com/gitlab-org/gitlab-ui/commit/c9520a6e6006234c184085ea87b8421eacf36191))
* **Typography:** remove scale from gl-heading-5 and gl-heading-6 classes ([2630e31](https://gitlab.com/gitlab-org/gitlab-ui/commit/2630e310c4a96fed1439b8d21ad99931ab3dbfb1))

## [72.12.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.12.0...v72.12.1) (2024-01-24)


### Bug Fixes

* Building of `dist/` folder ([6592727](https://gitlab.com/gitlab-org/gitlab-ui/commit/6592727b7b2de66a5d40111d37fd331ca65e2411))

# [72.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.11.1...v72.12.0) (2024-01-24)


### Features

* **DesignTokens:** create GlColorContrast component ([17dfa56](https://gitlab.com/gitlab-org/gitlab-ui/commit/17dfa56d0839681a741195910a86debeaede491b))

## [72.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.11.0...v72.11.1) (2024-01-23)


### Performance Improvements

* **SafeHtml:** Add unbind hook to the directive ([2b428b1](https://gitlab.com/gitlab-org/gitlab-ui/commit/2b428b1d19c57a8ebd4d92d318a3abb2461745f7))

# [72.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.10.0...v72.11.0) (2024-01-23)


### Features

* **GlSingleStat:** Change px to rem ([8bc10ba](https://gitlab.com/gitlab-org/gitlab-ui/commit/8bc10ba30e691a9b9a273fce7dbe5636dfdd5228))
* **GlSingleStat:** Update heading ([1f0925a](https://gitlab.com/gitlab-org/gitlab-ui/commit/1f0925ac41e0086eaff2de48ef9942c5ad856811))
* **GlSingleStat:** Use typescale headline ([643e45c](https://gitlab.com/gitlab-org/gitlab-ui/commit/643e45cc066b2f5cffd30fafbb90112c0c62ce0f))

# [72.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.9.0...v72.10.0) (2024-01-19)


### Features

* **GlListbox:** add default SR search results ([92642c8](https://gitlab.com/gitlab-org/gitlab-ui/commit/92642c881813aaab65800312f28d74efd7be772a))

# [72.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.8.1...v72.9.0) (2024-01-19)


### Features

* **css:** adds gl-md-mr-auto utility class ([c0884cb](https://gitlab.com/gitlab-org/gitlab-ui/commit/c0884cbbc497023cc567ed59bf6793ce01c5ff45))

## [72.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.8.0...v72.8.1) (2024-01-18)


### Bug Fixes

* **dropdowns:** do not steal focus back from the consumer ([69295fa](https://gitlab.com/gitlab-org/gitlab-ui/commit/69295faa28dfe48b90e75ab86c9d3ba615760c96))

# [72.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.7.0...v72.8.0) (2024-01-16)


### Features

* **GlColumnChart:** allow customising chart tooltip ([ed6ee9e](https://gitlab.com/gitlab-org/gitlab-ui/commit/ed6ee9e3139cba2793d90d955c39c41f6ab2b5af))

# [72.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.6.0...v72.7.0) (2024-01-14)


### Bug Fixes

* **GlEmptyState:** remove incorrect role from img ([9e5d86f](https://gitlab.com/gitlab-org/gitlab-ui/commit/9e5d86f9c9cbeaae2f7c179f56dbbbab633890e1))


### Features

* **css:** adds gl-max-w-12 utility class ([58254e6](https://gitlab.com/gitlab-org/gitlab-ui/commit/58254e6458e2efc8e0f9c74a80bc9d90396b5404))

# [72.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.5.2...v72.6.0) (2024-01-11)


### Features

* **Avatar:** Update design and stacks ([cd50241](https://gitlab.com/gitlab-org/gitlab-ui/commit/cd5024198711608554a78eb918604ab72735367b))

## [72.5.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.5.1...v72.5.2) (2024-01-11)


### Bug Fixes

* **GlCollapsibleListbox:** Makes scrollable region focusable ([1fdbb47](https://gitlab.com/gitlab-org/gitlab-ui/commit/1fdbb475c23013b6f0acf44ef9442247bb9ec164))

## [72.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.5.0...v72.5.1) (2024-01-11)


### Bug Fixes

* **DesignTokens:** use gray-950 for dark color contrast background ([58dc59c](https://gitlab.com/gitlab-org/gitlab-ui/commit/58dc59c59ab5e49f5d84b2fb69d9ae0594ff5b31))

# [72.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.4.0...v72.5.0) (2024-01-09)


### Bug Fixes

* **deps:** upgrade `@floating-ui/dom` to v1.4.3 ([e04286a](https://gitlab.com/gitlab-org/gitlab-ui/commit/e04286a6783591247f4ea4f75d73a54cb6d2bfd0))


### Features

* **CSS:** add `gl-md-h-9` and `gl-pl-12` utility CSS classes ([c98b325](https://gitlab.com/gitlab-org/gitlab-ui/commit/c98b325805ae96a60032a7f46333d081ad4dc5a4))

# [72.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.3.1...v72.4.0) (2024-01-04)


### Features

* **css:** Add md row-reverse utility class ([b1c1c1c](https://gitlab.com/gitlab-org/gitlab-ui/commit/b1c1c1ca67a5bf45672497ebd1084b6e94ae7043))

## [72.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.3.0...v72.3.1) (2024-01-03)


### Bug Fixes

* **GlAvatar:** Properly display non-square images ([a6f1a5e](https://gitlab.com/gitlab-org/gitlab-ui/commit/a6f1a5e44f1806ad2ae55656965dc69b06048313))

# [72.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.2.0...v72.3.0) (2023-12-22)


### Features

* **css:** Add grid utility classes ([b9cec45](https://gitlab.com/gitlab-org/gitlab-ui/commit/b9cec45bb311a6907a7b4dc2dde0e4575fa2dadd))
* **DesignTokens:** add 10 scale to theme colors ([b27d520](https://gitlab.com/gitlab-org/gitlab-ui/commit/b27d520d6ff3e5c5d9c65226703b8a57e6103b4c))

# [72.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.1.0...v72.2.0) (2023-12-21)


### Features

* **DesignTokens:** add color contrast score and level to stories ([f75751b](https://gitlab.com/gitlab-org/gitlab-ui/commit/f75751ba1bcfd0da6c5672483678f598d14b4041))

# [72.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v72.0.0...v72.1.0) (2023-12-18)


### Features

* **css:** Add gl-align-self-baseline utility class ([7291f50](https://gitlab.com/gitlab-org/gitlab-ui/commit/7291f50cac7a4f9a2ca5e43390fad6896906022a))
* **CSS:** add `gl-h-10` utility CSS class ([75c253a](https://gitlab.com/gitlab-org/gitlab-ui/commit/75c253abc389a126e9ffa37ec4d64a6c87ffc807))

# [72.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.11.1...v72.0.0) (2023-12-18)


* Merge branch 'force-release' into 'main' ([7df9bbe](https://gitlab.com/gitlab-org/gitlab-ui/commit/7df9bbececf3e79513be7d022269fc84864cc7a2))


### Bug Fixes

* Force a release ([090865a](https://gitlab.com/gitlab-org/gitlab-ui/commit/090865a92acbefa8b1891331651bfb27e430e0d8))


### BREAKING CHANGES

* This changes the API the GitLab duo chat component expects

See merge request https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3868

Merged-by: Lukas 'Eipi' Eipert <leipert@gitlab.com>
Approved-by: Lukas 'Eipi' Eipert <leipert@gitlab.com>
Co-authored-by: Pavel Shutsin <pshutsin@gitlab.com>

## [71.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.11.0...v71.11.1) (2023-12-15)


### Bug Fixes

* **Collapse:** explicitly pass visible prop ([afcae2b](https://gitlab.com/gitlab-org/gitlab-ui/commit/afcae2b257c44003a1776b6e403fe35c97638626))

# [71.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.10.0...v71.11.0) (2023-12-14)


### Features

* **DesignTokens:** add transparency values as design tokens ([c4f5232](https://gitlab.com/gitlab-org/gitlab-ui/commit/c4f523206e3c4cbc607bea6445c16e4069c835f0))
* **GlDuoChat:** promote "/" commands ([8d3239b](https://gitlab.com/gitlab-org/gitlab-ui/commit/8d3239b85b0dd68a79ee4e7e61162ddad15f5e72))

# [71.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.9.1...v71.10.0) (2023-12-13)


### Features

* **GlLineChart, GlAreaChart:** Simplify chart tooltip API ([3658fb6](https://gitlab.com/gitlab-org/gitlab-ui/commit/3658fb6b3efb4a396703e7697d415541ec3aa417))

## [71.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.9.0...v71.9.1) (2023-12-13)


### Bug Fixes

* **DesignTokens:** fix themeable typo in theme design tokens ([89c975f](https://gitlab.com/gitlab-org/gitlab-ui/commit/89c975fe5596dff978950dd45950982b229f4856))

# [71.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.8.1...v71.9.0) (2023-12-12)


### Features

* **css:** Add gl-top-full mixin ([0c8dfe6](https://gitlab.com/gitlab-org/gitlab-ui/commit/0c8dfe6f4def49d3eb78341d19abd8fdadaab89d))
* **GlDateRangePicker:** Add start-opened to GlDateRangePicker ([ea07ccd](https://gitlab.com/gitlab-org/gitlab-ui/commit/ea07ccd51fd6a6568edbf39f1305bb5465afcced))
* **GlFilteredSearchToken:** Add value argument to complete event ([40590dc](https://gitlab.com/gitlab-org/gitlab-ui/commit/40590dc0f4724fd86845695ea662f74a3bfe3618))

## [71.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.8.0...v71.8.1) (2023-12-11)


### Bug Fixes

* **GlAvatarInline:** Address MR feedback ([c139beb](https://gitlab.com/gitlab-org/gitlab-ui/commit/c139beb921af6de88c01ca3daab52022fe3ee1dc))
* **GlAvatarInline:** Fix spacing in GlAvatarInlne ([4801ecd](https://gitlab.com/gitlab-org/gitlab-ui/commit/4801ecdf895ba47a7bf8a8b29bb31c5fc5027044))

# [71.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.7.1...v71.8.0) (2023-12-11)


### Features

* **GlBanner:** remove embedded property ([b024100](https://gitlab.com/gitlab-org/gitlab-ui/commit/b02410025fbb4efa7704081e0c0c2a9bd01e3216))

## [71.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.7.0...v71.7.1) (2023-12-08)


### Bug Fixes

* **GlDuoChat:** better align slash commands ([e171560](https://gitlab.com/gitlab-org/gitlab-ui/commit/e171560b638e39b3315c32514442ffb5786d2a6c))

# [71.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.6.1...v71.7.0) (2023-12-07)


### Bug Fixes

* **Dropdown:** Polish trigger spacing ([9e60b07](https://gitlab.com/gitlab-org/gitlab-ui/commit/9e60b07b4c248350028d151840cb1c2899229be6))


### Features

* **GlAvatarLabeled:** Wrap subLabel ([aa773e2](https://gitlab.com/gitlab-org/gitlab-ui/commit/aa773e28400568119a6c72d7106a3db63aa4e85c))

## [71.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.6.0...v71.6.1) (2023-12-06)


### Bug Fixes

* **GlLoadingIcon:** aria-label for GlLoadingIcon ([09e9768](https://gitlab.com/gitlab-org/gitlab-ui/commit/09e9768d08a104712ebc240881fc7a6c45fc0b4f))


### Reverts

* feat(GlBadge): change spaces ([6556551](https://gitlab.com/gitlab-org/gitlab-ui/commit/6556551fdebe634e2ce8be1e15b838bce7168445))

# [71.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.5.0...v71.6.0) (2023-12-05)


### Features

* **GlDuoChat:** switched /test to /tests command ([5045d5d](https://gitlab.com/gitlab-org/gitlab-ui/commit/5045d5daaaeaa10094ad75e4cf6b11da3a73bcd4))

# [71.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.4.0...v71.5.0) (2023-12-05)


### Features

* **GlChartTooltip:** Add slot API for chart tooltip ([572b33e](https://gitlab.com/gitlab-org/gitlab-ui/commit/572b33e5151f2d0508bca07d895f3cd444f4af54))

# [71.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.3.0...v71.4.0) (2023-12-04)


### Features

* **GlTruncateText:** add `toggleButtonProps` prop ([25a6577](https://gitlab.com/gitlab-org/gitlab-ui/commit/25a6577ba7061ce82d040ad5cda6977477e04f41))

# [71.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.2.0...v71.3.0) (2023-12-04)


### Features

* **DesignTokens:** add dark mode colors for data-viz and theme colors ([7488ded](https://gitlab.com/gitlab-org/gitlab-ui/commit/7488ded96b1d33ee7b040cc2c6aff2f190202b02))

# [71.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.1.1...v71.2.0) (2023-11-30)


### Features

* **GlBadge:** change spaces ([4f54265](https://gitlab.com/gitlab-org/gitlab-ui/commit/4f54265f2c6b02a8873d107c0fb5cc78ac048f6c))

## [71.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.1.0...v71.1.1) (2023-11-28)


### Bug Fixes

* **GlFilteredSearch:** Make close button keyboard accessible ([78d809c](https://gitlab.com/gitlab-org/gitlab-ui/commit/78d809ccd7065ee61c90e09f48daa014f697557a))

# [71.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v71.0.0...v71.1.0) (2023-11-24)


### Features

* **css:** Add gl-line-clamp-{value} utility class ([304a508](https://gitlab.com/gitlab-org/gitlab-ui/commit/304a508af5933ebe33de9f30f7e0aca4c871654a))

# [71.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v70.0.1...v71.0.0) (2023-11-22)


### Features

* **GlFormInput, GlFormSelect, GlDatepicker:** remove deprecated props ([72ff245](https://gitlab.com/gitlab-org/gitlab-ui/commit/72ff245417250b78514b60fb0a85fbde64a5d7c7))


### BREAKING CHANGES

* **GlFormInput, GlFormSelect, GlDatepicker:** Removes the legacy property "size" from GlFormInput,
GlFormSelect & GlDatepicker.

## [70.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v70.0.0...v70.0.1) (2023-11-21)


### Bug Fixes

* **GlChart:** Tooltip fix on MS Edge ([5eab629](https://gitlab.com/gitlab-org/gitlab-ui/commit/5eab629cff921370f60717b5460b0d33e2188714))

# [70.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v69.1.0...v70.0.0) (2023-11-21)


### Performance Improvements

* remove exported scss_to_js scripts and usages ([b198d8b](https://gitlab.com/gitlab-org/gitlab-ui/commit/b198d8ba2813b96126c65310ba52065abd845a5e))


### BREAKING CHANGES

* Remove scss_to_js export. Prefer use of
/dist/tokens/js/tokens.js for importing generated token variables.

# [69.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v69.0.0...v69.1.0) (2023-11-20)


### Features

* **css:** Add gl-{size}-mr-0 utility classes ([4ce256c](https://gitlab.com/gitlab-org/gitlab-ui/commit/4ce256c8eba06c8ecdbddb67c92b2a097e415518))

# [69.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v68.8.0...v69.0.0) (2023-11-16)


### Bug Fixes

* **css:** remove desktop-first CSS utils ([797f198](https://gitlab.com/gitlab-org/gitlab-ui/commit/797f19868bf6cd4d10e1c7775744391e82aa81e1))


### Features

* **css:** add responsive CSS utils ([ca0d144](https://gitlab.com/gitlab-org/gitlab-ui/commit/ca0d1440f861fa0b83f0446d34c66661f329450d))


### BREAKING CHANGES

* **css:** This removes the remaining desktop-first CSS utilities
form the library. Any usages of those should be replaced with
mobile-first alternatives. See below for replacement suggestions. Note
that the proposed replacements should work in the most simple cases.
Some use cases might require using different utils combinations.

* `gl-sm-flex-direction-column`
Replace with `gl-flex-direction-column gl-md-flex-direction-row`.

* `gl-xs-flex-direction-column`
Replace with `gl-flex-direction-column gl-sm-flex-direction-row`.

* `gl-xs-w-full`
Replace with `gl-w-full gl-sm-w-auto`.

* `gl-xs-mb-3`
Replace with `gl-mb-3 gl-sm-mb-0`.

# [68.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v68.7.0...v68.8.0) (2023-11-15)


### Features

* **GlBanner:** Add gray background ([5103460](https://gitlab.com/gitlab-org/gitlab-ui/commit/5103460b8601edd25e1af69f38612cea0a847f1a))

# [68.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v68.6.0...v68.7.0) (2023-11-15)


### Features

* **GlDuoChatMessage:** added copy-code button ([3133d60](https://gitlab.com/gitlab-org/gitlab-ui/commit/3133d60d6004db689b4315fcc034774a4b53dac0))

# [68.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v68.5.0...v68.6.0) (2023-11-15)


### Features

* **Tokens:** add theme color design tokens ([97405b4](https://gitlab.com/gitlab-org/gitlab-ui/commit/97405b483f44b60f8e24fa9dbb1a40dc080efd43))

# [68.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v68.4.0...v68.5.0) (2023-11-14)


### Features

* **GlBanner:** change illustration size ([720c057](https://gitlab.com/gitlab-org/gitlab-ui/commit/720c057fd973cfecb563cb4eba2e5a6de593c1c5))

# [68.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v68.3.0...v68.4.0) (2023-11-14)


### Features

* **GlAlert, GlBroadcastMessage:** Add CSS variable overrides ([ed2754f](https://gitlab.com/gitlab-org/gitlab-ui/commit/ed2754f2711cdd1eb9d2fd0f5b903a4d77aeff85))

# [68.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v68.2.1...v68.3.0) (2023-11-10)


### Features

* **GlDuoChat:** support for slash commands ([2d3eee1](https://gitlab.com/gitlab-org/gitlab-ui/commit/2d3eee10dd2b1d183111729c0484deb125847c0d))

## [68.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v68.2.0...v68.2.1) (2023-11-10)


### Bug Fixes

* **GlPopover:** increase hide delay ([7fb02fa](https://gitlab.com/gitlab-org/gitlab-ui/commit/7fb02fafb467847d4eff1dab98ee14db94464044))

# [68.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v68.1.0...v68.2.0) (2023-11-09)


### Bug Fixes

* **css:** remove vendor-prefixed property ([de23bf4](https://gitlab.com/gitlab-org/gitlab-ui/commit/de23bf41b816c32996342ee3bb69e45f914cc8b8))
* **GlBroadcastMessage:** wrap long words ([25ad510](https://gitlab.com/gitlab-org/gitlab-ui/commit/25ad510d79ec6e5ffddd9dd81139a3bbafc96502))


### Features

* **css:** add gl-overflow-anywhere utility ([3b26c8c](https://gitlab.com/gitlab-org/gitlab-ui/commit/3b26c8c628dc724c7238e3aa95a14d0ad610a6dd))

# [68.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v68.0.0...v68.1.0) (2023-11-08)


### Bug Fixes

* **GlDisclosureDropdown:** nested dropdown click closes a parent one ([896ca20](https://gitlab.com/gitlab-org/gitlab-ui/commit/896ca202424d1f5adcca352101c8cd56d007a4df))


### Features

* **css:** Add gl-sm-pr-4 utility ([a763496](https://gitlab.com/gitlab-org/gitlab-ui/commit/a7634968fe7a2771796df73d74dd1a9f8ece0012))

# [68.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.5.2...v68.0.0) (2023-11-07)


### Features

* **GlExperimentBadge:** support 'beta' type ([927f830](https://gitlab.com/gitlab-org/gitlab-ui/commit/927f8302be7bcf471650228b25ee526332b2ff16))


### BREAKING CHANGES

* **GlExperimentBadge:** To extend the capabilities of the
badge, now it suports not only experiments, but
also allows to move features to beta state
using the same component

## [67.5.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.5.1...v67.5.2) (2023-11-06)


### Bug Fixes

* **css:** chart legend display issue in dark mode ([ce60a9f](https://gitlab.com/gitlab-org/gitlab-ui/commit/ce60a9f8e921c51c5a33c4fea2f3adad20772b43))

## [67.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.5.0...v67.5.1) (2023-11-03)


### Bug Fixes

* **GlDuoChatMessage:** Use nextTick from component instance ([4e39ab6](https://gitlab.com/gitlab-org/gitlab-ui/commit/4e39ab6ec0a9c9e162f4342030b67b257c2b09e4))

# [67.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.4.0...v67.5.0) (2023-11-02)


### Features

* **css:** Add focus variant for gl-z-index-1 ([8c08f01](https://gitlab.com/gitlab-org/gitlab-ui/commit/8c08f01a7877dd2836fb1eb024a9bfc8ad37cc44))
* **GlSorting:** Add opt-in for new dropdown design ([b4eb476](https://gitlab.com/gitlab-org/gitlab-ui/commit/b4eb476976ca488b89641404acd19c2029a5d27d))
* **GlSorting:** Make strings translatable ([2964d55](https://gitlab.com/gitlab-org/gitlab-ui/commit/2964d55864b17022d62c294ebf6c7babab611407))

# [67.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.3.3...v67.4.0) (2023-11-02)


### Features

* **GlColumnChart:** allow setting `stack` series property ([1ec54d9](https://gitlab.com/gitlab-org/gitlab-ui/commit/1ec54d9285bdda447575f31689ccc417389a6a96))

## [67.3.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.3.2...v67.3.3) (2023-11-01)


### Bug Fixes

* **GlDuoChat:** 100% height for chat ([bfad98d](https://gitlab.com/gitlab-org/gitlab-ui/commit/bfad98d392b1db6dea00705178dbb3cb6b2d10fe))

## [67.3.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.3.1...v67.3.2) (2023-11-01)


### Bug Fixes

* **GlDuoChat:** multi-line prompt support ([99216fe](https://gitlab.com/gitlab-org/gitlab-ui/commit/99216fe46e2c51afd5a607c2acd27d24f559f21c))

## [67.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.3.0...v67.3.1) (2023-10-31)


### Bug Fixes

* **GlDuoChatLoader:** correctly wrap loader's text ([00ae4cd](https://gitlab.com/gitlab-org/gitlab-ui/commit/00ae4cda32d01c558556ec580fc1fe59b7b07fb0))

# [67.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.2.0...v67.3.0) (2023-10-31)


### Features

* **GlLineChart:** Defines a #tooltip-value slot ([4624919](https://gitlab.com/gitlab-org/gitlab-ui/commit/462491952e19832c9abd257b54130ed93244fd88))

# [67.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.1.0...v67.2.0) (2023-10-30)


### Features

* **GlOutsideDirective:** respect mousedown events before click ([e2d72d5](https://gitlab.com/gitlab-org/gitlab-ui/commit/e2d72d5cc4d90c57fea3eb54f43d68338cab5ab4))

# [67.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v67.0.0...v67.1.0) (2023-10-27)


### Features

* **color:** Add utility classes used in top header ([6d3e4cf](https://gitlab.com/gitlab-org/gitlab-ui/commit/6d3e4cfab9f78dfbfd81b1678fde6d0733fb769e))

# [67.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.37.0...v67.0.0) (2023-10-27)


### Features

* **SafeHtml:** disallow potentially dangerous tags ([25926ab](https://gitlab.com/gitlab-org/gitlab-ui/commit/25926ab418ffbbbe657a6a1485d01c13368e2a67))


### BREAKING CHANGES

* **SafeHtml:** This change improves safe-html defense
by adding style, mystlye and form tags to the forbidden
list.

# [66.37.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.36.1...v66.37.0) (2023-10-25)


### Features

* **GlDuoChatMessage:** do not strip out copy-code ([14782a5](https://gitlab.com/gitlab-org/gitlab-ui/commit/14782a5d60a8e48dffb60fa120bddc61285d950a))

## [66.36.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.36.0...v66.36.1) (2023-10-24)


### Bug Fixes

* **Dropdown:** correct dropdown chevron position when block ([d7b7075](https://gitlab.com/gitlab-org/gitlab-ui/commit/d7b70757a6c96e6de7d472910f93f75b909c92e9))

# [66.36.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.35.2...v66.36.0) (2023-10-24)


### Features

* **GlLink:** Removes text size override in gl-link ([ff9d6fa](https://gitlab.com/gitlab-org/gitlab-ui/commit/ff9d6fab70bdcfc903238c9f3f5a9da5924e9a36))

## [66.35.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.35.1...v66.35.2) (2023-10-24)


### Bug Fixes

* rendering chunks after the final message ([b745c98](https://gitlab.com/gitlab-org/gitlab-ui/commit/b745c98cce77355e3efef2ec08867cb2e2cacb2a))
* **GlDiscreteChatter:** Fix popover handling ([3a9deb0](https://gitlab.com/gitlab-org/gitlab-ui/commit/3a9deb05e7fd9fd6f63ae18c4bed565170735038))

## [66.35.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.35.0...v66.35.1) (2023-10-20)


### Bug Fixes

* **GlDuoChatMessage:** nextTick() when rendering GFM ([835900c](https://gitlab.com/gitlab-org/gitlab-ui/commit/835900cb9cf01e26b4e24120be3abc6f48c3c371))

# [66.35.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.34.0...v66.35.0) (2023-10-20)


### Features

* **DisclosureDropdown:** Add startOpened prop ([4896b9c](https://gitlab.com/gitlab-org/gitlab-ui/commit/4896b9c3a6f9075a76fa71ea275f2153de111249))

# [66.34.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.33.0...v66.34.0) (2023-10-18)


### Features

* **css:** added gl-z-index-999 utility ([f297430](https://gitlab.com/gitlab-org/gitlab-ui/commit/f2974305522a9a3e2b9d00a4590df332826817e6))

# [66.33.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.32.1...v66.33.0) (2023-10-17)


### Features

* **GlDuoChat:** Implemented component ([ce8a3b4](https://gitlab.com/gitlab-org/gitlab-ui/commit/ce8a3b417882d068a147719a4b7dfdeb91e7bb3b))

## [66.32.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.32.0...v66.32.1) (2023-10-17)


### Bug Fixes

* **GlCollapsibleListbox:** Make the search input rounded ([23705b2](https://gitlab.com/gitlab-org/gitlab-ui/commit/23705b276853da5622cdae2484f38ce8f22a9ba5))

# [66.32.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.31.1...v66.32.0) (2023-10-16)


### Features

* **GlDisclosureDropdown:** add a beforeClose event ([cb4fdb1](https://gitlab.com/gitlab-org/gitlab-ui/commit/cb4fdb10f3669e80c688ea8e442f6dd9cb7ce973))

## [66.31.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.31.0...v66.31.1) (2023-10-13)


### Bug Fixes

* **GlCollapsibleListbox:** Visibility of Reset button ([f71f767](https://gitlab.com/gitlab-org/gitlab-ui/commit/f71f767553a93237167c65772479e990c8913f93))

# [66.31.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.30.0...v66.31.0) (2023-10-13)


### Features

* **InfiniteScroll:** Add support for scrolling behavior ([ca91a07](https://gitlab.com/gitlab-org/gitlab-ui/commit/ca91a07706107652d4b659e8bece8b5bfea31d89))

# [66.30.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.29.0...v66.30.0) (2023-10-12)


### Features

* **GlDuoChatConversation:** added component ([68017ef](https://gitlab.com/gitlab-org/gitlab-ui/commit/68017ef7707a5984e41fb93d2fd25cd53ab5e323))

# [66.29.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.28.0...v66.29.0) (2023-10-12)


### Features

* **Listbox:** Add startOpened prop ([5bb3d17](https://gitlab.com/gitlab-org/gitlab-ui/commit/5bb3d173f78f5a53d67430bbaf15c8a5366983be))

# [66.28.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.27.0...v66.28.0) (2023-10-12)


### Features

* **GlDiscreteScatterChart:** Add disableTooltip prop ([cd430c2](https://gitlab.com/gitlab-org/gitlab-ui/commit/cd430c2ca17749af3c2fca21164141d80d1edd3a))

# [66.27.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.26.0...v66.27.0) (2023-10-11)


### Features

* **GlAlert:** Use heading scale ([b9ae701](https://gitlab.com/gitlab-org/gitlab-ui/commit/b9ae70178ba748e63a6b3e6f939bbcb889778556))

# [66.26.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.25.1...v66.26.0) (2023-10-10)


### Features

* **GlDuoChatMessage:** Implemented component ([633f36f](https://gitlab.com/gitlab-org/gitlab-ui/commit/633f36f4cb0a117beaf6d377e20fead885b6abb6))

## [66.25.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.25.0...v66.25.1) (2023-10-09)


### Bug Fixes

* **charts:** prevent long legends overflowing chart ([873edcf](https://gitlab.com/gitlab-org/gitlab-ui/commit/873edcf60afbd275f466a0ef200d5eb01c81eda1))

# [66.25.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.24.0...v66.25.0) (2023-10-05)


### Features

* **GlDuoUserFeedback:** introduced new slots ([d771a0f](https://gitlab.com/gitlab-org/gitlab-ui/commit/d771a0f3466e1391f106650eb08130b7853717d9))

# [66.24.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.23.1...v66.24.0) (2023-10-05)


### Features

* **DuoChatLoader:** added component ([658ca9e](https://gitlab.com/gitlab-org/gitlab-ui/commit/658ca9e4eecf3311f110311f483123271432897d))

## [66.23.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.23.0...v66.23.1) (2023-10-04)


### Bug Fixes

* **GlCollapsibleListbox, GlDisclosureDropdown:** Update group border color ([6dc4bf2](https://gitlab.com/gitlab-org/gitlab-ui/commit/6dc4bf25af9fcd85f7de70f3919e5152b0979de0))

# [66.23.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.22.0...v66.23.0) (2023-10-03)


### Features

* **GlDuoChatPredefinedPrompts:** new component ([c3e2347](https://gitlab.com/gitlab-org/gitlab-ui/commit/c3e234717b9c33ab8bb3d3f66e13387efe235fd7))

# [66.22.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.21.0...v66.22.0) (2023-10-03)


### Features

* **GlDuoChatMessageSources:** Implemented component ([8066320](https://gitlab.com/gitlab-org/gitlab-ui/commit/8066320214e88a8b75279eec1d82029bf8c3e9db))

# [66.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.20.0...v66.21.0) (2023-10-02)


### Features

* **Popover:** Use heading scale ([7375d5e](https://gitlab.com/gitlab-org/gitlab-ui/commit/7375d5e20863543f62c82e26fc7dd45806401e19))

# [66.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.19.0...v66.20.0) (2023-10-02)


### Bug Fixes

* **Banner:** Make banner match design spec ([3e73557](https://gitlab.com/gitlab-org/gitlab-ui/commit/3e73557aba7cdcf3bbf21a3a92f100c66762b3b6))


### Features

* **Banner:** Update heading to use heading scale ([4757149](https://gitlab.com/gitlab-org/gitlab-ui/commit/47571493f27b7fda9566a84f1b16a7b7c8335914))

# [66.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.18.0...v66.19.0) (2023-09-29)


### Features

* **GlDuoUserFeedback:** Added the component ([f9a6f93](https://gitlab.com/gitlab-org/gitlab-ui/commit/f9a6f93fe0b46ba5638d9ad711e062afb7898636))

# [66.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.17.0...v66.18.0) (2023-09-27)


### Features

* **GlEmptyState:** Add line length limit ([7e03303](https://gitlab.com/gitlab-org/gitlab-ui/commit/7e03303da94d39c062c61fa6882cc94f1da928c4))

# [66.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.16.0...v66.17.0) (2023-09-27)


### Features

* **Modal:** Use current styles and h2 for heading ([21abaf1](https://gitlab.com/gitlab-org/gitlab-ui/commit/21abaf1c5c64df650feb3702c14f3ad2f0022a65))

# [66.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.15.0...v66.16.0) (2023-09-27)


### Features

* **Typography:** Add heading scale classes ([4bfa950](https://gitlab.com/gitlab-org/gitlab-ui/commit/4bfa9505db2cfeb12009a0a4f0ea69a9f1c234ef))

# [66.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.14.0...v66.15.0) (2023-09-26)


### Features

* **GLFilteredSearch:** Allow commas in multiSelect values ([160781a](https://gitlab.com/gitlab-org/gitlab-ui/commit/160781ad70105069163bc56631fb333a75764163))

# [66.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.13.1...v66.14.0) (2023-09-25)


### Features

* **GlExperimentBadge:** Implement component ([de360ee](https://gitlab.com/gitlab-org/gitlab-ui/commit/de360eec00fb772cb3c10258f246975832d68f34))

## [66.13.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.13.0...v66.13.1) (2023-09-25)


### Bug Fixes

* **css:** update gl-overflow-break-word mixin ([5280a70](https://gitlab.com/gitlab-org/gitlab-ui/commit/5280a70c13a9cd00887d9844b705d64a5675eadc))
* **GlBroadcastMessage:** Fix broadcast message word break issue ([83363ff](https://gitlab.com/gitlab-org/gitlab-ui/commit/83363ff8a8d7e2ede363dcd137d231611a4722f0))

# [66.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.12.0...v66.13.0) (2023-09-21)


### Features

* **GlFormInut, GlFormSelect, GlDatepicker:** Add prop width, deprecate prop size ([6de322c](https://gitlab.com/gitlab-org/gitlab-ui/commit/6de322c20f7fb2f2f7922392da513167f3bd2530))

# [66.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.11.0...v66.12.0) (2023-09-21)


### Features

* **GlTable:** Add option for sticky table headers ([68f814d](https://gitlab.com/gitlab-org/gitlab-ui/commit/68f814da649d7d353232bd7ca0900614ccb41325))

# [66.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.10.1...v66.11.0) (2023-09-20)


### Features

* **Avatar:** Use font size scale ([9b64e96](https://gitlab.com/gitlab-org/gitlab-ui/commit/9b64e96c2d283d73330c89f91a6066886dd3c4cf))

## [66.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.10.0...v66.10.1) (2023-09-19)


### Bug Fixes

* adjust dark mode preview text color ([2196116](https://gitlab.com/gitlab-org/gitlab-ui/commit/2196116088f4d5100ae8095f4716f04417eac75f))
* use CSS variables instead of JS literals for axis color ([6bc13ca](https://gitlab.com/gitlab-org/gitlab-ui/commit/6bc13ca9eb0d901feb71a263a4b6107cf3f82e15))
* **GlChart:** make chart legend text visible in dark mode ([0ec9e7c](https://gitlab.com/gitlab-org/gitlab-ui/commit/0ec9e7cfbc387d5bcdbf490ebd3e51ff6fa666ef))

# [66.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.9.0...v66.10.0) (2023-09-19)


### Features

* **Typography:** Add font-size variable map and heading mixins ([c412fe8](https://gitlab.com/gitlab-org/gitlab-ui/commit/c412fe834011683df677d78dbd793cdd65339783))

# [66.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.8.0...v66.9.0) (2023-09-13)


### Features

* adds css-based skeleton loader ([445fc09](https://gitlab.com/gitlab-org/gitlab-ui/commit/445fc09e7e42b53f79142a79a1a48604f39429be))

# [66.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.7.1...v66.8.0) (2023-09-13)


### Features

* **css:** add gl-lg-max-w-50p utility ([0139a72](https://gitlab.com/gitlab-org/gitlab-ui/commit/0139a7293106af0c743211735e60433c0ee9c132))

## [66.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.7.0...v66.7.1) (2023-09-13)


### Bug Fixes

* **NewListboxItem:** Update interactive styles to design spec ([17f773f](https://gitlab.com/gitlab-org/gitlab-ui/commit/17f773f60d4cbe1eb89542c2c3cf63d5311f1a96))

# [66.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.6.0...v66.7.0) (2023-09-12)


### Bug Fixes

* **GlEmptyState:** update styling to be Pajamas compliant ([35862a2](https://gitlab.com/gitlab-org/gitlab-ui/commit/35862a2e5e052227b162ad85e02cb87581b354d2))


### Features

* **CSS:** add `gl-md-grid-template-columns-4` CSS utility class ([2e7fe9b](https://gitlab.com/gitlab-org/gitlab-ui/commit/2e7fe9b7fda8c402712ee0a617767e3181d648b5))

# [66.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.5.0...v66.6.0) (2023-09-10)


### Features

* **mixin:** Add hover for gl-border-gray-10 mixin ([ffe4522](https://gitlab.com/gitlab-org/gitlab-ui/commit/ffe4522dfa788d166ac98b34fe49045cdfac6e25))

# [66.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.4.0...v66.5.0) (2023-09-07)


### Features

* **GlSingleStat:** Format the displayed number based on locale ([b6a845d](https://gitlab.com/gitlab-org/gitlab-ui/commit/b6a845d4344ad1ecef83738b6ef1b82a45d786a5))

# [66.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.3.1...v66.4.0) (2023-09-04)


### Features

* **css:** Add gl-gap-1 class ([8248bf7](https://gitlab.com/gitlab-org/gitlab-ui/commit/8248bf73385db0b15a87c03dc8ccc4310e0f7306))

## [66.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.3.0...v66.3.1) (2023-09-01)


### Bug Fixes

* **GlCollapsibleListbox:** show/hide select all and reset buttons for groups ([867e9c5](https://gitlab.com/gitlab-org/gitlab-ui/commit/867e9c5948f21a1bfb94502ac56f6248c6ab0b4a))

# [66.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.2.0...v66.3.0) (2023-08-30)


### Features

* accept generic translations at configuration time ([c3e04c7](https://gitlab.com/gitlab-org/gitlab-ui/commit/c3e04c7b72db211bcf3b34c9c47dc42214d1b3db))

# [66.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.1.0...v66.2.0) (2023-08-30)


### Features

* **css:** Add -gl-mb-n8 util class ([b484bfb](https://gitlab.com/gitlab-org/gitlab-ui/commit/b484bfb4c00c39e495055914a4ada0a9842563b9))

# [66.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.0.1...v66.1.0) (2023-08-29)


### Features

* **css:** Add gl-mb-n* util classes ([12fd76f](https://gitlab.com/gitlab-org/gitlab-ui/commit/12fd76f3841823aed4a411b03e0b7bbaa151e897))

## [66.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v66.0.0...v66.0.1) (2023-08-24)


### Reverts

* feat(GlToggle): Add a block level toggle ([c092403](https://gitlab.com/gitlab-org/gitlab-ui/commit/c0924031044b00711eceb8f3f63e4a5d2351c4e4))

# [66.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v65.4.0...v66.0.0) (2023-08-24)


### Code Refactoring

* Remove `GlSkeletonLoading` component ([a2cf859](https://gitlab.com/gitlab-org/gitlab-ui/commit/a2cf859afb63887f847aa88822aeedd51d5c141c))


### BREAKING CHANGES

* `GlSkeletonLoading` has been deprecated
since `v20.10.0`.

# [65.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v65.3.1...v65.4.0) (2023-08-21)


### Features

* **CSS:** add `gl-sm-justify-content-start` utility CSS class ([4f7e923](https://gitlab.com/gitlab-org/gitlab-ui/commit/4f7e92322933af8902587ed76a45ad415e458bc0))

## [65.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v65.3.0...v65.3.1) (2023-08-17)


### Bug Fixes

* revert setting fixed height on form control ([29fe576](https://gitlab.com/gitlab-org/gitlab-ui/commit/29fe576a79984e7c844c448e67aa0729fd6627e4))


### Reverts

* add default styling for GlInputGroupText ([ace959e](https://gitlab.com/gitlab-org/gitlab-ui/commit/ace959e4d8e0fe427a1260ffd0adbaab135f89ee))

# [65.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v65.2.0...v65.3.0) (2023-08-17)


### Features

* **CSS:** Add new utility CSS class ([13b3b30](https://gitlab.com/gitlab-org/gitlab-ui/commit/13b3b30d42a6cacbf7a5886e978d7ceaef5d7d4f))

# [65.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v65.1.3...v65.2.0) (2023-08-16)


### Features

* Changing chart responsive prop to true ([6400e0e](https://gitlab.com/gitlab-org/gitlab-ui/commit/6400e0eeb084619587de69ab54bc85bd4717c0d8))
* **Checkbox:** Fix high contrast mode ([bf36b8d](https://gitlab.com/gitlab-org/gitlab-ui/commit/bf36b8d63eb2e1ca8bec09e96de355053cf3e425))
* **Checkbox:** Reset background ([93ad593](https://gitlab.com/gitlab-org/gitlab-ui/commit/93ad593955f2551bbf7ff5c6d7a7ed399849ed7b))

## [65.1.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v65.1.2...v65.1.3) (2023-08-15)


### Bug Fixes

* **GlDisclosureDropdown:** Removes the group role from disclosure groups ([c79c93f](https://gitlab.com/gitlab-org/gitlab-ui/commit/c79c93f75a88b2051ea4bfdfa21251c4a311ba70))
* **GlProgress:** remove double-passing of props ([3ec1277](https://gitlab.com/gitlab-org/gitlab-ui/commit/3ec1277e2a5ef2d8c391686f280fe018ce71fb17))

## [65.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v65.1.1...v65.1.2) (2023-08-11)


### Bug Fixes

* **GlDisclosureDropdown:** sets alignment to fix right placement ([02c966a](https://gitlab.com/gitlab-org/gitlab-ui/commit/02c966aa2d990a514134e376f33ee47864f6cc76)), closes [#L69-L70](https://gitlab.com/gitlab-org/gitlab-ui/issues/L69-L70)

## [65.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v65.1.0...v65.1.1) (2023-08-10)


### Bug Fixes

* **GlCollpasibleListbox:** correctly handle Home and End ([596127d](https://gitlab.com/gitlab-org/gitlab-ui/commit/596127d79c05f190746109ec9776ee7460672237))

# [65.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v65.0.1...v65.1.0) (2023-08-09)


### Features

* **GlFormFields:** Add validator for emojis ([7f5b9aa](https://gitlab.com/gitlab-org/gitlab-ui/commit/7f5b9aa195b3a62a83b5b395aec2e49d08b87bcb))

## [65.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v65.0.0...v65.0.1) (2023-08-05)


### Bug Fixes

* **button:** correctly detect empty slot for icon only ([bbbc03e](https://gitlab.com/gitlab-org/gitlab-ui/commit/bbbc03ef43139bf023573706894cd9ba60cfce0a))

# [65.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.24.1...v65.0.0) (2023-08-01)


### chore

* move dompurify to peer & dev dependency ([f87d3e6](https://gitlab.com/gitlab-org/gitlab-ui/commit/f87d3e6924e9f7e81affc38b913c87a1ec45a59f))


### BREAKING CHANGES

* please upgrade to latest dompurify release

## [64.24.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.24.0...v64.24.1) (2023-07-31)


### Bug Fixes

* **GlCarousel:** Change focus border size ([36afd9c](https://gitlab.com/gitlab-org/gitlab-ui/commit/36afd9c4c1ee78d7d3d9ee9ba82dad4e5e9085a2))

# [64.24.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.23.0...v64.24.0) (2023-07-28)


### Features

* **tabs:** Remove theme color ([8fadce7](https://gitlab.com/gitlab-org/gitlab-ui/commit/8fadce789cb6a9ec0b8b30eb20f5b11dfa45e41a))

# [64.23.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.22.0...v64.23.0) (2023-07-25)


### Features

* **GlFormField:** Allow form field groups to receive attributes ([de5fafc](https://gitlab.com/gitlab-org/gitlab-ui/commit/de5fafc70ef52ec993cec434934c1a84bb64167a))

# [64.22.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.21.2...v64.22.0) (2023-07-20)


### Features

* **GlInputGroupText:** add default styling for GlInputGroupText ([5efbd12](https://gitlab.com/gitlab-org/gitlab-ui/commit/5efbd12693e1a4b8a7eac51e322ffb7334e5d4ba))

## [64.21.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.21.1...v64.21.2) (2023-07-19)


### Bug Fixes

* **GlEmoji:** Fix alignment of icon in button ([cccb2ae](https://gitlab.com/gitlab-org/gitlab-ui/commit/cccb2aec5cb45663a777cad034ce59cc98be602a))

## [64.21.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.21.0...v64.21.1) (2023-07-18)


### Bug Fixes

* **GlFormInput:** set height of form input ([7c3870a](https://gitlab.com/gitlab-org/gitlab-ui/commit/7c3870a30338d91d08a219046671ff293929e76f))

# [64.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.20.1...v64.21.0) (2023-07-14)


### Bug Fixes

* **GlToggle:** Enable flex-grow-1 to ensure backwards compatibility ([dfd6554](https://gitlab.com/gitlab-org/gitlab-ui/commit/dfd655420bd8aef33a3af0d5ea3144ac59934ee0))
* **GlToggle:** Remove vertical padding if label is sr-only ([697a597](https://gitlab.com/gitlab-org/gitlab-ui/commit/697a5979ceae6f6e46c877c8baea58051741f732))
* **GlToggle:** Wrap long texts when using block-layout for toggle ([a487517](https://gitlab.com/gitlab-org/gitlab-ui/commit/a4875170a207018b605833b022d6fce6ca3803e4))


### Features

* **GlToggle:** Add a block level toggle ([0b73ddb](https://gitlab.com/gitlab-org/gitlab-ui/commit/0b73ddb0acfdad3d81501cb360e857de4089247e))

## [64.20.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.20.0...v64.20.1) (2023-07-13)


### Bug Fixes

* **listbox:** Sets the border-radius to 0 ([d120e09](https://gitlab.com/gitlab-org/gitlab-ui/commit/d120e09dfa033a6bd404f6afde215f98fce86404))

# [64.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.19.0...v64.20.0) (2023-07-13)


### Features

* Add border-purple-300 to mixins ([f8251d0](https://gitlab.com/gitlab-org/gitlab-ui/commit/f8251d0bef776da6f0970fc0c3641d7e6360bc01))

# [64.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.18.3...v64.19.0) (2023-07-11)


### Features

* **GlFilteredSearchToken:** Expose applySuggestion via scoped slot ([91333fd](https://gitlab.com/gitlab-org/gitlab-ui/commit/91333fd72a99fa2ccbe9be79df008c4c90dc4f4b))

## [64.18.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.18.2...v64.18.3) (2023-07-06)


### Bug Fixes

* **listbox:** Fix reset button on single select ([8684a7c](https://gitlab.com/gitlab-org/gitlab-ui/commit/8684a7c778ed4517f67ca6191b0a3634f45ca70f))

## [64.18.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.18.1...v64.18.2) (2023-07-05)


### Bug Fixes

* revert block level toggle ([78179da](https://gitlab.com/gitlab-org/gitlab-ui/commit/78179dac12a70fa76180facc88c4426c999d95b3))

## [64.18.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.18.0...v64.18.1) (2023-07-04)


### Bug Fixes

* **listbox:** Allow use of reset button on single select ([cff7777](https://gitlab.com/gitlab-org/gitlab-ui/commit/cff7777e5eff36de54d4f628f818fc44284d1de1))

# [64.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.17.0...v64.18.0) (2023-07-04)


### Features

* Add border-gray-10 to mixins ([a02780c](https://gitlab.com/gitlab-org/gitlab-ui/commit/a02780c969c40aa82c8a29517a2df776c40e6e17))

# [64.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.16.0...v64.17.0) (2023-06-30)


### Features

* **Tokens:** add initial color design tokens ([c4f43f5](https://gitlab.com/gitlab-org/gitlab-ui/commit/c4f43f55e7c548233a9d6622115f525187b98601))

# [64.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.15.0...v64.16.0) (2023-06-29)


### Bug Fixes

* **GlCollapsibleListbox:** reverse clear all logic ([badfcad](https://gitlab.com/gitlab-org/gitlab-ui/commit/badfcadf9def43b640ea3b89faa71c1cd2b61b11))


### Features

* **LoadingIcon:** Add a dots loading variant ([0567bce](https://gitlab.com/gitlab-org/gitlab-ui/commit/0567bcec7800f9b3c67b76ace7f0177af164fa86))

# [64.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.14.0...v64.15.0) (2023-06-29)


### Features

* **GlBanner:** add button attributes to banner ([932dc36](https://gitlab.com/gitlab-org/gitlab-ui/commit/932dc36bd97441ab208ff4691c15526caf133d8f))

# [64.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.13.4...v64.14.0) (2023-06-28)


### Features

* **GlToggle:** Add a block level toggle ([41af6fd](https://gitlab.com/gitlab-org/gitlab-ui/commit/41af6fdb48f5a6f7ee2762405e91244981c216fd))

## [64.13.4](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.13.3...v64.13.4) (2023-06-28)


### Bug Fixes

* **dropdowns:** loosen up auto-placement settings ([3c1366a](https://gitlab.com/gitlab-org/gitlab-ui/commit/3c1366af5c9e70f4e3b0828c5b0933820e379dd1))

## [64.13.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.13.2...v64.13.3) (2023-06-22)


### Bug Fixes

* **GlListbox:** Dark scrim in dark mode ([2672dbb](https://gitlab.com/gitlab-org/gitlab-ui/commit/2672dbb03dec67cf5da218c22732f2cc30c56328))

## [64.13.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.13.1...v64.13.2) (2023-06-22)


### Bug Fixes

* **dropdowns:** replace flip middleware with autoPlacement ([23b44e8](https://gitlab.com/gitlab-org/gitlab-ui/commit/23b44e8a0c96aaa2a462e28d2f2f9cb2ab855431))

## [64.13.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.13.0...v64.13.1) (2023-06-21)


### Bug Fixes

* **css:** Allow overriding gray-a variables ([04cc50e](https://gitlab.com/gitlab-org/gitlab-ui/commit/04cc50e4cb742f42029ea2ad7882d05991afc74d))

# [64.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.12.0...v64.13.0) (2023-06-19)


### Features

* **GlKeysetPagination:** hides component when hasPreviousPage & hasNextPage is falsy ([93dbdfc](https://gitlab.com/gitlab-org/gitlab-ui/commit/93dbdfc3f94cfdd407e17316c3c329d1180786a0))

# [64.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.11.1...v64.12.0) (2023-06-19)


### Bug Fixes

* **GlTooltip:** Reduce component boundary padding ([dcefc8c](https://gitlab.com/gitlab-org/gitlab-ui/commit/dcefc8c3a16299b98d45269e675dfc4dd3f6b825))


### Features

* add min-weight options ([8635a9c](https://gitlab.com/gitlab-org/gitlab-ui/commit/8635a9c78690dea3f177adf9df31b4de7bdb41a7))

## [64.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.11.0...v64.11.1) (2023-06-19)


### Bug Fixes

* **GlCollapsibleListbox:** revert to previous clear all logic ([a9ef6d6](https://gitlab.com/gitlab-org/gitlab-ui/commit/a9ef6d6ce69b470be3d2f0c1471d164e0eea24bd))

# [64.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.10.2...v64.11.0) (2023-06-16)


### Features

* **Typography:** add text size scale variables ([355c159](https://gitlab.com/gitlab-org/gitlab-ui/commit/355c159d5d1753273a65d6ff98c598c7d6b130c3))

## [64.10.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.10.1...v64.10.2) (2023-06-16)


### Bug Fixes

* **GlCollapsibleListbox:** reverse clear all logic ([270777b](https://gitlab.com/gitlab-org/gitlab-ui/commit/270777bd74cfa2e76eff594ec1612ea408b4372f))

## [64.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.10.0...v64.10.1) (2023-06-14)


### Bug Fixes

* **GlCollapsibleListbox:** listbox stays open ([a83355d](https://gitlab.com/gitlab-org/gitlab-ui/commit/a83355d527c483ca6bd6587da64f565ef118b8da))

# [64.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.9.0...v64.10.0) (2023-06-14)


### Features

* **DisclosureDropdown:** borderPosition property ([ea7822e](https://gitlab.com/gitlab-org/gitlab-ui/commit/ea7822e20992c6a0fc074f8ab3766b3145c09c00))
* **GlKeysetPagination:** add navigation landmark ([3ffd2f7](https://gitlab.com/gitlab-org/gitlab-ui/commit/3ffd2f79b3029504a6e1b831df23904ca8473d06))

# [64.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.8.0...v64.9.0) (2023-06-14)


### Features

* **css:** Added gl-md-justify-content-end mixin ([4fa88fa](https://gitlab.com/gitlab-org/gitlab-ui/commit/4fa88fac40b2bc34eca9058a406b1d649bb67ba4))

# [64.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.7.0...v64.8.0) (2023-06-13)


### Features

* Prefer GitLab Mono over JetBrains Mono ([eb3354b](https://gitlab.com/gitlab-org/gitlab-ui/commit/eb3354b648a7b1563f3446a7fd7a176ebc0c4cfc))

# [64.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.6.2...v64.7.0) (2023-06-13)


### Features

* **Type:** add line-height and letter-spacing mixins for headings ([ae1fef5](https://gitlab.com/gitlab-org/gitlab-ui/commit/ae1fef5d70c78f869b56297cd36e9861e123507a))

## [64.6.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.6.1...v64.6.2) (2023-06-13)


### Bug Fixes

* **dropdowns:** fix ResizeObserver loop error ([a4797a5](https://gitlab.com/gitlab-org/gitlab-ui/commit/a4797a5624505d6d4aa2d539fd589bbd2b610aee))

## [64.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.6.0...v64.6.1) (2023-06-08)


### Bug Fixes

* **GlChart:** ResizeObserver loop limit exceeded on responsive charts ([7952ae8](https://gitlab.com/gitlab-org/gitlab-ui/commit/7952ae86a22e200ff2bc4f9f8cf172de8e30b6f2))

# [64.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.5.0...v64.6.0) (2023-06-08)


### Features

* **GlDisclosureDropdown:** add `block` prop ([39f3a3d](https://gitlab.com/gitlab-org/gitlab-ui/commit/39f3a3db2892fe10bcc91819727ef2da59bcdd45))

# [64.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.4.0...v64.5.0) (2023-06-07)


### Features

* **css:** Use gl-shadow-lg for drawer drop shadow ([d57f305](https://gitlab.com/gitlab-org/gitlab-ui/commit/d57f3052889e8c66de24de73f63351abf79d5423))

# [64.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.3.0...v64.4.0) (2023-06-06)


### Features

* **GlAvatarLabeled:** Display label as row ([44b4dd2](https://gitlab.com/gitlab-org/gitlab-ui/commit/44b4dd2e9da672102973fe0d56b48332a1483a3f))

# [64.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.2.3...v64.3.0) (2023-06-06)


### Features

* **css:** Added gl-lg-align-items-flex-start mixin ([adf826f](https://gitlab.com/gitlab-org/gitlab-ui/commit/adf826f7ee11fbfdbc2434daa950906e6003c903))

## [64.2.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.2.2...v64.2.3) (2023-06-05)


### Bug Fixes

* **GlFilteredSearch:** Makes clickable area full width ([832a798](https://gitlab.com/gitlab-org/gitlab-ui/commit/832a79881dab6eb55b7ea4a7f8156645958a29b8))

## [64.2.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.2.1...v64.2.2) (2023-06-02)


### Bug Fixes

* **sass:** revert migration from `/` operator to `calc()` ([5b5fc0b](https://gitlab.com/gitlab-org/gitlab-ui/commit/5b5fc0beaa7f90fdbe4c1b4bd4d583cf2de9b2be))

## [64.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.2.0...v64.2.1) (2023-06-02)


### Bug Fixes

* **GlStackedColumnChart:** Replace the getDom to getZr for supporting edge ([8412f24](https://gitlab.com/gitlab-org/gitlab-ui/commit/8412f2456c56ea58c68ef8f78ff753ec4701388d))

# [64.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.1.1...v64.2.0) (2023-06-02)


### Features

* **GlFilteredSearchToken:** Pass input attributes to data segment ([e8dcc5f](https://gitlab.com/gitlab-org/gitlab-ui/commit/e8dcc5f8fb8ff4b6fa78f1e46b899a18990d39c8))

## [64.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.1.0...v64.1.1) (2023-06-01)


### Bug Fixes

* **dropdowns:** auto-focus only once dropdown is properly positioned ([fe6c39d](https://gitlab.com/gitlab-org/gitlab-ui/commit/fe6c39dee065cbbc35dd225ea0e565dba368af14))

# [64.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.0.2...v64.1.0) (2023-05-30)


### Features

* **dropdowns:** adds support for fixed positioning strategy ([ac2287a](https://gitlab.com/gitlab-org/gitlab-ui/commit/ac2287a35a88795f2987ba63c2c15e35def50087))

## [64.0.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.0.1...v64.0.2) (2023-05-30)


### Bug Fixes

* **GlFilteredSearch:** Restore previous scroll behavior ([2c1b0e2](https://gitlab.com/gitlab-org/gitlab-ui/commit/2c1b0e26b3ed74df25377ba0f8b297852c008929))

## [64.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v64.0.0...v64.0.1) (2023-05-30)


### Bug Fixes

* **GlBarChart:** Replace the getDom to getZr for supporting edge ([5b43cda](https://gitlab.com/gitlab-org/gitlab-ui/commit/5b43cdaafc21287c5efb92482076fa3bbf9aa975))
* **GlFilteredSearch:** Prevent filtered search token overflow ([3fb3f6c](https://gitlab.com/gitlab-org/gitlab-ui/commit/3fb3f6c621dfd0a70d7d780719c7a1744b748ea0))

# [64.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v63.4.0...v64.0.0) (2023-05-30)


### Features

* **dropdowns:** avoid overflowing the viewport on the vertical axis ([21cd402](https://gitlab.com/gitlab-org/gitlab-ui/commit/21cd402f9598556de4d9fa68b8fe996fc9d554f2))
* **dropdowns:** migrate to Floating UI ([69b6192](https://gitlab.com/gitlab-org/gitlab-ui/commit/69b619274ea8a4bf70b23d60961d09dbd80f6e79))


### BREAKING CHANGES

* **dropdowns:** While Floating UI is similar to Popper.js, its API
changed slightly. It might be worth reading the migration guide over at
https://floating-ui.com/docs/migration.

`GlDisclosureDropdown` and `GlListbox` previously exposed a way to
customize Popper.js' config through the `popperOptions` prop. This has
been deprecated in favor of a `dropdownOffset` prop which accepts the
same values as Floating UI's `offset` middleware.
https://floating-ui.com/docs/offset

# [63.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v63.3.0...v63.4.0) (2023-05-25)


### Features

* Add more row and column gaps ([39ddece](https://gitlab.com/gitlab-org/gitlab-ui/commit/39ddecedd6feb9157d3006dce7cf9a6c5f0a6fe7))

# [63.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v63.2.1...v63.3.0) (2023-05-24)


### Features

* **GlCollapsibleListbox:** Add select all button in header ([eb74768](https://gitlab.com/gitlab-org/gitlab-ui/commit/eb74768163939bdb1b08a168d58e800b440705c2))

## [63.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v63.2.0...v63.2.1) (2023-05-23)


### Bug Fixes

* **GlAreaChart:** Replace the getDom to getZr for supporting edge ([2a5bef8](https://gitlab.com/gitlab-org/gitlab-ui/commit/2a5bef897dcd54422cb1163e497461558a8f06ac))

# [63.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v63.1.3...v63.2.0) (2023-05-23)


### Features

* Add TruncateText component ([5539662](https://gitlab.com/gitlab-org/gitlab-ui/commit/553966208df8fc23736080619b68f73a56e41a48))

## [63.1.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v63.1.2...v63.1.3) (2023-05-22)


### Bug Fixes

* **GlFilteredSearch:** Prevent height change from scrollbar ([2f02df7](https://gitlab.com/gitlab-org/gitlab-ui/commit/2f02df7531c89d4eb533b077985469ca4d013490))

## [63.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v63.1.1...v63.1.2) (2023-05-22)


### Bug Fixes

* **BroadcastMessage:** dark border in dark mode ([c4db519](https://gitlab.com/gitlab-org/gitlab-ui/commit/c4db5192c31ac982df99f124788689eaa25a522a))

## [63.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v63.1.0...v63.1.1) (2023-05-22)


### Bug Fixes

* **CSS:** update categorical data palette to be Pajamas compliant ([31e0bb9](https://gitlab.com/gitlab-org/gitlab-ui/commit/31e0bb9f604777e9dc30dfa5648f47a187bc37ce))

# [63.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v63.0.0...v63.1.0) (2023-05-18)


### Features

* **GlCollapsibleListbox:** Add overflow scrim ([55ef395](https://gitlab.com/gitlab-org/gitlab-ui/commit/55ef395c7f0c6960cee9b51bc436a0c3b339d2cc))

# [63.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.12.1...v63.0.0) (2023-05-17)


### Bug Fixes

* remove desktop-first CSS utils ([34f70fc](https://gitlab.com/gitlab-org/gitlab-ui/commit/34f70fc71dedde3405f07392f51ab9157f079567))


### BREAKING CHANGES

* This removes a few desktop-first CSS utils. If you were
relying on the following utils, make sure you migrate to mobile-first
alternatives:

* `gl-xs-display-none`
* `gl-xs-mb-4`
* `gl-sm-pr-3`
* `gl-sm-pr-5`
* `gl-sm-pl-5`

## [62.12.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.12.0...v62.12.1) (2023-05-17)


### Bug Fixes

* **GlFilteredSearch:** Adjust left padding ([1c2804d](https://gitlab.com/gitlab-org/gitlab-ui/commit/1c2804d522d98ea0da85ca04b77510c208df7cd5))
* **GlFilteredSearch:** Fix clear button overlapping long text & input ([eb689b4](https://gitlab.com/gitlab-org/gitlab-ui/commit/eb689b47f924bbcee08ec4febd0cf034d375223e))
* **GlFilteredSearch:** Fix clear button overlapping long text & input ([472fa67](https://gitlab.com/gitlab-org/gitlab-ui/commit/472fa674d12eb342d72cc20ad196c8d94f40129f))

# [62.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.11.0...v62.12.0) (2023-05-15)


### Features

* **GlCollapsibleListbox:** allow groups with no text ([01e709d](https://gitlab.com/gitlab-org/gitlab-ui/commit/01e709d807f49286412939f3ad0c6c75b2ebb40c))

# [62.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.10.0...v62.11.0) (2023-05-12)


### Features

* **GlDisclosureDropdown:** Close the disclosure dropdown on item click ([f4c2208](https://gitlab.com/gitlab-org/gitlab-ui/commit/f4c2208af8f11b5aa96faa6bdb88898f67b4edcc))

# [62.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.9.3...v62.10.0) (2023-05-11)


### Features

* **GlChartLegend:** Prevent toggling off all legends ([b036385](https://gitlab.com/gitlab-org/gitlab-ui/commit/b036385448b95003368a22e1533304d6b8097050))
* add hover state to gl-cursor-notallowed mixin ([4a122c2](https://gitlab.com/gitlab-org/gitlab-ui/commit/4a122c2be93d4e5da505d3390ccea116353524f1))

## [62.9.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.9.2...v62.9.3) (2023-05-11)


### Bug Fixes

* **dropdown:** Use $scopedSlots instead of $slots ([4ad73f5](https://gitlab.com/gitlab-org/gitlab-ui/commit/4ad73f58197d3e65fedd10464592cfc3fd7984ce))

## [62.9.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.9.1...v62.9.2) (2023-05-10)


### Bug Fixes

* Correct size for no-caret small listbox ([56799cc](https://gitlab.com/gitlab-org/gitlab-ui/commit/56799ccba992807626b3f230bf8d0545bd750382))

## [62.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.9.0...v62.9.1) (2023-05-08)


### Bug Fixes

* make parameters for listbox configurable ([5dcd29b](https://gitlab.com/gitlab-org/gitlab-ui/commit/5dcd29b69a49a063ce4fbe0f1b63f8acd3e63469))

# [62.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.8.0...v62.9.0) (2023-05-05)


### Features

* **GlBroadcastMessage:** Add hardcoded sr-only heading ([9cae3b1](https://gitlab.com/gitlab-org/gitlab-ui/commit/9cae3b19a54068197809cd28010fec85f93ed945))

# [62.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.7.0...v62.8.0) (2023-05-03)


### Features

* Add transition duration fast class ([81ea2d9](https://gitlab.com/gitlab-org/gitlab-ui/commit/81ea2d9fdd521dc5a959705e46554d0aa2959d32))

# [62.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.6.0...v62.7.0) (2023-05-03)


### Features

* Add row-gap utility class ([9b913ff](https://gitlab.com/gitlab-org/gitlab-ui/commit/9b913ff56590d0c077fdb886c4696309fa165236))

# [62.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.5.2...v62.6.0) (2023-05-02)


### Features

* Add gl-form-fields component ([a17bcb6](https://gitlab.com/gitlab-org/gitlab-ui/commit/a17bcb6c8db0444dcd7f5bd799fe681891dbdcc9))

## [62.5.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.5.1...v62.5.2) (2023-05-01)


### Bug Fixes

* **GlToggle:** set aria-disabled attribute ([a899eb7](https://gitlab.com/gitlab-org/gitlab-ui/commit/a899eb7acd23d089ddb43c3bcd66a0aae7fe3c6f))

## [62.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.5.0...v62.5.1) (2023-04-28)


### Bug Fixes

* **utils:** Change color util to use relative luminance ([6245128](https://gitlab.com/gitlab-org/gitlab-ui/commit/6245128c7256e3d8db164b92e9580c79d47e9183))

# [62.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.4.0...v62.5.0) (2023-04-25)


### Features

* **GlAvatarLabeled:** link avatar to avatar label link ([35bf39d](https://gitlab.com/gitlab-org/gitlab-ui/commit/35bf39d3baec4f3d84b4fa2c0bc8148f37194a3c))

# [62.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.3.0...v62.4.0) (2023-04-24)


### Features

* add utility class for min-height 100vh ([425f747](https://gitlab.com/gitlab-org/gitlab-ui/commit/425f747a88beb7b039d9eb43c0d5c36e3819176a))

# [62.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.2.0...v62.3.0) (2023-04-21)


### Features

* **dropdowns:** make the fluid width an opt-in option ([d507eff](https://gitlab.com/gitlab-org/gitlab-ui/commit/d507effdd12861e2919f58a01d338b5a96c71d36))

# [62.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.1.0...v62.2.0) (2023-04-21)


### Features

* **flex-wrap:** add gl-md-flex-nowrap ([6345e45](https://gitlab.com/gitlab-org/gitlab-ui/commit/6345e45f7d29ca57c33af259218593f4541d3dc4)), closes [/gitlab.com/gitlab-org/gitlab/-/blob/1bcaa1506f1372615bb64351a30a90d2e3f0b0b7/app/assets/stylesheets/pages/settings.scss#L79](https://gitlab.com//gitlab.com/gitlab-org/gitlab/-/blob/1bcaa1506f1372615bb64351a30a90d2e3f0b0b7/app/assets/stylesheets/pages/settings.scss/issues/L79)

# [62.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v62.0.0...v62.1.0) (2023-04-20)


### Features

* **GlAvatar:** Add image load error fallback support ([9960d86](https://gitlab.com/gitlab-org/gitlab-ui/commit/9960d86ccda15d7afe08528cba1892fbfd7cca25))

# [62.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v61.3.0...v62.0.0) (2023-04-19)


### Code Refactoring

* remove gl-*flex-wrap-wrap classes ([fc405cc](https://gitlab.com/gitlab-org/gitlab-ui/commit/fc405cc59dc743209c0ea00a583b31cb77fc1218))


### BREAKING CHANGES

* remove deprecated `gl-[breakpoint?]-flex-wrap-wrap`,
`gl-[breakpoint?]-flex-wrap-nowrap`, and
`gl-[breakpoint?]-flex-wrap-wrap-reverse` classes.

Instead, use these classes: `gl-[breakpoint?]-flex-wrap`,
`gl-[breakpoint?]-flex-nowrap`, and
`gl-[breakpoint?]-flex-wrap-reverse`.

# [61.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v61.2.0...v61.3.0) (2023-04-19)


### Features

* **GlFilteredSearch:** Terms as tokens ([7149a54](https://gitlab.com/gitlab-org/gitlab-ui/commit/7149a541f4dc29d7f364ee1ab02a1c88be3824ed))

# [61.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v61.1.3...v61.2.0) (2023-04-18)


### Features

* adds bottom large rounded classes ([b0b5bd5](https://gitlab.com/gitlab-org/gitlab-ui/commit/b0b5bd53c1fc6a15e049e343a652c5d4aceb278c))

## [61.1.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v61.1.2...v61.1.3) (2023-04-18)


### Bug Fixes

* **GlDisclosureDropdown:** Set unique key id for items ([e3f90f4](https://gitlab.com/gitlab-org/gitlab-ui/commit/e3f90f4fc05e2c3fdc4119177816307948700f74))

## [61.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v61.1.1...v61.1.2) (2023-04-18)


### Bug Fixes

* **GlSparklineChart:** Hide tooltip for blank data in the series ([54ea2c7](https://gitlab.com/gitlab-org/gitlab-ui/commit/54ea2c7adb64527b2ee7e23dd9783b77df283bad))

## [61.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v61.1.0...v61.1.1) (2023-04-13)


### Bug Fixes

* **GlAvatar:** Fix width of 404ing avatar images ([94d8413](https://gitlab.com/gitlab-org/gitlab-ui/commit/94d84137771a452c45d753082308d44fbfffae16))

# [61.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v61.0.0...v61.1.0) (2023-04-13)


### Features

* **Banner:** Use CloseButton ([f4ddd66](https://gitlab.com/gitlab-org/gitlab-ui/commit/f4ddd66771f46607ff657f2bf4bc268f666c51ec))
* **Banner:** Use CloseButton ([d173aed](https://gitlab.com/gitlab-org/gitlab-ui/commit/d173aed03b4400196aa9711e118b57047e707a14))

# [61.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v60.2.0...v61.0.0) (2023-04-12)


### Bug Fixes

* **GlFilteredSearch:** Don't prevent tabbing past component ([27cdbf3](https://gitlab.com/gitlab-org/gitlab-ui/commit/27cdbf3d67cebebc9b6a2177d3ed664ac44ddee7))


### Features

* **GlFilteredSearch:** Improve option interactions ([d2ada9d](https://gitlab.com/gitlab-org/gitlab-ui/commit/d2ada9d7c179d255e4845e7b237740d1471166b4))


### BREAKING CHANGES

* **GlFilteredSearch:** `GlFilteredSearch`/`GlFilteredSearchTerm`'s `title`
slot and `GlFilteredSearchToken`'s `title-option` slot have been
removed. Similar functionality is available by setting the
`optionComponent` property on the given token object passed to
`GlFilteredSearch`'s `available-tokens` prop. The component will be
given an `option` prop, which will be the option object representing the
token.

# [60.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v60.1.0...v60.2.0) (2023-04-12)


### Features

* **BroadcastMessage:** Remove alert role ([1652e81](https://gitlab.com/gitlab-org/gitlab-ui/commit/1652e81f50c600226d8b1a82d1a3fe9dc79f3d5e))

# [60.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v60.0.0...v60.1.0) (2023-04-11)


### Features

* **Banner:** Remove redundant role ([304b8d1](https://gitlab.com/gitlab-org/gitlab-ui/commit/304b8d1323afafe950b4f2c2a5c187df3ff432db))
* **dropdowns:** allow custom Popper.js options ([ec95a9c](https://gitlab.com/gitlab-org/gitlab-ui/commit/ec95a9cff513763f7560bcf7a7d6f22399ca0a6c))
* **dropdowns:** make content width more flexible ([55712fa](https://gitlab.com/gitlab-org/gitlab-ui/commit/55712fac6095b185ea2b175b1e6c462deb2a449f))

# [60.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v59.5.0...v60.0.0) (2023-04-06)


### Features

* **Breadcrumb:** Add opt in multiple avatars ([67f1e3e](https://gitlab.com/gitlab-org/gitlab-ui/commit/67f1e3eac7899568052730d0135cb471e2d0e474))


### BREAKING CHANGES

* **Breadcrumb:** Deprecated avatar slot
Added avatar option in items prop

chore(breadcrumbs)

fix css rules on avatar

chore(breadcrumbs)

fix story template

Add review suggestions

# [59.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v59.4.0...v59.5.0) (2023-04-06)


### Features

* add gl-sm-flex-nowrap, gl-flex-wrap-reverse ([7acd006](https://gitlab.com/gitlab-org/gitlab-ui/commit/7acd006d285bfe7eb51f9bcb1edc81b20b934b8a))

# [59.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v59.3.2...v59.4.0) (2023-04-05)


### Features

* **GlAreaChart:** add legend-series-info prop ([6e855cc](https://gitlab.com/gitlab-org/gitlab-ui/commit/6e855cc1260c00a4a5821003b2dd0ec8d082d7bd))

## [59.3.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v59.3.1...v59.3.2) (2023-04-05)


### Bug Fixes

* **GlSkeletonLoader:** Disable animation for reduced motion ([a70e810](https://gitlab.com/gitlab-org/gitlab-ui/commit/a70e8104361a4f51f36076d4466989df2de53f94))

## [59.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v59.3.0...v59.3.1) (2023-04-05)


### Bug Fixes

* **base_dropdown:** conditional chaining to destroy popper ([05cf79e](https://gitlab.com/gitlab-org/gitlab-ui/commit/05cf79e0fdaf55d9403fcdaba062d416294b3815))

# [59.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v59.2.0...v59.3.0) (2023-04-04)


### Features

* **css:** added missing width utility mixins ([2b545cb](https://gitlab.com/gitlab-org/gitlab-ui/commit/2b545cb9bdae51ef8bab7dc16ce4f56dea116e6a))

# [59.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v59.1.1...v59.2.0) (2023-03-31)


### Bug Fixes

* **GlFilteredSearch:** Avoid rare scroll method error ([6001fb4](https://gitlab.com/gitlab-org/gitlab-ui/commit/6001fb48f338486823a427345f0969783eb477d4))
* **GlFilteredSearch:** Improve activeTokenIdx check in isLastToken ([f5114c0](https://gitlab.com/gitlab-org/gitlab-ui/commit/f5114c07863d149ea8f1f49ed0da70734c9126ac))
* **GlFilteredSearch:** Improve handling of some falsey values ([8dd22f7](https://gitlab.com/gitlab-org/gitlab-ui/commit/8dd22f7e1941e9820a2db9ba50e87cf9b81540e9)), closes [/gitlab.com/gitlab-org/gitlab/-/blob/2dcb4f37a26ffff6b2cebc6b1f55f1294b1b545d/ee/app/assets/javascripts/roadmap/mixins/filtered_search_mixin.js#L179-180](https://gitlab.com//gitlab.com/gitlab-org/gitlab/-/blob/2dcb4f37a26ffff6b2cebc6b1f55f1294b1b545d/ee/app/assets/javascripts/roadmap/mixins/filtered_search_mixin.js/issues/L179-180)
* **GlFilteredSearch:** Improve keyboard accessibility ([0798e43](https://gitlab.com/gitlab-org/gitlab-ui/commit/0798e433c7ac8c22300c579613b9f3aa5bc4b929))
* **GlFilteredSearch:** Remove conditional class ([6854cb9](https://gitlab.com/gitlab-org/gitlab-ui/commit/6854cb993b7534b6d37c4b85a1bc020870ce9d04))


### Features

* **buttons:** tertiary button selected state ([6654ebb](https://gitlab.com/gitlab-org/gitlab-ui/commit/6654ebbff06a1f8d479bdb5885f816a54d5f2c5e))

## [59.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v59.1.0...v59.1.1) (2023-03-31)


### Bug Fixes

* **Checkbox:** fix touch target when there is help text ([a8d2578](https://gitlab.com/gitlab-org/gitlab-ui/commit/a8d257810ac010c2dea563fbe15a69cdd7026f55))

# [59.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v59.0.0...v59.1.0) (2023-03-30)


### Features

* **css:** add gl-focus-bg-t-gray-a-08 class ([f4664ef](https://gitlab.com/gitlab-org/gitlab-ui/commit/f4664ef79b50c06b7b37daa8add1502475985875))

# [59.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.8.0...v59.0.0) (2023-03-30)


### Features

* **Breadcrumb:** Update design to match specs ([cfa9122](https://gitlab.com/gitlab-org/gitlab-ui/commit/cfa91223f072b647892f776312cca8f75b510d11))


### BREAKING CHANGES

* **Breadcrumb:** Update styles and remove unnecessary ones,
remove separator slot, update placeholder avatar

# [58.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.7.0...v58.8.0) (2023-03-29)


### Features

* **GlFormCheckbox:** Make gap clickable ([a4c9be3](https://gitlab.com/gitlab-org/gitlab-ui/commit/a4c9be358dd5d48d5777d397f156dc62d476bb12))

# [58.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.6.0...v58.7.0) (2023-03-28)


### Features

* **css:** Add .gl-gap-4 class ([967986c](https://gitlab.com/gitlab-org/gitlab-ui/commit/967986cace6b2d01dd5a09fd91f2e45b4909895f))

# [58.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.5.1...v58.6.0) (2023-03-28)


### Features

* **css:** add 2 CSS utils ([9f210bb](https://gitlab.com/gitlab-org/gitlab-ui/commit/9f210bba0ee65403ee2b66afbff3b69820a0e044))

## [58.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.5.0...v58.5.1) (2023-03-27)


### Bug Fixes

* **css:** rename gl-text-uppercase util ([59cbf4e](https://gitlab.com/gitlab-org/gitlab-ui/commit/59cbf4e9b11935d65a0b46943cb031a390fd37ad))

# [58.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.4.0...v58.5.0) (2023-03-27)


### Features

* **GlDisclosureDropdown:** Add disabled state ([8d3de9e](https://gitlab.com/gitlab-org/gitlab-ui/commit/8d3de9ee5216b6fd3e2f3430272d9e6ed8ff70bf))

# [58.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.3.0...v58.4.0) (2023-03-23)


### Features

* **css:** migrate CSS utils from GitLab ([c2b8982](https://gitlab.com/gitlab-org/gitlab-ui/commit/c2b8982f0d8ca06c5c17ca028b7607615d318c84))

# [58.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.2.1...v58.3.0) (2023-03-22)


### Features

* **GlCollapsibleListbox:** Add non-selected toggle styles ([cb60321](https://gitlab.com/gitlab-org/gitlab-ui/commit/cb60321570be25441211410c0a3a42bafd836a80))

## [58.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.2.0...v58.2.1) (2023-03-21)


### Bug Fixes

* **GlDisclosureDropdown:** Keep focus on toggle on open ([8dd3172](https://gitlab.com/gitlab-org/gitlab-ui/commit/8dd3172aaf304bad3b7a606dc6732af6a7390acf))

# [58.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.1.0...v58.2.0) (2023-03-17)


### Features

* **GlDisclosureDropdown:** Update btn group style ([503f65c](https://gitlab.com/gitlab-org/gitlab-ui/commit/503f65c21692d3a770f766505d2c567afabc8744))

# [58.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v58.0.0...v58.1.0) (2023-03-16)


### Features

* **GlFilteredSearch:** added title slot to GlFilteredSearch ([88d82d7](https://gitlab.com/gitlab-org/gitlab-ui/commit/88d82d77c5e93a180b97b1cd702af80452863ff2))

# [58.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v57.0.0...v58.0.0) (2023-03-15)


### Features

* **GlCollapsibleListbox:** Remove deprecated GlListbox export ([baaade2](https://gitlab.com/gitlab-org/gitlab-ui/commit/baaade289126b05e47b015644448d7cbb0e98a21))


### BREAKING CHANGES

* **GlCollapsibleListbox:** The deprecated GlListbox alias for GlCollapsibleListbox
has been removed.

# [57.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v56.4.1...v57.0.0) (2023-03-15)


### Bug Fixes

* **css:** convert gl-sm-pl-0 util to mobile-first ([7d0d4e9](https://gitlab.com/gitlab-org/gitlab-ui/commit/7d0d4e90a8720dcd150f73c8e01caf3f30428550))
* **labels:** Fix small label text ([b1c3988](https://gitlab.com/gitlab-org/gitlab-ui/commit/b1c3988e46f51723a2e6ff1b7ad1ba93514b4371))


### BREAKING CHANGES

* **css:** Usages of gl-sm-pl-0 need to be adjusted to account for
the fact it now removes left padding on viewports larger than sm, while
it used to do the opposite.

## [56.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v56.4.0...v56.4.1) (2023-03-14)


### Bug Fixes

* Limit drawer component width to 100% on small devices ([767acd9](https://gitlab.com/gitlab-org/gitlab-ui/commit/767acd944b65ab9680ef612fc62a9b815db7d12f))

# [56.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v56.3.0...v56.4.0) (2023-03-13)


### Features

* **charts:** fill to container height when height is "auto" ([dab39d8](https://gitlab.com/gitlab-org/gitlab-ui/commit/dab39d8116f97ef5c459e8872bfa97058dae65d4))

# [56.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v56.2.1...v56.3.0) (2023-03-08)


### Bug Fixes

* **GlFormDate:** fix feedback text size ([02a6b18](https://gitlab.com/gitlab-org/gitlab-ui/commit/02a6b187e6f78e1144a15395cd9d4be45e5acc67)), closes [/gitlab.com/gitlab-org/gitlab-ui/blob/v56.2.0/src/components/base/form/form_group/form_group.scss#L24](https://gitlab.com//gitlab.com/gitlab-org/gitlab-ui/blob/v56.2.0/src/components/base/form/form_group/form_group.scss/issues/L24) [/gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3115#note_1152044321](https://gitlab.com//gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3115/issues/note_1152044321)
* **GlTable:** ensure gl-table class on table element ([5edfc06](https://gitlab.com/gitlab-org/gitlab-ui/commit/5edfc069570eb61b3f02299e1a8d569d03bf21cb))


### Features

* **deps:** upgrade bootstrap-vue to v2.23.1 ([5fa1033](https://gitlab.com/gitlab-org/gitlab-ui/commit/5fa10330f92cbfa0c8be81b67f44d8a3f2f988b1))

## [56.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v56.2.0...v56.2.1) (2023-03-08)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.4.5 ([c4c285a](https://gitlab.com/gitlab-org/gitlab-ui/commit/c4c285aaff19b6190df2f1729108b4c6a761fc0c))

# [56.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v56.1.2...v56.2.0) (2023-02-25)


### Features

* **GlSingleStat:** add titleIconClass prop ([df18efb](https://gitlab.com/gitlab-org/gitlab-ui/commit/df18efb2e22bb2bcb03edd1e8442e3eb1fcdca76))

## [56.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v56.1.1...v56.1.2) (2023-02-23)


### Bug Fixes

* **GlPath:** Keep path text white in dark mode ([6fb2654](https://gitlab.com/gitlab-org/gitlab-ui/commit/6fb2654804ce75944cbd73f7acf300c66740b434))

## [56.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v56.1.0...v56.1.1) (2023-02-20)


### Performance Improvements

* **GlCollapsibleDropdown:** avoid unnecessary loop ([2d13b6e](https://gitlab.com/gitlab-org/gitlab-ui/commit/2d13b6ecc80154e70a4d637974b8434d50e53928))

# [56.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v56.0.1...v56.1.0) (2023-02-20)


### Features

* **GlDisclosureDropdown, GlCollapsibleListbox:** Set focus on the first custom toggle's child ([2a86c03](https://gitlab.com/gitlab-org/gitlab-ui/commit/2a86c035d0b92ead9bc15017521a205977ad6d2e))

## [56.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v56.0.0...v56.0.1) (2023-02-17)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.4.4 ([c90c17b](https://gitlab.com/gitlab-org/gitlab-ui/commit/c90c17b307da010cacb566800f9cf5922124f28e))

# [56.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v55.3.1...v56.0.0) (2023-02-16)


### Features

* **GlDisclosureDropdown:** wrap custom item content in `button` or `link` ([684386d](https://gitlab.com/gitlab-org/gitlab-ui/commit/684386d4dd66c4ce85538faec1b35b9c5c370926))


### BREAKING CHANGES

* **GlDisclosureDropdown:** It will cause styling and semantic issues
in the downstream project.
Wherever the `list-item` slot is used with a `button` or `a` inside
it wrapping the content, this wrapper `button/a` needs to be removed.

## [55.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v55.3.0...v55.3.1) (2023-02-16)


### Bug Fixes

* **GlDisclosureDropdown:** Improve markup semantics of dropdown wrapper ([79b1922](https://gitlab.com/gitlab-org/gitlab-ui/commit/79b19229c617904cc300a58d54c6ff04b742bb53))

# [55.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v55.2.1...v55.3.0) (2023-02-16)


### Features

* **toggle:** Add description text ([da0d5aa](https://gitlab.com/gitlab-org/gitlab-ui/commit/da0d5aae8f36e562824abf1fd286443988fa2e47))
* **toggle:** Add description text and inline variant ([54a95f8](https://gitlab.com/gitlab-org/gitlab-ui/commit/54a95f80375bdf3c70c355b3d7b943c6f37f1984)), closes [#2148](https://gitlab.com/gitlab-org/gitlab-ui/issues/2148)

## [55.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v55.2.0...v55.2.1) (2023-02-13)


### Bug Fixes

* **GlFormGroup:** Change color of form group description ([96dc484](https://gitlab.com/gitlab-org/gitlab-ui/commit/96dc4847e7d6adfa9bd03440454d886867cbad91))

# [55.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v55.1.0...v55.2.0) (2023-02-09)


### Features

* **GlCollapsibleListbox:** fix keyboard navigation when selected is `null` ([dd18e2b](https://gitlab.com/gitlab-org/gitlab-ui/commit/dd18e2bca1ba74255c990c0afec4627becbc9b00))
* **toggle:** Add missing states, update disabled state ([00123d1](https://gitlab.com/gitlab-org/gitlab-ui/commit/00123d1f11dc7d1f9a31e7d6a08e8650ac47c01c))

# [55.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v55.0.1...v55.1.0) (2023-02-08)


### Features

* **GlFilteredSearchToken:** added title slot to GlFilteredSearchToken ([8e1a6d6](https://gitlab.com/gitlab-org/gitlab-ui/commit/8e1a6d6d67b75356fb334053eb33c4a5d7047cbd))

## [55.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v55.0.0...v55.0.1) (2023-02-07)


### Bug Fixes

* **GlDisclosureDropdown:** Ensure default ID is unique ([06326e8](https://gitlab.com/gitlab-org/gitlab-ui/commit/06326e89003bb5c9f13e8b0511bee306fac6ffc7))

# [55.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.4.1...v55.0.0) (2023-02-06)


### Features

* **GlSearchBoxByType:** implemented component wide focusin focusout ([c202cde](https://gitlab.com/gitlab-org/gitlab-ui/commit/c202cde2374542c0b2b6608acc84f52390783e76))


### BREAKING CHANGES

* **GlSearchBoxByType:** removes `clearButtonFocus`, `clearButtonBlur`, and
`clearButtonRelease` events.

## [54.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.4.0...v54.4.1) (2023-02-06)


### Bug Fixes

* **GlListbox:** Stop listbox ENTER event prop ([944b7f9](https://gitlab.com/gitlab-org/gitlab-ui/commit/944b7f9baf67fc71787d14d614fb51b722083820))

# [54.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.3.0...v54.4.0) (2023-02-02)


### Features

* **GlDisclosureDropdown:** Add support for item wrapper class ([8b575af](https://gitlab.com/gitlab-org/gitlab-ui/commit/8b575af03dcdeb9206ef3caf65f2519b9628b1ae))

# [54.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.2.3...v54.3.0) (2023-02-02)


### Features

* **css:** Add gl-min-h-5 class ([c5b52e8](https://gitlab.com/gitlab-org/gitlab-ui/commit/c5b52e8e4b0c7de74c55ea8c05c30f3c8b229bc1))

## [54.2.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.2.2...v54.2.3) (2023-01-31)


### Bug Fixes

* **GlDisclosureDropdown:** pass `item` object to the item component ([d393007](https://gitlab.com/gitlab-org/gitlab-ui/commit/d3930078bc4d407928d1a4c07092f7a3211fe8b9))

## [54.2.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.2.1...v54.2.2) (2023-01-31)


### Bug Fixes

* failing test ([12597ee](https://gitlab.com/gitlab-org/gitlab-ui/commit/12597ee074321dd112fde27be7dbfbe9536184cf))

## [54.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.2.0...v54.2.1) (2023-01-30)


### Bug Fixes

* **GlDisclosureDropdown/GlCollapsibleListbox:** set dropdown panel z-index ([05122bf](https://gitlab.com/gitlab-org/gitlab-ui/commit/05122bf127da7098a071e9cda10034382d0d6e51))

# [54.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.1.2...v54.2.0) (2023-01-27)


### Features

* **GlListbox,GlDisclosure:** Updates dropdown styles ([6c6ed0e](https://gitlab.com/gitlab-org/gitlab-ui/commit/6c6ed0e339a041fe596e594a24b061a740fdb8d5))

## [54.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.1.1...v54.1.2) (2023-01-26)


### Bug Fixes

* **GlListbox:** Override reset button styles ([ec8cf77](https://gitlab.com/gitlab-org/gitlab-ui/commit/ec8cf771095b8c00ce423be438d4cb7d00aa8224))

## [54.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.1.0...v54.1.1) (2023-01-25)


### Bug Fixes

* **GlDisclosureDropdown:** Ensure default ID is unique ([3662f91](https://gitlab.com/gitlab-org/gitlab-ui/commit/3662f91cb59088d8d7eff5bf5c5756a41118b669))

# [54.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v54.0.0...v54.1.0) (2023-01-25)


### Features

* **CSS Gap Mixin:** Adds spacing scale 2 version of gap mixin ([1a3e049](https://gitlab.com/gitlab-org/gitlab-ui/commit/1a3e04918b9486fb957c1f191f78135998ff4cfa))

# [54.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v53.3.0...v54.0.0) (2023-01-24)


### Features

* **GlDisclosureDropdown:** Loosen action item type ([bb2b308](https://gitlab.com/gitlab-org/gitlab-ui/commit/bb2b3087c6d322aa0b67b7343b854a0796d27fde))
* **GlDisclosureDropdown:** Pass item to action ([8ac2cbf](https://gitlab.com/gitlab-org/gitlab-ui/commit/8ac2cbf80f81b4eff58e58a339b9fcad7bf40545))


### BREAKING CHANGES

* **GlDisclosureDropdown:** Action items are now determined by the *lack* of an
href string. An item with an href string is rendered as a link item,
whether or not it has an action callback.

Before this change, if an item had *both* an href and an action, it
would render as a button. Now, it would render as an anchor.
* **GlDisclosureDropdown:** The `this` of the `GlDisclosureDropdown` action
callback is now `undefined` rather than the item it's attached to. It
now receives the item as a regular argument instead.

This makes it more similar to the `action` event that's emitted by the
component, such that the same function could be used in either way.

This also means that the same callback can be attached to all items,
instead of requiring a unique callback for each item.

# [53.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v53.2.0...v53.3.0) (2023-01-24)


### Features

* **GlDisclosureDropdown:** Allow to provide custom toggle id ([b696ea2](https://gitlab.com/gitlab-org/gitlab-ui/commit/b696ea2ef34a9efca894260cfa45b7ff36aefd56))

# [53.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v53.1.0...v53.2.0) (2023-01-23)


### Features

* **GlDisclosureDropdown:** Allow to provide custom item template for groups ([c3034b8](https://gitlab.com/gitlab-org/gitlab-ui/commit/c3034b87ae093daae7b0817a2535abefa0a7dcad))

# [53.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v53.0.1...v53.1.0) (2023-01-23)


### Features

* **css:** add gl-w-30 ([4cf37cf](https://gitlab.com/gitlab-org/gitlab-ui/commit/4cf37cfb4e82d9101a6a2f4a4b3b4144eb1cffd6))

## [53.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v53.0.0...v53.0.1) (2023-01-23)


### Bug Fixes

* **GlDisclosureDropdown:** Always set button type ([595d6a2](https://gitlab.com/gitlab-org/gitlab-ui/commit/595d6a25835a42425f3a3b68080d70dcf24fbd08))

# [53.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.13.1...v53.0.0) (2023-01-20)


### Features

* **GlDisclosureDropdown:** Add support for a placement prop ([06e789c](https://gitlab.com/gitlab-org/gitlab-ui/commit/06e789cdfd1f41a32c19a4ce19305cd4029777dd))


### BREAKING CHANGES

* **GlDisclosureDropdown:** `right` boolean prop replaced with `placement` string
prop on base_dropdown.vue used by `GlCollapsibleListbox` and
`GlDisclosureDropdown`

## [52.13.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.13.0...v52.13.1) (2023-01-19)


### Bug Fixes

* **GlListBox:** allow item.value to be a number ([40173e4](https://gitlab.com/gitlab-org/gitlab-ui/commit/40173e494d447cfdb8fc0b438d6125011749b78e))

# [52.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.12.0...v52.13.0) (2023-01-18)


### Features

* **GlBaseDropdown:** Allow listbox to stretch in full-width ([83ab66c](https://gitlab.com/gitlab-org/gitlab-ui/commit/83ab66c2ae3a43d906398b286d784c129b0ef9d1))

# [52.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.11.0...v52.12.0) (2023-01-17)


### Features

* **GlEmptyState:** Add content-class prop ([7f850d7](https://gitlab.com/gitlab-org/gitlab-ui/commit/7f850d7661ffcb6a2db1cccfaca87cd7d794e01b))

# [52.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.10.0...v52.11.0) (2023-01-16)


### Features

* **GlDisclosureDropdown:** Add GlDisclosureDropdown component ([e9bca59](https://gitlab.com/gitlab-org/gitlab-ui/commit/e9bca595b591846e892991611ea92f51fd4db055))

# [52.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.9.3...v52.10.0) (2023-01-10)


### Features

* **GlSparklineChart:** Add smooth prop ([f28d852](https://gitlab.com/gitlab-org/gitlab-ui/commit/f28d8527e170afd0077b191eaff307be551dfdc0))

## [52.9.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.9.2...v52.9.3) (2023-01-10)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.4.3 ([0899f93](https://gitlab.com/gitlab-org/gitlab-ui/commit/0899f936c7044f380be4a1fdf72f663f599ce799))

## [52.9.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.9.1...v52.9.2) (2023-01-09)


### Bug Fixes

* **GlTabs:** set a query parameter for the first tab ([f2f4827](https://gitlab.com/gitlab-org/gitlab-ui/commit/f2f4827a5d9d1d1cd3f98c1c06f9bd7ed7a63abc))

## [52.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.9.0...v52.9.1) (2023-01-09)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.4.2 ([c1b1212](https://gitlab.com/gitlab-org/gitlab-ui/commit/c1b12126057ba5e9a03236c16f9e7ff3b373ed80))

# [52.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.8.0...v52.9.0) (2023-01-04)


### Features

* **GlSearchBoxByType:** Add support for a borderless variant ([b45ad66](https://gitlab.com/gitlab-org/gitlab-ui/commit/b45ad66fc6f9f8c0feb1b15384c3f5b75f944a01))
* **GlSearchBoxByType:** Increase right button indentation ([de766e4](https://gitlab.com/gitlab-org/gitlab-ui/commit/de766e4aadb05d1cea7d79f02b43dfc3c7075a25))

# [52.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.7.3...v52.8.0) (2023-01-04)


### Features

* **GlBaseDropdown:** Allow custom toggle for the new dropdowns ([0188e21](https://gitlab.com/gitlab-org/gitlab-ui/commit/0188e210b9e7d9090b41555886d44a1c7f49be3d))

## [52.7.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.7.2...v52.7.3) (2023-01-04)


### Bug Fixes

* **GlListbox:** move loading icon to list container ([13fca59](https://gitlab.com/gitlab-org/gitlab-ui/commit/13fca596c30888e7bd7a010348c0f08f72d9ef3a))

## [52.7.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.7.1...v52.7.2) (2022-12-28)


### Bug Fixes

* **GlListbox:** remove input debounce ([dfca4ba](https://gitlab.com/gitlab-org/gitlab-ui/commit/dfca4ba4bae31371efc7ab86917cdbe636a5bfab))

## [52.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.7.0...v52.7.1) (2022-12-22)


### Bug Fixes

* **BroadcastMessage:** remove hardcoded width ([b5eedbd](https://gitlab.com/gitlab-org/gitlab-ui/commit/b5eedbdb79c88724c843bfa9ecf6494d04e1b5d6))

# [52.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.6.1...v52.7.0) (2022-12-20)


### Features

* **GlListbox:** Add infinite scroll to listbox ([d42c9e6](https://gitlab.com/gitlab-org/gitlab-ui/commit/d42c9e64745fdc0ee65e1d612712a1aaf61a2228))

## [52.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.6.0...v52.6.1) (2022-12-20)


### Bug Fixes

* **css:** Disables ligatures for monospaced fonts ([50e208c](https://gitlab.com/gitlab-org/gitlab-ui/commit/50e208c8d0d49acbc2dd21393364bcc02094cbac))

# [52.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.5.0...v52.6.0) (2022-12-16)


### Features

* **css:** Add utils for OKRs progress ([d8fcb85](https://gitlab.com/gitlab-org/gitlab-ui/commit/d8fcb85172502028574bdc133329a97ff67d4630))

# [52.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.4.0...v52.5.0) (2022-12-13)


### Features

* **GlSparklineChart:** Add gradient prop ([eb28329](https://gitlab.com/gitlab-org/gitlab-ui/commit/eb283290d82a506c2a9732d3b86ad328f4be0385))

# [52.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.3.1...v52.4.0) (2022-12-12)


### Features

* **css:** add gl-max-w-0 ([b971b7a](https://gitlab.com/gitlab-org/gitlab-ui/commit/b971b7a928c074cc44a2b868f96eb85f353b86a2))

## [52.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.3.0...v52.3.1) (2022-12-09)


### Bug Fixes

* **charts:** add background color to toolbox title ([517b70c](https://gitlab.com/gitlab-org/gitlab-ui/commit/517b70ca9afcbe90adb1bd92f55c16b489093e6a))
* **charts:** add space between toolbox and chart ([94c1ea8](https://gitlab.com/gitlab-org/gitlab-ui/commit/94c1ea80509165bf1f2b9630740059d791d613e4))

# [52.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.2.1...v52.3.0) (2022-12-08)


### Features

* **GlListbox:** Improve GlListbox's search input ([29d69c8](https://gitlab.com/gitlab-org/gitlab-ui/commit/29d69c898b643849afe08ace9514d1372e26a772))

## [52.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.2.0...v52.2.1) (2022-12-08)


### Bug Fixes

* **single-stat:** Add left margin to single stat unit ([10ad248](https://gitlab.com/gitlab-org/gitlab-ui/commit/10ad248540a2b2b9c933986c937d763415b940ff))

# [52.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.1.0...v52.2.0) (2022-12-05)


### Features

* **css:** add gl-isolate in utilities ([c2249c5](https://gitlab.com/gitlab-org/gitlab-ui/commit/c2249c5f70778efe784ed69c7401f679cc38d128))

# [52.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v52.0.0...v52.1.0) (2022-12-05)


### Features

* **token:** Update focus state ([f300690](https://gitlab.com/gitlab-org/gitlab-ui/commit/f30069080865d8fe9741cb2717d60690e7ac8400))

# [52.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v51.1.1...v52.0.0) (2022-12-02)


### Features

* **css:** Adding GitLab Sans & JetBrains Mono as new default fonts ([73b7abc](https://gitlab.com/gitlab-org/gitlab-ui/commit/73b7abc70b3f6bc7249452c0356989271104fdb8))


### BREAKING CHANGES

* **css:** remove ` gl-font-size-monospace-(size)` utilities
Instead use standard `gl-font-(size)`

Co-authored-by: Olena Horal-Koretska <ohoralkoretska@gitlab.com>
Co-authored-by: Lukas Eipert <leipert@gitlab.com>

## [51.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v51.1.0...v51.1.1) (2022-12-02)


### Bug Fixes

* **GlDropdownItem:** Fix dropdown item disabled state styling ([057c4dc](https://gitlab.com/gitlab-org/gitlab-ui/commit/057c4dce08e5e38d4e7b446f0b78c320144217e3))

# [51.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v51.0.0...v51.1.0) (2022-12-02)


### Features

* **pagination:** Update disabled state, fix underline ([a892a4c](https://gitlab.com/gitlab-org/gitlab-ui/commit/a892a4c6ddfe521b080a25b03c5897a5fbda9977))

# [51.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v50.1.2...v51.0.0) (2022-12-02)


### Code Refactoring

* **GlDropdown:** Remove the `new` prefix in CSS classes ([887ae70](https://gitlab.com/gitlab-org/gitlab-ui/commit/887ae70aff2525c0540287bf9933514358e42155))


### BREAKING CHANGES

* **GlDropdown:** rename following CSS class names
- `gl-new-dropdown` => `gl-dropdown`
- `gl-new-dropdown-inner` => `gl-dropdown-inner`
- `gl-new-dropdown-contents` => `gl-dropdown-contents`
- `gl-new-dropdown-header` => `gl-dropdown-header`
- `gl-new-dropdown-header-top` => `gl-dropdown-header-top`
- `gl-new-dropdown-footer` => `gl-dropdown-footer`
- `gl-new-dropdown-item` => `gl-dropdown-item`
- `gl-new-dropdown-item-check-icon` => `gl-dropdown-item-check-icon`
- `gl-new-dropdown-item-icon` => `gl-dropdown-item-icon`
- `gl-new-dropdown-item-text-primary` => `gl-dropdown-item-text-primary`
- `gl-new-dropdown-item-text-secondary`
=> `gl-dropdown-item-text-secondary`
- `gl-new-dropdown-item-text-wrapper` => `gl-dropdown-item-text-wrapper`
- `gl-new-dropdown-divider` => `gl-dropdown-divider`
- `gl-new-dropdown-section-header` => `gl-dropdown-section-header`
- `gl-new-dropdown-text` => `gl-dropdown-text`
- `gl-new-dropdown-button-text` => `gl-dropdown-button-text`

## [50.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v50.1.1...v50.1.2) (2022-11-25)


### Bug Fixes

* **charts:** fix toolbox icons default + hover colors ([1fecdd6](https://gitlab.com/gitlab-org/gitlab-ui/commit/1fecdd65a67f47edf2afdf7481b2545d3ecc19e7))

## [50.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v50.1.0...v50.1.1) (2022-11-25)


### Bug Fixes

* **charts:** Update chart toolbar icons ([18dd203](https://gitlab.com/gitlab-org/gitlab-ui/commit/18dd2037af0591d9cb0c38f21008e5d67b5beaab))

# [50.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v50.0.1...v50.1.0) (2022-11-23)


### Features

* **GlBroadcastMessage:** Add `type` and `dismissible` props ([98132e1](https://gitlab.com/gitlab-org/gitlab-ui/commit/98132e197d0b0f305b8a7e8ac2e40ca3549239c5))

## [50.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v50.0.0...v50.0.1) (2022-11-22)


### Bug Fixes

* **GlDataRangePicker:** fix indicator alignment when compact layout ([296ba60](https://gitlab.com/gitlab-org/gitlab-ui/commit/296ba609760c46c770b48ee7d1dc1647269666c2))

# [50.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.11.2...v50.0.0) (2022-11-22)


### Code Refactoring

* **charts:** Remove unused ToolboxMixin ([0d486ee](https://gitlab.com/gitlab-org/gitlab-ui/commit/0d486ee1dfcf4bc0f93f2e64f928eff803fe49ee))


### BREAKING CHANGES

* **charts:** - remove ToolboxMixin
- remove getToolboxConfig in utils/charts/config

## [49.11.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.11.1...v49.11.2) (2022-11-17)


### Bug Fixes

* **GlDrawer:** change drawer horizontal padding ([11579fe](https://gitlab.com/gitlab-org/gitlab-ui/commit/11579fe7561f52d4808afcf8dd3c319265d35418))
* **GlDrawer:** change drawer horizontal padding ([55d51d5](https://gitlab.com/gitlab-org/gitlab-ui/commit/55d51d564dd38491cfe74a582337dc06df3120f6))

## [49.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.11.0...v49.11.1) (2022-11-16)


### Bug Fixes

* Updated semantics of the drawer ([a1f00ae](https://gitlab.com/gitlab-org/gitlab-ui/commit/a1f00ae70442a4c7923f26e0d3933802670210d8))

# [49.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.10.1...v49.11.0) (2022-11-16)


### Features

* **GlListbox:** Add GlCollapsibleListbox alias ([b83558f](https://gitlab.com/gitlab-org/gitlab-ui/commit/b83558f62656b68cd7e9480f148903905cf3a53f))

## [49.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.10.0...v49.10.1) (2022-11-15)


### Bug Fixes

* **GlFilteredSearch:** Show operator friendly text first ([9cbe638](https://gitlab.com/gitlab-org/gitlab-ui/commit/9cbe63855c9958a4ebc685e01c1414eca9921739))

# [49.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.9.1...v49.10.0) (2022-11-15)


### Features

* **GlDaterangePicker:** improve layout ([8014cc8](https://gitlab.com/gitlab-org/gitlab-ui/commit/8014cc8950ffd3dbf5db4ec1554e75c5ccc6a38c))


### Reverts

* fix(deps): upgrade bootstrap-vue to v2.23.1 ([02bdbcd](https://gitlab.com/gitlab-org/gitlab-ui/commit/02bdbcd66040c7ad7739d6cfedd253d0104cf7f2))

## [49.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.9.0...v49.9.1) (2022-11-15)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.4.1 ([1dfdf40](https://gitlab.com/gitlab-org/gitlab-ui/commit/1dfdf407820dcc42c313c6c6b95cff0be7221080))

# [49.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.8.0...v49.9.0) (2022-11-14)


### Features

* **CSS:** tint-neutral-transparency ([2be841a](https://gitlab.com/gitlab-org/gitlab-ui/commit/2be841a7bc4f61ad1c01079a8c589b7cd42ad3ed))

# [49.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.7.0...v49.8.0) (2022-11-11)


### Features

* Add brand colours to the variables list ([4baab55](https://gitlab.com/gitlab-org/gitlab-ui/commit/4baab5507f0b6209ede3acbab4b692502f539a6e))

# [49.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.6.0...v49.7.0) (2022-11-10)


### Features

* **BroadcastMessage:** Equal top and bottom margin ([8b548f1](https://gitlab.com/gitlab-org/gitlab-ui/commit/8b548f1b3f86f9d6586dfb0c63deb2d0aa3fdd97))
* **BroadcastMessage:** Refine alignment ([c59fc65](https://gitlab.com/gitlab-org/gitlab-ui/commit/c59fc65622d0bf8d64ebb4bb98c1f8676b9ad49d))

# [49.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.5.1...v49.6.0) (2022-11-09)


### Features

* **GlFormDate:** Add component ([099e6d3](https://gitlab.com/gitlab-org/gitlab-ui/commit/099e6d36e2544a85796316b237dde04b5e3150d3))

## [49.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.5.0...v49.5.1) (2022-11-08)


### Bug Fixes

* **GlDropdown:** Dropdown arrow position when in block mode ([7a34f2d](https://gitlab.com/gitlab-org/gitlab-ui/commit/7a34f2dfea96388dbd281f2b372dc14299cabadd))

# [49.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.4.1...v49.5.0) (2022-11-07)


### Features

* **css:** updating neutral gray colors to have a tint based on branding ([241b9d1](https://gitlab.com/gitlab-org/gitlab-ui/commit/241b9d16e41dc1b506ed3eb158272d949c8acd65))
* **datepicker:** add support for different datepicker sizes ([a502867](https://gitlab.com/gitlab-org/gitlab-ui/commit/a502867438144303d20c9fe0ad9c0b635f37bba2))

## [49.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.4.0...v49.4.1) (2022-11-04)


### Bug Fixes

* **deps:** upgrade bootstrap-vue to v2.23.1 ([168136a](https://gitlab.com/gitlab-org/gitlab-ui/commit/168136a9234754745ddbd7f08bdc33f95c80a115))

# [49.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.3.0...v49.4.0) (2022-11-04)


### Features

* **Badge:** increase-muted-contrast ([01a3c15](https://gitlab.com/gitlab-org/gitlab-ui/commit/01a3c15d40bbbf9c2fe7b4ccfebc0efaac6f2769))

# [49.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.2.1...v49.3.0) (2022-11-03)


### Features

* Relax bootstrap per dependency constraint ([c8fb125](https://gitlab.com/gitlab-org/gitlab-ui/commit/c8fb1254723d8fc6be575fd27c21001d10b95a60))

## [49.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.2.0...v49.2.1) (2022-10-28)


### Bug Fixes

* **datepicker:** Render empty string instead of false ([678b225](https://gitlab.com/gitlab-org/gitlab-ui/commit/678b22572edbd306e859d4017055a6041c24eb4f))

# [49.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.1.0...v49.2.0) (2022-10-28)


### Features

* **GlBadge:** add 12px icon variant ([bf47618](https://gitlab.com/gitlab-org/gitlab-ui/commit/bf476189b298b348b029fb63a6785b3d063cc1d1))
* **GlListbox:** add ability to reset selection ([68bd63f](https://gitlab.com/gitlab-org/gitlab-ui/commit/68bd63f4f9e04df94b205f21b5d4d35de34040f7))

# [49.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.0.3...v49.1.0) (2022-10-27)


### Features

* **GlSearchBoxByType:** Clear button events ([71506b3](https://gitlab.com/gitlab-org/gitlab-ui/commit/71506b3a9ca15f0e233bea4b8ee1fbe7de688059))

## [49.0.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.0.2...v49.0.3) (2022-10-26)


### Bug Fixes

* **GlToast:** Improve accessibility ([8d1d170](https://gitlab.com/gitlab-org/gitlab-ui/commit/8d1d170e8188dd7de078955ba08f95ca67bbd04e))

## [49.0.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.0.1...v49.0.2) (2022-10-25)


### Bug Fixes

* **GlPagination:** move attributes to root element ([def3d02](https://gitlab.com/gitlab-org/gitlab-ui/commit/def3d02878019c792b962c7632385e208d3c3fb8))

## [49.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v49.0.0...v49.0.1) (2022-10-24)


### Bug Fixes

* **GlListbox:** fix dropdown positioning ([18d061f](https://gitlab.com/gitlab-org/gitlab-ui/commit/18d061fc905ac906a6c88f080b08b9e085eb372e))

# [49.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v48.3.1...v49.0.0) (2022-10-24)


### Bug Fixes

* **GlToggle:** Fix help text visibility ([1bd4137](https://gitlab.com/gitlab-org/gitlab-ui/commit/1bd4137fca78152966869b0b6781fe44c5f9a69e))


### BREAKING CHANGES

* **GlToggle:** Hide help text when `labelPosition: left`

## [48.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v48.3.0...v48.3.1) (2022-10-24)


### Bug Fixes

* **OutsideDirective:** enable event capture ([c32381a](https://gitlab.com/gitlab-org/gitlab-ui/commit/c32381a3048895e747cc905df468319d8eff7a30))

# [48.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v48.2.0...v48.3.0) (2022-10-24)


### Features

* **Color:** Update aqua error ([9092b09](https://gitlab.com/gitlab-org/gitlab-ui/commit/9092b09130e1d4f03644e87d4a8dacecf6e2e1eb))
* **Color:** Update chart snapshots ([6cff69d](https://gitlab.com/gitlab-org/gitlab-ui/commit/6cff69ded0073ed9ddce09da29a89211dc1f7b50))
* **Color:** Update data viz variables ([3c0edbb](https://gitlab.com/gitlab-org/gitlab-ui/commit/3c0edbb30b6f5078f8938627418fd9349f788db2))

# [48.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v48.1.2...v48.2.0) (2022-10-24)


### Features

* **datepicker:** add public show method for datepicker ([adc2c8f](https://gitlab.com/gitlab-org/gitlab-ui/commit/adc2c8f53016efb253b003b02e6c354eb297ddb6))

## [48.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v48.1.1...v48.1.2) (2022-10-21)


### Bug Fixes

* **GlPagination:** Fix GlPagination accessibility ([a802cf6](https://gitlab.com/gitlab-org/gitlab-ui/commit/a802cf6752e9d29c28b0059f94f63592d10ed86d))

## [48.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v48.1.0...v48.1.1) (2022-10-21)


### Bug Fixes

* **GlDrawer:** Prevent background UI glitch in Safari ([c7ba025](https://gitlab.com/gitlab-org/gitlab-ui/commit/c7ba02537d5456ec1f3ca8ae5175da6ac318c581))

# [48.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v48.0.0...v48.1.0) (2022-10-21)


### Features

* Add table utility classes ([2fcde37](https://gitlab.com/gitlab-org/gitlab-ui/commit/2fcde37120ae6f69929d4d7724a78e49ab0cd1ab))

# [48.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v47.0.1...v48.0.0) (2022-10-19)


### Features

* **GlListbox:** convert header slot to a prop ([976250e](https://gitlab.com/gitlab-org/gitlab-ui/commit/976250ef04e72f0899762669aa16defb3a599c1e))


### BREAKING CHANGES

* **GlListbox:** GlListbox usages should be updated to pass the header
via the `headerText` prop instead of the `header` slot.

## [47.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v47.0.0...v47.0.1) (2022-10-18)


### Bug Fixes

* **GlDropdown:** Fix GlDropdown not auto flipping horizontally ([635eca3](https://gitlab.com/gitlab-org/gitlab-ui/commit/635eca3eea58f6ee1d2fd01a17a1db3401657647))

# [47.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v46.1.0...v47.0.0) (2022-10-17)


### Bug Fixes

* convert gl-sm-pr-2 to mobile-first, remove gl-md-pr-2 ([823c6c8](https://gitlab.com/gitlab-org/gitlab-ui/commit/823c6c8c727219a63b1c4bc31f16c82ac027e130))


### BREAKING CHANGES

* This converts gl-sm-pr-2 from desktop-first to
mobile-first and removes gl-md-pr-2. If you were relying on the former,
please migrate to a mobile-first approach. If relying on the latter, you
might need to add it back to the library. We are defaulting to removing
utils that aren't used in GitLab projects while we remove desktop-first
utils, so it might be necessary to re-add some of them if they are used
elsewhere.

# [46.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v46.0.0...v46.1.0) (2022-10-10)


### Features

* keep clear-all button in token-selector at top right ([631708d](https://gitlab.com/gitlab-org/gitlab-ui/commit/631708d890f81dc31e9bf2befe6ec84369ca9e02))

# [46.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v45.0.0...v46.0.0) (2022-10-06)


### Bug Fixes

* remove gl-sm-pb-[0-5] utils ([c94b46d](https://gitlab.com/gitlab-org/gitlab-ui/commit/c94b46d269db023f0a2f63c96ff8bb97d7addf68))
* remove gl-sm-pl-[1-4] utils ([802a32c](https://gitlab.com/gitlab-org/gitlab-ui/commit/802a32ce8c3e54ba358e8aaf704a09b5d3d27411))
* remove gl-sm-pr-[014] utils ([8e9c3ee](https://gitlab.com/gitlab-org/gitlab-ui/commit/8e9c3ee43eae4818d031ae4a84772953284611e5))
* remove gl-xs-align-items-baseline util ([359dd98](https://gitlab.com/gitlab-org/gitlab-ui/commit/359dd989bb6822c9fe4ab14cd69f0fae887d24c4))
* remove gl-xs-display-block util ([03b1f51](https://gitlab.com/gitlab-org/gitlab-ui/commit/03b1f5168ecdc4fe013b4d305c1eb9f80cabb110))
* remove gl-xs-display-flex util ([0416358](https://gitlab.com/gitlab-org/gitlab-ui/commit/0416358ecc19f0c2e51acb4f8493ae64ed3a04ee))
* remove gl-xs-display-inline util ([637f1c8](https://gitlab.com/gitlab-org/gitlab-ui/commit/637f1c8b3ff1d2c3c57ebb5bd33b552621b99c33))
* remove gl-xs-display-inline-block util ([288bf3e](https://gitlab.com/gitlab-org/gitlab-ui/commit/288bf3ef32915f6a6c66ad1f93d42bcfce2046e5))
* remove gl-xs-display-inline-flex util ([ceeab81](https://gitlab.com/gitlab-org/gitlab-ui/commit/ceeab8161656b9204d3377188d771491316a8102))


### Features

* **GlAlert:** `role` status based on alert type ([377137d](https://gitlab.com/gitlab-org/gitlab-ui/commit/377137df829a2e0b77190499194c005e688be7f7)), closes [/gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3045#note_1124896838](https://gitlab.com//gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3045/issues/note_1124896838) [/gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3045#note_1124893205](https://gitlab.com//gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3045/issues/note_1124893205)


### BREAKING CHANGES

* This removes the `gl-xs-align-items-baseline`
desktop-first CSS util. If you were relying on it, please
migrate to a mobile-first approach.
* This removes the `gl-xs-display-inline-block`
desktop-first CSS util. If you were relying on it, please
migrate to a mobile-first approach.
* This removes the `gl-xs-display-inline` desktop-first
CSS util. If you were relying on it, please migrate to a
mobile-first approach.
* This removes the `gl-xs-display-block` desktop-first
CSS util. If you were relying on it, please migrate to a
mobile-first approach.
* This removes the `gl-xs-display-inline-flex`
desktop-first CSS util. If you were relying on it, please
migrate to a mobile-first approach.
* This removes the `gl-xs-display-flex` desktop-first
CSS util. If you were relying on it, please migrate to a
mobile-first approach.
* This removes `gl-sm-pr-[014]` desktop-first
CSS utils. If you were relying on them, please migrate to a
mobile-first approach.
* This removes `gl-sm-pl-[1-4]` desktop-first
CSS utils. If you were relying on them, please migrate to a
mobile-first approach.
* This removes `gl-sm-pb-[0-5]` desktop-first
CSS utils. If you were relying on them, please migrate to a
mobile-first approach.

# [45.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v44.1.0...v45.0.0) (2022-10-05)


### Features

* **GlListbox:** add support for listbox filtering ([c6edcc4](https://gitlab.com/gitlab-org/gitlab-ui/commit/c6edcc44966891ce4e2682c9b9785e6bd16ae642))


### BREAKING CHANGES

* **GlListbox:** `ariaLabelledby` property was renamed
to `toggleAriaLabelledBy `for better consistency
with a new `listAriaLabelledBy` property

# [44.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v44.0.0...v44.1.0) (2022-10-05)


### Features

* **GlAlert:** add aria-live attribute ([89b866b](https://gitlab.com/gitlab-org/gitlab-ui/commit/89b866b771514bc6db25108b4defaed8df53c052))

# [44.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.21.0...v44.0.0) (2022-10-05)


### Bug Fixes

* remove gl-sm-pt-0 CSS util ([97c5907](https://gitlab.com/gitlab-org/gitlab-ui/commit/97c5907a62d883c7914c1a6befefdf6075684f29))
* remove gl-sm-pt-1 CSS util ([d9fa6bc](https://gitlab.com/gitlab-org/gitlab-ui/commit/d9fa6bc512c7226a9fcd629736fdf77a8b8dcb47))
* remove gl-sm-pt-2 CSS util ([8cf287e](https://gitlab.com/gitlab-org/gitlab-ui/commit/8cf287e664c35402837ffc77dc8c6050cda6fb04))
* remove gl-sm-pt-3 CSS util ([ed97bbf](https://gitlab.com/gitlab-org/gitlab-ui/commit/ed97bbf36b3bc5da3a74546fe15721005ff86d93))
* remove gl-sm-pt-4 CSS util ([fb0b50e](https://gitlab.com/gitlab-org/gitlab-ui/commit/fb0b50ebc8f2b4754ec3eac1427f951f89cd9894))
* remove gl-sm-pt-5 CSS util ([11a0cdc](https://gitlab.com/gitlab-org/gitlab-ui/commit/11a0cdc10a8bb64376bfd40ac254a588f9bbaad3))


### BREAKING CHANGES

* This removes the desktop-first gl-sm-pt-5 CSS util. If
you were relying on it for some styling, please migrate to a
mobile-first approach.
* This removes the desktop-first gl-sm-pt-4 CSS util. If
you were relying on it for some styling, please migrate to a
mobile-first approach.
* This removes the desktop-first gl-sm-pt-3 CSS util. If
you were relying on it for some styling, please migrate to a
mobile-first approach.
* This removes the desktop-first gl-sm-pt-2 CSS util. If
you were relying on it for some styling, please migrate to a
mobile-first approach.
* This removes the desktop-first gl-sm-pt-1 CSS util. If
you were relying on it for some styling, please migrate to a
mobile-first approach.
* This removes the desktop-first gl-sm-pt-0 CSS util. If
you were relying on it for some styling, please migrate to a
mobile-first approach.

# [43.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.20.0...v43.21.0) (2022-09-30)


### Features

* **css:** Add .gl-flex-basis-two-thirds ([eee7f74](https://gitlab.com/gitlab-org/gitlab-ui/commit/eee7f7481e09ee69be1295d844e6b8ee5695d439))

# [43.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.19.0...v43.20.0) (2022-09-27)


### Features

* **css:** Add gl-md-ml-auto ([c9a4338](https://gitlab.com/gitlab-org/gitlab-ui/commit/c9a4338ae8039ca4a8826996abfba973f2920714))

# [43.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.18.0...v43.19.0) (2022-09-23)


### Features

* **css:** Adds sticky position utility classes ([29fc153](https://gitlab.com/gitlab-org/gitlab-ui/commit/29fc15379e94ffc8dbc22f8702004fc25d0f99b7))
* **css:** remove gl-lg-top-13 and gl-lg-align-items-flex-start ([bbad117](https://gitlab.com/gitlab-org/gitlab-ui/commit/bbad11786e756c84c40426135cb12c379baa4687))

# [43.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.17.1...v43.18.0) (2022-09-20)


### Features

* **GlFilteredSearch:** Add support for view only state ([fa2ce04](https://gitlab.com/gitlab-org/gitlab-ui/commit/fa2ce047c3b4daef3e5d64d81122f0c17ab9de3b))

## [43.17.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.17.0...v43.17.1) (2022-09-15)


### Bug Fixes

* Add [type=checkbox] to :indeterminate:disabled control ([6916c16](https://gitlab.com/gitlab-org/gitlab-ui/commit/6916c16e3cf061cf02ecd786cafdc4c5c486c610))

# [43.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.16.0...v43.17.0) (2022-09-14)


### Features

* **css:** add gl-gap-y-3 ([d76e3d1](https://gitlab.com/gitlab-org/gitlab-ui/commit/d76e3d1cc6fbb79e9e7d101ba1865ed2c2f5afd2))

# [43.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.15.0...v43.16.0) (2022-09-13)


### Features

* **css:** add gl-sm-mt-6 ([fb7dd88](https://gitlab.com/gitlab-org/gitlab-ui/commit/fb7dd88b4248e3dc94303527ac0f7db6fba23b5c))

# [43.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.14.0...v43.15.0) (2022-09-09)


### Features

* **Banner:** Update banner spec ([488b01d](https://gitlab.com/gitlab-org/gitlab-ui/commit/488b01d941d1166b47070ffe04a7c617e0bc82a3))
* **Banner:** Update heading level ([c4c4373](https://gitlab.com/gitlab-org/gitlab-ui/commit/c4c437375596b4157968c88ff16e59bef95a1f36))

# [43.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.13.0...v43.14.0) (2022-09-08)


### Features

* **GlListbox:** Add support for grouping ([c6ec8f1](https://gitlab.com/gitlab-org/gitlab-ui/commit/c6ec8f1a53eb4fad9a3ec077a762b23e67ef0245))

# [43.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.12.0...v43.13.0) (2022-09-06)


### Features

* **css:** Adds align items center from sm up ([2f59188](https://gitlab.com/gitlab-org/gitlab-ui/commit/2f5918849f390ad4ee8a6a0a1040923fe4a82e00))

# [43.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.11.0...v43.12.0) (2022-09-02)


### Features

* **css:** Add xl container util ([95755b9](https://gitlab.com/gitlab-org/gitlab-ui/commit/95755b9f3ff23dfd184a6c2c74ab23ea7d9865f6))

# [43.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.10.0...v43.11.0) (2022-09-01)


### Features

* **GlFormSetlect:** Allowed to cofigure select size ([1e80adc](https://gitlab.com/gitlab-org/gitlab-ui/commit/1e80adc82acfbd84afacfba10ae4d6860ef57996))

# [43.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.9.3...v43.10.0) (2022-08-31)


### Features

* **markdown:** Markdown code block styles ([344c84e](https://gitlab.com/gitlab-org/gitlab-ui/commit/344c84e9e67b8b28e3e7aa64594274cd3919ea9e))

## [43.9.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.9.2...v43.9.3) (2022-08-30)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.4.0 ([aefdefa](https://gitlab.com/gitlab-org/gitlab-ui/commit/aefdefac3632f383aa6f62f868097a27bfe90e89))

## [43.9.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.9.1...v43.9.2) (2022-08-30)


### Bug Fixes

* use default DOMpurify export ([da7473f](https://gitlab.com/gitlab-org/gitlab-ui/commit/da7473f9a93c62f165da9ec4fc62bee80570e29d))

## [43.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.9.0...v43.9.1) (2022-08-25)


### Bug Fixes

* **css:** ensure we correctly generate gl-flex-direction-column utils ([68c8ef3](https://gitlab.com/gitlab-org/gitlab-ui/commit/68c8ef36f9e7bc07d8f61f4953bec52f1a7d10f1))

# [43.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.8.1...v43.9.0) (2022-08-24)


### Features

* **css:** add gl-column-gap-6 util ([5673c1a](https://gitlab.com/gitlab-org/gitlab-ui/commit/5673c1a0863a1019c6acb246aa8cb68d8bb54722))

## [43.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.8.0...v43.8.1) (2022-08-23)


### Bug Fixes

* use valid url syntax in form_checkbox.scss ([8e831de](https://gitlab.com/gitlab-org/gitlab-ui/commit/8e831def9cfa11b7bb54b0a84f509a295142aa61))

# [43.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.7.1...v43.8.0) (2022-08-22)


### Features

* **css:** Add flex-wrap-wrap-reverse class ([7d11b74](https://gitlab.com/gitlab-org/gitlab-ui/commit/7d11b7491d356c6d6565699fd4b10bf519f902c9))

## [43.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.7.0...v43.7.1) (2022-08-18)


### Bug Fixes

* **GlTable:** removes border top when stacked ([402a309](https://gitlab.com/gitlab-org/gitlab-ui/commit/402a3090db5db41add12df39fd40b71a60b32df3))

# [43.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.6.0...v43.7.0) (2022-08-18)


### Features

* **css:** update disabled states ([bd5c4fe](https://gitlab.com/gitlab-org/gitlab-ui/commit/bd5c4fe186649606fb49128224e95ac891947e4d))

# [43.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.5.0...v43.6.0) (2022-08-16)


### Features

* **css:** add gl-sm-align-items-flex-start utility ([ea811c9](https://gitlab.com/gitlab-org/gitlab-ui/commit/ea811c99c8418f986fcc1679c6102a4a55e3fea9))

# [43.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.4.0...v43.5.0) (2022-08-11)


### Features

* **GlModal:** Allow no autofocus on show ([1caa729](https://gitlab.com/gitlab-org/gitlab-ui/commit/1caa729965e4479d6341e00c4607928bc5c371ee))

# [43.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.3.0...v43.4.0) (2022-08-11)


### Features

* **css:** Add overflow-x and underline:hover utility classes ([1d86e1f](https://gitlab.com/gitlab-org/gitlab-ui/commit/1d86e1f0835580bdc60d246512d679b5abb67644))

# [43.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.2.2...v43.3.0) (2022-08-10)


### Features

* **css:** use calc() inside of clamp() to bypass SassC warning ([4d6d061](https://gitlab.com/gitlab-org/gitlab-ui/commit/4d6d061097f35d7e6801b6aafe3ccd2dc9aeefd3))

## [43.2.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.2.1...v43.2.2) (2022-08-09)


### Bug Fixes

* **GlBadge:** Add transition styles ([e34b371](https://gitlab.com/gitlab-org/gitlab-ui/commit/e34b3710c5e53c4d5c7fe2c204725fdd2c147b49))
* **GlBadge:** Nest icon styles ([13bdb73](https://gitlab.com/gitlab-org/gitlab-ui/commit/13bdb7301cca5ac2974dea93b67458a4a6d42052))
* **GlBadge:** Update badge colours ([4d85a8d](https://gitlab.com/gitlab-org/gitlab-ui/commit/4d85a8dd585b766bd047361d3c8f6b3c1e2ae76b))
* **GlBadge:** Update badge colours Apply suggestions ([2e438e1](https://gitlab.com/gitlab-org/gitlab-ui/commit/2e438e1fac2932c2d48e1bd389e35db391076333))

## [43.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.2.0...v43.2.1) (2022-08-08)


### Bug Fixes

* Change SASS url variable syntax to a valid one ([b157b55](https://gitlab.com/gitlab-org/gitlab-ui/commit/b157b55e4226c63e047d835da6ec4febb36e80e2))

# [43.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.1.0...v43.2.0) (2022-08-08)


### Features

* **css:** use clamp function for gl-typescale-ui ([bf8c793](https://gitlab.com/gitlab-org/gitlab-ui/commit/bf8c7935c3ec1dff836a5a13f117e355aecf3092))

# [43.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v43.0.0...v43.1.0) (2022-08-03)


### Features

* **css:** add gl-lg-flex-direction-column utility ([d05faca](https://gitlab.com/gitlab-org/gitlab-ui/commit/d05facabab8e2d8f53ba77ee52373ff1e4603121))

# [43.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.25.0...v43.0.0) (2022-08-02)


### Features

* **SafeHtml:** Extend filters to improve sanitizer ([0229418](https://gitlab.com/gitlab-org/gitlab-ui/commit/022941862a26a42cbaee0bce49d822a7e97948ea))


### BREAKING CHANGES

* **SafeHtml:** Disallow a few more potentially dangerous
@rails/ujs data-* attributes.

Pass a configuration argument to `v-safe-html` to change
this if needed.

# [42.25.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.24.1...v42.25.0) (2022-07-27)


### Features

* **css:** add gl-text-transform-capitalize utility ([4f83982](https://gitlab.com/gitlab-org/gitlab-ui/commit/4f83982f14792e26cece737b8a064bae9e33cfef))

## [42.24.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.24.0...v42.24.1) (2022-07-26)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.3.10 ([2c1da7d](https://gitlab.com/gitlab-org/gitlab-ui/commit/2c1da7dc4aa2c5647210529dd969386a467ea231))

# [42.24.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.23.1...v42.24.0) (2022-07-26)


### Features

* Add gl-min-h-0 ([82a17c1](https://gitlab.com/gitlab-org/gitlab-ui/commit/82a17c1535f211bb22feb95dfcc11f6bf55e8a87))

## [42.23.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.23.0...v42.23.1) (2022-07-25)


### Bug Fixes

* Allow auto string size value ([389400b](https://gitlab.com/gitlab-org/gitlab-ui/commit/389400b8c6c7cf6222c0222fc23c5aa917479611))

# [42.23.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.22.1...v42.23.0) (2022-07-22)


### Features

* **css:** add gl-md-ml-2 ([485c6f3](https://gitlab.com/gitlab-org/gitlab-ui/commit/485c6f37e3f934730eee8c0c1d7c58668738f385))

## [42.22.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.22.0...v42.22.1) (2022-07-19)


### Bug Fixes

* **GlTable:** adjust table caption padding ([f74c132](https://gitlab.com/gitlab-org/gitlab-ui/commit/f74c13229724070ec76534eb3f8ff37ef1f20d41))

# [42.22.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.21.0...v42.22.0) (2022-07-15)


### Features

* **css:** add gl-flex-basis-third ([e457c39](https://gitlab.com/gitlab-org/gitlab-ui/commit/e457c39a51bb0b87035bbbff52785565e0f7478e))

# [42.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.20.0...v42.21.0) (2022-07-14)


### Features

* **css:** Added background no repeat to select dropdown ([5a3fdf9](https://gitlab.com/gitlab-org/gitlab-ui/commit/5a3fdf90edf5329822afb04503e5c7bc7847c695))

# [42.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.19.0...v42.20.0) (2022-07-13)


### Features

* **css:** Updated GlFormSelect styles to match the design specs ([7ebc665](https://gitlab.com/gitlab-org/gitlab-ui/commit/7ebc66575c51cbe994c8eb198eeca5359190cac3))

# [42.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.18.1...v42.19.0) (2022-07-12)


### Features

* **css:** Add gl-display-contents utility class ([f15c3b5](https://gitlab.com/gitlab-org/gitlab-ui/commit/f15c3b504eaf259f721d53a68992da8839162edf))

## [42.18.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.18.0...v42.18.1) (2022-07-12)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.3.9 ([9148ae8](https://gitlab.com/gitlab-org/gitlab-ui/commit/9148ae8d607498ea444d8dcde9653d8ae017bc60))

# [42.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.17.0...v42.18.0) (2022-07-11)


### Features

* **GlCombobox:** Add action items ([297ed28](https://gitlab.com/gitlab-org/gitlab-ui/commit/297ed28588558229d0e2e5629875e80ec52edc32))
* **GlCombobox:** Add action items ([af4eba0](https://gitlab.com/gitlab-org/gitlab-ui/commit/af4eba02c5345e6709ef0359feeeed63659acb27))
* **GlCombobox:** Add action items ([cae7a7e](https://gitlab.com/gitlab-org/gitlab-ui/commit/cae7a7ecc7552cda29c41eb7c04dd3c59db1be0c))

# [42.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.16.0...v42.17.0) (2022-07-08)


### Features

* **GlDrawer:** add scrim for scrollable content ([c303d42](https://gitlab.com/gitlab-org/gitlab-ui/commit/c303d4225fd053bfd150e5f169ba9a595c1ba8db))

# [42.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.15.0...v42.16.0) (2022-07-07)


### Features

* adds gl-gap-5 utility ([e4e24f8](https://gitlab.com/gitlab-org/gitlab-ui/commit/e4e24f8ab67d890a58e0eb0baa04fdf9177ce8aa))

# [42.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.14.0...v42.15.0) (2022-07-07)


### Bug Fixes

* fixed token container test ([21b3ae6](https://gitlab.com/gitlab-org/gitlab-ui/commit/21b3ae6ee8c84727726893454e012551b13c16ab))


### Features

* added clear all functionality to token selector ([fcf5200](https://gitlab.com/gitlab-org/gitlab-ui/commit/fcf52007d519ededf128eff7e264c7c7507700ca))

# [42.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.13.1...v42.14.0) (2022-07-06)


### Features

* Add margin bottom auto ([d3769df](https://gitlab.com/gitlab-org/gitlab-ui/commit/d3769dfdea4af3b7fa148c06874d403478c910ea))

## [42.13.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.13.0...v42.13.1) (2022-07-06)


### Bug Fixes

* **GlCard:** Ensure given slots are rendered ([d4a8c24](https://gitlab.com/gitlab-org/gitlab-ui/commit/d4a8c24795c8dbc8eb1eab3bdfdda6675e284495))

# [42.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.12.0...v42.13.0) (2022-07-05)


### Features

* remove `gl-grid-gap-6` utility in favor of generic `gl-gap-6` ([7b6d680](https://gitlab.com/gitlab-org/gitlab-ui/commit/7b6d6808ea9ede7ba47b29560ec114bbcec5ef17))

# [42.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.11.0...v42.12.0) (2022-06-30)


### Features

* **SafeHtml:** allow non-http links in urls ([ef995ed](https://gitlab.com/gitlab-org/gitlab-ui/commit/ef995edbaeecccd8d4c6a457d1c0cf9a9a350245))

# [42.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.10.1...v42.11.0) (2022-06-29)


### Features

* **css:** add gl-mb-11 util ([0d633ce](https://gitlab.com/gitlab-org/gitlab-ui/commit/0d633ced219c5324d85314368f858e8146c9a576))
* **css:** add padding utilities ([2cef860](https://gitlab.com/gitlab-org/gitlab-ui/commit/2cef860d42ed1eb5bf4c4ea4d3a094c22d3f2b37))

## [42.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.10.0...v42.10.1) (2022-06-28)


### Bug Fixes

* **GlChart:** tooltip conflicting with datazoom ([d791719](https://gitlab.com/gitlab-org/gitlab-ui/commit/d791719638b3a20d4f175d5793648d2b57ddf47b))

# [42.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.9.0...v42.10.0) (2022-06-23)


### Bug Fixes

* **GlModal:** Re-add deprecated modal slots ([a07b701](https://gitlab.com/gitlab-org/gitlab-ui/commit/a07b7018c783951ec28d87bfe1df93b6894e5580))


### Features

* **GlFormCheckbox:** Auto-generate ID if not provided ([0a161c6](https://gitlab.com/gitlab-org/gitlab-ui/commit/0a161c65bab3d9ea32fe396b80f68bb9296d2166))

# [42.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.8.0...v42.9.0) (2022-06-22)


### Features

* **utilities:** Add new gap mixins ([96d45d9](https://gitlab.com/gitlab-org/gitlab-ui/commit/96d45d941552ce3bf63155f13b5e032bb694fdea))

# [42.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.7.0...v42.8.0) (2022-06-22)


### Features

* **GlAccordionItem:** expose header-class prop ([5f91275](https://gitlab.com/gitlab-org/gitlab-ui/commit/5f912753f027abd2036332ee583f518f7d369fdc))

# [42.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.6.0...v42.7.0) (2022-06-22)


### Features

* **css:** add margin utilities ([ea88659](https://gitlab.com/gitlab-org/gitlab-ui/commit/ea886595825520dfec97a47d6e101199d682cc92))

# [42.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.5.0...v42.6.0) (2022-06-22)


### Features

* **GlFormCombobox:** Support Object values ([8632aae](https://gitlab.com/gitlab-org/gitlab-ui/commit/8632aae819692db6ef0e952715147f1c5a71126a))

# [42.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.4.1...v42.5.0) (2022-06-20)


### Features

* **GlDrawer:** add sticky footer ([6180fdd](https://gitlab.com/gitlab-org/gitlab-ui/commit/6180fdde9d2dfd8d032dd57e6898fc56afb6c818))

## [42.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.4.0...v42.4.1) (2022-06-17)


### Bug Fixes

* **GlLabel:** Update `GlLabel` size control type ([baac1d6](https://gitlab.com/gitlab-org/gitlab-ui/commit/baac1d669fdd02d277c47b6eb611c79269ce242f))

# [42.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.3.1...v42.4.0) (2022-06-17)


### Features

* **GlLabel:** render label as text when target is empty ([911c8d6](https://gitlab.com/gitlab-org/gitlab-ui/commit/911c8d6e8c3994529f2d7cc697015ac502b6f449))

## [42.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.3.0...v42.3.1) (2022-06-17)


### Bug Fixes

* added exact modifier to tab keydown event ([7d554df](https://gitlab.com/gitlab-org/gitlab-ui/commit/7d554dfe4d7f1742d05b67a1e170f82d0928bc91))

# [42.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.2.0...v42.3.0) (2022-06-17)


### Features

* **color:** Update $gray-10 ([0ae72df](https://gitlab.com/gitlab-org/gitlab-ui/commit/0ae72df606bf75601dc2a2b772c986d92b10c99d)), closes [#f5f5f5](https://gitlab.com/gitlab-org/gitlab-ui/issues/f5f5f5)

# [42.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.1.0...v42.2.0) (2022-06-16)


### Features

* **GlAccordionItem:** expose visible state as v-model ([617c438](https://gitlab.com/gitlab-org/gitlab-ui/commit/617c4386955bf5218bb9199a1ad7c93e13745bef))

# [42.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.0.1...v42.1.0) (2022-06-16)


### Features

* **css:** Add new lg-breakpoint spacing & sizing utilities ([b82169f](https://gitlab.com/gitlab-org/gitlab-ui/commit/b82169f6a0f0176410bfd779ffbcfde03100725e))

## [42.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v42.0.0...v42.0.1) (2022-06-16)


### Bug Fixes

* GlTokenSelector: make it possible to focus input field with Tab button ([22e7de5](https://gitlab.com/gitlab-org/gitlab-ui/commit/22e7de514610d1905173804cb122145710527001))

# [42.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.10.0...v42.0.0) (2022-06-16)


### Features

* **GlButton:** Fully remove deprecated warning ([0282df0](https://gitlab.com/gitlab-org/gitlab-ui/commit/0282df0cd3dddb0068409d006469e3dbe0bf0260))


### BREAKING CHANGES

* **GlButton:** The warning variant had been deprecated for some time.
This fully removes it from the codebase.

# [41.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.9.1...v41.10.0) (2022-06-15)


### Features

* **GlTokenSelector:** add empty and readonly states ([e0b60a7](https://gitlab.com/gitlab-org/gitlab-ui/commit/e0b60a7cb24875e62e57c76963135e324b6bfa11))

## [41.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.9.0...v41.9.1) (2022-06-15)


### Bug Fixes

* **GlTabs:** Unbreak title-link-attributes prop ([7469669](https://gitlab.com/gitlab-org/gitlab-ui/commit/7469669fae0e626524fbad495f95cf7465ce775c))


### Reverts

* **GlTab:** Pass custom href to BTab ([ecefbce](https://gitlab.com/gitlab-org/gitlab-ui/commit/ecefbcec720fe37e7aed27ff2a6d3dda4857cf11)), closes [/gitlab.com/gitlab-org/gitlab/-/merge_requests/88974#note_991250502](https://gitlab.com//gitlab.com/gitlab-org/gitlab/-/merge_requests/88974/issues/note_991250502) [/gitlab.com/gitlab-org/gitlab-ui/-/issues/1578#note_991239559](https://gitlab.com//gitlab.com/gitlab-org/gitlab-ui/-/issues/1578/issues/note_991239559)

# [41.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.8.0...v41.9.0) (2022-06-14)


### Features

* **css:** Add sm variant of display table cell ([807016f](https://gitlab.com/gitlab-org/gitlab-ui/commit/807016f5919b181b3da5501363f3aa49fe80589c))

# [41.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.7.1...v41.8.0) (2022-06-14)


### Features

* **Tabs:** Use unique href for each tab ([171664d](https://gitlab.com/gitlab-org/gitlab-ui/commit/171664d2b5d74cc0bca174637705d89fc6197344))

## [41.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.7.0...v41.7.1) (2022-06-13)


### Bug Fixes

* **GlModal:** Re-add deprecated modal slots ([29b7ccf](https://gitlab.com/gitlab-org/gitlab-ui/commit/29b7ccf4623de391192bce75ad176d38e10de3f1))


### Reverts

* **GlModal:** Remove deprecated slots modal-ok and modal-cancel ([1d2cc9e](https://gitlab.com/gitlab-org/gitlab-ui/commit/1d2cc9e06b5011cd4c8155b5b37db570f8a6b581)), closes [/gitlab.com/gitlab-org/gitlab/-/merge_requests/88974#note_988604141](https://gitlab.com//gitlab.com/gitlab-org/gitlab/-/merge_requests/88974/issues/note_988604141)

# [41.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.6.0...v41.7.0) (2022-06-13)


### Features

* Add gl-background-filter-blur class ([9f65dfb](https://gitlab.com/gitlab-org/gitlab-ui/commit/9f65dfb27fe55f75109d3863fc073e23195636c2))

# [41.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.5.0...v41.6.0) (2022-06-13)


### Features

* Add gl-max-w-34 and gl-max-w-80 ([838c233](https://gitlab.com/gitlab-org/gitlab-ui/commit/838c2332b113ed0bd2ec296088e8fdba670e1a4e))

# [41.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.4.0...v41.5.0) (2022-06-06)


### Features

* **GlAvatarLabeled:** Add default slot ([ba69571](https://gitlab.com/gitlab-org/gitlab-ui/commit/ba69571945032ef5e27a49da40444180b786a651))

# [41.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.3.0...v41.4.0) (2022-06-06)


### Features

* **css:** add gl-ml-n3 util class ([cc97cd7](https://gitlab.com/gitlab-org/gitlab-ui/commit/cc97cd76bccb660647174073b818a2f593569969))

# [41.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.2.0...v41.3.0) (2022-06-03)


### Features

* **css:** Add md variant of display table cell ([ced2312](https://gitlab.com/gitlab-org/gitlab-ui/commit/ced2312c0c3009676dab1e611587a7581671203a))

# [41.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.1.0...v41.2.0) (2022-06-03)


### Features

* Update echarts for performance ([60bce47](https://gitlab.com/gitlab-org/gitlab-ui/commit/60bce47bb635c59d11c159652a39345a7e9b3596))

# [41.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v41.0.0...v41.1.0) (2022-06-01)


### Features

* **GlDrawer:** add sticky header ([41f65c2](https://gitlab.com/gitlab-org/gitlab-ui/commit/41f65c2de83a6316e699c0acab9902dfc08ceec3))

# [41.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.7.1...v41.0.0) (2022-05-31)


### Features

* **GlModal:** Remove deprecated slots modal-ok and modal-cancel ([7e116ec](https://gitlab.com/gitlab-org/gitlab-ui/commit/7e116ec5295d21a2afefc157c57312a733459bbd))


### BREAKING CHANGES

* **GlModal:** This removes the modal-ok and modal-cancel slots from
the modal component. These slots have been deprecated and are now no
longer supported.

Use the props `action-primary`, `action-secondary` and `action-cancel`
instead.

## [40.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.7.0...v40.7.1) (2022-05-31)


### Bug Fixes

* **GlToggle:** Fix overflow of long help text ([8947400](https://gitlab.com/gitlab-org/gitlab-ui/commit/89474002e1f9333675ac6ed626277a18595d9d89))

# [40.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.6.6...v40.7.0) (2022-05-31)


### Features

* **GlSingleStat:** support string and number for value prop ([9217ee4](https://gitlab.com/gitlab-org/gitlab-ui/commit/9217ee42c9b54e04a8c98c56c50f9018896bc32d))

## [40.6.6](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.6.5...v40.6.6) (2022-05-30)


### Bug Fixes

* **GlToggle:** toggle label left direction ([2fb4082](https://gitlab.com/gitlab-org/gitlab-ui/commit/2fb40821cdd647462c804c7a8bfb50fc0fc3dabf))

## [40.6.5](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.6.4...v40.6.5) (2022-05-25)


### Bug Fixes

* **GlSearchBoxByClick, GlFilteredSearch:** Update styles regression ([141df1d](https://gitlab.com/gitlab-org/gitlab-ui/commit/141df1ddd9cff2700921d2b751eecb58817dc71c))

## [40.6.4](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.6.3...v40.6.4) (2022-05-25)


### Bug Fixes

* **GlFormGroup:** Fix valid state styling ([8081800](https://gitlab.com/gitlab-org/gitlab-ui/commit/8081800ce1edf6199e61a7a4669e5845d6f3c2a9))

## [40.6.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.6.2...v40.6.3) (2022-05-24)


### Bug Fixes

* Set story container height with decorator ([672f6f9](https://gitlab.com/gitlab-org/gitlab-ui/commit/672f6f948710db39fad59b6a0da673783ce63bc5))

## [40.6.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.6.1...v40.6.2) (2022-05-19)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.3.8 ([77775b9](https://gitlab.com/gitlab-org/gitlab-ui/commit/77775b9a62d3fdf05f90072ce9b3a82b19c18265))

## [40.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.6.0...v40.6.1) (2022-05-19)


### Bug Fixes

* **GlToggle:** Show help text from slot ([c531c4c](https://gitlab.com/gitlab-org/gitlab-ui/commit/c531c4c16ea68cd607c57c44778207e983fa59d2))

# [40.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.5.0...v40.6.0) (2022-05-19)


### Features

* **GlLineChart:** allow chart legend to be hidden ([8d9fa8b](https://gitlab.com/gitlab-org/gitlab-ui/commit/8d9fa8b1c352a8894b3e36509402e4388380ffb0))

# [40.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.4.0...v40.5.0) (2022-05-18)


### Features

* **add billing plan colors:** Add utility classes used in billing page ([61de498](https://gitlab.com/gitlab-org/gitlab-ui/commit/61de4980842a1045215f91a7e100cd66e2074fcc))

# [40.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.3.0...v40.4.0) (2022-05-17)


### Features

* **GlAvatar:** add responsive size support ([bded2c9](https://gitlab.com/gitlab-org/gitlab-ui/commit/bded2c962b40e942a1b0edb2a085d47a3fa91b4e))

# [40.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.2.2...v40.3.0) (2022-05-17)


### Features

* **css:** Implement Markdown table styles ([e2750a6](https://gitlab.com/gitlab-org/gitlab-ui/commit/e2750a6fa61854acdca79838954d7aa305be6f78))

## [40.2.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.2.1...v40.2.2) (2022-05-16)


### Bug Fixes

* Fix condition for feedback text ([208deab](https://gitlab.com/gitlab-org/gitlab-ui/commit/208deabae0b8f2da529f303408f7cc1568008672))
* **GlFormGroup:** Make selector more robust ([eb5c4f4](https://gitlab.com/gitlab-org/gitlab-ui/commit/eb5c4f4e85088a95d8a2e067e5d4be5fba5d560c))

## [40.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.2.0...v40.2.1) (2022-05-12)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.3.7 ([34e6d25](https://gitlab.com/gitlab-org/gitlab-ui/commit/34e6d25a92ad2c628225261b12b264e09ad55bc5))

# [40.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.1.0...v40.2.0) (2022-05-11)


### Features

* **css:** Add gl-mb-n3 util class ([bbd4a5b](https://gitlab.com/gitlab-org/gitlab-ui/commit/bbd4a5b2fa163c83d24870fc54113d7961b1d248))
* **css:** Add gl-sm-ml-7 ([4c84efb](https://gitlab.com/gitlab-org/gitlab-ui/commit/4c84efbbb842bec7496ccc6f532dd257205110b0))

# [40.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v40.0.0...v40.1.0) (2022-05-10)


### Features

* **CSS:** Add `gl-overflow-wrap-anywhere` utility class ([1a19196](https://gitlab.com/gitlab-org/gitlab-ui/commit/1a19196cc1ac3e6a2dbcc87624963bee8a95db26))

# [40.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.7.1...v40.0.0) (2022-05-06)


### chore

* **GlSkeletonLoading:** Remove non-deprecated name ([beec89a](https://gitlab.com/gitlab-org/gitlab-ui/commit/beec89ab0f6a144b39b3ac1c7060d0136b8de116))


### Features

* **GlFormInput:** add responsive size support ([90dda3c](https://gitlab.com/gitlab-org/gitlab-ui/commit/90dda3c2c8f617478f8b9f64831cf74dfb317708))


### BREAKING CHANGES

* **GlSkeletonLoading:** This removes the non-deprecated export
`GlSkeletonLoading`. Users of this component should import
`GlDeprecatedSkeletonLoading` instead, which is identical.

This is part of https://gitlab.com/groups/gitlab-org/-/epics/4301. See
also https://gitlab.com/gitlab-org/gitlab/-/merge_requests/83982.

## [39.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.7.0...v39.7.1) (2022-05-04)


### Bug Fixes

* **GlInfiniteScroll:** Fix GlInfiniteScroll not firing bottomReached event in some cases ([d4c8d91](https://gitlab.com/gitlab-org/gitlab-ui/commit/d4c8d91aa913133ac8d3d55ab351a4660a5c2f2b))

# [39.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.6.1...v39.7.0) (2022-05-03)


### Features

* **GlTab:** add tab counter badge variants ([b4f6cfe](https://gitlab.com/gitlab-org/gitlab-ui/commit/b4f6cfe3880d444adc0bf40c403f1a3b49d39016))

## [39.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.6.0...v39.6.1) (2022-05-03)


### Bug Fixes

* **GlModal:** Fix modal backdrop color in dark mode ([5f8bf77](https://gitlab.com/gitlab-org/gitlab-ui/commit/5f8bf77adc7c7dc66d6d5f709e3842ae87530193))

# [39.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.5.1...v39.6.0) (2022-05-03)


### Features

* **css:** Implement blockquote styles ([6297a38](https://gitlab.com/gitlab-org/gitlab-ui/commit/6297a3853aff81fdfd98af223cfc17fd29888829))

## [39.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.5.0...v39.5.1) (2022-05-03)


### Bug Fixes

* **GlFilteredSearch:** cursorPosition prop not required ([ff3b3e0](https://gitlab.com/gitlab-org/gitlab-ui/commit/ff3b3e03199d703d0251e1b751bee30a942852cf))

# [39.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.4.0...v39.5.0) (2022-05-02)


### Bug Fixes

* **Alert:** Change title heading level from 4 to 2 ([0d69125](https://gitlab.com/gitlab-org/gitlab-ui/commit/0d69125fd7ef23ef6fe8eeb2d5395b6dc5dbde09))


### Features

* Add gl--flex-center composite class ([d1b3153](https://gitlab.com/gitlab-org/gitlab-ui/commit/d1b315356dfb07e718d67df0c16d0e43c48c1f55))

# [39.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.3.2...v39.4.0) (2022-04-28)


### Features

* **GlListbox:** create listbox component ([dcc7eae](https://gitlab.com/gitlab-org/gitlab-ui/commit/dcc7eae54db81de1c922857c990f89ceb0e1c694))

## [39.3.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.3.1...v39.3.2) (2022-04-27)


### Bug Fixes

* **GlButton:** Fix button text color in dark mode ([61267e3](https://gitlab.com/gitlab-org/gitlab-ui/commit/61267e3ce3c80d0592e5fe7e6458c86ab6ff3979))

## [39.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.3.0...v39.3.1) (2022-04-26)


### Bug Fixes

* **GlModal:** Ensure modal dialog has an accessible name ([5b35a67](https://gitlab.com/gitlab-org/gitlab-ui/commit/5b35a6757c510740191d336b14eeed71886a2066))

# [39.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.2.1...v39.3.0) (2022-04-26)


### Features

* **focus:** Improve :focus styles ([9fb0d1d](https://gitlab.com/gitlab-org/gitlab-ui/commit/9fb0d1d440a65dde28ae220870dfc001e2b28990))

## [39.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.2.0...v39.2.1) (2022-04-25)


### Bug Fixes

* **GlDropdown:** correct small button spacing ([bfed939](https://gitlab.com/gitlab-org/gitlab-ui/commit/bfed939fb34acf25162f6ef5b42591d00071886b))

# [39.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.1.0...v39.2.0) (2022-04-25)


### Features

* **GlAlert:** Add support for hiding variant icon ([2c5f3a6](https://gitlab.com/gitlab-org/gitlab-ui/commit/2c5f3a67babfc3ddd6f1b5940e11154fdef5902d))

# [39.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v39.0.0...v39.1.0) (2022-04-22)


### Features

* **GlTable:** Add vertical-align: top to table th and td ([4dc5c31](https://gitlab.com/gitlab-org/gitlab-ui/commit/4dc5c318a9c6693e393dce6d12073ad296db928e)), closes [/gitlab.com/gitlab-org/gitlab-ui/-/issues/1759#note_900275198](https://gitlab.com//gitlab.com/gitlab-org/gitlab-ui/-/issues/1759/issues/note_900275198)
* **GlTable:** Update text color and borders ([1379638](https://gitlab.com/gitlab-org/gitlab-ui/commit/137963838f99427ddb271bd7e4204a92dd438fae))

# [39.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.12.0...v39.0.0) (2022-04-21)


### Reverts

* add character counter to gl-form-textarea ([70a7a3f](https://gitlab.com/gitlab-org/gitlab-ui/commit/70a7a3fd9c2729b739020d167043490da72a556b))


### BREAKING CHANGES

* The feature added in
https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/2738 has been
removed, as it causes complications regarding a validator used in
GitLab. This feature will be reconsidered and re-implemented later.

# [38.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.11.0...v38.12.0) (2022-04-21)


### Bug Fixes

* **Alert:** change Dismiss button DOM order ([5afc9a4](https://gitlab.com/gitlab-org/gitlab-ui/commit/5afc9a4b7f6585d30a09914021219492644b2571))


### Features

* **checkbox:** Fix disabled custom control color ([ddcdca9](https://gitlab.com/gitlab-org/gitlab-ui/commit/ddcdca9b5d192cfe1c3710e73ae31c07fac6bd75))

# [38.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.10.2...v38.11.0) (2022-04-18)


### Features

* **GlFilteredSearch:** Allow token navigation with arrows ([80844aa](https://gitlab.com/gitlab-org/gitlab-ui/commit/80844aac908452e626d1c3e4fb0c9aef9c8a5e25))
* **GlFilteredSearch:** Allow token navigation with arrows ([b7d1519](https://gitlab.com/gitlab-org/gitlab-ui/commit/b7d15196145f53bb5d7be0361e7d7a692c2b5dc4))
* **GlFilteredSearch:** Allow token navigation with arrows ([9f2a449](https://gitlab.com/gitlab-org/gitlab-ui/commit/9f2a44951657a4aeaaa162f1bd31d60231eb8be1))

## [38.10.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.10.1...v38.10.2) (2022-04-14)


### Bug Fixes

* **ChartTooltip:** restore right placement by default ([4dfed07](https://gitlab.com/gitlab-org/gitlab-ui/commit/4dfed07d69cc50b59c950f85cda2fe8ef11b7a03))

## [38.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.10.0...v38.10.1) (2022-04-14)


### Bug Fixes

* **GlToast:** Event listener memory leak ([b799657](https://gitlab.com/gitlab-org/gitlab-ui/commit/b7996570d3f675c4ee11cc0eb26f2aa0a6fda817))

# [38.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.9.0...v38.10.0) (2022-04-13)


### Bug Fixes

* **GlPopover:** Remove horizontal border ([f40c030](https://gitlab.com/gitlab-org/gitlab-ui/commit/f40c030c429fc76c7dd9dcb3ff7aeaa6f889d653))


### Features

* **CSS:** Add new utility CSS classes ([19e3dd6](https://gitlab.com/gitlab-org/gitlab-ui/commit/19e3dd63eef519e85264391cf3a95ecf038c2f07))
* **GlPopover:** top placement by default ([705dfe4](https://gitlab.com/gitlab-org/gitlab-ui/commit/705dfe412200581620c78011612de451d22ece55))

# [38.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.8.2...v38.9.0) (2022-04-12)


### Features

* add a character counter to gl-form-textarea ([1d45d26](https://gitlab.com/gitlab-org/gitlab-ui/commit/1d45d26ad384b85589154100664da2c4eb204499))

## [38.8.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.8.1...v38.8.2) (2022-04-08)


### Bug Fixes

* **Label:** Move tooltip to anchor instead of span ([67d0e79](https://gitlab.com/gitlab-org/gitlab-ui/commit/67d0e79bb57409d63e32fd3efffc95dc534c3421))

## [38.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.8.0...v38.8.1) (2022-04-08)


### Bug Fixes

* Force a new release for revert ([c983975](https://gitlab.com/gitlab-org/gitlab-ui/commit/c98397525d3f64628a661b00850f3733338c02f2))


### Reverts

* **GlChartSeriesLabel:** Add validation for type prop ([f971aab](https://gitlab.com/gitlab-org/gitlab-ui/commit/f971aab4b08d2f3481f7c1a9cbf0454124d75b39)), closes [/gitlab.com/gitlab-org/gitlab/-/merge_requests/83745#note_905812358](https://gitlab.com//gitlab.com/gitlab-org/gitlab/-/merge_requests/83745/issues/note_905812358)

# [38.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.7.0...v38.8.0) (2022-04-08)


### Features

* **GlFilteredSearch:** Allow to pass token dynamically ([ec35908](https://gitlab.com/gitlab-org/gitlab-ui/commit/ec359089f6ae9167c886037bf1b755b13b25d3fb))

# [38.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.6.0...v38.7.0) (2022-04-08)


### Features

* **css:** Fix readonly input color and cursor ([cce807f](https://gitlab.com/gitlab-org/gitlab-ui/commit/cce807f420c760731231bc924d0806cb29d3d021))

# [38.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.5.1...v38.6.0) (2022-04-06)


### Features

* **css:** Add md-max-w-26, md-white-space-nowrap ([bae43c3](https://gitlab.com/gitlab-org/gitlab-ui/commit/bae43c3d64612386b7fd38a8673062155bad4157))

## [38.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.5.0...v38.5.1) (2022-04-06)


### Bug Fixes

* **GlDatepicker:** fix prop name typo ([973a560](https://gitlab.com/gitlab-org/gitlab-ui/commit/973a56045daa15b7f0809911d34b587025214b76))

# [38.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.4.0...v38.5.0) (2022-04-05)


### Features

* **GlFilteredSearch:** Allow to pass token dynamically ([7c85ea1](https://gitlab.com/gitlab-org/gitlab-ui/commit/7c85ea19c3ffb821fdb4f5f6409e4db816de304e))
* **GlFilteredSearch:** Allow to pass token dynamically ([38f67eb](https://gitlab.com/gitlab-org/gitlab-ui/commit/38f67eb3df2369f39e1323c1a5c90ab2f7b13847))

# [38.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.3.0...v38.4.0) (2022-04-04)


### Features

* **css:** Add gl-sm-ml-auto util class ([3d9b37e](https://gitlab.com/gitlab-org/gitlab-ui/commit/3d9b37e2c39ece4ffabfcef08b7e82b93c0f7af1))

# [38.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.2.1...v38.3.0) (2022-04-04)


### Features

* **css:** Add responsive display inline classes ([21a6358](https://gitlab.com/gitlab-org/gitlab-ui/commit/21a6358266f0183f4b3b0c8b90dc379f3ab8d3a3))

## [38.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.2.0...v38.2.1) (2022-04-01)


### Bug Fixes

* **GlFilteredSearch:** Generate stable token keys ([88dccde](https://gitlab.com/gitlab-org/gitlab-ui/commit/88dccde9f4df1352a7e06e831de8baced4a8d18f))

# [38.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.1.0...v38.2.0) (2022-03-31)


### Bug Fixes

* **GlFilteredSearch:** Stop mutating value prop ([79aa5bc](https://gitlab.com/gitlab-org/gitlab-ui/commit/79aa5bc9712e293e08842c8c0234e29511de3401))
* **GlFilteredSearch:** Stop mutating value prop ([31808db](https://gitlab.com/gitlab-org/gitlab-ui/commit/31808dbcf6b3c412db7191fe12317009b0d95542))


### Features

* **audio:** Implementation of GitLab Flavoured Markdown audio styles ([e4c613f](https://gitlab.com/gitlab-org/gitlab-ui/commit/e4c613f0892b7b1bf3bd97b17e64e4d2e6492ebe))

# [38.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.0.1...v38.1.0) (2022-03-28)


### Features

* **GlBreadcrumbItem:** implement custom component, add `aria-current="page"` to the last breadcrumb link ([6c246e4](https://gitlab.com/gitlab-org/gitlab-ui/commit/6c246e49d3132be4f0f4d70b0f358af4622a27f6))

## [38.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v38.0.0...v38.0.1) (2022-03-21)


### Bug Fixes

* **GlFormRadio:** prevent double emitting events ([208e251](https://gitlab.com/gitlab-org/gitlab-ui/commit/208e2512a1065e1d9b12a51269209a2e52cc835e))

# [38.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.10.0...v38.0.0) (2022-03-18)


### Reverts

* **GlFilteredSearch:** Allow to pass token dynamically ([0dcfb53](https://gitlab.com/gitlab-org/gitlab-ui/commit/0dcfb5300f80ee821f16ab62fd655c7e4f141ffe)), closes [/gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/2715#note_878880409](https://gitlab.com//gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/2715/issues/note_878880409)
* **GlTruncate:** add slots to surround the text ([ed4aa40](https://gitlab.com/gitlab-org/gitlab-ui/commit/ed4aa40ed8c3e748f78e78d2e312a8be9ffb9833))


### BREAKING CHANGES

* **GlFilteredSearch:** This makes the `value` prop of `GlFilteredSearch`
static again, so that it is only read once at mount.
* **GlTruncate:** This drops the before-text and after-text slots from
GlTruncate.

# [37.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.9.1...v37.10.0) (2022-03-18)


### Features

* **css:** Add more grid utilities ([35feb73](https://gitlab.com/gitlab-org/gitlab-ui/commit/35feb731a56e4de2e783c7f4931d3726c979bb2c))

## [37.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.9.0...v37.9.1) (2022-03-16)


### Bug Fixes

* **GlFilteredSearch:** Keep active state on backspace on first token ([bd241df](https://gitlab.com/gitlab-org/gitlab-ui/commit/bd241dfbbd87064c10a67f0a0857b54542362605))

# [37.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.8.0...v37.9.0) (2022-03-15)


### Features

* **GlTruncate:** add slots to surround the text ([4a79750](https://gitlab.com/gitlab-org/gitlab-ui/commit/4a797503c85ac755e7dd4df1b2d46e95f3102e04))

# [37.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.7.0...v37.8.0) (2022-03-15)


### Features

* **GlFilteredSearch:** Allow to pass token dynamically ([247ea01](https://gitlab.com/gitlab-org/gitlab-ui/commit/247ea011487a1ab0087d994cdb994c9c553565eb))

# [37.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.6.0...v37.7.0) (2022-03-14)


### Features

* **EmptyState:** Invert empty state illustrations in dark mode ([3112d43](https://gitlab.com/gitlab-org/gitlab-ui/commit/3112d43ac5ffba58a6ed3357c87e43d8ad10363d))

# [37.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.5.2...v37.6.0) (2022-03-11)


### Features

* **css:** Add a 600 red left inset border of size 3 ([5b37b86](https://gitlab.com/gitlab-org/gitlab-ui/commit/5b37b86e80179e56a9d7961c04ad4de6c8183205))

## [37.5.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.5.1...v37.5.2) (2022-03-11)


### Bug Fixes

* **GlFilteredSearch:** Token activation after destruction ([40b0513](https://gitlab.com/gitlab-org/gitlab-ui/commit/40b051307065ff29fea53ad65457d6b99f116c92))

## [37.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.5.0...v37.5.1) (2022-03-10)


### Bug Fixes

* **GlDropdown:** spinner replaces icon when icon dropdown is loading ([027a8a7](https://gitlab.com/gitlab-org/gitlab-ui/commit/027a8a7011c336b7c2562e4e839d4d8b4f7a4fe9))

# [37.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.4.2...v37.5.0) (2022-03-10)


### Bug Fixes

* **GlDropdown:** Wrap text in dropdown section header ([1408742](https://gitlab.com/gitlab-org/gitlab-ui/commit/140874226a351da03522b7b45ef4428443162a79))


### Features

* **GlAccordionItem:** Add titleVisible property ([f8626aa](https://gitlab.com/gitlab-org/gitlab-ui/commit/f8626aa2a343d4159efddf6aacbdbaad6593eb27))

## [37.4.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.4.1...v37.4.2) (2022-03-09)


### Bug Fixes

* **GlFilteredSearch:** fix duplicate input attributes ([ea498b9](https://gitlab.com/gitlab-org/gitlab-ui/commit/ea498b9d114c86804d2885b645770ce53d178f4d))

## [37.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.4.0...v37.4.1) (2022-03-07)


### Bug Fixes

* **danger:** fix conventional commits url ([7ec70ef](https://gitlab.com/gitlab-org/gitlab-ui/commit/7ec70efae259272d2bd19654eaab64a33ab98fad))

# [37.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.3.0...v37.4.0) (2022-03-07)


### Features

* **GlButton:** Update selected state background ([b9e3116](https://gitlab.com/gitlab-org/gitlab-ui/commit/b9e31166ee8a43c2ea09c2f4a9cafd9e71e222d8))
* **GlButton:** Update selected state design ([a5ebf70](https://gitlab.com/gitlab-org/gitlab-ui/commit/a5ebf701e38fd32ff965af33c30319e4c7f2edc5))

# [37.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.2.0...v37.3.0) (2022-03-03)


### Features

* **css:** Add gl-bg-purple-50 util class ([29acbbb](https://gitlab.com/gitlab-org/gitlab-ui/commit/29acbbbe7726f763b0e7ba86dc4de74db45a545e))

# [37.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.1.0...v37.2.0) (2022-03-03)


### Features

* **GlPath:** allow changing selected index programmatically ([d711441](https://gitlab.com/gitlab-org/gitlab-ui/commit/d71144162363ae62ff4d1aeb3ee3dc956bd04108))

# [37.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v37.0.0...v37.1.0) (2022-02-28)


### Features

* **GlPagination:** Add aria-current="page" on active page ([58b8993](https://gitlab.com/gitlab-org/gitlab-ui/commit/58b89935c32845406d85ce5898c501908e25d8ff))

# [37.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v36.7.1...v37.0.0) (2022-02-22)


### Features

* **GlAlert:** drop contained behavior ([a2ae17e](https://gitlab.com/gitlab-org/gitlab-ui/commit/a2ae17eeb80eb9ea399b9f93047fc71764a3e1cb))


### BREAKING CHANGES

* **GlAlert:** This drops GlAlert's contained behavior.

Alerts content width cannot be constrainted with the `contained` prop
anymore. Existing alerts' content will exapnd to the take up the alert's
full width.
You should consider removing all `contained` usages from your code.
`

## [36.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v36.7.0...v36.7.1) (2022-02-18)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.3.6 ([266b5a7](https://gitlab.com/gitlab-org/gitlab-ui/commit/266b5a7deb3496c80418fa6d39e944ddab4cab0d))

# [36.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v36.6.0...v36.7.0) (2022-02-17)


### Features

* **pagination:** Remove abbreviation from prev text ([f959077](https://gitlab.com/gitlab-org/gitlab-ui/commit/f959077da8ec3bf2107f2229a25fd09ff6771993))

# [36.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v36.5.1...v36.6.0) (2022-02-14)


### Features

* **css:** Add shorthand border util classes ([318c99c](https://gitlab.com/gitlab-org/gitlab-ui/commit/318c99c4764b7cc889a4b97d93215ab322b03025))

## [36.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v36.5.0...v36.5.1) (2022-02-11)


### Bug Fixes

* **breadcrumb:** Use sentence case for examples ([ace4a4f](https://gitlab.com/gitlab-org/gitlab-ui/commit/ace4a4fa048131c768b0442ac0b677f20258446a))

# [36.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v36.4.0...v36.5.0) (2022-02-10)


### Features

* **css:** add grid template columns utility class ([4e97584](https://gitlab.com/gitlab-org/gitlab-ui/commit/4e975849f61eea7999a486257c417b87e60bee24))

# [36.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v36.3.0...v36.4.0) (2022-02-09)


### Features

* **GlEmptyState:** make title into a slot ([45bacac](https://gitlab.com/gitlab-org/gitlab-ui/commit/45bacac972a7c4748e1fc96e1605615f816cb8ed))

# [36.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v36.2.0...v36.3.0) (2022-02-08)


### Features

* **utilities:** add gl-md-px-7 utility ([417cadc](https://gitlab.com/gitlab-org/gitlab-ui/commit/417cadc1c9cd91c197903469c8be32ff138e31f1))

# [36.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v36.1.0...v36.2.0) (2022-02-08)


### Features

* **css:** add color transparent utility ([2f20c33](https://gitlab.com/gitlab-org/gitlab-ui/commit/2f20c3342a655367942c7ad761aa2fef91f0bd8d))

# [36.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v36.0.0...v36.1.0) (2022-02-08)


### Features

* **GlFilteredSearch:** add props for adding additional HTML attributes ([b26ea14](https://gitlab.com/gitlab-org/gitlab-ui/commit/b26ea14b818cef389c48617cb3443ae493cc49aa))

# [36.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v35.1.0...v36.0.0) (2022-02-07)


### Code Refactoring

* Move entry points to src/ ([7226b2d](https://gitlab.com/gitlab-org/gitlab-ui/commit/7226b2df695ea1c25b4083739a8ff71bc01433b8))


### BREAKING CHANGES

* If you consumed GitLab UI from source (e.g.
`@gitlab/ui/index.js`, you need to adjust the import to
`@gitlab/ui/src/index.js`

# [35.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v35.0.0...v35.1.0) (2022-02-04)


### Features

* **GlModal:** unbox component by removing borders ([03598c9](https://gitlab.com/gitlab-org/gitlab-ui/commit/03598c984a2df4867a8d356bf82a4e9343450275))

# [35.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v34.0.0...v35.0.0) (2022-01-31)


### Features

* **GlTabs:** Apply theme via CSS custom property ([beaf2bc](https://gitlab.com/gitlab-org/gitlab-ui/commit/beaf2bc4aa9fb26f6aa212fdec614fd8d3003c47))
* **GlTabs:** Remove theme prop ([3de63e6](https://gitlab.com/gitlab-org/gitlab-ui/commit/3de63e60426052731a626330168091466d8894ba))


### BREAKING CHANGES

* **GlTabs:** The theme prop of `GlTabs` has been removed. Instead,
the theme color is set automatically according to the
`--gl-theme-accent` CSS custom property.

Part of https://gitlab.com/gitlab-org/gitlab-ui/-/issues/1683.

# [34.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v33.1.2...v34.0.0) (2022-01-28)


### Features

* **GlAvatarsInline:** Add badgeSrOnlyText prop ([bcb0d29](https://gitlab.com/gitlab-org/gitlab-ui/commit/bcb0d299e9468e13cc7d565784388e3b9585e4a0))


### BREAKING CHANGES

* **GlAvatarsInline:** This change adds a required
property named badgeSrOnlyText that ensures
that badge displayed when avatars inline is
collapsed, provides a screen reader only
label that gives contextual information
for users that use this form factor

## [33.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v33.1.1...v33.1.2) (2022-01-27)


### Bug Fixes

* Add a workaround for GlAccordion compatibility with Vue Apollo ([55deabf](https://gitlab.com/gitlab-org/gitlab-ui/commit/55deabf3260643079e20db1ad2787980afdd8e56))

## [33.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v33.1.0...v33.1.1) (2022-01-27)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.3.5 ([0bced05](https://gitlab.com/gitlab-org/gitlab-ui/commit/0bced051c61365c77cd4e4369b8838677217a46b))

# [33.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v33.0.1...v33.1.0) (2022-01-26)


### Features

* **GlPopover:** add support for a close button ([583be0b](https://gitlab.com/gitlab-org/gitlab-ui/commit/583be0bd76f5c72384c19fe0eeeb4bc334eb58be))

## [33.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v33.0.0...v33.0.1) (2022-01-26)


### Bug Fixes

* **GlSearchBox*:** Hide Chrome's cancel button ([387df0a](https://gitlab.com/gitlab-org/gitlab-ui/commit/387df0aecaa1e21efaacb25ed8e2ea5187e46fd2))

# [33.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.68.0...v33.0.0) (2022-01-21)


### Bug Fixes

* **css:** rename and remove invalid CSS utils ([6cbde8b](https://gitlab.com/gitlab-org/gitlab-ui/commit/6cbde8bf451d64ce0e6d03bc47ce5cb46ed4f665))


### BREAKING CHANGES

* **css:** this removes a few CSS utils that were incorrectly
named in favor of new ones that follow the naming conventions.
If you were using any of the removed utils, please migrate to the new
ones:

* gl-flex-sm-wrap was replaced with gl-sm-flex-wrap.
* gl-justify-content-md-start was replaced with
  gl-md-justify-content-start.
* gl-pt-md-2 was replaced with gl-md-pt-2.
* gl-mt-md-n2 was replaced with gl-md-mt-n2.

# [32.68.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.67.0...v32.68.0) (2022-01-19)


### Features

* **css:** Added gl-w-grid-size-28 utility class ([e7a29b4](https://gitlab.com/gitlab-org/gitlab-ui/commit/e7a29b49bd981eea65ea38550872a3258ba29e67))

# [32.67.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.66.0...v32.67.0) (2022-01-19)


### Features

* **css:** Added gl-md-max-w-15p, gl-lg-max-w-80p ([1f44794](https://gitlab.com/gitlab-org/gitlab-ui/commit/1f447940a0c3661f623db689b0d5593c501030ae)), closes [/gitlab.com/gitlab-org/gitlab/-/merge_requests/74643#note_737689310](https://gitlab.com//gitlab.com/gitlab-org/gitlab/-/merge_requests/74643/issues/note_737689310) [/gitlab.com/gitlab-org/gitlab/-/merge_requests/74643#note_764054257](https://gitlab.com//gitlab.com/gitlab-org/gitlab/-/merge_requests/74643/issues/note_764054257)

# [32.66.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.65.1...v32.66.0) (2022-01-18)


### Features

* **utilities:** add gl-gap-x-5 utility ([ddd8829](https://gitlab.com/gitlab-org/gitlab-ui/commit/ddd88294b02c06d14d7f030b4a3e1bf1ab72f8be))

## [32.65.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.65.0...v32.65.1) (2022-01-18)


### Bug Fixes

* **css:** Fixes for the justify-content utility for small screens ([0f417f0](https://gitlab.com/gitlab-org/gitlab-ui/commit/0f417f01988ab634496d925362d06889c18bbd84))

# [32.65.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.64.1...v32.65.0) (2022-01-17)


### Features

* **css:** Added gl-opacity-6 & gl-opacity-7 utility classes ([e0afd43](https://gitlab.com/gitlab-org/gitlab-ui/commit/e0afd433203f59e0085ef916d00c65391906572d))

## [32.64.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.64.0...v32.64.1) (2022-01-17)


### Bug Fixes

* **utilities:** only apply gap to children ([076b4ba](https://gitlab.com/gitlab-org/gitlab-ui/commit/076b4ba3adb71b1001364f8f15acc73c556c65e0))

# [32.64.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.63.0...v32.64.0) (2022-01-17)


### Features

* **css:** Add spacing util classes ([1adb2d5](https://gitlab.com/gitlab-org/gitlab-ui/commit/1adb2d51fa10042c617303b22f257f0080c7ff4a))

# [32.63.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.62.0...v32.63.0) (2022-01-17)


### Features

* **css:** Addition of gl-md-flex-direction-column class ([0b0b105](https://gitlab.com/gitlab-org/gitlab-ui/commit/0b0b1059de42239697c3bf12fd60873fad69d93a))

# [32.62.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.61.0...v32.62.0) (2022-01-17)


### Features

* **css:** Addition of `gl-line-height-42` SCSS utility ([7e4a603](https://gitlab.com/gitlab-org/gitlab-ui/commit/7e4a60394bf394a3660638d49f219711dd10937e))

# [32.61.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.60.0...v32.61.0) (2022-01-14)


### Features

* **utilities:** add gl-md-pl-7 ([237a6bc](https://gitlab.com/gitlab-org/gitlab-ui/commit/237a6bc33fa7d209e5fb44b573ae0006a20bdc72))

# [32.60.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.59.0...v32.60.0) (2022-01-14)


### Features

* **css:** Added gl-xs-mb-4 utility classes ([1186ecc](https://gitlab.com/gitlab-org/gitlab-ui/commit/1186ecc3438b0393f52e0d7a0302ab25c933c899))
* **GlBreadcrumb:** support breadcrumbs truncation ([7b1ad62](https://gitlab.com/gitlab-org/gitlab-ui/commit/7b1ad62870f951936bf70855e1a4e86e793e0618))

# [32.59.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.58.0...v32.59.0) (2022-01-14)


### Features

* **css:** Addition of gl-font-size-inherit class ([14e64b6](https://gitlab.com/gitlab-org/gitlab-ui/commit/14e64b6697696e6742823d71bdf7fbf0937d5ac4))
* **GlTable:** Migrate table stories to CSF ([63def60](https://gitlab.com/gitlab-org/gitlab-ui/commit/63def600b134738a5670e4ce1e417a1a4ee0a15a))

# [32.58.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.57.0...v32.58.0) (2022-01-14)


### Features

* **css:** Addition of .gl-lg-w-25p classes ([d050bda](https://gitlab.com/gitlab-org/gitlab-ui/commit/d050bdafaafca48e44d1096856425ff220f1aef4))

# [32.57.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.56.0...v32.57.0) (2022-01-14)


### Features

* **css:** Addition Add `gl-sm-pr-3 ` and `gl-sm-w-half` `gl-md-ml-3` utility class ([7630c23](https://gitlab.com/gitlab-org/gitlab-ui/commit/7630c23f4cef0fcc5fbd6ae86a844dda568b88b9))

# [32.56.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.55.0...v32.56.0) (2022-01-13)


### Features

* **utilities:** add gl-gap-x-3 utility ([ff14af5](https://gitlab.com/gitlab-org/gitlab-ui/commit/ff14af53f7506af410a2d1f9002367dac2b69e53))

# [32.55.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.54.2...v32.55.0) (2022-01-13)


### Features

* **css:** Addition of gl-md-pr-5 class ([5a52a1a](https://gitlab.com/gitlab-org/gitlab-ui/commit/5a52a1a92871b0c3818d0a4759913f9fbec93a09))

## [32.54.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.54.1...v32.54.2) (2022-01-13)


### Performance Improvements

* Remove some unnecessary bootstrap-vue CSS ([93055eb](https://gitlab.com/gitlab-org/gitlab-ui/commit/93055eb5cf56ef95fa4707d8a22fe77c8ac47e5d))

## [32.54.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.54.0...v32.54.1) (2022-01-11)


### Bug Fixes

* **GlEmptyState:** remove flex-wrap util ([3decead](https://gitlab.com/gitlab-org/gitlab-ui/commit/3deceada7bd6196f90f45f0a9636ace896951530))

# [32.54.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.53.0...v32.54.0) (2022-01-10)


### Features

* **GlPopover:** add styles for a close button ([f260e95](https://gitlab.com/gitlab-org/gitlab-ui/commit/f260e95b87e6760ab71d8341913bdeae04b7fbe2))

# [32.53.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.52.0...v32.53.0) (2022-01-07)


### Features

* **GlLoadingIcon:** Improve accessibility with role ([6bd4b30](https://gitlab.com/gitlab-org/gitlab-ui/commit/6bd4b30a386723477f302c42bddca55b454836d0))

# [32.52.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.51.3...v32.52.0) (2022-01-07)


### Features

* **css:** Addition of mix-blend-mode ([2824583](https://gitlab.com/gitlab-org/gitlab-ui/commit/28245839f0a2b23ec06d99b5f10125b94d2ce2ea))

## [32.51.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.51.2...v32.51.3) (2022-01-07)


### Bug Fixes

* **GlEmptyState:** replace Bootstrap CSS utilities with GitLab UI's ([2872ea5](https://gitlab.com/gitlab-org/gitlab-ui/commit/2872ea5f01e5b205359c8fbdf8db95d86c1097f8))

## [32.51.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.51.1...v32.51.2) (2022-01-06)


### Bug Fixes

* **GlBreadcrumb:** update breadcrumb's item avatar styles ([28aa091](https://gitlab.com/gitlab-org/gitlab-ui/commit/28aa09195c6bda5eb6abd3107d77a3e5fc7f9e28))

## [32.51.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.51.0...v32.51.1) (2022-01-05)


### Bug Fixes

* **Avatar:** Add support for multiple-character emojis ([f3fcb2f](https://gitlab.com/gitlab-org/gitlab-ui/commit/f3fcb2ff5a2e74f77b3a96dc8922a3821c86e2fa))

# [32.51.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.50.0...v32.51.0) (2021-12-29)


### Features

* **css:** Added gl-max-w-26 and gl-max-w-62 classes ([69a6829](https://gitlab.com/gitlab-org/gitlab-ui/commit/69a6829bbcaa5dc821a4fa29c4f3ec79e4b7aa5e))

# [32.50.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.49.0...v32.50.0) (2021-12-16)


### Features

* Add support for @gitlab/svgs@2 peer dependency ([77076b7](https://gitlab.com/gitlab-org/gitlab-ui/commit/77076b7d717f4245a29df115113c96d72b002540))

# [32.49.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.48.0...v32.49.0) (2021-12-15)


### Features

* **GlKeysetPagination:** Migrate storybook story ([b78abe6](https://gitlab.com/gitlab-org/gitlab-ui/commit/b78abe68d2c86c973af50ee20754e5b2be163f25))

# [32.48.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.47.0...v32.48.0) (2021-12-13)


### Features

* **GlAvatarsInline:** Migrate storybook story ([0720510](https://gitlab.com/gitlab-org/gitlab-ui/commit/07205105cb98e8493cfe3f8b70191707175ca8a9))

# [32.47.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.46.0...v32.47.0) (2021-12-13)


### Features

* **GlInputGroupText:** Migrate storybook story ([3fb2328](https://gitlab.com/gitlab-org/gitlab-ui/commit/3fb2328829b002480149bf5654c6026ff26fd670))

# [32.46.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.45.1...v32.46.0) (2021-12-13)


### Features

* **GlFormGroup:** Add optional prop to form_group ([25f8f64](https://gitlab.com/gitlab-org/gitlab-ui/commit/25f8f647261d1b3a8572602e84b1978541b1406f))

## [32.45.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.45.0...v32.45.1) (2021-12-10)


### Bug Fixes

* Guard against nonexistent localStorage ([248f7b7](https://gitlab.com/gitlab-org/gitlab-ui/commit/248f7b7c662a8011c27c05dc14a6aaca4d752e33))

# [32.45.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.44.0...v32.45.0) (2021-12-10)


### Features

* **css:** add negative translate x axis util ([987ad52](https://gitlab.com/gitlab-org/gitlab-ui/commit/987ad521f0990ed5311075c76496d4d29d89c2f7))
* **GlChart:** Addition of GlResizeObserverDirective for charts ([7a57fed](https://gitlab.com/gitlab-org/gitlab-ui/commit/7a57fed4e5d48ec209891f0a11fc133f4bcc1ded))

# [32.44.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.43.3...v32.44.0) (2021-12-09)


### Features

* **GlFormText:** Migrate storybook story ([b64bc62](https://gitlab.com/gitlab-org/gitlab-ui/commit/b64bc6239ed5421b2c2023149e6fc59da936256e))

## [32.43.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.43.2...v32.43.3) (2021-12-08)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.3.4 ([6798e4f](https://gitlab.com/gitlab-org/gitlab-ui/commit/6798e4f3e4fdd2b12b1b6e4cf8e0ac3d575cf43f))

## [32.43.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.43.1...v32.43.2) (2021-12-07)


### Bug Fixes

* **UI text:** Removed "Please," added period, and updated examples ([eabcb67](https://gitlab.com/gitlab-org/gitlab-ui/commit/eabcb6712a54c4b9e8bd175c7df117523824f89f))

## [32.43.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.43.0...v32.43.1) (2021-12-06)


### Bug Fixes

* **GlEmptyState:** update styles to match design specs ([c0812f5](https://gitlab.com/gitlab-org/gitlab-ui/commit/c0812f53664b5db03e643878d7894c9d448a736b))

# [32.43.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.42.0...v32.43.0) (2021-12-06)


### Features

* **CSS:** Add `gl-md-max-w-70p` utility class ([502cd65](https://gitlab.com/gitlab-org/gitlab-ui/commit/502cd650d0b2124a3cdfb26ad7f9364f75292650))

# [32.42.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.41.0...v32.42.0) (2021-12-03)


### Features

* Add gl-z-index-200 util class ([c53d23b](https://gitlab.com/gitlab-org/gitlab-ui/commit/c53d23b6e060434ed9055aea2b4f6f9c9e697a45))

# [32.41.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.40.0...v32.41.0) (2021-11-23)


### Features

* **SearchBoxBy*:** add type search to improve on accessibility ([8d77905](https://gitlab.com/gitlab-org/gitlab-ui/commit/8d779051a8028aad12bbc39ccaa335d10637a225))

# [32.40.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.39.0...v32.40.0) (2021-11-22)


### Features

* **GlFormInputGroup:** Add `inputClass` prop to `GlFormInputGroup` ([cdc7c70](https://gitlab.com/gitlab-org/gitlab-ui/commit/cdc7c70f81b462237deda76f2a3709119b52489f))

# [32.39.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.38.0...v32.39.0) (2021-11-19)


### Features

* **GlFilteredSearch:** Fix typing Colon ([1541d19](https://gitlab.com/gitlab-org/gitlab-ui/commit/1541d191db4acc5aa07385acbd19b2ad5d657a17))

# [32.38.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.37.0...v32.38.0) (2021-11-17)


### Features

* **GlFilteredSearchTokenSegment:** Colon support ([abf3856](https://gitlab.com/gitlab-org/gitlab-ui/commit/abf3856396080e6699ddfbcd526991dcea2dc5f3))

# [32.37.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.36.0...v32.37.0) (2021-11-10)


### Features

* Add util class for text-secondary ([6d5ee52](https://gitlab.com/gitlab-org/gitlab-ui/commit/6d5ee52f28487b6e8d06eb11c2e4cb2796891efa))

# [32.36.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.35.0...v32.36.0) (2021-11-09)


### Features

* Add gl-md-max-w-50p util class ([27be044](https://gitlab.com/gitlab-org/gitlab-ui/commit/27be0445aa3d7ac94d939f81dc63a2ab2711ea5e))

# [32.35.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.34.1...v32.35.0) (2021-11-08)


### Features

* **CSS:** Add `gl-lg-w-1px` utility class ([c74d9c9](https://gitlab.com/gitlab-org/gitlab-ui/commit/c74d9c98a1d34029e5c1858922827aead5a5baf6))

## [32.34.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.34.0...v32.34.1) (2021-11-08)


### Bug Fixes

* **FilteredSearch:** Remove case sensitivity ([6e3c271](https://gitlab.com/gitlab-org/gitlab-ui/commit/6e3c271cefb3f44893fb6b684c59ec73e3b6f7e5))

# [32.34.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.33.0...v32.34.0) (2021-11-05)


### Features

* **echarts:** update to echarts@5 ([c257e58](https://gitlab.com/gitlab-org/gitlab-ui/commit/c257e58e2dfadac7f4ba515f630272ea0a4039e7))

# [32.33.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.32.0...v32.33.0) (2021-11-04)


### Features

* **GlTruncate:** show full text in a tooltip ([168c532](https://gitlab.com/gitlab-org/gitlab-ui/commit/168c5325c1fab5174cfa5ad092d829ad11c85363))

# [32.32.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.31.0...v32.32.0) (2021-11-03)


### Features

* **GlIcon:** remove support for deprecated icons sizes ([5ea2461](https://gitlab.com/gitlab-org/gitlab-ui/commit/5ea2461cfc1d3e2fd5f5c7f51f5e351e6b79ce5d))

# [32.31.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.30.0...v32.31.0) (2021-11-02)


### Features

* **GlToggle:** Use uniqueId for toggle labels ([2ba11fb](https://gitlab.com/gitlab-org/gitlab-ui/commit/2ba11fbd5023233e4581507f24660a9ffa874f86))

# [32.30.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.29.2...v32.30.0) (2021-11-01)


### Features

* **css:** Add `dashed` & `dotted` border styles ([a44161c](https://gitlab.com/gitlab-org/gitlab-ui/commit/a44161c7fddf6388e6fba635da8b47e1079be0b6))

## [32.29.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.29.1...v32.29.2) (2021-11-01)


### Bug Fixes

* **Avatar:** Parse emoji for avatar name ([d23c341](https://gitlab.com/gitlab-org/gitlab-ui/commit/d23c341bb8cef5683bf2d49556dabe4008be76cf))

## [32.29.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.29.0...v32.29.1) (2021-10-29)


### Bug Fixes

* **css:** Fix [@error](https://gitlab.com/error) call by adding expression ([bd577a8](https://gitlab.com/gitlab-org/gitlab-ui/commit/bd577a8ffe6109ad71bed3159f1759207929115c))

# [32.29.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.28.0...v32.29.0) (2021-10-29)


### Features

* **Toggle:** Update label semantics for accessibility ([a16af22](https://gitlab.com/gitlab-org/gitlab-ui/commit/a16af22246dbd4e886ca8ac4640bf9c44da5c995))

# [32.28.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.27.0...v32.28.0) (2021-10-28)


### Features

* **css:** Use px in breakpoints instead of rem ([d107ae6](https://gitlab.com/gitlab-org/gitlab-ui/commit/d107ae68b9201a677e96fea7c19d479802f721fb))

# [32.27.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.26.0...v32.27.0) (2021-10-28)


### Features

* **GlBanner:** Add embedded prop to gl-banner ([e0669e3](https://gitlab.com/gitlab-org/gitlab-ui/commit/e0669e328fd396276c47bd246864af9108b2688d))

# [32.26.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.25.0...v32.26.0) (2021-10-27)


### Features

* **breadcrumb:** Set default separator and fix spacing ([95a7fc8](https://gitlab.com/gitlab-org/gitlab-ui/commit/95a7fc8e3ff3a06feb77ea7cdbfa7255b6f2c3f7))

# [32.25.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.24.1...v32.25.0) (2021-10-26)


### Features

* **css:** Add gl-top-8 utility class ([40a6aba](https://gitlab.com/gitlab-org/gitlab-ui/commit/40a6abae33d7ba02c7d203a33d2ed6b92b621ea1))

## [32.24.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.24.0...v32.24.1) (2021-10-26)


### Bug Fixes

* revert components' `.documentations.js` files ([5fbcd1f](https://gitlab.com/gitlab-org/gitlab-ui/commit/5fbcd1f93b5e5a3b3d607cfa109425dae97631ac))

# [32.24.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.23.0...v32.24.0) (2021-10-22)


### Features

* **css:** Add 5% width mixin ([6eaa25a](https://gitlab.com/gitlab-org/gitlab-ui/commit/6eaa25a250562832f2a8d7e198037e9e661bfdd6))

# [32.23.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.22.0...v32.23.0) (2021-10-22)


### Features

* **Tabs:** Update disabled color ([c0fbf11](https://gitlab.com/gitlab-org/gitlab-ui/commit/c0fbf11fd19a5a354759633735c621beccdd2ae7))

# [32.22.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.21.0...v32.22.0) (2021-10-20)


### Features

* **segmented-control:** Update styles to match UI Kit ([4aaf666](https://gitlab.com/gitlab-org/gitlab-ui/commit/4aaf666f081b1dc2f374be32e2bf56bed782bf1e))

# [32.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.20.2...v32.21.0) (2021-10-20)


### Features

* add `gl-h-100vh` utility class ([ec3c472](https://gitlab.com/gitlab-org/gitlab-ui/commit/ec3c4723888a063a70ed3a32fe24ff3559e51e4c))

## [32.20.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.20.1...v32.20.2) (2021-10-19)


### Bug Fixes

* **Toggle:** Always keep aria checked whether true or false ([84a240e](https://gitlab.com/gitlab-org/gitlab-ui/commit/84a240ea14fb7f5827b014f89551f692899f3df4))

## [32.20.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.20.0...v32.20.1) (2021-10-19)


### Bug Fixes

* **GlSingleStat:** forward listeners and attrs ([7781b6b](https://gitlab.com/gitlab-org/gitlab-ui/commit/7781b6b443fb525f38f4b9240d4d7558f8d5f072))

# [32.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.19.1...v32.20.0) (2021-10-14)


### Features

* **Tabs:** Badge counter should use SR only ([4706ff0](https://gitlab.com/gitlab-org/gitlab-ui/commit/4706ff0fb1f6b550133d904868d19bc39d01ef45))

## [32.19.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.19.0...v32.19.1) (2021-10-11)


### Bug Fixes

* **badge:** Override bootstrap hover style ([c065687](https://gitlab.com/gitlab-org/gitlab-ui/commit/c065687b05ad1d8f5e3a45da0d120517825dae41))

# [32.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.18.0...v32.19.0) (2021-10-08)


### Features

* **css:** add `gl-min-w-20` utility ([8340335](https://gitlab.com/gitlab-org/gitlab-ui/commit/8340335ec7c8d76989298154c1cfc761c492bc4a))

# [32.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.17.0...v32.18.0) (2021-10-05)


### Features

* **Datepicker:** Add hover and disabled styles ([d5e1a81](https://gitlab.com/gitlab-org/gitlab-ui/commit/d5e1a8180f24a1238c5d86725d490b7e4829f6e7))

# [32.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.16.0...v32.17.0) (2021-10-04)


### Features

* **GlStackedColumn:** Add custom palette ([b6fb842](https://gitlab.com/gitlab-org/gitlab-ui/commit/b6fb8421f56fdd64f573213eb26cf6e8fceda6ff))

# [32.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.15.0...v32.16.0) (2021-10-04)


### Features

* **Datepicker:** Add hover state to month/year dropdowns ([5093b38](https://gitlab.com/gitlab-org/gitlab-ui/commit/5093b388267fb842ed2ea3217a14a1937386db0a))

# [32.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.14.0...v32.15.0) (2021-10-01)


### Features

* **deps:** Update bootstrap-vue to 2.19.0 ([03af642](https://gitlab.com/gitlab-org/gitlab-ui/commit/03af64275f2f066964c6c79d553fcc541385631d))

# [32.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.13.0...v32.14.0) (2021-10-01)


### Bug Fixes

* **GlStackedColumn:** Fix custom tooltip title ([98e6921](https://gitlab.com/gitlab-org/gitlab-ui/commit/98e69217c7c735d11f8e1daf24497cf8f709e21b))


### Features

* **GlTableLite:** Introduce GlTableLite component ([f189791](https://gitlab.com/gitlab-org/gitlab-ui/commit/f18979121989844cb7970fc08525d661065c6c60))

# [32.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.12.0...v32.13.0) (2021-09-30)


### Features

* **GlStackedColumn:** Add custom tooltip option ([d244925](https://gitlab.com/gitlab-org/gitlab-ui/commit/d2449257619d5e1a3000f8dfbae0d3dd9e655dfb))

# [32.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.11.4...v32.12.0) (2021-09-29)


### Features

* Add gl-collapse-empty util class ([dc6ab1c](https://gitlab.com/gitlab-org/gitlab-ui/commit/dc6ab1c1793fe7fdc668d8dc76626bd032f92b90))

## [32.11.4](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.11.3...v32.11.4) (2021-09-28)


### Bug Fixes

* **GlDatepicker:** fix date parsing when manually entering dates ([0f9a4f8](https://gitlab.com/gitlab-org/gitlab-ui/commit/0f9a4f847eb8d31a6ee38c607b2d6064586959ba))

## [32.11.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.11.2...v32.11.3) (2021-09-27)


### Bug Fixes

* Update inline avatar styles to match figma styles ([75d5880](https://gitlab.com/gitlab-org/gitlab-ui/commit/75d588074eda736afdac8b452dd36a1cb88635be))

## [32.11.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.11.1...v32.11.2) (2021-09-23)


### Bug Fixes

* Work around vue-apollo@3 bug ([f5223f9](https://gitlab.com/gitlab-org/gitlab-ui/commit/f5223f92db7ba89d3b6c106cf2356907a152440f)), closes [/github.com/vuejs/vue-apollo/blob/v3.0.3/packages/vue-apollo/src/mixin.js#L17-L25](https://gitlab.com//github.com/vuejs/vue-apollo/blob/v3.0.3/packages/vue-apollo/src/mixin.js/issues/L17-L25) [/github.com/vuejs/vue/blob/v2.6.14/src/core/instance/init.js#L58](https://gitlab.com//github.com/vuejs/vue/blob/v2.6.14/src/core/instance/init.js/issues/L58)

## [32.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.11.0...v32.11.1) (2021-09-22)


### Bug Fixes

* **GlDropdown:** Added `clearAllTextClass` prop ([b3e08d7](https://gitlab.com/gitlab-org/gitlab-ui/commit/b3e08d7bb5cb519b594bbfa930a9e6fb2a3e20aa))
* **GlDropdown:** Ensure we forward the `clearAll` event ([c8cf59a](https://gitlab.com/gitlab-org/gitlab-ui/commit/c8cf59acc4c4117ed6226bded994d66e65592c71))
* **GlDropdown:** Fix empty div without highlighted items content ([292d135](https://gitlab.com/gitlab-org/gitlab-ui/commit/292d1359f0864dfd48c21c7f562a9cae79a482d6))

# [32.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.10.2...v32.11.0) (2021-09-16)


### Features

* **GlDropdown:** Adds highlighted items slot ([3ac35ed](https://gitlab.com/gitlab-org/gitlab-ui/commit/3ac35edcc307963a2695602567027b6c9019c7d5))

## [32.10.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.10.1...v32.10.2) (2021-09-15)


### Bug Fixes

* don't invert shadows and modal background in dark mode ([06e1fba](https://gitlab.com/gitlab-org/gitlab-ui/commit/06e1fba366f70facfbc2654d984d7463fdc336bc))

## [32.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.10.0...v32.10.1) (2021-09-15)


### Bug Fixes

* **GlColumnChart:** Support object for yAxis ([65cb83f](https://gitlab.com/gitlab-org/gitlab-ui/commit/65cb83f78e53bdf36702d7b009f7d92427b94f72))

# [32.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.9.1...v32.10.0) (2021-09-09)


### Features

* **markdown:** implement code span styles ([0b4d62e](https://gitlab.com/gitlab-org/gitlab-ui/commit/0b4d62ef5b75cb969d8a98ac266b196a697b0c68))

## [32.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.9.0...v32.9.1) (2021-09-08)


### Bug Fixes

* **GlLabel:** Fix color of the GlLabel according to Figma ([22af655](https://gitlab.com/gitlab-org/gitlab-ui/commit/22af655c9afeaa84b1b10ee1097f893d68a78af6))

# [32.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.8.0...v32.9.0) (2021-09-07)


### Features

* **markdown:** Implement inline-diff component styles ([57b01fb](https://gitlab.com/gitlab-org/gitlab-ui/commit/57b01fbd615b9cfbb6eb2cb43a22c7d1b0ea4bd4))

# [32.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.7.1...v32.8.0) (2021-09-07)


### Features

* **css:** Adds utility classes for border-radius size and hover variants ([bc5719d](https://gitlab.com/gitlab-org/gitlab-ui/commit/bc5719dcdd4c638efb57ed3ac8fe75607da70bb8))

## [32.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.7.0...v32.7.1) (2021-09-06)


### Bug Fixes

* **charts:** change zoom-bar to match designs specs ([3ca01bb](https://gitlab.com/gitlab-org/gitlab-ui/commit/3ca01bb52d836060bc915b2d9a11ecf666d25ef8))

# [32.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.6.2...v32.7.0) (2021-09-06)


### Features

* add `gl-cursor-help` utility class ([2e137cd](https://gitlab.com/gitlab-org/gitlab-ui/commit/2e137cdf26564003335d05df94e4586e0b996fa7))

## [32.6.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.6.1...v32.6.2) (2021-09-06)


### Bug Fixes

* **GlFormCheckboxGroup:** Swaps v-html for v-safe-html ([ee650c7](https://gitlab.com/gitlab-org/gitlab-ui/commit/ee650c7f5946d335e0d9b4a87e529184e8e18dd3))
* **GlFormRadioGroup:** Swaps v-html for v-safe-html ([bf87a04](https://gitlab.com/gitlab-org/gitlab-ui/commit/bf87a047d62680efc15f6126312bce5426386665))

## [32.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.6.0...v32.6.1) (2021-09-03)


### Bug Fixes

* **toast:** White text in dark mode ([f8a36ac](https://gitlab.com/gitlab-org/gitlab-ui/commit/f8a36acbf155a349975d4fc12dc61977e4613f23))

# [32.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.5.0...v32.6.0) (2021-09-02)


### Features

* **GlDateRangePicker:** Add daterange indicator and help icon ([75a3661](https://gitlab.com/gitlab-org/gitlab-ui/commit/75a3661c2378e6713a892eb2b225d7956343d8a6))

# [32.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.4.0...v32.5.0) (2021-09-01)


### Features

* **GlDropdown:** Add optional clear all button ([a265e49](https://gitlab.com/gitlab-org/gitlab-ui/commit/a265e49a298cf94f31398cf4c135dcae14057563))

# [32.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.3.2...v32.4.0) (2021-08-26)


### Features

* **GlSingleStat:** Conditionally add hover class ([e931aae](https://gitlab.com/gitlab-org/gitlab-ui/commit/e931aaeb9dfcea85521cef4aa492d93b49d373d4))

## [32.3.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.3.1...v32.3.2) (2021-08-25)


### Bug Fixes

* **issue-template:** Remove deprecated label from issue template ([ca12a30](https://gitlab.com/gitlab-org/gitlab-ui/commit/ca12a3032db592bd29db0a6b0e4f05dc2e4b706e))

## [32.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.3.0...v32.3.1) (2021-08-25)


### Bug Fixes

* **GlDropdown:** Fix no-caret dropdown-button pd ([718e39e](https://gitlab.com/gitlab-org/gitlab-ui/commit/718e39ecba7ff61754a630e563f7f7dbeab16116))

# [32.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.2.3...v32.3.0) (2021-08-20)


### Features

* **css:** Add min-width utility classes ([0738c1a](https://gitlab.com/gitlab-org/gitlab-ui/commit/0738c1af123449ae091f0cee6cbcb7fc580abb14))

## [32.2.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.2.2...v32.2.3) (2021-08-19)


### Bug Fixes

* **formInput:** fix cursor Issue on Colorpicker ([c1fa1bd](https://gitlab.com/gitlab-org/gitlab-ui/commit/c1fa1bd4a9a53fc12ad0dc481909796c1afc7356))

## [32.2.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.2.1...v32.2.2) (2021-08-19)


### Bug Fixes

* **GlFilteredSearch:** Stop component mutating `value` prop ([8e27e2e](https://gitlab.com/gitlab-org/gitlab-ui/commit/8e27e2ebbfc1584b3a86b0219405862303540e88))

## [32.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.2.0...v32.2.1) (2021-08-16)


### Bug Fixes

* **gaugeChart:** Correct reference ([456657d](https://gitlab.com/gitlab-org/gitlab-ui/commit/456657db91b3c650a05de0cc4ce32539e387faee))

# [32.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.1.0...v32.2.0) (2021-08-10)


### Features

* **css:** Override pikaday colors to support dark mode for GlDatepicker ([3c28884](https://gitlab.com/gitlab-org/gitlab-ui/commit/3c28884553580f359b5751cc547308692e1d69e8))

# [32.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v32.0.0...v32.1.0) (2021-08-07)


### Features

* add gl-pb-8 spacing utility ([d2d33e0](https://gitlab.com/gitlab-org/gitlab-ui/commit/d2d33e0f579fec347f19edd87be8eeb4867dbd3d))

# [32.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.7.0...v32.0.0) (2021-08-03)


### Bug Fixes

* **GlToggle:** Make label required for accessibility ([1e8dc4a](https://gitlab.com/gitlab-org/gitlab-ui/commit/1e8dc4a07ac6a1f8997d0b976615db4d5a9c06b1))


### Code Refactoring

* Move documentation entrypoint to documentation/ ([85af91f](https://gitlab.com/gitlab-org/gitlab-ui/commit/85af91f21dc4e35013fe231ed9a76184cce5186a))
* **GlDeprecatedDropdown:** Delete GlDeprecatedDropdown component ([d151796](https://gitlab.com/gitlab-org/gitlab-ui/commit/d1517963468995ceff8b69416d3ecbefaa0824d2))


### Features

* Change supported browsers for pre-compiled version ([c48640c](https://gitlab.com/gitlab-org/gitlab-ui/commit/c48640c13f0735e4ca4f50e70310f20fe27a2326))
* Remove resize-observer-polyfill ([a23cd7c](https://gitlab.com/gitlab-org/gitlab-ui/commit/a23cd7cdb44fdf18e12f692ec9cb0734e388cd0a))


### BREAKING CHANGES

* If you target browsers that do not support
ResizeObserver, you need to polyfill it yourself.
* Pre-compiled version of GitLab UI dropped older browser
support. If you need to use GitLab UI with older browsers, consume the
source of GitLab UI directly.
* If you imported `@gitlab/ui/documentation` it should
still work as before, but you might need to import
`@gitlab/ui/documentation/index.js` directly
* **GlToggle:** Make label required so that every
toggle has an accessible name. If a visual label is
not desired then you can use label-position="hidden"
to visually hide it.
* **GlDeprecatedDropdown:** Delete GlDeprecatedDropdown as it is superseded by
GlDropdown.

# [31.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.6.1...v31.7.0) (2021-08-02)


### Features

* allow to provide token styles in TokenSelector components ([15d48ed](https://gitlab.com/gitlab-org/gitlab-ui/commit/15d48ed9591ffa1d3645ff1434bab97ace1351e0))

## [31.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.6.0...v31.6.1) (2021-07-29)


### Bug Fixes

* **GlSorting:** Make dropdown toggle conform to design ([cf322a1](https://gitlab.com/gitlab-org/gitlab-ui/commit/cf322a1330f2b26bb5f6e221dafca9336ab5058a))

# [31.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.5.0...v31.6.0) (2021-07-21)


### Features

* **GlDrawer:** Add sidebar variant ([a9a4bff](https://gitlab.com/gitlab-org/gitlab-ui/commit/a9a4bffe2f2ca8e66683b9e3cbcad3f492ede416))

# [31.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.4.1...v31.5.0) (2021-07-14)


### Features

* **css:** Add padding size to utility class ([c40101e](https://gitlab.com/gitlab-org/gitlab-ui/commit/c40101e692d13ce5f1885ca7c1c1098d943ae39d))

## [31.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.4.0...v31.4.1) (2021-07-13)


### Bug Fixes

* **GlFilteredSearch:** Revert "Stop component mutating `value` prop" ([b8940c9](https://gitlab.com/gitlab-org/gitlab-ui/commit/b8940c934cabdca5ad8191fea1f0b04f5cd80dca))

# [31.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.3.0...v31.4.0) (2021-07-13)


### Features

* **css:** Add gl-text-theme-indigo-900 mixin ([ef53398](https://gitlab.com/gitlab-org/gitlab-ui/commit/ef53398080927a0083a9006fec820c9666e352dc))

# [31.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.2.0...v31.3.0) (2021-07-12)


### Features

* **GlSingleStat:** Fade units after animation ([41531ac](https://gitlab.com/gitlab-org/gitlab-ui/commit/41531ac1d661d5df9a9212417b650f652a846e7e))

# [31.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.1.0...v31.2.0) (2021-07-09)


### Features

* **GlSafeHtml:** sanitize potentially dangerous data attributes ([e3cc94e](https://gitlab.com/gitlab-org/gitlab-ui/commit/e3cc94eea5e136a8e768a47e19d65e5ed03aaedc))

# [31.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.0.1...v31.1.0) (2021-07-08)


### Features

* **css:** Add gl-left-50p utility class ([65dd918](https://gitlab.com/gitlab-org/gitlab-ui/commit/65dd91843375957a77723036bcceb1132f9c04f4))

## [31.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v31.0.0...v31.0.1) (2021-07-08)


### Bug Fixes

* **GlLabel:** Fix visibility of underline on hover and focus state ([790aa16](https://gitlab.com/gitlab-org/gitlab-ui/commit/790aa16f4308d59bd2b44bffa604c38c335aad32))

# [31.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v30.3.0...v31.0.0) (2021-07-08)


### Bug Fixes

* **GlDrawer:** align title and close icon ([df09bfb](https://gitlab.com/gitlab-org/gitlab-ui/commit/df09bfbcdaec756f2a19c866da3a4cff7b13d2fb))


### BREAKING CHANGES

* **GlDrawer:** the header slot has been split up into two distinct
slots:

* The title slot should only contain the drawer's title.
* The header slot can be used to display additional content below the
  title.

Usages of GlDrawer need to be updated to move the contents to the
correct slots.

# [30.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v30.2.2...v30.3.0) (2021-07-07)


### Features

* Add props to allow adding and hiding labels ([05eb875](https://gitlab.com/gitlab-org/gitlab-ui/commit/05eb875c23d8cf1423652aab54c787b1cffa3fb4))

## [30.2.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v30.2.1...v30.2.2) (2021-07-07)


### Bug Fixes

* **GlFilteredSearch:** Stop component mutating `value` prop ([5ff7bdb](https://gitlab.com/gitlab-org/gitlab-ui/commit/5ff7bdb35764686e7400e526a023c7d6b785b2b1))

## [30.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v30.2.0...v30.2.1) (2021-07-05)


### Bug Fixes

* **GlTable:** update hover and selected primary background ([ac37040](https://gitlab.com/gitlab-org/gitlab-ui/commit/ac37040065e43616a53ebdf04a92d552a85acdd9))

# [30.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v30.1.0...v30.2.0) (2021-06-30)


### Features

* add gl-md-max-w-30p and gl-md-w-50p classes ([73336c1](https://gitlab.com/gitlab-org/gitlab-ui/commit/73336c12b206389559f7cb7d89675939ead809ad))
* remove gl-flex-grow-4 class ([60e0b5c](https://gitlab.com/gitlab-org/gitlab-ui/commit/60e0b5c1358ee898cbefd9d57cdb0c797979d772))

# [30.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v30.0.1...v30.1.0) (2021-06-29)


### Features

* add gl-mx-n5 mixin ([6d6d705](https://gitlab.com/gitlab-org/gitlab-ui/commit/6d6d7055eee8e3b666b7e4cf18a21966d8684fbd))

## [30.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v30.0.0...v30.0.1) (2021-06-28)


### Bug Fixes

* **GlSafeLinkDirective:** pass arguments to `update` hook ([3a4de98](https://gitlab.com/gitlab-org/gitlab-ui/commit/3a4de98fecfe8e7808e3e83cd84a0639c1e6f33b))

# [30.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.38.1...v30.0.0) (2021-06-22)


### Bug Fixes

* **GlToast:** set background opacity to 1 ([46983f5](https://gitlab.com/gitlab-org/gitlab-ui/commit/46983f5711ebc08d3ef423d1d3dd9fb8372cf04a))


### Code Refactoring

* **toast:** Replace vue-toasted with BootstrapVue's Toast plugin ([59e94f9](https://gitlab.com/gitlab-org/gitlab-ui/commit/59e94f9a5cedb135698f1db8ce7065d9859b205c))


### BREAKING CHANGES

* **toast:** This replaces the internal toasts library.

BootstrapVue's built-in toasts are now used instead of `vue-toasted`.

As a result, the following changes should be made when upgrading:

* The following options have been renamed:
    * `duration` now is `autoHideDelay`
    * `className` now is `toasClass`.
* The following options are not supported anymore:
    * `fullWidth`
    * `fitToScreen`
    * `containerClass`
    * `iconPack`
    * `Icon`
    * `theme`
    * `closeOnSwipe`
    * `keepOnHover`
    * `singleton`
    * `type` (note that while this option was previously supported, it
      didn't have any effect visually and can thus be removed altogether)
* It is not possible to render HTML in toasts' body anymore, make sure
  to only pass plain text to the `.show()` method.
* To adhere with the design system, the `position` option has also been
  removed. Toasts should only appear in the bottom-left corner.
* The callbacks have been backported:
    * `onComplete` should work as usual.
    * `onClick`'s second argument is an object with the following
      properties:
      * `id` is the BootstrapVue toast's ID.
      * `hide` is a method that can be called to hide the toast. It
        replaces `goAway(0)`.

## [29.38.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.38.0...v29.38.1) (2021-06-18)


### Bug Fixes

* **GlEmptyState:** Add role img to empty state image ([53ad49f](https://gitlab.com/gitlab-org/gitlab-ui/commit/53ad49f85b949eeb3b94a6d85388011f64d4f5dd))

# [29.38.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.37.1...v29.38.0) (2021-06-17)


### Features

* add gl-pt-11 util class ([010dfa5](https://gitlab.com/gitlab-org/gitlab-ui/commit/010dfa5bbef7a27de6ecc866aac5b0a7655e26a7)), closes [/gitlab.com/gitlab-org/gitlab/-/merge_requests/62965#note_604208606](https://gitlab.com//gitlab.com/gitlab-org/gitlab/-/merge_requests/62965/issues/note_604208606)

## [29.37.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.37.0...v29.37.1) (2021-06-17)


### Bug Fixes

* **css:** replace gl-sm-border-l-none with gl-md-border-l-solid ([5ce26ba](https://gitlab.com/gitlab-org/gitlab-ui/commit/5ce26baaf018b69d691d5bfec3a1c7ed714db244))
* **GlFilteredSearch:** Improve multi-select UX ([6cfe25c](https://gitlab.com/gitlab-org/gitlab-ui/commit/6cfe25c9828630e02340363633f406a3379924e7))

# [29.37.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.36.0...v29.37.0) (2021-06-16)


### Features

* **GlTabs:** add support for syncing active tab with query params ([846e259](https://gitlab.com/gitlab-org/gitlab-ui/commit/846e259262bfc54986d80069632bc3ade951f3f7))

# [29.36.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.35.0...v29.36.0) (2021-06-16)


### Features

* add gl-sm-border-l-none util class ([36b5f17](https://gitlab.com/gitlab-org/gitlab-ui/commit/36b5f1760071c88ddf7caff3e535c5f9cf8cc278))

# [29.35.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.34.1...v29.35.0) (2021-06-15)


### Features

* **css:** Add CSS class for max-width: max-content ([e079017](https://gitlab.com/gitlab-org/gitlab-ui/commit/e079017d9df84a1d32cc98730a2a5000ed09cfa0))

## [29.34.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.34.0...v29.34.1) (2021-06-15)


### Bug Fixes

* **css:** rename flex grow shorthand utility ([1cc14d3](https://gitlab.com/gitlab-org/gitlab-ui/commit/1cc14d3346a1614a97c840e2b5d417997894f55b))

# [29.34.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.33.0...v29.34.0) (2021-06-09)


### Features

* **css:** add gl-sm-display-inline as display utility ([cdbf2e5](https://gitlab.com/gitlab-org/gitlab-ui/commit/cdbf2e58afadf65bb99af957c7ab5b7016cf7bf4))

# [29.33.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.32.2...v29.33.0) (2021-06-04)


### Features

* **AnimatedNumber:** Disable animation on mount ([f2d0bd5](https://gitlab.com/gitlab-org/gitlab-ui/commit/f2d0bd5dedb6992008f59070852c34ac293ea6ef))

## [29.32.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.32.1...v29.32.2) (2021-06-03)


### Bug Fixes

* **GlPath:** fix active shape outline ([644f458](https://gitlab.com/gitlab-org/gitlab-ui/commit/644f45851adb4a105a9fb38980609143d89e45ff))

## [29.32.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.32.0...v29.32.1) (2021-06-03)


### Bug Fixes

* **GlModal:** Define GlModal model ([3f9340a](https://gitlab.com/gitlab-org/gitlab-ui/commit/3f9340a3e007f449f5961271f053e1c256ec1edf))

# [29.32.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.31.0...v29.32.0) (2021-06-01)


### Features

* **formgroup:** Add label description to form group ([e811c15](https://gitlab.com/gitlab-org/gitlab-ui/commit/e811c15836d5cc674b08de773d0a0eedb2a8ab5e))

# [29.31.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.30.0...v29.31.0) (2021-05-27)


### Features

* add flex: 4 util class to flex.scss ([351e2af](https://gitlab.com/gitlab-org/gitlab-ui/commit/351e2afeb8f5a9bd9e146af02d04a9dc4a219b30))

# [29.30.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.29.3...v29.30.0) (2021-05-26)


### Features

* **GlPagination:** Add previous and next events ([811f123](https://gitlab.com/gitlab-org/gitlab-ui/commit/811f123d051ca50f780dffd1cba11d3e162f93ce))

## [29.29.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.29.2...v29.29.3) (2021-05-25)


### Bug Fixes

* **GlFormSelect:** Remove valid state icon ([74f0bc4](https://gitlab.com/gitlab-org/gitlab-ui/commit/74f0bc4f96965fdf252957b4d9b11757a2dbbaa7))

## [29.29.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.29.1...v29.29.2) (2021-05-21)


### Bug Fixes

* **GlToken:** use CloseButton instead of GlIcon ([c849f7d](https://gitlab.com/gitlab-org/gitlab-ui/commit/c849f7d0e0356c6f0f756c3051619ff54f19f7e4))

## [29.29.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.29.0...v29.29.1) (2021-05-21)


### Bug Fixes

* **GlIcon:** Give icons img role ([c40d82e](https://gitlab.com/gitlab-org/gitlab-ui/commit/c40d82ecca641709c999e391c793b241eef304e5))

# [29.29.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.28.0...v29.29.0) (2021-05-21)


### Features

* **css:** Add gl-stroke-white ([3f3fb23](https://gitlab.com/gitlab-org/gitlab-ui/commit/3f3fb23227a2e7605c674778ac4036ad22644b9a))

# [29.28.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.27.0...v29.28.0) (2021-05-20)


### Features

* **css:** Add gl-text-purple-600 ([dec5e36](https://gitlab.com/gitlab-org/gitlab-ui/commit/dec5e36664d6367bd7016592544158d3cddd3d59))

# [29.27.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.26.0...v29.27.0) (2021-05-17)


### Features

* **broadcast_message:** update to use GlButton ([db3e4ff](https://gitlab.com/gitlab-org/gitlab-ui/commit/db3e4ffc574d48ffc6dfe8c6563e48e2e9f89428))

# [29.26.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.25.0...v29.26.0) (2021-05-14)


### Features

* **css:** Add max width height none utilities ([2a677c2](https://gitlab.com/gitlab-org/gitlab-ui/commit/2a677c20dc7715957bf9d6b96d093d72a14ee3e9))

# [29.25.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.24.0...v29.25.0) (2021-05-12)


### Features

* Add transition duration medium class ([bd3ff16](https://gitlab.com/gitlab-org/gitlab-ui/commit/bd3ff1646304522d6c3f316bfb47a544e122dec6))

# [29.24.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.23.0...v29.24.0) (2021-05-12)


### Features

* Add transition property width class ([9b5e1ec](https://gitlab.com/gitlab-org/gitlab-ui/commit/9b5e1ec5db82667f33e17f1d7ac17f23861455dc))

# [29.23.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.22.0...v29.23.0) (2021-05-12)


### Bug Fixes

* **GlButton:** use safe link directive ([8fd31c8](https://gitlab.com/gitlab-org/gitlab-ui/commit/8fd31c85d1167d7a3361937bd6b9e8f58b6535b9))


### Features

* allow unsafe links via the isUnsafeLink prop ([3fd35c2](https://gitlab.com/gitlab-org/gitlab-ui/commit/3fd35c2f51d0ee2c2f912f32805089a971fedae0))

# [29.22.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.21.0...v29.22.0) (2021-05-12)


### Features

* add gl-lg-justify-content-start ([f04fc93](https://gitlab.com/gitlab-org/gitlab-ui/commit/f04fc93ff045e4df72e11a678da59d687ed6f385))

# [29.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.20.0...v29.21.0) (2021-05-11)


### Features

* Add gl-border-x-0 utility classes ([e1f4a68](https://gitlab.com/gitlab-org/gitlab-ui/commit/e1f4a68b5071ca62ecb56e0f27fb36d21c32c62a))

# [29.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.19.0...v29.20.0) (2021-05-10)


### Features

* Add gl-m-auto utility classi ([6bd5d59](https://gitlab.com/gitlab-org/gitlab-ui/commit/6bd5d59ed876bd7f0c083242d9572de21e5db9e8))

# [29.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.18.0...v29.19.0) (2021-05-10)


### Bug Fixes

* Make GlTabs explicitly default to indigo ([a88c62d](https://gitlab.com/gitlab-org/gitlab-ui/commit/a88c62de62f6578116034dfd780d3c1e2133e3e0))


### Features

* **Tabs:** Add additional color themes to GlTabs ([d8fabea](https://gitlab.com/gitlab-org/gitlab-ui/commit/d8fabeaa77a65d1ca299ee5c9a95cbba7624d10d))

# [29.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.17.0...v29.18.0) (2021-05-07)


### Features

* add 70% util class to sizing.scss ([464a4e4](https://gitlab.com/gitlab-org/gitlab-ui/commit/464a4e49faca0b1ecff5e5ca25bbb810cf261f0b))

# [29.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.16.0...v29.17.0) (2021-05-06)


### Features

* Add gl-word-break-word utility class ([bc7d76a](https://gitlab.com/gitlab-org/gitlab-ui/commit/bc7d76aad5c25098c8d156819ea55e4433f804d2))

# [29.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.15.0...v29.16.0) (2021-05-06)


### Features

* **GlHoverLoadDirective:** Add hover load directive ([2b80072](https://gitlab.com/gitlab-org/gitlab-ui/commit/2b800726f58abe2a765c5fd32d8da4e39f253aa8))

# [29.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.14.0...v29.15.0) (2021-05-05)


### Features

* **GlTokenSelector:** add `state` prop for validation ([eb9c8ea](https://gitlab.com/gitlab-org/gitlab-ui/commit/eb9c8ea074b14dfc1a773bc827c153b301ea9ee0))

# [29.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.13.0...v29.14.0) (2021-05-05)


### Bug Fixes

* **GlDatepicker:** use defaultDate as an initial value ([e9a0532](https://gitlab.com/gitlab-org/gitlab-ui/commit/e9a0532a9f712c253a489b05be6a050821ad1c1b))


### Features

* **GlSingleStat:** Add light gray on hover ([b9bd376](https://gitlab.com/gitlab-org/gitlab-ui/commit/b9bd376953c958b8ecdbe8bd7d27085b345407d6))

# [29.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.12.1...v29.13.0) (2021-05-04)


### Features

* **css:** Add margin top auto ([b0cd6e6](https://gitlab.com/gitlab-org/gitlab-ui/commit/b0cd6e62efaf5c67355b295aa1b48f9abe5366c3))

## [29.12.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.12.0...v29.12.1) (2021-05-03)


### Bug Fixes

* **deps:** upgrade BootstrapVue to v2.16.0 ([389862b](https://gitlab.com/gitlab-org/gitlab-ui/commit/389862becbbac099a312f99b3ac1a0b644f31ca7))

# [29.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.11.1...v29.12.0) (2021-05-03)


### Features

* **GlFilteredSearch:** Add friendly text option + improvements ([de537f6](https://gitlab.com/gitlab-org/gitlab-ui/commit/de537f6e6741fa8a085250bbcceaf327f22fff7f))

## [29.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.11.0...v29.11.1) (2021-04-28)


### Bug Fixes

* **GlBadge:** set badge's role when icon-only ([6260794](https://gitlab.com/gitlab-org/gitlab-ui/commit/62607945ac62b292cfdbad41a8c83ffec3082ce4))

# [29.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.10.0...v29.11.0) (2021-04-23)


### Features

* **GlBanner:** emit a primary event ([d0e5306](https://gitlab.com/gitlab-org/gitlab-ui/commit/d0e5306acec02aafdf09fa1630f8d2423bf5d81b))

# [29.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.9.0...v29.10.0) (2021-04-23)


### Features

* **GlOutsideDirective:** Add new directive ([3d2664d](https://gitlab.com/gitlab-org/gitlab-ui/commit/3d2664dfc353a2864819f79f557bf2fe936c1935))

# [29.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.8.2...v29.9.0) (2021-04-22)


### Features

* add gl-max-w-15 utility class ([d1b8c78](https://gitlab.com/gitlab-org/gitlab-ui/commit/d1b8c78b95c1febd9bd2c98f776d90d32bd8f3dd))


### Reverts

* fix(GlButton): use safe link directive ([e891e14](https://gitlab.com/gitlab-org/gitlab-ui/commit/e891e141bedaa5bc355e6930028094b299e0a4ef))

## [29.8.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.8.1...v29.8.2) (2021-04-22)


### Bug Fixes

* **GlButton:** use safe link directive ([6836db7](https://gitlab.com/gitlab-org/gitlab-ui/commit/6836db7703ebbfe83999b62f9ec8ed4c3da42291))

## [29.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.8.0...v29.8.1) (2021-04-22)


### Bug Fixes

* **deps:** upgrade BootstrapVue to v2.15.0 ([c0bd972](https://gitlab.com/gitlab-org/gitlab-ui/commit/c0bd972f6c02821ec34defe678664c92c865fd72))

# [29.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.7.4...v29.8.0) (2021-04-21)


### Features

* **GlTabs:** Add horizontal scrolling interaction ([0bd52e9](https://gitlab.com/gitlab-org/gitlab-ui/commit/0bd52e9ed84129c989392a73fbb89d3db921c907))

## [29.7.4](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.7.3...v29.7.4) (2021-04-20)


### Bug Fixes

* **GlTabs:** Update hover state bottom border color ([09aa059](https://gitlab.com/gitlab-org/gitlab-ui/commit/09aa059a2c338f2d5c33218f66c42a7614134dac))

## [29.7.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.7.2...v29.7.3) (2021-04-16)


### Bug Fixes

* **deps:** upgrade BootstrapVue to v2.14.0 ([e721648](https://gitlab.com/gitlab-org/gitlab-ui/commit/e7216484f34cc6ceb1ebbb2bf25f6847d2ce96c5))

## [29.7.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.7.1...v29.7.2) (2021-04-15)


### Bug Fixes

* Point Pajamas anchors to main branch ([ad9f5aa](https://gitlab.com/gitlab-org/gitlab-ui/commit/ad9f5aac253d4e4fbce36aade9a6bbeea0e18ef8))

## [29.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.7.0...v29.7.1) (2021-04-15)


### Bug Fixes

* Add and improve accessible names within components ([28c9d07](https://gitlab.com/gitlab-org/gitlab-ui/commit/28c9d07ab36a0945ae756606de39f3f92e442523))

# [29.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.6.0...v29.7.0) (2021-04-15)


### Features

* **Markdown:** Style blockquote blocks ([e541a7e](https://gitlab.com/gitlab-org/gitlab-ui/commit/e541a7ed1f61b13db7aa1defd475b78eb0f4090c))

# [29.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.5.1...v29.6.0) (2021-04-15)


### Features

* **SingleStat:** Integrate animated-number ([dee4ec2](https://gitlab.com/gitlab-org/gitlab-ui/commit/dee4ec27300c0fb7e06ee781001970d1f0442c52))

## [29.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.5.0...v29.5.1) (2021-04-15)


### Performance Improvements

* **v-safe-html:** Remove looping node removal for text setter ([3f026eb](https://gitlab.com/gitlab-org/gitlab-ui/commit/3f026eb9c3916bd76e711a20021a9985652e98d0))

# [29.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.4.0...v29.5.0) (2021-04-14)


### Features

* **AnimatedNumber:** Add AnimatedNumber component ([efe5f91](https://gitlab.com/gitlab-org/gitlab-ui/commit/efe5f91364e4d758558522d9d592a81e8a219c93))

# [29.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.3.0...v29.4.0) (2021-04-12)


### Features

* **GlTooltip:** Add longer delay on show ([6416778](https://gitlab.com/gitlab-org/gitlab-ui/commit/6416778a8e8f062a2f0b306653e52184f5453fcc))

# [29.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.2.1...v29.3.0) (2021-04-09)


### Features

* **GlFormSelect:** apply invalid state styles ([91df9e3](https://gitlab.com/gitlab-org/gitlab-ui/commit/91df9e3f3c09d608109295ecfc6d3df6a3e78950))

## [29.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.2.0...v29.2.1) (2021-04-06)


### Bug Fixes

* **GlDropdown:** Dropdown icon only fix with textSrOnly ([ddbdd4b](https://gitlab.com/gitlab-org/gitlab-ui/commit/ddbdd4b4a3cae1a1cc7db063afc36f223eaaa52b))

# [29.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.1.1...v29.2.0) (2021-04-02)


### Features

* add gl-translate-y-n50 utility class ([81f1dee](https://gitlab.com/gitlab-org/gitlab-ui/commit/81f1deec2059525de4ecefb512a1e7a1b1b8d8cd))

## [29.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.1.0...v29.1.1) (2021-04-02)


### Bug Fixes

* **GlForm:** Remove background image icon ([f2f4900](https://gitlab.com/gitlab-org/gitlab-ui/commit/f2f49002a10b8c2b5187364afed589277db94a7e))

# [29.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v29.0.0...v29.1.0) (2021-03-31)


### Features

* **GlDropdown:** Allow custom button text content while still keeping default loading spinner, icon, and dropdown caret ([d34f970](https://gitlab.com/gitlab-org/gitlab-ui/commit/d34f97012e7f49a0e4a1fec5c63a76222fa9511e))

# [29.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.18.2...v29.0.0) (2021-03-31)


### Features

* **GlAccordion:** Move props from GlAccordionItem to GlAccordion ([394baff](https://gitlab.com/gitlab-org/gitlab-ui/commit/394baff56b7fefb7054860c319bd225f5979d448))
* **GlAccordion:** Wrap the accordion trigger button in header element ([dbafc41](https://gitlab.com/gitlab-org/gitlab-ui/commit/dbafc4172872d085eb1eb4add519f235d1938fa9))


### BREAKING CHANGES

* **GlAccordion:** this adds a new required property to GlAccordionItem

## [28.18.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.18.1...v28.18.2) (2021-03-31)


### Bug Fixes

* **GlAlert:** Migrate dismiss btn to CloseButton ([8968fc1](https://gitlab.com/gitlab-org/gitlab-ui/commit/8968fc1d5ddb13c42f1acce244226aeea764a19e))

## [28.18.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.18.0...v28.18.1) (2021-03-30)


### Bug Fixes

* **GlAvatar:** Fix incorrect size property validation logic ([d62e915](https://gitlab.com/gitlab-org/gitlab-ui/commit/d62e91528a1d4d372121b2c1731f85af29a7b23b))
* **GlForm:** Add invalid styling to form select ([daf8c98](https://gitlab.com/gitlab-org/gitlab-ui/commit/daf8c9837243c1af8568180fdedb60ebc7ecbf46))

# [28.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.17.1...v28.18.0) (2021-03-30)


### Features

* **css:** add hover variant for gl-bg-transparent ([2af7b2d](https://gitlab.com/gitlab-org/gitlab-ui/commit/2af7b2dec4d3bd03bd84a3eef401dc61232b1439))

## [28.17.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.17.0...v28.17.1) (2021-03-30)


### Bug Fixes

* **GlPopover:** Fix custom triggers not working due to hard-coded triggers ([5889093](https://gitlab.com/gitlab-org/gitlab-ui/commit/58890935d1e1b4cd49f7efd9ab1631a113006ec0))

# [28.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.16.2...v28.17.0) (2021-03-25)


### Features

* **GlBanner:** Add ability to add custom actions to the right of button ([2bd5103](https://gitlab.com/gitlab-org/gitlab-ui/commit/2bd510305fb6937f8859df2e8a27e5545f5b10bf))

## [28.16.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.16.1...v28.16.2) (2021-03-25)


### Bug Fixes

* **GlModal:** Update modal header background to white ([84f62e4](https://gitlab.com/gitlab-org/gitlab-ui/commit/84f62e499a133bbb3b0baa467aa51c22c3d53cf3))

## [28.16.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.16.0...v28.16.1) (2021-03-25)


### Bug Fixes

* **GlAccordion:** Remove incorrect role attributes ([9853a4e](https://gitlab.com/gitlab-org/gitlab-ui/commit/9853a4ebb86413ab494dd210d287e80fa7c5e72f))

# [28.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.15.0...v28.16.0) (2021-03-24)


### Features

* **css:** add gl-font-style-normal class ([15e8056](https://gitlab.com/gitlab-org/gitlab-ui/commit/15e80561dda6cf290869e50559e01975a2165c45))

# [28.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.14.0...v28.15.0) (2021-03-23)


### Features

* **GlPopover:** Make popover accessible by hover and focus by default ([d4f199a](https://gitlab.com/gitlab-org/gitlab-ui/commit/d4f199a46369abd3e23db8dd9628f305886889ed))

# [28.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.13.1...v28.14.0) (2021-03-23)


### Features

* **GlPath:** Allow to append custom content to path items ([f01a502](https://gitlab.com/gitlab-org/gitlab-ui/commit/f01a5029d288dafc0eaa2652a8ffe050cd6f3320))

## [28.13.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.13.0...v28.13.1) (2021-03-23)


### Bug Fixes

* Make accessibility improvements to components ([dc6246d](https://gitlab.com/gitlab-org/gitlab-ui/commit/dc6246d121e7be9b97953ed506347bd6db3b276c))

# [28.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.12.1...v28.13.0) (2021-03-21)


### Features

* Add utility class for break-word ([0bcc4c2](https://gitlab.com/gitlab-org/gitlab-ui/commit/0bcc4c2237677c02ea0e8631f732f04570c862b7))

## [28.12.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.12.0...v28.12.1) (2021-03-18)


### Bug Fixes

* **GlButton:** Adjust right padding for small dropdown icon only button ([8ff2a8b](https://gitlab.com/gitlab-org/gitlab-ui/commit/8ff2a8b236fac6ebd3db9a79d990d3b6c40fe876))

# [28.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.11.3...v28.12.0) (2021-03-18)


### Features

* **css:** gl-pl-11-5 utility class ([d7d6535](https://gitlab.com/gitlab-org/gitlab-ui/commit/d7d653592ba32ea17a748fd4f1c1d531d1acb95d))

## [28.11.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.11.2...v28.11.3) (2021-03-18)


### Bug Fixes

* **GlButton:** Default all dropdown button icon sizes to 16 ([bc33d94](https://gitlab.com/gitlab-org/gitlab-ui/commit/bc33d94bac9978fc26c039d501fff95b65cf01b8))

## [28.11.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.11.1...v28.11.2) (2021-03-17)


### Bug Fixes

* **empty-states:** Remove deprecated button variant and fix spacing ([df6f321](https://gitlab.com/gitlab-org/gitlab-ui/commit/df6f321b3759eb1cc24d20154666b9cb0c679ab5))

## [28.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.11.0...v28.11.1) (2021-03-17)


### Bug Fixes

* **dropdown:** Add deprecation notice to button variants ([ccd2157](https://gitlab.com/gitlab-org/gitlab-ui/commit/ccd215786010dacb803d61fd79c8524a650633ff))

# [28.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.10.0...v28.11.0) (2021-03-16)


### Features

* **css:** gl-pl-11 utility class ([b4f5cf3](https://gitlab.com/gitlab-org/gitlab-ui/commit/b4f5cf3da51770c03282290219ca28eb7fbcd143))

# [28.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.9.1...v28.10.0) (2021-03-15)


### Features

* **GlEmptyState:** allow only secondary button ([e10d1fb](https://gitlab.com/gitlab-org/gitlab-ui/commit/e10d1fb39d12c27bcb2196992884b96600fd9639))

## [28.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.9.0...v28.9.1) (2021-03-11)


### Bug Fixes

* **GlButton:** Fix non-hidden caret with no-caret dropdown button ([8daf56d](https://gitlab.com/gitlab-org/gitlab-ui/commit/8daf56db960326fcd490c4590254f37529a471fd))

# [28.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.8.0...v28.9.0) (2021-03-10)


### Features

* **css:** add md variant of display-inline-block ([83c27c0](https://gitlab.com/gitlab-org/gitlab-ui/commit/83c27c09ecb08e5f5e7a082c371e2a71f293437a))

# [28.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.7.0...v28.8.0) (2021-03-09)


### Features

* **GlDaterangePicker:** Expose datepicker props and events ([772d1ad](https://gitlab.com/gitlab-org/gitlab-ui/commit/772d1ad130a5cd650847bf299635a52afa09cd11))

# [28.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.6.0...v28.7.0) (2021-03-09)


### Features

* **css:** Add gl-focus-outline-none utility class ([2913030](https://gitlab.com/gitlab-org/gitlab-ui/commit/29130302099477745b3bce050a4a1e07a1a3e8d7))

# [28.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.5.0...v28.6.0) (2021-03-08)


### Features

* Add float alignment utilities ([541cb7f](https://gitlab.com/gitlab-org/gitlab-ui/commit/541cb7fcbc61ca8cdeea0317baf902b91ea384d8))

# [28.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.4.0...v28.5.0) (2021-03-08)


### Features

* **css:** add additional md and lg margins ([ef4192d](https://gitlab.com/gitlab-org/gitlab-ui/commit/ef4192dd252b4fe7a808674c90853d2366f43fa5))

# [28.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.3.0...v28.4.0) (2021-03-08)


### Features

* **Button:** Prevent text underline ([52aa80f](https://gitlab.com/gitlab-org/gitlab-ui/commit/52aa80fc81cd44dd0d93dab05cc612a018d0a11b))

# [28.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.2.0...v28.3.0) (2021-03-05)


### Features

* **GlIcon:** update validator for deprecated icons sizes ([3c6e65b](https://gitlab.com/gitlab-org/gitlab-ui/commit/3c6e65bc60cadd7778988c13e73f77c27f6856f9))

# [28.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.1.0...v28.2.0) (2021-03-05)


### Features

* **css:** Add gl-sm-display-inline-block class ([730e11f](https://gitlab.com/gitlab-org/gitlab-ui/commit/730e11fc2ca4d62e69b2475c5d7c94d61ec0e2cc))

# [28.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v28.0.0...v28.1.0) (2021-03-03)


### Features

* **css:** Add gl-flex-fill-2 ([fe44017](https://gitlab.com/gitlab-org/gitlab-ui/commit/fe44017304f323bd2a4a981d554717331c82f466))

# [28.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.15.0...v28.0.0) (2021-03-02)


### Bug Fixes

* **GlFormCheckbox:** Show pointer cursor on hover ([dd1f45a](https://gitlab.com/gitlab-org/gitlab-ui/commit/dd1f45aadd9e0a540e14a2c0bd2e39b709361508))
* **GlFormCheckboxTree:** Increase indentation to better align checkbox ([1e4e301](https://gitlab.com/gitlab-org/gitlab-ui/commit/1e4e301950c8609655b48378e4552202ecad12ec))


### Features

* **GlFormCheckbox:** Style checkboxes according to design ([ec54f68](https://gitlab.com/gitlab-org/gitlab-ui/commit/ec54f68fcda42481bd8f967026644d4bb2676a75))
* **GlFormRadio:** Style custom radio boxes and improve text spacing ([874260f](https://gitlab.com/gitlab-org/gitlab-ui/commit/874260f5bed2bda705a31ab547fd7f95864ea251))


### BREAKING CHANGES

* **GlFormRadio:** updates gitlab-ui radio box elements to utilize some
of the same stylings as the checkboxes taking advantage of bootstrap's
styled radio implementation, with alternations made to conform to the
UI kit design including colors, hover states, and other enhancements
* **GlFormCheckbox:** updates gitlab-ui checkboxes to utilize bootstrap's
styled checkbox implementation, with alternations made to conform to
the UI kit design including colors, hover states, and other
enhancements

# [27.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.14.0...v27.15.0) (2021-03-01)


### Features

* **GlPopover:** Update popover max-width to match Figma specs ([c4cfb42](https://gitlab.com/gitlab-org/gitlab-ui/commit/c4cfb4212d3f587f855bd4de522ca8e6afa055dd))

# [27.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.13.1...v27.14.0) (2021-02-25)


### Features

* **css:** Add gl-mt-11 ([8c94546](https://gitlab.com/gitlab-org/gitlab-ui/commit/8c9454616d51be4166c3078370cae8a3cb9c8dcd))


### Reverts

* temporarily revert the update for icon sizes ([5d09680](https://gitlab.com/gitlab-org/gitlab-ui/commit/5d0968075198d6d19c262e9603946208be7fc769))

## [27.13.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.13.0...v27.13.1) (2021-02-24)


### Bug Fixes

* **GlFormInputGroup:** Migrate GlDeprecatedDropdown to GlDropdown ([4950fef](https://gitlab.com/gitlab-org/gitlab-ui/commit/4950feff8442c5c44ce8b3f68a73b1695fdf800c))

# [27.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.12.2...v27.13.0) (2021-02-24)


### Features

* **css:** Add gl-md-w-auto ([93bb29a](https://gitlab.com/gitlab-org/gitlab-ui/commit/93bb29a09c036ce2ac6101494cdd083ea70b47a7))

## [27.12.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.12.1...v27.12.2) (2021-02-24)


### Bug Fixes

* ensure labels are not underlined in gl-alerts ([c2740b5](https://gitlab.com/gitlab-org/gitlab-ui/commit/c2740b51570b20ea7e444b7e48a51f6fb7e995a1))

## [27.12.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.12.0...v27.12.1) (2021-02-23)


### Bug Fixes

* **banner:** Remove deprecated info button variant in favor of confirm ([5e5c1e9](https://gitlab.com/gitlab-org/gitlab-ui/commit/5e5c1e95dd42f29cc72a83cdac09c30ec1cd217c))

# [27.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.11.0...v27.12.0) (2021-02-23)


### Features

* **GlAlert:** Add sticky property ([edb326f](https://gitlab.com/gitlab-org/gitlab-ui/commit/edb326f10c792dfaba460164553c86cb7e76be4c))

# [27.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.10.0...v27.11.0) (2021-02-23)


### Features

* **css:** gl-pl-8 utility class ([53799fc](https://gitlab.com/gitlab-org/gitlab-ui/commit/53799fc313a2a84ca2c6cee3f1237c738b0ab4e7))

# [27.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.9.1...v27.10.0) (2021-02-22)


### Features

* **GlFilteredSearch:** Add OR multi-select capability ([d85e072](https://gitlab.com/gitlab-org/gitlab-ui/commit/d85e07275ee9dcd139c2483eb23e324de77df068))

## [27.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.9.0...v27.9.1) (2021-02-22)


### Bug Fixes

* **alert:** Remove deprecated info button variant in favor of confirm ([7871f7c](https://gitlab.com/gitlab-org/gitlab-ui/commit/7871f7c9c720605097a0693a4c60774a091cf27f))
* **modal:** Remove depreacted button variants from modals ([71cb98d](https://gitlab.com/gitlab-org/gitlab-ui/commit/71cb98d15b91608f6b1f2e04ea3fd9eef0c0c886))

# [27.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.8.1...v27.9.0) (2021-02-19)


### Features

* **css:** gl-order-n1 utility class ([1e5e637](https://gitlab.com/gitlab-org/gitlab-ui/commit/1e5e6371a122c9c83d0f20c87e2c916655285c86))

## [27.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.8.0...v27.8.1) (2021-02-19)


### Bug Fixes

* **FriendlyWrap:** Gracefully handle nullish text ([39f5d1d](https://gitlab.com/gitlab-org/gitlab-ui/commit/39f5d1db596330ab0cd62c35c679d9442d456a16))
* correcting spacing for top dropdown ([9238e27](https://gitlab.com/gitlab-org/gitlab-ui/commit/9238e27ab6de08f93383f37e1f848f50eb2f0234))

# [27.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.7.1...v27.8.0) (2021-02-19)


### Features

* **GlSingleStat:** allow unit prop to accept string or number ([52dbd6f](https://gitlab.com/gitlab-org/gitlab-ui/commit/52dbd6fb8152075ece2fd9a868c3dc065a588787))

## [27.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.7.0...v27.7.1) (2021-02-17)


### Bug Fixes

* **GlSingleStat:** Update component examples ([eac46db](https://gitlab.com/gitlab-org/gitlab-ui/commit/eac46dbc3c35909863bb817bcab57402875563c9))

# [27.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.6.1...v27.7.0) (2021-02-16)


### Features

* add util class for 100vw max width ([e2fc649](https://gitlab.com/gitlab-org/gitlab-ui/commit/e2fc6496949cf38dc8510efdf02484f308e172e1))

## [27.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.6.0...v27.6.1) (2021-02-12)


### Bug Fixes

* set color for .gl-avatar-labeled ([e0c8b80](https://gitlab.com/gitlab-org/gitlab-ui/commit/e0c8b8071ffe0e9896e8b466f98fcaa83e74b6a6))

# [27.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.5.0...v27.6.0) (2021-02-11)


### Features

* **css:** Add gl-text-blue-200 utility class ([269ec74](https://gitlab.com/gitlab-org/gitlab-ui/commit/269ec74e44b36a72eae2f90debc269534fbdaf99))

# [27.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.4.7...v27.5.0) (2021-02-11)


### Features

* **GlTokenSelector:** Add new CSS props and dropdown slot ([8a5deff](https://gitlab.com/gitlab-org/gitlab-ui/commit/8a5defff847f71daceba5bcc42543e07246375d0))

## [27.4.7](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.4.6...v27.4.7) (2021-02-09)


### Bug Fixes

* **GlDropdown:** Add space between split dropdown for btn-confirm ([5bc8823](https://gitlab.com/gitlab-org/gitlab-ui/commit/5bc8823cf035fb4790d2d6e1d17a3b366de43452))
* **GlDropdown:** Match chevron color and fix disabled spacing ([69d5b44](https://gitlab.com/gitlab-org/gitlab-ui/commit/69d5b446d58bc2d31300b6f10f7d6615ef7c2496))
* **GlDropdown:** Update split dropdown chevron to match border-color ([3438c83](https://gitlab.com/gitlab-org/gitlab-ui/commit/3438c83b81860230a983d920b95dc4a9901bcec0))

## [27.4.6](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.4.5...v27.4.6) (2021-02-05)


### Bug Fixes

* **GlPopover:** Pass through popover manual events ([3bd7635](https://gitlab.com/gitlab-org/gitlab-ui/commit/3bd7635ee1600f47cdfd7cf958b0e499c73fb427))

## [27.4.5](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.4.4...v27.4.5) (2021-02-05)


### Bug Fixes

* **GlChart:** Upgrade to echarts 4.9.0 ([1a832ed](https://gitlab.com/gitlab-org/gitlab-ui/commit/1a832ed73d8db84220f4348b1c299acb78c1986d))

## [27.4.4](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.4.3...v27.4.4) (2021-02-05)


### Bug Fixes

* **GlSearchBoxByType:** fix overlapping clear button and loading icon ([b72c70e](https://gitlab.com/gitlab-org/gitlab-ui/commit/b72c70ec62d96b7ccaf4c2ddfade457da079292c))

## [27.4.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.4.2...v27.4.3) (2021-02-04)


### Reverts

* feat(GlFormGroup): Add validation states and style text ([15e9c17](https://gitlab.com/gitlab-org/gitlab-ui/commit/15e9c17724049fdf26acb11abc67ff5d87cb1cb5))

## [27.4.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.4.1...v27.4.2) (2021-02-04)


### Bug Fixes

* **GlDropdown:** Uncenter dropdown item check ([88fe7e6](https://gitlab.com/gitlab-org/gitlab-ui/commit/88fe7e619041e801751a08658ec6c181f8f57a48))

## [27.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.4.0...v27.4.1) (2021-02-03)


### Bug Fixes

* **GlToggle:** Make toggle accessible ([ba894e3](https://gitlab.com/gitlab-org/gitlab-ui/commit/ba894e38dc5a5540e43f5e83da4becc3b89e3e36))

# [27.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.3.0...v27.4.0) (2021-02-02)


### Features

* **GlAlert:** create opt-in for content max-width ([5247500](https://gitlab.com/gitlab-org/gitlab-ui/commit/5247500e986cff992a46c549aa55cd7a093163f1))

# [27.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.2.0...v27.3.0) (2021-02-02)


### Features

* **GlFormGroup:** Add validation states and style text ([8791369](https://gitlab.com/gitlab-org/gitlab-ui/commit/8791369cdf2800ebcbbf7cc70a22e3ca5d89061e))

# [27.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.1.5...v27.2.0) (2021-02-02)


### Features

* **GlAvatarLabeled:** Add optional label & sublabel links ([805ab02](https://gitlab.com/gitlab-org/gitlab-ui/commit/805ab02754194eca70be683ec26f42d752e6e882))

## [27.1.5](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.1.4...v27.1.5) (2021-02-01)


### Bug Fixes

* Fix gl-md-mt-0 utility mixin ([a9710a3](https://gitlab.com/gitlab-org/gitlab-ui/commit/a9710a3d172acc3809c21aa0cbeeb9ec4c90afe7))

## [27.1.4](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.1.3...v27.1.4) (2021-01-29)


### Bug Fixes

* **GlTabs:** Fix tab with counter badges height ([40bc958](https://gitlab.com/gitlab-org/gitlab-ui/commit/40bc958fdf990a932ac5a9f352fd8d397f0ca72e))

## [27.1.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.1.2...v27.1.3) (2021-01-28)


### Bug Fixes

* **GlDropdown:** adjust spacing to match design specs ([d71fe91](https://gitlab.com/gitlab-org/gitlab-ui/commit/d71fe91ecb5b1c4aceed2be87ba7999056b05289))

## [27.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.1.1...v27.1.2) (2021-01-28)


### Bug Fixes

* **Chart:** Wait Tick Before Initializing Chart ([856836e](https://gitlab.com/gitlab-org/gitlab-ui/commit/856836e9469c4c959bd8c5bece4541b179263983))

## [27.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.1.0...v27.1.1) (2021-01-26)


### Performance Improvements

* Improve splitAfterSymbols ([84fe3ce](https://gitlab.com/gitlab-org/gitlab-ui/commit/84fe3cef20e196d23c4a3c2d9b5afa0429f86901))
* Make FriendlyWrap a functional component ([9d7a86d](https://gitlab.com/gitlab-org/gitlab-ui/commit/9d7a86d59cc82434be314015c02b3df1d46f0c4a))

# [27.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v27.0.0...v27.1.0) (2021-01-26)


### Features

* **css:** add gl-w-30p utility ([299402b](https://gitlab.com/gitlab-org/gitlab-ui/commit/299402bd8b0990c95e0a56df437122b94ffb822c))

# [27.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v26.4.0...v27.0.0) (2021-01-25)


### Bug Fixes

* **css:** rename display mixins to match naming conventions ([2513af8](https://gitlab.com/gitlab-org/gitlab-ui/commit/2513af850b7b5aefca64be6f2026f81fc9ee3c8e))


### BREAKING CHANGES

* **css:** This renames responsive display CSS mixins to adhere to
GitLab UI's naming conventions. Any project that uses one of those
mixins, or their corresponding utility classes will have to proceed to
the following replacements:

* `gl-display-sm-none` -> `gl-sm-display-none`
* `gl-display-md-none` -> `gl-md-display-none`
* `gl-display-lg-none` -> `gl-lg-display-none`
* `gl-display-sm-flex` -> `gl-sm-display-flex`
* `gl-display-md-flex` -> `gl-md-display-flex`
* `gl-display-lg-flex` -> `gl-lg-display-flex`
* `gl-display-sm-inline-flex` -> `gl-sm-display-inline-flex`
* `gl-display-lg-inline-flex` -> `gl-lg-display-inline-flex`
* `gl-display-sm-block` -> `gl-sm-display-block`
* `gl-display-md-block` -> `gl-md-display-block`
* `gl-display-lg-block` -> `gl-lg-display-block`
* `gl-display-lg-inline-block` -> `gl-lg-display-inline-block`
* `gl-display-lg-table-cell` -> `gl-lg-display-table-cell`

# [26.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v26.3.0...v26.4.0) (2021-01-25)


### Features

* **css:** Add gl-table-layout-fixed class ([e67f25a](https://gitlab.com/gitlab-org/gitlab-ui/commit/e67f25a64313f2eb0ecf8050e7971b5a4adcc3b6))

# [26.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v26.2.0...v26.3.0) (2021-01-22)


### Features

* **css:** add gl-ml-n4 and gl-mr-n4 ([6a600d3](https://gitlab.com/gitlab-org/gitlab-ui/commit/6a600d3e76fc483910e1a292855100d4ca919ab7))

# [26.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v26.1.0...v26.2.0) (2021-01-22)


### Features

* **GlTokenSelector:** Add `textInputAttrs` prop ([063f872](https://gitlab.com/gitlab-org/gitlab-ui/commit/063f872d7fbf936fe368a9b873ef994cd017732f))

# [26.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v26.0.0...v26.1.0) (2021-01-21)


### Features

* **css:** Add gl-lg-ml-2 ([62313a6](https://gitlab.com/gitlab-org/gitlab-ui/commit/62313a603c2e9d682ad73a9d608cccc17bfd767f))

# [26.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.12.2...v26.0.0) (2021-01-20)


### Bug Fixes

* **GlAccordionItem:** properly resolve collapse directive ([10eb214](https://gitlab.com/gitlab-org/gitlab-ui/commit/10eb21486e7a859a05290c6488f40d1873c00efc))


### Features

* **GlSingleStat:** Restyle and enhance component ([4917aa4](https://gitlab.com/gitlab-org/gitlab-ui/commit/4917aa49728edb3c98990e92be68361ad49c414f))


### BREAKING CHANGES

* **GlSingleStat:** Update component API

The component is being restyled from the ground up.
Additional props are being exposed via the component
API in order to display additional functionality.

## [25.12.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.12.1...v25.12.2) (2021-01-20)


### Bug Fixes

* **GlModal:** Update gl-modal to design guidelines ([46f7239](https://gitlab.com/gitlab-org/gitlab-ui/commit/46f7239ced60eb605fcb3a4f5e349413f2ce6a25))

## [25.12.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.12.0...v25.12.1) (2021-01-19)


### Bug Fixes

* **Chart:** Revert Wait Tick For Charts ([525ade2](https://gitlab.com/gitlab-org/gitlab-ui/commit/525ade26afbe94e8dbcd6d445e86a41c3c12dd5d))

# [25.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.11.4...v25.12.0) (2021-01-19)


### Features

* **css:** Add gl-max-h-full class ([37d2c2c](https://gitlab.com/gitlab-org/gitlab-ui/commit/37d2c2c527b7a0d08b83d65d7a4ebf18fb533b15))

## [25.11.4](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.11.3...v25.11.4) (2021-01-18)


### Bug Fixes

* **Chart:** Wait Tick Before Initializing Chart ([ab7b953](https://gitlab.com/gitlab-org/gitlab-ui/commit/ab7b95310dc6b44817596af74304792e69e04b9c))

## [25.11.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.11.2...v25.11.3) (2021-01-14)


### Bug Fixes

* **GlButton:** Display deprecated button variants in examples ([c1cec43](https://gitlab.com/gitlab-org/gitlab-ui/commit/c1cec43d38f77733a66b706f0c00a8f952e1d089))

## [25.11.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.11.1...v25.11.2) (2021-01-14)


### Bug Fixes

* **css:** Correct the form group help text color ([54e9228](https://gitlab.com/gitlab-org/gitlab-ui/commit/54e92281e63a3c6f179229517a02db02174d388f))

## [25.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.11.0...v25.11.1) (2021-01-14)


### Bug Fixes

* **docs:** add missing single quote ([896065f](https://gitlab.com/gitlab-org/gitlab-ui/commit/896065ff2cbc466e5772eb21e1249283ddea1940))

# [25.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.10.0...v25.11.0) (2021-01-14)


### Features

* **css:** Add gl-lg-mr-2 lg-flex and gl-lg-mx-2 ([c287106](https://gitlab.com/gitlab-org/gitlab-ui/commit/c2871067de538cf27052090b81ddfb2c614b186c))

# [25.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.9.0...v25.10.0) (2021-01-13)


### Features

* **Button:** Adding affirm button variant ([66ae035](https://gitlab.com/gitlab-org/gitlab-ui/commit/66ae035993185e8d79f63261f0eb970e99c39a6f))

# [25.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.8.0...v25.9.0) (2021-01-13)


### Features

* **GlDropdown:** Add header and footer slots to GlDropdown ([c78ac7c](https://gitlab.com/gitlab-org/gitlab-ui/commit/c78ac7cb471b1cb65ea53cbe167a6a430ff74795))

# [25.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.7.3...v25.8.0) (2021-01-11)


### Features

* **css:** add gl-border-gray-50 & gl-w-90p utility mixins ([4cdf421](https://gitlab.com/gitlab-org/gitlab-ui/commit/4cdf4219d561e22c8bd66f155be0025692e72379))

## [25.7.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.7.2...v25.7.3) (2021-01-11)


### Bug Fixes

* **Modal:** Autofocus close button, if it is the only focusable element ([daeb209](https://gitlab.com/gitlab-org/gitlab-ui/commit/daeb209a90c4973dcfa3c9c24851b70c3818b7fa))

## [25.7.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.7.1...v25.7.2) (2021-01-10)


### Bug Fixes

* **GlModal:** use GitLab SVGs' close icon ([3c707b5](https://gitlab.com/gitlab-org/gitlab-ui/commit/3c707b588bf61e86c62b17cd06a70bd42acf6330))

## [25.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.7.0...v25.7.1) (2021-01-08)


### Bug Fixes

* **GlEmptyState:** Make empty state illustration decorative ([8bab39a](https://gitlab.com/gitlab-org/gitlab-ui/commit/8bab39a09022514d57665a229deeaecaf602ea79))

# [25.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.6.0...v25.7.0) (2021-01-08)


### Features

* **css:** add gl-md-display-inline-flex utility class ([c0a302f](https://gitlab.com/gitlab-org/gitlab-ui/commit/c0a302f49fb64c3b7b53f3a339354d956fee6f50))

# [25.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.5.0...v25.6.0) (2021-01-07)


### Features

* **Focus:** Create inset focus ring for clipped components ([d3935cc](https://gitlab.com/gitlab-org/gitlab-ui/commit/d3935cc5eef642393e8dd74c13cab7f3af8a679c))

# [25.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.4.0...v25.5.0) (2021-01-06)


### Features

* **css:** Add transparent stroke utility ([5873e81](https://gitlab.com/gitlab-org/gitlab-ui/commit/5873e81faa7df12d6a532ac3fa0b9546fec5231f))

# [25.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.3.1...v25.4.0) (2021-01-05)


### Features

* **focus:** Initial update to focus state ([7e3ba9f](https://gitlab.com/gitlab-org/gitlab-ui/commit/7e3ba9f673e9db625dade25098d36d5ddcf07712))

## [25.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.3.0...v25.3.1) (2021-01-05)


### Bug Fixes

* **GlButton:** Use multiply for tertiary button ([c7b11e0](https://gitlab.com/gitlab-org/gitlab-ui/commit/c7b11e0da506cd74cfef314f9f464598f83eae44))


### Reverts

* **GlAlert:** alert template changes ([b75c897](https://gitlab.com/gitlab-org/gitlab-ui/commit/b75c8970e72f3d6c7df64c3133c398ff6b3db74e))

# [25.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.2.1...v25.3.0) (2021-01-05)


### Features

* **GlTabs:** add action buttons prop ([fccb2e6](https://gitlab.com/gitlab-org/gitlab-ui/commit/fccb2e607aa83fc6aae4c6ae91106d773e752bde))

## [25.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.2.0...v25.2.1) (2020-12-30)


### Bug Fixes

* **GlDrawer:** Use GlButton for drawer close ([bb05667](https://gitlab.com/gitlab-org/gitlab-ui/commit/bb05667e23cf0c13a06086b0b044b63bc19819c7))

# [25.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.1.1...v25.2.0) (2020-12-30)


### Features

* **Banner:** Use GlButton for banner close ([c766a93](https://gitlab.com/gitlab-org/gitlab-ui/commit/c766a9331db9c8eb5d65696a9c6af4b74ead3bf2))

## [25.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.1.0...v25.1.1) (2020-12-29)


### Bug Fixes

* Use GlButton for clear button template ([d77f56c](https://gitlab.com/gitlab-org/gitlab-ui/commit/d77f56cfb6948b7795279ccd31743c6453dbc8cb))

# [25.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.0.1...v25.1.0) (2020-12-28)


### Features

* **GlAlert:** Adding capability to have error variant ([f0ab708](https://gitlab.com/gitlab-org/gitlab-ui/commit/f0ab708f45740addf0b9340c0dc5777efc367097))

## [25.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v25.0.0...v25.0.1) (2020-12-23)


### Bug Fixes

* **GlFormSelect:** stop text overflowing into right icon ([f79cfd1](https://gitlab.com/gitlab-org/gitlab-ui/commit/f79cfd1b41bd097fee118002b961d609cb2f2b72))

# [25.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.11.1...v25.0.0) (2020-12-23)


### Features

* **GlDeprecatedButton:** remove GlDeprecatedButton component ([d9105e7](https://gitlab.com/gitlab-org/gitlab-ui/commit/d9105e78323692ed37e3ac8ca123a77e36a99178))


### BREAKING CHANGES

* **GlDeprecatedButton:** This removes the GlDeprecatedButton component. Please
use GlButton instead.

## [24.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.11.0...v24.11.1) (2020-12-21)


### Bug Fixes

* **GlTooltip:** Fix tooltip hide/show animation ([4b06996](https://gitlab.com/gitlab-org/gitlab-ui/commit/4b069969466b0a156813a3c4bfb4fbde05418784))

# [24.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.10.0...v24.11.0) (2020-12-21)


### Features

* **GlAccordion:** Add GlAccordion component ([6a095ac](https://gitlab.com/gitlab-org/gitlab-ui/commit/6a095ac401c00248459b637855f3f627bde93f98))

# [24.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.9.0...v24.10.0) (2020-12-17)


### Features

* add 85% util class to sizing.scss ([a894c5b](https://gitlab.com/gitlab-org/gitlab-ui/commit/a894c5b5ed93d370cfe4307f62c276724889f988))

# [24.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.8.1...v24.9.0) (2020-12-16)


### Bug Fixes

* **GlFormSelect:** make GlFormSelect Pajamas compliant ([81632d6](https://gitlab.com/gitlab-org/gitlab-ui/commit/81632d69916cbc38bd5d485dc5dba459057b8336))


### Features

* **GlSprintf:** Allow custom start/end placeholders ([5b5d4db](https://gitlab.com/gitlab-org/gitlab-ui/commit/5b5d4db8a4fa436832b9fa77df24a0e3baf5ebc0))

## [24.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.8.0...v24.8.1) (2020-12-15)


### Bug Fixes

* **GlTooltip:** Override bootstraps lowered opacity tooltip style ([60680a5](https://gitlab.com/gitlab-org/gitlab-ui/commit/60680a5131cb4ba635956d9d7fc5cd59f1a37411))

# [24.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.7.0...v24.8.0) (2020-12-15)


### Features

* **GlTokenSelector:** add support for custom classes ([b8a4e00](https://gitlab.com/gitlab-org/gitlab-ui/commit/b8a4e0022d29124389e84d0d5c0c0ae4af898de1))

# [24.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.6.0...v24.7.0) (2020-12-10)


### Features

* **css:** Add additional percentage width utility classes ([e587002](https://gitlab.com/gitlab-org/gitlab-ui/commit/e5870021425f94393da29cb31617d63687af269b))

# [24.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.5.0...v24.6.0) (2020-12-09)


### Features

* **GlSorting:** add CSS class related props ([04fba11](https://gitlab.com/gitlab-org/gitlab-ui/commit/04fba113951d49048390dfac04a9850c72239af7))

# [24.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.4.0...v24.5.0) (2020-12-04)


### Features

* adding new width variable ([7a97e6a](https://gitlab.com/gitlab-org/gitlab-ui/commit/7a97e6a1251f743208069538f67664900a5a3117))

# [24.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.3.3...v24.4.0) (2020-12-03)


### Features

* **css:** Add opacity 0 ([2f7f1be](https://gitlab.com/gitlab-org/gitlab-ui/commit/2f7f1be28ea5245bce6e71805ba9e341c370b28e))

## [24.3.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.3.2...v24.3.3) (2020-12-03)


### Bug Fixes

* **GlPopover:** Update popover styles based on designs ([1d47eeb](https://gitlab.com/gitlab-org/gitlab-ui/commit/1d47eebe7091f43baa641477aa0ded3d116b96cc))

## [24.3.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.3.1...v24.3.2) (2020-11-30)


### Bug Fixes

* Add focus state to toggle and clear icon button ([24a359a](https://gitlab.com/gitlab-org/gitlab-ui/commit/24a359ab436e204cc978a6b8979bdba079939248))

## [24.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.3.0...v24.3.1) (2020-11-30)


### Bug Fixes

* **GlDropdown:** Set default category to primary ([d43328c](https://gitlab.com/gitlab-org/gitlab-ui/commit/d43328c3d5ebf327a1b4be04e074b5d0be405812)), closes [/gitlab.com/gitlab-org/gitlab-ui/-/blob/v24.3.0/src/components/base/dropdown/dropdown.vue#L65](https://gitlab.com//gitlab.com/gitlab-org/gitlab-ui/-/blob/v24.3.0/src/components/base/dropdown/dropdown.vue/issues/L65) [/gitlab.com/gitlab-org/gitlab-ui/-/blob/v24.3.0/src/components/base/button/button.vue#L24](https://gitlab.com//gitlab.com/gitlab-org/gitlab-ui/-/blob/v24.3.0/src/components/base/button/button.vue/issues/L24) [/gitlab.com/gitlab-org/gitlab-services/design.gitlab.com/blob/6e6a7b6a6d5ef8ff8ab574495f43fbefd3e8866e/contents/components/button.md#L41](https://gitlab.com//gitlab.com/gitlab-org/gitlab-services/design.gitlab.com/blob/6e6a7b6a6d5ef8ff8ab574495f43fbefd3e8866e/contents/components/button.md/issues/L41)

# [24.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.2.0...v24.3.0) (2020-11-30)


### Features

* **GlToken:** Add category based background color ([25b525f](https://gitlab.com/gitlab-org/gitlab-ui/commit/25b525f2e58000fbb459ff6a747122bd0f1fd438))

# [24.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.1.0...v24.2.0) (2020-11-27)


### Features

* **css:** Add overflow-x-auto utility class ([415cf8b](https://gitlab.com/gitlab-org/gitlab-ui/commit/415cf8b37811b2465b589555e7d9db4d85fdef12))

# [24.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.0.2...v24.1.0) (2020-11-26)


### Features

* **Buttons:** Increase button contrast ([5c3ad3b](https://gitlab.com/gitlab-org/gitlab-ui/commit/5c3ad3b64c4a702d10a17a2ea26ddf0788d9804b))

## [24.0.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.0.1...v24.0.2) (2020-11-24)


### Bug Fixes

* Make various components more accessible ([4a1efbe](https://gitlab.com/gitlab-org/gitlab-ui/commit/4a1efbea077b7754fc00236fe03331d3855022fc))

## [24.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v24.0.0...v24.0.1) (2020-11-23)


### Bug Fixes

* **buttons:** Correct dropdown button styles for categories ([bb65738](https://gitlab.com/gitlab-org/gitlab-ui/commit/bb65738b3ce59a7d5c82f107d32a5988d0b8c61c))

# [24.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.12.1...v24.0.0) (2020-11-23)


### Features

* **GlColumnChart:** remove `data` prop ([79cd652](https://gitlab.com/gitlab-org/gitlab-ui/commit/79cd652fc14f8859cedf4f63106723eba5b9154e))


### BREAKING CHANGES

* **GlColumnChart:** removes the `data` prop from the
GlColumnChart and GlStackedColumnChart in favour
of the `bars` and `line` props for specifying the
data to render

feat(GlStackedColumnChart): remove `data` prop

Removes the data prop, in favour of the lines
and bars props that are available on the
components

## [23.12.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.12.0...v23.12.1) (2020-11-19)


### Bug Fixes

* **GlButton:** render label buttons as spans ([f995453](https://gitlab.com/gitlab-org/gitlab-ui/commit/f995453fdc21dc851d46d7cb82431e906aff7a17))

# [23.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.11.1...v23.12.0) (2020-11-18)


### Features

* **GlTab:** Allow tab component to receive titleLinkClass props ([11be4c8](https://gitlab.com/gitlab-org/gitlab-ui/commit/11be4c8e4ce7d2ccd3ff76d88b06c416efc64938))

## [23.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.11.0...v23.11.1) (2020-11-18)


### Bug Fixes

* **GlIcon:** Make icons decorative ([d67e4c7](https://gitlab.com/gitlab-org/gitlab-ui/commit/d67e4c7a4a619506e6d33938d97d0a007dbb06d7))

# [23.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.10.1...v23.11.0) (2020-11-18)


### Features

* **css:** Add large breakpoint right padding scale 5 ([9fec463](https://gitlab.com/gitlab-org/gitlab-ui/commit/9fec463147c167c9d4668a5a5376472485400a97))

## [23.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.10.0...v23.10.1) (2020-11-17)


### Bug Fixes

* **css:** gl-pb-11 faulty definition ([3a7ea4f](https://gitlab.com/gitlab-org/gitlab-ui/commit/3a7ea4f5bf458105d5890b0e67389458fb355062))

# [23.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.9.0...v23.10.0) (2020-11-17)


### Features

* **css:** Expose more color shades for data viz ([27f3cd7](https://gitlab.com/gitlab-org/gitlab-ui/commit/27f3cd7fce00615d8a718985ef6e89ba62859112))

# [23.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.8.1...v23.9.0) (2020-11-16)


### Features

* **css:** Add large breakpoint flex-end alignment ([776f590](https://gitlab.com/gitlab-org/gitlab-ui/commit/776f590e95b9702cdf36f42ac3cec1c7c1700371))

## [23.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.8.0...v23.8.1) (2020-11-16)


### Bug Fixes

* **dropdown-form:** Remove extra padding from dropdown form ([95b486b](https://gitlab.com/gitlab-org/gitlab-ui/commit/95b486b4877d81bccd6794571853495495cdf204))

# [23.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.7.0...v23.8.0) (2020-11-12)


### Features

* **GlDatepicker:** Allow id and name props ([b968763](https://gitlab.com/gitlab-org/gitlab-ui/commit/b968763f83a470018e533e3f61410b2af0ba51a2))

# [23.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.6.1...v23.7.0) (2020-11-12)


### Features

* **GlFilteredSearch:** Add suggestionsListClass prop ([903d0f2](https://gitlab.com/gitlab-org/gitlab-ui/commit/903d0f28b32563ca52aa81b96a83b97d98efc00f))

## [23.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.6.0...v23.6.1) (2020-11-10)


### Bug Fixes

* **GlTooltip:** Update tooltip based on audit ([4dc58f3](https://gitlab.com/gitlab-org/gitlab-ui/commit/4dc58f3b66ba30c606acf02ef370cfbbfcdbe211))

# [23.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.5.0...v23.6.0) (2020-11-10)


### Features

* **css:** Add white-space-pre-line utility ([6ece2b3](https://gitlab.com/gitlab-org/gitlab-ui/commit/6ece2b33b73738ddeb1fe449295dc3511131cd81))

# [23.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.4.0...v23.5.0) (2020-11-10)


### Features

* **css:** Add gl-mb-8 spacing utility ([8fa31a5](https://gitlab.com/gitlab-org/gitlab-ui/commit/8fa31a519b3a3d46c321b8a6d64339ff10cdbe18))

# [23.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.3.0...v23.4.0) (2020-11-10)


### Features

* **css:** Add margins space levels 4 and 5 ([2ee1371](https://gitlab.com/gitlab-org/gitlab-ui/commit/2ee1371b9a4bead721b93e5102c036da2715fae9))

# [23.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.2.0...v23.3.0) (2020-11-10)


### Features

* **css:** Add utility classes ([4ea5a13](https://gitlab.com/gitlab-org/gitlab-ui/commit/4ea5a13b2628531022bcd266424554a1aa057a35))

# [23.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.1.0...v23.2.0) (2020-11-09)


### Features

* **css:** add gl-align-self-end mixin ([7a2f6c7](https://gitlab.com/gitlab-org/gitlab-ui/commit/7a2f6c7d963547569f2ad386e6be759ad07091a0))

# [23.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v23.0.0...v23.1.0) (2020-11-09)


### Features

* Add `gl-m*-n2` utility classes ([f70bc43](https://gitlab.com/gitlab-org/gitlab-ui/commit/f70bc4365fd6f5988c855d2571f7c0074b7fbd6a))

# [23.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v22.0.3...v23.0.0) (2020-11-05)


### Features

* **GlCard:** custom card component implementation ([c0872ce](https://gitlab.com/gitlab-org/gitlab-ui/commit/c0872cee37091e9b15d31d105a1820548a25ef3d))


### BREAKING CHANGES

* **GlCard:** This drops the underlying `BCard` component.

`GlCard`'s API supports the following props and slots, that were already
supported by `BCard`:

Props:

- `headerClass`
- `bodyClass`
- `footerClass`

Slots:

- `header`
- `default`
- `footer`

If you're only using those props/slots, this is a drop-in replacement.

## [22.0.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v22.0.2...v22.0.3) (2020-11-04)


### Bug Fixes

* **form input:** Correct background color of inputs ([21d293d](https://gitlab.com/gitlab-org/gitlab-ui/commit/21d293d79ab4608c25ea23b63124bd23d9a6e8dd))

## [22.0.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v22.0.1...v22.0.2) (2020-11-04)


### Bug Fixes

* **GlTooltip:** Remove arrow bottom border ([75f53ca](https://gitlab.com/gitlab-org/gitlab-ui/commit/75f53cac2d7dfa7fd3e1b42d75fa3a203c46a121))

## [22.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v22.0.0...v22.0.1) (2020-11-04)


### Bug Fixes

* **dropdown button:** Correct spacing of dropdown icon ([ca5d8e6](https://gitlab.com/gitlab-org/gitlab-ui/commit/ca5d8e64905b90065367991826ee65ad955cdbc3))
* **dropdown snapshots:** Updates snapshots to use optional text ([4c8fa45](https://gitlab.com/gitlab-org/gitlab-ui/commit/4c8fa454c840e64bb559c6ae2d14848794a36d8a))

# [22.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.44.0...v22.0.0) (2020-11-03)


### Features

* **GlBadge:** remove GlDeprecatedBadge ([2747668](https://gitlab.com/gitlab-org/gitlab-ui/commit/2747668d9ca76d153d570d5de0f4954a0c780846))


### BREAKING CHANGES

* **GlBadge:** GlDeprecatedBadge is being removed, use GlBadge instead

# [21.44.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.43.0...v21.44.0) (2020-11-03)


### Bug Fixes

* **dropdown:** dropdown accepts `disabled` prop ([ee169eb](https://gitlab.com/gitlab-org/gitlab-ui/commit/ee169eb2f125ffeb82a1cd0300dee5d8733c3afd))


### Features

* **GlTabs:** Add custom classes to nav in tabs ([1f3455c](https://gitlab.com/gitlab-org/gitlab-ui/commit/1f3455ce668c6537be5d7967b07fa4a6ab093d01))

# [21.43.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.42.0...v21.43.0) (2020-10-30)


### Features

* **GlDropdown:** Add loading state to dropdown ([b89defa](https://gitlab.com/gitlab-org/gitlab-ui/commit/b89defab9d3dba40efc9231d10d6408fbca4539a))

# [21.42.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.41.0...v21.42.0) (2020-10-29)


### Bug Fixes

* **GlButton:** Update disabled button icon fill color ([6957e7f](https://gitlab.com/gitlab-org/gitlab-ui/commit/6957e7f77cbe8e201d8b755dd13289364d38a56d))


### Features

* **GlButton:** Add borderless (tertiary) loading button variant ([8dd2f2e](https://gitlab.com/gitlab-org/gitlab-ui/commit/8dd2f2e30decb60ad88085fedcc4b55fa5e64b3a))

# [21.41.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.40.0...v21.41.0) (2020-10-28)


### Features

* **css:** Adds border radius of scale 6 to utilities ([0a4606b](https://gitlab.com/gitlab-org/gitlab-ui/commit/0a4606b51ef1f03b593dcfa322c57a6264f5958a))

# [21.40.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.39.1...v21.40.0) (2020-10-28)


### Features

* **css:** Add additional responsive display classes ([96de07c](https://gitlab.com/gitlab-org/gitlab-ui/commit/96de07c123b490e94d989203c14463029ca20cad))

## [21.39.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.39.0...v21.39.1) (2020-10-28)


### Bug Fixes

* Conditional slot rendering for use in modals ([cf59ea5](https://gitlab.com/gitlab-org/gitlab-ui/commit/cf59ea5e4f631d42e8c34f58909c527dc6727034))

# [21.39.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.38.0...v21.39.0) (2020-10-28)


### Features

* **css:** Add width classes for pipeline visualization ([238a4d0](https://gitlab.com/gitlab-org/gitlab-ui/commit/238a4d02ba6e69e1a3e8b4c9bb4a64f16df60056))

# [21.38.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.37.0...v21.38.0) (2020-10-26)


### Features

* **GlTabs:** Add justified tabs prop and examples ([342d13d](https://gitlab.com/gitlab-org/gitlab-ui/commit/342d13d36970c5e99750655036021bc0246ea26a))

# [21.37.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.36.0...v21.37.0) (2020-10-26)


### Features

* **css:** add gl-align-items-flex-start ([66a097f](https://gitlab.com/gitlab-org/gitlab-ui/commit/66a097ff36b3c96aad70c3408c8913ace00f241a))

# [21.36.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.35.2...v21.36.0) (2020-10-23)


### Features

* **css:** Add gl-flex-basis-50 ([afcbf1b](https://gitlab.com/gitlab-org/gitlab-ui/commit/afcbf1b6ef9f6b16751ff64ad908e57124ed5990))

## [21.35.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.35.1...v21.35.2) (2020-10-23)


### Bug Fixes

* **GlPagination:** Remove size options - default to md ([ba0e23e](https://gitlab.com/gitlab-org/gitlab-ui/commit/ba0e23e64a3a2704502c0b330ec47b1ee121db20))

## [21.35.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.35.0...v21.35.1) (2020-10-22)


### Bug Fixes

* **GlDropdown:** Make dropdown more accessible ([e8a953b](https://gitlab.com/gitlab-org/gitlab-ui/commit/e8a953b25ea78a8a2f3075838a6253995df39ebc))

# [21.35.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.34.2...v21.35.0) (2020-10-21)


### Features

* **css:** Add orange-300 && blue-400 utility mixins ([90d728a](https://gitlab.com/gitlab-org/gitlab-ui/commit/90d728a9fc60db6c39f185c72cf599489b8f6fa9))

## [21.34.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.34.1...v21.34.2) (2020-10-20)


### Bug Fixes

* **GlPagination:** Fix extra space between span and icon ([038fc7b](https://gitlab.com/gitlab-org/gitlab-ui/commit/038fc7bef2c171a60e9c0a8ab27e44f59e07ea76))

## [21.34.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.34.0...v21.34.1) (2020-10-20)


### Bug Fixes

* **GlDropdown:** Add "link" variant as valid option for dropdowns ([f1c74e2](https://gitlab.com/gitlab-org/gitlab-ui/commit/f1c74e2edaeff4a619f8184c98ded50f9d204ebb))

# [21.34.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.33.0...v21.34.0) (2020-10-19)


### Features

* **GlDropdown:** expose b-dropdown show method ([fd12ab0](https://gitlab.com/gitlab-org/gitlab-ui/commit/fd12ab0120bcd022831a789ece550caaefb7dcd1))

# [21.33.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.32.2...v21.33.0) (2020-10-19)


### Features

* **GlBadge:** Add icons to gl-badge ([df19f8b](https://gitlab.com/gitlab-org/gitlab-ui/commit/df19f8bf604325c1afcb17ceb2ba7f8dc8e59f22))

## [21.32.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.32.1...v21.32.2) (2020-10-16)


### Bug Fixes

* **GlModal:** Update modal position to centered ([7eaac5c](https://gitlab.com/gitlab-org/gitlab-ui/commit/7eaac5ce7088e672fb36192c3f4d2a64145ff394))

## [21.32.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.32.0...v21.32.1) (2020-10-15)


### Bug Fixes

* Make GlDrawer height aware of positioning ([f51a09b](https://gitlab.com/gitlab-org/gitlab-ui/commit/f51a09ba67f0fc0dd7390c57136c2ad66d45f7f9))

# [21.32.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.31.0...v21.32.0) (2020-10-15)


### Features

* **GlDatepicker:** add disabled prop ([5e19518](https://gitlab.com/gitlab-org/gitlab-ui/commit/5e19518de419dac5afa988f1cb10b545a8018bcc))

# [21.31.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.30.1...v21.31.0) (2020-10-15)


### Features

* **GlColumnchart:** Add 2nd Y axis ([42e6fa2](https://gitlab.com/gitlab-org/gitlab-ui/commit/42e6fa2bd5b215db3e28ea7a3ff128604ca4ed79))

## [21.30.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.30.0...v21.30.1) (2020-10-15)


### Bug Fixes

* **GlDropdown:** Add styling for search within gldropdown ([930fe80](https://gitlab.com/gitlab-org/gitlab-ui/commit/930fe8078be0a01e2c6b686b341f82d71cee0e51))
* **GlLabel:** Fix label spacing and overflow ([aa9f4a2](https://gitlab.com/gitlab-org/gitlab-ui/commit/aa9f4a29197d9e523b29e7c7ff1767617793ad7a))

# [21.30.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.29.0...v21.30.0) (2020-10-14)


### Features

* **css:** Add border utiltiies ([1ce2e8b](https://gitlab.com/gitlab-org/gitlab-ui/commit/1ce2e8bd64c028e4cd9290bf2ed601a54b3e84b4))

# [21.29.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.28.0...v21.29.0) (2020-10-14)


### Features

* **GlFormGroup:** let label class be customized ([8b11f13](https://gitlab.com/gitlab-org/gitlab-ui/commit/8b11f13db40bc17cafd5499f3a0e040ccaf69755))

# [21.28.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.27.0...v21.28.0) (2020-10-14)


### Features

* **GlDaterangePicker:** Add labelClass prop ([5e3420f](https://gitlab.com/gitlab-org/gitlab-ui/commit/5e3420f3bbc803edbbc9f5d1657a05f3ae521606))

# [21.27.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.26.0...v21.27.0) (2020-10-13)


### Features

* **GlDatepicker:** add `placeholder` and `autocomplete` props ([6d6d6b9](https://gitlab.com/gitlab-org/gitlab-ui/commit/6d6d6b9313ee35efc692dd3b1915a5d0e440bc92))

# [21.26.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.25.0...v21.26.0) (2020-10-13)


### Features

* **GlColumnChart:** Adds additional bars and lines ([287c553](https://gitlab.com/gitlab-org/gitlab-ui/commit/287c5530486dd84b20f9fc477dfdd063928e75c7))

# [21.25.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.24.0...v21.25.0) (2020-10-08)


### Features

* Add initial gitpod configuration files ([090eee0](https://gitlab.com/gitlab-org/gitlab-ui/commit/090eee0b0c4a3e306658e627db3ca7713e65ee98))

# [21.24.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.23.0...v21.24.0) (2020-10-08)


### Features

* **css:** Add gl-display-sm-inline-flex class ([6b0910a](https://gitlab.com/gitlab-org/gitlab-ui/commit/6b0910ac78f808f714d036280a6a0dd08c179b38))

# [21.23.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.22.0...v21.23.0) (2020-10-08)


### Features

* **GlDatepicker:** add clear button ([252fb33](https://gitlab.com/gitlab-org/gitlab-ui/commit/252fb33e5a07d0913ddc3a8d489a43973d3fed46))

# [21.22.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.21.0...v21.22.0) (2020-10-07)


### Features

* **css:** Add gl-my-8 ([2ba1354](https://gitlab.com/gitlab-org/gitlab-ui/commit/2ba135447b305ad93ba9f72727f4e2c9509bcc60))

# [21.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.20.0...v21.21.0) (2020-10-07)


### Features

* **css:** Add sm flex column utility ([9105ff6](https://gitlab.com/gitlab-org/gitlab-ui/commit/9105ff62b2165e834cbdd823ea837f7ab24c46af))

# [21.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.19.0...v21.20.0) (2020-10-07)


### Features

* **GlDropdownForm:** implement GlDropdownForm component ([a169de0](https://gitlab.com/gitlab-org/gitlab-ui/commit/a169de00441985a375786d372fd23336ba5115b4))


### Performance Improvements

* **v-safe-html:** Avoid serialize/parse roundtrip ([eeba3f0](https://gitlab.com/gitlab-org/gitlab-ui/commit/eeba3f0e01ae4d0ede868d14895bfc3062f11549))

# [21.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.18.0...v21.19.0) (2020-10-07)


### Bug Fixes

* **GlDropdown:** apply proper classes for secondary category ([e2bea96](https://gitlab.com/gitlab-org/gitlab-ui/commit/e2bea963560e6d8195c30ccf2154eb28d9133ada))


### Features

* **css:** Add utilities for CI config graph ([96566fe](https://gitlab.com/gitlab-org/gitlab-ui/commit/96566fee3e34f10e740b1c439d6e7312d6454f25))

# [21.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.17.0...v21.18.0) (2020-10-07)


### Features

* **GlLabel:** Add ability to disable close button ([bb90011](https://gitlab.com/gitlab-org/gitlab-ui/commit/bb900114d263fb29e7a1c82d986977b833edebf9))

# [21.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.16.1...v21.17.0) (2020-10-07)


### Features

* **css:** Add gl-md-pr-2 ([2b17ad3](https://gitlab.com/gitlab-org/gitlab-ui/commit/2b17ad3ab388e2a108f184b9504edb77dc6fb771))

## [21.16.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.16.0...v21.16.1) (2020-10-06)


### Bug Fixes

* from node_modules stub for cropper ([303f344](https://gitlab.com/gitlab-org/gitlab-ui/commit/303f344c6a03518eff22a324c05a96daaba7cc9b))

# [21.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.15.0...v21.16.0) (2020-10-05)


### Features

* **css:** Add gl-md-pr-1 gl-lg-ml-3 and gl-lg-mx-3 ([c2d3f1b](https://gitlab.com/gitlab-org/gitlab-ui/commit/c2d3f1bdf4ca1704714c4d56c9f1f7985d2a9fb0))

# [21.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.14.0...v21.15.0) (2020-10-05)


### Features

* Add `gl-text-input` Utility Class ([a36f1f1](https://gitlab.com/gitlab-org/gitlab-ui/commit/a36f1f12c324c04935038bfe15dc96907bbcbd13))
* **css:** Add border top hover util ([9bfb97d](https://gitlab.com/gitlab-org/gitlab-ui/commit/9bfb97d5963a79f083d8a70dab44695074086ca0))

# [21.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.13.0...v21.14.0) (2020-10-05)


### Features

* **css:** Add gl-border-b-gray-10 to util mixin ([bf7d0ea](https://gitlab.com/gitlab-org/gitlab-ui/commit/bf7d0eaf37cf97c0592c536d684b3929efadc3a9))

# [21.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.12.0...v21.13.0) (2020-10-02)


### Features

* **buttons:** Fix loading state styling for icon buttons ([6fe6299](https://gitlab.com/gitlab-org/gitlab-ui/commit/6fe62993de5152df3a68a46ea25d7bb100070aa4))

# [21.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.11.0...v21.12.0) (2020-10-02)


### Features

* **css:** Add utilisty css class for SVGs ([44ed317](https://gitlab.com/gitlab-org/gitlab-ui/commit/44ed317e158545fcdec67d361e02bc4e31200fcc))

# [21.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.10.0...v21.11.0) (2020-10-02)


### Bug Fixes

* Align button dropdown padding with designs ([d7b5789](https://gitlab.com/gitlab-org/gitlab-ui/commit/d7b578975a94ab2590e7736640cac763ca38593c))
* provide stub for cropper ([3be7fa6](https://gitlab.com/gitlab-org/gitlab-ui/commit/3be7fa65495b93c4be40fcc178eec4c60d2630e6))


### Features

* **css:** Add gl-lg-align-items-baseline utility class ([454af43](https://gitlab.com/gitlab-org/gitlab-ui/commit/454af435e6928c7ff8e76d1801a1c2430e1ec1d8))
* **css:** Add gl-w-quarter utility class ([dfd0500](https://gitlab.com/gitlab-org/gitlab-ui/commit/dfd050082441e8f4020a4212556452d4d931a774))

# [21.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.9.0...v21.10.0) (2020-09-29)


### Features

* **GlEmptyState:** add svgHeight preventing content reflow ([8cc8ebe](https://gitlab.com/gitlab-org/gitlab-ui/commit/8cc8ebeb2edc3dc625f313bd33750cd00442e3a6))

# [21.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.8.3...v21.9.0) (2020-09-29)


### Features

* **css:** Update GlFilter CSS ([ea3ccac](https://gitlab.com/gitlab-org/gitlab-ui/commit/ea3ccac52547b5cff61a38595b78fea57f5ee078))

## [21.8.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.8.2...v21.8.3) (2020-09-28)


### Bug Fixes

* **buttons:** Correct style of list item action buttons ([1bbf9e4](https://gitlab.com/gitlab-org/gitlab-ui/commit/1bbf9e4b6e7f45786b5cea2b3df885540934a164))

## [21.8.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.8.1...v21.8.2) (2020-09-25)


### Bug Fixes

* **GlLabeledAvatar:** fix a few CSS issues ([3ef73f1](https://gitlab.com/gitlab-org/gitlab-ui/commit/3ef73f1e9eb450cc1cb54a66f3db9c0eaba6d55b))

## [21.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.8.0...v21.8.1) (2020-09-24)


### Bug Fixes

* **GlLabel:** Fix GlLabel close button ([1fa6550](https://gitlab.com/gitlab-org/gitlab-ui/commit/1fa6550f21ccb8e9909d19924d47cdb8f09d19a7))
* **GlLabel:** Make GlLabel close button accessible ([be2e7f1](https://gitlab.com/gitlab-org/gitlab-ui/commit/be2e7f14af21cab055f51e6bd0cb601d58713008))

# [21.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.7.0...v21.8.0) (2020-09-23)


### Features

* **css:** add gl-sm-my-12 responsive utility class ([595255c](https://gitlab.com/gitlab-org/gitlab-ui/commit/595255c756e0be04062eb43baea84e8ad0768556))

# [21.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.6.0...v21.7.0) (2020-09-23)


### Features

* **css:** Add gl-xs-align-items-baseline utility class ([932b19a](https://gitlab.com/gitlab-org/gitlab-ui/commit/932b19ada7ac13e849d247ba3cc822d684122e43))

# [21.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.5.0...v21.6.0) (2020-09-22)


### Features

* **css:** Add responsive margin to utility class ([7ce0152](https://gitlab.com/gitlab-org/gitlab-ui/commit/7ce0152fd6aad28776d6722d03317eb503ac063c))

# [21.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.4.2...v21.5.0) (2020-09-22)


### Features

* **GLAvatarLabeled:** Add slot for meta data ([95c7fcc](https://gitlab.com/gitlab-org/gitlab-ui/commit/95c7fcc1480097a60ef698d0a46136ea2c34794d))

## [21.4.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.4.1...v21.4.2) (2020-09-17)


### Bug Fixes

* **dropdown:** Correct margin for dropdown headers ([f1d707d](https://gitlab.com/gitlab-org/gitlab-ui/commit/f1d707df011dbce463ab8167703d47b2731998ba))

## [21.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.4.0...v21.4.1) (2020-09-17)


### Bug Fixes

* exclude chart component from main components index ([dd18a71](https://gitlab.com/gitlab-org/gitlab-ui/commit/dd18a71e12e6a0e765ca7ebc53af9f96b479225f))

# [21.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.3.1...v21.4.0) (2020-09-16)


### Features

* **GlButton:** Add button-text-class prop to gl-button ([2caaa3b](https://gitlab.com/gitlab-org/gitlab-ui/commit/2caaa3ba8f35c1815d0ecf0198d5380718edbdfb))

## [21.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.3.0...v21.3.1) (2020-09-16)


### Bug Fixes

* **GlChart:** Tooltip title values not displaying ([dea6750](https://gitlab.com/gitlab-org/gitlab-ui/commit/dea6750a6aa6e5cf50bdd781b0f2534d1aec9460))

# [21.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.2.2...v21.3.0) (2020-09-15)


### Features

* **css:** Add `gl-pt-8` utility class ([7f9e760](https://gitlab.com/gitlab-org/gitlab-ui/commit/7f9e760c355b52e75bda7c916058724c65484247))

## [21.2.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.2.1...v21.2.2) (2020-09-15)


### Bug Fixes

* **GlSearchBoxByType:** update GlSearchBoxByType button border ([1807e98](https://gitlab.com/gitlab-org/gitlab-ui/commit/1807e981efe1ffa1d8b9e133279786b5921ebffc))

## [21.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.2.0...v21.2.1) (2020-09-15)


### Bug Fixes

* **dropdown button:** Differentiate between dropdown panel and button ([c0aab2f](https://gitlab.com/gitlab-org/gitlab-ui/commit/c0aab2f817384021b485533f9cd0297969c27d4b))

# [21.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.1.0...v21.2.0) (2020-09-15)


### Features

* **GlSorting:** Update GlSorting styles to Pajamas ([69b6505](https://gitlab.com/gitlab-org/gitlab-ui/commit/69b6505f02771d93968cc2812bffd74d0076790f))

# [21.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.0.1...v21.1.0) (2020-09-14)


### Features

* **GlKeysetPagination:** Add GlKeysetPagination ([d74241e](https://gitlab.com/gitlab-org/gitlab-ui/commit/d74241ecc83112fa1fa7d670a7ad2bc99d7a9006))

## [21.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v21.0.0...v21.0.1) (2020-09-14)


### Bug Fixes

* **GlButton:** Fix text decoration on gl-button anchor tags ([d2b0970](https://gitlab.com/gitlab-org/gitlab-ui/commit/d2b0970ba9a3f5d322e39aa55fd1b74c0ab67cea))

# [21.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.20.0...v21.0.0) (2020-09-11)


### Bug Fixes

* **dropdowns:** Rename section header, remove deprecated exports ([771bd3a](https://gitlab.com/gitlab-org/gitlab-ui/commit/771bd3ac22c5cd57f7bf4e634baafc474d77ed10))


### BREAKING CHANGES

* **dropdowns:** Aligns naming conventions of
header and section headers with Figma and removes
deprecated exports of GlNewDropdown

# [20.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.19.0...v20.20.0) (2020-09-09)


### Bug Fixes

* **GlTooltip:** Pass through tooltip manual events ([cf49140](https://gitlab.com/gitlab-org/gitlab-ui/commit/cf491404a1e4099bcc3e6f4097da6a40095b5fc6))


### Features

* **Color:** Update purple 600 hex ([4a2096e](https://gitlab.com/gitlab-org/gitlab-ui/commit/4a2096e12ddec5cfa32d5bb58396789282ff8b43))

# [20.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.18.3...v20.19.0) (2020-09-09)


### Features

* Add overflow auto mixin util ([8fcd6f9](https://gitlab.com/gitlab-org/gitlab-ui/commit/8fcd6f972fb58334e942e53ae6df3cb756149863))

## [20.18.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.18.2...v20.18.3) (2020-09-04)


### Bug Fixes

* **lodash:** Depend on lodash@^4.17.20 ([a2d0285](https://gitlab.com/gitlab-org/gitlab-ui/commit/a2d028584890a3b37c4a43e2c39af5c6f6690e94))

## [20.18.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.18.1...v20.18.2) (2020-09-04)


### Bug Fixes

* **GlButton:** Fix Firefox cut off text ([9092ef0](https://gitlab.com/gitlab-org/gitlab-ui/commit/9092ef01ffbffd2409e7c45bad1c8ac176118f46))

## [20.18.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.18.0...v20.18.1) (2020-09-03)


### Bug Fixes

* **GlSearchBoxByType:** hide clear icon when disabled ([b65fecf](https://gitlab.com/gitlab-org/gitlab-ui/commit/b65fecf97b088d2e25ae8a3e3fb47610881426f9))

# [20.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.17.0...v20.18.0) (2020-09-02)


### Features

* Add clearfix mixin ([c5a48cd](https://gitlab.com/gitlab-org/gitlab-ui/commit/c5a48cd43708947d5c18387338818701c277844f))

# [20.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.16.0...v20.17.0) (2020-09-02)


### Features

* **css:** Add white-space: pre-wrap utility class ([633c4cb](https://gitlab.com/gitlab-org/gitlab-ui/commit/633c4cb4db63bf2b271cfe327215847f02705939))

# [20.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.15.0...v20.16.0) (2020-09-02)


### Features

* **GlDatepicker:** Allow for empty date values ([452fd9a](https://gitlab.com/gitlab-org/gitlab-ui/commit/452fd9a9c136fb6de889f69f5142b41e363a6a89))
* **utilities:** add flex and spacing utilities for lg breakpoints ([36791cd](https://gitlab.com/gitlab-org/gitlab-ui/commit/36791cd1b8720bb389015f4492b29262972e016b))

# [20.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.14.0...v20.15.0) (2020-09-01)


### Features

* **GlInputGroupText:** expose GlInputGroupText component ([49dac3a](https://gitlab.com/gitlab-org/gitlab-ui/commit/49dac3af4edeb9299230b556f7633da31b6b1b52))

# [20.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.13.0...v20.14.0) (2020-09-01)


### Features

* **css:** Add utility mixins ([54a5bb4](https://gitlab.com/gitlab-org/gitlab-ui/commit/54a5bb441071179108156bfa5b008ba5707e5a3f))

# [20.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.12.2...v20.13.0) (2020-09-01)


### Features

* **GlSkeletonLoading:** export as GlDeprecatedSkeletonLoading ([8f683ff](https://gitlab.com/gitlab-org/gitlab-ui/commit/8f683ff6eb4b00f4757235331d3f3f41a0b80883))

## [20.12.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.12.1...v20.12.2) (2020-09-01)


### Bug Fixes

* **dropdown:** Correct dropdown header padding ([d527f4e](https://gitlab.com/gitlab-org/gitlab-ui/commit/d527f4ec228faf4aaf4531e2d04c9e36c8b99c61))

## [20.12.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.12.0...v20.12.1) (2020-08-31)


### Bug Fixes

* **GlToggle:** prevent default on click ([d29331f](https://gitlab.com/gitlab-org/gitlab-ui/commit/d29331f9f736b70107f7bc4008843f49f54c03c2))

# [20.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.11.1...v20.12.0) (2020-08-31)


### Features

* Add gl-cursor-(grabbing,crosshair) ([e113e11](https://gitlab.com/gitlab-org/gitlab-ui/commit/e113e11b26fbf30d372ae675794dfa508e679286))

## [20.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.11.0...v20.11.1) (2020-08-28)


### Bug Fixes

* **dropdown:** Correct divider color on dropdowns ([8843f69](https://gitlab.com/gitlab-org/gitlab-ui/commit/8843f690f507d2b80c6c10898a9e91df49c3304e))

# [20.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.10.0...v20.11.0) (2020-08-28)


### Features

* **modal:** Allow to prevent default for secondary action ([56046ec](https://gitlab.com/gitlab-org/gitlab-ui/commit/56046ec53ad8694c6eef245beb8c0270ef4b37fa))

# [20.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.9.1...v20.10.0) (2020-08-26)


### Features

* **GlSkeletonLoader:** migrate GlSkeletonLoading into GlSkeletonLoader ([fa3ec21](https://gitlab.com/gitlab-org/gitlab-ui/commit/fa3ec21548deba7ae8ae617aef0575efe6c3d075))

## [20.9.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.9.0...v20.9.1) (2020-08-25)


### Bug Fixes

* **buttons:** Remove white background from resting tertiary buttons ([d0d610e](https://gitlab.com/gitlab-org/gitlab-ui/commit/d0d610ee83b5cdbee57ffbcb8772b22ac7b63331))

# [20.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.8.0...v20.9.0) (2020-08-25)


### Features

* **css:** add gl-mt-n2 utility ([d5a7c9a](https://gitlab.com/gitlab-org/gitlab-ui/commit/d5a7c9ab6da763a4df5a8a998f76df58b7a7e44a))

# [20.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.7.0...v20.8.0) (2020-08-25)


### Bug Fixes

* **GlChartSeriesLabel:** fix chart label overflow ([3025073](https://gitlab.com/gitlab-org/gitlab-ui/commit/30250739391a7d2ee2e46662aaafa69b9f7f3c25))


### Features

* **css:** add gl-mt-n3 utility ([ed4ed66](https://gitlab.com/gitlab-org/gitlab-ui/commit/ed4ed66e36be0103e3a636b75ee9565f3312dffb))

# [20.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.6.0...v20.7.0) (2020-08-25)


### Features

* **dashed-button:** Improve rendering of dashed button border ([836007a](https://gitlab.com/gitlab-org/gitlab-ui/commit/836007afdbd5f83a9f3054d0bfcb6dc112007ae5))

# [20.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.5.0...v20.6.0) (2020-08-24)


### Features

* **GlLink:** add styling to match spec ([8eb5a7a](https://gitlab.com/gitlab-org/gitlab-ui/commit/8eb5a7a96d475d996a60287f4b5daf11535f215d))

# [20.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.4.1...v20.5.0) (2020-08-24)


### Features

* **css:** add gl-display-md-block class ([e9e3837](https://gitlab.com/gitlab-org/gitlab-ui/commit/e9e383715ed30546cc9543e655f3c0c8fb375f7f))
* **css:** add gl-pt-md-n2/gl-mt-md-n2 classes ([ef392eb](https://gitlab.com/gitlab-org/gitlab-ui/commit/ef392eb228ae18ca0077481fbe3bcd855e8853a7))

## [20.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.4.0...v20.4.1) (2020-08-22)


### Bug Fixes

* **button:** Decrease button styles specificity ([73d9749](https://gitlab.com/gitlab-org/gitlab-ui/commit/73d97494865577a5c420d41977ea9b3ac157cb7e))

# [20.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.3.1...v20.4.0) (2020-08-20)


### Features

* **css:** add gl-m-2 class ([77a27c3](https://gitlab.com/gitlab-org/gitlab-ui/commit/77a27c3958f6e2c956dae52207aa7caeda1b1744))

## [20.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.3.0...v20.3.1) (2020-08-19)


### Bug Fixes

* **GlSearchBoxByType:** Fix double input event ([b5f0328](https://gitlab.com/gitlab-org/gitlab-ui/commit/b5f03289c0d3ca5e3009fdac2b6a00541b26e943))

# [20.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.2.0...v20.3.0) (2020-08-18)


### Features

* **css:** add blue 600 hover state ([032e77a](https://gitlab.com/gitlab-org/gitlab-ui/commit/032e77a0c013820c148520cc17366267f6801e57))

# [20.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.1.1...v20.2.0) (2020-08-18)


### Features

* **GlFormTextarea:** add a submit on enter ([2b5329f](https://gitlab.com/gitlab-org/gitlab-ui/commit/2b5329f3f9d58fdc24c14cb22a53ec00be1cb889))

## [20.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.1.0...v20.1.1) (2020-08-18)


### Bug Fixes

* **GlIntersperse:** allow class attributes passed to component ([a101c36](https://gitlab.com/gitlab-org/gitlab-ui/commit/a101c36c8f022ac8ce06ba80e790903a90ece08d))

# [20.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v20.0.0...v20.1.0) (2020-08-18)


### Features

* **textarea:** Add debounce/lazy support ([cf699aa](https://gitlab.com/gitlab-org/gitlab-ui/commit/cf699aa263b45acfb42c538b5b8bbe4167024550))

# [20.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v19.0.1...v20.0.0) (2020-08-18)


### Features

* **v-safe-html:** Switch from sanitize-html to DOMpurify ([ff8b602](https://gitlab.com/gitlab-org/gitlab-ui/commit/ff8b602453ad6a7c689cb4cfceabdb4a5c3edd0a))


### BREAKING CHANGES

* **v-safe-html:** v-safe-html extended API changed. Under the hood we are
now using DOMpurify. Please refer to their API for upgrading:
https://github.com/cure53/DOMPurify

## [19.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v19.0.0...v19.0.1) (2020-08-17)


### Bug Fixes

* **css:** Update utility generate functione ([2cc011c](https://gitlab.com/gitlab-org/gitlab-ui/commit/2cc011c8474d243f4efe822c6fe162e10de13df9))

# [19.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.7.0...v19.0.0) (2020-08-13)


### Features

* **buttons:** Make tertiary buttons borderless ([9703bf3](https://gitlab.com/gitlab-org/gitlab-ui/commit/9703bf3cc32020774ef66cae5fcb75f739951a14))
* **css:** hover utility ([ff026f2](https://gitlab.com/gitlab-org/gitlab-ui/commit/ff026f261ebd786f6b475bcd8c6e9e9f8c661f80))


### BREAKING CHANGES

* **buttons:** Adds styling for tertiary buttons using secondary
styles with no border on all states

# [18.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.6.2...v18.7.0) (2020-08-13)


### Features

* **GlFormInput:** Add debounce/lazy support ([5546add](https://gitlab.com/gitlab-org/gitlab-ui/commit/5546add923155c25a8f5a515fe33206cfd23d6b2))

## [18.6.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.6.1...v18.6.2) (2020-08-12)


### Bug Fixes

* **GlLabel:** Fix dark theme scoped labels ([c68ad4f](https://gitlab.com/gitlab-org/gitlab-ui/commit/c68ad4f8c5a2904a8eca96840d1f4577c04d003f))

## [18.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.6.0...v18.6.1) (2020-08-11)


### Bug Fixes

* **dropdown:** Add support for vue router links ([f3bb169](https://gitlab.com/gitlab-org/gitlab-ui/commit/f3bb1696131cfe3a80bb1372bcf63733033eaa28))

# [18.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.5.0...v18.6.0) (2020-08-10)


### Features

* Rename GlNewDropdown to GlDropdown ([12b8b3e](https://gitlab.com/gitlab-org/gitlab-ui/commit/12b8b3e2c08a72697ef069e7bf6a9a8729188f1c))

# [18.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.4.0...v18.5.0) (2020-08-10)


### Features

* **Button:** Use monospace for one label button example ([c7df403](https://gitlab.com/gitlab-org/gitlab-ui/commit/c7df4039791915e076d23963ab7d6aaf3c380cc8))

# [18.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.3.0...v18.4.0) (2020-08-10)


### Features

* **css:** Add green fill utility ([a37b2f3](https://gitlab.com/gitlab-org/gitlab-ui/commit/a37b2f35fe84b430de25d9ebd0cfaeb8f7dd51d6))

# [18.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.2.0...v18.3.0) (2020-08-08)


### Bug Fixes

* **labels:**  Fixed merge issue ([5912ed3](https://gitlab.com/gitlab-org/gitlab-ui/commit/5912ed32a59e08af7248b8b28edbc36e7106ab07))
* **labels:** Component cleanup and add to story ([c9f83e0](https://gitlab.com/gitlab-org/gitlab-ui/commit/c9f83e07bc4c1f12eba2687988674f40baf4d3ae))
* **labels:** Corrected small close button styles ([db94d99](https://gitlab.com/gitlab-org/gitlab-ui/commit/db94d9924d5ab739de727868fd6e57dfe89bfb84))
* **labels:** minor styling tweaks ([d39c06e](https://gitlab.com/gitlab-org/gitlab-ui/commit/d39c06e2a30112feef06035fb838a1f2e4c7ad61))
* **labels:** more readable style method ([2078f17](https://gitlab.com/gitlab-org/gitlab-ui/commit/2078f1737bfe9c7d06151d4c51dc5fb27002950a))
* **labels:** moved close hover event to icon ([e94630b](https://gitlab.com/gitlab-org/gitlab-ui/commit/e94630b82a87121b20fef034403d7c299419a1cd))
* **labels:** Updated spec to use isCloseHover ([89691ab](https://gitlab.com/gitlab-org/gitlab-ui/commit/89691ab12e817e32993500c6c6797aca197c78ee))


### Features

* **label:** Added close option ([921c833](https://gitlab.com/gitlab-org/gitlab-ui/commit/921c833e4a22c46d5db095b3f1a331faab8f9dd8))

# [18.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.1.1...v18.2.0) (2020-08-07)


### Features

* **css:** add flex column reverse direction ([819c9d9](https://gitlab.com/gitlab-org/gitlab-ui/commit/819c9d9a04cd0c7edd8781480fe572ba2366d690))

## [18.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.1.0...v18.1.1) (2020-08-06)


### Bug Fixes

* **GlNewDropdown:** item text can be truncated ([c1059bd](https://gitlab.com/gitlab-org/gitlab-ui/commit/c1059bdd1bfc9b5e150e7a732e457f4d4ef9717e))

# [18.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.0.1...v18.1.0) (2020-08-05)


### Features

* **css:** Add xs flex column utility ([03faf31](https://gitlab.com/gitlab-org/gitlab-ui/commit/03faf31aec8bfb83fbaba1e87e460d25b86c0916))
* **css:** Add xs margin button to spacing mixin ([171f249](https://gitlab.com/gitlab-org/gitlab-ui/commit/171f2499cd3af505091aa1370dab3881fd6179ae))

## [18.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v18.0.0...v18.0.1) (2020-08-05)


### Bug Fixes

* **GlIcon:** Force rerendering of icons if the icon changes ([7cb957a](https://gitlab.com/gitlab-org/gitlab-ui/commit/7cb957a8ccfac9334f94b713c858908368fac9ab)), closes [/gitlab.com/gitlab-org/gitlab/-/issues/230433#note_391410490](https://gitlab.com//gitlab.com/gitlab-org/gitlab/-/issues/230433/issues/note_391410490)

# [18.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.43.0...v18.0.0) (2020-08-04)


* Merge branch 'mg-remove-gl-dropdown' into 'master' ([f8614ec](https://gitlab.com/gitlab-org/gitlab-ui/commit/f8614ecbf073771eaff56bb7641d51787ea00137))


### Features

* **dropdown:** Remove GlDropdown export ([877e8b9](https://gitlab.com/gitlab-org/gitlab-ui/commit/877e8b976674aa21dc997b834b2ef66e861045e9))


### BREAKING CHANGES

* Remove GlDropdown export

See merge request gitlab-org/gitlab-ui!1613
* **dropdown:** Remove deprecated GlDropdown exports

# [17.43.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.42.0...v17.43.0) (2020-08-03)


### Features

* **css:** Add fill green utility ([4c429e1](https://gitlab.com/gitlab-org/gitlab-ui/commit/4c429e14c72c803b17f3827e3a3ea105e50c4de3))

# [17.42.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.41.0...v17.42.0) (2020-08-03)


### Features

* **GlGaugeChart:** Implement GlGaugeChart component ([cbd1d7d](https://gitlab.com/gitlab-org/gitlab-ui/commit/cbd1d7d89c6e3a74d87446558a7ddb9d3dd2e111))

# [17.41.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.40.0...v17.41.0) (2020-08-03)


### Features

* add scale-4 placement util classes ([856f616](https://gitlab.com/gitlab-org/gitlab-ui/commit/856f616b5b2c57e06b72ced6d436d17dda24f403))

# [17.40.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.39.1...v17.40.0) (2020-07-30)


### Features

* **GlFormText:** Add component ([9081c88](https://gitlab.com/gitlab-org/gitlab-ui/commit/9081c88555f8a115d8df8a9f0b162eba6013f4e8))

## [17.39.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.39.0...v17.39.1) (2020-07-29)


### Bug Fixes

* **GlTokenSelector:** wait for prop changes before closing dropdown ([5fef66d](https://gitlab.com/gitlab-org/gitlab-ui/commit/5fef66dea3ae44353dec079ccc76501d4eb6edce))

# [17.39.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.38.0...v17.39.0) (2020-07-29)


### Features

* Add responsive align-items: center utility classes ([68c141f](https://gitlab.com/gitlab-org/gitlab-ui/commit/68c141f07d376f4bcad0c986f17913092bb68e9a))

# [17.38.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.37.0...v17.38.0) (2020-07-29)


### Features

* **GlFormInput:** Add size prop ([3221d01](https://gitlab.com/gitlab-org/gitlab-ui/commit/3221d019b9df458fbeed454358150aff63e8bcc4))

# [17.37.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.36.2...v17.37.0) (2020-07-24)


### Features

* **css:** Add full width responsive utility ([93dffc1](https://gitlab.com/gitlab-org/gitlab-ui/commit/93dffc1ab4d939e784b32767bddd26efb6275c0e))

## [17.36.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.36.1...v17.36.2) (2020-07-24)


### Bug Fixes

* **Buttons:** Align small button icon size and padding to design specs ([9f05269](https://gitlab.com/gitlab-org/gitlab-ui/commit/9f052693a0e54e4881c73cc11488e7684c185020))

## [17.36.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.36.0...v17.36.1) (2020-07-24)


### Bug Fixes

* Change generate_utilities.js to handle important in sub rules ([a2d24e3](https://gitlab.com/gitlab-org/gitlab-ui/commit/a2d24e35efa4a420d785f720a86c21404fca283d))
* Change generate_utilities.js to handle important in sub rules ([49b2a8b](https://gitlab.com/gitlab-org/gitlab-ui/commit/49b2a8b741129198d4adb2b640f0c6feebd6db7c))
* Change generate_utilities.js to handle important media queries ([157402a](https://gitlab.com/gitlab-org/gitlab-ui/commit/157402aaefccfe46c0b86b7dafbce386571fb706))

# [17.36.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.35.2...v17.36.0) (2020-07-23)


### Features

* **GlDropdown:** Export GlDropdown as GlDeprecatedDropdown ([983bf68](https://gitlab.com/gitlab-org/gitlab-ui/commit/983bf682b14ccd775d46513b40676508aa73c567))
* **GlDropdown:** Rename GlDropdown to GlDeprecatedDropdown ([cfcb082](https://gitlab.com/gitlab-org/gitlab-ui/commit/cfcb0826c1b30149bc0f6fce21853611373522ab))

## [17.35.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.35.1...v17.35.2) (2020-07-23)


### Bug Fixes

* **Buttons:** Remove px-to-rem for some effects and use variables ([9d17e99](https://gitlab.com/gitlab-org/gitlab-ui/commit/9d17e996d9dc9e48c5a31c5379f7a6987748de48))

## [17.35.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.35.0...v17.35.1) (2020-07-22)


### Bug Fixes

* **toast:** Fix toast background color on dark theme ([dc44a7c](https://gitlab.com/gitlab-org/gitlab-ui/commit/dc44a7cea8ef480ba73ef4ae4140b0beb96bb06d))

# [17.35.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.34.0...v17.35.0) (2020-07-21)


### Bug Fixes

* **buttons:** Update button states to match specs ([eeada3a](https://gitlab.com/gitlab-org/gitlab-ui/commit/eeada3a98dbbf815b4481b82872b99f980e4cb27))
* **GlIntersectionObserver:** improve GlIntersectionObserver performance ([6b021b4](https://gitlab.com/gitlab-org/gitlab-ui/commit/6b021b482de0fc0b2791fcd06a56009ed367b852))


### Features

* **GlSafeHtmlDirective:** add directive to sanitize html ([a1521b9](https://gitlab.com/gitlab-org/gitlab-ui/commit/a1521b951e2f3d248a47bbc7c752b0940b83071b))

# [17.34.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.33.0...v17.34.0) (2020-07-17)


### Features

* **modals:** Remove deprecated buttons ([950f4fb](https://gitlab.com/gitlab-org/gitlab-ui/commit/950f4fb8e81b878d00ee92e8e759566d51fc78b3))

# [17.33.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.32.0...v17.33.0) (2020-07-16)


### Features

* **css:** Add missing sm margin and fix order issue ([c44f27f](https://gitlab.com/gitlab-org/gitlab-ui/commit/c44f27f70635be768b9669d96c775b6c49e30542))

# [17.32.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.31.0...v17.32.0) (2020-07-16)


### Features

* **css:** Add flex-grow: 0 to flex utilities ([a3ec065](https://gitlab.com/gitlab-org/gitlab-ui/commit/a3ec06515d54a656c5d85fd6fc4c3f3ae42ee9d0))

# [17.31.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.30.0...v17.31.0) (2020-07-16)


### Features

* **css:** Add large breakpoint display mixins ([50e607c](https://gitlab.com/gitlab-org/gitlab-ui/commit/50e607c8f0e1aa5c11b3ec1acd63b5865fb81d3c))

# [17.30.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.29.0...v17.30.0) (2020-07-16)


### Features

* Expand values for z-index utility classes ([1942c08](https://gitlab.com/gitlab-org/gitlab-ui/commit/1942c081fa5610a24853c1c4e47cbf22b7ebc308))
* **css:** Add CSS grid rules ([259f6b4](https://gitlab.com/gitlab-org/gitlab-ui/commit/259f6b4b10a17191b49048921588719390549b4b))

# [17.29.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.28.2...v17.29.0) (2020-07-15)


### Features

* **GlIcon:** Add `data-testid` attribute ([3cd2b46](https://gitlab.com/gitlab-org/gitlab-ui/commit/3cd2b4682f1a5e3745d742ababbb10324067406b))

## [17.28.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.28.1...v17.28.2) (2020-07-15)


### Performance Improvements

* Consume lodash via babel-plugin-lodash ([28891ac](https://gitlab.com/gitlab-org/gitlab-ui/commit/28891ac3a60cd8f13b65498d29eb4fde8e0e620b))

## [17.28.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.28.0...v17.28.1) (2020-07-15)


### Bug Fixes

* **GlSearchBoxByType:** Fix clear tooltip flash ([59c6f0c](https://gitlab.com/gitlab-org/gitlab-ui/commit/59c6f0c553ff42109139b0317c2e79140ef658d4))

# [17.28.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.27.0...v17.28.0) (2020-07-15)


### Features

* add gl-sm-w-auto utility class ([abec03b](https://gitlab.com/gitlab-org/gitlab-ui/commit/abec03b965ddd2de36b6a539dca9fe36e2367afe))

# [17.27.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.26.1...v17.27.0) (2020-07-14)


### Features

* add gl-sm-ml-3 utility class ([ad38897](https://gitlab.com/gitlab-org/gitlab-ui/commit/ad38897f3478948d87b7c2c331f774df41ff2e34))

## [17.26.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.26.0...v17.26.1) (2020-07-14)


### Bug Fixes

* **GlClearIconButton:** Add type="button" ([875c5ad](https://gitlab.com/gitlab-org/gitlab-ui/commit/875c5ad28c78177c2f1d3ba3de1f6674eb0da5fb))

# [17.26.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.25.0...v17.26.0) (2020-07-14)


### Features

* **GlFilteredSearch:** Add back white background ([5b511e7](https://gitlab.com/gitlab-org/gitlab-ui/commit/5b511e75233869766db6c068d03c5054ab245417))

# [17.25.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.24.0...v17.25.0) (2020-07-13)


### Features

* **GlCombobox:** Add GlCombobox component ([618f774](https://gitlab.com/gitlab-org/gitlab-ui/commit/618f774b47ecfca30a4687ad55ab96fb152ecd8d))

# [17.24.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.23.0...v17.24.0) (2020-07-13)


### Features

* add gl-rounded-top-base util class ([0ced5bb](https://gitlab.com/gitlab-org/gitlab-ui/commit/0ced5bb714c23965219f22d084cd2ec7ea46c2a0))

# [17.23.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.22.1...v17.23.0) (2020-07-13)


### Features

* **GlTruncate:** add truncate component ([3839080](https://gitlab.com/gitlab-org/gitlab-ui/commit/383908013f0141f52c66754bfee9222d66ae1e65))

## [17.22.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.22.0...v17.22.1) (2020-07-13)


### Bug Fixes

* **GlLegend:** Show dash on multiple empty cases ([30c1d16](https://gitlab.com/gitlab-org/gitlab-ui/commit/30c1d16ef7f7d9089ce5960ddaecc3647d4a2ca5))

# [17.22.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.21.0...v17.22.0) (2020-07-12)


### Features

* Add mt-5 and align-self-center for sm ([8d2a99c](https://gitlab.com/gitlab-org/gitlab-ui/commit/8d2a99c2081518f11249fce6a4d334356a72ad84))

# [17.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.20.0...v17.21.0) (2020-07-10)


### Features

* **css:** adding new background utility mixin for data-viz-orange-800 ([ecc82a9](https://gitlab.com/gitlab-org/gitlab-ui/commit/ecc82a92470314ed6b7fe1daa9864423fbdac341))

# [17.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.19.2...v17.20.0) (2020-07-10)


### Features

* **GlFilteredSearch:** Style disabled state ([314daf8](https://gitlab.com/gitlab-org/gitlab-ui/commit/314daf87855c4549e4944acc8f3dd1fc3de6351e))

## [17.19.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.19.1...v17.19.2) (2020-07-09)


### Bug Fixes

* **search-box-by-type:** Fix clear button focus ([4172c34](https://gitlab.com/gitlab-org/gitlab-ui/commit/4172c34ecbcf0dabd4975579ebd80184b1660c33))

## [17.19.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.19.0...v17.19.1) (2020-07-09)


### Bug Fixes

* **GlTokenSelector:** fix padding override ([de6970b](https://gitlab.com/gitlab-org/gitlab-ui/commit/de6970b248a2e40638ec3d1f1367d5f339c7e30b))

# [17.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.18.1...v17.19.0) (2020-07-08)


### Features

* add missing spacing utils from 1-7 ([8023560](https://gitlab.com/gitlab-org/gitlab-ui/commit/8023560fec571efef25a25e0a0e327f9ed34d6ac))

## [17.18.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.18.0...v17.18.1) (2020-07-07)


### Bug Fixes

* **GlGroup:** Update GLRadio and GlCheck Groups ([28de43d](https://gitlab.com/gitlab-org/gitlab-ui/commit/28de43dfad26dcdcf209ea6ea58e566068636802))

# [17.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.17.0...v17.18.0) (2020-07-07)


### Features

* Add gl-sticky utility class ([d2fcd6a](https://gitlab.com/gitlab-org/gitlab-ui/commit/d2fcd6a995641ab5d33eadc4720d7aaaca731bb3))

# [17.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.16.0...v17.17.0) (2020-07-06)


### Features

* **css:** Add absolute position utility classes ([976e498](https://gitlab.com/gitlab-org/gitlab-ui/commit/976e498349eb373f0ecdfd815fa172527ddd2b36))
* **spinner:** Remove hardcoded aria-hidden ([f50816c](https://gitlab.com/gitlab-org/gitlab-ui/commit/f50816ce8a851c5da1cae3d86f2a63664421aadb))
* Add gl-ml-11 utility class ([05be542](https://gitlab.com/gitlab-org/gitlab-ui/commit/05be542ea7eeba35f63e63fccfb4c7c6ad49ffe8))

# [17.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.15.0...v17.16.0) (2020-07-06)


### Features

* add gl-text-body mixin for default text color ([63dec63](https://gitlab.com/gitlab-org/gitlab-ui/commit/63dec63c00ad0a207416d9578aa0acd97fe2162c))

# [17.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.14.0...v17.15.0) (2020-07-06)


### Features

* **css:** Add size min-width full to utility class ([9e91352](https://gitlab.com/gitlab-org/gitlab-ui/commit/9e9135272a7e489019deb3772146280e7d82069f))

# [17.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.13.0...v17.14.0) (2020-07-03)


### Features

* **css:** Add responsive margin to utility class ([3b571d0](https://gitlab.com/gitlab-org/gitlab-ui/commit/3b571d04c27926d9643418dddeff555c68138f82))

# [17.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.12.0...v17.13.0) (2020-07-02)


### Features

* add 2px top and bottom borders ([7be09e8](https://gitlab.com/gitlab-org/gitlab-ui/commit/7be09e8e784bdd54763ffe1b13fd80ab5c382a9d))

# [17.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.11.0...v17.12.0) (2020-07-02)


### Features

* **filtered-search:** Add container style support for token ([6bc9b02](https://gitlab.com/gitlab-org/gitlab-ui/commit/6bc9b020364e46be86f3f2c02e06a5e67a514935))

# [17.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.10.1...v17.11.0) (2020-07-02)


### Features

* **textarea:** Allow resizing ([b0b8ece](https://gitlab.com/gitlab-org/gitlab-ui/commit/b0b8ece00d0dac909aa4329ae107c27e5555ea0b))

## [17.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.10.0...v17.10.1) (2020-06-30)


### Bug Fixes

* fix invisible borders in Edge and friends ([39a4d89](https://gitlab.com/gitlab-org/gitlab-ui/commit/39a4d89604254e0df60a2ea8db52f4fe9b47ba22))

# [17.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.9.0...v17.10.0) (2020-06-30)


### Features

* **css:** Add size 12 width utility class ([c90dde7](https://gitlab.com/gitlab-org/gitlab-ui/commit/c90dde7ec8e97857af0055b8b4e4960059bc1643))

# [17.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.8.2...v17.9.0) (2020-06-29)


### Features

* add gl-text-truncate utility class ([2eefff9](https://gitlab.com/gitlab-org/gitlab-ui/commit/2eefff991ced0aa0122efe3e78ea422204d374ae))

## [17.8.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.8.1...v17.8.2) (2020-06-26)


### Bug Fixes

* **buttons:** Correct default button resting border color ([1e8305a](https://gitlab.com/gitlab-org/gitlab-ui/commit/1e8305ada8bf352ca44c0f7c0d5cf085e6f548ed))

## [17.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.8.0...v17.8.1) (2020-06-26)


### Bug Fixes

* **toggle:** Add help text to toggles ([2ba188a](https://gitlab.com/gitlab-org/gitlab-ui/commit/2ba188aa1b31cb8fef1833a28a1f49f76a780a6d))

# [17.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.7.1...v17.8.0) (2020-06-26)


### Features

* Make card bg color overridable with scss ([39cd1d8](https://gitlab.com/gitlab-org/gitlab-ui/commit/39cd1d87d13b275f3a101140dafc89e6647c9527))

## [17.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.7.0...v17.7.1) (2020-06-26)


### Bug Fixes

* **search-box-by-type:** Revert clear button focus fix ([a4b17f0](https://gitlab.com/gitlab-org/gitlab-ui/commit/a4b17f01449e37b704c9da18b97adf7bb732e8a7))

# [17.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.6.2...v17.7.0) (2020-06-26)


### Features

* add gl-pt-2 utility class ([2e48434](https://gitlab.com/gitlab-org/gitlab-ui/commit/2e4843483df5b3cac19105f09d018a44f81a3b44))

## [17.6.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.6.1...v17.6.2) (2020-06-26)


### Bug Fixes

* **search-box-by-type:** Fix clear button focus ([89d2697](https://gitlab.com/gitlab-org/gitlab-ui/commit/89d26970678a8ce8502add4b7ab2228df8200622))

## [17.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.6.0...v17.6.1) (2020-06-25)


### Bug Fixes

* **tooltip:** Remove x pad for topright positions ([cf1c5b8](https://gitlab.com/gitlab-org/gitlab-ui/commit/cf1c5b80aab72a20a47e9539631d78da40058d13))

# [17.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.5.0...v17.6.0) (2020-06-24)


### Features

* **GlTokenSelector:** explicitly emit `keydown` event ([d9f222d](https://gitlab.com/gitlab-org/gitlab-ui/commit/d9f222da7126dd3cfa38b1ce9b5f02c4fd0f99e6))

# [17.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.4.0...v17.5.0) (2020-06-24)


### Features

* **chart:** Reverse order of tooltip values ([83a2302](https://gitlab.com/gitlab-org/gitlab-ui/commit/83a23021e97a7fca6baa09d77d6b77a64fccdf06))

# [17.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.3.1...v17.4.0) (2020-06-24)


### Features

* **modal:** Modal with scrollable content ([dc03c44](https://gitlab.com/gitlab-org/gitlab-ui/commit/dc03c44e24398a3be91b6b2c26726c890d57381c))

## [17.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.3.0...v17.3.1) (2020-06-23)


### Bug Fixes

* **GLTokenSelector:** move text input specific HTML attributes ([59d2bb9](https://gitlab.com/gitlab-org/gitlab-ui/commit/59d2bb9bf69cfb15d897f9621db1f4fcc868432f))

# [17.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.2.0...v17.3.0) (2020-06-23)


### Features

* **charts:** Add legend hover state ([65002eb](https://gitlab.com/gitlab-org/gitlab-ui/commit/65002ebf3edbb5451c0de19f0bd599a1920635f2))

# [17.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.1.0...v17.2.0) (2020-06-19)


### Features

* Add gl-mb-7 utlity class ([f0ff828](https://gitlab.com/gitlab-org/gitlab-ui/commit/f0ff8286f30b8a4615306d055deb52ce4d54b1e0))

# [17.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.0.1...v17.1.0) (2020-06-18)


### Features

* Add gl-display-sm-none and gl-translate-y-n100 classes ([506e519](https://gitlab.com/gitlab-org/gitlab-ui/commit/506e5196e6aedec82264f3f1a860efbed09901b9))

## [17.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v17.0.0...v17.0.1) (2020-06-17)


### Bug Fixes

* Revert Set modal max-height dynamically ([1f9bb02](https://gitlab.com/gitlab-org/gitlab-ui/commit/1f9bb02df105b6a102043b96101e07c82787de45))

# [17.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.12.2...v17.0.0) (2020-06-17)


### Bug Fixes

* **filters:** Properly work with history dropdown items ([c8d9e31](https://gitlab.com/gitlab-org/gitlab-ui/commit/c8d9e31a03fb577112b4075f696434d57e41577c))


### BREAKING CHANGES

* **filters:** Selecting history item does not trigger
submit event anymore. Instead new history-item-selected
event will be triggered.

This allows customizing behavior of our search when needed

## [16.12.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.12.1...v16.12.2) (2020-06-16)


### Bug Fixes

* **GlButton:** Increse GlButton CSS specificity ([0d22860](https://gitlab.com/gitlab-org/gitlab-ui/commit/0d228603fde0987cc754b795a10781687ffd8795))
* **GlSafeLinkDirective:** Make update transformation reactive ([05565ad](https://gitlab.com/gitlab-org/gitlab-ui/commit/05565ad53de0aa38c897e7bfcc1ff0ee0f815364))

## [16.12.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.12.0...v16.12.1) (2020-06-16)


### Reverts

* Revert "fix(toggles): Add help text to toggles" ([ad5c55d](https://gitlab.com/gitlab-org/gitlab-ui/commit/ad5c55d006987a86325df733071ad13922a1c6a6))

# [16.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.11.0...v16.12.0) (2020-06-16)


### Features

* **css:** Add negative margin utilities ([393581c](https://gitlab.com/gitlab-org/gitlab-ui/commit/393581c9c5ff0777e60a2ff33e2a2ae2c0de0d33))
* **modal:** Set modal max height dynamically ([58470b5](https://gitlab.com/gitlab-org/gitlab-ui/commit/58470b5ee0c9afb495a99894c4b73b60d1119524))

# [16.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.10.0...v16.11.0) (2020-06-15)


### Bug Fixes

* **toggles:** Add help text to toggles ([e3a93a4](https://gitlab.com/gitlab-org/gitlab-ui/commit/e3a93a44e20d04f3321b97b440999b63bef4e0fc))


### Features

* **GlLink:** Add safe-link directive to gl-link ([31817ef](https://gitlab.com/gitlab-org/gitlab-ui/commit/31817ef4e1c9a2f45f0bfe9b17a59a3162ef12eb))

# [16.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.9.0...v16.10.0) (2020-06-15)


### Features

* **GlTokenSelector:** Add token selector component ([6a55777](https://gitlab.com/gitlab-org/gitlab-ui/commit/6a5577703a0c8c572310b4fc92b06ccdcb3c190e))

# [16.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.8.3...v16.9.0) (2020-06-12)


### Features

* **css:** Add padding utility ([192ff26](https://gitlab.com/gitlab-org/gitlab-ui/commit/192ff26d76902805aa29dc7513b1223bfe001e75))

## [16.8.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.8.2...v16.8.3) (2020-06-12)


### Bug Fixes

* **button:** Remove font weight bold from primary buttons ([2e7549d](https://gitlab.com/gitlab-org/gitlab-ui/commit/2e7549d15d3bf84e9e1bacee8e8ec137aa36b5d1))

## [16.8.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.8.1...v16.8.2) (2020-06-11)


### Bug Fixes

* **GlChartLegend:** remove tooltips from labels of tabular legends ([8e9b7bd](https://gitlab.com/gitlab-org/gitlab-ui/commit/8e9b7bdd5e5650c6f2b5ba8387794de65b52e70f))

## [16.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.8.0...v16.8.1) (2020-06-11)


### Bug Fixes

* **GlHeatMap:** Enable responsive heatmap ([a490d62](https://gitlab.com/gitlab-org/gitlab-ui/commit/a490d621f4e5fd7ba7b316d4390cb88b4345ca46))

# [16.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.7.0...v16.8.0) (2020-06-11)


### Features

* **utilities:** Add gl-str-truncated ([1424ba9](https://gitlab.com/gitlab-org/gitlab-ui/commit/1424ba99a8682369a0eb09409e09e3d5d3840288))

# [16.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.6.3...v16.7.0) (2020-06-11)


### Features

* **Alert:** normalize text, buttons, and links ([495179e](https://gitlab.com/gitlab-org/gitlab-ui/commit/495179e84ebd68bd0053a5799b3ebd7ae9c80e4e))

## [16.6.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.6.2...v16.6.3) (2020-06-10)


### Bug Fixes

* **GlHeatMap:** disable pointer events on legend ([c7263da](https://gitlab.com/gitlab-org/gitlab-ui/commit/c7263daa5481381f5bfff2b3e98b48d3f72aa01b))

## [16.6.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.6.1...v16.6.2) (2020-06-10)


### Bug Fixes

* **css:** Add "deg" unit to rotation utilities ([d10c025](https://gitlab.com/gitlab-org/gitlab-ui/commit/d10c025107d0cd118678162e5519241dfb8e6459))

## [16.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.6.0...v16.6.1) (2020-06-10)


### Bug Fixes

* **GlLabel:** Add focus state ([12f43ea](https://gitlab.com/gitlab-org/gitlab-ui/commit/12f43eae2e58a3a805afd04d295e9592aa177164))

# [16.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.5.0...v16.6.0) (2020-06-10)


### Features

* **GlSafeLink:** Add safe link directive ([1721feb](https://gitlab.com/gitlab-org/gitlab-ui/commit/1721feb893c037ac7eecd72ec215e9219858d04b))

# [16.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.4.1...v16.5.0) (2020-06-09)


### Features

* **css:** Add rotate and flip utilities ([aeb1c21](https://gitlab.com/gitlab-org/gitlab-ui/commit/aeb1c213332b7e2f6064fa4843bf17150387125e))

## [16.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.4.0...v16.4.1) (2020-06-09)


### Bug Fixes

* **css:** Update segment control css ([09a3875](https://gitlab.com/gitlab-org/gitlab-ui/commit/09a3875a86845003784aaab38d52178a4e2a945a))
* **GlHeatMap:** Update broken styles ([cba66e8](https://gitlab.com/gitlab-org/gitlab-ui/commit/cba66e83664188dfbfd5821831eed025697e426f))

# [16.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.3.0...v16.4.0) (2020-06-09)


### Features

* **css:** Added gl-my-3 utility ([5d2f9cc](https://gitlab.com/gitlab-org/gitlab-ui/commit/5d2f9cc319789fccdb44fae9fbcbb561334f2116))

# [16.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.2.1...v16.3.0) (2020-06-05)


### Features

* **AreaChart, LineChart:** prevent data tooltip freeze ([78d6a17](https://gitlab.com/gitlab-org/gitlab-ui/commit/78d6a17c6eccc237a3298e3d1c80ed29be37073b))

## [16.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.2.0...v16.2.1) (2020-06-03)


### Bug Fixes

* **deps:** upgrade BootstrapVue to v2.13.1 ([58b2711](https://gitlab.com/gitlab-org/gitlab-ui/commit/58b2711a80338522ad734b0990a8a59b80a83401))

# [16.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.1.0...v16.2.0) (2020-06-03)


### Features

* **css:** Add more css utils ([21f8403](https://gitlab.com/gitlab-org/gitlab-ui/commit/21f8403e9695aeab89cbb7fe9203e72e1208daa6))

# [16.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v16.0.0...v16.1.0) (2020-05-28)


### Features

* Add .gl-sr-only utility class ([0d64fdd](https://gitlab.com/gitlab-org/gitlab-ui/commit/0d64fddc0c38de40eae4f33163eaa9b916a9d87c))

# [16.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v15.6.0...v16.0.0) (2020-05-26)


### Features

* **badge:** Update styling of text badges ([ece3e44](https://gitlab.com/gitlab-org/gitlab-ui/commit/ece3e44194a54ae8ab2ebe2cd5e172d5ec6396c6))


### BREAKING CHANGES

* **badge:** This implements the [text-only][1] versions of the
latest badge designs.  Support for icons will be added in a future
version.

 - This removes the `primary`, `secondary`, `light` and `dark` variants
   of GlBadge, and adds the `muted` and `neutral` variants.
 - The `pill` prop is now ignored, and all GlBadges are of the `pill`
   type.

It's recommended to replace usage of the removed variants with the new
variants:

    primary   -> info
    secondary -> neutral
    light     -> muted
    dark      -> neutral

[1]: https://gitlab.com/gitlab-org/gitlab-ui/-/issues/481

# [15.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v15.5.0...v15.6.0) (2020-05-25)


### Features

* **css:** Mark utility classes as !important ([c4d7a4e](https://gitlab.com/gitlab-org/gitlab-ui/commit/c4d7a4e6d7f295f7b74a200477a21753526e2cf9))

# [15.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v15.4.3...v15.5.0) (2020-05-25)


### Features

* **css:** Add overflow visible utility ([1844a1b](https://gitlab.com/gitlab-org/gitlab-ui/commit/1844a1b32c8cb1820e42fc77b166fb217bedca91))

## [15.4.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v15.4.2...v15.4.3) (2020-05-25)


### Bug Fixes

* **infinite-scroll:** Render totalItems if positive ([cc3f75e](https://gitlab.com/gitlab-org/gitlab-ui/commit/cc3f75ee50def8226adf23f40384f121b5cbae46))

## [15.4.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v15.4.1...v15.4.2) (2020-05-25)


### Bug Fixes

* **css:** gl-bg-data-viz-aqua typo ([e710541](https://gitlab.com/gitlab-org/gitlab-ui/commit/e71054171846ab8b9cd7e600b42a544ca168862f))

## [15.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v15.4.0...v15.4.1) (2020-05-23)


### Bug Fixes

* include src dir in npm package ([9402519](https://gitlab.com/gitlab-org/gitlab-ui/commit/9402519c0ea562d0bd191f500a0dd9b5edd7b260))

# [15.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v15.3.0...v15.4.0) (2020-05-22)


### Features

* **css:** Add overflow scroll utility ([3c961fd](https://gitlab.com/gitlab-org/gitlab-ui/commit/3c961fdfc245c03ed897aa05930dbc11c5f977b9))

# [15.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v15.2.0...v15.3.0) (2020-05-22)


### Features

* **gl-ml-*:** Add missing `gl-ml-*` utility mixins ([3711c01](https://gitlab.com/gitlab-org/gitlab-ui/commit/3711c0185f6225d611e8eedad46f5c8f50226bfd))

# [15.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v15.1.0...v15.2.0) (2020-05-22)


### Features

* **css:** Add padding-top-9 mixin ([2da3da5](https://gitlab.com/gitlab-org/gitlab-ui/commit/2da3da5dc845063367a8f489e6b3b3d622591744))

# [15.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v15.0.0...v15.1.0) (2020-05-21)


### Features

* Added font-style: italic utility ([9de0259](https://gitlab.com/gitlab-org/gitlab-ui/commit/9de02597a26eb20e488d2522b75f8d37472f9a46))

# [15.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.17.0...v15.0.0) (2020-05-21)


### Bug Fixes

* **css:** update stateful and responsive mixins naming pattern ([d2e99f5](https://gitlab.com/gitlab-org/gitlab-ui/commit/d2e99f587afc451639432376f59f543508c169f4))


### BREAKING CHANGES

* **css:** Stateful and responsive mixins naming patterns
have been updated so that they always start with the `gl-` prefix,
followed by the state or breakpoint.

Make sure to update your utility class usages to reflect those changes.

For example:

```patch
- <div class="hover-gl-rounded-base">
+ <div class="gl-hover-rounded-base">
```

# [14.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.16.0...v14.17.0) (2020-05-21)


### Features

* **markdown:** Compact markdown typescale ([04702d7](https://gitlab.com/gitlab-org/gitlab-ui/commit/04702d7f0f2dc62a29dcf257bc25d2aac69809e4))

# [14.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.15.0...v14.16.0) (2020-05-20)


### Features

* **css:** compile utility classes library ([a0fa474](https://gitlab.com/gitlab-org/gitlab-ui/commit/a0fa47459a91fb9135fc820962d7c0745d32720e))
* **css:** Harmonize Bootstrap and GitLab UI bolds ([d811d66](https://gitlab.com/gitlab-org/gitlab-ui/commit/d811d669a717fad6061b9b230af361d320ffac69))

# [14.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.14.2...v14.15.0) (2020-05-20)


### Features

* **css:** add stateful utility classes ([5841a1d](https://gitlab.com/gitlab-org/gitlab-ui/commit/5841a1dc3611c5a93818b031d714c68c9ad1b0ea))

## [14.14.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.14.1...v14.14.2) (2020-05-20)


### Bug Fixes

* **GlLabel:** Add focus state to label ([aa7d8b9](https://gitlab.com/gitlab-org/gitlab-ui/commit/aa7d8b9fb5928706a6cc0f0f9c83046e9d03b7e7))

## [14.14.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.14.0...v14.14.1) (2020-05-20)


### Bug Fixes

* **GlLegend:** Remove bogus test selector ([4982611](https://gitlab.com/gitlab-org/gitlab-ui/commit/49826119b925accfee445540bb63d4648942775d))

# [14.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.13.1...v14.14.0) (2020-05-20)


### Features

* **GlDropdown:** Add show method to GlDropdown ([7e95b05](https://gitlab.com/gitlab-org/gitlab-ui/commit/7e95b055036027c623f73cadc33235e0afec606b))


### Reverts

* fix(Link): Add support to allow only safe urls ([1bb51a0](https://gitlab.com/gitlab-org/gitlab-ui/commit/1bb51a02eb21af3da3b553b42d9346f87998ccdb))

## [14.13.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.13.0...v14.13.1) (2020-05-19)


### Bug Fixes

* **Link:** Add support to allow only safe urls ([85b2ae1](https://gitlab.com/gitlab-org/gitlab-ui/commit/85b2ae1f86bb59bc2639d90b87e2c1e3cea73bb4))

# [14.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.12.1...v14.13.0) (2020-05-18)


### Features

* **css:** Expose gl-border-r-2 class ([6600c9a](https://gitlab.com/gitlab-org/gitlab-ui/commit/6600c9a3bb454bf52aeb1a78b8708d9673e56ce5))
* **css:** Expose some data viz color utility classes ([3615162](https://gitlab.com/gitlab-org/gitlab-ui/commit/3615162312700efd4965444f246a197754f3097c))

## [14.12.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.12.0...v14.12.1) (2020-05-18)


### Bug Fixes

* **GlLegend:** Add stable test selector ([c8f2d48](https://gitlab.com/gitlab-org/gitlab-ui/commit/c8f2d4873a583cd842aff722ebd40a6aaf9ee436))

# [14.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.11.2...v14.12.0) (2020-05-18)


### Features

* **css:** Expose gl-h-2 utility class ([2300ab6](https://gitlab.com/gitlab-org/gitlab-ui/commit/2300ab68ac58dbb08a10aabc12841b47d9bbfca2))

## [14.11.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.11.1...v14.11.2) (2020-05-18)


### Bug Fixes

* **label:** Make dark scoped label text compatible with dark theme ([ec88fc0](https://gitlab.com/gitlab-org/gitlab-ui/commit/ec88fc09b5e62a6158552995fe3de95241f21d96))

## [14.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.11.0...v14.11.1) (2020-05-15)


### Bug Fixes

* **GlDatepicker:** fix x-axis padding ([9d4ed9f](https://gitlab.com/gitlab-org/gitlab-ui/commit/9d4ed9f2e65b139a8d6393583a2dd99f4f4676a0))

# [14.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.10.2...v14.11.0) (2020-05-15)


### Features

* **charts:** add tabular legend layout support to charts ([512d6b3](https://gitlab.com/gitlab-org/gitlab-ui/commit/512d6b3cd203c4495b7ee17b3805f1ffca52f10a))

## [14.10.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.10.1...v14.10.2) (2020-05-15)


### Bug Fixes

* uses the new buttons in empty states ([6f754ff](https://gitlab.com/gitlab-org/gitlab-ui/commit/6f754ff948e1b491b5ea9a32a8daf317d66d75e5))

## [14.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.10.0...v14.10.1) (2020-05-14)


### Bug Fixes

* **GlTextArea:** Fix form input readonly styles ([7f1e9a2](https://gitlab.com/gitlab-org/gitlab-ui/commit/7f1e9a28d3214bd2f75d905a2154370c76d49b0c))

# [14.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.9.0...v14.10.0) (2020-05-14)


### Features

* **css:** Add flex-direction-row responsive utilities ([9460fc5](https://gitlab.com/gitlab-org/gitlab-ui/commit/9460fc5edde5629c3013685acb21420ea025d012))

# [14.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.8.1...v14.9.0) (2020-05-14)


### Features

* **nav:** Add GlNavItemDropdown component ([c011b64](https://gitlab.com/gitlab-org/gitlab-ui/commit/c011b64fc84cdd753b41a9da91604cf7b3ce5326))
* **nav:** Add GlNavItemDropdown component ([21adf07](https://gitlab.com/gitlab-org/gitlab-ui/commit/21adf073b620b627215ccbab7df418273e16b18e))

## [14.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.8.0...v14.8.1) (2020-05-13)


### Bug Fixes

* **GlFormGroup:** Remove border-bottom ([d212ea9](https://gitlab.com/gitlab-org/gitlab-ui/commit/d212ea93137b3233771a587ce54e591921bfc3b1))

# [14.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.7.0...v14.8.0) (2020-05-12)


### Features

* **css:** Add border utilties ([b7f0a45](https://gitlab.com/gitlab-org/gitlab-ui/commit/b7f0a45640da4873cb2ff998adf5341120ab891b))

# [14.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.6.1...v14.7.0) (2020-05-12)


### Bug Fixes

* **GlFormInput:** Restore form input plaintext styles ([b270072](https://gitlab.com/gitlab-org/gitlab-ui/commit/b270072fa5d9ffdce91d9d93d089fd00e400ea13))


### Features

* **GlChartLegend:** add tabular layout variation ([8180bf2](https://gitlab.com/gitlab-org/gitlab-ui/commit/8180bf23796eb4b83e4aaefb366638e6ef98fd64))

## [14.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.6.0...v14.6.1) (2020-05-11)


### Bug Fixes

* **css:** add gray-800 text utility ([f2d85ee](https://gitlab.com/gitlab-org/gitlab-ui/commit/f2d85eef414f785d80c26958e65367fcf21a4bb7))

# [14.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.5.2...v14.6.0) (2020-05-11)


### Features

* **css:** add two padding classe ([c4c3969](https://gitlab.com/gitlab-org/gitlab-ui/commit/c4c39699d378b1cfa3ae610e78347a5e4814ab3d))

## [14.5.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.5.1...v14.5.2) (2020-05-11)


### Bug Fixes

* **GlButton:** Add conditional for icon ([ca2d5ee](https://gitlab.com/gitlab-org/gitlab-ui/commit/ca2d5ee57bc2005d2079689284f4535dddabc12a))

## [14.5.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.5.0...v14.5.1) (2020-05-11)


### Bug Fixes

* **css:** Rename inherit color to reset ([d8ec0fc](https://gitlab.com/gitlab-org/gitlab-ui/commit/d8ec0fcc2131ea9723c670eee592ed329f4853f7))
* **Path:** Fix styles on non-white bg ([e070796](https://gitlab.com/gitlab-org/gitlab-ui/commit/e0707968f8b5f1c5974901b1e5fdca45b4c87206))

# [14.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.4.1...v14.5.0) (2020-05-07)


### Bug Fixes

* **charts:** Use correct palette for series ([29d43cb](https://gitlab.com/gitlab-org/gitlab-ui/commit/29d43cb6411f966c4ec021d8b03776314c0bca84))


### Features

* Add additional justify css styles ([d7ea9fd](https://gitlab.com/gitlab-org/gitlab-ui/commit/d7ea9fd289121c7e3b65fd2b4e730e7735944507))

## [14.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.4.0...v14.4.1) (2020-05-07)


### Bug Fixes

* **css:** Rename inherist text to reset ([36c335e](https://gitlab.com/gitlab-org/gitlab-ui/commit/36c335e3c974419f045201988a10da117bfec25a))

# [14.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.3.1...v14.4.0) (2020-05-07)


### Bug Fixes

* Annotations tooltip logic ([fafe255](https://gitlab.com/gitlab-org/gitlab-ui/commit/fafe2555264b62b92c3eee6686225038458a2d88))


### Features

* **Path:** Add icon to Path component ([b09443f](https://gitlab.com/gitlab-org/gitlab-ui/commit/b09443f4a665875399eb4041008c8e2faee7ff75))

## [14.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.3.0...v14.3.1) (2020-05-07)


### Bug Fixes

* **filters:** Correctly handle filters without v-model ([8682b6c](https://gitlab.com/gitlab-org/gitlab-ui/commit/8682b6cb405caa768c45a93872e2da820821e750))
* **GlSearchBoxByType:** Fix position of clear input icon ([dd5bacc](https://gitlab.com/gitlab-org/gitlab-ui/commit/dd5baccee5df7b51d5f039384d2d8f6dcd01ee7d))

# [14.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.2.1...v14.3.0) (2020-05-07)


### Features

* **filters:** Make filters component to follow design system ([20b8fbd](https://gitlab.com/gitlab-org/gitlab-ui/commit/20b8fbdd3f389fd36f0df946910402bdc67b0cb0))

## [14.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.2.0...v14.2.1) (2020-05-06)


### Bug Fixes

* **css:** Button text ellipsis ([e0368cd](https://gitlab.com/gitlab-org/gitlab-ui/commit/e0368cd90d0450d3245bf06be89c6ab99051b11d))

# [14.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.1.0...v14.2.0) (2020-05-06)


### Features

* **GlNewDropdown:** Add inherited toggle-class ([50243de](https://gitlab.com/gitlab-org/gitlab-ui/commit/50243deb8c60631ff189a870152b6655bc41b0ee))

# [14.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v14.0.0...v14.1.0) (2020-05-06)


### Features

* **css:** Add display table utility ([10a378e](https://gitlab.com/gitlab-org/gitlab-ui/commit/10a378e4bf35b1926b2b6d0617e8f15db57c13de))

# [14.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.9.0...v14.0.0) (2020-05-05)


### Bug Fixes

* **css:** update to -10 variable ([485f157](https://gitlab.com/gitlab-org/gitlab-ui/commit/485f157f9f3268a978a41c4ae740c659b86c3092))
* Rename gray-0 to gray-10 ([13905a6](https://gitlab.com/gitlab-org/gitlab-ui/commit/13905a680cfcbbb70b2ea1b88adc004ad61cb310))


### Features

* **Path:** Add metric variant ([e34938d](https://gitlab.com/gitlab-org/gitlab-ui/commit/e34938d6c28e83e956aa2575368667adb2596cdc))


### BREAKING CHANGES

* $white is $gray-0, whereas this is still slightly gray

# [13.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.8.2...v13.9.0) (2020-05-04)


### Features

* **path:** Implement path component ([82f36c4](https://gitlab.com/gitlab-org/gitlab-ui/commit/82f36c4fa75f3b428a569a76d85e88be655c0a73))

## [13.8.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.8.1...v13.8.2) (2020-04-30)


### Bug Fixes

* Update card component border and footer colors ([26047e7](https://gitlab.com/gitlab-org/gitlab-ui/commit/26047e74a88c81c0d8d3a40945af76b02b75c3bd))

## [13.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.8.0...v13.8.1) (2020-04-30)


### Bug Fixes

* **GlButton:** update loading style ([a03ad7c](https://gitlab.com/gitlab-org/gitlab-ui/commit/a03ad7c16936a91b9a80fbf7bf2ead62a64a3422))

# [13.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.7.1...v13.8.0) (2020-04-30)


### Features

* **label:** Remove doc link from scoped labels and correct padding ([b4ae184](https://gitlab.com/gitlab-org/gitlab-ui/commit/b4ae18490938d27c2c0cf0f7832a2f547e686181))

## [13.7.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.7.0...v13.7.1) (2020-04-30)


### Bug Fixes

* **deps:** upgrade Vue and move it out of dependencies ([55c87d5](https://gitlab.com/gitlab-org/gitlab-ui/commit/55c87d51bcf9ad8dca85a3002def47b80af6217f))
* **filters:** Use dropdown icons in filters ([21b4619](https://gitlab.com/gitlab-org/gitlab-ui/commit/21b4619baf9ab3c2153ad06000ce42f908385a5e))

# [13.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.6.1...v13.7.0) (2020-04-30)


### Bug Fixes

* **GlDatepicker:** fix datepicker positioning ([4263493](https://gitlab.com/gitlab-org/gitlab-ui/commit/42634936e88b29dac9995f89d52c2ef7f581f523))


### Features

* **GlDatepicker:** add slot for custom input ([95bb120](https://gitlab.com/gitlab-org/gitlab-ui/commit/95bb120a664efe69d41c74f3ae6dacd821bb8a26))

## [13.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.6.0...v13.6.1) (2020-04-29)


### Bug Fixes

* **css:** Support arbitrary widths on dropdown ([2ffe961](https://gitlab.com/gitlab-org/gitlab-ui/commit/2ffe96169e94b11b532ba16c6673c976876b2c52))
* **GlTextArea:** Set SSOT for styles ([62f703c](https://gitlab.com/gitlab-org/gitlab-ui/commit/62f703cd2f942fffe290a091defee437a2a8ae64))

# [13.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.5.0...v13.6.0) (2020-04-29)


### Features

* Add annotation markers to gitlab ui ([1d0c55e](https://gitlab.com/gitlab-org/gitlab-ui/commit/1d0c55eeff99d71a66dab9e9887d0096c4e74b3a))

# [13.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.4.0...v13.5.0) (2020-04-27)


### Features

* **css:** Remove white-light variable ([24669c2](https://gitlab.com/gitlab-org/gitlab-ui/commit/24669c2a2ea6e3c46a560a9dc178ba74a25e1438))

# [13.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.3.0...v13.4.0) (2020-04-24)


### Features

* **css:** Add line-height and text-align utils ([3048229](https://gitlab.com/gitlab-org/gitlab-ui/commit/3048229463886cf829a07b787c4e722f47d609e8))

# [13.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.2.0...v13.3.0) (2020-04-24)


### Features

* **nav:** Implement GlNav, GlNavItem components ([962b31b](https://gitlab.com/gitlab-org/gitlab-ui/commit/962b31b913aed57320092400505d2714266c94f6))

# [13.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.1.0...v13.2.0) (2020-04-23)


### Bug Fixes

* **button:** disable loading button ([111349d](https://gitlab.com/gitlab-org/gitlab-ui/commit/111349d7dc8f2d72b86b8f4410d510ec2ec7bcea))


### Features

* **button:** add loading button ([3d5f2f2](https://gitlab.com/gitlab-org/gitlab-ui/commit/3d5f2f26f408816dd69d52bce28b4b0a447e0d29))

# [13.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v13.0.0...v13.1.0) (2020-04-22)


### Features

* **GlFormCheckboxTree:** add toggle all option ([15ce0fd](https://gitlab.com/gitlab-org/gitlab-ui/commit/15ce0fd113a11f8cdb1ac6515ef76025f246a275))

# [13.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v12.3.0...v13.0.0) (2020-04-21)


### Bug Fixes

* **input:** visible border in iOS ([d9a5aba](https://gitlab.com/gitlab-org/gitlab-ui/commit/d9a5abaf8808ca265ccb489ad69206e435e9eb4d))


### Code Refactoring

* 💡 Remove deprecated number sizes from GlLoadingIcon ([d26f397](https://gitlab.com/gitlab-org/gitlab-ui/commit/d26f397a078f07a2d0a3a5e0085acded2a2cd9f2))


### BREAKING CHANGES

* 🧨 GlLoadingIcon does not accept size as a number.
Use string instead.

# [12.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v12.2.0...v12.3.0) (2020-04-21)


### Features

* add clearInput event ([21b9656](https://gitlab.com/gitlab-org/gitlab-ui/commit/21b965621b4fdf8f2310c2c434c625c6d486e1d7))

# [12.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v12.1.1...v12.2.0) (2020-04-20)


### Features

* **markdown:** Implement markdown typescale ([05d4a64](https://gitlab.com/gitlab-org/gitlab-ui/commit/05d4a64fe30f20937aa0eeed6ed513fb2ddbac57))

## [12.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v12.1.0...v12.1.1) (2020-04-18)


### Bug Fixes

* **charts:** update legend label spacing ([1a42ccc](https://gitlab.com/gitlab-org/gitlab-ui/commit/1a42ccc3f49af871f0393560939bed4bccfe496d))

# [12.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v12.0.3...v12.1.0) (2020-04-17)


### Features

* **heatmap:** Add tooltip slot ([0f7f74e](https://gitlab.com/gitlab-org/gitlab-ui/commit/0f7f74eca1b8b96ff2af8ba6614a9367570897cf))

## [12.0.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v12.0.2...v12.0.3) (2020-04-16)


### Bug Fixes

* **dropdown:** Remove bootstrap [@extend](https://gitlab.com/extend) statements ([ff4fa76](https://gitlab.com/gitlab-org/gitlab-ui/commit/ff4fa76b3a83cacefafc01f1a401aa7bbdb21265))

## [12.0.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v12.0.1...v12.0.2) (2020-04-16)


### Bug Fixes

* Resolve pagination links not working in compact mode ([978bb49](https://gitlab.com/gitlab-org/gitlab-ui/commit/978bb49338928b7343ee4083d513824780ea9ac3))

## [12.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v12.0.0...v12.0.1) (2020-04-16)


### Bug Fixes

* **charts:** fix engineering notation formatter locale issue ([20259fb](https://gitlab.com/gitlab-org/gitlab-ui/commit/20259fb1481ce627ddad764c835643883d75426d))
* **GlFormTextArea:** Apply error styles ([79bac04](https://gitlab.com/gitlab-org/gitlab-ui/commit/79bac04cc744d0a950938e95afb93b105a566ef4))

# [12.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.7.0...v12.0.0) (2020-04-15)


### Code Refactoring

* rename GlNewButton to GlButton ([abc8156](https://gitlab.com/gitlab-org/gitlab-ui/commit/abc81566df72c691fbe34839d62e484c29d11f12))


### BREAKING CHANGES

* The GlNewButton component has been renamed to GlButton

Make sure to update your import statements:

```patch
- import { GlNewButton } from '@gitlab/ui';
+ import { GlButton } from '@gitlab/ui';
```

And your templates:

```patch
- <gl-new-button></gl-new-button>
+ <gl-button></gl-button>
```

# [11.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.6.0...v11.7.0) (2020-04-14)


### Features

* add GlFormCheckboxTree component ([5818d56](https://gitlab.com/gitlab-org/gitlab-ui/commit/5818d564eaf3dcb03f710ade22741a5cf7c7e519))

# [11.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.5.0...v11.6.0) (2020-04-14)


### Features

* Add annotations arrow and tooltip ([56d8a41](https://gitlab.com/gitlab-org/gitlab-ui/commit/56d8a411dce5af6dcee4642b7b6033d31365b3a3))

# [11.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.4.0...v11.5.0) (2020-04-14)


### Features

* **css:** Add display utilities ([5cf8173](https://gitlab.com/gitlab-org/gitlab-ui/commit/5cf81733bb2188d66097c4aa4ce39926ba2dd6ae))
* **css:** Add opacity utilities ([2ce766a](https://gitlab.com/gitlab-org/gitlab-ui/commit/2ce766a29522f0924e99b5f27aaf5ef2974f35c7))

# [11.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.3.0...v11.4.0) (2020-04-14)


### Features

* **css:** Add missing scale utilities ([f21d085](https://gitlab.com/gitlab-org/gitlab-ui/commit/f21d0851c0d7a8b4ae383873de6d95e8a15afeed))

# [11.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.2.1...v11.3.0) (2020-04-13)


### Features

* **charts:** Update chart css for long labels ([41bef73](https://gitlab.com/gitlab-org/gitlab-ui/commit/41bef73421abb8d220a96a51bcb881bd52ad8d2c))
* **css:** Add flex fill css utility ([65ba334](https://gitlab.com/gitlab-org/gitlab-ui/commit/65ba334f8ff45f0ce26d71aff738409c4fca7866))
* **css:** Add padding utilities ([4d65503](https://gitlab.com/gitlab-org/gitlab-ui/commit/4d655037824a838899c3599c484a40e08837811a))

## [11.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.2.0...v11.2.1) (2020-04-09)


### Bug Fixes

* **button:** icon button fill color ([e913662](https://gitlab.com/gitlab-org/gitlab-ui/commit/e9136627b454ddd87ba71a3f15d5095bd3938e07))

# [11.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.1.0...v11.2.0) (2020-04-08)


### Features

* **css:** Add cursor grab css utility ([ad0f02c](https://gitlab.com/gitlab-org/gitlab-ui/commit/ad0f02c61ba3571c5f96d443c2d6ae0418b1d02b))
* **css:** Update transform naming ([c8621ca](https://gitlab.com/gitlab-org/gitlab-ui/commit/c8621ca7b2530050afd19870b96169676510126e))

# [11.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.0.3...v11.1.0) (2020-04-06)


### Features

* **css:** Add missing y transform utilities ([32f8b26](https://gitlab.com/gitlab-org/gitlab-ui/commit/32f8b26f04af049dc947c23a3f4162fe1772cf1c))

## [11.0.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.0.2...v11.0.3) (2020-04-06)


### Bug Fixes

* **filters:** Fix styles for GitLab ([2fb56b4](https://gitlab.com/gitlab-org/gitlab-ui/commit/2fb56b4c7ad9f5623f5ece39105789a1e5e19c44))

## [11.0.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.0.1...v11.0.2) (2020-04-03)


### Bug Fixes

* **DaterangePicker:** Add sameDaySelection prop ([44a6459](https://gitlab.com/gitlab-org/gitlab-ui/commit/44a645972dc998bfd05b85909cfdd0ff7f95d305))

## [11.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v11.0.0...v11.0.1) (2020-04-03)


### Bug Fixes

* Chart tooltip positioning logic ([03d7dbf](https://gitlab.com/gitlab-org/gitlab-ui/commit/03d7dbf268a9df4c9f4716ba2664c793b083adcc))

# [11.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.4.0...v11.0.0) (2020-04-02)


### Features

* Add focus state mixins, utilize for form inputs ([72c7be1](https://gitlab.com/gitlab-org/gitlab-ui/commit/72c7be11f753eae566e5bd45c1d4faafb18027b1))
* rename GlButton to GlDeprecatedButton ([123324b](https://gitlab.com/gitlab-org/gitlab-ui/commit/123324bb5f973456d233741b4c93c9b1e885579e))


### BREAKING CHANGES

* The GlButton component has been renamed to
GlDeprecatedButton.

Import statements need to be updated accordingly:

Before:

import { GlButton } from '@gitlab/ui';

After:

import { GlDeprecatedButton } from '@gitlab/ui';

In Vue templates, make sure to update the component's usages as well:

Before:

<gl-button>My button</gl-button>

After:

<gl-button>My button</gl-button>

# [10.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.3.3...v10.4.0) (2020-04-02)


### Features

* **colors:** Add more text colors for export ([34e39e3](https://gitlab.com/gitlab-org/gitlab-ui/commit/34e39e3ac1dc6b72cc92a3e9bb9f2423b650fe62))

## [10.3.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.3.2...v10.3.3) (2020-04-01)


### Bug Fixes

* Add missing GlAvatar import in GlNewDropdownItem ([be6b3fe](https://gitlab.com/gitlab-org/gitlab-ui/commit/be6b3fe638ee0aeb926ade2d0d7c35500328d249))
* **banner:** set line heights and spacings explicitly ([0dbb214](https://gitlab.com/gitlab-org/gitlab-ui/commit/0dbb214774b1ae356b05898c07de97822f7b6d84))

## [10.3.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.3.1...v10.3.2) (2020-04-01)


### Bug Fixes

* block button padding ([e2bc974](https://gitlab.com/gitlab-org/gitlab-ui/commit/e2bc974a24181c7f1cd3cda5f854aab00beaf1ea))
* **button:** center text in block button ([b4d10b7](https://gitlab.com/gitlab-org/gitlab-ui/commit/b4d10b7527c85828645e75b2df3cb7588049c4ba))

## [10.3.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.3.0...v10.3.1) (2020-04-01)


### Bug Fixes

* **radio:** Fix v-model binding ([611e369](https://gitlab.com/gitlab-org/gitlab-ui/commit/611e369c8bffbd9620da7ce5360c16b44dd5fdce))

# [10.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.2.0...v10.3.0) (2020-04-01)


### Features

* **filters:** Fill operator part if only one operator exists ([be4ee6f](https://gitlab.com/gitlab-org/gitlab-ui/commit/be4ee6f81849c34d02642b136a3acb5ed9c1f180))

# [10.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.1.3...v10.2.0) (2020-04-01)


### Features

* Add annotations ([24126fc](https://gitlab.com/gitlab-org/gitlab-ui/commit/24126fcd17ec616bc158c29726049c5d0bafc47e))

## [10.1.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.1.2...v10.1.3) (2020-03-31)


### Bug Fixes

* **segmented_control:** Handle loop edge case ([0afba6f](https://gitlab.com/gitlab-org/gitlab-ui/commit/0afba6fad29e63372b220e401f804ee6b5bd27ad)), closes [/gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/1230#note_313466652](https://gitlab.com//gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/1230/issues/note_313466652)

## [10.1.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.1.1...v10.1.2) (2020-03-30)


### Bug Fixes

* **form:** Update form group message spacing ([a82db41](https://gitlab.com/gitlab-org/gitlab-ui/commit/a82db41e7994019e3e9d444f9a962d8f371d4b5b))

## [10.1.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.1.0...v10.1.1) (2020-03-30)


### Bug Fixes

* align dropdown caret when block ([eefffcd](https://gitlab.com/gitlab-org/gitlab-ui/commit/eefffcda51bb6c1d722459d88fbd4fac0a6a6189))
* use gitlab util class ([7a174f6](https://gitlab.com/gitlab-org/gitlab-ui/commit/7a174f688f2c4fe3d8cf36e78d1171256ad1c8ec))

# [10.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.0.1...v10.1.0) (2020-03-27)


### Features

* **colors:** Mark color variables as default ([e9b0d5b](https://gitlab.com/gitlab-org/gitlab-ui/commit/e9b0d5bb6ff86eabb2748b0b339a721af5d73999))


### Reverts

* only run on danger-review MR creation/update ([fa68ce0](https://gitlab.com/gitlab-org/gitlab-ui/commit/fa68ce03c723205f6b11c48ed9c4c8372b98de1e))

## [10.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v10.0.0...v10.0.1) (2020-03-25)


### Bug Fixes

* **popover:** add margin 0 by default for popover header ([0028f6f](https://gitlab.com/gitlab-org/gitlab-ui/commit/0028f6f3672d5eec951c895f772c6f231be51aba))

# [10.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.33.1...v10.0.0) (2020-03-23)


### Features

* **colors:** Improve color palette accessibility ([8309567](https://gitlab.com/gitlab-org/gitlab-ui/commit/8309567ffb15bc01011abaf9450178f49ae4ad83))


### Reverts

* only run on danger-review MR creation/update ([3d174e5](https://gitlab.com/gitlab-org/gitlab-ui/commit/3d174e550e6a5b3f02790932d8c0cb78591f77ab))


### BREAKING CHANGES

* **colors:** Update color variables to match the
accessibility improvements in the Pajamas color specification

## [9.33.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.33.0...v9.33.1) (2020-03-23)


### Bug Fixes

* Make data visualization variables clearer ([5ca173a](https://gitlab.com/gitlab-org/gitlab-ui/commit/5ca173abd7bb3f268dd1567a7c64810d7de8765d))

# [9.33.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.32.0...v9.33.0) (2020-03-20)


### Features

* Data visualization color palette ([22a979f](https://gitlab.com/gitlab-org/gitlab-ui/commit/22a979f8a1c46ab2dca41084e176fb64b3c9bf25))

# [9.32.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.31.2...v9.32.0) (2020-03-19)


### Features

* Dynamically position axis names for long axis labels ([466bbf5](https://gitlab.com/gitlab-org/gitlab-ui/commit/466bbf5e914c8c4cbc922bd7f74fc083aad5af62))

## [9.31.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.31.1...v9.31.2) (2020-03-19)


### Bug Fixes

* add test coverage for events ([4f3a3a5](https://gitlab.com/gitlab-org/gitlab-ui/commit/4f3a3a5aa78b51f73f7bde6d8c89c059820b0b14))
* adjust secondary action on modal ([52079c7](https://gitlab.com/gitlab-org/gitlab-ui/commit/52079c79896d10b5d4502bc7afeed27ad07b105d))

## [9.31.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.31.0...v9.31.1) (2020-03-19)


### Bug Fixes

* Set label font size ([8241e2a](https://gitlab.com/gitlab-org/gitlab-ui/commit/8241e2ac527bbfa65b3d82d49cf284371c34b179))

# [9.31.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.30.0...v9.31.0) (2020-03-18)


### Features

* **css:** Generate stateful utility classes ([e9ca4f1](https://gitlab.com/gitlab-org/gitlab-ui/commit/e9ca4f180ea7fd5aa2b3afce09cf283f8d4ca786))

# [9.30.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.29.0...v9.30.0) (2020-03-17)


### Features

* **barchart:** Support bar charts ([d4d0f7e](https://gitlab.com/gitlab-org/gitlab-ui/commit/d4d0f7e9206f27be46fb0fcda1665dad8fb2c35e))

# [9.29.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.28.0...v9.29.0) (2020-03-17)


### Features

* **css:** Add missing spacing utilities ([bd24d60](https://gitlab.com/gitlab-org/gitlab-ui/commit/bd24d601aff43a43ab18ce5bd90d72529cec2144))

# [9.28.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.27.0...v9.28.0) (2020-03-14)


### Features

* Receive inherited attrs & listeners in infinite scroll ([2847f92](https://gitlab.com/gitlab-org/gitlab-ui/commit/2847f9239d4496dd89b3b74cd5f4edbc5c0f59e1))

# [9.27.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.26.0...v9.27.0) (2020-03-13)


### Features

* **filters:** Fix error when scrolling to suggestion ([4595b2b](https://gitlab.com/gitlab-org/gitlab-ui/commit/4595b2bd2f5496bcef1dd51d7f62f1bd3c314d55))

# [9.26.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.25.0...v9.26.0) (2020-03-13)


### Features

* **css:** Add spacing utilities ([1f03cfe](https://gitlab.com/gitlab-org/gitlab-ui/commit/1f03cfe64b41b788c9fd94df9f3ad8884f31b741))

# [9.25.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.24.0...v9.25.0) (2020-03-13)


### Features

* **css:** add spacing utilities ([56e534c](https://gitlab.com/gitlab-org/gitlab-ui/commit/56e534cbcb4d062b48470149a1c8e8dc2f97a129))

# [9.24.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.23.2...v9.24.0) (2020-03-12)


### Features

* **filters:** Sync filters implementation with draft spec ([436eb51](https://gitlab.com/gitlab-org/gitlab-ui/commit/436eb5139e90ec4a096e033454553ca81eee6348))
* **utilities:** Add missing utilities ([fd029b2](https://gitlab.com/gitlab-org/gitlab-ui/commit/fd029b28aba2fec62453e3f01f6cc658ec0cf1fc))

## [9.23.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.23.1...v9.23.2) (2020-03-11)


### Bug Fixes

* Update pagination scss to remove custom bootstrap breakpoint ([adc5c55](https://gitlab.com/gitlab-org/gitlab-ui/commit/adc5c550e82177bd02cd5b42e5e2a434cd32eaef))

## [9.23.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.23.0...v9.23.1) (2020-03-10)


### Bug Fixes

* add gl-border-gray-100 utility ([bd2897c](https://gitlab.com/gitlab-org/gitlab-ui/commit/bd2897cc499dde7edf08838300ab1413a0971660))

# [9.23.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.22.1...v9.23.0) (2020-03-05)


### Features

* Adds an navbar component ([3c3d97e](https://gitlab.com/gitlab-org/gitlab-ui/commit/3c3d97e4904b41732aaa355095f6f421d5e03cc6))

## [9.22.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.22.0...v9.22.1) (2020-03-04)


### Bug Fixes

* Reverting flag until it’s true ([21139f0](https://gitlab.com/gitlab-org/gitlab-ui/commit/21139f09f1dfcf4e5e8529b0075f84b089bcb26e))

# [9.22.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.21.2...v9.22.0) (2020-03-04)


### Bug Fixes

* **rollup:** include config.js in dist/ ([d0792d8](https://gitlab.com/gitlab-org/gitlab-ui/commit/d0792d8b4857dc7424c941ef3b5ca119c74c12ab))


### Features

* Adds an observer component ([314dda4](https://gitlab.com/gitlab-org/gitlab-ui/commit/314dda4b7e37ba103daaa797c37a718d504a5b3c))

## [9.21.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.21.1...v9.21.2) (2020-03-04)


### Bug Fixes

* Registers GlIcon for the GlNewDropdownItems component ([91ae2a3](https://gitlab.com/gitlab-org/gitlab-ui/commit/91ae2a30ab78d8bebdd5989f39655e07f166cfac))

## [9.21.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.21.0...v9.21.1) (2020-03-03)


### Bug Fixes

* **label:** Style fix for labels without link ([0807e47](https://gitlab.com/gitlab-org/gitlab-ui/commit/0807e472f92b423b0894b33e5b336fa54959ad55))

# [9.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.20.0...v9.21.0) (2020-03-03)


### Features

* Allow input examples to display ([496f979](https://gitlab.com/gitlab-org/gitlab-ui/commit/496f9798d3e9c926851aaa5ce03f916cd2f1a7ea))

# [9.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.19.0...v9.20.0) (2020-03-02)


### Features

* **css:** add 'gl-pl-4' spacing mixin ([7ff8bab](https://gitlab.com/gitlab-org/gitlab-ui/commit/7ff8babf2d1d2278724e2d19f9b661293c7757a7))

# [9.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.18.2...v9.19.0) (2020-03-02)


### Features

* **token:** Add new token variants ([603e909](https://gitlab.com/gitlab-org/gitlab-ui/commit/603e909752598ebcd144873dca575ecb1b645b32))

## [9.18.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.18.1...v9.18.2) (2020-03-02)


### Bug Fixes

* Add border to invalid input ([e245506](https://gitlab.com/gitlab-org/gitlab-ui/commit/e245506e2f45a7354a207de32103d58afc0d7b27))

## [9.18.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.18.0...v9.18.1) (2020-02-29)


### Bug Fixes

* **avatar:** Fix avatar styles SASS error ([5df627a](https://gitlab.com/gitlab-org/gitlab-ui/commit/5df627a5b13d27c71d9135264d55405f23ca992a))

# [9.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.17.0...v9.18.0) (2020-02-28)


### Features

* Make gitlab-ui tree-shakeable ([6fd7f1f](https://gitlab.com/gitlab-org/gitlab-ui/commit/6fd7f1fdc12d731d87f75148a1688fba18a3d974))

# [9.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.16.0...v9.17.0) (2020-02-26)


### Features

* **avatar:** Use correct avatar font sizes ([e6a149a](https://gitlab.com/gitlab-org/gitlab-ui/commit/e6a149a986782252e911384cd7c8d073f8769abf))

# [9.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.15.0...v9.16.0) (2020-02-25)


### Features

* **typescale:** Implement UI typescale ([4fc0e56](https://gitlab.com/gitlab-org/gitlab-ui/commit/4fc0e56217800069bf85a4a2e25b4acd2047bfb9))

# [9.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.14.0...v9.15.0) (2020-02-25)


### Features

* update tooltip delay speed ([f127fe2](https://gitlab.com/gitlab-org/gitlab-ui/commit/f127fe2979a1b4381afeaf000ff97bf83f378ae6))

# [9.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.13.0...v9.14.0) (2020-02-24)


### Features

* **pagination:** use gl-icon in prev and next page items ([6d42aff](https://gitlab.com/gitlab-org/gitlab-ui/commit/6d42aff7beb73a7b4adc065cb7fb86f918da73d6))

# [9.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.12.0...v9.13.0) (2020-02-24)


### Features

* **label:** Add title to scoped label tooltip ([47d96d5](https://gitlab.com/gitlab-org/gitlab-ui/commit/47d96d5a70e412f62d3f67ba60af98ee3c6d9fad))

# [9.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.11.2...v9.12.0) (2020-02-24)


### Features

* Adds a new button variation ([a9f95c9](https://gitlab.com/gitlab-org/gitlab-ui/commit/a9f95c91d4b1d4079ba4236ea5b055346b5fd99f))

## [9.11.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.11.1...v9.11.2) (2020-02-19)


### Bug Fixes

* **dropdown:** Fix dropdown caret alignment ([fc9126c](https://gitlab.com/gitlab-org/gitlab-ui/commit/fc9126c591bc61f09ab907f1b688c21e56cfd355))

## [9.11.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.11.0...v9.11.1) (2020-02-17)


### Bug Fixes

* Show all tooltips when multiple series ([ed022dc](https://gitlab.com/gitlab-org/gitlab-ui/commit/ed022dc036dba2629907a002f898df43e8ed2d84))

# [9.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.10.1...v9.11.0) (2020-02-17)


### Features

* **css:** Add pajamas typescale variables ([bd9ed44](https://gitlab.com/gitlab-org/gitlab-ui/commit/bd9ed447d81c790b488ddb0364fbdd4fca72e241))

## [9.10.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.10.0...v9.10.1) (2020-02-14)


### Bug Fixes

* **radio:** Explicitly set line height ([7d58f43](https://gitlab.com/gitlab-org/gitlab-ui/commit/7d58f438e530cc08a051273dc0a35bcb68c84aac))

# [9.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.9.0...v9.10.0) (2020-02-13)


### Features

* **css:** Expose gl-bg-theme-indigo-50 utility class ([3a364e2](https://gitlab.com/gitlab-org/gitlab-ui/commit/3a364e25fe18c915642d6458f5318ae401c629d5))

# [9.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.8.0...v9.9.0) (2020-02-12)


### Features

* Add autofocus in modal component ([a1f0c8d](https://gitlab.com/gitlab-org/gitlab-ui/commit/a1f0c8dc30de6f525925cae8ad32897a434d42d9))

# [9.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.7.0...v9.8.0) (2020-02-11)


### Features

* Add tooltip to badge for GlAvatarsInline ([81c5495](https://gitlab.com/gitlab-org/gitlab-ui/commit/81c5495852a38fea8bc920e74700aea8c9035105))

# [9.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.6.1...v9.7.0) (2020-02-11)


### Features

* Add gl-form component ([1c4aa0f](https://gitlab.com/gitlab-org/gitlab-ui/commit/1c4aa0f392844bf5715e7335baa688a2b831def9))

## [9.6.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.6.0...v9.6.1) (2020-02-11)


### Bug Fixes

* Bind bootstrap-vue tooltip events ([bee4bec](https://gitlab.com/gitlab-org/gitlab-ui/commit/bee4bec39fca86c667fcf5c1f1a60985459d05d8))

# [9.6.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.5.0...v9.6.0) (2020-02-10)


### Features

* add visible label to gl-toggle ([d57be1e](https://gitlab.com/gitlab-org/gitlab-ui/commit/d57be1eccb5c5b19702d30c650f0e0f97cfc2c22))

# [9.5.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.4.1...v9.5.0) (2020-02-07)


### Features

* **filtered_search:** Implement filtered search ([7ff1ee2](https://gitlab.com/gitlab-org/gitlab-ui/commit/7ff1ee2f1d847b002bad215fdfc03a0b088de507))

## [9.4.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.4.0...v9.4.1) (2020-02-07)


### Bug Fixes

* **form-input:** apply form-control-focus mixin ([5f2f686](https://gitlab.com/gitlab-org/gitlab-ui/commit/5f2f6860348a499879b3ce925b82a773cfe79904))

# [9.4.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.3.0...v9.4.0) (2020-02-05)


### Bug Fixes

* **labels:** moved ref from link ([7bc45d0](https://gitlab.com/gitlab-org/gitlab-ui/commit/7bc45d03734814d1d7fc255585a7dec09a240b1e))


### Features

* **carousel:** Build carousel component ([f29e8fe](https://gitlab.com/gitlab-org/gitlab-ui/commit/f29e8fe0a8d1a0e72a3555b37697058a29068350))

# [9.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.6...v9.3.0) (2020-02-04)


### Features

* update size prop to match ds ([ec1400f](https://gitlab.com/gitlab-org/gitlab-ui/commit/ec1400f49f311463919630da6015b8ea0a8f60ef))

## [9.2.6](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.5...v9.2.6) (2020-01-31)


### Bug Fixes

* Make classes for gl-filtered-search-suggestion more specific in order to override styles in GitLab ([d475389](https://gitlab.com/gitlab-org/gitlab-ui/commit/d4753891600e6c7ba89f45581b757b207f09fb44))

## [9.2.5](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.4...v9.2.5) (2020-01-31)


### Reverts

* fix(bootstrap-vue): Upgrade bootstrap-vue ([f20c5e1](https://gitlab.com/gitlab-org/gitlab-ui/commit/f20c5e1006fe95e5687621956d6d15fc776a6c3d))

## [9.2.4](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.3...v9.2.4) (2020-01-30)


### Bug Fixes

* **bootstrap-vue:** Upgrade bootstrap-vue to 2.3.0 ([d531986](https://gitlab.com/gitlab-org/gitlab-ui/commit/d5319865534f6e496f2255b1d3591352c6e5bb60))

## [9.2.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.2...v9.2.3) (2020-01-29)


### Bug Fixes

* add @gitlab/svgs to peerDependencies ([00381c2](https://gitlab.com/gitlab-org/gitlab-ui/commit/00381c285d557142e4569b7d4e03d28478896237))

## [9.2.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.1...v9.2.2) (2020-01-28)


### Bug Fixes

* Help text font size being overridden ([3bb7d41](https://gitlab.com/gitlab-org/gitlab-ui/commit/3bb7d4199edf93999a3a46767fe943b3c6a63526))

## [9.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.0...v9.2.1) (2020-01-28)


### Bug Fixes

* **popover:** Expose popover event listeners ([684c786](https://gitlab.com/gitlab-org/gitlab-ui/commit/684c7862bdac3f38edf05ba5ef2dcc533202b44d))

# [9.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.1.0...v9.2.0) (2020-01-28)


### Features

* **filtered_search:** Implement static binary token ([591ced0](https://gitlab.com/gitlab-org/gitlab-ui/commit/591ced08a21be587cf8ac7ac3395d859c2721511))

# [9.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.0.2...v9.1.0) (2020-01-28)


### Features

* Add Collapse component ([6be57d0](https://gitlab.com/gitlab-org/gitlab-ui/commit/6be57d07628b717b65f4df51a477ca577d2d068a))
* **sprintf:** Allow full sentence interpolation ([af82918](https://gitlab.com/gitlab-org/gitlab-ui/commit/af82918633eaf19d40ea2da36e98401496f6e27a)), closes [/gitlab.com/gitlab-org/gitlab/issues/21344#note_221778896](https://gitlab.com//gitlab.com/gitlab-org/gitlab/issues/21344/issues/note_221778896)

## [9.0.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.0.1...v9.0.2) (2020-01-24)


### Bug Fixes

* **broadcast message:** adjust vertical spacing ([82d5cca](https://gitlab.com/gitlab-org/gitlab-ui/commit/82d5cca46526f6c2118e113edca9ea04e173b432))

## [9.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.0.0...v9.0.1) (2020-01-24)


### Bug Fixes

* Enhance daterange_picker range selection ([fa2c4c1](https://gitlab.com/gitlab-org/gitlab-ui/commit/fa2c4c1cbc0fbc4c3b4744c31b63470322f120e7))

# [9.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.21.0...v9.0.0) (2020-01-23)


### Code Refactoring

* Upgrade BootstrapVue to 2.1.0 ([6d6ef5b](https://gitlab.com/gitlab-org/gitlab-ui/commit/6d6ef5bfaade2dc13f86f5f27311aaaebef2df69))


### BREAKING CHANGES

* Upgrade bootstrap-vue dependency to version 2.1.0. This
upgrade contains the following breaking changes:

- Import statements for bootstrap-vue components changed.
- BTable component has a new slot syntax for custom content.
- BTabs component has a new slot syntax for contentless tabs
- BPopover and BTooltip components were completely rewritten

For more information about this upgrade, check BootstrapVue changelog
page https://bootstrap-vue.org/docs/misc/changelog

# [8.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.20.0...v8.21.0) (2020-01-23)


### Features

* **avatars:** Detach collapsed state from badge ([a24270b](https://gitlab.com/gitlab-org/gitlab-ui/commit/a24270bcae6ca70cfe0fb651c9a9aa5349f7933d))

# [8.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.19.1...v8.20.0) (2020-01-23)


### Features

* **color:** adding $purple color variables ([9310e3f](https://gitlab.com/gitlab-org/gitlab-ui/commit/9310e3f0d48e32ab3fcfb83cbfe628ced2f95988))

## [8.19.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.19.0...v8.19.1) (2020-01-22)


### Bug Fixes

* **avatars-inline:** Fix collapsible behavior ([bb60fdb](https://gitlab.com/gitlab-org/gitlab-ui/commit/bb60fdb2a8c23982467ccfabfaf85d93ea865d36))

# [8.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.18.0...v8.19.0) (2020-01-21)


### Features

* Introduce new modal API ([65d8135](https://gitlab.com/gitlab-org/gitlab-ui/commit/65d81352be7f42256b3f27a52b8b90b5a4a80d6a))

# [8.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.17.0...v8.18.0) (2020-01-20)


### Bug Fixes

* Tooltip on Label for gitlab ([10a9507](https://gitlab.com/gitlab-org/gitlab-ui/commit/10a95070d63ad11b51e02eb115a5b92ca120bdd6))


### Features

* update button props ([95f971c](https://gitlab.com/gitlab-org/gitlab-ui/commit/95f971c1be00045769ea91281e1967951efbed76))

# [8.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.16.0...v8.17.0) (2020-01-17)


### Features

* **filtered_search:** Implement filtered search binary token ([6b14c21](https://gitlab.com/gitlab-org/gitlab-ui/commit/6b14c21077cf60f601c715baa4b943e2b278327d))

# [8.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.15.0...v8.16.0) (2020-01-16)


### Features

* Inline avatars component ([688feba](https://gitlab.com/gitlab-org/gitlab-ui/commit/688febaf7cdb145165042a06a2b2fab8d7ad2f11))

# [8.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.14.0...v8.15.0) (2020-01-14)


### Features

* **filtered_search:** Implement filtered search term ([1d0bc82](https://gitlab.com/gitlab-org/gitlab-ui/commit/1d0bc82f3e74159e9572ba96a8af60ab701fc860))

# [8.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.13.0...v8.14.0) (2020-01-14)


### Features

* add broadcast message component ([aaf98e6](https://gitlab.com/gitlab-org/gitlab-ui/commit/aaf98e65aa01bc3607069eaa9b0d3209f02e680e))

# [8.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.12.0...v8.13.0) (2020-01-10)


### Features

* **filtered_search:** Implement filtered search suggestions ([8b67b12](https://gitlab.com/gitlab-org/gitlab-ui/commit/8b67b12313df23a3b576f4f6f5a8d7a95d682631))

# [8.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.11.0...v8.12.0) (2020-01-10)


### Features

* Add Input Group component ([16fa807](https://gitlab.com/gitlab-org/gitlab-ui/commit/16fa807113dc0faf847577e5e0b8953e3d940537))

# [8.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.10.0...v8.11.0) (2020-01-09)


### Bug Fixes

* prevent text prop when icon/split are used ([ad5e9ec](https://gitlab.com/gitlab-org/gitlab-ui/commit/ad5e9ec59c23d89638d5552558ec3edb91b96f5d))
* Set current year to fixed value ([789b612](https://gitlab.com/gitlab-org/gitlab-ui/commit/789b612487a987f5be2f45449461b2596b804812))


### Features

* Add icon and split to new dropdown ([b9dc446](https://gitlab.com/gitlab-org/gitlab-ui/commit/b9dc446c040e00008d47df28babf629e33f5a404))
* **search:** Add tooltip container support for search components ([2ce9b7c](https://gitlab.com/gitlab-org/gitlab-ui/commit/2ce9b7c22e8edf152ea1a67101e3d6dd585c894e))

# [8.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.9.0...v8.10.0) (2019-12-30)


### Features

* Export breakpoints from utils ([b6e4ace](https://gitlab.com/gitlab-org/gitlab-ui/commit/b6e4ace54fec274e0de213c030eb42af1b0306a4))

# [8.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.8.1...v8.9.0) (2019-12-20)


### Features

* update dropdown examples ([ba6d9d7](https://gitlab.com/gitlab-org/gitlab-ui/commit/ba6d9d7b52bad22687db9f95b97eb06e37aebb8a))

## [8.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.8.0...v8.8.1) (2019-12-20)


### Bug Fixes

* Fix empty tooltip on sparklines ([a74c6e1](https://gitlab.com/gitlab-org/gitlab-ui/commit/a74c6e169d73b1ca15e64ed23a0a557ebae9fda6))

# [8.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.7.0...v8.8.0) (2019-12-17)


### Features

* Add xported utils ([1d35af2](https://gitlab.com/gitlab-org/gitlab-ui/commit/1d35af230a741503162e1f295e9737fcac597d4c))

# [8.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.6.3...v8.7.0) (2019-12-17)


### Features

* Init card component ([783121d](https://gitlab.com/gitlab-org/gitlab-ui/commit/783121dcb68a7d6d6b28b09ba29869de6610df46))

## [8.6.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.6.2...v8.6.3) (2019-12-16)


### Bug Fixes

* **search:** fix search components with gitlab CSS ([4c65fdd](https://gitlab.com/gitlab-org/gitlab-ui/commit/4c65fdd1485a0eb7f18eca09903309e8f34e60f0))

## [8.6.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.6.1...v8.6.2) (2019-12-13)


### Reverts

* feat: add and style badges ([b78b497](https://gitlab.com/gitlab-org/gitlab-ui/commit/b78b4976d2e47e4d7c37393d460fc134c07edbf6))
