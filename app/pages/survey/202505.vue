<script setup lang="ts">
const type = "202505s";
const deadline = Date.parse("2025-05-18T23:59:59+09:00");
const storageKey = "orqpboeruhqpeorhj";
const requiredNames = ["name"];

const { postState, error, checkExpiration, postToSheet } = useApi();
const expirationState = ref<boolean | null>(null);
const postData = ref({
  type,
  recaptcha: "",
  noticeClarity: "",
  noticeFrequency: "",
  websiteClarity: "",
  websiteInfo: "",
  schedule: "",
  favorite: [],
  futureThemes: [],
  kaizen: "",
  opinion: "",
});
const isShowOverlayLoading = computed(() => expirationState === null);
const isShowOverlaySubmit = computed(() => ["submitting"].includes(postState.value));
const isShowInput = computed(() => ["idle", "submitting"].includes(postState.value));
const isDisabled = computed(() =>
  // requiredNames.every(key => postData.value[key] === '') ||
  ["submitting", "submitted"].includes(postState.value)
);

const submit = async () => {
  console.log(postData.value);
  // const result = await postToSheet(postData.value)

  // if (error.value) {
  //   console.error(error.value)
  // }
};

onMounted(async () => {
  // expirationState.value = await checkExpiration(deadline);
});

useHead({
  title: "2025 JBBF全国青年フェローシップキャンプ アンケート",
});
</script>

<template>
  <HeaderDefault>
    <template #heading>2025 JBBF全国青年フェローシップキャンプ アンケート</template>
    <template #date>開催日：2025年5月5日〜7日</template>
  </HeaderDefault>

  <main>
    <template v-if="expirationState === null">
      <form v-if="isShowInput" class="form" @submit.prevent="submit">
        <AppCard>
          <p>このたびはご参加いただき、誠にありがとうございました。今後のキャンプ運営の参考とさせていただきたく、ぜひアンケートにご協力ください。</p>
        </AppCard>

        <FormBox>
          <template #label>お知らせについて</template>

          <p class="question">ご案内はわかりやすかったでしょうか？</p>
          <AppInputRadio name="noticeClarity" :items="[
            { label: 'とてもわかりやすかった', value: 'とてもわかりやすかった' },
            { label: 'わかりやすかった', value: 'わかりやすかった' },
            { label: 'どちらともいえない', value: 'どちらともいえない' },
            { label: 'わかりにくかった', value: 'わかりにくかった' },
            { label: 'とてもわかりにくかった', value: 'とてもわかりにくかった' }
          ]" v-model="postData.noticeClarity" />

          <p class="question">ご案内の回数は適切でしたでしょうか？</p>
          <AppInputRadio name="noticeFrequency" :items="[
            { label: '多かった', value: '多かった' },
            { label: 'ちょうどよかった', value: 'ちょうどよかった' },
            { label: '少なかった', value: '少なかった' }
          ]" v-model="postData.noticeFrequency" />

          <p class="question">Webサイトはわかりやすかったでしょうか？</p>
          <AppInputRadio name="websiteClarity" :items="[
            { label: 'とてもわかりやすかった', value: 'とてもわかりやすかった' },
            { label: 'わかりやすかった', value: 'わかりやすかった' },
            { label: 'どちらともいえない', value: 'どちらともいえない' },
            { label: 'わかりにくかった', value: 'わかりにくかった' },
            { label: 'とてもわかりにくかった', value: 'とてもわかりにくかった' }
          ]" v-model="postData.websiteClarity" />

          <p class="question">Webサイトの情報量は適切でしたでしょうか？</p>
          <AppInputRadio name="websiteInfo" :items="[
            { label: '多かった', value: '多かった' },
            { label: 'ちょうどよかった', value: 'ちょうどよかった' },
            { label: '少なかった', value: '少なかった' }
          ]" v-model="postData.websiteInfo" />
        </FormBox>


        <FormBox>
          <template #label>プログラムについて</template>

          <p class="question">スケジュールの内容や進行はいかがでしたか？</p>
          <AppInputRadio name="schedule" :items="[
            { label: '忙しく感じた', value: '忙しく感じた' },
            { label: 'ちょうどよかった', value: 'ちょうどよかった' },
            { label: 'ゆっくりすぎた', value: 'ゆっくりすぎた' }
          ]" v-model="postData.schedule" />

          <p class="question">特に楽しかった、または満足されたプログラムをすべて選択してください。</p>
          <AppInputCheckbox name="favorite" :items="[
            { label: '自由交わり', value: '自由交わり' },
            { label: '分科会', value: '分科会' },
            { label: '全体レクリエーション', value: '全体レクリエーション' },
            { label: '選択レクリエーション', value: '選択レクリエーション' }
          ]" v-model="postData.favorite" />

          <p class="question">興味のある分科会のテーマに当てはまるものをすべて選択してください。</p>
          <AppInputCheckbox name="futureThemes" :items="[
            { label: '教会内の人間関係', value: '教会内の人間関係' },
            { label: '賛美', value: '賛美' },
            { label: '社会での輝き方', value: '社会での輝き方' },
            { label: 'クリスチャンホームの悩み', value: 'クリスチャンホームの悩み' },
            { label: '奉仕', value: '奉仕' },
            { label: 'クリスチャンホームの悩み', value: 'クリスチャンホームの悩み' },
          ]" v-model="postData.futureThemes" />
        </FormBox>

        <FormBox>
          <p class="question">改善してほしい点や、新たに取り入れてほしいプログラムがあれば教えてください。</p>
          <AppTextarea name="kaizen" v-model="postData.kaizen" />

          <p class="question">その他のご意見やご感想があれば自由にご記入ください。</p>
          <AppTextarea name="opinion" v-model="postData.opinion" />
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

    <FormClose v-if="expirationState">
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
  font-size: 90%;
  line-height: 1.4;
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
