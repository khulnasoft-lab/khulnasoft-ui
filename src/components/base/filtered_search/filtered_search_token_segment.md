The filtered search token segment is a component for managing token input either via free typing
or by selecting item through dropdown list

## Usage

This component is internal and is not intended to be used by `@gitlab/ui` users.

## Internet Explorer 11

This component uses [`String.prototype.startsWith()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
and [`String.prototype.endsWith()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
under the hood. Make sure those methods are polyfilled if you plan on using the component on IE11.

> NOTE: These methods are already polyfilled in GitLab: [`app/assets/javascripts/commons/polyfills.js#L15-16`](https://gitlab.com/gitlab-org/gitlab/blob/dc60dee6ed6234dda9f032195577cd8fad9646d8/app/assets/javascripts/commons/polyfills.js#L15-16)
