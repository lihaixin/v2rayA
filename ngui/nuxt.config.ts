// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vuestic/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  i18n: {
    strategy: 'no_prefix',
    langDir: 'locales',
    locales: [
      {
        code: 'zh',
        iso: 'zh-hans',
        file: 'zh-hans.yaml',
        name: '简体中文'
      },
    ]
  },
  unocss: {
    preflight: true,
  }
})
