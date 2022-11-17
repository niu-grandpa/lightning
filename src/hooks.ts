import { App, computed, ref } from 'vue';

export function usePlugins<T>(_vue: App<T>, plugins: any[]) {
  const fnStr = ref('');
  plugins.forEach(plugin => {
    fnStr.value += `['use'](${plugin})`;
  });
  const newFunc = computed(() => Function(`_vue${fnStr.value}`));
  newFunc.value();
}
