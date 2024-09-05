<script setup lang="ts">
import OverlayLoading from '@/components/OverlayLoading.vue'
import OverlaySubmit from '@/components/OverlaySubmit.vue'
</script>

<template>
  <div class="content">
    <router-view />
  </div>

  <OverlayLoading />
  <OverlaySubmit />
</template>

<style scoped>
.content {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: auto;
  max-width: 480px;
  padding: 1em;
  position: relative;
  z-index: 0;
}
</style>
