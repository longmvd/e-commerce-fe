<template>
  <div class="product-manage-wrap">
    <div class="text-bold fs-18 my-16">Quản lý sản phẩm</div>
    <div class="table-tool-bar mb-12 flex">
      <div class="left">
        <a-input v-bind="searchBoxConfig">
          <template #prefix> <search-outlined /> </template
        ></a-input>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :scroll="{ x: 1500, y: 300 }"
      v-bind="tableConfig"
      @resizeColumn="handleResizeColumn"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'operation'">
          <div class="editable-row-operations">
            <e-button
              :config="{
                ...editButtonConfig,
                onClick() {
                  handleEditProduct(record);
                },
              }"
            />
            <e-button
              :config="{
                ...deleteButtonConfig,
                onClick() {
                  showDeleteConfirm(record);
                  // handleDeleteProduct(record);
                },
              }"
            />
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import productApi from '@/apis/product/product-api';
import { ButtonConfig, EButton } from '@/components';
import { check } from '@/composable/http/use-response';
import { Product } from '@/entities';
import { PagingRequest } from '@/entities/paging/paging-request';
import i18n from '@/i18n';
import { convertPagination } from '@/utils';

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue';
import {
  InputProps,
  Modal,
  TablePaginationConfig,
  message,
  type TableColumnsType,
  type TableProps,
} from 'ant-design-vue';
import { createVNode, h, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const t = i18n.global.t;

const router = useRouter();
//#region config table

let debounceSearch: any = null;
const searchBoxConfig: InputProps = {
  bordered: true,
  onInput(e) {
    if (debounceSearch) {
      clearTimeout(debounceSearch);
    }
    debounceSearch = setTimeout(() => {
      getData({
        ...convertPagination(tableConfig.pagination as TablePaginationConfig),
        QuickSearch: {
          SearchValue: e.target.value,
          Columns: 'ProductName,Description',
        },
      });
    }, 2000);
  },
};
const tableConfig = reactive<TableProps>({
  pagination: {
    total: 0,
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
  },

  onChange(pag, filters, sorter) {
    console.log(pag, filters, sorter);
    getData(convertPagination(pag));
  },
  // rowSelection: {
  //   onSelect(record, selected, selectedRow) {
  //     console.log(record, selected, selectedRow);
  //   },
  // },
  // (data: DataType, index?: number, column?: ColumnType<any>) => AdditionalProps;
  // customRow(data, index, column) {
  //   return {
  //     onClick(e) {
  //       console.log(data);
  //     },
  //   };
  // },
});

const columns = ref<TableColumnsType>([
  {
    title: 'Tên sản phẩm',
    width: 200,
    dataIndex: 'ProductName',
    key: 'ProductName',
    resizable: true,
  },
  {
    title: 'Mô tả',
    width: 200,
    dataIndex: 'Description',
    key: 'ProductName',
    resizable: true,
  },
  // { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  {
    title: 'Tên hãng',
    dataIndex: 'BrandName',
    key: '1',
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
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
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
    width: 60,
  },
]);

const dataSource = ref<Product[]>([]);
//#endregion

//#region config button
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

//#endregion

//#region handle data
(async () => {
  await getData({
    PageIndex: 1,
    PageSize: 20,
  });
})();

async function getDataDefault() {}

async function getData(pagination: PagingRequest) {
  const res = await productApi.getPaging(pagination);
  const { isSuccess, data } = check(res);
  if (isSuccess) {
    console.log(data.Data.PageData);
    dataSource.value = data.Data.PageData;
    if (tableConfig.pagination) {
      tableConfig.pagination = {
        ...tableConfig.pagination,
        ...convertPagination(pagination, data.Data.Total),
      };
    }
  }
}

async function handleDeleteProduct(product: Product) {
  const res = await productApi.delete(product);
  const { isSuccess, data } = check(res);
  if (isSuccess) {
    message.success(t('i18nCommon.DeleteSuccess'));
    getData({
      PageIndex: 1,
      PageSize: (tableConfig?.pagination as TablePaginationConfig).pageSize,
    });
  }
}

//#endregion

//#region modal
const showDeleteConfirm = (product: Product) => {
  Modal.confirm({
    title: 'Are you sure delete this task?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      try {
        await handleDeleteProduct(product);
      } catch {
        return console.log('Oops errors!');
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

function handleEditProduct(product: Product) {
  if (product?.ID) {
    router.push(`product/${product?.ID?.toString()}`);
  }
}

//#endregion

//#region handle events

function handleResizeColumn(w: number, col: any) {
  col.width = w;
}
//#endregion
</script>

<style scoped lang="scss">
.table-tool-bar {
  .left {
    width: 240px;
  }
}
</style>
