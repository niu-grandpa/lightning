import { defineAsyncComponent } from 'vue';

export type TabbarItemObj = {
  text: string;
  icon: string;
  name: string;
  component: any;
};

export default <TabbarItemObj[]>[
  {
    text: '首页',
    icon: 'home',
    name: 'home',
    component: defineAsyncComponent(() => import('../pages/horizon/index.vue')),
  },
  {
    text: '视频',
    icon: 'play-start',
    name: 'video',
    component: defineAsyncComponent(() => import('../pages/video/index.vue')),
  },
  {
    text: '视界',
    icon: 'find',
    name: 'horizon',
    component: defineAsyncComponent(() => import('../pages/horizon/index.vue')),
  },
  {
    text: '小说',
    icon: 'horizontal-n',
    name: 'novel',
    component: defineAsyncComponent(() => import('../pages/novel/index.vue')),
  },
  {
    text: '我的',
    icon: 'my',
    name: 'person',
    component: defineAsyncComponent(() => import('../pages/person/index.vue')),
  },
];
