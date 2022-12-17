<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { HomeContainer, HomeSearchbar, ReloadButton } from '../../components';
import { type VideoReturnType } from '../../assets/https';
import { useShortVideo } from '../../assets/hooks';

const source = ref<VideoReturnType[]>([]);
const page = ref(5);

const update = () => {
  useShortVideo(page.value, res => {
    source.value = res;
    console.log('视频数据', source.value);
  });
};

onMounted(() => {
  update();
});

watchEffect(() => {
  if (page.value > 5) {
    update();
  }
});
</script>

<template>
  <reload-button @click="() => (page += 5)" />
  <home-container :scorll-y="true" class="video-container">
    <home-searchbar />
    <nut-cell class="video-cell" v-if="source.length" v-for="item in source" :key="item.id">
      <template #title>
        <video
          :muted="true"
          :controls="true"
          play-btn-position="center"
          class="video-cell-item"
          :src="item.playUrl"
          :title="item.title"
          :loop="false"
          objectFit="cover"
          :direction="-90"
          :initial-time="0"
          :autoplay="false"
          mobilenet-hint-type="2"
        />
        <p class="video-cell-item-desc">{{ item.title }}</p>
        <nut-row class="video-cell-item-info">
          <nut-col :span="3">
            <nut-avatar icon="my" size="small" />
          </nut-col>
          <nut-col :span="16">{{ item.userName }}</nut-col>
          <nut-col :span="5" style="display: flex; align-items: center">
            <nut-icon name="comment" />
            <text style="margin: 0 5px; font-size: 12px">27</text>
            <nut-icon name="more-s" />
          </nut-col>
        </nut-row>
      </template>
    </nut-cell>
  </home-container>
</template>

<style lang="less">
.video {
  &-container {
    height: 100% !important;
    padding: 90px 14px;
  }
  &-cell {
    margin: 35px 0;
    padding: 0;
    &-item {
      width: 100%;
      height: 190px;
      margin-bottom: 5px;
      border-radius: 22px 22px 0 0;
      &-desc,
      &-info {
        padding: 8px 12px;
        background: #fff;
        box-sizing: border-box;
      }
      &-desc {
        font-size: 16px;
      }
      &-info {
        line-height: 14px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
