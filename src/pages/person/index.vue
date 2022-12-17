<script setup lang="tsx">
import Taro from '@tarojs/taro';
import { computed, ref } from 'vue';
import { HomeContainer, UserAvatar } from '../../components';
import { useMailLogin } from '../../assets/hooks';
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

const modal = ref(false);
const userInfo = ref({
  nickName: Taro.getStorageSync('username') || '',
  avatarUrl: 'my',
});
const mailInfo = ref<{ account: string; password: string }>({ account: '', password: '' });
const isLogin = ref<boolean>(JSON.parse(Taro.getStorageSync('login') || 'false'));

const wxSelfLogin = () => {
  if (isLogin.value) return;
  Taro.getUserProfile({
    desc: '将作为登录浏览器小程序的帐号',
  }).then(({ userInfo: data }) => {
    userInfo.value = data;
    isLogin.value = true;
    cacheLoginStatus();
  });
};

const mailLogin = () => {
  const { account, password } = mailInfo.value;
  if (!account && !password) {
    Taro.showToast({ title: '请输入邮箱和密码', icon: 'none' });
    return;
  } else if (!account) {
    Taro.showToast({ title: '请输入邮箱', icon: 'none' });
    return;
  } else if (!password) {
    Taro.showToast({ title: '请输入密码', icon: 'none' });
    return;
  }
  useMailLogin(account, password, res => {
    isLogin.value = true;
    userInfo.value.nickName = res.result.account;
    cacheLoginStatus();
    Taro.showToast({ title: '登录成功' });
  });
};

const cacheLoginStatus = () => {
  const login = Taro.getStorageSync('login');
  const username = Taro.getStorageSync('username');
  if (!login) Taro.setStorageSync('login', JSON.stringify(isLogin.value));
  if (!username) Taro.setStorageSync('username', userInfo.value.nickName);
};

const Fore = computed(() => () => (
  <nut-popup
    visible={!isLogin.value}
    position='left'
    overlay={false}
    destroy-on-close={false}
    style={{ width: '100%', height: '89%' }}>
    <section
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <nut-button type='success' style={{ marginRight: '5px' }} onClick={wxSelfLogin}>
        微信登录
      </nut-button>
      <nut-button color='#7232dd' onClick={() => !isLogin.value && (modal.value = true)}>
        邮箱登录
      </nut-button>
    </section>

    <nut-dialog
      title='登录'
      vModel:visible={modal.value}
      onOk={mailLogin}
      close-on-click-overlay={false}
      content={
        <>
          <nut-input
            required
            vModel={mailInfo.value.account}
            label='邮箱'
            placeholder='请输入邮箱'
          />
          <nut-input
            required
            vModel={mailInfo.value.password}
            label='密码'
            placeholder='请输入密码'
            type='password'
          />
        </>
      }
    />
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
