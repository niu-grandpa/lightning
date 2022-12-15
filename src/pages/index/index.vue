<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount, onBeforeMount, computed } from 'vue';
import TabbarItem, { type TabbarItemObj } from '../../assets/tabbar-item';
import { HomeLogo } from '../../components';

type AsyncCompsType = { [x: string]: TabbarItemObj['component'] };

let timer: NodeJS.Timeout;

const asyncComps = computed<AsyncCompsType>(() => ({}));

const showIndexImage = ref(false);
const currentTab = ref('home');

onBeforeMount(() => {
  // 建立组件对象，tabs name 映射对应组件
  TabbarItem.forEach(({ name, component }) => {
    asyncComps.value[name] = component;
  });
});

nextTick(() => {
  showIndexImage.value = true;
  timer = setTimeout(() => {
    showIndexImage.value = false;
  }, 2000);
});

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <nut-popup
    v-if="showIndexImage"
    duration="2"
    :overlay="false"
    position="bottom"
    v-model:visible="showIndexImage"
  >
    <section class="index-welcome">
      <figure class="index-welcome-figure">
        <home-logo />
        <h1 class="index-welcome-title">浏览器</h1>
        <p class="index-welcome-desc">我如光速般穿梭</p>
      </figure>
    </section>
  </nut-popup>

  <template v-if="!showIndexImage">
    <Suspense><component :is="asyncComps[currentTab]" /></Suspense>
  </template>

  <nut-tabbar v-model:visible="currentTab" bottom safeAreaInsetBottom active-color="#1989fa">
    <nut-tabbar-item
      v-for="item in TabbarItem"
      :tab-title="item.text"
      :name="item.name"
      :icon="item.icon"
      :key="item.name"
    />
  </nut-tabbar>
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
