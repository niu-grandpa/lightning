<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount, defineAsyncComponent, computed } from 'vue';
import { MyContainer } from '../../components';
import background from '../../../public/index.png';

let timer: NodeJS.Timeout;

const asyncComps = computed(() => ({
  home: defineAsyncComponent(() => import('../home/index.vue')),
  horizon: defineAsyncComponent(() => import('../person/index.vue')),
  novel: defineAsyncComponent(() => import('../novel/index.vue')),
  person: defineAsyncComponent(() => import('../horizon/index.vue')),
}));

const showIndexImage = ref(false);
const currentTab = ref('home');

nextTick(() => {
  showIndexImage.value = true;
  timer = setTimeout(() => {
    showIndexImage.value = false;
  }, 2000);
});

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <nut-popup duration="2" :overlay="false" position="bottom" v-model:visible="showIndexImage">
    <section class="index-background">
      <img class="index-background-img" :src="background" alt="background-image" />
    </section>
  </nut-popup>

  <my-container>
    <component v-if="!showIndexImage" :is="asyncComps[currentTab]" />
  </my-container>

  <nut-tabbar v-model:visible="currentTab" bottom safeAreaInsetBottom active-color="#1989fa">
    <nut-tabbar-item tab-title="首页" name="home" icon="home" />
    <nut-tabbar-item tab-title="视界" name="horizon" icon="find" />
    <nut-tabbar-item tab-title="小说" name="novel" icon="horizontal-n" />
    <nut-tabbar-item tab-title="我的" name="person" icon="my" />
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
      object-fit: cover;
    }
  }
}
</style>
