<template>
  <div>
    <a-layout>
      <div class="flex content-space-between">
        <div class="my-18 text-bold fs-20">
          {{
            mode == ModelState.Insert
              ? t('i18nCommon.AddProduct')
              : t('i18nCommon.UpdateProduct')
          }}
        </div>
        <div class="right flex items-center">
          <e-button :config="saveButtonConfig"></e-button>
        </div>
      </div>
      <div>
        <a-form ref="addProductForm" :model="formModel" v-bind="formConfig">
          <a-row v-bind="formRowConfig">
            <a-col v-bind="formColConfig">
              <a-form-item
                :label="t('i18nCommon.ProductName')"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                name="ProductName"
              >
                <a-input
                  :placeholder="$t('i18nCommon.InputValue')"
                  v-model:value="formModel.ProductName"
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="formColConfig">
              <a-form-item
                :label="t('i18nCommon.Brand')"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                name="BrandID"
              >
                <a-select
                  :placeholder="t('i18nCommon.Brand')"
                  v-bind="selectBrandConfig"
                  v-model:value="formModel.BrandID"
                ></a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-bind="formRowConfig">
            <a-col v-bind="formColConfig">
              <a-form-item
                :label="t('i18nCommon.ProductType')"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                name="TypeID"
              >
                <a-select
                  :placeholder="t('i18nCommon.ProductType')"
                  v-bind="selectTypeConfig"
                  v-model:value="formModel.TypeID"
                ></a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item
                :label="t('i18nCommon.Description')"
                name="Description"
              >
                <ckeditor
                  v-model="formModel.Description"
                  v-bind="{
                    editor: ClassicEditor,
                  }"
                ></ckeditor>
                <!-- <a-input
                  :placeholder="$t('i18nCommon.InputValue')"
                  v-model:value="formModel.TypeID"
                /> -->
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div>{{ formModel }}</div>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import productApi from '@/apis/product/product-api';
import brandApi from '@/apis/product/product-brand-api';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import productTypeApi from '@/apis/product/product-type-api';
import { ButtonConfig, EButton } from '@/components';
import { check } from '@/composable/http/use-response';
import { Product } from '@/entities';
import { ModelState } from '@/enums/model-state';
import i18n from '@/i18n';
import CKEditor from '@ckeditor/ckeditor5-vue';
import {
  ColProps,
  FormInstance,
  FormProps,
  RowProps,
  message,
} from 'ant-design-vue';
import { SelectProps } from 'ant-design-vue/lib/vc-select';
import { h, reactive, ref, unref } from 'vue';
import { useRoute } from 'vue-router';

const props = withDefaults(
  defineProps<{
    mode?: ModelState;
  }>(),
  {
    mode: ModelState.Insert,
  }
);

const t = i18n.global.t;

const route = useRoute();

const ckeditor = h(CKEditor.component);
const addProductForm = ref<FormInstance>();

const saveButtonConfig = reactive<ButtonConfig>({
  title: t('i18nCommon.AddProduct'),
  onClick() {
    addProductForm.value
      ?.validate()
      .then(async () => {
        console.log('values', formModel, unref(formModel));
        const res = await productApi.update(unref(formModel) as Product);
        const { isSuccess } = check(res);
        if (isSuccess) {
          message.success(t('i18nCommon.AddSuccess'));
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  },
});

const selectBrandConfig = reactive<SelectProps>({
  options: [],
  fieldNames: {
    value: 'ID',
    label: 'BrandName',
  },
  onDropdownVisibleChange(isOpen) {
    if (isOpen) {
      getDataSelect(
        async () => await brandApi.getAll(),
        selectBrandConfig as any,
        null
      );
    }
  },
});

const selectTypeConfig = reactive<SelectProps>({
  options: [],
  fieldNames: {
    value: 'ID',
    label: 'TypeName',
  },
  onDropdownVisibleChange(isOpen) {
    if (isOpen) {
      getDataSelect(
        async () => await productTypeApi.getAll(),
        selectTypeConfig as any,
        null
      );
    }
  },
});

async function getDataSelect(
  callBack: any,
  selectConfig: SelectProps,
  param?: any
) {
  if (!selectConfig.options?.length) {
    let res = null;
    if (param) {
      res = await callBack(param);
    } else {
      res = await callBack();
    }
    const { isSuccess, data } = check(res);
    if (isSuccess) {
      selectConfig.options = data.Data;
    }
  }
}

//#region form config
const formItemLayout = ref({
  labelCol: { span: 5 },
  wrapperCol: { span: 14 },
});
const rules: Record<string, any> = {
  ProductName: [
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

const formModel = ref<Product>({});

const formRowConfig = reactive<RowProps>({
  gutter: 16,
});

const formColConfig = reactive<ColProps>({
  span: 12,
});

const formConfig = reactive<FormProps>({
  layout: 'horizontal',

  onValuesChange(e) {
    // console.log(e);
  },
  rules: rules,
  onSubmit(e) {
    // console.log(e);
  },

  onFinish: async (e) => {
    console.log(e);

    // purchaseButtonConfig.loading = true;
  },
  // model: formModel,
});

//#endregion

(async () => {
  await getData();
})();
async function getData() {
  if (route?.params?.id) {
    const res = await productApi.getById(route.params.id as string);
    const { isSuccess, data } = check(res);
    if (isSuccess) {
      formModel.value = data.Data;
      getDataSelect(
        async () => await brandApi.getAll(),
        selectBrandConfig as any,
        null
      );
      getDataSelect(
        async () => await productTypeApi.getAll(),
        selectTypeConfig as any,
        null
      );
    }
  }
}
</script>

<style scoped></style>
