<template>
    <div class="card">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.card {
    background: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px gray;
    display: flex;
    justify-content: center;
    padding: 1.5em;
}
</style>
