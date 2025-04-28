<script setup lang="ts">
type Props = {
    label?: string;
};

withDefaults(defineProps<Props>(), {
    label: "",
});
</script>

<template>
    <div class="box">
        <div class="label" v-if="label">
            {{ label }}
        </div>

        <slot></slot>
    </div>
</template>

<style scoped>
.box {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px gray;
    padding: 1.5em 1em;
}

.label {
    font-size: 85%;
    font-weight: bolder;
    letter-spacing: .05em;
    line-height: 1;
    margin: 0 0 2em;
}
</style>
