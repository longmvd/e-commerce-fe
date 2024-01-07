<template>
  <a-modal
    :visible="true"
    @cancel="handleCancel"
    :style="{ width: '80vw', height: '70vh', top: 0 }"
    :bodyStyle="{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }"
    @ok="handleSave"
    :okText="t('i18nCommon.Save')"
    :title="
      mode == ModelState.Insert
        ? t('i18nCommon.AddProductVersion')
        : t('i18nCommon.UpdateProductVersion')
    "
  >
    <!-- :footer="null" -->
    <div>
      <a-layout>
        <div class="flex content-space-between">
          <div class="my-18 text-bold fs-20"></div>
          <!-- <div class="right flex items-center">
            <e-button :config="saveButtonConfig"></e-button>
          </div> -->
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
                    v-model:value="formModel.VersionName"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="formColConfig">
                <a-form-item
                  :label="t('i18nCommon.ProductName')"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                  name="ProductName"
                >
                  <a-input
                    :placeholder="$t('i18nCommon.InputValue')"
                    v-model:value="formModel.Quantity"
                  />
                </a-form-item>
              </a-col>
              <!-- <a-col v-bind="formColConfig">
              <a-form-item
                :label="t('i18nCommon.Brand')"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                name="BrandID"
              >
                <a-select
                  :placeholder="t('i18nCommon.Brand')"
                  v-bind="selectBrandConfig"
                  v-model:value="formModel."
                ></a-select>
              </a-form-item>
            </a-col> -->
            </a-row>
            <a-row v-bind="formRowConfig">
              <a-col v-bind="formColConfig">
                <a-form-item
                  :label="t('i18nCommon.ReleaseYear')"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                  name="ReleaseYear"
                >
                  <a-input
                    :placeholder="$t('i18nCommon.InputValue')"
                    v-model:value="formModel.ReleaseYear"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="formColConfig">
                <a-form-item
                  :label="t('i18nCommon.Status')"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                  name="ProductStatus"
                >
                  <a-select
                    :placeholder="t('i18nCommon.Status')"
                    v-bind="selectBrandConfig"
                    v-model:value="formModel.ProductStatus"
                  ></a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <!-- <a-row v-bind="formRowConfig">
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
                  v-model:value="formModel."
                ></a-select>
              </a-form-item>
            </a-col>
          </a-row> -->
            <!-- <a-row>
            <a-col :span="24">
              <a-form-item
                class="ml-28"
                :label="t('i18nCommon.Description')"
                name="Description"
              >
                <ckeditor
                  v-model="formModel."
                  v-bind="{
                    editor: ClassicEditor,
                  }"
                ></ckeditor>
                
              </a-form-item>
            </a-col>
          </a-row> -->

            <a-row>
              <a-upload
                class="ml-28"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                v-bind="uploadConfig"
              >
                <div v-if="!formModel?.ThumbnailImageName">
                  <plus-outlined />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <a-modal
                :visible="previewVisible"
                :footer="null"
                @cancel="handleCancel"
              >
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </a-row>
            <a-row
              v-bind="formRowConfig"
              v-for="item in formModel.TechnicalContentParse"
            >
              <a-col v-bind="formColConfig">
                <a-form-item
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input
                    :placeholder="$t('i18nCommon.InputValue')"
                    v-model:value="item.Caption"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="formColConfig">
                <a-form-item
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input
                    :placeholder="$t('i18nCommon.InputValue')"
                    v-model:value="item.Value"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- <div>{{ formModel }}</div> -->
      </a-layout>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import fileApi from '@/apis/file/file-api';
