<script setup lang="ts">
import { defineModel } from "vue";
import { InputTextProps } from "@/types";

const model = defineModel();

defineProps<InputTextProps>();
</script>

<template>
  <label>
    <span>{{ label }}</span>
    <input
      type="text"
      v-model.trim="model"
      :name="name"
      :maxlength="maxlength"
      :title="title"
      :pattern="pattern"
      :required="required"
    />
  </label>
</template>

<style scoped>
input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  text-align: inherit;
}

label {
  align-items: end;
  border-bottom: var(--color-subtext) solid 1px;
  display: flex;
  padding: 0.5em 1em;
}

label > span {
  color: var(--color-subtext);
  flex: 0 0 25%;
  font-size: 75%;
}

label > input {
  font-size: 125%;
  width: 100%;
}

label > input:disabled {
  background: var(--color-subtext);
  color: var(--color-text);
  cursor: default;
}
</style>
