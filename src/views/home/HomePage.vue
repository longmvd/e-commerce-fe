<template>
  <div>
    <transition :appear="true" :duration="1000">
      <div v-show="!isShowSearchResults">
        <item-gallery
          v-for="itemGalleryConfig in itemGalleryConfigs"
          :config="itemGalleryConfig"
          @item-click="handleOpenDetails"
        >
        </item-gallery>
      </div>
    </transition>
    <transition :appear="true" :duration="1000">
      <div v-show="isShowSearchResults">
        <product-search-result-vue @item-click="handleOpenDetails" />
      </div>
    </transition>
    <div class="version">Version {{ version }}</div>
    <popup-retrieve-order
      v-if="showRetrieveOrder"
      @close="showRetrieveOrder = false"
    ></popup-retrieve-order>
  </div>
</template>
<script setup lang="ts">
import {
  default as ProductApi,
  default as productApi,
} from '@/apis/product/product-api';
import { ItemGallery, ItemGalleryConfig } from '@/components';
import { check } from '@/composable/http/use-response';
import { Product } from '@/entities';
import { HeaderClickEvent } from '@/plugins/event-bus/types/header-click-event';
import { Emitter } from 'mitt';
import { computed, inject, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductSearchResultVue from '../product/ProductSearchResult.vue';
import PopupRetrieveOrder from './popup/PopupRetrieveOrder.vue';

const router = useRouter();
const route = useRoute();
const isShowSearchResults = computed(() => !!route.query?.search);
const bus = inject<Emitter<HeaderClickEvent>>('_bus');

// watch(
//   route.query,
//   (val) => {
//     console.log(val);
//   },
//   { deep: true }
// );
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
  if (!isShowSearchResults.value) {
    await getProductGallery();
  }
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
getProductApiVersion();
const version = ref('');
async function getProductApiVersion() {
  const res = await productApi.getApiVersion();
  const { isSuccess, data } = check(res);
  if (isSuccess) {
    version.value = data.Data;
  }
}

watch(isShowSearchResults, (val) => {
  if (!val) {
    if (!itemGalleryConfigs?.length) {
      getProductGallery();
    }
  }
});
//#region retrieve order
const showRetrieveOrder = ref(false);
bus?.on('onRetrieveOrder', (e) => {
  showRetrieveOrder.value = true;
});
//#endregion
</script>

<style>
.version {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
