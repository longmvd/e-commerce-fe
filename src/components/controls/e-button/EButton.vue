<template>
  <a-button v-bind="config">
    <template #icon>
      <slot name="icon">
        <!-- <keep-alive>
          <component :is="dynamicIcon"></component>
        </keep-alive> -->
      </slot>
    </template>
    <span v-if="config.title">
      {{ config.title }}
    </span>
    <slot> </slot>
  </a-button>
</template>
<script setup lang="ts">
import { ButtonConfig } from '.';

const props = withDefaults(
  defineProps<{
    config: ButtonConfig;
  }>(),
  {}
);
// const iconName = computed(() => props.config.IconName);
// async function importIcon() {
//   const iconModule = await import(`@ant-design/icons-vue/MenuOutlined`);
//   return defineAsyncComponent(() => Promise.resolve(iconModule));
// }
// const dynamicIcon = defineAsyncComponent(importIcon);
</script>
