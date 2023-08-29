<template>
  <a-layout-content class="content">
    <a-layout-slider>
      <router-view />
    </a-layout-slider>
  </a-layout-content>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.content{
  margin-top: var(--header-height);
}
</style>
