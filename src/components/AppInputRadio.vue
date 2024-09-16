<script setup lang="ts">
import { defineModel } from 'vue'

type Props = {
  name: string
  items: { label: string; value: string }[]
}

withDefaults(defineProps<Props>(), {
  items: () => []
})

const model = defineModel<string>()
</script>

<template>
  <fieldset class="fieldset">
    <label class="label" v-for="item in items" :key="item.value">
      <input class="input" type="radio" :name="name" :value="item.value" required v-model="model" />
      <span class="item">{{ item.label }}</span>
    </label>
  </fieldset>
</template>

<style scoped>
.fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 0.5em 0;
  padding: 0 0.5em;
}

.label {
  cursor: pointer;
}

.input {
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
}

.item {
  align-items: center;
  color: var(--color-subtext);
  display: flex;
  gap: 0.5em;
  line-height: 1.4;
}

:checked + .item {
  color: var(--color-text);
}

.item::before {
  border: var(--color-subtext) solid 1px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 3px white;
  content: '';
  display: inline-block;
  height: 0.9em;
  width: 0.9em;
}

:checked + .item::before {
  background: var(--color-primary);
}
</style>
