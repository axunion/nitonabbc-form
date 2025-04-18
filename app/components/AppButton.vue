<script setup lang="ts">
type Props = {
    type?: "button" | "submit" | "reset";
    variant?: "" | "outlined" | "filled";
    disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
    type: "button",
    variant: "",
    disabled: false,
});
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
  margin: 0;
  outline: 0;
  padding: 0;
  text-align: center;
  transition: background-color 0.15s;
  text-shadow: inherit;
  width: 100%;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.outlined {
  border: currentColor solid 1px;
  color: var(--color-primary);
  font-weight: bolder;
}

.filled {
  background: var(--color-primary);
  border: var(--color-primary) solid 1px;
  color: white;
}
</style>
