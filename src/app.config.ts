import routes from './assets/routes';

const { index, home, horizon, novel, person } = routes;

export default defineAppConfig({
  pages: [...index, ...home, ...horizon, ...novel, ...person],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
  },
  lazyCodeLoading: 'requiredComponents',
});
