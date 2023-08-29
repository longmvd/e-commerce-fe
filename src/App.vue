<template>
  <a-config-provider :locale="locale">
    <the-container/>
  </a-config-provider>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import vi_VN from 'ant-design-vue/lib/locale-provider/vi_VN';
import en_US from 'ant-design-vue/lib/locale-provider/en_US';
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import TheContainer from './components/layouts/TheContainer.vue';

const locale = ref(vi_VN)
// import { useI18n } from "vue-i18n";

const t = useI18n();

watch(()=>t.locale.value, (val)=>{
  dayjs.locale(t.locale.value);
  locale.value = val == 'en' ? en_US : vi_VN
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
