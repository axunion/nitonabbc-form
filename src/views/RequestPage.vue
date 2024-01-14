<script setup lang="ts">
import { ref, computed } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputTextComponent from '@/components/InputTextComponent.vue'
import LooadingComponent from '@/components/LooadingComponent.vue'

const postData = ref<{ church: string }>({ church: '' })
const status = ref<'' | 'submitting' | 'submitted' | 'failed'>('')

const isSbmitting = computed(() => status.value === 'submitting')
const isSubmitDisabled = computed(
  () => status.value === 'submitting' || status.value === 'submitted'
)

const submit = () => {
  status.value = 'submitting'
  console.log(postData.value)
  return false
}
</script>

<template>
  <main>
    <form @submit.prevent="submit">
      <p>2024年2月25日 京葉地区青年交わり会の申込者を確認できます。</p>

      <InputTextComponent
        label="教会名"
        maxlength="64"
        :required="true"
        v-model="postData['church']"
      />

      <div class="submit">
        <ButtonComponent label="確認" type="filled" :disabled="isSubmitDisabled" />
      </div>
    </form>
  </main>

  <LooadingComponent :isActive="isSbmitting" />
</template>

<style scoped>
main {
  background: var(--color-background);
  box-sizing: border-box;
  color: var(--color-text);
  margin: auto;
  min-height: 100vh;
  min-width: 320px;
  padding: 40px;
  position: relative;
  z-index: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 3em;
  margin: 15vh auto 0;
  max-width: 400px;
}
</style>
