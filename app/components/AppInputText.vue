<script setup lang="ts">
type Props = {
    name: string;
    maxlength?: string;
    required?: boolean;
    disabled?: boolean;
    datalist?: string[];
};

const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
});

const model = defineModel<string>();

const listId = props.datalist ? `l${Math.random().toString(36).slice(-8)}` : "";
</script>

<template>
  <div class="div">
    <input class="input" type="text" :name="name" :maxlength="maxlength" :required="required" :disabled="disabled"
      :list="listId" v-model.trim="model" />
  </div>

  <datalist v-if="listId" :id="listId">
    <option v-for="item in datalist" :key="item" :value="item"></option>
  </datalist>
</template>

<style scoped>
.div {
  border-bottom: var(--color-subtext) solid 1px;
  padding: 0 0.5em 0.5em;
  position: relative;
}

.input {
  width: 100%;
}
</style>
