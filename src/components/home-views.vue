<script setup lang="ts">
import { ref, defineAsyncComponent, onBeforeUnmount, computed } from 'vue';

const LightHome = defineAsyncComponent(() => import('../pages/home/index.vue'));
const LighPerson = defineAsyncComponent(() => import('../pages/person/index.vue'));
const LightNovel = defineAsyncComponent(() => import('../pages/novel/index.vue'));
const LightHorizon = defineAsyncComponent(() => import('../pages/horizon/index.vue'));

const delay = ref(false);
const timer = setTimeout(() => {
  delay.value = true;
}, 2000);
onBeforeUnmount(() => clearTimeout(timer));

const current = ref('home');
const compsObj = computed(() => ({
  home: LightHome,
  horizon: LightHorizon,
  novel: LightNovel,
  person: LighPerson,
}));
</script>

<template>
  <component v-if="delay" :is="compsObj[current]" />
  <nut-tabbar v-model:visible="current" bottom safeAreaInsetBottom active-color="#1989fa">
    <nut-tabbar-item tab-title="首页" name="home" icon="home" />
    <nut-tabbar-item tab-title="视界" name="horizon" icon="find" />
    <nut-tabbar-item tab-title="小说" name="novel" icon="horizontal-n" />
    <nut-tabbar-item tab-title="我的" name="person" icon="my" />
  </nut-tabbar>
</template>
