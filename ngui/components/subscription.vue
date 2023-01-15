<script lang="ts" setup>
const { t } = useI18n()

const { data } = defineProps<{ data: any[] }>()

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'host', label: t('subscription.host') },
  { key: 'info', label: t('subscription.remarks') },
  { key: 'status', label: t('subscription.timeLastUpdate') }
]
</script>

<template>
  <ClientOnly>
    <ElTable :data="data">
      <ElTableColumn type="selection" width="55" />
      <ElTableColumn v-for="c in columns" :key="c.key" :prop="c.key" :label="c.label" />
      <ElTableColumn property="servers.length" :label="t('subscription.numberServers')" />
    </ElTable>
  </ClientOnly>
</template>
