<template>
    <div class="box">
        <div class="label">
            <slot name="label"></slot>
        </div>

        <slot></slot>
    </div>
</template>

<style scoped>
.box {
    background: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px gray;
    padding: 0.5em 1em 1.5em;
}

.label {
    font-size: 85%;
    font-weight: bolder;
    letter-spacing: .05em;
    line-height: 1;
    margin: 1em 0 2em;
}
</style>
