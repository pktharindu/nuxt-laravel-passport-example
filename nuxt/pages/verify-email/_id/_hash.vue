<template>
  <main></main>
</template>

<script>
export default {
  middleware: 'auth',
  async fetch() {
    await this.$axios
      .$get(
        `/backend/api/v1/verify-email/${this.$route.params.id}/${this.$route.params.hash}?expires=${this.$route.query.expires}&signature=${this.$route.query.signature}`
      )
      .then(() => {
        this.$toast.success('Your have successfully verified your account!')
        this.$router.push('/profile')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message)
        this.$router.push('/profile')
      })
  },
}
</script>
