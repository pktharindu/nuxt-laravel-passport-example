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

        <p class="text-xl text-gray-600 text-center">Set your password</p>

        <form @submit.prevent="setPassword">
          <div class="mt-4">
            <label
              class="block text-gray-600 text-sm font-medium mb-2"
              for="SetPassword"
              >Password</label
            >

            <input
              id="SetPassword"
              v-model="form.password"
              class="bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="password"
            />
          </div>

          <div class="mt-4">
            <label
              class="block text-gray-600 text-sm font-medium mb-2"
              for="SetPasswordConfirmation"
              >Confirm Password</label
            >

            <input
              id="SetPasswordConfirmation"
              v-model="form.password_confirmation"
              class="bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="password"
            />
          </div>

          <div class="mt-3">
            <span
              v-if="error"
              class="inline-flex items-center text-sm text-red-600"
            >
              {{ error.password ? error.password[0] : error.message }}
            </span>
          </div>

          <div class="mt-8">
            <button
              class="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Set Password
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
        password: '',
        password_confirmation: '',
      },
      user: this.$route.params.user,
      error: null,
    }
  },
  methods: {
    async setPassword() {
      this.error = null

      await this.$axios
        .$post(
          `/backend/api/v1/set-password/${this.user}?expires=${this.$route.query.expires}&signature=${this.$route.query.signature}`,
          this.form
        )
        .then(() => {
          this.$toast.success('Password was set successfully!')
          this.$router.push('/login')
        })
        .catch((e) => (this.error = e.response.data.errors ?? e.response.data))
    },
  },
}
</script>
