<script lang="ts" setup>
const { t } = useI18n()

const { data } = defineProps<{
  data: any[]
}>()

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: t('server.name') },
  { key: 'address', label: t('server.address') },
  { key: 'net', label: t('server.protocol') },
  { key: 'pingLatency', label: t('server.latency')  },
  { key: 'action', label: t('operations.name') },
]
</script>

<template>
    <VaDataTable :items="data" :columns="columns" selectable />
</template>
