<script setup lang="ts">
import { onMounted } from 'vue'
import { useSubmit } from '@/composables/useSubmit'

const { appendRecaptcha } = useSubmit()

onMounted(async () => {
  await appendRecaptcha()
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
