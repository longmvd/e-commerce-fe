<template>
  <div class="form-wrapper">
    <div class="checkout-status flex items-center content-center">
      <a-result :status="isSuccess ? 'success' : 'error'" :title="title">
        <!-- sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait." -->
        <template #extra>
          <div class="flex content-center">
            <e-button :config="backToHomeButtonConfig"></e-button>
          </div>
        </template>
      </a-result>
    </div>
    <!-- <div class="flex content-center">
      <e-button :config="backToHomeButtonConfig"></e-button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ButtonConfig, EButton } from '@/components';
import i18n from '@/i18n';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isSuccess = ref(JSON.parse(route.query.success as string));
const title = computed(() =>
  isSuccess.value ? 'Thanh toán thành công' : 'Thanh toán thất bại'
);
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
