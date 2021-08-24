import SingleStatBadgeExample from './single_stat.badge.example.vue';
import SingleStatHoverExample from './single_stat.hover.example.vue';
import SingleStatIconExample from './single_stat.meta_icon.example.vue';
import SingleStatSimpleExample from './single_stat.simple.example.vue';
import SingleStatTitleIconExample from './single_stat.title_icon.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'simple',
        name: 'Simple',
        component: SingleStatSimpleExample,
      },
      {
        id: 'metaIcon',
        name: 'Meta Icon',
        component: SingleStatIconExample,
      },
      {
        id: 'badge',
        name: 'Badge',
        component: SingleStatBadgeExample,
      },
      {
        id: 'titleIcon',
        name: 'Title Icon',
        component: SingleStatTitleIconExample,
      },
      {
        id: 'hover',
        name: 'Hover',
        component: SingleStatHoverExample,
      },
    ],
  },
];
