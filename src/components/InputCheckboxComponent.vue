<script setup lang="ts">
import { defineModel } from 'vue'

interface Props {
  label: string
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
    <input type="checkbox" :required="required" v-model="model" />
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"
        ></path>
      </svg>
    </span>
    {{ label }}
  </label>
</template>

<style scoped>
label {
  align-items: center;
  border-bottom: var(--color-subtext) solid 1px;
  cursor: pointer;
  display: flex;
  gap: 1em;
  padding: 0 0 0.5em;
}

input {
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
}

span {
  border: var(--color-subtext) solid 1px;
  border-radius: 4px;
  display: inline-block;
  height: 2em;
  width: 2em;
}

svg {
  opacity: 0;
  fill: var(--color-primary);
}

:checked + span > svg {
  opacity: 1;
}
</style>
