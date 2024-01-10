<template>
  <main>
    <h1>Entry</h1>
    <InputTextComponent label="Name" maxlength="10" required />
  </main>
</template>

<style scoped>
main {
  background: var(--color-background);
  color: var(--color-text);
  box-sizing: border-box;
  margin: auto;
  max-width: 480px;
  min-height: 100vh;
  min-width: 320px;
  padding: 2em;
  position: relative;
  z-index: 0;
}

h1 {
  font-size: 125%;
  font-weight: normal;
  letter-spacing: 1px;
  margin: 1em 0;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 2em;
  justify-content: flex-start;
  margin: 3em auto;
  max-width: 400px;
}
</style>
