<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <VaNavbar color="primary" class="mb-3">
    <template #left>
      <VaNavbarItem>
        <h1 class="text-lg font-bold">V2RayA</h1>
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem>{{ t('common.setting') }}</VaNavbarItem>
      <VaNavbarItem>{{ t("common.log") }}</VaNavbarItem>
      <VaNavbarItem>{{ t("common.about") }}</VaNavbarItem>
    </template>
  </VaNavbar>
</template>
