<script setup lang="ts">
const { state /* error, checkExpiration, post */ } = useSubmit();
const type = "202509";
const isExpired = ref<boolean | null>(false);
const postData = ref({
    type,
    recaptcha: "",
    church: "",
    name: "",
    kana: "",
    age: "",
    gender: "",
    member: "",
});

const isShowInput = computed(() => ["", "submitting"].includes(state.value));
const isDisabled = computed(() =>
    ["submitting", "submitted"].includes(state.value),
);

const submit = async () => {
    console.log(postData.value);
    // await post(postData.value)
    // if (error.value) {
    //   console.error(error.value)
    // }
};

onMounted(async () => {
    // isExpired.value = await checkExpiration(type)
});

useHead({
    title: "第56回JBBF全国青年フェローシップキャンプ参加申込",
});
</script>

<template>
    <header class="header">
        <h1 class="h1">
            第56回JBBF全国青年フェローシップキャンプ参加申込<br />
            Registration for the 56th JBBF National Youth Fellowship Camp
        </h1>
        <div class="date">
            開催日：2025年5月5日〜7日<br />
            Dates: May 5-7, 2025
        </div>
    </header>

    <main class="main">
        <template v-if="isExpired === false">
            <form v-if="isShowInput" class="form" @submit.prevent="submit">
                <div class="input-box">
                    <div class="input-label">教会名 - Church Name</div>
                    <AppInputText name="church" maxlength="128" :required="true" v-model="postData.church" />
                </div>

                <div class="input-box">
                    <div class="input-label">氏名 - Full Name</div>
                    <AppInputText name="name" maxlength="64" :required="true" v-model="postData.name" />
                </div>

                <div class="input-box">
                    <div class="input-label">ふりがな - Phonetic Name</div>
                    <AppInputText name="kana" maxlength="64" :required="true" v-model="postData.kana" />
                </div>

                <div class="input-box">
                    <div class="input-label">年齢 - Age</div>
                    <AppInputText name="age" maxlength="2" :required="true" v-model="postData.age" />
                </div>

                <div class="input-box">
                    <div class="input-label">性別 - Gender</div>
                    <AppInputRadio name="gender" :items="[
                        { label: '男性 - Male', value: '男性' },
                        { label: '女性 - Female', value: '女性' }
                    ]" v-model="postData.gender" />
                </div>

                <div class="input-box">
                    <div class="input-label">教会員など - Church Member</div>
                    <AppInputRadio name="member" :items="[
                        { label: '教会員 - Church Member', value: '教会員' },
                        { label: '非教会員 - Non-Church Member', value: '非教会員' },
                        { label: '指導者 - Leader', value: '指導者' }
                    ]" v-model="postData.member" />
                </div>

                <div class="submit">
                    <AppButton type="submit" variant="filled" :disabled="isDisabled">送信</AppButton>
                </div>
            </form>

            <AppTransition :show="state === 'submitting'" transition="fade">
                <p>送信が完了しました。<br />ありがとうございました。</p>
            </AppTransition>


            <AppTransition :show="state === 'failed'" transition="fade">
                <p>送信に失敗しました。<br />恐れ入りますが再度お試しください。</p>
            </AppTransition>
        </template>

        <FormClose v-if="isExpired === true">
            この申込は終了しています。<br />
            This form is now closed.
        </FormClose>
    </main>

    <footer v-if="isExpired === false" class="footer">
        <div>担当：仁戸名聖書バプテスト教会</div>
        <!-- <RecaptchaText /> -->
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
    margin: 1em 0 0;
}

.footer {
    font-size: 85%;
    margin: 15vh 0 0;
    text-align: center;
}
</style>
