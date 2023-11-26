<template>
  <!-- <div class="main"> -->
  <a-layout>
    <the-admin-header />
    <the-admin-content />
    <the-admin-footer />
  </a-layout>
  <!-- </div> -->
</template>

<script setup lang="ts">
import TheAdminContent from './TheAdminContent.vue';
import TheAdminSidebar from './TheAdminSidebar.vue';
import TheAdminHeader from './TheAdminHeader.vue';
</script>
<style>
.main {
  display: flex;
  flex-direction: column;
}
</style>
