<script setup lang="ts">
import { ref, onMounted, reactive, watchEffect } from 'vue';
import { HomeSearchView, HomeResult, MyContainer } from '../../components';
import { useGetNewsList } from '../../assets/hooks';
import { NewsCategory, type NewsListResult } from '../../assets/https';
import Taro from '@tarojs/taro';

type NewsListType = {
  [x: string]: {
    start: number;
    result: NewsListResult[];
  };
};

const error = ref(false);
const loading = ref(true);
const isFixedInput = ref(false);
const refreshHasMore = ref(true);

const tabTitle = ref<{ title: string; key: string }[]>([]);
const tabChannel = ref('HOTSPOT');
const newsList = reactive<NewsListType>({});
const newsDetailInfo = ref<NewsListResult | {}>({});

const loadList = useGetNewsList(
  ({ list, success }) => {
    error.value = !success;
    loading.value = !success;
    newsList[tabChannel.value].result = list;
  },
  () => (error.value = true)
);

const updateList = (channel?: string) => {
  tabChannel.value = channel || tabChannel.value;
  let { start } = newsList[tabChannel.value];
  newsList[tabChannel.value].start = ++start;
  loadList({ channel: NewsCategory[tabChannel.value], start, num: 5 });
};

const initData = () => {
  Object.keys(NewsCategory).forEach(key => {
    const title = NewsCategory[key];
    tabTitle.value.push({ title, key });
    newsList[key] = { start: 0, result: [] };
  });
  updateList();
};

const goToDetailPage = () => {
  if (!Object.keys(newsDetailInfo.value).length) return;
  Taro.preload({ info: newsDetailInfo.value });
  Taro.navigateTo({
    url: '../out/news-detail',
  });
  newsDetailInfo.value = {};
};

const handleTabs = ({ paneKey }) => updateList(paneKey);

const refreshLoadMore = (done: () => void) => {};

const refresh = (done: () => void) => {};
const init = () => {};

const handleScroll = ({ detail }) => {
  isFixedInput.value = detail.scrollTop >= 198;
};

onMounted(() => {
  initData();
});
watchEffect(() => {
  goToDetailPage();
});
</script>

<template>
  <my-container :scroll-y="true" @scroll="handleScroll">
    <nut-row>
      <nut-col :span="24" class="home-top">
        <home-search-view :fixed="isFixedInput" />
      </nut-col>

      <nut-col :span="24" class="home-bottom">
        <home-result :loading="loading" :error="error" @on-button-click="loadList" />

        <nut-tabs
          v-if="tabTitle.length && !loading && !error"
          v-model="tabChannel"
          title-scroll
          background="#fcfcfc"
          size="large"
          @click="handleTabs"
        >
          <nut-tabpane
            v-for="item in tabTitle"
            :title="item.title"
            :pane-key="item.key"
            style="padding: 0; background: #fcfcfc"
          >
            <nut-cell v-show="tabChannel === 'HOTSPOT'" style="flex-direction: column">
              <nut-row
                style="margin: 5px 0"
                v-for="item in newsList[tabChannel].result"
                :key="item.title"
                @click="() => (newsDetailInfo = item)"
              >
                <nut-col :span="3">
                  <nut-tag style="height: 16px" type="danger">置顶</nut-tag>
                </nut-col>
                <nut-col :span="21">
                  <span class="home-bottom-hot-title">{{ item.title }}</span>
                </nut-col>
              </nut-row>
            </nut-cell>
          </nut-tabpane>
        </nut-tabs>

        <ul id="refreshScroll" style="height: 700px">
          <nut-infiniteloading
            pull-icon="more-x"
            container-id="refreshScroll"
            :use-window="false"
            :is-open-refresh="true"
            :has-more="refreshHasMore"
            @load-more="refreshLoadMore"
            @refresh="refresh"
          >
            <li v-for="i in 5" :key="i">
              {{ i }}
            </li>
          </nut-infiniteloading>
        </ul>
      </nut-col>
    </nut-row>
  </my-container>
</template>

<style lang="less">
.home {
  &-top {
    height: 200px;
    padding-top: 28%;
    padding-left: 14px !important;
    padding-right: 14px !important;
    background-image: url(https://img.ixintu.com/download/jpg/202004/dc8c7c7e59b1c72c6bb4abdd17b92f15_800_399.jpg!con);
    background-position: left;
  }
  &-bottom {
    padding: 14px !important;
    &-hot-title {
      max-width: 275px;
      line-height: 21px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
