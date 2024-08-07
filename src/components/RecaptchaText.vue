<script setup lang="ts">
import { onMounted } from 'vue'
import { SITE_KEY } from '@/composables/useSubmit'

onMounted(async () => {
  const ID = 'recaptcha-script'
  const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api.js'

  await new Promise<void>((resolve, reject): void => {
    if (document.getElementById(ID)) {
      resolve()
      return
    }

    const s = document.createElement('script')
    s.id = ID
    s.src = `${RECAPTCHA_URL}?render=${SITE_KEY}`
    s.onerror = () => reject(new Error('Failed to load reCAPTCHA script'))
    document.head.appendChild(s)
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
