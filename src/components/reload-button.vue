<script lang="tsx" setup>
import Taro from '@tarojs/taro';
import { computed } from 'vue';

const emits = defineEmits<{ (event: 'click'): void }>();

const handleClick = () => {
  emits('click');
  Taro.showToast({ title: '', icon: 'loading' });
  Taro.pageScrollTo({ scrollTop: 0 });
};

const ReloadButton = computed(() => () => (
  <div class='reload-btn' onClick={handleClick}>
    <nut-icon name='refresh2' />
  </div>
));
</script>

<template>
  <ReloadButton />
</template>

<style>
.reload-btn {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 140px;
  right: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  z-index: 10;
  background: #fff;
}
</style>
