<template>
  <home-container>
    <figure class="horizon-logo">
      <home-logo />
    </figure>
    <section class="horizon-content">
      <home-searchbar />
      <nut-grid class="horizon-content-apps" :border="false" :column-num="5" clickable>
        <nut-grid-item icon-color="#2ea64c" icon="lower" text="下载管理" />
        <nut-grid-item icon-color="#2e40ea" icon="category" text="收藏书签" />
        <nut-grid-item icon-color="#fbc015" icon="clock" text="历史记录" />
        <nut-grid-item icon-color="#fa6a35" icon="date" text="万年历" />
        <nut-grid-item icon="addfollow" text="添加" />
      </nut-grid>
    </section>
  </home-container>
</template>

<script setup lang="ts">
import {} from 'vue';
import { HomeContainer, HomeLogo, HomeSearchbar } from '../../components';
</script>

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
