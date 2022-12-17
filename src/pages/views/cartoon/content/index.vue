<script setup lang="ts">
import Taro from '@tarojs/taro';
import { computed, onMounted, ref } from 'vue';
import { HomeContainer } from '../../../../components';
import { type CartoonChapterReturnType } from '../../../../assets/https';
import { useCartoonContent } from '../../../../assets/hooks';

const { data } = Taro.getCurrentInstance().preloadData as Record<string, CartoonChapterReturnType>;

const list = ref<string[]>([]);
const visible = ref(false);

onMounted(() => {
  Taro.hideShareMenu();
});

const handleSee = (chapterId: string) => {
  visible.value = true;
  useCartoonContent(chapterId, res => {
    list.value = res;
  });
};
</script>

<template>
  <nut-row class="cartoon-content-top">
    <nut-col :span="20">共{{ data.chapterList.length }}话</nut-col>
    <nut-col :span="4"> </nut-col>
  </nut-row>

  <home-container :scroll-y="true">
    <nut-cell-group>
      <nut-cell
        v-for="(item, i) in data.chapterList"
        :key="item.chapterId"
        :title="`${i + 1} - ${item.title}`"
        desc="免费"
        @click="() => handleSee(item.chapterId)"
      />
    </nut-cell-group>
  </home-container>

  <nut-popup v-model:visible="visible" position="left" style="width: 100%">
    <home-container :scroll-y="true">
      <template v-for="src in list" :key="src">
        <image style="width: 100%" :src="src" />
      </template>
    </home-container>
  </nut-popup>
</template>

<style lang="less">
.cartoon-content {
  &-top {
    padding: 14px;
    font-size: 14px;
  }
}
</style>
