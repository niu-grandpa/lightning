import routes from './pages/routes';

const { index, news, horizon, novel, person } = routes;

export default defineAppConfig({
  pages: [...index, ...news, ...horizon, ...novel, ...person],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
  },
});
