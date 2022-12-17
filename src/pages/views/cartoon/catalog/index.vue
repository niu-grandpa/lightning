<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import { HomeContainer, HomeResult } from '../../../../components';
import { useCartoonChapter } from '../../../../assets/hooks';
import { type CartoonChapterReturnType } from '../../../../assets/https';

const { cartoonId } = Taro.getCurrentInstance().router?.params!;

const error = ref(false);
const data = ref<CartoonChapterReturnType>();

useCartoonChapter(cartoonId!, res => {
  data.value = res;
});
</script>

<template>
  <home-container class="cartoon-catalog">
    <home-result :loading="!data" :error="error">
      <section class="cartoon-catalog-top">
        <image :src="data!.cover" class="cartoon-catalog-cover" />
        <nut-icon class="cartoon-catalog-arrow" name="left" size="26" color="#fff" />
        <section class="cartoon-catalog-title">
          <p class="title">{{ data?.title }}</p>
          <p>{{ data?.author }}</p>
        </section>
      </section>
      <nut-row>
        <nut-col :span="10"> 2 </nut-col>
        <nut-col :span="14">3</nut-col>
      </nut-row>
    </home-result>
  </home-container>
</template>

<style lang="less">
.cartoon-catalog {
  &-top {
    position: relative;
  }
  &-arrow,
  &-title {
    position: absolute;
    left: 16px;
  }
  &-arrow {
    top: 55px;
  }
  &-cover {
    width: 100%;
    height: 300px;
  }
  &-title {
    bottom: 18px;
    font-size: 14px;
    color: #fff;
    .title {
      margin-bottom: 6px;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
