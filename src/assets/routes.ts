// 根据页面划分出N个主模块，再在主模块下划分各个子模块
// 因此子模块的路由路径都放在对应主位置

const INDEX = 'pages/index';
const HOME = 'pages/home';
const VIDEO = 'pages/video';
const HORIZON = 'pages/horizon';
const Cartoon = 'pages/cartoon';
const PERSON = 'pages/person';
const OUT = 'pages/out';

export default {
  index: [`${INDEX}/index`],
  out: [`${OUT}/index`, `${OUT}/news-detail`],
  home: [],
  video: [],
  horizon: [],
  cartoon: [`${Cartoon}/catalog`, `${Cartoon}/content`],
  person: [],
};
