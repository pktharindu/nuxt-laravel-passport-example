<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-5">
        <form>
          <div class="form-group">
            <input
              v-model="user.username"
              class="form-control"
              placeholder="Username"
            />
          </div>
          <div class="form-group">
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-block"
            @click.prevent="passwordGrantLogin"
          >
            Login with Password Grant
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {},
  methods: {
    async passwordGrantLogin() {
      await this.$auth.loginWith('password_grant', {
        data: {
          grant_type: 'password',
          client_id: process.env.PASSPORT_PASSWORD_GRANT_ID,
          client_secret: process.env.PASSPORT_PASSWORD_GRANT_SECRET,
          scope: '',
          username: this.user.username,
          password: this.user.password
        }
      })
    }
  }
}
</script>
