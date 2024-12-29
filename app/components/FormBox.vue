<script setup lang="ts">
defineProps<{
    label?: string;
}>();
</script>

<template>
    <div class="box">
        <div v-if="label" class="label">{{ label }}</div>
        <slot></slot>
    </div>
</template>

<style scoped>
.box {
    background: white;
    border-radius: 4px;
    box-shadow: 0 1px 2px gray;
    padding: 0.5em 1em 1.5em;
}

.label {
    font-size: 85%;
    line-height: 1;
    margin: 1em 0 2em;
}
</style>
