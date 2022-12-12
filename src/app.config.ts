import routes from './assets/routes';

const { index, home, video, horizon, novel, person, out } = routes;

export default defineAppConfig({
  pages: [...index, ...home, ...video, ...horizon, ...novel, ...person, ...out],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
  },
  lazyCodeLoading: 'requiredComponents',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  entryPagePath: index[0],
});
