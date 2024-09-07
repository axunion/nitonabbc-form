<script setup lang="ts">
import { defineModel } from 'vue'

type Props = {
  name: string
  required?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false
})

const model = defineModel<string | string[]>()
</script>

<template>
  <div class="div">
    <textarea
      class="textarea"
      :name="name"
      :required="required"
      :disabled="disabled"
      v-model.trim="model"
    ></textarea>
  </div>
</template>

<style scoped>
.div {
  border: var(--color-subtext) solid 1px;
  border-radius: 4px;
  padding: 0.5em 0.75em;
  position: relative;
}

.textarea {
  height: 8em;
  resize: none;
  width: 100%;
}
</style>
