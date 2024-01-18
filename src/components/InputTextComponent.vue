<script setup lang="ts">
import { defineModel } from 'vue'

interface Props {
  name: string
  label: string
  datalist?: string[]
  maxlength?: string
  title?: string
  pattern?: string
  required: boolean
}

const props = withDefaults(defineProps<Props>(), {
  naem: '',
  label: '',
  required: false
})

const model = defineModel()
let listId: string = ''

if (props.datalist) {
  listId = 'id' + Math.random().toString(36).slice(-8)
}
</script>

<template>
  <label>
    <span>{{ label }}</span>
    <input
      type="text"
      :name="name"
      :maxlength="maxlength"
      :title="title"
      :pattern="pattern"
      :required="required"
      :list="listId"
      v-model.trim="model"
    />
  </label>

  <datalist v-if="listId" :id="listId">
    <option v-for="item in datalist" :key="item" :value="item" />
  </datalist>
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
