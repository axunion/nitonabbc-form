<script setup lang="ts">
import { defineModel, ref, onMounted } from "vue";

type Props = {
	name: string;
	required?: boolean;
	disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
	required: false,
	disabled: false,
});

const model = defineModel<string>();
const textarea = ref<HTMLTextAreaElement | null>(null);

const autoResize = () => {
	if (textarea.value) {
		textarea.value.style.height = "auto";
		textarea.value.style.height = `${textarea.value.scrollHeight}px`;
	}
};

onMounted(() => {
	autoResize();
});
</script>

<template>
  <div class="div">
    <textarea
      class="textarea"
      :name="name"
      :required="required"
      :disabled="disabled"
      @input="autoResize"
      v-model.trim="model"
      ref="textarea"
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
  resize: none;
  width: 100%;
}
</style>
