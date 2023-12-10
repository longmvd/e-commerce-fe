<template>
  <a-result
    status="403"
    title="403"
    sub-title="Bạn không được phép truy cập tài nguyên này"
  >
    <template #extra>
      <a-button type="primary"
        ><router-link :to="{ name: 'Home' }">{{
          $t('i18nCommon.BackToHome')
        }}</router-link></a-button
      >
    </template>
  </a-result>
</template>

<script setup lang="ts"></script>

<style scoped></style>
