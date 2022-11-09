const useVue3 = process.env.VUE_VERSION === '3';
const framework = useVue3 ? '@storybook/vue3' : '@storybook/vue';

// eslint-disable-next-line import/no-dynamic-require
require(`${framework}/bin/index.js`);
