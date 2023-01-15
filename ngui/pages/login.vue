<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()

const token = useCookie('token')

const username = $ref('')
const password = $ref('')
const focus = ref()

onMounted(() => { focus.value.focus() })

if (token.value) router.push('/')

async function login() {
  const { data } = await toFetch<any>('login', {
    method: 'POST',
    body: { username, password }
  })

  if (data.value.code !== 'SUCCESS') {
    ElMessage.warning({ message: data.value.message, duration: 5000 })
  } else {
    token.value = data.value.data.token
    router.push('/')
  }
}
</script>

<template>
  <div class="mx-auto w-96">
    <h1 class="text-2xl mb-6">{{ `${t('login.title')} - v2rayA` }}</h1>

    <ElForm label-width="auto">
      <ElFormItem :label="t('login.username')">
        <ElInput ref="focus" v-model="username" />
      </ElFormItem>

      <ElFormItem :label="t('login.password')">
        <ElInput v-model="password" type="password" show-password />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" class="flex mx-auto" @click="login">{{ t("operations.login") }}</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style>
.va-input-wrapper--labeled .va-input-wrapper__label {
  height: 14px;
}
</style>
