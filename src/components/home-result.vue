<script setup lang="tsx">
import Taro from '@tarojs/taro';
import { computed, watchEffect } from 'vue';

const props = defineProps<{ loading: boolean; error: boolean }>();
const emit = defineEmits<{ (event: 'on-button-click'): void }>();

watchEffect(() => {
  if (props.loading && !props.error) {
    Taro.showLoading({ title: '更新数据中' });
  } else {
    Taro.hideLoading();
  }
});

const HomeResult = computed(() => () => (
  <>
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
