<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref, nextTick, onBeforeUnmount } from 'vue';
import background from '../../../public/index.png';

let timer: NodeJS.Timeout;
const showMainImage = ref(false);

nextTick(handleShowMainImage);

onBeforeUnmount(() => {
  clearTimeout(timer);
});

function handleShowMainImage() {
  showMainImage.value = true;
  timer = setTimeout(() => {
    showMainImage.value = false;
  }, 2000);
}
</script>

<template>
  <nut-popup duration="2" :overlay="false" position="bottom" v-model:visible="showMainImage">
    <section class="index-background">
      <img class="index-background-img" :src="background" alt="background-image" />
    </section>
  </nut-popup>
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
