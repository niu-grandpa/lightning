<script lang="tsx" setup>
import { computed } from 'vue';

const props = defineProps<{ icon: string; name: string; desc: string }>();

const UserAvatar = computed(() => () => (
  <nut-row style={{ margin: '21px 0', fontSize: '17px' }}>
    <nut-col span={4}>
      <nut-avatar icon={props.icon} />
    </nut-col>
    <nut-col span={20}>
      <p style={{ marginBottom: '3px', fontWeight: 600 }}>{props.name}</p>
      <p style={{ fontSize: '12px', color: '#8d8b8b' }}>{props.desc}</p>
    </nut-col>
  </nut-row>
));
</script>

<template>
  <UserAvatar />
</template>
