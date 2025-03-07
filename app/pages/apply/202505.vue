<script setup lang="ts">
const { expirationState, postState, error, checkExpiration, post } = useSubmit();
const type = "202505";
const requiredNames = ["church"];
const spreadSheetUrl = ref("");
const postData = ref<Record<string, string>>({
    type,
    recaptcha: "",
    church: "",
    fileName: "",
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
    title: "2025 JBBF全国青年フェローシップキャンプ 参加お申し込み",
});
</script>

<template>
    <header class="header">
        <h1 class="h1">
            2025 JBBF全国青年フェローシップキャンプ<br />
            参加お申し込み
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
                        教会名を送信後に表示されるリンクから申込書を開き、参加者情報をご入力ください。入力した情報は自動保存されますので、別途のご連絡は不要です。
                    </p>
                    <p class="discription">
                        申込書の提出期限は2025年4月6日です。期限時点での入力情報をもって、お申し込み完了となります。
                    </p>
                </AppCard>

                <FormBox label="教会名">
                    <AppInputText name="church" maxlength="128" :required="true" v-model="postData.church" />
                </FormBox>

                <div class="submit">
                    <AppButton type="submit" variant="filled" :disabled="isDisabled">送信</AppButton>
                </div>

                <RecaptchaText />
            </form>

            <AppTransition :show="postState === 'failed'">
                <AppCard>
                    <p class="message">送信が失敗しました。<br />恐れ入りますが再度お試しください。</p>
                </AppCard>
            </AppTransition>

            <div v-if="spreadSheetUrl !== ''">
                <AppCard>
                    <p class="discription">
                        以下のリンクから申込書を開き、参加者情報をご入力ください。入力した情報は自動保存されますので、別途のご連絡は不要です。
                    </p>
                    <p class="discription">
                        申込書の提出期限は2025年4月6日です。期限時点での入力情報をもって、お申し込み完了となります。
                    </p>
                </AppCard>

                <div class="link">
                    <AppButton variant="outlined">申込書を開く</AppButton>
                </div>
            </div>
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

.link {
    height: 8em;
    margin: 1em 0 0;

    :hover {
        background: var(--color-primary);
        color: white;
    }
}
</style>
