<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import { MyContainer } from '.';
import { engineIcons } from '../assets/icons';

const visible = ref(false);
const searchValue = ref('');
const searchResult = ref([]);
const engineTapIdx = ref(-1);

const handleChangeEngine = () => {
  Taro.showActionSheet({ itemList: ['搜索大全', '百度', '谷歌', '搜狗'] }).then(({ tapIndex }) => {
    engineTapIdx.value = tapIndex;
  });
};

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

const handleToWebView = (state = '') => {
  Taro.navigateTo({ url: `../out/index?search=${state}` });
};
</script>

<template>
  <nut-input
    readonly
    clearable
    :border="false"
    class="home-search"
    left-icon="search2"
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
    <nut-searchbar
      v-model="searchValue"
      autofocus
      input-background="#efefef"
      style="padding: 0 14px"
      placeholder="搜索或输入网址"
    >
      <template #leftout>
        <nut-icon name="left" size="20" @click="visible = false" />
      </template>
      <template #leftin>
        <nut-icon v-if="engineTapIdx === 1" :name="engineIcons[1]" @click="handleChangeEngine" />
        <nut-icon
          v-else-if="engineTapIdx === 2"
          :name="engineIcons[2]"
          @click="handleChangeEngine"
        />
        <nut-icon
          v-else-if="engineTapIdx === 3"
          :name="engineIcons[3]"
          @click="handleChangeEngine"
        />
        <nut-icon v-else size="18" :name="engineIcons[0]" @click="handleChangeEngine" />
      </template>
      <template #rightin>
        <nut-icon name="microphone" @click="handleMicro" />
      </template>
    </nut-searchbar>

    <my-container class="home-search-view">
      <nut-cell-group v-if="searchResult.length">
        <nut-cell
          v-for="item in searchResult"
          :title="item"
          is-link
          @click="() => handleToWebView()"
        >
          <template #icon>
            <nut-icon name="search2" style="margin-right: 8px" />
          </template>
        </nut-cell>
      </nut-cell-group>

      <nut-cell
        v-show="searchValue"
        :title="`百度一下: ${searchValue}`"
        is-link
        @click="() => handleToWebView(searchValue)"
      >
        <template #icon>
          <img width="20px" height="20px" style="margin-right: 6px" :src="engineIcons[1]" />
        </template>
      </nut-cell>
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
