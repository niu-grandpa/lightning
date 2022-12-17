<script setup lang="ts">
import Taro from '@tarojs/taro';
import { computed, onMounted, ref } from 'vue';
import { HomeContainer, HomeResult } from '../../../../components';
import { useCartoonChapter } from '../../../../assets/hooks';
import { type CartoonChapterReturnType } from '../../../../assets/https';

const { cartoonId } = Taro.getCurrentInstance().router?.params!;

const error = ref(false);
const data = ref<CartoonChapterReturnType>();
const rate = ref(8);
const len = computed(() => data.value?.chapterList.length);
const isEnd = computed(() =>
  new Date(data.value?.updateTime || 0).getTime() >= new Date().getTime() ? '连载中' : '已完结'
);

onMounted(() => {
  useCartoonChapter(cartoonId!, res => {
    data.value = res;
  });
});

const handleToNext = () => {
  Taro.preload({ data: data.value });
  Taro.navigateTo({ url: '../content/index' });
};
</script>

<template>
  <home-container class="cartoon-catalog">
    <home-result :loading="!data" :error="error">
      <section class="cartoon-catalog-top">
        <div class="cartoon-catalog-mask" />
        <image :src="data!.cover" class="cartoon-catalog-cover" />
        <nut-icon
          class="cartoon-catalog-arrow"
          name="left"
          size="24"
          color="#fff"
          @click="() => Taro.navigateBack()"
        />
        <section class="cartoon-catalog-title">
          <p class="title">{{ data?.title }}</p>
          <p>{{ data?.author }}</p>
        </section>
      </section>

      <nut-cell style="flex-direction: column">
        <p>{{ isEnd }} 共{{ len }}话</p>
        <p style="margin-top: 5px; margin-bottom: 10px">免费</p>

        <nut-row style="display: flex; align-items: center">
          <nut-col :span="12">
            <strong style="margin-right: 12px; font-size: 18px">{{ rate }}</strong>
            <nut-rate :spacing="5" readonly active-color="#FFC800" v-model="rate" />
          </nut-col>
          <nut-col :span="12">
            <div class="cartoon-catalog-like">
              <p>{{ len }}</p>
              <small style="font-size: 10px">人气</small>
            </div>
            <div class="cartoon-catalog-like">
              <p>{{ len }}</p>
              <small style="font-size: 10px">点赞</small>
            </div>
            <div class="cartoon-catalog-like">
              <p>{{ len }}</p>
              <small style="font-size: 10px">粉丝</small>
            </div>
          </nut-col>
        </nut-row>
      </nut-cell>

      <nut-cell-group>
        <nut-cell style="flex-direction: column">
          <p style="margin-bottom: 8px; font-size: 16px; font-weight: 600">详情</p>
          <p>{{ data?.descs }}</p>
        </nut-cell>
        <nut-cell :title="`目录 共${len}章`" :desc="isEnd" is-link @click="handleToNext" />
      </nut-cell-group>
    </home-result>
  </home-container>

  <nut-grid :column-num="2" icon-size="18px" clickable>
    <nut-grid-item icon="star-n" text="加入书架" />
    <nut-grid-item icon="link" text="在线阅读" @click="handleToNext" />
  </nut-grid>
</template>

<style lang="less">
.cartoon-catalog {
  color: #666;
  &-top {
    position: relative;
  }
  &-arrow,
  &-title {
    left: 16px;
  }
  &-arrow {
    position: fixed;
    top: 55px;
  }
  &-cover,
  &-mask {
    width: 100%;
    height: 300px;
  }
  &-mask {
    position: fixed;
    background-color: #000;
    opacity: 0.3;
  }
  &-title {
    position: absolute;
    bottom: 18px;
    font-size: 14px;
    font-weight: 600;
    color: #d4b254;
    .title {
      margin-bottom: 6px;
      font-size: 20px;
      color: #fff;
    }
  }
  &-like {
    display: inline-block;
    margin-left: 18px;
    font-size: 21px;
    color: #000;
    text-align: center;
  }
}
</style>
