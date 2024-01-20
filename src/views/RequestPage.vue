<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseInputText from '@/components/BaseInputText.vue'
import BaseButton from '@/components/BaseButton.vue'
import AppLooadingOverlay from '@/components/AppLooadingOverlay.vue'

const postData = ref<{ church: string }>({ church: '' })
const status = ref<'' | 'submitting' | 'submitted' | 'failed'>('')

const isSubmitDisabled = computed(
  () => status.value === 'submitting' || status.value === 'submitted'
)

const isFinished = computed(() => status.value === 'submitted' || status.value === 'failed')

const submit = () => {
  status.value = 'submitting'
  console.log(postData.value)
  return false
}
</script>

<template>
  <main class="main">
    <form v-if="!isFinished" class="form" @submit.prevent="submit">
      <BaseInputText label="教会名" maxlength="64" :required="true" v-model="postData['church']" />

      <div>
        <BaseButton type="submit" label="確認" variant="filled" :disabled="isSubmitDisabled" />
      </div>
    </form>
  </main>

  <AppLooadingOverlay :isActive="status === 'submitting'" />
</template>

<style scoped>
.main {
  margin: auto;
  max-width: var(--content-max-wieght);
  min-width: 320px;
  padding: 1em;
  position: relative;
  z-index: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 25vh auto 0;
}
</style>
