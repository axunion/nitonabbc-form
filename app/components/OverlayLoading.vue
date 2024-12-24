<template>
  <Teleport to="body">
    <div v-if="false" class="overlay">
      <span class="loading">Loading</span>
    </div>
  </Teleport>
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

@keyframes bounce {

  0%,
  100% {
    background: var(--color-primary);
    transform: scale(1, 0.9) translateY(0);
  }

  40% {
    background: var(--color-accent);
    transform: scale(1) translateY(-200%);
  }
}
</style>
