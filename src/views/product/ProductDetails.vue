<template>
  <div class="product-detail-wrap">
    <div class="detail-title">
      <div class="product-name text-bold">
        <h1>{{ product?.ProductName }}</h1>
      </div>
    </div>

    <div
      class="product-version-wrap flex bg-white p-16 br-8 shadow-default mb-12"
    >
      <div class="image-carousel w-50">
        <!-- <item-gallery :config="itemGalleryConfig">
          <template #items>
            <div class="image" v-for="item in product?.ProductImages">
              {{ item.Name }}
              <img
                :src="`localhost:5237/api/images?filename=${item.Name}`"
                width="200"
                height="200"
              />
            </div>
          </template>
        </item-gallery> -->
        <a-carousel :key="carouselKey" v-bind="itemGalleryConfig">
          <!-- <template #customPaging="props">
            <a> </a>
          </template> -->
          <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
              <left-circle-outlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
              <right-circle-outlined />
            </div>
          </template>
          <div
            class="image flex content-center items-center"
            v-for="item in product?.ProductImages"
          >
            <img
              :src="`http://localhost:5237/api/images?filename=${item.Name}`"
            />
          </div>
        </a-carousel>
      </div>
      <div class="product-purchase">
        <div class="product-versions">
          <div class="versions-title text-bold mb-12">
            Chọn phiên bản sản phẩm
          </div>
          <div class="list-product-version flex flex-wrap">
            <div
              class="product-version p-8 mw-25-pc flex items-center content-center br-4 cursor-pointer flex-column"
              :class="[{ active: item.ID == versionSelected?.ID }]"
              v-for="item in product?.ProductVersions"
              @click="handleSelectProductVersion(item)"
            >
              <div class="version-name text-bold fs-12">
                {{ item.VersionName }}
              </div>
              <div class="version-price fs-13">
                {{ formatCurrencyDisplay(item.Price) }}
              </div>
            </div>
          </div>
        </div>
        <div class="box-order">
          <div class="order-quantity flex py-16 items-center gap-10">
            <div>{{ t('i18nCommon.Quantity') }}</div>
            <div class="flex">
              <e-button :config="decreaseQuantityButtonConfig">-</e-button>
              <a-input-number
                ref="orderQuantityInputRef"
                v-model:value="orderQuantity"
                v-bind="orderQuantityInputConfig"
              />
              <e-button :config="increaseQuantityButtonConfig">+</e-button>
            </div>
            <div>
              {{
                t('i18nCommon.ProductAvailable', {
                  quantity: versionSelected?.Quantity,
                })
              }}
            </div>
          </div>
          <a-space wrap>
            <e-button :config="addToCartButton">
              <div class="icon-add-to-cart"></div>
            </e-button>
            <e-button :config="buyButton">
              <div class="icon-add-to-cart"></div>
            </e-button>
          </a-space>
        </div>
      </div>
    </div>

    <div class="product-information flex">
      <div
        class="product-description bg-white p-16 br-8 shadow-default mr-12"
        v-html="product?.Description"
      ></div>
      <div class="technical-content br-8 p-16 bg-white">
        <div class="text-bold fs-16">
          {{ $t('i18nCommon.TechnicalInformation') }}
        </div>
        <div class="technical-content-info br-20">
          <div
            class="technical-content-item flex content-space-between p-8"
            :class="[{ 'bg-gray': index % 2 == 0 }, { 'br-t-20': index == 0 }]"
            v-for="(item, index) in versionSelected?.TechnicalContentParse"
          >
            <p class="w-40">{{ item?.Caption }}</p>
            <div class="w-50" v-html="item?.Value"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CartApi from '@/apis/cart/cart-api';
