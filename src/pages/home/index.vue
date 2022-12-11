<script setup lang="ts">
import { ref } from 'vue';
import { HomeSearchView, HomeResult, MyContainer } from '../../components';
import { useGetNewsList } from '../../assets/hooks';
import { type NewsListResult } from '../../assets/https';

const error = ref(false);
const loading = ref(true);
const isFixedInput = ref(false);
const refreshHasMore = ref(true);
const list = ref<NewsListResult[]>([]);

const refreshLoadMore = (done: () => void) => {};

const refresh = (done: () => void) => {};
const init = () => {};

const reload = useGetNewsList(
  { channel: '头条', start: 0, num: 5 },
  res => {
    error.value = false;
    list.value = res.list;
    console.log(list);
    loading.value = !res.success;
  },
  () => (error.value = true)
);

const handleScroll = ({ detail }) => {
  isFixedInput.value = detail.scrollTop >= 198;
};
</script>

<template>
  <my-container :scroll-y="true" @scroll="handleScroll">
    <nut-row>
      <nut-col :span="24" class="home-top">
        <home-search-view :fixed="isFixedInput" />
      </nut-col>

      <nut-col :span="24" class="home-bottom">
        <home-result :loading="loading" :error="error" @on-button-click="reload" />

        <template v-if="list.length">
          <nut-cell style="flex-direction: column">
            <nut-row style="margin: 5px 0" v-for="(item, i) in list" :key="i">
              <nut-col :span="3">
                <nut-tag style="height: 16px" color="#FA685D">置顶</nut-tag>
              </nut-col>
              <nut-col :span="21">
                <span class="home-bottom-hot-title">{{ item.title }}</span>
              </nut-col>
            </nut-row>
          </nut-cell>
        </template>

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
            <li v-for="(item, i) in list" :key="i">
              {{ item }}
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
