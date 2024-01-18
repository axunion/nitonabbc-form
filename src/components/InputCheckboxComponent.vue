<script setup lang="ts">
import { defineModel } from 'vue'

interface Props {
  name: string
  label: string
  items: { label: string; value: string; required: boolean }[]
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
        <input
          type="checkbox"
          :name="name"
          :value="item.value"
          :required="item.required"
          v-model="model"
        />
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"
            ></path>
          </svg>
        </span>
        {{ item.label }}
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
  border-radius: 4px;
  display: inline-block;
  height: 1em;
  width: 1em;
}

svg {
  opacity: 0;
  height: 100%;
  stroke: var(--color-primary);
  vertical-align: top;
}

:checked + span > svg {
  opacity: 1;
}
</style>
