<template>
  <div class="min-h-screen bg-gray-200 pt-20">
    <div
      class="flex max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden lg:max-w-4xl"
    >
      <div
        class="hidden lg:block lg:w-1/2 bg-cover"
        style="background-image: url('https://source.unsplash.com/daily')"
      ></div>

      <div class="w-full py-8 px-6 md:px-8 lg:w-1/2">
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

        <p class="text-xl text-gray-600 text-center">Create your account</p>

        <form @submit.prevent="register">
          <div class="mt-4">
            <label
              class="block text-gray-600 text-sm font-medium mb-2"
              for="RegisterName"
              >Name</label
            >
            <input
              id="RegisterName"
              v-model="form.name"
              class="bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="text"
            />

            <span v-if="error && error.name" class="text-xs text-red-600">
              {{ error.name[0] }}
            </span>
          </div>

          <div class="mt-4">
            <label
              class="block text-gray-600 text-sm font-medium mb-2"
              for="RegisterEmail"
              >Email</label
            >
            <input
              id="RegisterEmail"
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
              for="RegisterPassword"
              >Password</label
            >

            <input
              id="RegisterPassword"
              v-model="form.password"
              class="bg-white text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="password"
            />

            <span v-if="error && error.password" class="text-xs text-red-600">
              {{ error.password[0] }}
            </span>
          </div>

          <div class="mt-8">
            <button
              class="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Create account
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
      form: {
        name: '',
        email: '',
        password: '',
      },
      error: null,
    }
  },
  methods: {
    async register() {
      this.error = null

      await this.$axios
        .$post('/backend/api/v1/register', {
          ...this.form,
          password_confirmation: this.form.password,
        })
        .then(() => {
          this.$toast.success('Your account was created successfully!')
          this.$router.push('/login')
        })
        .catch((e) => (this.error = e.response.data.errors ?? e.response.data))
    },
  },
}
</script>
