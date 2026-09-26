<template>
  <div class="login-page">

    <div class="login-card">

      <div class="login-logo">
        <div class="logo-circle">
          🏥
        </div>

        <h1>PosyanduCare</h1>
        <p>Sistem Pendataan dan Pemantauan Balita</p>
      </div>

      <form @submit.prevent="login">

        <div class="form-group">
          <label>Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Masukkan username"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Masukkan password"
          />
        </div>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <button class="login-button" type="submit">
          Masuk
        </button>

      </form>

      <div class="login-footer">
        PosyanduCare © 2026
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import users from '../data/users'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const login = () => {

  const user = users.find(
    item =>
      item.username === username.value &&
      item.password === password.value
  )

  if (user) {

    localStorage.setItem(
      'userLogin',
      JSON.stringify(user)
    )

    router.push('/dashboard')

  } else {

    errorMessage.value =
      'Username atau password tidak sesuai.'

  }
}
</script>