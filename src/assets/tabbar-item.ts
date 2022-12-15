import { defineAsyncComponent, DefineComponent } from 'vue';

export type TabbarItemObj = {
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
  },
  {
    text: '视频',
    icon: 'play-start',
    name: 'video',
  },
  {
    text: '视界',
    icon: 'find',
    name: 'horizon',
  },
  {
    text: '小说',
    icon: 'horizontal-n',
    name: 'novel',
  },
  {
    text: '我的',
    icon: 'my',
    name: 'my',
  },
];
