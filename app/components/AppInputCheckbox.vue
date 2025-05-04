<script setup lang="ts">
type Props = {
  name: string;
  items: { label: string; value: string; required?: boolean }[];
};

withDefaults(defineProps<Props>(), {
  items: () => [],
});

const model = defineModel<string[]>();
</script>

<template>
  <fieldset class="fieldset">
    <label class="label" v-for="(item, index) in items" :key="item.value">
      <input class="input" type="checkbox" :name="`${name}-${index}`" :value="item.value"
        :required="item.required || false" v-model="model" />

      <span class="item">
        <span class="s">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg">
            <path
              d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z">
            </path>
          </svg>
        </span>
        {{ item.label }}
      </span>
    </label>
  </fieldset>
</template>

<style scoped>
.fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 0.5em 0;
  padding: 0 0.5em;
}

.label {
  cursor: pointer;
}

.input {
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
}

.item {
  align-items: start;
  color: var(--color-subtext);
  display: flex;
  gap: 0.5em;
  line-height: 1.4;
}

:checked+.item {
  color: var(--color-text);
}

.s {
  border: var(--color-subtext) solid 1px;
  border-radius: 3px;
  height: 0.9em;
  margin: 0.2em 0 0;
  width: 0.9em;
}

.svg {
  height: 140%;
  margin: -20% 0 0 -20%;
  opacity: 0;
  stroke: var(--color-primary);
  vertical-align: top;
}

:checked+.item .svg {
  opacity: 1;
}
</style>
