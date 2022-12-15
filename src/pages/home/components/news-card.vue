<script lang="tsx" setup>
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  icon: string;
  srcName: string;
}>();

const NewsCard = computed(() => () => (
  <>
    <nut-row class='news-card'>
      <nut-col span={16}>
        <nut-ellipsis class='news-card-content' content={props.title} direction='end' rows='3' />
      </nut-col>
      <nut-col span={6}>
        <image lazyLoad class='news-card-icon' src={props.icon} />
      </nut-col>
    </nut-row>
    <div class='news-card-extra'>
      <p>{props.srcName}</p>
      <nut-icon name='close' size='8' />
    </div>
  </>
));
</script>

<template>
  <NewsCard />
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
  &-extra {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 10px;
    color: rgb(148, 148, 148);
  }
}
</style>
