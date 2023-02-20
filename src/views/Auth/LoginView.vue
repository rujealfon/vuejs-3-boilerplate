<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'

export default defineComponent({
  data() {
    return {
      errorMessage: '',
      form: {
        email: '',
        password: ''
      }
    }
  },

  computed: {
    ...mapState(useAuthStore, ['getToken'])
  },

  methods: {
    ...mapActions(useAuthStore, ['login']),

    async submit() {
      try {
        await this.login({
          email: this.form.email,
          password: this.form.password
        })
      } catch (error) {
        console.log(error)
        // this.errorMessage = error.
      }
    }
  }
})
</script>

<template>
  <form @submit.prevent="submit()">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>

    <div class="form-floating">
      <input
        id="floatingInput"
        v-model="form.email"
        type="email"
        class="form-control"
        placeholder="name@example.com"
        autocomplete="off"
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input
        id="floatingPassword"
        v-model="form.password"
        type="password"
        class="form-control"
        placeholder="Password"
        autocomplete="off"
      />
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

    <div>{{ getToken }}></div>
  </form>
</template>

<style scoped></style>
