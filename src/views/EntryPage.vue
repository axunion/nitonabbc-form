<script setup lang="ts">
import { ref, computed } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputCheckboxComponent from '@/components/InputCheckboxComponent.vue'
import InputRadioComponent from '@/components/InputRadioComponent.vue'
import InputSelectComponent from '@/components/InputSelectComponent.vue'
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
  <header>
    <h1>{{ heading }}</h1>
    <div class="date"><span>開催日</span>{{ date }}</div>
  </header>

  <main>
    <form @submit.prevent="submit">
      <template v-for="item in items" :key="item.name">
        <InputTextComponent
          v-if="item.type === 'text'"
          :name="item.name"
          :label="item.label"
          :datalist="item.datalist"
          :maxlength="item.maxlength"
          :required="item.required"
          :disabled="item.disabled"
          v-model="postData[item.name as keyof typeof defaultPostData]"
        />

        <InputRadioComponent
          v-else-if="item.type === 'radio'"
          :name="item.name"
          :label="item.label"
          :items="item.radioItems"
          v-model="postData[item.name as keyof typeof defaultPostData]"
        />

        <InputCheckboxComponent
          v-else-if="item.type === 'checkbox'"
          :name="item.name"
          :label="item.label"
          :items="item.checkboxItems"
          v-model="postData[item.name as keyof typeof defaultPostData]"
        />

        <InputSelectComponent
          v-else-if="item.type === 'select'"
          :name="item.name"
          :label="item.label"
          :options="item.options"
          :required="item.required"
          :disabled="item.disabled"
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
header {
  background: var(--color-primary);
  color: white;
  padding: 1.5em 1em 1em;
}

h1 {
  font-size: 125%;
  font-weight: normal;
  letter-spacing: 1px;
  margin: 0 0 1em;
  text-align: center;
}

.date {
  font-size: 90%;
  margin: auto;
  max-width: 480px;
  text-align: right;
}

.date span::after {
  content: ':';
  margin: 0 0.5em;
}

main {
  margin: auto;
  max-width: 480px;
  min-height: 100vh;
  min-width: 320px;
  padding: 0.5em;
  position: relative;
  z-index: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.submit {
  padding: 1em 0;
}
</style>
