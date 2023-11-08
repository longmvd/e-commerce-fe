<template>
  <div class="product-detail-wrap">
    <div class="detail-title">
      <div class="product-name text-bold">
        <h1>{{ product?.ProductName }}</h1>
      </div>
    </div>
    <div class="product-description">
      {{ product?.Description }}
    </div>
    {{ socketMessage.data }}
  </div>
  <e-button :config="buyButton"></e-button>
</template>

<script lang="ts" setup>
import ProductApi from '@/apis/product/product-api';
import { EButton, type ButtonConfig } from '@/components/controls/e-button';
import { useWebSocket } from '@/composable/socket/use-web-socket';
import { Product } from '@/entities';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const {} = defineProps<{}>();

const product = ref<Product>();

//#region config
const buyButton = reactive<ButtonConfig>({
  title: 'Mua hang',
  IsShowIcon: false,
  onClick(e) {
    console.log(e);
  },
});
//#endregion
(async () => {
  console.log(route.params);

  await getProductDetails(route.params.productId.toString());
})();

/*
 * @author MDLong 05.11.2023
 */
async function getProductDetails(id?: string) {
  if (id) {
    const res = await ProductApi.getById(id);
    product.value = res.data.Data as Product;
    console.log(product.value);
  }
}
const socketMessage = reactive<{ [key: string]: any }>({});

//#region socket
useWebSocket({
  handleOnSocketError(event) {
    console.log(event);
  },
  handleOnSocketMessage(event) {
    console.log(event);
  },
});

//#endregion
</script>

<style lang="scss" scoped>
.product-name {
  font-size: large;
}
</style>
