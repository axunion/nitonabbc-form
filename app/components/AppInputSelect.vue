<script setup lang="ts">
type Props = {
  name: string;
  options: { label: string; value: string }[];
  required?: boolean;
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
});

const model = defineModel<string>();
</script>

<template>
  <div class="div">
    <select class="select" :name="name" :required="required" :disabled="disabled" v-model="model">
      <option value=""></option>
      <option v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.div {
  border-bottom: var(--color-subtext) solid 1px;
  padding: 0 0.5em 0.5em;
  position: relative;
}

.div:after {
  border-color: var(--color-subtext) transparent transparent;
  border-style: solid;
  border-width: 5px 5px;
  bottom: 0.75em;
  content: '';
  height: 0;
  pointer-events: none;
  position: absolute;
  right: 1em;
  width: 0;
}

.select {
  width: 100%;
}
</style>
