<script setup lang="ts">
import { defineModel } from 'vue'

type Props = {
  name: string
  label: string
  required?: boolean
  disabled?: boolean
  maxlength?: string
  datalist?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false
})

const model = defineModel()
let listId = props.datalist ? 'l' + Math.random().toString(36).slice(-8) : ''
</script>

<template>
  <div class="input-box">
    <div class="input-label">{{ label }}</div>

    <label class="label">
      <input
        class="input"
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
.label {
  border-bottom: var(--color-subtext) solid 1px;
  display: block;
  padding: 0 0.5em 0.5em;
  position: relative;
}

.input {
  width: 100%;
}
</style>
