<script setup lang="ts">
import Taro from '@tarojs/taro';
import { useSearchEngine, type EngineApi } from '../../assets/hooks';

const { engine, search } = Taro.useRouter().params;
const address = useSearchEngine(engine as EngineApi, search!);
</script>

<template>
  <web-view :src="address" />
</template>
