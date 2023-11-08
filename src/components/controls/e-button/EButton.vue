<template>
  <a-button v-bind="config">
    <template #icon>
      <keep-alive>
        <component :is="dynamicIcon"></component>
      </keep-alive>
    </template>
    <span v-if="config.title">
      {{ config.title }}
    </span>
    <slot> </slot>
  </a-button>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { ButtonConfig } from '.';

const props = withDefaults(
  defineProps<{
    config: ButtonConfig;
  }>(),
  {}
);
const iconName = computed(() => props.config.IconName);
const dynamicIcon = defineAsyncComponent(
  () => import(`@ant-design/icons-vue/MenuOutlined`)
);
</script>
