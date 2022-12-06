import routes from './pages/routes';

const { index, home, horizon, novel, person } = routes;

export default defineAppConfig({
  pages: [...index, ...home, ...horizon, ...novel, ...person],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
