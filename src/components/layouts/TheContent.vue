<template>
  <a-layout-content class="content">
    <!-- <a-layout-sider> -->
    <router-view />
    <!-- </a-layout-sider> -->
  </a-layout-content>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.content {
  margin-top: var(--header-height);
  margin-left: 48px;
  margin-right: 48px;
}
</style>
