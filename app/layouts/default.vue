<template>
  <div class="cantainer">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.cantainer {
  min-height: 100vh;
  min-height: 100svh;
}

.content {
  margin: auto;
  max-width: 480px;
  padding: 1em;
  position: relative;
  z-index: 0;
}
</style>
