<template>
  <scroll-view
    :enhanced="true"
    :bounces="true"
    :show-scrollbar="true"
    :enable-passive="true"
    style="height: calc(100vh - 86px); background: #fcfcfc; box-sizing: border-box"
  >
    <slot />
  </scroll-view>
</template>
