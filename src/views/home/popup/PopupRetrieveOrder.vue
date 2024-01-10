<template>
  <a-modal
    :visible="true"
    :footer="null"
    :bodyStyle="{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }"
    :okText="t('i18nCommon.Save')"
    title="Tra cứu đơn hàng"
    @cancel="() => emit('close')"
  >
    <div class="content-wrapper">
      <a-space direction="horizontal">
        <a-input v-model:value="orderId" placeholder="Nhập mã đơn hàng" />
        <!-- <a-input
          v-model:value.lazy="value1"
          autofocus
          placeholder="Lazy usage"
        /> -->
        <e-button
          :config="{
            title: 'Tra cứu',
            onClick: handleRetrieveOrder,
          }"
        ></e-button>
      </a-space>
      <div class="order-info">
        <div v-if="!order?.ID"></div>
        <div v-else>
          <div class="flex my-12">
            <div>Mã đơn hàng: &nbsp;</div>
            <div>{{ order.ID }}</div>
          </div>
          <div class="flex mb-12" v-if="order?.Status">
            <div>Trạng thái đặt hàng: &nbsp;</div>
            <a-tag :color="getTag(order?.Status as any)">{{
              getStatus(order?.Status as any)
            }}</a-tag>
          </div>
          <div class="flex mb-12" v-if="order?.Payment?.Status">
            <div>Trạng thái thanh toán: &nbsp;</div>
            <a-tag :color="getTag(order?.Payment?.Status as any)">{{
              getStatus(order?.Payment?.Status as any)
            }}</a-tag>
          </div>
          <div class="flex mb-12" v-if="order?.Payment?.PaymentMethodID">
            <div>Phương thức thanh toán: &nbsp;</div>
            <a-tag :color="'cyan'">{{
              getPaymentMethod(order?.Payment?.PaymentMethodID as any)
            }}</a-tag>
          </div>
          <div class="flex">
            <div>Tổng tiền: &nbsp;</div>
            <a-tag :color="'gold'">{{
              formatCurrencyDisplay(order?.Payment?.Total as any)
            }}</a-tag>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import orderApi from '@/apis/order/order-api';
import { EButton } from '@/components';
import { formatCurrencyDisplay } from '@/composable/format/price';
import { check } from '@/composable/http/use-response';
import { Order } from '@/entities/order';
import { OrderStatus } from '@/enums';
import { PaymentStatusEnum } from '@/enums/payment-enum';
import i18n from '@/i18n';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
const t = i18n.global.t;
const emit = defineEmits<{
  (e: 'close'): void;
}>();
const orderId = ref('');
const order = ref<Order>();

const statuses = {
  [PaymentStatusEnum.Pending]: 'Pending',
  [PaymentStatusEnum.Failed]: 'Failed',
  [PaymentStatusEnum.Success]: 'Success',
  [PaymentStatusEnum.Refund]: 'Refund',
};

const tag = {
  [PaymentStatusEnum.Pending]: 'processing',
  [PaymentStatusEnum.Failed]: 'error',
  [PaymentStatusEnum.Success]: 'success',
  [PaymentStatusEnum.Refund]: 'waiting',
};

function getTag(status: PaymentStatusEnum) {
  return tag[status];
}

function getStatus(status: PaymentStatusEnum | OrderStatus) {
  return t(`i18nCommon.Payment.${statuses[status]}`);
}

function getPaymentMethod(value: any) {
  switch (value) {
    case 1:
      return 'Thanh toán khi nhận hàng';
    case 2:
      return 'Stripe';
  }
}

async function handleRetrieveOrder() {
  const res = await orderApi.retrieveOrder({ ID: orderId.value });
  if (res?.status == 404 || res?.status == 405) {
    message.warning('Tính năng đang phát triển');
  } else {
    const { isSuccess, data } = check(res);
    if (isSuccess) {
      order.value = data.Data;
    }
  }
}
</script>

<style scoped lang="scss">
.order-info {
  min-height: 200;
}
</style>
