<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue';
import { HomeViews } from '../../components';
import background from '../../../public/index.png';

const showMainImage = ref(false);

let timer: NodeJS.Timeout;
nextTick(() => {
  showMainImage.value = true;
  timer = setTimeout(() => {
    showMainImage.value = false;
  }, 2000);
});

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <nut-popup duration="2" :overlay="false" position="bottom" v-model:visible="showMainImage">
    <section class="index-background">
      <img class="index-background-img" :src="background" alt="background-image" />
    </section>
  </nut-popup>
  <home-views />
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
