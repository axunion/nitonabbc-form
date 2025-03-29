<script setup lang="ts">
useHead({
  title: "京葉地区一泊お泊まり会アンケート",
});
</script>

<template>
  <header class="header">
    <h1 class="h1">
      京葉地区一泊お泊まり会アンケート<br />
      Keiyo Area Retreat Survey
    </h1>
    <div class="date">
      開催日：2024年9月22日〜23日<br />
      Event Dates: September 22-23, 2024
    </div>
  </header>

  <main class="main">
    <FormClose>
      このアンケートは終了しています。<br />
      This form is now closed.
    </FormClose>
  </main>
</template>

<style scoped>
.header {
  background: white;
  border-bottom: var(--color-primary) solid 4px;
  border-top: var(--color-primary) solid 4px;
  box-shadow: 0 1px 3px gray;
  padding: 1.5em 1em;
}

.h1 {
  color: var(--color-primary);
  font-size: 115%;
  margin: 0 0 1.5em;
}

.date {
  font-size: 85%;
  margin: auto;
  text-align: right;
}
</style>
