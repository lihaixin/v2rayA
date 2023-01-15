<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()

const token = useCookie('token')
const existAccount = useCookie<boolean>('exist-account')

const username = $ref('')
const password = $ref('')
const focus = ref()

onMounted(() => { focus.value.focus() })

if (token.value) router.push('/')

async function signup() {
  const { data } = await toFetch<any>('account', {
    method: 'POST',
    body: { username, password }
  })

  if (data.value.code !== 'SUCCESS') {
    ElMessage.warning({ message: data.value.message, duration: 5000 })
  } else {
    existAccount.value = true
    token.value = data.value.data.token
    router.push('/')
  }
}
</script>

<template>
  <div class="mx-auto w-96">
    <h1 class="text-2xl mb-6">{{ t('register.title') }}</h1>

    <ElForm label-width="auto">
      <ElFormItem :label="t('login.username')">
        <ElInput ref="focus" v-model="username" />
      </ElFormItem>

      <ElFormItem :label="t('login.password')">
        <ElInput v-model="password" type="password" max-length="36" show-password />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" class="flex mx-auto" @click="signup">{{ t("operations.create") }}</ElButton>
      </ElFormItem>
    </ElForm>

    <div class="mt-4 bg-gray-200 p-4 rounded-sm" />

    <ElAlert type="info" show-icon :closable="false">
      <p>{{ t("register.messages.0") }}</p>
      <p>{{ t("register.messages.1") }}</p>
      <p>{{ t("register.messages.2") }}</p>
    </ElAlert>
  </div>
</template>

<style>
.va-input-wrapper--labeled .va-input-wrapper__label {
  height: 14px;
}
</style>
