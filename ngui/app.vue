<script lang="ts" setup>
import { ToastOptions } from 'vuestic-ui'

const router = useRouter()
const { t } = useI18n()
const { init } = useToast()

const token = useCookie('token')
const api = useCookie('api')
const version = useCookie('version')
const lite = useCookie('lite')
const docker = useCookie('docker-mode')
const existAccount = useCookie<boolean>('exist-account')

if (!api.value) api.value = 'http://127.0.0.1:2017/api/'

if (existAccount.value === undefined) {
  const { error } = await useFetch<any>(api.value + 'touch')
  existAccount.value = !error.value?.data.data.first
}

if (!token.value) {
  if (existAccount.value) {
    router.push('/login')
  } else {
    router.push('/signup')
  }
}

const { data } = await useFetch<any>(api.value + 'version')

if (data.value.code === 'SUCCESS') {
  docker.value = data.value.data.dockerMode
  version.value = data.value.data.version
  lite.value = data.value.data.lite

  const toastConf: ToastOptions = {
    message: t(
      data.value.dockerMode ? 'welcome.docker' : 'welcome.default', {
        version: data.value.data.version
    }),
    duration: 3000,
  }
  if (data.value.data.foundNew) {
    toastConf.duration = 5000
    toastConf.message +=
      '. ' + t('welcome.newVersion', {
        version: data.value.data.remoteVersion
      })
    toastConf.color = 'success'
  }

  init(toastConf)

  if (data.value.data.serviceValid === false) {
    init({
      message: t('version.v2rayInvalid'),
      color: 'danger',
      duration: 10000,
    })
  } else if (!data.value.data.v5) {
    init({
      message: t('version.v2rayNotV5'),
      color: 'danger',
      duration: 10000,
    })
  }
}
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
