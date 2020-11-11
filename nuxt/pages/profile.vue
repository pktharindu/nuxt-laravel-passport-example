<template>
  <main>
    <div class="container mx-auto pt-8">
      <div
        v-if="!loggedInUser.verified"
        class="w-full px-6 py-3 rounded-sm border text-yellow-800 bg-yellow-300 border-yellow-400"
        role="alert"
      >
        Before proceeding, please check your email for a verification link. If
        you did not receive the email,
        <button
          class="text-blue-700 cursor-pointer hover:text-blue-600 focus:outline-none focus:underline transition ease-in-out duration-150"
          @click="resendVerificationEmail"
        >
          click here to request another</button
        >.
      </div>

      <div class="mt-6">loggedInUser: {{ loggedInUser }}</div>
    </div>
  </main>
</template>

<script>
export default {
  middleware: 'auth',
  async fetch() {
    await this.$auth
      .fetchUser()
      .then((response) => (this.loggedInUser = response.data.data))
  },
  data() {
    return {
      loggedInUser: this.$auth.user.data,
    }
  },
  methods: {
    async resendVerificationEmail() {
      await this.$axios
        .$post('/backend/api/v1/verify-email/resend')
        .then(() => {
          this.$toast.success(
            'A fresh verification link has been sent to your email address.'
          )
        })
        .catch((e) => {
          this.$toast.error(e.response.data.message)
        })
    },
  },
}
</script>
