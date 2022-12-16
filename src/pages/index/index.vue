<script setup lang="tsx">
import { ref, nextTick, onBeforeUnmount, computed } from 'vue';
import TabbarItem from '../../assets/tabbar-item';
import { HomeLogo } from '../../components';
import Home from '../home/index.vue';
import Horizon from '../horizon/index.vue';
import Novel from '../novel/index.vue';
import Video from '../video/index.vue';
import My from '../person/index.vue';

let timer: NodeJS.Timeout;

const showIndexImage = ref(false);
const currentTab = ref('home');

nextTick(() => {
  showIndexImage.value = true;
  timer = setTimeout(() => {
    showIndexImage.value = false;
  }, 2000);
});

onBeforeUnmount(() => clearTimeout(timer));

const App = computed(() => () => (
  <>
    {/**海报页 */}
    {showIndexImage.value && (
      <nut-popup
        destroy-on-close={false}
        visible={showIndexImage.value}
        duration='2'
        overlay={false}
        position='bottom'>
        <section class='index-welcome'>
          <figure class='index-welcome-figure'>
            <HomeLogo />
            <h1 class='index-welcome-title'>浏览器</h1>
            <p class='index-welcome-desc'>我如光速般穿梭</p>
          </figure>
        </section>
      </nut-popup>
    )}
    {/**组件页面 */}
    {!showIndexImage.value &&
      computed(() => [
        currentTab.value === 'home' && <Home />,
        currentTab.value === 'video' && <Video />,
        currentTab.value === 'horizon' && <Horizon />,
        currentTab.value === 'novel' && <Novel />,
        currentTab.value === 'my' && <My />,
      ]).value}
    {/**底部tab栏 */}
    <nut-tabbar vModel:visible={currentTab.value} bottom safeAreaInsetBottom activeColor='#1989fa'>
      {TabbarItem.map(({ text, name, icon }) => (
        <nut-tabbar-item tabTitle={text} {...{ name, icon }} key={name} />
      ))}
    </nut-tabbar>
  </>
));
</script>

<template>
  <App />
</template>

<style lang="less">
.index {
  &-welcome {
    width: 100%;
    height: 100vh;
    &-figure {
      margin-top: 50%;
      text-align: center;
    }
    &-title {
      margin-top: 8px;
      margin-bottom: 4px;
      font-size: 28px;
    }
    &-desc {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
