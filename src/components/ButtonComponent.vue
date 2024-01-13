<script setup lang="ts">
interface Props {
  label: string
  type?: 'outlined' | 'filled'
  disabled: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false
})
</script>

<template>
  <button :class="type" :disabled="disabled">{{ label }}</button>
</template>

<style scoped>
button {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  color: inherit;
  cursor: pointer;
  font: inherit;
  height: 4em;
  letter-spacing: 0.1em;
  margin: 0;
  outline: 0;
  padding: 0;
  text-align: center;
  transition: background-color 0.15s;
  width: 100%;
}

button:disabled {
  color: var(--color-text);
  cursor: not-allowed;
}

.outlined {
  border: currentColor solid 1px;
}

.filled {
  background: var(--color-primary);
  border: var(--color-primary) solid 1px;
  color: var(--color-background);
}

.filled:disabled {
  background: var(--color-subtext);
  border-color: var(--color-subtext);
}
</style>
