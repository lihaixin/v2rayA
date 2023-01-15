<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <header class="p-4 flex justify-between">
    <div class="text-large font-600 mr-3">V2RayA</div>

    <div class="flex space-x-2">
      <NuxtLink>{{ t('common.setting') }}</NuxtLink>
      <NuxtLink>{{ t("common.log") }}</NuxtLink>
      <NuxtLink>{{ t("common.about") }}</NuxtLink>
    </div>
  </header>
</template>
