<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  const ID = 'recaptcha-script'
  const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api.js'
  const SITEKEY = import.meta.env.VITE_SITEKEY

  await new Promise<void>((resolve, reject): void => {
    if (document.getElementById(ID)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = ID
    script.src = `${RECAPTCHA_URL}?render=${SITEKEY}`
    script.async = true
    script.defer = true
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'))
    document.head.appendChild(script)
  })
})
</script>

<template>
  <div class="recaptcha">
    This site is protected by reCAPTCHA and the Google
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
  </div>
</template>

<style scoped>
.recaptcha {
  color: var(--color-subtext);
  padding: 1em;
}
</style>
