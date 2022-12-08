import { type App, type Plugin } from 'vue';

export function usePlugins(vue: App, plugins: Plugin[]) {
  plugins.forEach(plugin => {
    vue.use(plugin);
  });
}
