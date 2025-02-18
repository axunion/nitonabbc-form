<script setup lang="ts">
const { expirationState, postState, error, checkExpiration, post } = useSubmit();
const type = "202509";
const requiredNames = ["recaptcha", "church", "name", "kana", "age", "gender", "member"];
const postData = ref<Record<string, string>>({
    type,
    recaptcha: "",
    church: "",
});

const isShowOverlayLoading = computed(() => ["idle", "checking"].includes(expirationState.value));
const isShowOverlaySubmit = computed(() => ["submitting"].includes(postState.value));
const isShowInput = computed(() => ["idle", "submitting"].includes(postState.value));
const isDisabled = computed(() =>
    requiredNames.every(key => postData.value[key] !== '') ||
    ["submitting", "submitted"].includes(postState.value)
);

const submit = async () => {
    console.log(postData.value);
    // await post(postData.value)
    // if (error.value) {
    //   console.error(error.value)
    // }
};

onMounted(async () => {
    await checkExpiration(type)
});

useHead({
    title: "第56回JBBF全国青年フェローシップキャンプ参加申込",
});
</script>

<template>
    <header class="header">
        <h1 class="h1">
            2025 第56回 JBBF全国青年フェローシップキャンプ<br />
        </h1>
        <div class="date">
            開催日：2025年5月5日〜7日
        </div>
    </header>

    <main class="main">
        <template v-if="expirationState === 'valid'">
            <form v-if="isShowInput" class="form" @submit.prevent="submit">
                <FormBox label="教会名">
                    <AppInputText name="church" maxlength="128" :required="true" v-model="postData.church" />
                </FormBox>

                <div class="submit">
                    <AppButton type="submit" variant="filled" :disabled="isDisabled">申込書作成</AppButton>
                    <RecaptchaText />
                </div>
            </form>

            <AppTransition :show="postState === 'submitting'" transition="fade">
                <p>送信が完了しました。<br />ありがとうございました。</p>
            </AppTransition>


            <AppTransition :show="postState === 'failed'" transition="fade">
                <p>送信に失敗しました。<br />恐れ入りますが再度お試しください。</p>
            </AppTransition>
        </template>

        <FormClose v-if="expirationState === 'expired'">
            この申込は終了しています。<br />
            This form is now closed.
        </FormClose>
    </main>

    <OverlayLoading :show="isShowOverlayLoading" />
    <OverlaySubmit :show="isShowOverlaySubmit" />

    <footer v-if="expirationState === 'valid'" class="footer">
        <div>担当：仁戸名聖書バプテスト教会</div>
    </footer>
</template>

<style scoped>
.header {
    background: white;
    border-bottom: var(--color-primary) solid 4px;
    border-top: var(--color-primary) solid 4px;
    box-shadow: 0 1px 3px gray;
    padding: 1.5em 1em;
}

.h1 {
    color: var(--color-primary);
    font-size: 115%;
    margin: 0 0 1.5em;
}

.date {
    font-size: 85%;
    margin: auto;
    text-align: right;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.submit {
    height: 4em;
    margin: .5em 0 0;
}

.footer {
    font-size: 85%;
    margin: 15vh 0 0;
    text-align: center;
}
</style>
