<template>
  <div>
    <item-gallery :config="itemGalleryConfig"> </item-gallery>
    <item-gallery :config="itemGalleryConfig"> </item-gallery>
    <item-gallery :config="itemGalleryConfig"> </item-gallery>
    <item-gallery :config="itemGalleryConfig"> </item-gallery>
  </div>
</template>
<script setup lang="ts">
import { ItemGallery, ItemGalleryConfig } from "@/components";
import { ref } from "vue";
const itemGalleryConfig = ref<ItemGalleryConfig>({
  dots: false,
  arrows: true,
  title: "Đồng hồ",
  textTransformTitle: "uppercase",
});
</script>
