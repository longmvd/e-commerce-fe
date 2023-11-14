<template>
  <div class="order-form">
    <div class="order-form-title mt-12 flex flex-center fs-20 text-bold">
      {{ $t('i18nCommon.OrderInformation') }}
    </div>
    <a-form
      ref="orderForm"
      :layout="formLayout"
      :model="formModel"
      :rules="rules"
    >
      <a-form-item>
        <order-item :items="orderItems"></order-item>
      </a-form-item>

      <a-form-item
        :label="$t('i18nCommon.FullName')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        :rules="[
          {
            required: true,
            message: t('i18nCommon.RequiredMessage', {
              fieldName: t('i18nCommon.FullName'),
            }),
            trigger: 'change',
          },
        ]"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.CustomerName"
        />
      </a-form-item>
      <a-form-item
        :label="$t('i18nCommon.PhoneNumber')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="PhoneNumber"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.Shipment.PhoneNumber"
        />
      </a-form-item>
      <a-form-item
        :label="$t('i18nCommon.Email')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="email"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.Email"
        />
      </a-form-item>
      <!-- Thông tin nhận hàng -->
      <a-form-item
        :label-col="{
          span: 10,
          offset: 10,
        }"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <div class="flex mt-8 text-uppercase">
          {{ $t('i18nCommon.ShipmentInformation') }}
        </div>
      </a-form-item>

      <a-form-item
        :label="$t('i18nCommon.ProvinceOrCity')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="city"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.Shipment.City"
        />
      </a-form-item>
      <a-form-item
        :label="$t('i18nCommon.District')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="district"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.Shipment.District"
        />
      </a-form-item>
      <a-form-item
        :label="$t('i18nCommon.Ward')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="ward"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.Shipment.Ward"
        />
      </a-form-item>
      <a-form-item
        :label="$t('i18nCommon.Address')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="address"
      >
        <a-input
          :placeholder="$t('i18nCommon.Street')"
          v-model:value="formModel.Shipment.Address"
        />
      </a-form-item>
      <a-form-item
        :wrapper-col="{
          offset: 0,
        }"
      >
        <div class="flex content-end"></div>
        <a-button type="primary" v-bind="purchaseButonConfig">
          {{ $t('i18nCommon.Purchase') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import PurchaseApi from '@/apis/purchase/purchase-api';
import { useCookie } from '@/composable/cookie/useCookie';
import { check } from '@/composable/http/use-response';
import { OrderDto } from '@/dto/order-dto/order-dto';
import { OrderItemEntity } from '@/entities/order';
import i18n from '@/i18n';
import { ButtonProps, FormInstance, FormProps } from 'ant-design-vue';
import { Rule } from 'ant-design-vue/lib/form/interface';
import { computed, reactive, ref, toRaw, watch } from 'vue';
import OrderItem from './OrderItem.vue';
const { getCookie } = useCookie();
const formLayout = ref('vertical');
const formItemLayout = computed(() => {
  return formLayout.value === 'horizontal'
    ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
    : {};
});
const t = i18n.global.t;
//#region form config

const orderForm = ref<FormInstance>();

const purchaseButonConfig = reactive<ButtonProps>({
  onClick() {
    orderForm.value
      ?.validate()
      .then(() => {
        console.log('values', formModel, toRaw(formModel));
      })
      .catch((error) => {
        console.log('error', error);
      });
  },
});

const formModel = reactive<OrderDto>({
  CustomerName: '',
  Payment: {} as any,
  Shipment: {} as any,
});

watch(formModel, (val) => {
  console.log(val);
});
const rules: Record<string, Rule[]> = {
  // customerName: [
  //   {
  //     required: true,
  //     message: t('i18nCommon.RequiredMessage', {
  //       fieldName: t('i18nCommon.FullName'),
  //     }),
  //     trigger: 'change',
  //   },
  // ],
  PhoneNumber: [
    {
      required: true,
      message: t('i18nCommon.RequiredMessage', {
        fieldName: t('i18nCommon.FullName'),
      }),
      trigger: 'change',
    },
  ],
  email: [],
  city: [],
  district: [],
  ward: [],
  address: [],
};

const formConfig = reactive<FormProps>({
  onValuesChange(e) {
    console.log(e);
  },
  // rules: rules,
  // model: formModel,
});

//#endregion

const orderItems = ref<OrderItemEntity[]>([
  {
    Name: 'iPhone 15 128GB | Chính hãng VN/A-Đen',
    Price: 21_990_000,
    Unit: 'Cái',
    Quantity: 1,
    OrderID: 1,
    ProductID: 2,
  },
  {
    Name: 'Tai nghe chụp tai Sony WH-1000XM4 -Bạc',
    Price: 1_990_000,
    Unit: 'Cái',
    Quantity: 1,
    OrderID: 1,
    ProductID: 2,
  },
  {
    Name: 'iPhone 15 128GB | Chính hãng VN/A-Đen',
    Price: 21_990_000,
    Unit: 'Cái',
    Quantity: 1,
    OrderID: 1,
    ProductID: 2,
  },
  {
    Name: 'iPhone 15 128GB | Chính hãng VN/A-Đen',
    Price: 21_990_000,
    Unit: 'Cái',
    Quantity: 1,
    OrderID: 1,
    ProductID: 2,
  },
]);

async function getData() {
  const purchase = getCookie('PurchaseRequest');
  if (purchase) {
    let purchaseParse = JSON.parse(purchase);
    const res = await PurchaseApi.initPurchase(purchaseParse);
    const { isSuccess, data } = check(res);

    if (isSuccess) {
      orderItems.value = data.Data?.Items;
    }
  } else {
    // notify error back to previous
  }
}
//#region handle create order
(async () => {
  await getData();
})();
//#endregion
</script>

<style lang="scss">
.order-form {
  margin: 0 20%;
  background-color: white;
  padding: 12px;
}
</style>
