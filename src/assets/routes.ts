// 根据页面划分出N个主模块，再在主模块下划分各个子模块
// 因此子模块的路由路径都放在对应主位置

const INDEX = 'pages/index';
const VIDEO = 'pages/video';
const HORIZON = 'pages/horizon';
const PERSON = 'pages/person';
const VIEWS = 'pages/views';

export default {
  index: [`${INDEX}/index`],
  out: [`${VIEWS}/out/index`],
  home: [`${VIEWS}/home/news-detail`],
  video: [],
  horizon: [],
  cartoon: [`${VIEWS}/cartoon/catalog/index`, `${VIEWS}/cartoon/content/index`],
  person: [],
};
