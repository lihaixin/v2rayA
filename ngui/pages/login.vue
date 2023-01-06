<script lang="ts" setup>
const { t } = useI18n()
const { init } = useToast()
const router = useRouter()

const token = useCookie('token')
const api = useCookie('api')

const username = ref('')
const password = ref('')
const focus = ref()

onMounted(() => {
  focus.value.focus()
})

if (token.value) {
  router.push('/')
}

async function login() {
  const { data } = await useFetch<any>(api.value + 'login', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
    }
  })

  if (data.value.code !== 'SUCCESS') {
    init({
      message: data.value.message,
      color: 'warning',
      duration: 5000,
    })
  } else {
    token.value = data.value.data.token
    router.push('/')
  }
}
</script>

<template>
  <div class="flex flex-col mx-auto w-96">
    <VaForm class="flex flex-col space-y-2">
      <h1 class="text-xl">{{ t('login.title') + ` - v2rayA` }}</h1>
      <VaInput :label="t('login.username')" v-model="username" ref="focus" />
      <VaInput :label="t('login.password')" v-model="password" type="password" />
      <VaButton @click="login">{{ t("operations.login") }}</VaButton>
    </VaForm>
  </div>
</template>

<style>
.va-input-wrapper--labeled .va-input-wrapper__label {
  height: 14px;
}
</style>
