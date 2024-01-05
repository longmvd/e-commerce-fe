<template>
  <div class="order-form" v-if="orderProcess == OrderProcess.Init">
    <div class="order-form-title mt-12 flex flex-center fs-20 text-bold">
      {{ $t('i18nCommon.OrderInformation') }}
    </div>
    <a-form
      ref="orderForm"
      :layout="formLayout"
      :model="formModel"
      v-bind="formConfig"
    >
      <a-form-item :name="['Items']">
        <order-item :items="orderItems"></order-item>
        <div class="cart-footer">
          <div class="text-bold fs-18 flex content-between">
            <span class="item-price--show text-bold">Tổng số tiền: </span>
            <span class="item-price--show color-primary">{{
              CalculateTotalPriceAfterDiscount(orderItems)
            }}</span>
          </div>
        </div>
      </a-form-item>
      <a-form-item
        :label="$t('i18nCommon.PaymentMethod')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        :name="['Payment', 'PaymentMethodID']"
      >
        <a-select
          v-model:value="formModel.Payment.PaymentMethodID"
          v-bind="selectPaymentConfig"
        ></a-select>
      </a-form-item>

      <a-form-item
        :label="$t('i18nCommon.FullName')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="CustomerName"
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
        :name="['Shipment', 'PhoneNumber']"
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
        name="Email"
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
        :name="['Shipment', 'City']"
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
        :name="['Shipment', 'District']"
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
        :name="['Shipment', 'Ward']"
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
        :name="['Shipment', 'Address']"
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
        <a-button type="primary" v-bind="purchaseButtonConfig">
          {{ $t('i18nCommon.Purchase') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
  <div v-else-if="orderProcess == OrderProcess.Payment"></div>
  <div v-else>
    <order-result :order="orderResultModel"> </order-result>
  </div>
</template>

<script lang="ts" setup>
import purchaseApi, {
  default as PurchaseApi,
} from '@/apis/purchase/purchase-api';
import { getLocalStorage } from '@/composable/clientStorage/useLocalStorage';
import { CalculateTotalPriceAfterDiscount } from '@/composable/format/price';
import { check } from '@/composable/http/use-response';
import { useWebSocket } from '@/composable/socket/use-web-socket';
import { OrderDto } from '@/dto/order-dto/order-dto';
import { OrderItemEntity } from '@/entities/order';
import { PaymentMethod } from '@/entities/payment/payment';
import { ModelState } from '@/enums/model-state';
import { OrderStatus } from '@/enums/order-enum';
import i18n from '@/i18n';
import { useUserStore } from '@/store';
import { ButtonProps, FormInstance, FormProps } from 'ant-design-vue';
import { SelectProps } from 'ant-design-vue/lib/vc-select';
import { computed, reactive, ref } from 'vue';
import OrderItem from './OrderItem.vue';
import OrderResult from './OrderResult.vue';

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

enum OrderProcess {
  Init = 1,
  Payment = 2,
  Result = 3,
}

const orderForm = ref<FormInstance>();
const orderProcess = ref<OrderProcess>(OrderProcess.Init);
const orderResultModel = ref<OrderDto>({
  CustomerName: '',
  Payment: {
    PaymentMethod: null,
  } as any,
  Shipment: null as any,
  //   ID: 133,
  //   UserID: '376d0bf2-1e76-4dd7-bc18-d69a7ee74af3',
  //   Status: 2,
  //   Payment: {
  //     ID: 0,
  //     UserID: null,
  //     OrderID: 133,
  //     PaymentMethodID: 1,
  //     Status: 0,
  //   },
  //   Items: [
  //     {
  //       ID: 129,
  //       OrderID: 133,
  //       ProductItemID: 0,
  //       Quantity: 1,
  //       Unit: null,
  //       Price: 10000,
  //       Discount: 0.5,
  //       ModifiedDate: '2023-11-18T21:01:41.6705844+07:00',
  //       ModifiedBy: '',
  //       CreatedDate: '2023-11-18T21:01:41.6702123+07:00',
  //       CreatedBy: '',
  //     },
  //     {
  //       ID: 129,
  //       OrderID: 133,
  //       ProductItemID: 0,
  //       Quantity: 1,
  //       Discount: 0.5,
  //       Price: 10000,
  //       ModifiedDate: '2023-11-18T21:01:41.6705844+07:00',
  //       ModifiedBy: '',
  //       CreatedDate: '2023-11-18T21:01:41.6702123+07:00',
  //       CreatedBy: '',
  //     },
  //     {
  //       ID: 129,
  //       OrderID: 133,
  //       ProductItemID: 0,
  //       Quantity: 2,
  //       Price: 10000,
  //       Discount: 0.5,
  //       ModifiedDate: '2023-11-18T21:01:41.6705844+07:00',
  //       ModifiedBy: '',
  //       CreatedDate: '2023-11-18T21:01:41.6702123+07:00',
  //       CreatedBy: '',
  //     },
  //   ],
  //   Shipment: {
  //     ID: 0,
  //     OrderID: 133,
  //     CustomerName: null,
  //     City: 'Hà Nội',
  //     District: 'Hà Đông',
  //     PhoneNumber: '0321232332',
  //     TrackingNumber: null,
  //     ShipDate: null,
  //     Address: 'Km 10, Mộ Lao, Hà Đông, Hà Nội',
  //   },
});

let paymentMethodName = '';

const selectPaymentConfig = reactive<SelectProps>({
  options: [{}],
  fieldNames: {
    value: 'ID',
    label: 'Name',
  },
  onChange(_, options) {
    paymentMethodName = (options as PaymentMethod).Name;
  },
});

const purchaseButtonConfig = reactive<ButtonProps>({
  htmlType: 'submit',
  loading: false,
  // onClick() {
  //   orderForm.value
  //     ?.validate()
  //     .then(() => {
  //       console.log('values', formModel, toRaw(formModel));
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     });
  // },
});

