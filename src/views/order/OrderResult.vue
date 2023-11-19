<template>
  <div class="order-status">
    <div class="order-title fs-18 text-bold flex content-center">
      Hoàn tất đơn hàng
    </div>

    <div class="order-info">
      <div
        class="status my-12 br-8 flex items-center content-center"
        :class="[
          {
            success: order.Status == OrderStatus.Success,
            pending: order.Status == OrderStatus.Pending,
            failed: order.Status == OrderStatus.Failed,
          },
        ]"
      >
        <div class="icon-success--large"></div>
        <div
          class="status--success fs-18 text-uppercase text-success"
          v-if="order.Status == OrderStatus.Success"
        >
          {{ t('i18nCommon.OrderSuccess') }}
        </div>
        <div
          class="status--pending fs-18 text-uppercase text-warning"
          v-else-if="order.Status == OrderStatus.Pending"
        >
          {{ t('i18nCommon.OrderPending') }}
        </div>
        <div class="status--failed fs-18 text-uppercase text-danger" v-else>
          {{ t('i18nCommon.OrderFailed') }}
        </div>
      </div>
    </div>

    <div class="order-info">
      <div class="title text-bold text-uppercase fs-16">
        {{ t('i18nCommon.OrderInformation') }}
      </div>
      <div class="order-info-wrap">
        <div class="flex content-space-between fs-16 mb-16">
          <div class="label">{{ t('i18nCommon.ProductQuantity') }}</div>
          <div class="value text-bold">{{ productTotal }}</div>
        </div>
        <div class="flex content-space-between fs-16">
          <div class="label">{{ t('i18nCommon.OrderTotal') }}</div>
          <div class="value text-bold">
            {{ formatCurrencyDisplay(orderTotal ?? 0) }}
          </div>
        </div>
        <div class="flex content-space-between fs-16 mb-16">
          <div class="label">{{ t('i18nCommon.PaymentMethod') }}</div>
          <div class="value text-bold">
            {{ order.Payment?.PaymentMethod?.Name }}
          </div>
        </div>
      </div>
    </div>

    <div class="order-info">
      <div class="title text-bold text-uppercase fs-16">
        {{ t('i18nCommon.ShipmentInformation') }}
      </div>
      <div class="order-info-wrap">
        <div class="flex content-space-between fs-16 mb-16">
          <div class="label">{{ t('i18nCommon.Customer') }}</div>
          <div class="value text-bold">{{ order.CustomerName }}</div>
        </div>
        <div class="flex content-space-between fs-16 mb-16">
          <div class="label">{{ t('i18nCommon.PhoneNumber') }}</div>
          <div class="value">{{ order.Shipment.PhoneNumber }}</div>
        </div>
        <div class="flex content-space-between fs-16 mb-16">
          <div class="label">{{ t('i18nCommon.Email') }}</div>
          <div class="value text-bold">{{ order.Email }}</div>
        </div>
        <div class="flex content-space-between fs-16">
          <div class="label">{{ t('i18nCommon.Address') }}</div>
          <div class="value">
            {{
              `${order.Shipment.Address}, ${order.Shipment.Ward}, ${order.Shipment.District}, ${order.Shipment.City}`
            }}
          </div>
        </div>
      </div>
    </div>

    <div class="order-info">
      <div class="title text-bold text-uppercase fs-16">
        {{ t('i18nCommon.ProductList') }}
      </div>
      <div class="order-info-wrap">
        <order-item :items="order.Items ?? []"></order-item>
      </div>
    </div>

    <div class="flex content-space-between my-12">
      <e-button :config="backToHomeButtonConfig"></e-button>
      <e-button :config="viewOrder"></e-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EButton } from '@/components';
import { formatCurrencyDisplay } from '@/composable/format/price';
import { OrderDto } from '@/dto/order-dto/order-dto';
import { OrderStatus } from '@/enums/order-enum';
import i18n from '@/i18n';
import { ButtonProps } from 'ant-design-vue';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import OrderItem from './OrderItem.vue';

const t = i18n.global.t;

const props = defineProps<{
  order: OrderDto;
}>();

const productTotal = computed(() => {
  return props.order.Items?.reduce((total, item) => item.Quantity + total, 0);
});

const orderTotal = computed(() => {
  return props.order.Items?.reduce((total, item) => {
    const discountedPrice = item.Price - item.Price * (item?.Discount ?? 0);

    // Calculate the total price for each item (considering quantity)
    const totalPriceForProduct = discountedPrice * item.Quantity;

    // Accumulate the total price
    return total + totalPriceForProduct;
  }, 0);
});
const router = useRouter();
const backToHomeButtonConfig = reactive<ButtonProps>({
  type: 'primary',
  title: t('i18nCommon.BackToHome'),
  size: 'middle',
  onClick() {
    router.push('/');
  },
});

const viewOrder = reactive<ButtonProps>({
  type: 'default',
  title: t('i18nCommon.ViewOrder'),
  size: 'middle',
  onClick() {
    router.push('/');
  },
});
</script>

<style lang="scss" scoped>
.order-title {
  border-bottom: 1px solid rgba(145, 158, 171, 0.239);
}
.order-info {
  margin-top: 12px;
  &-wrap {
    background-color: var(--white-color);
    padding: 12px;
    border-radius: 8px;
    border: 1px solid rgba(145, 158, 171, 0.239);
    margin-top: 8px;
    .label {
      color: var(--text-blur-color);
    }
  }
  .status {
    min-height: 100px;
  }
  .title {
    color: #212b36;
  }
}
.order-status {
  margin: 0 20%;

  padding: 12px;
}
</style>

<style lang="scss">
.order-info {
  .status {
    &.success {
      background-color: rgb(173 217 173) !important;
    }
    &.failed {
      background-color: red !important;
    }
    &.pending {
      background-color: rgba(255, 193, 7, 0.12);
    }
  }
}
</style>
