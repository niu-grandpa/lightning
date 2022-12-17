<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref, onMounted, reactive, computed } from 'vue';
import { HomeSearchbar, HomeResult, HomeContainer, ReloadButton } from '../../components';
import NewsCard from './components/news-card.vue';
import HomeWeather from './components/home-weather.vue';
import { useGetNewsList } from '../../assets/hooks';
import { NewsCategory, type NewsListResult } from '../../assets/https';

type NewsListType = {
  [x: string]: {
    start: number;
    result: NewsListResult[];
  };
};

const HOTSPOT = 'HOTSPOT';

const collectIndexMap = reactive<NewsListType>({});

const hotspotList = computed(() => collectIndexMap[HOTSPOT]);
const otherList = computed(() => collectIndexMap[tabChannel.value]);

const error = ref(false);
const loading = ref(true);
const isFixedInput = ref(false);

const tabTitle = ref<{ title: string; key: string }[]>([]);
const tabChannel = ref('NEWS');
const updateAction = ref<'push' | 'clear'>('clear');

const isNewsChannel = () => tabChannel.value === 'NEWS';

const handleTabs = ({ paneKey }) => {
  updateAction.value = 'clear';
  updateNewsList(paneKey);
};
const handleScroll = ({ detail }) => (isFixedInput.value = detail.scrollTop >= 180);

const handleReload = () => {
  updateAction.value = 'push';
  updateNewsList(tabChannel.value);
};

const initData = () => {
  Object.keys(NewsCategory).forEach(key => {
    const title = NewsCategory[key];
    if (title !== NewsCategory[HOTSPOT]) {
      tabTitle.value.push({ title: title === '新闻' ? '推荐' : title, key });
    }
    collectIndexMap[key] = { start: -5, result: [] };
  });
  updateNewsList();
};

const updateNewsList = (channel = tabChannel.value) => {
  tabChannel.value !== channel && (tabChannel.value = channel);

  const loadList = useGetNewsList(
    res => requsetCallback(res, channel),
    () => (error.value = true)
  );

  let num = 5;
  let { start } = otherList.value;

  start += num;

  // 当获取新闻频道数据的同时获取"头条"数据
  if (isNewsChannel()) {
    hotspotList.value.start = start;
    const hotspot = useGetNewsList(
      res => requsetCallback(res, HOTSPOT),
      () => (error.value = true)
    );
    hotspot({ channel: NewsCategory[HOTSPOT], start, num });
  }
  otherList.value.start = start;

  loadList({
    channel: NewsCategory[channel],
    start,
    num: 5,
  });
};

const requsetCallback = ({ list, success }, channel = tabChannel.value) => {
  if (updateAction.value === 'push' && channel !== HOTSPOT) {
    (list as NewsListResult[]).forEach(item => {
      if (otherList.value.result.includes(item)) return;
      otherList.value.result.push(item);
    });
  } else if (channel === HOTSPOT || updateAction.value === 'clear') {
    collectIndexMap[channel].result = list;
  }
  error.value = !success;
  loading.value = !success;

  console.log('[useGetNewsList] 新闻频道: ', channel, '\n新闻索引表: ', collectIndexMap);
};

const goToDetailPage = (data: NewsListResult) => {
  if (!Object.keys(data).length) return;
  Taro.preload({ info: data });
  Taro.navigateTo({
    url: '../views/home/news-detail',
  });
};

onMounted(() => {
  initData();
});
</script>

<template>
  <reload-button v-show="isFixedInput" @click="handleReload" />
  <home-container :scroll-y="true" @scroll="handleScroll">
    <nut-row>
      <!-- 天气展示 -->
      <nut-col :span="24" class="home-top">
        <home-weather />
        <!-- 搜索框 -->
        <home-searchbar :fixed="isFixedInput" />
      </nut-col>
      <!-- 新闻tab页面 -->
      <nut-col :span="24" class="home-bottom">
        <home-result :loading="loading" :error="error" @on-button-click="updateNewsList" />
        <nut-tabs
          v-if="tabTitle.length && !loading && !error"
          v-model="tabChannel"
          title-scroll
          background="#fcfcfc"
          size="large"
          @click="handleTabs"
        >
          <nut-tabpane
            v-for="titles in tabTitle"
            :title="titles.title"
            :pane-key="titles.key"
            class="home-bottom-content"
          >
            <!-- 头条新闻 -->
            <nut-cell v-if="isNewsChannel()" style="flex-direction: column">
              <nut-skeleton :loading="false" row="5" width="300px" height="15px">
                <nut-row
                  v-for="hot in hotspotList.result"
                  :key="hot.content"
                  @click="() => goToDetailPage(hot)"
                  style="margin: 6px 0"
                >
                  <nut-col :span="3">
                    <nut-tag style="height: 16px" type="danger">置顶</nut-tag>
                  </nut-col>
                  <nut-col :span="21">
                    <span class="home-bottom-hot-title">{{ hot.title }}</span>
                  </nut-col>
                </nut-row>
              </nut-skeleton>
            </nut-cell>
            <!-- 其他新闻 -->
            <nut-cell-group>
              <nut-cell
                v-for="data in otherList.result"
                :key="data.title"
                @click="() => goToDetailPage(data)"
                style="flex-wrap: wrap"
              >
                <news-card :title="data.title" :src-name="data.src" :icon="data.pic" />
              </nut-cell>
            </nut-cell-group>
          </nut-tabpane>
        </nut-tabs>
      </nut-col>
    </nut-row>
  </home-container>
</template>

<style lang="less">
.home {
  &-top {
    position: relative;
    height: 200px;
    padding-top: 28%;
    padding-left: 14px !important;
    padding-right: 14px !important;
    background-image: url(https://img.ixintu.com/download/jpg/202004/dc8c7c7e59b1c72c6bb4abdd17b92f15_800_399.jpg!con);
    &-weather {
      position: absolute;
      top: 24%;
      font-size: 12px;
      color: #333;
      &-num {
        margin-bottom: 4px;
        font-size: 20px;
        font-weight: bold;
      }
    }
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
      padding: 0;
      background: #fcfcfc;
      .nut-cell-group {
        box-shadow: 0px 1px 7px 0px rgb(237, 238, 241);
      }
    }
  }
}
</style>
