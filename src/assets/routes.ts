// 根据页面划分出N个主模块，再在主模块下划分各个子模块
// 因此子模块的路由路径都放在对应主位置

const INDEX = 'pages/index';
const HOME = 'pages/home';
const VIDEO = 'pages/video';
const HORIZON = 'pages/horizon';
const NOVEL = 'pages/novel';
const PERSON = 'pages/person';

export default {
  index: [`${INDEX}/index`],
  out: ['pages/out/index'],
  home: [],
  video: [],
  horizon: [],
  novel: [],
  person: [],
};
