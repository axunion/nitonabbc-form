<script setup lang="ts">
import { defineModel } from 'vue'

interface Props {
  name: string
  label: string
  options: { label: string; value: string }[]
  required: boolean
  disabled: boolean
}

withDefaults(defineProps<Props>(), {
  name: '',
  label: '',
  options: () => [],
  required: false,
  disabled: false
})

const model = defineModel()
</script>

<template>
  <label>
    <span>{{ label }}</span>
    <select :name="name" :disabled="disabled" v-model="model">
      <option value=""></option>
      <option v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>
label {
  border-bottom: var(--color-subtext) solid 1px;
  display: block;
  padding: 0.5em;
  position: relative;
}

label:after {
  border-color: var(--color-subtext) transparent transparent;
  border-style: solid;
  border-width: 5px 5px;
  bottom: 0.75em;
  content: '';
  height: 0;
  pointer-events: none;
  position: absolute;
  right: 1em;
  width: 0;
}

span {
  color: var(--color-subtext);
  display: inline-block;
  font-size: 75%;
  margin: 0 0 0.5em;
}

select {
  width: 100%;
}

select:disabled {
  background: var(--color-subtext);
  color: var(--color-text);
  cursor: default;
}
</style>