import imageApi from '@/apis/file/image-api';
import brandApi from '@/apis/product/product-brand-api';
import productVersionApi from '@/apis/product/product-version-api';
import { ButtonConfig } from '@/components';
import { check } from '@/composable/http/use-response';
import { ProductVersion } from '@/entities';
import { ModelState } from '@/enums/model-state';
import i18n from '@/i18n';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import type { UploadProps } from 'ant-design-vue';
import {
  ColProps,
  FormInstance,
  FormProps,
  RowProps,
  message,
} from 'ant-design-vue';
import { SelectProps } from 'ant-design-vue/lib/vc-select';
import { UploadRequestError } from 'ant-design-vue/lib/vc-upload/interface';
import { cloneDeep } from 'lodash';
import { computed, h, reactive, ref, unref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = withDefaults(
  defineProps<{
    mode?: ModelState;
    modelValue: ProductVersion;
  }>(),
  {
    mode: ModelState.Insert,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: ProductVersion): void;
  (e: 'close'): void;
}>();

// const mode = ref(ModelState.Insert);

const t = i18n.global.t;

const route = useRoute();

const ckeditor = h(CKEditor.component);
const addProductForm = ref<FormInstance>();

const saveButtonConfig = reactive<ButtonConfig>({
  title: t('i18nCommon.Save'),
  onClick() {},
});

function handleSave() {
  addProductForm.value
    ?.validate()
    .then(async () => {
      console.log('values', formModel, unref(formModel));
      const requestModel = unref(formModel);
      formModel.value.TechnicalContent = JSON.stringify(
        formModel.value.TechnicalContentParse
      );
      const res = await productVersionApi.update(
        unref(formModel) as ProductVersion
      );
      const { isSuccess, data } = check(res);
      if (isSuccess) {
        message.success(t('i18nCommon.AddSuccess'));
        handleDeleteFile();
        formModel.value = cloneDeep(data.Data);
        // formModelOrigin.value = cloneDeep(data.Data);
        emit('update:modelValue', unref(formModel));
      }
    })
    .catch((error) => {
      console.log('error', error);
    })
    .finally(() => {
      emit('close');
    });
}

const selectBrandConfig = reactive<SelectProps>({
  options: [
    {
      Text: 'Mới',
      Value: 1,
    },
    {
      Text: 'Cũ',
      Value: 2,
    },
  ],
  fieldNames: {
    value: 'Value',
    label: 'Text',
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

// const selectTypeConfig = reactive<SelectProps>({
//   options: [],
//   fieldNames: {
//     value: 'ID',
//     label: 'TypeName',
//   },
//   onDropdownVisibleChange(isOpen) {
//     if (isOpen) {
//       getDataSelect(
//         async () => await productTypeApi.getAll(),
//         selectTypeConfig as any,
//         null
//       );
//     }
//   },
// });

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

const formModel = ref<ProductVersion>(
  cloneDeep(props.modelValue) ?? {
    VersionName: '',

    Price: 0,

    ThumbnailImageName: '',

    TechnicalContent: '',

    ProductStatus: 1,

    ReleaseYear: 1,

    Quantity: 1,

    ProductID: 1,

    GroupName: '',

    SortOrder: 1,
  }
);

watch(
  () => props.modelValue,
  (val) => (formModel.value = cloneDeep(val))
);

// ModifiedBy;

// ProductName;

// ProductStatus;

// ReleaseYear;

// TechnicalContent;

// 1;
const editButtonConfig = reactive<ButtonConfig>({
  icon: h(EditOutlined),
  shape: 'circle',
  IsShowIcon: true,
  type: 'link',
});

const deleteButtonConfig = reactive<ButtonConfig>({
  icon: h(DeleteOutlined),
  shape: 'circle',
  IsShowIcon: true,
  type: 'link',
});

function handleResizeColumn(w: number, col: any) {
  col.width = w;
}

const formModelOrigin = ref<ProductVersion>(cloneDeep(props.modelValue));

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

function getRequestModel() {
  // if (formModelOrigin.value.ThumbnailImageName) {
  //   if (formModel.value.ThumbnailImageName) {
  //   }
  // } else {
  // }
  // if (
  //   formModel.value.ThumbnailImageName !=
  //     formModelOrigin.value?.ThumbnailImageName &&
  //   formModelOrigin.value?.ThumbnailImageName
  // ) {
  //   tempFile = [formModelOrigin.value.ThumbnailImageName];
  // }
}
//#endregion

//#region upload file
const uploadConfig = reactive<UploadProps>({
  // action: 'http://localhost:5237/api/Files/UploadFile',
  customRequest({ file, onSuccess, onProgress, onError }) {
    fileApi.uploadFile(file).then((res) => {
      const { isSuccess, data } = check(res, false);
      if (isSuccess) {
        formModel.value.ThumbnailImageName = data as any as string;
        tempFile.push(data as any as string);
      } else {
        onError && onError({ message: 'Upload Lỗi' } as UploadRequestError, {});
      }
    });
  },
  onChange(event) {
    if (event.file.status == 'removed') {
      deleteFile.push(event.file.name);
      formModel.value.ThumbnailImageName = '';
    }
  },
});

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const fileList = computed<UploadProps['fileList']>({
  get() {
    return formModel.value.ThumbnailImageName
      ? [
          {
            url: imageApi.getContentURL(formModel.value.ThumbnailImageName),
            uid: formModel.value.ThumbnailImageName,
            name: formModel.value.ThumbnailImageName,
          },
        ]
      : [];
  },
  set(value) {
    formModel.value.ThumbnailImageName = value?.[0].name ?? '';
  },
});

const handleCancel = () => {
  handleDeleteTempFile();
  emit('close');
};
const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value =
    file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
//#endregion

(async () => {
  await getData();
})();

async function getData() {
  if (route?.params?.id) {
    const res = await productVersionApi.getById(formModel.value.ID as string);
    const { isSuccess, data } = check(res);
    if (isSuccess) {
      if (data.Data) {
        formModel.value = data.Data;
        formModel.value.TechnicalContentParse = JSON.parse(
          formModel.value.TechnicalContent
        );
        console.log(formModel.value.TechnicalContentParse);

        formModelOrigin.value = cloneDeep(data.Data);
        // getDataSelect(
        //   async () => await brandApi.getAll(),
        //   selectBrandConfig as any,
        //   null
        // );
        // getDataSelect(
        //   async () => await productTypeApi.getAll(),
        //   selectTypeConfig as any,
        //   null
        // );
      }
    }
  }
}

const tempFile: string[] = [];
const deleteFile: string[] = [];

async function handleDeleteTempFile(event?: Event) {
  getRequestModel();
  if (tempFile.length > 0)
    await fileApi.deleteFiles(tempFile, { httpAgent: { keepAlive: true } });
}

async function handleDeleteFile(event?: Event) {
  getRequestModel();
  if (deleteFile.length > 0)
    await fileApi.deleteFiles(deleteFile, { httpAgent: { keepAlive: true } });
}

window.addEventListener('beforeunload', handleDeleteTempFile);
// onUnmounted(() => {
//   handleDeleteTempFile(undefined);
//   window.removeEventListener('beforeunload', handleDeleteTempFile);
//   // setTimeout(() => {
//   //   debugger;
//   //   const tempFile =
//   //     getRequestModel()
//   //       ?.filter((data) => data.State == ModelState.Insert)
//   //       .map((data) => data.Name) ?? [];
//   //   fileApi.deleteFiles(tempFile);
//   // }, 10000);
// });
</script>

<style scoped></style>
