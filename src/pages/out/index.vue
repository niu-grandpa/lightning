<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref } from 'vue';

// 设置为通过路由传参过来的第三方链接
const src = ref('');
</script>

<template>
  <web-view :src="src" />
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
