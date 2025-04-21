<script setup lang="ts">
const type = "202505s";
const deadline = Date.parse("2025-05-18T23:59:59+09:00");
const storageKey = "orqpboeruhqpeorhj";
const requiredNames = ["name"];
const postData = ref<Record<string, string>>({
  type,
  recaptcha: "",
});

const { expirationState, postState, error, checkExpiration, createSheet } = useApi();
const isShowOverlayLoading = computed(() => ["idle", "checking"].includes(expirationState.value));
const isShowOverlaySubmit = computed(() => ["submitting"].includes(postState.value));
const isShowInput = computed(() => ["idle", "submitting"].includes(postState.value));
const isDisabled = computed(() =>
  requiredNames.every(key => postData.value[key] === '') ||
  ["submitting", "submitted"].includes(postState.value)
);

const submit = async () => {
  const result = await createSheet(postData.value)

  if (error.value) {
    console.error(error.value)
  }

  localStorage.setItem(storageKey, result);
};

onMounted(async () => {
  // await checkExpiration(deadline);
});

useHead({
  title: "2025 JBBF全国青年フェローシップキャンプ アンケート",
});
</script>

<template>
  <HeaderDefault>
    <template #heading>2025 JBBF全国青年フェローシップキャンプ アンケート</template>
    <template #date>開催日：2025年4月6日〜7日</template>
  </HeaderDefault>

  <main>
    <template v-if="expirationState !== 'valid'">
      <form v-if="isShowInput" class="form" @submit.prevent="submit">
        <FormBox label="お知らせについて">
          <p class="question">お知らせはわかりやすかったですか？</p>

          <AppInputRadio name="info" :items="[
            { label: '非常にわかりやすかった', value: '非常にわかりやすかった' },
            { label: 'わかりやすかった', value: 'わかりやすかった' },
            { label: '普通', value: '普通' },
            { label: 'ややわかりにくかった', value: 'ややわかりにくかった' },
            { label: 'わかりにくかった', value: 'わかりにくかった' }
          ]" v-model="postData.info" />
          Ï
          <p class="question">お知らせの回数は適切でしたか？</p>

          <AppInputRadio name="info" :items="[
            { label: '多かった', value: '多かった' },
            { label: 'ちょうどよかった', value: 'ちょうどよかった' },
            { label: '少なかった', value: '少なかった' }
          ]" v-model="postData.info" />
        </FormBox>

        <div class="submit">
          <AppButton type="submit" variant="filled" :disabled="isDisabled">送信</AppButton>
        </div>

        <RecaptchaText />
      </form>

      <AppTransition :show="postState === 'submitted'">
        <AppCard>
          <p class="message">送信が完了しました。<br />ご協力ありがとうございました。</p>
        </AppCard>
      </AppTransition>

      <AppTransition :show="postState === 'failed'">
        <AppCard>
          <p class="message">送信が失敗しました。<br />恐れ入りますが再度お試しください。</p>
        </AppCard>
      </AppTransition>
    </template>

    <FormClose v-else>
      この申込は終了しています。<br />
      This form is now closed.
    </FormClose>
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

.question {
  border-left: var(--color-divider) solid 4px;
  line-height: 1.2;
  margin: 2em 0 1em;
  padding: 0 0 0 .5em;
}

.submit {
  height: 4em;
  margin: .5em 0 0;
}

.message {
  margin: 10vh auto;
}
</style>
