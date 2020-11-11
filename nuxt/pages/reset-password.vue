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

        <p class="text-xl text-gray-600 text-center">Reset your password</p>

        <form @submit.prevent="resetPassword">
          <div class="mt-4">
            <label
              class="block text-gray-600 text-sm font-medium mb-2"
              for="LoggingEmailAddress"
              >Email</label
            >
            <input
              id="LoggingEmailAddress"
              v-model="form.email"
              class="bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="email"
            />

            <span v-if="error && error.email" class="text-xs text-red-600">
              {{ error.email[0] }}
            </span>
          </div>

          <div class="mt-4">
            <label
              class="block text-gray-600 text-sm font-medium mb-2"
              for="ResetPassword"
              >Password</label
            >

            <input
              id="ResetPassword"
              v-model="form.password"
              class="bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="password"
            />

            <span v-if="error && error.password" class="text-xs text-red-600">
              {{ error.password[0] }}
            </span>
          </div>

          <div class="mt-4">
            <label
              class="block text-gray-600 text-sm font-medium mb-2"
              for="ResetPasswordConfirmation"
              >Confirm Password</label
            >

            <input
              id="ResetPasswordConfirmation"
              v-model="form.password_confirmation"
              class="bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="password"
            />
          </div>

          <div class="mt-8">
            <button
              class="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Reset Password
            </button>
          </div>
        </form>
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
        token: this.$route.query.token,
        email: this.$route.query.email,
        password: '',
        password_confirmation: '',
      },
      error: null,
    }
  },
  methods: {
    async resetPassword() {
      this.error = null

      await this.$axios
        .$post('/backend/api/v1/reset-password', this.form)
        .then(() => {
          this.$toast.success('Password reset successful!')
          this.$router.push('/login')
        })
        .catch((e) => (this.error = e.response.data.errors ?? e.response.data))
    },
  },
}
</script>
