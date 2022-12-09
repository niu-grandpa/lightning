<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import { MyContainer } from '.';

const visible = ref(false);
const searchValue = ref('');
const searchResult = ref([]);

const handleMicro = () => {
  Taro.showToast({ title: '尽请期待' });
};

const handleScan = () => {
  Taro.scanCode({}).then(res => {
    Taro.showToast({
      title: JSON.stringify(res.result),
    });
  });
};

const handleToWebView = () => {
  Taro.navigateTo({ url: '../out/index' });
};
</script>

<template>
  <nut-input
    readonly
    clearable
    :border="false"
    class="home-search"
    left-icon="search"
    @click-input="visible = true"
    placeholder="搜索或输入网址"
  >
    <template #button>
      <nut-icon name="microphone" @click="handleMicro" style="margin-right: 16px" />
      <nut-icon name="scan2" @click="handleScan" />
    </template>
  </nut-input>

  <nut-popup
    style="width: 100%"
    :overlay="false"
    v-model:visible="visible"
    class="home-search-view"
  >
    <my-container v-if="visible" class="home-search-view">
      <nut-searchbar
        v-model="searchValue"
        autofocus
        input-background="#efefef"
        style="padding: 0"
        placeholder="搜索或输入网址"
      >
        <template #leftout>
          <nut-icon name="left" size="20" @click="visible = false" />
        </template>
        <template #leftin>
          <nut-icon size="16" name="search2" />
        </template>
        <template #rightin>
          <nut-icon name="microphone" @click="handleMicro" />
        </template>
      </nut-searchbar>

      <nut-cell-group v-if="searchResult.length">
        <nut-cell v-for="item in searchResult" title="" is-link @click="handleToWebView">
          <template #icon>
            <nut-icon name="search2" style="margin-right: 8px" />
          </template>
        </nut-cell>
      </nut-cell-group>
    </my-container>
  </nut-popup>
</template>

<style lang="less">
.home-search {
  border: 2px solid #666;
  border-radius: 20px;
  .nut-icon {
    border: none;
  }
  &-view {
    .nut-searchbar {
      background: transparent;
      &__search-input {
        height: 43px;
        margin-right: 6px;
        border-radius: 40px;
        box-shadow: none;
      }
    }
  }
}
</style>
