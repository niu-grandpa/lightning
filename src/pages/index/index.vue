<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount, onBeforeMount, shallowRef } from 'vue';
import TabbarItem, { type TabbarItemObj } from '../../assets/tabbar-item';
import background from '../../../public/index.png';

let timer: NodeJS.Timeout;

const asyncComps = shallowRef<Record<string, TabbarItemObj['component']>>({});
const showIndexImage = ref(false);
const currentTab = ref('home');

onBeforeMount(() => {
  TabbarItem.forEach(({ name, component }) => {
    asyncComps.value[name] = component;
  });
});

onBeforeUnmount(() => clearTimeout(timer));

nextTick(() => {
  showIndexImage.value = true;
  timer = setTimeout(() => {
    showIndexImage.value = false;
  }, 2000);
});
</script>

<template>
  <nut-popup
    v-if="showIndexImage"
    duration="2"
    :overlay="false"
    position="bottom"
    v-model:visible="showIndexImage"
  >
    <section class="index-background">
      <image class="index-background-img" :src="background" />
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
  &-background {
    width: 100%;
    height: 100vh;
    &-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
