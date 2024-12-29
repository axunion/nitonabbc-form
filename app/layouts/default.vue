<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<style scoped>
.content {
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
