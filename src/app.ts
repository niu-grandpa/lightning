import { createApp } from 'vue';
import { Button, Toast } from '@nutui/nutui-taro';

import './app.less';
import { usePlugins } from './hooks';

const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

usePlugins(App, [Button, Toast]);

export default App;
