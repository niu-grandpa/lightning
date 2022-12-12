<script setup lang="ts">
import { ref, onMounted, reactive, watchEffect } from 'vue';
import { HomeSearchView, HomeResult, MyContainer, ReloadButton } from '../../components';
import { useGetNewsList } from '../../assets/hooks';
import { NewsCategory, type NewsListResult } from '../../assets/https';
import Taro from '@tarojs/taro';

type NewsListType = {
  [x: string]: {
    start: number;
    result: NewsListResult[];
  };
};

const HOTSPOT = 'HOTSPOT';

const error = ref(false);
const loading = ref(true);
const isFixedInput = ref(false);
const refreshHasMore = ref(true);
const tabTitle = ref<{ title: string; key: string }[]>([]);
const tabChannel = ref('NEWS');
const newsList = reactive<NewsListType>({});
const newsDetailInfo = ref<NewsListResult | {}>({});

const isGetNews = () => tabChannel.value === 'NEWS';
const handleTabs = ({ paneKey }) => updateList(paneKey);
const handleScroll = ({ detail }) => (isFixedInput.value = detail.scrollTop >= 198);

const initData = () => {
  Object.keys(NewsCategory).forEach(key => {
    const title = NewsCategory[key];
    if (title !== NewsCategory[HOTSPOT]) {
      tabTitle.value.push({ title: title === '新闻' ? '推荐' : title, key });
    }
    newsList[key] = { start: -1, result: [] };
  });
  updateList();
};

const updateList = (channel?: string) => {
  tabChannel.value = channel || tabChannel.value;

  let { start } = newsList[tabChannel.value];
  start++;

  newsList[tabChannel.value].start = start;
  // 当获取新闻频道数据的同时获取"头条"数据
  if (isGetNews()) {
    newsList[HOTSPOT].start = start;
    loadList({ channel: NewsCategory[HOTSPOT], start, num: 5 });
  }

  loadList({ channel: NewsCategory[tabChannel.value], start, num: 5 });
};

const loadList = useGetNewsList(
  ({ list, success }) => {
    error.value = !success;
    loading.value = !success;
    newsList[tabChannel.value].result = list;
    isGetNews() && (newsList[HOTSPOT].result = list);
  },
  () => (error.value = true)
);

const refreshLoadMore = (done: () => void) => {};

const goToDetailPage = () => {
  if (!Object.keys(newsDetailInfo.value).length) return;
  Taro.preload({ info: newsDetailInfo.value });
  Taro.navigateTo({
    url: '../out/news-detail',
  });
  newsDetailInfo.value = {};
};

onMounted(() => {
  initData();
});

watchEffect(() => {
  goToDetailPage();
});
</script>

<template>
  <reload-button v-show="isFixedInput" />

  <my-container :scroll-y="true" @scroll="handleScroll">
    <nut-row>
      <nut-col :span="24" class="home-top">
        <home-search-view :fixed="isFixedInput" />
      </nut-col>

      <nut-col :span="24" class="home-bottom">
        <home-result :loading="loading" :error="error" @on-button-click="updateList" />

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
            id="refreshScroll"
            class="home-bottom-content"
          >
            <nut-infiniteloading
              pull-icon="more-x"
              container-id="refreshScroll"
              :use-window="false"
              :has-more="refreshHasMore"
              @load-more="refreshLoadMore"
            >
              <nut-cell
                v-show="newsList[HOTSPOT].result.length && isGetNews()"
                style="flex-direction: column"
              >
                <nut-row
                  v-for="item in newsList[HOTSPOT].result"
                  :key="item.title"
                  @click="() => (newsDetailInfo = item)"
                  style="margin: 6px 0"
                >
                  <nut-col :span="3">
                    <nut-tag style="height: 16px" type="danger">置顶</nut-tag>
                  </nut-col>
                  <nut-col :span="21">
                    <span class="home-bottom-hot-title">{{ item.title }}</span>
                  </nut-col>
                </nut-row>
              </nut-cell>

              <nut-cell-group>
                <nut-cell v-for="i in 30" :key="i">
                  {{ i }}
                </nut-cell>
              </nut-cell-group>
            </nut-infiniteloading>
          </nut-tabpane>
        </nut-tabs>
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
    &-content {
      height: calc(100vh - 142px);
      padding: 0;
      background: #fcfcfc;
    }
  }
}
</style>
