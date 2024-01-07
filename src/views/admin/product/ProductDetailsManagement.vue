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
                class="ml-28"
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

          <a-row>
            <a-upload
              class="ml-28"
              list-type="picture-card"
              :file-list="fileList"
              @preview="handlePreview"
              v-bind="uploadConfig"
            >
              <div v-if="(formModel?.ProductImages?.length ?? 9) < 8">
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
          <a-row>
            <a-col span="24">
              <a-table
                v-bind="productVersionTableConfig"
                @resizeColumn="handleResizeColumn"
                :scroll="{ x: 1500, y: 500 }"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'ThumbnailImageName'">
                    <EImage
                      :config="{
                        imageName: record.ThumbnailImageName,
                      }"
                    ></EImage>
                    <!-- <a-image
                      width="100"
                      height="100"
                      :src="`${host}fileService/api/images?filename=${item?.ThumbnailImageName}`"
                    /> -->
                  </template>
                  <template v-else-if="column.key === 'tags'">
                    <span>
                      <a-tag
                        v-for="tag in record.tags"
                        :key="tag"
                        :color="
                          tag === 'loser'
                            ? 'volcano'
                            : tag.length > 5
                            ? 'geekblue'
                            : 'green'
                        "
                      >
                        {{ tag.toUpperCase() }}
                      </a-tag>
                    </span>
                  </template>
                  <template v-if="column.key === 'operation'">
                    <div class="editable-row-operations">
                      <e-button
                        :config="{
                          ...editButtonConfig,
                          // onClick() {
                          //   handleEditProduct(record);
                          // },
                        }"
                      />
                      <e-button
                        :config="{
                          ...deleteButtonConfig,
                          // onClick() {
                          //   showDeleteConfirm(record);
                          //   // handleDeleteProduct(record);
                          // },
                        }"
                      />
                    </div>
                  </template>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- <div>{{ formModel }}</div> -->
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import fileApi from '@/apis/file/file-api';
import imageApi from '@/apis/file/image-api';
import productApi from '@/apis/product/product-api';
import brandApi from '@/apis/product/product-brand-api';
import productTypeApi from '@/apis/product/product-type-api';
import { ButtonConfig, EButton } from '@/components';
import { EImage } from '@/components/controls/e-image';
import { trackChanges } from '@/composable/entity/use-entity';
import { check } from '@/composable/http/use-response';
import { Product, ProductImage } from '@/entities';
import { ModelState } from '@/enums/model-state';
import i18n from '@/i18n';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import type { TableProps, UploadProps } from 'ant-design-vue';
import {
  ColProps,
  FormInstance,
  FormProps,
  RowProps,
  message,
} from 'ant-design-vue';
import { SelectProps } from 'ant-design-vue/lib/vc-select';
import { UploadRequestError } from 'ant-design-vue/lib/vc-upload/interface';
import { cloneDeep, remove } from 'lodash';
import { computed, h, onUnmounted, reactive, ref, unref } from 'vue';
import { useRoute } from 'vue-router';

// const props = withDefaults(
//   defineProps<{
//     mode?: ModelState;
//   }>(),
//   {
//     mode: ModelState.Insert,
//   }
// );

