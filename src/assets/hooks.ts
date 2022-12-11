import Taro from '@tarojs/taro';
import { computed, onMounted, ref, watchEffect, type App, type Plugin } from 'vue';
import { type GetNewsParams, type NewsListResult, getNewsList } from './https';

export type EngineApi = 'shenma' | 'baidu' | 'bing';

type BingData = Record<
  string,
  {
    Query: string;
    FullResults: number;
    Results: Array<{
      Type: string;
      Suggests: Array<{
        Txt: string;
        Type: string;
        Sk: string;
        HCS: number;
      }>;
    }>;
  }
>;

type UseGetNewsListReturnType = {
  list: NewsListResult[];
  success: boolean;
};

export function usePlugins(vue: App, plugins: Plugin[]) {
  plugins.forEach(plugin => {
    vue.use(plugin);
  });
}

/**
 * useNormalizeSearchResult
 * @description 反序列化搜索接口返回的字符串结果
 * @param {string | object} data 搜索接口返回的json字符串
 * @param {boolean} isBing 单独处理bing的搜索结果
 * @returns 获得一个字符串数组
 */
export function useNormalizeSearchResult(
  word: string,
  data: string | BingData,
  isBing?: boolean
): string[] {
  const normalize: string[] = [];

  const fmtStrData = () => {
    if (typeof data !== 'string') return;

    const a = `jsonp({"q":"${word}","r":`;
    const b = `window.baidu.sug({q:"${word}",p:false,s:`;
    const c = '});';
    const parseData = computed<({ w: string } | string)[]>(() =>
      JSON.parse(data.replace(data.startsWith(a) ? a : b, '').replace(c, ''))
    );

    for (let i = 0; i < parseData.value.length; i++) {
      const element = parseData.value[i];
      if (typeof element === 'string') {
        normalize.push(...(parseData.value as string[]));
        break;
      }
      normalize.push(element.w);
    }
  };

  const fmtBingData = () => {
    if (!isBing) return;
    const [key] = Object.keys(data);
    const suggests: BingData['']['Results'][0]['Suggests'] = [];

    data[key].Results?.forEach(({ Suggests }) => suggests.push(...Suggests));
    suggests.forEach(({ Txt }) => normalize.push(Txt));
  };

  fmtStrData();
  fmtBingData();

  return normalize;
}

/**
 * useSearchEngine
 * @description 使用第三方搜索引擎的数据采集
 * @param {string} type 搜索引擎: 神马 | 百度 | 必应
 * @param {string} word 搜索关键字
 * @returns 获得对应的搜索引擎地址
 */
export function useSearchEngine(type: EngineApi, word: string) {
  const engineApi = ref({
    shenma: `https://m.sm.cn/s?q=${word}&from=smor&safe=1&by=next&snum=0`,
    baidu: `https://www.baidu.com/ssid=56edcbabd7d37a726836363646cb/from=844b/s?word=${word}&ts=0&t_kt=0&ie=utf-8&fm_kl=021394be2f&rsv_iqid=3636251036&sa=ib&ms=1`,
    bing: `https://www.bing.com/search?q=${word}&qs=HS&sk=PRES1HS1&sc=8-0&cvid=028FE8E107AA47EB8A64CD54FD7D0742&FORM=QBLH&sp=2`,
  });
  return computed(() => engineApi.value[type]);
}

/**
 * useGetNewsList
 * @description 获取新闻接口列表数据
 * @param {object} data 接口所需参数
 * @param {Function} callback 接口调用成功时执行该回调
 * @returns 返回一个用于重新加载接口的函数
 */
export const useGetNewsList = (
  data: GetNewsParams,
  callback: (res: UseGetNewsListReturnType) => void,
  failed?: () => void
): (() => void) => {
  const success = ref(false);
  const list = ref<NewsListResult[]>([]);

  const result = computed(() => ({
    list: list.value,
    success: success.value,
  }));

  const request = async () => {
    success.value = false;
    try {
      const { result } = await getNewsList(data);
      success.value = true;
      list.value.length && (list.value.length = 0);
      list.value.push(...result.list);
    } catch (error) {
      failed?.();
      Taro.showToast({ title: '网络似乎开小差了~', icon: 'none' });
      console.log('[useGetNewsList] ', error);
    }
  };

  const onReload = () => request();

  onMounted(() => {
    onReload();
    watchEffect(() => {
      success.value && callback(result.value);
    });
  });

  return onReload;
};
