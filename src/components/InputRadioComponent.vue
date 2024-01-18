<script setup lang="ts">
import { defineModel } from 'vue'

interface Props {
  name: string
  items: { label: string; value: string }[]
}

withDefaults(defineProps<Props>(), {
  name: '',
  items: () => []
})

const model = defineModel()
</script>

<template>
  <div>
    <label v-for="item in items" :key="item.value">
      <input type="radio" :name="name" :value="item.value" required v-model="model" />
      <span>{{ item.label }}</span>
    </label>
  </div>
</template>

<style scoped>
div {
  background: #00000020;
  border: var(--color-subtext) solid 1px;
  border-radius: 0.5em;
  display: flex;
  overflow: hidden;
}

label {
  color: var(--color-subtext);
  cursor: pointer;
  flex: 0 1 100%;
}

label + label {
  border-left: var(--color-subtext) solid 1px;
}

input {
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
}

span {
  color: var(--color-subtext);
  display: block;
  padding: 1em;
  position: relative;
  text-align: center;
}

:checked + span {
  background: var(--color-background);
  color: var(--color-text);
}
</style>
