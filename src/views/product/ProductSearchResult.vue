<template>
  <div class="product-search-result-wrapper">
    <a-layout v-bind="layoutConfig">
      <div class="title text-bold fs-20 my-20">
        {{ t('i18nCommon.SearchResult') }}
      </div>
      <div class="search-results">
        <div v-if="dataSource?.length" class="flex flex-wrap">
          <div v-for="item in dataSource" class="result-item">
            <product-item :item="item" @itemClick="$emit('itemClick', item)">
            </product-item>
          </div>
        </div>
        <result v-else :title="t('i18nCommon.ResultNotFound')"></result>
      </div>
      <div class="flex content-end my-12">
        <Pagination v-bind="pagingConfig"> </Pagination>
      </div>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import productApi from '@/apis/product/product-api';
import ProductItem from '@/components/controls/item-gallery/ProductItem.vue';
import { check } from '@/composable/http/use-response';
import { Product } from '@/entities';
import { PagingRequest } from '@/entities/paging/paging-request';
import i18n from '@/i18n';
import { convertPagination } from '@/utils';
import { LayoutProps, Pagination, Result } from 'ant-design-vue';
import { PaginationProps } from 'ant-design-vue/lib/pagination';
import { computed, reactive, ref, unref, watch } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits<{
  (e: 'itemClick', item: Product): void;
}>();

const route = useRoute();

const searchValue = computed(() => route.query.search);

const dataSource = ref<Product[]>([]);

const layoutConfig = reactive<LayoutProps>({
  // style: {
  //   minHeight: '90vh',
  // },
});

const layoutContentConfig = reactive<LayoutProps>({});

const pagingConfig = ref<PaginationProps>({
  pageSize: 10,
  showSizeChanger: true,
  current: 1,
  onChange(page, pageSize) {
    getData({
      PageIndex: oldPageSize == pageSize ? page : 1,
      PageSize: pageSize,
      QuickSearch: {
        Columns: 'ProductName',
        SearchValue: searchValue.value as string,
      },
    });
  },
});

let oldPageSize = pagingConfig.value.pageSize;

const t = i18n.global.t;

async function getDataWhenTrigger() {
  await getData({
    ...convertPagination(unref(pagingConfig)),
    QuickSearch: {
      Columns: 'ProductName',
      SearchValue: searchValue.value as string,
    },
  });
}

(async () => {
  await getData({
    ...convertPagination(unref(pagingConfig)),
    QuickSearch: {
      Columns: 'ProductName',
      SearchValue: searchValue.value as string,
    },
  });
})();

async function getData(pagination: PagingRequest) {
  const res = await productApi.getPaging(pagination);
  const { isSuccess, data } = check(res);
  if (isSuccess) {
    dataSource.value = data.Data.PageData;
    if (pagingConfig.value) {
      pagingConfig.value = {
        ...unref(pagingConfig),
        ...convertPagination(pagination, data.Data.Total),
      };
    }
  }
}

watch(searchValue, (val) => {
  getDataWhenTrigger();
});
</script>

<style scoped lang="scss">
.search-result {
  min-height: 70vh;
  max-width: 90vh;
  overflow: auto;
}
.result-item {
  min-width: 260px;
}
.product-search-result-wrapper {
}
</style>
