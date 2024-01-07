<template>
  <a-image
    v-bind="internalConfig"
    :src="
      internalConfig.src ??
      `${host}fileService/api/images?filename=${internalConfig.imageName}`
    "
  />
</template>

<script setup lang="ts">
import host from '@/apis/configs/api-config';
import { computed } from 'vue';
import { ImageConfig } from '.';
const props = withDefaults(
  defineProps<{
    config?: ImageConfig;
  }>(),
  {}
);
const internalConfig = computed(() => ({
  height: 100,
  width: 100,
  ...props.config,
}));
</script>

<style scoped></style>
