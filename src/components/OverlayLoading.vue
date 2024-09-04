<script setup lang="ts">
import { useOverlayStore } from '@/stores/overlay'

const overlayStore = useOverlayStore()
</script>

<template>
  <div v-if="overlayStore.isActiveLoading" class="overlay">
    <span class="loading">Loading</span>
  </div>
</template>

<style scoped>
.overlay {
  align-items: center;
  backdrop-filter: blur(2px);
  background: #ffffff80;
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
</style>
