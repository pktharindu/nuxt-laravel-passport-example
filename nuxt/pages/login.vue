<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div
      class="bg-white w-full max-w-sm rounded-lg shadow-md overflow-hidden mx-auto"
    >
      <div class="py-4 px-6">
        <nuxt-link
          to="/"
          class="flex title-font font-medium items-center justify-center text-gray-900 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            ></path>
          </svg>
          <span class="ml-3 text-xl">tailblocks</span>
        </nuxt-link>

        <p class="text-xl text-gray-600 text-center">Sign in to your account</p>

        <form @submit.prevent="loginPassport">
          <div class="mt-4">
            <label
              class="block text-gray-600 text-sm font-medium mb-2"
              for="LoggingEmailAddress"
              >Email</label
            >
            <input
              id="LoggingEmailAddress"
              v-model="form.username"
              class="bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="email"
            />
          </div>

          <div class="mt-4">
            <div class="flex justify-between">
              <label
                class="block text-gray-600 text-sm font-medium mb-2"
                for="loggingPassword"
                >Password</label
              >
              <nuxt-link
                to="/forgot-password"
                class="text-xs text-gray-500 hover:underline"
              >
                Forget Password?
              </nuxt-link>
            </div>

            <input
              id="loggingPassword"
              v-model="form.password"
              class="bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="password"
            />
          </div>

          <div class="mt-3">
            <span
              v-if="error"
              class="inline-flex items-center font-semibold text-sm text-red-600"
            >
              <svg
                aria-hidden="true"
                class="fill-current mr-2"
                height="12"
                width="12"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              {{ error }}
            </span>
          </div>

          <div class="mt-8">
            <button
              class="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <div
        class="flex items-center justify-center py-4 bg-gray-100 text-center"
      >
        <span class="text-gray-600 text-sm">Don't have an account? </span>

        <nuxt-link
          to="/register"
          class="text-blue-600 font-bold mx-2 text-sm hover:text-blue-500"
        >
          Sign up
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'base',
  auth: 'guest',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      error: null,
    }
  },
  methods: {
    async loginPassport() {
      this.error = null

      await this.$auth
        .loginWith('laravelPassportPassword', { data: this.form })
        .then(() => this.$router.push('/profile'))
        .catch((e) => (this.error = 'Incorrect email or password.'))
    },
  },
}
</script>
