<template>
  <div>
    <item-gallery
      v-for="itemGalleryConfig in itemGalleryConfigs"
      :config="itemGalleryConfig"
      @item-click="handleOpenDetails"
    >
    </item-gallery>
  </div>
</template>
<script setup lang="ts">
import ProductApi from '@/apis/product/product-api';
import { ItemGallery, ItemGalleryConfig } from '@/components';
import { check } from '@/composable/http/use-response';
import { Product } from '@/entities';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// const itemGalleryConfig = ref<ItemGalleryConfig>({
//   dots: false,
//   arrows: true,
//   title: 'Đồng hồ',
//   textTransformTitle: 'uppercase',
//   items: [
//     {
//       ID: 1,
//       ProductName: 'Điện thoại IPhone 13 Promax',
//       ImageUrl:
//         'http://localhost:5237/api/Images?filename=638353199572289670.png',
//       Description: '',
//       Price: 3_000_000,
//       FreeShipping: true,
//       Promotion: '',
//       TradePrice: 3_000_000,
//       Discount: 0.5,
//       Star: 5,
//     },
//     {
//       ID: 1,
//       ProductName: 'Điện thoại IPhone 13 Promax',
//       ImageUrl:
//         'http://localhost:5237/api/Images?filename=638353264067380207.webp',
//       Description: '',
//       Price: 3_000_000,
//       FreeShipping: true,
//       Promotion: '',
//       TradePrice: 3_000_000,
//       Discount: 0.5,
//       Star: 5,
//     },
//     {
//       ID: 1,
//       ProductName: 'Điện thoại IPhone 13 Promax',
//       ImageUrl: './src/assets/images/14_1_9_2_9.webp',
//       Description: '',
//       Price: 3_000_000,
//       FreeShipping: true,
//       Promotion: '',
//       TradePrice: 3_000_000,
//       Discount: 0.5,
//       Star: 5,
//     },
//     {
//       ID: 1,
//       ProductName: 'Điện thoại IPhone 13 Promax',
//       ImageUrl: './src/assets/images/14_1_9_2_9.webp',
//       Description: '',
//       Price: 3_000_000,
//       FreeShipping: true,
//       Promotion: '',
//       TradePrice: 3_000_000,
//       Discount: 0.5,
//       Star: 5,
//     },
//     {
//       ID: 1,
//       ProductName: 'Điện thoại IPhone 13 Promax',
//       ImageUrl: './src/assets/images/14_1_9_2_9.webp',
//       Description: '',
//       Price: 3_000_000,
//       FreeShipping: true,
//       Promotion: '',
//       TradePrice: 3_000_000,
//       Discount: 0.5,
//       Star: 5,
//     },
//     {
//       ID: 1,
//       ProductName: 'Điện thoại IPhone 13 Promax',
//       ImageUrl: './src/assets/images/14_1_9_2_9.webp',
//       Description: '',
//       Price: 3_000_000,
//       FreeShipping: true,
//       Promotion: '',
//       TradePrice: 3_000_000,
//       Discount: 0.5,
//       Star: 5,
//     },
//     {
//       ID: 1,
//       ProductName: 'Điện thoại IPhone 13 Promax',
//       ImageUrl: './src/assets/images/14_1_9_2_9.webp',
//       Description: '',
//       Price: 3_000_000,
//       FreeShipping: true,
//       Promotion: '',
//       TradePrice: 3_000_000,
//       Discount: 0.5,
//       Star: 5,
//     },
//   ],
//   relatedTags: [
//     {
//       ID: 1,
//       Url: 'abc.com',
//       Text: 'Apple Watch',
//     },
//     {
//       ID: 2,
//       Url: 'abc.com',
//       Text: 'Apple Watch',
//     },
//     {
//       ID: 3,
//       Url: 'abc.com',
//       Text: 'Apple Watch',
//     },
//     {
//       ID: 4,
//       Url: 'abc.com',
//       Text: 'Apple Watch',
//     },
//   ],
// });

const itemGalleryConfigs = reactive<ItemGalleryConfig[]>([]);
(async () => {
  await getProductGallery();
})();

function handleOpenDetails(item: Product) {
  router.push(`product/${item.ID}`);
}

/**
 * Lấy danh sách product
 */
async function getProductGallery() {
  const res = await ProductApi.getProductCatalog([
    { ID: 1 },
    { ID: 2 },
    { ID: 3 },
    { ID: 4 },
    { ID: 5 },
  ]);
  const { isSuccess, data } = check(res);
  // itemGalleryConfig.value.items =
  if (isSuccess) {
    const configs = data?.Data?.map((data: any) => ({
      dots: false,
      arrows: true,
      title: data.Title,
      textTransformTitle: 'uppercase',
      items: data.Items,
      relatedTags: [],
    }));
    itemGalleryConfigs.push(...configs);
  }

  return res;
}
</script>
