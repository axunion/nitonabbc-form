<script setup lang="ts">
type Props = {
    show: boolean;
    transition?: string;
};

withDefaults(defineProps<Props>(), {
    transition: "fade",
});
</script>

<template>
  <Transition :name="transition">
    <template v-if="show">
      <slot></slot>
    </template>
  </Transition>
</template>

<style scoped>
.fade-enter-active {
  animation: fade-up-in 0.5s;
}

.fade-leave-active {
  animation: fade-up-in 0.5s reverse;
}
</style>
