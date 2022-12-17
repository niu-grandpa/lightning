<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { HomeContainer, HomeResult } from '../../components';
import { useSearchCartoon } from '../../assets/hooks';
import { CartoonReturnType } from '../../assets/https';
import Taro from '@tarojs/taro';

type OptionType = 'title' | 'author' | 'comicType';

const comicOptions = [
  { text: '默认', value: '默认' },
  { text: '校园', value: '校园' },
  { text: '搞笑', value: '恋爱' },
  { text: '恋爱', value: '恋爱' },
  { text: '仙侠', value: '仙侠' },
  { text: '玄幻', value: '玄幻' },
  { text: '冒险', value: '冒险' },
  { text: '竞技', value: '竞技' },
  { text: '奇幻', value: '奇幻' },
  { text: '科幻', value: '科幻' },
  { text: '惊悚', value: '惊悚' },
  { text: '少年', value: '少年' },
  { text: '历史', value: '历史' },
  { text: '悬疑', value: '悬疑' },
  { text: '生活', value: '生活' },
];

const page = ref(1);
const error = ref(false);
const searchValue = ref('');
const optionType = ref<OptionType>('comicType');
const changeType = ref<'push' | 'clear'>('push');
const defaultComicType = ref('默认');
const cartoonList = ref<CartoonReturnType[]>([]);

const comicType = computed(() =>
  defaultComicType.value === '默认' ? '玄幻' : defaultComicType.value
);
const word = computed(() => comicType.value || searchValue.value);

const getList = (page = 1) => {
  useSearchCartoon(
    { type: optionType.value, word: word.value, page },
    res => {
      if (changeType.value === 'push') {
        cartoonList.value.push(...res);
      } else {
        cartoonList.value = res;
      }
      error.value && (error.value = false);
    },
    () => (error.value = true)
  );
};

const initData = (option: OptionType) => {
  optionType.value = option;
  changeType.value = 'clear';
  page.value > 1 && (page.value = 1);
};

const handleChange = () => {
  initData('comicType');
  getList(page.value);
};

const handleSearch = () => {
  initData('title');
  getList(page.value);
  searchValue.value = '';
};

const handleLoadMore = () => {
  page.value++;
  changeType.value = 'push';
  getList(page.value);
};

const handleToNext = (cartoonId: string) => {
  Taro.navigateTo({
    url: `../views/cartoon/catalog/index?cartoonId=${cartoonId}`,
  });
};

onMounted(() => {
  handleChange();
});
</script>

<template>
  <home-container :scroll-y="true" class="cartoon-view">
    <h1>免费漫画</h1>
    <nut-row>
      <nut-col :span="5">
        <nut-menu>
          <nut-menu-item
            v-model="defaultComicType"
            :cols="6"
            :options="comicOptions"
            active-color="#1989FA"
            @change="handleChange"
          />
        </nut-menu>
      </nut-col>
      <nut-col :span="19">
        <nut-searchbar
          v-model="searchValue"
          background="#fcfcfc"
          placeholder="输入漫画名搜索"
          @search="handleSearch"
        >
          <template v-slot:leftin>
            <nut-icon size="14" name="search2" />
          </template>
        </nut-searchbar>
      </nut-col>
    </nut-row>

    <home-result :loading="!cartoonList.length" :error="error">
      <nut-grid :gutter="5" :column-num="3" style="margin-top: 16px">
        <nut-grid-item
          v-for="item in cartoonList"
          :key="item.comicId"
          @click="() => handleToNext(item.comicId)"
        >
          <image class="cartoon-img" :src="item.cover" />
          <p class="cartoon-desc">{{ item.descs }}</p>
          <p class="cartoon-name">{{ item.author }}</p>
        </nut-grid-item>
      </nut-grid>
      <nut-button block style="margin: 12px 0" @click="handleLoadMore">加载更多</nut-button>
    </home-result>
  </home-container>
</template>

<style lang="less">
.cartoon {
  &-view {
    height: 100% !important;
    padding: 90px 14px;
    .nut-menu .nut-menu__bar {
      background-color: #fcfcfc;
      box-shadow: none;
    }
    .nut-menu-item__content .nut-menu-item__option .h5-i {
      display: none;
    }
    .nut-grid-item__content {
      padding: 0;
      border-radius: 6px 6px 0 0;
    }
  }
  &-img {
    width: 100px;
    height: 120px;
    border-radius: 6px 6px 0 0;
  }
  &-desc {
    max-width: 78px;
    padding-right: 12px;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 8px 0;
  }
  &-name {
    padding-right: 45px;
    margin-bottom: 4px;
    font-size: 10px;
    color: #ccc;
  }
}
</style>
