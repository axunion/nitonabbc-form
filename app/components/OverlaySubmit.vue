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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg">
        <path
          d="M3.5 1.3457C3.58425 1.3457 3.66714 1.36699 3.74096 1.4076L22.2034 11.562C22.4454 11.695 22.5337 11.9991 22.4006 12.241C22.3549 12.3241 22.2865 12.3925 22.2034 12.4382L3.74096 22.5925C3.499 22.7256 3.19497 22.6374 3.06189 22.3954C3.02129 22.3216 3 22.2387 3 22.1544V1.8457C3 1.56956 3.22386 1.3457 3.5 1.3457ZM5 4.38261V11.0001H10V13.0001H5V19.6175L18.8499 12.0001L5 4.38261Z">
        </path>
      </svg>
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

.svg {
  animation:
    plane 2s ease-out infinite,
    blink 1s infinite;
  height: 24px;
  fill: currentColor;
}

@keyframes plane {
  0% {
    transform: translateX(-20vw);
  }

  100% {
    transform: translateX(20vw);
  }
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>
