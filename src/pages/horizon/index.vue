<script setup lang="tsx">
import { computed, ref } from 'vue';
import { HomeContainer, HomeLogo, HomeSearchbar } from '../../components';

const list = [
  { iconColor: '#2ea64c', icon: 'lower', text: '下载管理' },
  { iconColor: '#2e40ea', icon: 'category', text: '收藏书签' },
  { iconColor: '#fbc015', icon: 'clock', text: '历史记录' },
  { iconColor: '#fa6a35', icon: 'date', text: '万年历' },
  { iconColor: '', icon: 'addfollow', text: '添加' },
];

const page4 = ref(0);

const Component = computed(() => () => (
  <HomeContainer>
    <figure class='horizon-logo'>
      <HomeLogo />
    </figure>
    <section class='horizon-content'>
      <HomeSearchbar />
      <nut-grid class='horizon-content-apps' border={false} column-num={5} clickable>
        {list.map(({ icon, text, iconColor }) => (
          <nut-grid-item {...{ icon, text, iconColor }} />
        ))}
      </nut-grid>
    </section>
    <nut-swiper
      init-page={page4.value}
      loop
      auto-play='3000'
      height='150'
      pagination-visible
      style='height: 150px'>
      <nut-swiper-item>
        <image src='https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg' />
      </nut-swiper-item>
      <nut-swiper-item>
        <image src='https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg' />
      </nut-swiper-item>
      <nut-swiper-item>
        <image src='https://storage.360buyimg.com/jdc-article/welcomenutui.jpg' />
      </nut-swiper-item>
      <nut-swiper-item>
        <image src='https://storage.360buyimg.com/jdc-article/fristfabu.jpg' />
      </nut-swiper-item>
    </nut-swiper>
  </HomeContainer>
));
</script>

<template>
  <Component />
</template>

<style lang="less">
.horizon {
  &-logo {
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  &-content {
    margin-top: 20px;
    padding: 18px;
    .home-search {
      border-color: #000;
    }
    &-apps {
      margin: 14px 0;
      .nut-grid-item__content {
        background-color: transparent;
      }
    }
  }
}
</style>
