<script setup lang="ts">
const props = defineProps<{ loading: boolean; error: boolean }>();
const emit = defineEmits<{ (event: 'on-button-click'): void }>();
</script>

<template>
  <section v-if="props.loading && !props.error" class="pic-compose" v-for="i in 3" :key="i">
    <nut-skeleton width="250px" height="15px" title animated row="5" class="item" />
    <nut-skeleton width="250px" height="15px" title animated row="5" class="item" />
  </section>
  <nut-empty v-else-if="props.error" image="network" description="网络连接失败">
    <div style="margin-top: 10px">
      <nut-button icon="refresh" type="primary" @click="emit('on-button-click')">重试</nut-button>
    </div>
  </nut-empty>
</template>
