<template>
  <div class="form-wrapper">
    <div class="checkout-status flex items-center content-center">
      <div class="success" v-if="isSuccess">Thanh toán thành công</div>
      <div class="failed" v-else>Thanh toán thất bại</div>
    </div>
    <div class="flex content-center">
      <e-button :config="backToHomeButtonConfig"></e-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonConfig, EButton } from '@/components';
import i18n from '@/i18n';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isSuccess = ref(JSON.parse(route.query.success as string));
const t = i18n.global.t;
const backToHomeButtonConfig = reactive<ButtonConfig>({
  title: t('i18nCommon.BackToHome'),
  type: 'primary',
  onClick() {
    router.push('/');
  },
});
</script>

<style lang="scss">
.form-wrapper {
  margin: 0 20%;
  background-color: white;
  padding: 12px;
}
</style>