const mode = ref(ModelState.Insert);

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
        const requestModel = unref(formModel);
        requestModel.ProductImages = getRequestModel();
        const res = await productApi.update(unref(formModel) as Product);
        const { isSuccess, data } = check(res);
        if (isSuccess) {
          message.success(t('i18nCommon.AddSuccess'));
          formModel.value = cloneDeep(data.Data);
          formModelOrigin.value = cloneDeep(data.Data);
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

const formModel = ref<Product>({
  ProductImages: [],
  TypeID: undefined,
  BrandID: undefined,
  Description: '',
});

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
const productVersionTableConfig = reactive<TableProps>({
  dataSource: computed(() => formModel.value.ProductVersions) as any,
  columns: [
    {
      title: 'Tên phiên bản',
      width: 200,
      dataIndex: 'VersionName',
      key: 'VersionName',
      resizable: true,
    },
    {
      title: 'Số lượng',
      width: 200,
      dataIndex: 'Quantity',
      key: 'Quantity',
      resizable: true,
    },
    // { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    {
      title: 'Tên hãng',
      dataIndex: 'ThumbnailImageName',
      key: 'ThumbnailImageName',
      width: 150,
      resizable: true,
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'TypeName',
      key: '1',
      width: 150,
      resizable: true,
    },
    {
      title: 'Năm sản xuất',
      dataIndex: 'ReleaseYear',
      key: 'ReleaseYear',
      width: 150,
      resizable: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
      width: 150,
      resizable: true,
    },

    {
      title: 'Ngày chỉnh sửa',
      dataIndex: 'ModifiedDate',
      key: 'ModifiedDate',
      width: 150,
      resizable: true,
    },

    {
      title: 'Giá bán',
      dataIndex: 'Price',
      key: 'Price',
      width: 150,
      resizable: true,
    },

    // { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
    // { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
    // { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
    // { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },

    {
      key: 'operation',
      fixed: 'right',
      width: 90,
    },
  ],
});

function handleResizeColumn(w: number, col: any) {
  col.width = w;
}

const formModelOrigin = ref<Product>({
  ProductImages: [],
});

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
  return trackChanges(
    formModelOrigin.value.ProductImages as any[],
    formModel.value.ProductImages as any[],
    'Name',
    [
      'CreatedBy',
      'CreatedDate',
      'ModifiedBy',
      'ModifiedDate',
      'ID',
      'ProductID',
    ]
  );
}
//#endregion

//#region upload file
const uploadConfig = reactive<UploadProps>({
  // action: 'http://localhost:5237/api/Files/UploadFile',
  customRequest({ file, onSuccess, onProgress, onError }) {
    fileApi.uploadFile(file).then((res) => {
      const { isSuccess, data } = check(res, false);
      if (isSuccess) {
        formModel.value.ProductImages?.push({
          Name: data as any as string,
          State: ModelState.Insert,
        } as ProductImage);
        console.log(formModel.value.ProductImages);
      } else {
        onError && onError({ message: 'Upload Lỗi' } as UploadRequestError, {});
      }
    });
  },
  onChange(event) {
    if (event.file.status == 'removed') {
      remove(
        formModel.value.ProductImages ?? [],
        (image) => image.Name == event.file.name
      );
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
    return formModel.value.ProductImages?.map((image) => ({
      url: imageApi.getContentURL(image.Name),
      uid: image.Name,
      name: image.Name,
    }));
  },
  set(value) {
    formModel.value.ProductImages = value?.map(
      (image) =>
        ({
          Name: image.name,
        } as ProductImage)
    );
  },
});

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
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
    const res = await productApi.getById(route.params.id as string);
    const { isSuccess, data } = check(res);
    if (isSuccess) {
      if (data.Data) {
        formModel.value = data.Data;
        formModelOrigin.value = cloneDeep(data.Data);
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
}

async function handleDeleteTempFile(event?: Event) {
  const tempFile =
    getRequestModel()
      ?.filter((data) => data.State == ModelState.Insert)
      .map((data) => data.Name) ?? [];
  if (tempFile.length > 0)
    await fileApi.deleteFiles(tempFile, { httpAgent: { keepAlive: true } });
}

window.addEventListener('beforeunload', handleDeleteTempFile);
onUnmounted(() => {
  handleDeleteTempFile(undefined);
  window.removeEventListener('beforeunload', handleDeleteTempFile);
  // setTimeout(() => {
  //   debugger;
  //   const tempFile =
  //     getRequestModel()
  //       ?.filter((data) => data.State == ModelState.Insert)
  //       .map((data) => data.Name) ?? [];
  //   fileApi.deleteFiles(tempFile);
  // }, 10000);
});
</script>

<style scoped></style>
