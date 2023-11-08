<template>
  <div>
    <item-gallery :config="itemGalleryConfig" @item-click="handleOpenDetails">
    </item-gallery>
    <item-gallery :config="itemGalleryConfig"> </item-gallery>
    <item-gallery :config="itemGalleryConfig"> </item-gallery>
    <item-gallery :config="itemGalleryConfig"> </item-gallery>
  </div>
</template>
<script setup lang="ts">
import ProductApi from '@/apis/product/product-api';
import { ItemGallery, ItemGalleryConfig } from '@/components';
import { Product } from '@/entities';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const itemGalleryConfig = ref<ItemGalleryConfig>({
  dots: false,
  arrows: true,
  title: 'Đồng hồ',
  textTransformTitle: 'uppercase',
  items: [
    {
      ID: 1,
      ProductName: 'Điện thoại IPhone 13 Promax',
      ImageUrl: './src/assets/images/14_1_9_2_9.webp',
      Description: '',
      Price: 3_000_000,
      FreeShipping: true,
      Promotion: '',
      TradePrice: 3_000_000,
      Discount: 0.5,
      Star: 5,
    },
    {
      ID: 1,
      ProductName: 'Điện thoại IPhone 13 Promax',
      ImageUrl: './src/assets/images/14_1_9_2_9.webp',
      Description: '',
      Price: 3_000_000,
      FreeShipping: true,
      Promotion: '',
      TradePrice: 3_000_000,
      Discount: 0.5,
      Star: 5,
    },
    {
      ID: 1,
      ProductName: 'Điện thoại IPhone 13 Promax',
      ImageUrl: './src/assets/images/14_1_9_2_9.webp',
      Description: '',
      Price: 3_000_000,
      FreeShipping: true,
      Promotion: '',
      TradePrice: 3_000_000,
      Discount: 0.5,
      Star: 5,
    },
    {
      ID: 1,
      ProductName: 'Điện thoại IPhone 13 Promax',
      ImageUrl: './src/assets/images/14_1_9_2_9.webp',
      Description: '',
      Price: 3_000_000,
      FreeShipping: true,
      Promotion: '',
      TradePrice: 3_000_000,
      Discount: 0.5,
      Star: 5,
    },
    {
      ID: 1,
      ProductName: 'Điện thoại IPhone 13 Promax',
      ImageUrl: './src/assets/images/14_1_9_2_9.webp',
      Description: '',
      Price: 3_000_000,
      FreeShipping: true,
      Promotion: '',
      TradePrice: 3_000_000,
      Discount: 0.5,
      Star: 5,
    },
    {
      ID: 1,
      ProductName: 'Điện thoại IPhone 13 Promax',
      ImageUrl: './src/assets/images/14_1_9_2_9.webp',
      Description: '',
      Price: 3_000_000,
      FreeShipping: true,
      Promotion: '',
      TradePrice: 3_000_000,
      Discount: 0.5,
      Star: 5,
    },
    {
      ID: 1,
      ProductName: 'Điện thoại IPhone 13 Promax',
      ImageUrl: './src/assets/images/14_1_9_2_9.webp',
      Description: '',
      Price: 3_000_000,
      FreeShipping: true,
      Promotion: '',
      TradePrice: 3_000_000,
      Discount: 0.5,
      Star: 5,
    },
  ],
  relatedTags: [
    {
      ID: 1,
      Url: 'abc.com',
      Text: 'Apple Watch',
    },
    {
      ID: 2,
      Url: 'abc.com',
      Text: 'Apple Watch',
    },
    {
      ID: 3,
      Url: 'abc.com',
      Text: 'Apple Watch',
    },
    {
      ID: 4,
      Url: 'abc.com',
      Text: 'Apple Watch',
    },
  ],
});
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
  let res = await ProductApi.getPaging({
    PageIndex: 1,
    PageSize: 10,
  });
  // itemGalleryConfig.value.items =
  console.log(res.data);

  return res;
}
</script>
