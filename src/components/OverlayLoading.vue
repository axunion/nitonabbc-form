<script setup lang="ts">
defineProps<{
  isActive: boolean
}>()
</script>

<template>
  <div v-if="isActive" class="overlay">
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
