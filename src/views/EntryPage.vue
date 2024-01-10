<script setup lang="ts">
import { ref } from "vue";
import InputRadioComponent from "@/components/InputRadioComponent.vue";
import InputTextComponent from "@/components/InputTextComponent.vue";
import { definition } from "@/data/202502";

const { heading, date, formItems } = definition;
const postData = ref<{ [key: string]: string }>({});
const submit = () => {
  console.log(postData.value);
  return false;
};
</script>

<template>
  <main>
    <h1>{{ heading }}</h1>
    <div class="date"><span>開催日</span>{{ date }}</div>

    <form @submit.prevent="submit">
      <template v-for="formItem in formItems" :key="formItem.name">
        <InputTextComponent
          v-if="formItem.type === 'text'"
          :label="formItem.label || ''"
          :name="formItem.name || ''"
          :maxlength="formItem.maxlength || ''"
          :title="formItem.title || ''"
          :pattern="formItem.pattern || ''"
          :required="formItem.required || false"
          v-model="postData[formItem.name]"
        />

        <InputRadioComponent
          v-else-if="formItem.type === 'radio'"
          :name="formItem.name || ''"
          :items="formItem.items || []"
          v-model="postData[formItem.name]"
        />
      </template>

      <button type="submit">送信</button>
    </form>
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

.date {
  color: var(--color-subtext);
  font-size: 90%;
  margin: 1em 0;
  text-align: right;
}

.date span::after {
  content: ":";
  margin: 0 0.5em;
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
