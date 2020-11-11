export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Nuxt Laravel Passport',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // runtime config
  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
  },
  privateRuntimeConfig: {
    apiId: process.env.PASSPORT_CLIENT_ID,
    apiSecret: process.env.PASSPORT_CLIENT_SECRET,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    baseURL: process.env.API_URL,
  },

  proxy: {
    '/backend': {
      target: process.env.API_URL,
      pathRewrite: { '^/backend': '/' },
    },
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // https://github.com/nuxt-community/modules/tree/master/packages/toast
  toast: {
    duration: 5000,
    keepOnHover: true,
    theme: 'outline',
  },

  // Auth module configuration (https://dev.auth.nuxtjs.org/)
  auth: {
    redirect: {
      home: '/profile',
    },
    strategies: {
      laravelPassportPasswordGrant: {
        name: 'laravelPassportPassword',
        provider: 'laravel/passport',
        url: '/backend',
        endpoints: {
          logout: '/api/v1/logout',
          user: {
            url: '/api/v1/user',
          },
        },
        clientId: process.env.PASSPORT_CLIENT_ID,
        clientSecret: process.env.PASSPORT_CLIENT_SECRET,
        grantType: 'password',
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
