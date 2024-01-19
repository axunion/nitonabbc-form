<script setup lang="ts">
import { ref, computed } from 'vue'
import CheckboxComponent from '@/components/form/CheckboxComponent.vue'
import RadioComponent from '@/components/form/RadioComponent.vue'
import SelectComponent from '@/components/form/SelectComponent.vue'
import TextComponent from '@/components/form/TextComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import SubmitOverlayComponent from '@/components/SubmitOverlayComponent.vue'
import { definition, defaultPostData } from '@/assets/structure/202502'

const { heading, date, message, link, items } = definition
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
    <div v-if="date" class="date">開催日：{{ date }}</div>
  </header>

  <main>
    <form @submit.prevent="submit">
      <template v-for="item in items" :key="item.name">
        <TextComponent
          v-if="item.type === 'text'"
          :name="item.name"
          :label="item.label"
          :datalist="item.datalist"
          :maxlength="item.maxlength"
          :required="item.required"
          v-model="postData[item.name as keyof typeof defaultPostData]"
        />

        <RadioComponent
          v-else-if="item.type === 'radio'"
          :name="item.name"
          :label="item.label"
          :items="item.radioItems"
          v-model="postData[item.name as keyof typeof defaultPostData]"
        />

        <CheckboxComponent
          v-else-if="item.type === 'checkbox'"
          :name="item.name"
          :label="item.label"
          :items="item.checkboxItems"
          v-model="postData[item.name as keyof typeof defaultPostData]"
        />

        <SelectComponent
          v-else-if="item.type === 'select'"
          :name="item.name"
          :label="item.label"
          :options="item.options"
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
header {
  padding: 2em 1em 0;
}

h1 {
  font-size: 125%;
  letter-spacing: 1px;
  margin: 0 0 1em;
  text-align: center;
}

.date {
  font-size: 90%;
  margin: auto;
  max-width: var(--content-max-wieght);
  text-align: right;
}

main {
  margin: auto;
  max-width: var(--content-max-wieght);
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
