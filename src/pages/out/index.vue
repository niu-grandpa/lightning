<script setup lang="ts">
import Taro from '@tarojs/taro';
const { search } = Taro.useRouter().params;
</script>

<template>
  <web-view :src="search" />
</template>

<style lang="less">
.pic-compose {
  display: flex;
  justify-content: space-between;
  .item {
    width: 47%;
  }
}
</style>
