<template>
  <Logo />
</template>

<script setup lang="tsx">
import logo from '../../public/logo.png';
const Logo = () => <image style={{ width: '100px', height: '125px' }} src={logo} />;
</script>
