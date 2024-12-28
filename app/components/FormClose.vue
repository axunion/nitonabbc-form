<template>
  <AppCard>
    <SvgClose class="icon" />
    <p>
      <slot>このフォームは終了しています。<br />This form is now closed.</slot>
    </p>
  </AppCard>
</template>

<style scoped>
.icon {
  height: 4em;
}
</style>
