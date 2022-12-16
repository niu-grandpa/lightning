<script setup lang="tsx">
import Taro from '@tarojs/taro';
import { computed, ref } from 'vue';
import { HomeContainer, UserAvatar } from '../../components';
import OptionsCard from './components/options-card.vue';

const commonlyUsed = [
  { text: '夜间模式', icon: 'marshalling', url: '' },
  { text: '退出无痕', icon: 'footprint', url: '' },
  { text: '网页无图', icon: 'image-error', url: '' },
  { text: '退出', icon: 'circle-close', url: '' },
];
const myService = [
  { text: '消息中心', icon: 'message', url: '' },
  { text: '我的小说', icon: 'date', url: '' },
  { text: '积分中心', icon: 'star', url: '' },
  { text: '我的游戏', icon: 'JIMI40', url: '' },
];
const easyLife = [
  { text: '彩票开奖', icon: 'order', url: '' },
  { text: '充值中心', icon: 'home', url: '' },
  { text: '热门活动', icon: 'shop', url: '' },
  { text: '垃圾清理', icon: 'del', url: '' },
  { text: '帮助反馈', icon: 'ask2', url: '' },
  { text: '借钱', icon: 'clock', url: '' },
  { text: '官方商城', icon: 'shop3', url: '' },
  { text: '游戏中心', icon: 'people', url: '' },
];

const userInfo = ref<Taro.UserInfo>();
const isLogin = ref(false);

const handleLogin = () => {
  if (userInfo.value?.nickName) return;
  Taro.getUserProfile({
    desc: '将作为登录浏览器小程序的帐号',
  })
    .then(({ userInfo: data }) => {
      userInfo.value = data;
      isLogin.value = true;
    })
    .catch(err => {
      console.log(err);
      Taro.showToast({ title: '若重新登录可以点击头像', icon: 'none' });
    });
};

const Fore = computed(() => () => (
  <nut-popup
    visible
    position='left'
    overlay={false}
    destroy-on-close={false}
    style={{ width: '100%', height: '89%' }}>
    <section
      onClick={handleLogin}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <nut-avatar icon='my' size='large' />
      <p style={{ marginTop: '10px', fontSize: '22px' }}>点击登录</p>
    </section>
  </nut-popup>
));

const My = computed(() => () => (
  <HomeContainer className='person-view'>
    <div className='person-setting'>
      <nut-icon name='setting' />
    </div>
    <nut-row class='person-top'>
      <nut-col span='20'>
        <UserAvatar
          name={userInfo.value?.nickName || '游客'}
          icon={userInfo.value?.avatarUrl || ''}
          desc='VIP4'
        />
      </nut-col>
      <nut-col span='4'>
        <nut-button style={{ marginTop: '28px' }} color='#7232dd' size='small'>
          签到
        </nut-button>
      </nut-col>
    </nut-row>
    <nut-grid border={false}>
      {['书签', '历史', '下载', '关注'].map((text, i) => (
        <nut-grid-item {...{ text }} key={text}>
          {{ icon: () => i }}
        </nut-grid-item>
      ))}
    </nut-grid>
    <OptionsCard title='常用功能' list={commonlyUsed} />
    <OptionsCard title='我的服务' list={myService} />
    <OptionsCard title='便捷生活' list={easyLife} />
  </HomeContainer>
));
</script>

<template>
  <Fore v-if="!isLogin" />
  <My v-else />
</template>

<style lang="less">
.person {
  &-view {
    height: 100% !important;
    padding: 90px 14px;
    .nut-grid-item__content {
      background-color: transparent;
    }
  }
  &-setting {
    width: 100%;
    text-align: right;
  }
  &-click-btn {
    margin-top: 28px;
  }
}
</style>
