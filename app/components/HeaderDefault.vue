<template>
    <header class="header">
        <h1 class="heading">
            <slot name="heading"></slot>
        </h1>
        <div class="date">
            <slot name="date"></slot>
        </div>
    </header>
</template>


<style scoped>
.header {
    background: white;
    border-bottom: var(--color-primary) solid 4px;
    border-top: var(--color-primary) solid 4px;
    box-shadow: 0 1px 3px gray;
    margin: 0 0 1em;
    padding: 1.5em 1em;
    white-space: pre-wrap;
}

.heading {
    color: var(--color-primary);
    font-size: 120%;
    margin: 0 0 1.5em;
}

.date {
    text-align: right;
}
</style>
