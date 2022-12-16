<script lang="tsx" setup>
import Taro from '@tarojs/taro';
import { computed } from 'vue';

const { title, list } = defineProps<{
  title: string;
  list: { text: string; icon: string; url: string }[];
}>();

const handleNav = (url: string) => {
  if (!url) return;
  Taro.navigateTo({ url });
};

const OptionsCard = computed(() => () => (
  <nut-cell style={{ flexDirection: 'column' }}>
    <h4 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>{title}</h4>
    <nut-grid clickable border={false} icon-size='20px'>
      {list.length > 0 &&
        list.map(({ text, icon, url }) => (
          <nut-grid-item {...{ icon, text }} key={text} onClick={() => handleNav(url)} />
        ))}
    </nut-grid>
  </nut-cell>
));
</script>

<template>
  <OptionsCard />
</template>
