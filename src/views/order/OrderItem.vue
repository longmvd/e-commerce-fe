<template>
  <div class="item-wrap p-8">
    <div class="item-order" v-for="item in items">
      <div class="flex">
        <div class="item-image">
          <img
            :src="`${host}/imageService/api/images?filename=${item?.ThumbnailImageName}`"
            alt=""
            width="100"
            height="100"
          />
        </div>
        <div class="item-info ml-16 flex-1">
          <div class="item-name fs-16 text-bold">
            {{ `${item.ProductName} - ${item.VersionName}` }}
          </div>
          <div class="flex content-space-between">
            <div class="item-price flex">
              <div class="item-price--show color-primary text-bold">
                {{ formatCurrencyDisplay(item.Price) }}
              </div>
              &nbsp;
              <div
                class="item-price--through text-line-through color-text-blur text-bold"
              >
                {{ item.Price }}
              </div>
            </div>
            <div class="item-total-money">
              <span>{{ $t('i18nCommon.Quantity') }}: </span>
              <span style="color: var(--app-primary-color)">{{
                item.Quantity
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import host from '@/apis/configs/api-config';
import { formatCurrencyDisplay } from '@/composable/format/price';
import { OrderItemEntity } from '@/entities/order';
const props = defineProps<{
  items: OrderItemEntity[];
}>();
</script>

<style scoped lang="scss">
.item-wrap {
  border-bottom: 1px solid var(--app-border-color-gray);
}
</style>
