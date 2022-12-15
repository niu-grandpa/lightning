<script lang="ts" setup>
import { type WeatherType } from '../../../assets/https';
import { ref } from 'vue';
import { useWeather } from '../../../assets/hooks';

const data = ref<WeatherType>({ tmp: '', cond_txt: '', area: '' });
useWeather(res => {
  data.value = res;
});
</script>

<template>
  <section class="home-top-weather" v-if="data.tmp">
    <p class="home-top-weather-num">
      {{ data?.tmp }}
      <small style="font-size: 12px">°C</small>
    </p>
    <p>{{ data?.cond_txt }} {{ data?.area }}</p>
  </section>
</template>
