<template>
  <div class="item-wrap p-8">
    <div class="item-order mb-8 py-12" v-for="item in items">
      <div class="flex">
        <div class="mr-8" v-if="allowChangeNumber">
          <a-checkbox v-model:checked="item.IsActive"></a-checkbox>
        </div>
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
            <div v-if="allowChangeNumber">
              <e-button
                :config="{
                  loading: item?.IsLoadingDecrease,
                  shape: 'circle',
                  icon: '-',
                  onClick() {
                    //@ts-ignore
                    if (item.Quantity > orderQuantityInputConfig.min) {
                      item.IsLoadingDecrease = true;
                      emit('changeQuantity', -1, item, item.IsLoadingDecrease);
                    }
                  },
                }"
              ></e-button>
              <span class="mx-8" style="color: var(--app-primary-color)">{{
                item.Quantity
              }}</span>
              <e-button
                :config="{
                  loading: item?.IsLoadingIncrease,
                  shape: 'circle',
                  icon: '+',
                  onClick() {
                    //@ts-ignore
                    if (item.Quantity < orderQuantityInputConfig.max) {
                      item.IsLoadingIncrease = true;
                      emit('changeQuantity', 1, item, item.IsLoadingIncrease);
                    }
                  },
                }"
              ></e-button>
            </div>
            <div class="item-total-money" v-else>
              <span>{{ $t('i18nCommon.Quantity') }}: </span>
              <span style="color: var(--app-primary-color)">{{
                item.Quantity
              }}</span>
            </div>
          </div>
        </div>
        <div class="ml-8" v-if="allowChangeNumber">
          <e-button
            :config="{
              loading: item.IsLoadingDelete,
              icon: h(DeleteOutlined),
              type: 'text',
              shape: 'circle',
              onClick() {
                item.IsLoadingDelete = true;
                emit('deleteItem', item);
              },
            }"
          >
          </e-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import host from '@/apis/configs/api-config';
import { EButton } from '@/components';
import { formatCurrencyDisplay } from '@/composable/format/price';
import { OrderItemEntity } from '@/entities/order';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { InputNumberProps } from 'ant-design-vue';
import { h, reactive } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps<{
  items: OrderItemEntity[];
  allowChangeNumber?: boolean;
}>();

const emit = defineEmits<{
  (
    e: 'changeQuantity',
    quantity: number,
    item: OrderItemEntity,
    isLoading: any
  ): void;
  (e: 'deleteItem', item: OrderItemEntity): void;
}>();

// const increaseQuantityButtonConfig = reactive<ButtonConfig>({
//   onClick() {
//     //@ts-ignore
//     if (orderQuantity.value < orderQuantityInputConfig.max)
//       orderQuantity.value++;
//   },
// });
// const decreaseQuantityButtonConfig = reactive<ButtonConfig>({
//   onClick() {
//     if (orderQuantity.value > 1) orderQuantity.value--;
//   },
// });

const orderQuantityInputConfig = reactive<InputNumberProps>({
  min: 1,
  max: 5,
  controls: false,
});

const router = useRouter();
</script>

<style scoped lang="scss">
.item-order {
  border-top: 1px solid var(--app-border-color-gray);
}
</style>
