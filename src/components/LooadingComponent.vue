<script setup lang="ts">
interface Props {
  isActive: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false
})
</script>

<template>
  <div v-if="isActive">
    <span>Loading</span>
  </div>
</template>

<style scoped>
div {
  align-items: center;
  backdrop-filter: blur(2px);
  background: #ffffff80;
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: 1111;
}

span {
  animation: bounce 1s infinite;
  border-radius: 50%;
  font-size: 0;
  height: 24px;
  width: 24px;
}
</style>
