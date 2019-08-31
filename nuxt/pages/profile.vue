<template>
  <section class="container">
    <div>
      <strong>Strategy</strong>
      <pre>{{ strategy }}</pre>
    </div>
    <div>
      <strong>User</strong>
      <pre>{{ $auth.user }}</pre>
    </div>
    <button class="btn btn-primary" @click="logout">
      Logout
    </button>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      strategy: this.$auth.$storage.getUniversal('strategy')
    }
  },
  mounted() {},
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
