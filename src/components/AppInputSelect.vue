<script setup lang="ts">
import { defineModel } from 'vue'

type Props = {
  name: string
  label: string
  options: { label: string; value: string }[]
  required?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false
})

const model = defineModel()
</script>

<template>
  <div class="container">
    <div class="input-label">{{ label }}</div>

    <label class="label">
      <select class="select" :name="name" :required="required" :disabled="disabled" v-model="model">
        <option value=""></option>
        <option v-for="item in options" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>
    </label>
  </div>
</template>

<style scoped>
.label {
  border-bottom: var(--color-subtext) solid 1px;
  display: block;
  padding: 0 0.5em 0.5em;
  position: relative;
}

.label:after {
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

.select {
  width: 100%;
}
</style>
