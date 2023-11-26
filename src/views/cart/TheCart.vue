<template>
  <div class="form-wrapper">
    <div v-if="cart?.Items?.length" class="cart-list-item">
      <!-- <div class="cart-item" v-for="item in cart.Items"> -->
      <order-item
        :items="(cart.Items as any)"
        :allow-change-number="true"
        @change-quantity="handleChangeQuantity"
        @delete-item="handleDeleteItem"
      ></order-item>
      <!-- </div> -->
    </div>
    <div
      v-else
      class="cart-empty flex flex-column items-center content-center bg-white"
      v-html="$t('i18nCommon.CartEmpty')"
    ></div>
    <div class="cart-footer flex content-between">
      <div class="text-bold fs-18">
        <span class="item-price--show text-bold">Tạm tính: </span>
        <span class="item-price--show color-primary">{{
          CalculateTotalPriceAfterDiscount(
            cart?.Items?.filter((item) => item.IsActive)
          )
        }}</span>
      </div>
      <e-button :config="purchaseButtonConfig"></e-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CartApi from '@/apis/cart/cart-api';
import {
  default as ProductVersionApi,
  default as productVersionApi,
} from '@/apis/product/product-version-api';
import { EButton } from '@/components';
import { setLocalStorage } from '@/composable/clientStorage/useLocalStorage';
import { CalculateTotalPriceAfterDiscount } from '@/composable/format/price';
import { check } from '@/composable/http/use-response';
import { OrderItemEntity } from '@/entities/order';
import { PurchaseRequest } from '@/entities/purchase/purchase-entity';
import i18n from '@/i18n';
import { useUserStore } from '@/store';
import { ButtonProps } from 'ant-design-vue';
import { remove } from 'lodash';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import OrderItem from '../order/OrderItem.vue';
const { user } = useUserStore();

const router = useRouter();
const cart = ref(user.Cart);

const t = i18n.global.t;
//#region config
const purchaseButtonConfig = reactive<ButtonProps>({
  loading: false,
  title: t('i18nCommon.Purchase'),
  type: 'primary',
  size: 'large',
  onClick() {
    const item = cart.value?.Items?.filter((item) => item.IsActive).map(
      (item) => ({ OrderQuantity: item.Quantity, ID: item.ID })
    );
    const purchase = {
      ProductItems: item,
    } as PurchaseRequest;

    setLocalStorage('PurchaseRequest', purchase);

    router.push('/order');
  },
});

//#endregion

//#region get information
(async () => {
  await getItemInfo();
})();
async function getItemInfo() {
  const res = await ProductVersionApi.getPaging({
    PageIndex: 1,
    PageSize: -1,
    Filter: JSON.stringify([
      'ID',
      'In',
      `${cart.value?.Items?.map((item) => item.ID).join(',')}`,
    ]),
  });
  const { isSuccess, data } = check(res);
  if (isSuccess && cart.value) {
    let items = data?.Data?.PageData as any;
    let cartItems = cart.value?.Items;
    cart.value.Items = items.map((item: any) => {
      let cartItem = cartItems?.find((it) => item.ID == it.ID);

      return { ...item, ...cartItem };
    });
  }
}

async function handleChangeQuantity(
  quantity: number,
  item: OrderItemEntity,
  isLoading: any
) {
  const res = await CartApi.addToCart({
    ProductID: item.ProductID,
    ProductItemID: item.ProductItemID,
    Quantity: quantity,
  });
  const { isSuccess } = check(res);
  if (isSuccess) {
    item.IsLoadingDecrease = false;
    item.IsLoadingIncrease = false;
    item.Quantity += quantity;
  }
}

async function handleDeleteItem(item: OrderItemEntity) {
  const res = await productVersionApi.deleteItem({
    ID: item.ProductItemID,
  });
  const { isSuccess } = check(res);
  if (isSuccess) {
    remove(cart.value?.Items as any, (it: any) => it.ID == (item as any).ID);
  }
}
//#endregion
</script>
<style lang="scss" scoped>
.cart-empty {
  min-height: 90vh;
}

.cart {
  &-footer {
    padding-top: 12px;
    border-top: 1px solid var(--app-border-color-gray);
  }
}
</style>
