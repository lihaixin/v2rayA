<script lang="ts" setup>
import { ElMessage, MessageParams } from 'element-plus'

const router = useRouter()
const { t } = useI18n()

const token = useCookie('token')
const version = useCookie('version')
const lite = useCookie('lite')
const docker = useCookie('docker-mode')
const existAccount = useCookie<boolean>('exist-account')

if (existAccount.value === undefined) {
  const { error } = await toFetch<any>('touch')
  existAccount.value = !error.value?.data.data.first
}

if (!token.value) {
  if (existAccount.value)
    router.push('/login')
  else
    router.push('/signup')
}

const { data } = await toFetch<any>('version')

if (data.value.code === 'SUCCESS') {
  docker.value = data.value.data.dockerMode
  version.value = data.value.data.version
  lite.value = data.value.data.lite

  let messageConf: MessageParams = {
    message: t(
      data.value.dockerMode ? 'welcome.docker' : 'welcome.default', {
        version: data.value.data.version
      }),
    duration: 3000
  }

  if (data.value.data.foundNew) {
    messageConf = {
      duration: 5000,
      type: 'success',
      message: `${messageConf.message}. ${t('welcome.newVersion', { version: data.value.data.remoteVersion })}`
    }
  }

  ElMessage(messageConf)

  if (data.value.data.serviceValid === false)
    ElMessage.error({ message: t('version.v2rayInvalid'), duration: 10000 })
  else if (!data.value.data.v5)
    ElMessage.error({ message: t('version.v2rayNotV5'), duration: 10000 })
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
