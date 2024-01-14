<script setup lang="ts">
import { ref, computed } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputCheckboxComponent from '@/components/InputCheckboxComponent.vue'
import InputRadioComponent from '@/components/InputRadioComponent.vue'
import InputTextComponent from '@/components/InputTextComponent.vue'
import SubmitOverlayComponent from '@/components/SubmitOverlayComponent.vue'
import { definition, defaultPostData } from '@/assets/structure/202502'

const { heading, date, items } = definition
const postData = ref<typeof defaultPostData>(defaultPostData)
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
    <h1>{{ heading }}</h1>
    <div class="date"><span>開催日</span>{{ date }}</div>

    <form @submit.prevent="submit">
      <template v-for="item in items" :key="item.name">
        <InputTextComponent
          v-if="item.type === 'text'"
          :label="item.label"
          :maxlength="item.maxlength"
          :title="item.title"
          :pattern="item.pattern"
          :required="item.required"
          v-model="postData[item.name as keyof typeof defaultPostData]"
        />

        <InputRadioComponent
          v-else-if="item.type === 'radio'"
          :items="item.items"
          v-model="postData[item.name as keyof typeof defaultPostData]"
        />

        <InputCheckboxComponent
          v-else-if="item.type === 'checkbox'"
          :label="item.label"
          :required="item.required"
          v-model="postData[item.name as keyof typeof defaultPostData]"
        />
      </template>

      <div class="submit">
        <ButtonComponent label="送信" type="filled" :disabled="isSubmitDisabled" />
      </div>
    </form>
  </main>

  <SubmitOverlayComponent :isActive="isSbmitting" />
</template>

<style scoped>
main {
  background: var(--color-background);
  box-sizing: border-box;
  color: var(--color-text);
  margin: auto;
  max-width: 480px;
  min-height: 100vh;
  min-width: 320px;
  padding: 40px;
  position: relative;
  z-index: 0;
}

h1 {
  font-size: 125%;
  font-weight: normal;
  letter-spacing: 1px;
  margin: 1em 0;
  text-align: center;
}

.date {
  color: var(--color-subtext);
  font-size: 90%;
  margin: 1em 0;
  text-align: right;
}

.date span::after {
  content: ':';
  margin: 0 0.5em;
}

form {
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin: 3em auto;
  max-width: 400px;
}

.submit {
  padding: 1em 0 0;
}
</style>
