<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
let errorMessage = ref('')

const form = reactive({
  email: '',
  password: ''
})

function submit() {
  const payload = {
    email: form.email,
    password: form.password
  }

  authStore
    .login(payload)
    .then((response: any) => {
      console.log(response)
      // sessionStorage.setItem('access_token', response.data.access_token)
    })
    .catch((error) => {
      errorMessage.value = error?.response?.data?.message
    })
}
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
  </form>
</template>

<style scoped></style>
