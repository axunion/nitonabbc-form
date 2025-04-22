<script setup lang="ts">
import { Icon } from "@iconify/vue";

const storageKey = "spreadSheetUrl202505";
const spreadSheetUrl = ref("");

const copy = async () => {
    await navigator.clipboard.writeText(spreadSheetUrl.value);
    alert("リンクをコピーしました");
};

onMounted(async () => {
    spreadSheetUrl.value = localStorage.getItem(storageKey) || "";
});

useHead({
    title: "2025 JBBF全国青年フェローシップキャンプ 参加申し込み",
});
</script>

<template>
    <HeaderDefault>
        <template #heading>
            2025 JBBF全国青年フェローシップキャンプ 参加申し込み
        </template>
        <template #date>
            開催日：2025年4月6日〜7日
        </template>
    </HeaderDefault>

    <main>
        <FormClose>
            この申込は終了しています。<br />
            This form is now closed.
        </FormClose>

        <template v-if="spreadSheetUrl !== ''">
            <a :href="spreadSheetUrl" target="_blank" rel="noopener noreferrer" class="link">

                <AppButton variant="filled">申し込み書を開く</AppButton>
            </a>

            <div class="copy">
                <AppButton variant="outlined" @click="copy">
                    リンクをコピー
                    <Icon icon="mdi:content-copy" width="1em" height="1em" />
                </AppButton>
            </div>
        </template>
    </main>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.link {
    display: block;
    height: 5em;
    margin: 1em 0 0;
}

.copy {
    height: 3em;
    margin: 1em 3em 3em;
}
</style>
