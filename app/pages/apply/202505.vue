<script setup lang="ts">
const { expirationState, postState, error, checkExpiration, post } = useSubmit();
const type = "202505";
const requiredNames = ["email", "church"];
const postData = ref<Record<string, string>>({
    type,
    recaptcha: "",
    email: "",
    church: "",
});

const isShowOverlayLoading = computed(() => ["idle", "checking"].includes(expirationState.value));
const isShowOverlaySubmit = computed(() => ["submitting"].includes(postState.value));
const isShowInput = computed(() => ["idle", "submitting"].includes(postState.value));
const isDisabled = computed(() =>
    requiredNames.every(key => postData.value[key] === '') ||
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
    title: "2025 JBBF全国青年フェローシップキャンプ",
});
</script>

<template>
    <header class="header">
        <h1 class="h1">
            2025 JBBF全国青年フェローシップキャンプ<br />
        </h1>
        <div class="date">
            開催日：2025年5月5日〜7日
        </div>
    </header>

    <main>
        <template v-if="expirationState === 'valid'">
            <form v-if="isShowInput" class="form" @submit.prevent="submit">
                <AppCard>
                    <p class="discription">
                        教会名とメールアドレスを入力し送信をお願いいたします。申込書が作成され、指定のメールアドレスに送信されます。
                    </p>
                </AppCard>

                <FormBox label="教会名">
                    <AppInputText name="church" maxlength="128" :required="true" v-model="postData.church" />
                </FormBox>

                <FormBox label="メールアドレス">
                    <AppInputText name="email" maxlength="256" :required="true" v-model="postData.email" />
                </FormBox>

                <div class="submit">
                    <AppButton type="submit" variant="filled" :disabled="isDisabled">送信</AppButton>
                </div>

                <RecaptchaText />
            </form>

            <AppTransition :show="postState === 'submitting'">
                <AppCard>
                    <p class="message">送信が完了しました。<br />ありがとうございました。</p>
                </AppCard>
            </AppTransition>


            <AppTransition :show="postState === 'failed'">
                <AppCard>
                    <p class="message">送信が失敗しました。<br />恐れ入りますが再度お試しください。</p>
                </AppCard>
            </AppTransition>
        </template>

        <FormClose v-if="expirationState === 'expired'">
            この申込は終了しています。<br />
            This form is now closed.
        </FormClose>
    </main>

    <OverlayLoading :show="isShowOverlayLoading" />
    <OverlaySubmit :show="isShowOverlaySubmit" />
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
    font-size: 120%;
    margin: 0 0 1.5em;
}

.date {
    font-size: 85%;
    text-align: right;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.discription {
    font-size: 85%;
}

.submit {
    height: 4em;
    margin: .5em 0 0;
}

.message {
    margin: 10vh auto;
}
</style>
