import Taro from '@tarojs/taro';
import { useNormalizeSearchResult } from './hooks';

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
