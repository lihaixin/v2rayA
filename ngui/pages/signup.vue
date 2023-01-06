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

async function signup() {
  const { data } = await useFetch<any>(api.value + 'account', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value
    }
  })

  if (data.value.code !== 'SUCCESS') {
    init({
      message: data.value.message,
      color: "warning",
      duration: 5000
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
      <h1 class="text-xl">{{ t('register.title')}}</h1>
      <VaInput :label="t('login.username')" v-model="username" ref="focus" />
      <VaInput :label="t('login.password')" v-model="password" type="password" :max-length=36 />
      <VaButton @click="signup">{{ t("operations.create") }}</VaButton>
    </VaForm>

    <div class="mt-4 bg-gray-200 p-4 rounded-sm">
      <p>{{ t("register.messages.0") }}</p>
      <p>{{ t("register.messages.1") }}</p>
      <p>{{ t("register.messages.2") }}</p>
    </div>
  </div>
</template>

<style>
.va-input-wrapper--labeled .va-input-wrapper__label {
  height: 14px;
}
</style>
