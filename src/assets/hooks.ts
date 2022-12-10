import { computed, ref, type App, type Plugin } from 'vue';

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
