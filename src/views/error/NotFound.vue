<template>
  <a-result status="404" title="404" sub-title="Không tìm thấy tài nguyên">
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
