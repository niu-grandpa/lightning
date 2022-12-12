<script setup lang="ts">
import Taro from '@tarojs/taro';
import { type NewsListResult } from '../../assets/https';

const { info } = Taro.getCurrentInstance().preloadData! as Record<string, NewsListResult>;
</script>

<template>
  <nut-backtop>
    <template #content>
      <main class="detail">
        <h1 class="detail-title">{{ info.title }}</h1>
        <nut-row class="detail-src">
          <nut-col :span="4">
            <nut-avatar :icon="info.pic" />
          </nut-col>
          <nut-col :span="20">
            <p class="detail-src-name">{{ info.src }}</p>
            <p class="detail-src-time">{{ info.time }}</p>
          </nut-col>
        </nut-row>
        <section class="detail-content" v-html="info.content" />
      </main>
    </template>
  </nut-backtop>
</template>

<style lang="less">
.detail {
  padding: 16px;
  font-size: 18px;
  word-break: break-word;

  &-title {
    margin-top: 8px;
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 24px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.88);
  }

  &-src {
    margin: 21px 0;
    font-size: 17px;
    &-name {
      margin-bottom: 3px;
      font-weight: 600;
    }
    &-time {
      font-size: 12px;
      color: #8d8b8b;
    }
  }

  &-content {
    letter-spacing: 1px;
    .art_p {
      margin-bottom: 16px;
      line-height: 1.57;
    }
    .art_img_mini_img {
      width: 100%;
      height: 200px;
      margin-bottom: 16px;
      border-radius: 8px;
      object-fit: cover;
    }
    .article-editor {
      margin-bottom: 16px;
    }
  }
}
</style>
