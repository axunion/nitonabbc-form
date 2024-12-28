<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px gray;
    margin: 0;
    padding: 10vh 20px;
    text-align: center;
}
</style>
