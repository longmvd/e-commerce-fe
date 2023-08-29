<template>
  <a-row>
    <a-col>
      <div class="flex content-space-between">
        <div>
          <h2
            class="item-gallery-title"
            :style="{ textTransform: config?.textTransformTitle }"
          >
            {{ config?.title }}
          </h2>
        </div>
        <div>
          <div class="flex related-tag">
            <div class="related-tag__item" v-for="item in relatedTags">
              {{ item.Text }}
            </div>
          </div>
        </div>
      </div>
      <a-carousel v-bind="carouselConfig">
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
        <slot name="items">
          <div v-for="item in items">
            <div
              class="p-relative item-wrapper flex flex-column m-8 p-12 br-12"
            >
              <div
                class="flex content-center items-center item-percent"
                v-if="item.Discount"
              >
                <div class="item-percent-text text-bold">
                  {{ formatDiscountPercentText(item.Discount) }}
                </div>
              </div>
              <div class="item__image flex content-center items-center">
                <img :src="item.ImageUrl" alt="" class="item-img" />
              </div>
              <div class="item__name text-bold">{{ item.ProductName }}</div>
              <div class="item__price flex items-center mb-10">
                <div class="item__price--show">{{ item.Price }}</div>
                <div class="item__price--through ml-8">{{ item.Price }}</div>
              </div>
              <div class="item__promotion" v-html="item.Promotion"></div>
              <div class="free-ship-tag">Giao nhanh miễn phí</div>
            </div>
          </div>
        </slot>
      </a-carousel>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { formatDiscountPercentText } from "@/composable";
import { RelatedTag } from "@/entities";
import { Product } from "@/entities/product";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
import { CarouselProps } from "ant-design-vue";
import { ref } from "vue";
import { ItemGalleryConfig } from "./index";
const { config } = defineProps<{
  config?: ItemGalleryConfig;
}>();

const carouselConfig = ref<CarouselProps>({
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  ...config,
});

const items = ref<Product[]>([
  {
    ID: 1,
    ProductName: "Điện thoại IPhone 13 Promax",
    ImageUrl: "./src/assets/images/14_1_9_2_9.webp",
    Description: "",
    Price: 3_000_000,
    FreeShipping: true,
    Promotion: "",
    TradePrice: 3_000_000,
    Discount: 0.5,
    Star: 5,
  },
  {
    ID: 1,
    ProductName: "Điện thoại IPhone 13 Promax",
    ImageUrl: "./src/assets/images/14_1_9_2_9.webp",
    Description: "",
    Price: 3_000_000,
    FreeShipping: true,
    Promotion: "",
    TradePrice: 3_000_000,
    Discount: 0.5,
    Star: 5,
  },
  {
    ID: 1,
    ProductName: "Điện thoại IPhone 13 Promax",
    ImageUrl: "./src/assets/images/14_1_9_2_9.webp",
    Description: "",
    Price: 3_000_000,
    FreeShipping: true,
    Promotion: "",
    TradePrice: 3_000_000,
    Discount: 0.5,
    Star: 5,
  },
  {
    ID: 1,
    ProductName: "Điện thoại IPhone 13 Promax",
    ImageUrl: "./src/assets/images/14_1_9_2_9.webp",
    Description: "",
    Price: 3_000_000,
    FreeShipping: true,
    Promotion: "",
    TradePrice: 3_000_000,
    Discount: 0.5,
    Star: 5,
  },
  {
    ID: 1,
    ProductName: "Điện thoại IPhone 13 Promax",
    ImageUrl: "./src/assets/images/14_1_9_2_9.webp",
    Description: "",
    Price: 3_000_000,
    FreeShipping: true,
    Promotion: "",
    TradePrice: 3_000_000,
    Discount: 0.5,
    Star: 5,
  },
  {
    ID: 1,
    ProductName: "Điện thoại IPhone 13 Promax",
    ImageUrl: "./src/assets/images/14_1_9_2_9.webp",
    Description: "",
    Price: 3_000_000,
    FreeShipping: true,
    Promotion: "",
    TradePrice: 3_000_000,
    Discount: 0.5,
    Star: 5,
  },
  {
    ID: 1,
    ProductName: "Điện thoại IPhone 13 Promax",
    ImageUrl: "./src/assets/images/14_1_9_2_9.webp",
    Description: "",
    Price: 3_000_000,
    FreeShipping: true,
    Promotion: "",
    TradePrice: 3_000_000,
    Discount: 0.5,
    Star: 5,
  },
]);

const relatedTags = ref<RelatedTag[]>([
  {
    ID: 1,
    Url: "abc.com",
    Text: "Apple Watch",
  },
  {
    ID: 2,
    Url: "abc.com",
    Text: "Apple Watch",
  },
]);
</script>

<style lang="scss" scoped>
.item-gallery-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
}
// .ant-carousel :deep(.slick-slide) {
//   text-align: center;
//   height: 160px;
//   line-height: 160px;
//   background: #364d79;
//   overflow: hidden;
// }

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
// .ant-carousel :deep(.custom-slick-arrow:hover) {
//   opacity: 0.5;
// }

// .ant-carousel :deep(.slick-slide h3) {
//   color: #fff;
// }
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
      content: "";
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

.related-tag {
  &__item {
    background-color: var(--tag-bg-color);
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    color: #444;
    float: right;
    font-size: 13px;
    height: 34px;
    padding: 5px 10px;
    white-space: nowrap;
  }
}
</style>
