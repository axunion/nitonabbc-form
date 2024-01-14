<script setup lang="ts">
import { defineModel } from 'vue'

interface Props {
  label: string
  maxlength?: string
  title?: string
  pattern?: string
  required: boolean
}

withDefaults(defineProps<Props>(), {
  label: '',
  required: false
})

const model = defineModel()
</script>

<template>
  <label>
    <span>{{ label }}</span>
    <input
      type="text"
      :maxlength="maxlength"
      :title="title"
      :pattern="pattern"
      :required="required"
      v-model.trim="model"
    />
  </label>
</template>

<style scoped>
label {
  align-items: end;
  border-bottom: var(--color-subtext) solid 1px;
  display: flex;
  padding: 0.5em 1em;
}

span {
  color: var(--color-subtext);
  flex: 0 0 25%;
  font-size: 75%;
}

input {
  font-size: 125%;
  width: 100%;
}

input:disabled {
  background: var(--color-subtext);
  color: var(--color-text);
  cursor: default;
}
</style>
