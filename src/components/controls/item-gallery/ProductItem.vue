<template>
  <div @click="$emit('itemClick')">
    <div class="p-relative item-wrapper flex flex-column m-8 p-12 br-12">
      <div
        class="flex content-center items-center item-percent"
        v-if="internalItem.Discount"
      >
        <div class="item-percent-text text-bold">
          {{ formatDiscountPercentText(internalItem.Discount) }}
        </div>
      </div>
      <div class="item__image flex content-center items-center">
        <img :src="internalItem.ImageUrl" alt="" class="item-img" />
      </div>
      <div class="item__name text-bold">{{ internalItem.ProductName }}</div>
      <div class="item__price flex items-center mb-10">
        <div class="item__price--show">
          {{ formatCurrencyDisplay(internalItem.Price ?? 0) }}
        </div>
        <div class="item__price--through ml-8" v-if="internalItem.Discount">
          {{ internalItem.Price }}
        </div>
      </div>
      <div class="item__promotion" v-html="internalItem.Promotion"></div>
      <div class="free-ship-tag">Giao nhanh miễn phí</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import imageApi from '@/apis/file/file-api';
import { formatDiscountPercentText } from '@/composable';
import { formatCurrencyDisplay } from '@/composable/format/price';
import { Product } from '@/entities';
import { computed } from 'vue';
const emit = defineEmits<{
  (e: 'itemClick'): void;
}>();
const props = defineProps<{
  item: Product;
}>();
const internalItem = computed(() => {
  return {
    ...props.item,
    ImageUrl: imageApi.getContentURL(props.item.ProductImages?.[0]?.Name ?? ''),
  };
});
</script>

<style scoped lang="scss">
.free-ship-tag {
  border: 1px solid #e11b1e;
  border-radius: 5px;
  color: #e11b1e;
  font-size: 12px;
  margin-top: 8px;
  padding: 2px 5px;
  width: -moz-fit-content;
  width: fit-content;
}
.item {
  &__image {
  }
  &__name {
    font-size: 1rem;
  }
  &__price {
    &--show {
      line-height: 1.1;
      color: var(--app-primary-color);
    }
    &--through {
      color: var(--text-blur-color);
      font-weight: 600;
      text-decoration: line-through;
      font-size: 0.9rem;
    }
    font-size: 1rem;
    font-weight: 700;
  }
  &-img {
    width: 160px;
    display: block;
  }
  &-wrapper {
    display: flex;
    background-color: white;
    max-width: 240px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
  }
  &-percent {
    background: var(--app-primary-color);
    color: #fff;
    position: absolute;
    height: 31px;
    left: -5px;
    position: absolute;
    top: -1px;
    width: 80px;
    border-radius: 4px 17px 17px 0;

    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 6px solid #af0000;
      border-right: 1px solid transparent;
      border-bottom: 6px solid transparent;
      left: 0;
      bottom: -5px;
    }
  }
}
</style>
