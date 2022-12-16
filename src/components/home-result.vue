<script setup lang="tsx">
import Taro from '@tarojs/taro';
import { computed, watchEffect } from 'vue';

const props = defineProps<{ loading: boolean; error: boolean }>();
const emit = defineEmits<{ (event: 'on-button-click'): void }>();

const nums = [1, 2, 3];

watchEffect(onCleanup => {
  const timer = setTimeout(() => {
    if (props.loading) {
      Taro.showLoading({ title: '加载中...' });
    } else {
      Taro.hideLoading();
    }
    onCleanup(() => clearTimeout(timer));
  }, 2000);
});

const HomeResult = computed(() => () => (
  <>
    {props.loading &&
      !props.error &&
      nums.map(item => (
        <section class='pic-compose' key={item}>
          <nut-skeleton width='250px' height='15px' title animated row='5' class='item' />
          <nut-skeleton width='250px' height='15px' title animated row='5' class='item' />
        </section>
      ))}
    {props.error && (
      <nut-empty image='network' description='网络连接失败'>
        <div style={{ marginTop: '10px' }}>
          <nut-button icon='refresh' type='primary' onClick={emit('on-button-click')}>
            重试
          </nut-button>
        </div>
      </nut-empty>
    )}
  </>
));
</script>

<template>
  <HomeResult />
</template>
