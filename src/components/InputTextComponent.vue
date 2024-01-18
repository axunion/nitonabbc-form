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
  <div>
    <label>
      <span>{{ label }}</span>
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
      <option v-for="item in datalist" :key="item" :value="item" />
    </datalist>
  </div>
</template>

<style scoped>
label {
  border-bottom: var(--color-subtext) solid 1px;
  display: block;
  padding: 0.5em;
  position: relative;
}

span {
  color: var(--color-subtext);
  display: inline-block;
  font-size: 75%;
  margin: 0 0 0.5em;
}

input {
  width: 100%;
}

input:disabled {
  background: var(--color-subtext);
  color: var(--color-text);
  cursor: default;
}
</style>
