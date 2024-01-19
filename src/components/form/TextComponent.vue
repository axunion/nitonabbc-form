<script setup lang="ts">
import { defineModel } from 'vue'

interface Props {
  name: string
  label: string
  datalist?: string[]
  maxlength?: string
  required: boolean
  disabled: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  label: '',
  required: false,
  disabled: false
})

const model = defineModel()
let listId: string = ''

if (props.datalist) {
  listId = 'id' + Math.random().toString(36).slice(-8)
}
</script>

<template>
  <div class="container">
    <div class="input-label">{{ label }}</div>

    <label>
      <input
        type="text"
        :name="name"
        :maxlength="maxlength"
        :required="required"
        :disabled="disabled"
        :list="listId"
        v-model.trim="model"
      />
    </label>

    <datalist v-if="listId" :id="listId">
      <option v-for="item in datalist" :key="item" :value="item"></option>
    </datalist>
  </div>
</template>

<style scoped>
label {
  border-bottom: var(--color-subtext) solid 1px;
  display: block;
  padding: 0 0.5em 0.5em;
  position: relative;
}

input {
  width: 100%;
}
</style>
