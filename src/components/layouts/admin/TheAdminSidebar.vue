<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="Dashboard">
        <router-link :to="{ name: 'Dashboard' }">
          <pie-chart-outlined />
          <span>Dashboard</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="OrderManagement">
        <router-link :to="{ name: 'OrderManagement' }">
          <desktop-outlined />
          <span>Đơn hàng</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="ProductManagement">
        <router-link :to="{ name: 'ProductManagement' }">
          <desktop-outlined />
          <span>Sản phẩm</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>
          <span>
            <user-outlined />
            <span>Báo cáo</span>
          </span>
        </template>
        <a-menu-item key="3">Tom</a-menu-item>
        <a-menu-item key="4">Bill</a-menu-item>
        <a-menu-item key="5">Alex</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <team-outlined />
            <span>Người dùng</span>
          </span>
        </template>
        <a-menu-item key="6">Team 1</a-menu-item>
        <a-menu-item key="8">Team 2</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="9">
        <file-outlined />
        <span>File</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const collapsed = ref<boolean>(false);
const route = useRoute();
route.path;
const selectedKeys = ref<string[]>([route.name?.toString() ?? '']);
watch(
  () => route.name,
  (val) => {
    selectedKeys.value = [val?.toString() ?? ''];
  }
);

// onMounted(() => {
//   nextTick(() => {
//     selectedKeys.value = [route?.params?.pathMatch?.[1]];
//     console.log(route?.params);
//   });
// });
</script>

<style lang="scss" scoped></style>
