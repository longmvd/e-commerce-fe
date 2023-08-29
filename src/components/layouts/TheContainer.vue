<template>
  <!-- <div class="main"> -->
    <a-layout>
      <the-header />
      <the-content />
      <the-footer />
    </a-layout>
  <!-- </div> -->
</template>

<script setup lang="ts">
import TheContent from "./TheContent.vue";
import TheFooter from "./TheFooter.vue";
import TheHeader from "./TheHeader.vue";
</script>
<style>
.main {
  display: flex;
  flex-direction: column;
}
</style>
