<script setup lang="ts">
import "~/assets/stylesheet/main.css";
</script>

<template>
  <div class="content">
    <slot />
  </div>
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
