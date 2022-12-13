<script lang="ts" setup>
const props = defineProps<{
  title: string;
  icon: string;
  srcName: string;
}>();
</script>

<template>
  <nut-row class="news-card">
    <nut-col :span="16">
      <nut-ellipsis class="news-card-content" :content="props.title" direction="end" rows="3" />
    </nut-col>
    <nut-col :span="6">
      <image :lazyLoad="true" class="news-card-icon" :src="props.icon" />
    </nut-col>
  </nut-row>
  <p class="news-card-src">{{ props.srcName }}</p>
</template>

<style lang="less">
.news-card {
  width: initial;
  &-content {
    .nut-ellipsis {
      line-height: 1.3;
      margin-right: 8px;
      font-size: 16px;
      color: #000;
    }
  }
  &-icon {
    width: 156px;
    height: 90px;
    border-radius: 3px;
    object-fit: cover;
  }
  &-src {
    font-size: 10px;
    color: rgb(148, 148, 148);
  }
}
</style>
