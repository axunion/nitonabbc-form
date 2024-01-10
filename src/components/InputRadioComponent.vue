<script setup lang="ts">
import { defineModel } from "vue";
import { InputRadioProps } from "@/types";

const model = defineModel();

defineProps<InputRadioProps>();
</script>

<template>
  <div>
    <label v-for="(item, index) in items" :key="item.value">
      <input
        type="radio"
        v-model="model"
        :value="item.value"
        :checked="index === 0"
      />
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

label > input[type="radio"] {
  opacity: 0;
  position: absolute;
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
