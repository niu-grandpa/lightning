import Taro from '@tarojs/taro';
import { computed, onMounted, ref, watchEffect, type App, type Plugin } from 'vue';
import {
  type GetNewsParams,
  type NewsListResult,
  type VideoReturnType,
  getNewsList,
  getWeather,
  getHaoKanVideo,
  WeatherType,
  CartoonReturnType,
  searchCartoon,
  GetCartoonParams,
  getCartoonChapter,
  CartoonChapterReturnType,
  getCartoonContent,
  mailLogin,
  MailLoginReturnType,
} from './https';

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
  callback: (res: UseGetNewsListReturnType) => void,
  failed?: () => void
): ((data: GetNewsParams) => void) => {
  const success = ref(false);
  const list = ref<NewsListResult[]>([]);

  const result = computed(() => ({
    list: list.value,
    success: success.value,
  }));

  const request = async (data: GetNewsParams) => {
    success.value = false;
    try {
      const { result } = await getNewsList(data);
      success.value = true;
      list.value = result.list;
    } catch (error) {
      failed?.();
      Taro.showToast({ title: '网络似乎开小差了~', icon: 'none' });
      console.log('[useGetNewsList] ', error);
    }
  };

  const onReload = (data: GetNewsParams) => {
    request(data);
  };

  watchEffect(() => {
    success.value && callback(result.value);
  });

  return onReload;
};

/**
 * useWeather
 * @description 获取天气接口的数据
 */
export const useWeather = (callback: (data: WeatherType) => any) => {
  useRequstHook(async () => {
    const { longitude, latitude } = await Taro.getLocation({ type: 'wgs84' });
    const { now } = await getWeather(`${longitude},${latitude}`);
    return { area: '当前城市', tmp: now.temp, cond_txt: now.text };
  }, callback);
};

/**
 * useShortVideo
 * @description 获取随机短视频，数据来源于《好看视频》
 * @param page 页码
 * @see https://api.apiopen.top/swagger/index.html#/开放接口/get_getHaoKanVideo
 */
export const useShortVideo = (page: number, callback: (data: VideoReturnType[]) => any) => {
  useRequstHook<VideoReturnType[]>(async () => {
    const data = await getHaoKanVideo(page);
    return data;
  }, callback);
};

/**
 * useSearchCartoon
 * @description 获取漫画查询结果
 * @param obj 查询参数
 */
export const useSearchCartoon = (
  obj: GetCartoonParams,
  callback: (data: CartoonReturnType[]) => any,
  failed?: () => void
) => {
  useRequstHook<CartoonReturnType[]>(
    async () => {
      const data = await searchCartoon(obj);
      return data;
    },
    callback,
    failed
  );
};

/**
 * useCartoonChapter
 * @description 获取漫画章节
 * @param cartoonId 漫画id
 */
export const useCartoonChapter = (
  cartoonId: string,
  callback: (data: CartoonChapterReturnType) => any,
  failed?: () => void
) => {
  useRequstHook<CartoonChapterReturnType>(
    async () => {
      const data = await getCartoonChapter(cartoonId);
      return data;
    },
    callback,
    failed
  );
};

/**
 * useCartoonContent
 * @description 获取漫画章节的内容
 * @param chapterId 章节id
 */
export const useCartoonContent = (
  chapterId: string,
  callback: (data: string[]) => any,
  failed?: () => void
) => {
  useRequstHook<string[]>(
    async () => {
      const data = await getCartoonContent(chapterId);
      return data;
    },
    callback,
    failed
  );
};

/**
 * useMailLogin
 * @description 使用邮箱和密码登录
 */
export const useMailLogin = (
  account: string,
  password: string,
  callback: (data: MailLoginReturnType) => any,
  failed?: () => void
) => {
  useRequstHook<MailLoginReturnType>(
    async () => {
      const data = await mailLogin(account, password);
      return data;
    },
    callback,
    failed
  );
};

const useRequstHook = <T>(
  requsetCb: () => Promise<T>,
  success: (data: T) => any,
  failed?: () => void
) => {
  const requset = async () => {
    Taro.showLoading();
    const data = await requsetCb();
    Taro.hideLoading();
    return data;
  };
  requset()
    .then((res: T) => success(res))
    .catch(() => {
      failed?.();
    });
};
