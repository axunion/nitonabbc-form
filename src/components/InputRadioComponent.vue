<script setup lang="ts">
import { defineModel } from 'vue'

interface Props {
  items: { label: string; value: string }[]
}

withDefaults(defineProps<Props>(), {
  items: () => []
})

const model = defineModel()
</script>

<template>
  <div>
    <label v-for="item in items" :key="item.value">
      <input type="radio" :value="item.value" v-model="model" />
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

label > input {
  opacity: 0;
  height: 0;
  position: absolute;
  width: 0;
}

label > span {
  color: var(--color-subtext);
  display: block;
  padding: 1em;
  position: relative;
  text-align: center;
}

label > :checked + span {
  background: var(--color-background);
  color: var(--color-text);
}
</style>
