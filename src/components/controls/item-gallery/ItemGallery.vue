<template>
  <a-row>
    <a-col>
      <div class="flex content-space-between">
        <div>
          <h2
            class="item-gallery-title"
            :style="{ textTransform: config?.textTransformTitle }"
          >
            {{ config?.title }}
          </h2>
        </div>
        <div>
          <div class="flex related-tag cursor-pointer">
            <div
              class="related-tag__item"
              v-for="item in relatedTags"
              @click="handleRelatedTagClick(item)"
            >
              {{ item.Text }}
            </div>
          </div>
        </div>
      </div>
      <a-carousel v-bind="carouselConfig">
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 0px; z-index: 1">
            <left-circle-outlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 0px">
            <right-circle-outlined />
          </div>
        </template>
        <slot name="items">
          <div v-for="item in items">
            <product-item
              :item="item"
              @itemClick="handleItemClick(item)"
            ></product-item>
          </div>
        </slot>
      </a-carousel>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { RelatedTag } from '@/entities';
import { Product } from '@/entities/product';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { CarouselProps } from 'ant-design-vue';
import { computed, ref } from 'vue';
import ProductItem from './ProductItem.vue';
import { ItemGalleryConfig } from './index';
const { config } = defineProps<{
  config: ItemGalleryConfig;
}>();

const emit = defineEmits<{
  (e: 'itemClick', data: any): void;
  (e: 'relatedTagClick', data: any): void;
}>();

const carouselConfig = ref<CarouselProps>({
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 0,
  ...config,
});

const items = computed<Product[]>(() => config.items);
const relatedTags = computed<RelatedTag[]>(() => {
  if (config.relatedTags?.length) {
    return config.relatedTags;
  }
  return [];
});

function handleItemClick(item: any) {
  emit('itemClick', item);
}

function handleRelatedTagClick(tag: RelatedTag) {
  emit('relatedTagClick', tag);
}
</script>

<style lang="scss" scoped>
.item-gallery-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
}
// .ant-carousel :deep(.slick-slide) {
//   text-align: center;
//   height: 160px;
//   line-height: 160px;
//   background: #364d79;
//   overflow: hidden;
// }

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #151414;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
// .ant-carousel :deep(.custom-slick-arrow:hover) {
//   opacity: 0.5;
// }

// .ant-carousel :deep(.slick-slide h3) {
//   color: #fff;
// }

.related-tag {
  &__item {
    background-color: var(--tag-bg-color);
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    color: #444;
    float: right;
    font-size: 13px;
    height: 34px;
    padding: 5px 10px;
    white-space: nowrap;
  }
}
</style>
