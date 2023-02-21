<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'
import type { AxiosError } from 'axios'
import type { Error } from '@/interfaces/error.interface'

const { token } = storeToRefs(useAuthStore())
const { login } = useAuthStore()

let errorMessage = ref('')
const form = ref({
  email: '',
  password: ''
})

const submit = async () => {
  try {
    await login({
      email: form.value.email,
      password: form.value.password
    })
  } catch (err) {
    const error = err as AxiosError<Error>
    errorMessage.value = error.response?.data.message!
  }
}
</script>

<template>
  <form @submit="submit()">
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

    <div>{{ token }}</div>
  </form>
</template>

<style scoped></style>
