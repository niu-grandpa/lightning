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
  requiredPrivateInfos: ['getLocation', 'chooseLocation', 'chooseAddress'],
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序获取当前城市天气信息',
    },
  },
});
