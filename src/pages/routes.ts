// 根据页面划分出N个主模块，再在主模块下划分各个子模块
// 因此子模块的路由路径都放在对应主位置

const INDEX = 'pages/index';
const NEWS = 'pages/news';
const HORIZON = 'pages/horizon';
const NOVEL = 'pages/novel';
const PERSON = 'pages/person';

export default {
  index: [`${INDEX}/index`],
  news: [`${NEWS}/index`],
  horizon: [`${HORIZON}/index`],
  novel: [`${NOVEL}/index`],
  person: [`${PERSON}/index`],
};
