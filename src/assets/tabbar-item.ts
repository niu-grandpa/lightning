import { defineAsyncComponent, DefineComponent } from 'vue';

type TabbarItemObj = {
  text: string;
  icon: string;
  name: string;
  component: DefineComponent;
};

export default <TabbarItemObj[]>[
  {
    text: '首页',
    icon: 'home',
    name: 'home',
    component: defineAsyncComponent(() => import('../pages/person/index.vue')),
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
    text: '漫画',
    icon: 'category',
    name: 'cartoon',
    component: defineAsyncComponent(() => import('../pages/cartoon/index.vue')),
  },
  {
    text: '我的',
    icon: 'my',
    name: 'person',
    component: defineAsyncComponent(() => import('../pages/person/index.vue')),
  },
];
