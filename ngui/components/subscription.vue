<script lang="ts" setup>
import { nanoid } from 'nanoid'

const { t } = useI18n()
const api = useCookie('api')
const token = useCookie('token')

const { data } = await useFetch<any>(api.value + 'touch', {
  headers: {
    'Authorization': token.value!,
    'X-V2raya-Request-Id': nanoid(),
  }  
})

let subs = ref<object[]>([])

for (const sub of data.value.data.touch.subscriptions) {
  sub.number = sub.servers.length
  delete sub.servers
  subs.value.push(sub)
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'host', label: t('subscription.host') },
  { key: 'status', label: t('subscription.timeLastUpdate')  },
  { key: 'info', label: t('subscription.remarks') },
  { key: 'number', label: t('subscription.numberServers') },
  { key: 'action', label: t('operations.name') },
]
</script>

<template>
    <va-data-table :items="subs" :columns="columns" />
</template>
