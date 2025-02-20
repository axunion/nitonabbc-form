<template>
  <AppCard>
    <div class="close">
      <SvgClose class="icon" />

      <p>
        <slot>このフォームは終了しています。<br />This form is now closed.</slot>
      </p>
    </div>
  </AppCard>
</template>

<style scoped>
.close {
  padding: 5vh 0;
  text-align: center;
}

.icon {
  height: 4em;
}
</style>