import ProductApi from '@/apis/product/product-api';
import { EButton, type ButtonConfig } from '@/components/controls/e-button';
import { useCookie } from '@/composable/clientStorage/useCookie';
import { setLocalStorage } from '@/composable/clientStorage/useLocalStorage';
import { formatCurrencyDisplay } from '@/composable/format/price';
import { check } from '@/composable/http/use-response';
import { useWebSocket } from '@/composable/socket/use-web-socket';
import { Product, ProductVersion } from '@/entities';
import { CartItem } from '@/entities/cart/cart-entity';
import { PurchaseRequest } from '@/entities/purchase/purchase-entity';
import i18n from '@/i18n';
import { useUserStore } from '@/store';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { CarouselProps, InputNumberProps, message } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const props = defineProps<{}>();
const t = i18n.global.t;
const product = ref<Product>();
const router = useRouter();
const { setCookie } = useCookie();
const { setValue } = useUserStore();

//#region config
const buyButton = reactive<ButtonConfig>({
  title: t('i18nCommon.Purchase'),
  IsShowIcon: true,
  IconName: 'ShoppingCartOutlined',
  type: 'primary',
  size: 'large',
  onClick: async () => {
    const purchase = {
      ProductItems: [
        { OrderQuantity: orderQuantity.value, ID: versionSelected.value?.ID },
      ],
    } as PurchaseRequest;

    setLocalStorage('PurchaseRequest', purchase);

    router.push('/order');
  },
});

const addToCartButton = reactive<ButtonConfig>({
  title: t('i18nCommon.AddToCart'),
  IsShowIcon: true,
  IconName: 'ShoppingCartOutlined',
  size: 'large',
  onClick: async (e) => {
    const item = {
      ProductItemID: versionSelected.value?.ID as any,
      ProductID: product.value?.ID as any,
      Quantity: orderQuantity.value,
    } as CartItem;
    const res = await CartApi.addToCart(item);
    const { isSuccess, data } = check(res);
    if (isSuccess) {
      message.success(t('i18nCommon.AddToCartSuccess'));
      setValue('Cart', data.Data);
    }
  },
});

const itemGalleryConfig = ref<CarouselProps>({
  dots: false,
  arrows: true,
  centerPadding: '10px',
});

const orderQuantityInputConfig = reactive<InputNumberProps>({
  min: 1,
  max: 3,
  controls: false,
});

const increaseQuantityButtonConfig = reactive<ButtonConfig>({
  onClick() {
    //@ts-ignore
    if (orderQuantity.value < orderQuantityInputConfig.max)
      orderQuantity.value++;
  },
});
const decreaseQuantityButtonConfig = reactive<ButtonConfig>({
  onClick() {
    if (orderQuantity.value > 1) orderQuantity.value--;
  },
});
//#endregion

const carouselKey = ref(0);
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
    const isSuccess = check(res!);
    if (isSuccess) {
      product.value = res?.data?.Data as Product;
      if (product.value?.ProductVersions?.length) {
        handleSelectProductVersion(product.value.ProductVersions[0]);
      }
    }

    console.log(product.value);
  }
}

//#region select product

const versionSelected = ref<ProductVersion>();

function handleSelectProductVersion(productVersion: ProductVersion) {
  if (productVersion?.TechnicalContent) {
    productVersion.TechnicalContentParse = JSON.parse(
      productVersion.TechnicalContent
    );
  }
  orderQuantityInputConfig.max = productVersion.Quantity;
  versionSelected.value = productVersion;
}

//#endregion

//#region purchase
const orderQuantity = ref(1);

//#endregion

//#region socket
const socketMessage = reactive<{ [key: string]: any }>({});
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
.product-versions {
  .list-product-version {
    gap: 10px;
    .product-version {
      &.active {
        border: 1px solid var(--app-primary-color);
        position: relative;
        &::after {
          background-color: #d70018;
          border-radius: 0 0 10px 0;
          color: #fff;
          content: '✓';
          font-size: 10px;
          height: 13px;
          left: 0;
          padding-bottom: 15px;
          padding-left: 4px;
          position: absolute;
          top: 0;
          width: 18px;
        }
      }
      border: 1px solid var(--app-border-color-dark-gray);

      .version-name {
      }
    }
  }
}

.technical-content {
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  &-info {
    border: 1px solid var(--app-border-color-gray);
    margin-top: 12px;
  }
}

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
</style>
@/composable/clientStorage/useCookie
