<template>
  <!-- <div class="main"> -->
  <a-layout>
    <the-admin-header />
    <the-admin-content />
  </a-layout>
  <!-- </div> -->
</template>

<script setup lang="ts">
import TheAdminContent from './TheAdminContent.vue';
import TheAdminHeader from './TheAdminHeader.vue';
</script>
<style>
.main {
  display: flex;
  flex-direction: column;
}
</style>
