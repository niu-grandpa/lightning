<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref, watchEffect } from 'vue';
import { HomeContainer } from '.';
import { engineIcons } from '../assets/icons';
import {
  getSMSearchKeywords,
  getBaiduSearchKeywords,
  getBingSearchKeywords,
} from '../assets/https';

const engineObj = {
  zh: ['神马', '百度', '必应'],
  en: ['shenma', 'baidu', 'bing'],
  methods: [getSMSearchKeywords, getBaiduSearchKeywords, getBingSearchKeywords],
};

defineProps<{ fixed?: boolean }>();

const visible = ref(false);
const searchValue = ref('');
const isRespond = ref(false);
const searchList = ref<string[]>([]);
const engineIdx = ref(0);

const setIsRespond = (v: boolean) => (isRespond.value = v);
const clearList = () => searchList.value.length && (searchList.value.length = 0);

const initData = () => {
  if (visible.value) return;
  clearList();
  engineIdx.value = 0;
  searchValue.value = '';
  setIsRespond(false);
};

const handleSearch = () => {
  initData();
  if (!searchValue.value) {
    clearList();
    setIsRespond(false);
    return;
  }
  requset().then(() => setIsRespond(false));
};

const requset = async () => {
  setIsRespond(true);
  const searchApi = engineObj.methods[engineIdx.value];
  const data = await searchApi(searchValue.value);
  clearList();
  searchList.value.push(...data);
};

watchEffect(() => {
  handleSearch();
});

const handleChangeEngine = () => {
  Taro.showActionSheet({ itemList: engineObj.zh }).then(({ tapIndex }) => {
    engineIdx.value = tapIndex;
    searchList.value.length = 0;
    handleSearch();
  });
};

const handleToWebView = (state: string, idx = 0) => {
  Taro.navigateTo({ url: `../out/index?search=${state}&engine=${engineObj.en[idx]}` });
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
</script>

<template>
  <nut-input
    readonly
    clearable
    :border="false"
    class="home-search"
    :class="{ 'home-search-fixed': $props.fixed }"
    :left-icon="!$props.fixed ? 'search2' : ''"
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
    position="right"
  >
    <nut-searchbar
      v-model="searchValue"
      autofocus
      input-background="#efefef"
      style="padding: 95px 14px 0"
      placeholder="搜索或输入网址"
      @search="() => handleToWebView(searchValue, engineIdx)"
    >
      <template #leftout>
        <nut-icon name="left" size="20" @click="visible = false" />
      </template>
      <template #leftin>
        <nut-icon v-if="engineIdx === 1" :name="engineIcons[1]" @click="handleChangeEngine" />
        <nut-icon v-else-if="engineIdx === 2" :name="engineIcons[2]" @click="handleChangeEngine" />
        <nut-icon v-else size="18" :name="engineIcons[0]" @click="handleChangeEngine" />
      </template>
      <template #rightin>
        <nut-icon name="microphone" @click="handleMicro" />
      </template>
    </nut-searchbar>

    <home-container class="home-search-view">
      <nut-skeleton
        width="320px"
        height="18px"
        style="margin-top: 25px; margin-left: 25px"
        animated
        row="3"
        :loading="isRespond"
      >
        <nut-cell-group>
          <nut-cell
            v-for="word in searchList"
            :title="word"
            :key="word"
            is-link
            @click="() => handleToWebView(word, engineIdx)"
          >
            <template #icon>
              <nut-icon name="search2" style="margin-right: 8px" />
            </template>
          </nut-cell>
        </nut-cell-group>
      </nut-skeleton>

      <nut-cell
        v-show="searchValue"
        :title="`百度一下: ${searchValue}`"
        is-link
        @click="() => handleToWebView(searchValue, 1)"
      >
        <template #icon>
          <img width="20px" height="20px" style="margin-right: 6px" :src="engineIcons[1]" />
        </template>
      </nut-cell>
    </home-container>
  </nut-popup>
</template>

<style lang="less">
.home-search {
  border: 2px solid #d3d3d3;
  border-radius: 40px;
  transition: all 0.2s;
  .nut-icon {
    border: none;
  }
  &-view {
    position: fixed;
    z-index: 9999;
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
  &-fixed {
    width: 74%;
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 999;
  }
}
</style>
