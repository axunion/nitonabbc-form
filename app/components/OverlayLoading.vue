<script setup lang="ts">
type Props = {
    show?: boolean;
};

withDefaults(defineProps<Props>(), {
    show: false,
});
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="overlay">
      <span class="loading">Loading</span>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  align-items: center;
  backdrop-filter: blur(3px);
  background: #00000080;
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: 1111;
}

.loading {
  animation: bounce 1s infinite;
  border-radius: 50%;
  font-size: 0;
  height: 24px;
  width: 24px;
}

@keyframes bounce {

  0%,
  100% {
    background: var(--color-secondary);
    transform: scale(1, 0.9) translateY(0);
  }

  30% {
    background: var(--color-accent);
  }

  50% {
    transform: scale(1) translateY(-200%);
  }

  70% {
    background: var(--color-primary);
  }
}
</style>
