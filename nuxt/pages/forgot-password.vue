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

        <p class="text-sm text-gray-600">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </p>

        <form @submit.prevent="sendPasswordResetLink">
          <div class="mt-4">
            <label
              class="block text-gray-600 text-sm font-medium mb-2"
              for="LoggingEmailAddress"
              >Email</label
            >
            <input
              id="LoggingEmailAddress"
              v-model="email"
              class="bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="email"
            />

            <span v-if="error" class="text-xs text-red-600">
              {{ error.email ? error.email[0] : error.message }}
            </span>
          </div>

          <div class="mt-8">
            <button
              class="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Email Password Reset Link
            </button>
          </div>
        </form>

        <div class="mt-4 flex items-center justify-between">
          <span class="border-b w-1/5 md:w-1/4"></span>

          <nuxt-link
            to="/login"
            class="text-xs text-gray-500 uppercase hover:underline"
          >
            or sign in
          </nuxt-link>

          <span class="border-b w-1/5 md:w-1/4"></span>
        </div>
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
      email: '',
      success: null,
      error: null,
    }
  },
  methods: {
    async sendPasswordResetLink() {
      this.error = null

      await this.$axios
        .$post('/backend/api/v1/forgot-password', {
          email: this.email,
        })
        .then((response) => this.$toast.success(response.message))
        .catch((e) => (this.error = e.response.data.errors ?? e.response.data))
    },
  },
}
</script>
