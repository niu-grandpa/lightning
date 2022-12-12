import Taro from '@tarojs/taro';
import { useNormalizeSearchResult } from './hooks';

export type GetNewsParams = {
  /**	频道 */
  channel: NewsCategory;
  /**数量 */
  num: number;
  /**起始位置 */
  start: number;
};

/**
 * 新闻分类
 *
 * 头条，新闻，国内，国际，政治，财经，体育，娱乐，军事，教育，科技，NBA，股票，星座，女性，健康，育儿
 */
export enum NewsCategory {
  HOTSPOT = '头条',
  NEWS = '新闻',
  HOME = '国内',
  INTERNATION = '国际',
  POLITICS = '政治',
  FINANCE = '财经',
  SPORTS = '体育',
  ENTERTAINMENT = '娱乐',
  MILITARY = '军事',
  EDUCATE = '教育',
  TECHNOLOGY = '科技',
  NBA = 'NBA',
  STOCK = '股票',
  HEALTHY = '健康',
}

export interface GetNewsReturnType {
  status: string;
  msg: string;
  result: {
    channel: string;
    num: string;
    list: NewsListResult[];
  };
}

export type NewsListResult = {
  title: string;
  time: string;
  src: string;
  category: string;
  pic: string;
  content: string;
  url: string;
  weburl: string;
};

/**京东云接口appkey */
const APPKEY = 'da39dce4f8aa52155677ed8cd23a6470';

export const getSMSearchKeywords = async (word: string) => {
  const t = new Date().getTime();
  const { data } = await Taro.request<string>({
    url: 'https://sugs.m.sm.cn/web?',
    data: {
      t: 'w',
      uc_param_str: 'dnnwnt',
      scheme: 'https',
      fr: 'web',
      q: word,
      _: t,
      callback: 'jsonp',
    },
  });
  return useNormalizeSearchResult(word, data);
};

export const getBaiduSearchKeywords = async (word: string) => {
  const { data } = await Taro.request({
    url: 'https://suggestion.baidu.com/su',
    data: {
      wd: word,
    },
  });
  return useNormalizeSearchResult(word, data);
};

export const getBingSearchKeywords = async (word: string) => {
  const { data } = await Taro.request({
    url: `https://api.bing.com/qsonhs.aspx`,
    data: {
      type: 'cb',
      q: word,
    },
  });
  return useNormalizeSearchResult(word, data, true);
};

export const getNewsList = async ({
  channel,
  num,
  start,
}: GetNewsParams): Promise<GetNewsReturnType> => {
  const { data } = await Taro.request<GetNewsReturnType>({
    url: 'https://way.jd.com/jisuapi/get',
    data: {
      appkey: APPKEY,
      channel,
      num,
      start,
    },
  });
  return data.result as unknown as GetNewsReturnType;
};