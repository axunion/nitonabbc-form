<script setup lang="ts">
import { defineModel } from 'vue'

interface Props {
  name: string
  label: string
  items: { label: string; value: string }[]
}

withDefaults(defineProps<Props>(), {
  name: '',
  label: '',
  items: () => []
})

const model = defineModel()
</script>

<template>
  <div class="container">
    <div class="input-label">{{ label }}</div>

    <div class="group">
      <label v-for="item in items" :key="item.value">
        <input type="radio" :name="name" :value="item.value" required v-model="model" />
        <span></span>{{ item.label }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  padding: 0.5em 0;
}

label {
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  gap: 0.5em;
  padding: 0 1em 0 0;
}

input {
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
}

span {
  border: var(--color-subtext) solid 1px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px white;
  display: inline-block;
  height: 1em;
  width: 1em;
}

:checked + span {
  background: var(--color-primary);
}
</style>
