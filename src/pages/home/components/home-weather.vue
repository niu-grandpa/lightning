<script lang="tsx" setup>
import { type WeatherType } from '../../../assets/https';
import { computed, onMounted, ref } from 'vue';
import { useWeather } from '../../../assets/hooks';

const data = ref<WeatherType>({ tmp: '', cond_txt: '', area: '' });

onMounted(() => {
  useWeather(res => {
    data.value = res;
  });
});

const Weather = computed(
  () => () =>
    data.value.tmp && (
      <section class='home-top-weather'>
        <p class='home-top-weather-num'>
          {data.value.tmp}
          <small style={{ fontSize: '12px' }}>°C</small>
        </p>
        <p>
          {data.value.cond_txt} {data.value.area}
        </p>
      </section>
    )
);
</script>

<template>
  <Weather />
</template>
