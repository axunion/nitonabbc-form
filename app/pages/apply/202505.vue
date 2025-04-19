<script setup lang="ts">
import { Icon } from "@iconify/vue";

// const type = "202505";
// const requiredNames = ["name"];
const storageKey = "spreadSheetUrl202505";
const spreadSheetUrl = ref("");
// const postData = ref<Record<string, string>>({
//     type,
//     recaptcha: "",
//     name: "",
// });

// const { expirationState, postState, error, checkExpiration, createSheet } = useCreateSheet();
// const isShowOverlayLoading = computed(() => ["idle", "checking"].includes(expirationState.value));
// const isShowOverlaySubmit = computed(() => ["submitting"].includes(postState.value));
// const isShowInput = computed(() => ["idle", "submitting"].includes(postState.value) && spreadSheetUrl.value === "");
// const isDisabled = computed(() =>
//     requiredNames.every(key => postData.value[key] === '') ||
//     ["submitting", "submitted"].includes(postState.value)
// );

// const submit = async () => {
//     const result = await createSheet(postData.value)

//     if (error.value) {
//         console.error(error.value)
//     }

//     spreadSheetUrl.value = result;
//     localStorage.setItem(storageKey, result);
// };

const copy = async () => {
    await navigator.clipboard.writeText(spreadSheetUrl.value);
    alert("リンクをコピーしました");
};

onMounted(async () => {
    // await checkExpiration(type);
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
        <!-- <template v-if="expirationState === 'valid'">
            <form v-if="isShowInput" class="form" @submit.prevent="submit">
                <AppCard>
                    <p>
                        教会名をご送信後、表示されるリンクから申し込み書を開き、必要事項をご入力ください。お申し込みは教会ごとに行っていただきますようお願いいたします。
                    </p>
                    <p>
                        入力された情報は自動で保存されますので、入力後の追加連絡は必要ありません。申込書の提出締め切りは2025年4月6日です。期限時点で入力済みの情報をもって、お申し込みとさせていただきます。
                    </p>
                </AppCard>

                <FormBox label="教会名">
                    <AppInputText name="name" maxlength="128" :required="true" v-model="postData.name" />
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

            <AppTransition :show="spreadSheetUrl !== ''">
                <div>
                    <AppCard>
                        <p>
                            お申し込みは教会ごとに手続きをお願いいたします。一度発行された申込書のリンクは、紛失しないようご注意ください。リンクをコピーして教会関係者間で共有いただく方法がおすすめです。
                        </p>
                        <p>
                            入力された情報は自動で保存されますので、入力後の追加連絡は必要ありません。申込書の提出締め切りは2025年4月6日です。期限時点で入力済みの情報をもって、お申し込みとさせていただきます。
                        </p>
                    </AppCard>

                    <a :href="spreadSheetUrl" target="_blank" rel="noopener noreferrer" class="link">
                        <AppButton variant="filled">申し込み書を開く</AppButton>
                    </a>

                    <div class="copy">
                        <AppButton variant="outlined" @click="copy">
                            リンクをコピー
                            <Icon icon="mdi:content-copy" width="1em" height="1em" />
                        </AppButton>
                    </div>
                </div>
            </AppTransition>
        </template> -->

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

    <!-- <OverlayLoading :show="isShowOverlayLoading" />
    <OverlaySubmit :show="isShowOverlaySubmit" /> -->
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.submit {
    height: 4em;
    margin: .5em 0 0;
}

.message {
    margin: 10vh auto;
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
