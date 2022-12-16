<script setup lang="tsx">
import Taro from '@tarojs/taro';
import { computed, ref, watchEffect } from 'vue';
import { HomeContainer } from '.';
import { engineIcons } from '../assets/icons';
import {
  getSMSearchKeywords,
  getBaiduSearchKeywords,
  getBingSearchKeywords,
} from '../assets/https';

const engineObj = {
  zh: ['神马', '百度', '必应'],
  en: ['shenma', 'baidu', 'bing'],
  methods: [getSMSearchKeywords, getBaiduSearchKeywords, getBingSearchKeywords],
};

const props = defineProps<{ fixed?: boolean }>();

const visible = ref(false);
const searchValue = ref('');
const isRespond = ref(false);
const searchList = ref<string[]>([]);
const engineIdx = ref(0);

const setIsRespond = (v: boolean) => (isRespond.value = v);
const clearList = () => searchList.value.length && (searchList.value.length = 0);

const initData = () => {
  if (visible.value) return;
  clearList();
  engineIdx.value = 0;
  searchValue.value = '';
  setIsRespond(false);
};

const handleSearch = () => {
  initData();
  if (!searchValue.value) {
    clearList();
    setIsRespond(false);
    return;
  }
  requset().then(() => setIsRespond(false));
};

const requset = async () => {
  setIsRespond(true);
  const searchApi = engineObj.methods[engineIdx.value];
  const data = await searchApi(searchValue.value);
  clearList();
  searchList.value.push(...data);
};

watchEffect(() => {
  handleSearch();
});

const handleChangeEngine = () => {
  Taro.showActionSheet({ itemList: engineObj.zh }).then(({ tapIndex }) => {
    engineIdx.value = tapIndex;
    searchList.value.length = 0;
    handleSearch();
  });
};

const handleToWebView = (state: string, idx = 0) => {
  Taro.navigateTo({ url: `../out/index?search=${state}&engine=${engineObj.en[idx]}` });
};

const handleMicro = () => {
  Taro.showToast({ title: '尽请期待' });
};

const handleScan = () => {
  Taro.scanCode({}).then(res => {
    Taro.showToast({
      title: JSON.stringify(res.result),
    });
  });
};

const HomeSearchBar = computed(() => ({ className }: { className?: string }) => (
  <section {...{ className }}>
    <nut-input
      readonly
      clearable
      border={false}
      leftIcon={!props.fixed ? 'search2' : ''}
      class={`home-search ${props.fixed ? 'home-search-fixed' : ''}`}
      onClickInput={() => (visible.value = true)}
      placeholder='搜索或输入网址'>
      {{
        button: () => (
          <>
            <nut-icon name='microphone' onClick={handleMicro} style={{ marginRight: '16px' }} />
            <nut-icon name='scan2' onClick={handleScan} />
          </>
        ),
      }}
    </nut-input>

    <nut-popup
      visible={visible.value}
      destroy-on-close={false}
      overlay={false}
      position='right'
      class='home-search-view'
      style={{ width: '100%' }}>
      <nut-searchbar
        vModel={searchValue.value}
        autofocus
        inputBackground='#efefef'
        style={{ padding: '95px 14px 0' }}
        placeholder='搜索或输入网址'
        onSearch={() => handleToWebView(searchValue.value, engineIdx.value)}>
        {{
          leftout: () => <nut-icon name='left' size='20' onClick={() => (visible.value = false)} />,
          leftin: () =>
            engineIdx.value === 1 ? (
              <nut-icon name={engineIcons[1]} onClick={handleChangeEngine} />
            ) : engineIdx.value === 2 ? (
              <nut-icon name={engineIcons[2]} onClick={handleChangeEngine} />
            ) : (
              <nut-icon size='18' name={engineIcons[0]} onClick={handleChangeEngine} />
            ),
          rightin: () => <nut-icon name='microphone' onClick='handleMicro' />,
        }}
      </nut-searchbar>

      <HomeContainer>
        <nut-skeleton
          width='320px'
          height='18px'
          style={{ marginTop: '25px', marginLeft: '25px' }}
          animated
          row='3'
          loading={isRespond.value}>
          <nut-cell-group>
            {searchList.value.map(word => (
              <nut-cell
                title={word}
                key={word}
                is-link
                onClick={() => handleToWebView(word, engineIdx.value)}>
                {{
                  icon: () => <nut-icon name='search2' style={{ marginRight: '8px' }} />,
                }}
              </nut-cell>
            ))}
          </nut-cell-group>
        </nut-skeleton>

        <nut-cell
          vShow={searchValue.value}
          title={`百度一下: ${searchValue.value}`}
          isLink
          onClick={() => handleToWebView(searchValue.value, 1)}>
          {{
            icon: () => (
              <img width='20px' height='20px' style={{ marginRight: '6px' }} src={engineIcons[1]} />
            ),
          }}
        </nut-cell>
      </HomeContainer>
    </nut-popup>
  </section>
));
</script>

<template>
  <HomeSearchBar />
</template>

<style lang="less">
.home-search {
  height: 50px;
  display: flex;
  align-items: center;
  border: 2px solid #d3d3d3;
  border-radius: 40px;
  transition: all 0.2s;
  .nut-icon {
    border: none;
  }
  &-view {
    .nut-searchbar {
      &__search-input {
        height: 43px;
        margin-right: 6px;
        border-radius: 40px;
        box-shadow: none;
      }
    }
  }
  &-fixed {
    width: 74%;
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 999;
  }
}
</style>
