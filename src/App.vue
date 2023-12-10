<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
    <router-view name="Management"></router-view>
    <!-- <the-admin-container v-else /> -->
  </a-config-provider>
</template>
<script setup lang="ts">
import en_US from 'ant-design-vue/lib/locale-provider/en_US';
import vi_VN from 'ant-design-vue/lib/locale-provider/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { computed, onMounted, provide, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useWebSocketInit } from './composable/socket/use-web-socket';
import { useUserStore } from './store';
const locale = ref(vi_VN);
// import { useI18n } from "vue-i18n";

const t = useI18n();

watch(
  () => t.locale.value,
  (val) => {
    dayjs.locale(t.locale.value);
    locale.value = val == 'en' ? en_US : vi_VN;
  }
);
const { user } = useUserStore();
const route = useRoute();

const isAdminPage = computed(
  () => user.Roles?.includes('ADMIN') && route.path.startsWith('/management')
);

provide('isAdminPage', isAdminPage);

onMounted(() => {
  useWebSocketInit();
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
