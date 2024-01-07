<template>
  <a-layout-footer class="bg-white">
    <!-- <a-row :gutter="[32, 16]">
      <a-col :span="6">
        <a-row>
          <a-col :span="24">Hnag</a-col>
        </a-row>
        <a-row>
          <a-col :span="24">hang 2</a-col>
        </a-row>
      </a-col>
      <a-col :span="6"> Col2</a-col>
      <a-col :span="6"> Col3</a-col>
      <a-col :span="6"> Col4</a-col>
    </a-row> -->
    <a-row :gutter="[16, 24]">
      <a-col
        v-for="item in footerBoxs"
        v-bind="{
          lg: 6,
          xs: 24,
          md: 12,
        }"
      >
        <div class="footer-box-title">{{ item.Title }}</div>
        <a-row v-for="boxItem in item.BoxItem" v-if="!item.IsHorizontal">
          <div class="box-item-wrap mt-6">
            <div v-if="boxItem.Title" class="footer-box-item-title">
              {{ boxItem.Title }}
            </div>
            <img
              v-if="boxItem.ImageUrl"
              class="footer-box-item-image"
              :src="boxItem.ImageUrl"
            />
          </div>
        </a-row>
        <a-row v-else>
          <a-col v-for="boxItem in item.BoxItem">
            <div class="box-item-wrap mt-8 mr-4">
              <div v-if="boxItem.Title" class="footer-box-item-title">
                {{ boxItem.Title }}
              </div>
              <img
                v-if="boxItem.ImageUrl"
                class="footer-box-item-image"
                :src="boxItem.ImageUrl"
              />
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-layout-footer>
</template>
<script setup lang="ts">
import { FooterBox } from '@/entities';
import { ref } from 'vue';

const footerBoxs = ref<FooterBox[]>([
  {
    ID: 1,
    Order: 1,
    Title: 'Tổng đài hỗ trợ miễn phí',
    BoxItem: [
      {
        ID: 1,
        Title: 'Gọi mua hàng 1800.2044 (7h30 - 22h00)',
      },
      {
        ID: 2,
        Title: 'Gọi khiếu nại 1800.2063 (8h00 - 21h30)',
      },
      {
        ID: 3,
        Title: 'Gọi bảo hành 1800.2064 (8h00 - 21h00)',
      },
    ],
  },
  {
    ID: 2,
    Order: 2,
    Title: 'Thông tin và chính sách',
    BoxItem: [
      {
        ID: 1,
        Title: 'Mua hàng trả góp Online',
      },
      {
        ID: 2,
        Title: 'Tra thông tin đơn hàng',
      },
      {
        ID: 3,
        Title: 'Tra điểm Member',
      },
      {
        ID: 4,
        Title: 'Xem ưu đãi Member',
      },
      {
        ID: 5,
        Title: 'Tra thông tin bảo hành',
      },
      {
        ID: 6,
        Title: 'Tra cứu hoá đơn điện tử',
      },
      {
        ID: 7,
        Title: 'Thông tin hoá đơn mua hàng',
      },
      {
        ID: 8,
        Title: 'Trung tâm bảo hành chính hãng',
      },
      {
        ID: 9,
        Title: 'Quy định về việc sao lưu dữ liệu',
      },
    ],
  },
  {
    ID: 3,
    Order: 3,
    Title: 'Dịch vụ và thông tin khác',
    BoxItem: [
      {
        ID: 1,
        Title: 'Khách hàng doanh nghiệp (B2B)',
      },
      {
        ID: 2,
        Title: 'Ưu đãi thanh toán',
      },
      {
        ID: 3,
        Title: 'Quy chế hoạt động',
      },
      {
        ID: 4,
        Title: 'Chính sách Bảo hành',
      },
      {
        ID: 5,
        Title: 'Liên hệ hợp tác kinh doanh',
      },
      {
        ID: 6,
        Title: 'Tuyển dụng',
      },
      {
        ID: 7,
        Title: 'Dịch vụ bảo hành điện thoại',
      },
      {
        ID: 8,
        Title: 'Dịch vụ bảo hành mở rộng',
      },
      {
        ID: 9,
        Title: 'Quy định về việc sao lưu dữ liệu',
      },
    ],
  },
  {
    ID: 4,
    Order: 4,
    Title: 'Kết nối với ECommerce',
    IsHorizontal: true,
    BoxItem: [
      {
        ID: 1,
        ImageUrl: '/src/assets/images/ecommerce-facebook.png',
      },
      {
        ID: 2,
        ImageUrl: '/src/assets/images/ecommerce-instagram.png',
      },
      {
        ID: 3,
        ImageUrl: '/src/assets/images/ecommerce-youtube.png',
      },
      {
        ID: 4,
        ImageUrl: '/src/assets/images/ecommerce-tiktok.png',
      },
      {
        ID: 5,
        ImageUrl: '/src/assets/images/ecommerce-zalo.png',
      },
    ],
  },
  {
    ID: 1,
    Order: 1,
    Title: 'Tổng đài hỗ trợ miễn phí',
    BoxItem: [
      {
        ID: 1,
        Title: 'Gọi mua hàng 1800.2044 (7h30 - 22h00)',
      },
      {
        ID: 2,
        Title: 'Gọi khiếu nại 1800.2063 (8h00 - 21h30)',
      },
      {
        ID: 3,
        Title: 'Gọi bảo hành 1800.2064 (8h00 - 21h00)',
      },
    ],
  },
  {
    ID: 1,
    Order: 1,
    Title: 'Tổng đài hỗ trợ miễn phí',
    BoxItem: [
      {
        ID: 1,
        Title: 'Gọi mua hàng 1800.2044 (7h30 - 22h00)',
      },
      {
        ID: 2,
        Title: 'Gọi khiếu nại 1800.2063 (8h00 - 21h30)',
      },
      {
        ID: 3,
        Title: 'Gọi bảo hành 1800.2064 (8h00 - 21h00)',
      },
    ],
  },
] as FooterBox[]);
</script>
<style lang="scss" scoped>
.footer-box-title {
  font-size: 16px;
  font-weight: 500;
  &-item-title {
    font-size: 12px;
  }
}

.box-item-wrap {
  font-size: 12px;
}
</style>