const formModel = reactive<OrderDto>({
  CustomerName: '',
  Payment: {
    State: ModelState.Insert,
  } as any,
  Shipment: {
    State: ModelState.Insert,
  } as any,
  State: ModelState.Insert,
});

const rules: Record<string, any> = {
  CustomerName: [
    {
      required: true,
      message: t('i18nCommon.RequiredMessage', {
        fieldName: t('i18nCommon.FullName'),
      }),
      trigger: 'change',
    },
  ],
  Shipment: {
    PhoneNumber: [
      {
        required: true,
        message: t('i18nCommon.RequiredMessage', {
          fieldName: t('i18nCommon.FullName'),
        }),
        trigger: 'change',
      },
    ],
  },
  Payment: {
    PaymentMethodID: [
      {
        required: true,
        message: t('i18nCommon.RequiredMessage', {
          fieldName: t('i18nCommon.PaymentMethod'),
        }),
        trigger: 'change',
      },
    ],
  },

  Email: [],
  City: [],
  District: [],
  Ward: [],
  Address: [],
};

const userInfo = useUserStore();

const formConfig = reactive<FormProps>({
  onValuesChange(e) {
    // console.log(e);
  },
  rules: rules,
  onSubmit(e) {
    // console.log(e);
  },

  onFinish: async (e) => {
    purchaseButtonConfig.loading = true;
    e.UserID = userInfo.user.UserID;
    if (!e?.Shipment?.ReceiverName) {
      e.Shipment.ReceiverName = e?.CustomerName;
    }
    e.Items?.forEach((item: OrderItemEntity) => {
      item.State = ModelState.Insert;
    });

    const res = await purchaseApi.purchase(e);

    const { isSuccess, data } = check(res);
    if (isSuccess) {
      orderResultModel.value = data?.Data;
      switch (data?.Data?.Payment?.PaymentMethodID) {
        case 1:
          orderProcess.value = OrderProcess.Result;
          orderResultModel.value.Status = OrderStatus.Success;
          orderResultModel.value.Payment.PaymentMethod = {
            Name: paymentMethodName,
          };
          break;
        default:
          break;
      }
      if (data?.Data?.Payment?.PaymentMethodID == 1) {
      }
      console.log(data);
    }
  },
  // model: formModel,
});

//#endregion

const orderItems = ref<OrderItemEntity[]>([]);

async function getData() {
  const purchase = getLocalStorage('PurchaseRequest');
  if (purchase) {
    let purchaseParse = purchase;
    const res = await PurchaseApi.initPurchase(purchaseParse);
    const { isSuccess, data } = check(res);

    if (isSuccess) {
      orderItems.value = data.Data?.Items;
      formModel.Items = data.Data?.Items;

      selectPaymentConfig.options = data.Data?.PaymentMethods;
    }
  } else {
    // notify error back to previous
  }
}
//#region handle create order

//#region checkout
useWebSocket({
  handleOnSocketMessage(event) {
    console.log(event);
    if (event.data) {
      let checkoutUrl = JSON.parse(event.data)?.Url;
      if (checkoutUrl) {
        window.location.replace(checkoutUrl);
      }
    }
    purchaseButtonConfig.loading = false;
    purchaseButtonConfig.disabled = true;
  },
  // @ts-ignore
  handleOnSocketError(event) {
    // console.log(event);
  },
});
//#endregion
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
@/composable/clientStorage/useCookie
