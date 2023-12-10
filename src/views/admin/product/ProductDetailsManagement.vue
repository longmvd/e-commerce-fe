<template>
  <div>{{ product }}</div>
</template>

<script setup lang="ts">
import productApi from '@/apis/product/product-api';
import { check } from '@/composable/http/use-response';
import { Product } from '@/entities';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref<Product>();

(async () => {
  await getData();
})();
async function getData() {
  if (route?.params?.id) {
    const res = await productApi.getById(route.params.id as string);
    const { isSuccess, data } = check(res);
    if (isSuccess) {
      product.value = data.Data;
    }
  }
}
</script>

<style scoped></style>
