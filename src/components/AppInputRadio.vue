<script setup lang="ts">
import { defineModel } from 'vue'

type Props = {
  name: string
  label: string
  items: { label: string; value: string }[]
}

withDefaults(defineProps<Props>(), {
  items: () => []
})

const model = defineModel()
</script>

<template>
  <div class="input-box">
    <div class="input-label">{{ label }}</div>

    <div class="group">
      <label class="label" v-for="item in items" :key="item.value">
        <input
          class="input"
          type="radio"
          :name="name"
          :value="item.value"
          required
          v-model="model"
        />

        <span class="item">{{ item.label }}</span>
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

.label {
  cursor: pointer;
  padding: 0 1em 0 0;
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
  gap: 0.25em;
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
