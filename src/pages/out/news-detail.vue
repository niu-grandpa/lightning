<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import { type NewsListResult } from '../../assets/https';
import { NewsComment } from '../../components';

const { info } = Taro.getCurrentInstance().preloadData! as Record<string, NewsListResult>;
const like = ref(Math.round(Math.random() * 999));
</script>

<template>
  <nut-backtop :bottom="120">
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

        <nut-grid direction="horizontal" icon-size="20px" :border="false" :column-num="3">
          <nut-grid-item icon="https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico">
            <template #text>
              <button class="init-btn" open-type="share">微信</button>
            </template>
          </nut-grid-item>
          <nut-grid-item
            icon="https://img.ixintu.com/download/jpg/20210107/07bf0e16c47e727c023377b24ca29f70_512_512.jpg!bg"
          >
            <template #text>
              <button class="init-btn" open-type="share">朋友圈</button>
            </template>
          </nut-grid-item>
          <nut-grid-item icon="fabulous" :text="`${like}`" />
        </nut-grid>

        <news-comment />
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
