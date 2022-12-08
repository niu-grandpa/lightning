<script setup lang="ts">
import { ref } from 'vue';
import { MyContainer } from '.';

const visible = ref(false);
const searchValue = ref('');
</script>

<template>
  <nut-input
    readonly
    clearable
    :border="false"
    class="home-search"
    left-icon="search"
    @click-input="visible = true"
    placeholder="搜索或输入网址"
  >
    <template #button>
      <nut-icon name="microphone" style="margin-right: 16px" />
      <nut-icon name="scan2" />
    </template>
  </nut-input>
  <nut-popup
    style="width: 100%"
    :overlay="false"
    v-model:visible="visible"
    class="home-search-view"
  >
    <my-container>
      <section>
        <nut-searchbar
          v-model="searchValue"
          autofocus
          input-background="#efefef"
          style="padding: 0"
          placeholder="搜索或输入网址"
        >
          <template #leftout>
            <nut-icon name="left" @click="visible = false" />
          </template>
          <template #leftin>
            <nut-icon size="16" name="search2" />
          </template>
          <template #rightin>
            <nut-icon name="microphone" />
          </template>
        </nut-searchbar>
      </section>
    </my-container>
  </nut-popup>
</template>

<style lang="less">
.home-search {
  border: 2px solid #555;
  border-radius: 12px;
  .nut-icon {
    border: none;
  }
  &-view {
    .nut-searchbar {
      background: transparent;
      &__search-input {
        height: 43px;
        margin-right: 6px;
        border-radius: 40px;
      }
    }
  }
}
</style>
