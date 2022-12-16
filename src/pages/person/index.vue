<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import { HomeContainer, UserAvatar } from '../../components';
import OptionsCard from './components/options-card.vue';

const commonlyUsed = [
  { text: '夜间模式', icon: 'marshalling', url: '' },
  { text: '退出无痕', icon: 'footprint', url: '' },
  { text: '网页无图', icon: 'image-error', url: '' },
  { text: '退出', icon: 'circle-close', url: '' },
];
const myService = [
  { text: '消息中心', icon: 'message', url: '' },
  { text: '我的小说', icon: 'date', url: '' },
  { text: '积分中心', icon: 'star', url: '' },
  { text: '我的游戏', icon: 'JIMI40', url: '' },
];
const easyLife = [
  { text: '彩票开奖', icon: 'order', url: '' },
  { text: '充值中心', icon: 'home', url: '' },
  { text: '热门活动', icon: 'shop', url: '' },
  { text: '垃圾清理', icon: 'del', url: '' },
  { text: '帮助反馈', icon: 'ask2', url: '' },
  { text: '借钱', icon: 'clock', url: '' },
  { text: '官方商城', icon: 'shop3', url: '' },
  { text: '游戏中心', icon: 'people', url: '' },
];

const userInfo = ref();
</script>

<template>
  <home-container class="person-view">
    <div class="person-setting">
      <nut-icon name="setting" />
    </div>
    <nut-row class="person-top">
      <nut-col span="20"><user-avatar name="Ryan" icon="my" desc="VIP4" /></nut-col>
      <nut-col span="4">
        <nut-button style="margin-top: 28px" color="#7232dd" size="small"> 签到 </nut-button>
      </nut-col>
    </nut-row>
    <nut-grid :border="false">
      <nut-grid-item text="书签">
        <template #icon>0</template>
      </nut-grid-item>
      <nut-grid-item text="历史">
        <template #icon>9</template>
      </nut-grid-item>
      <nut-grid-item text="下载">
        <template #icon>3</template>
      </nut-grid-item>
      <nut-grid-item text="关注">
        <template #icon>0</template>
      </nut-grid-item>
    </nut-grid>
    <options-card title="常用功能" :list="commonlyUsed" />
    <options-card title="我的服务" :list="myService" />
    <options-card title="便捷生活" :list="easyLife" />
  </home-container>
</template>

<style lang="less">
.person {
  &-view {
    height: 100% !important;
    padding: 90px 14px;
    .nut-grid-item__content {
      background-color: transparent;
    }
  }
  &-setting {
    width: 100%;
    text-align: right;
  }
  &-click-btn {
    margin-top: 28px;
  }
}
</style>
