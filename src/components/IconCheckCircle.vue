<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="svg">
    <circle cx="50" cy="50" r="45" class="circle" />
    <path d="M30 50 L45 65 L70 35" class="checkmark" />
  </svg>
</template>

<style scoped>
.svg {
  max-height: 100%;
  max-width: 100%;
}

.circle,
.checkmark {
  fill: none;
  stroke: currentColor;
  stroke-width: 5;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}

.circle {
  animation: draw 1.5s linear forwards;
  transform: rotate(-90deg);
  transform-origin: 50%;
}

.checkmark {
  animation: draw 1s linear forwards 0.5s;
}
</style>
