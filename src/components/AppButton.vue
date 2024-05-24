<script setup lang="ts">
type Props = {
  type?: 'button' | 'submit' | 'reset'
  variant?: '' | 'outlined' | 'filled'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: '',
  disabled: false
})
</script>

<template>
  <button class="button" :class="variant" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  color: inherit;
  cursor: pointer;
  font: inherit;
  height: 100%;
  letter-spacing: 0.1em;
  margin: 0;
  outline: 0;
  padding: 0;
  text-align: center;
  transition: background-color 0.15s;
  text-shadow: inherit;
  width: 100%;
}

.button:disabled {
  color: var(--color-text);
  cursor: not-allowed;
}

.outlined {
  border: currentColor solid 1px;
}

.filled {
  background: var(--color-primary);
  border: var(--color-primary) solid 1px;
  color: white;
}

.filled:disabled {
  background: var(--color-subtext);
  border-color: var(--color-subtext);
}
</style>
