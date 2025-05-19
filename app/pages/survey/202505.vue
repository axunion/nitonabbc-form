<script setup lang="ts">
const type = "202505s";
// const deadline = Date.parse("2025-05-18T23:59:59+09:00") / 1000;

const { postState, error, /* checkExpiration ,*/ postToSheet } = useApi();
const expirationState = ref<boolean | null>(true);
const isShowOverlayLoading = computed(() => expirationState.value === null);
const isShowOverlaySubmit = computed(() => ["submitting"].includes(postState.value));
const isShowInput = computed(() => ["idle", "submitting"].includes(postState.value));
const isDisabled = computed(() =>
  ["submitting", "submitted"].includes(postState.value)
);
const postData = ref({
  type,
  recaptcha: "",
  noticeClarity: "",
  noticeFrequency: "",
  websiteClarity: "",
  entryClarity: "",
  participationReason: [],
  schedule: "",
  favorite: [],
  fellowship: "",
  growth: "",
  kaizen: "",
  opinion: "",
});

const submit = async () => {
  const result = await postToSheet(postData.value)

  if (error.value) {
    console.error(error.value)
  }
};

onMounted(async () => {
  // await useNuxtApp().$loadRecaptcha()
  // expirationState.value = await checkExpiration(deadline);
});

useHead({
  title: "2025 JBBF全国青年フェローシップキャンプ アンケート",
});
</script>

<template>
  <HeaderDefault>
    2025 JBBF全国青年フェローシップキャンプアンケート
    <template #date>開催日：2025年5月5日〜7日</template>
  </HeaderDefault>

  <main>
    <template v-if="expirationState === false">
      <form v-if="isShowInput" class="form" @submit.prevent="submit">
        <AppCard>
          <p>
            このたびはご参加いただき、誠にありがとうございました。今後のキャンプ運営の参考とさせていただきたく、ぜひアンケートにご協力ください。
          </p>
        </AppCard>

        <FormBox>
          <h2 class="h2">お知らせについて</h2>

          <p class="question">ご案内は分かりやすかったですか？</p>
          <AppInputRadio name="noticeClarity" :items="[
            { label: 'とてもわかりやすかった', value: 'とてもわかりやすかった' },
            { label: 'わかりやすかった', value: 'わかりやすかった' },
            { label: 'どちらともいえない', value: 'どちらともいえない' },
            { label: 'わかりにくかった', value: 'わかりにくかった' },
            { label: 'とてもわかりにくかった', value: 'とてもわかりにくかった' },
          ]" v-model="postData.noticeClarity" />

          <p class="question">ご案内の回数は適切でしたか？</p>
          <AppInputRadio name="noticeFrequency" :items="[
            { label: '多いと感じた', value: '多いと感じた' },
            { label: '適切だった', value: '適切だった' },
            { label: '少ないと感じた', value: '少ないと感じた' },
          ]" v-model="postData.noticeFrequency" />

          <p class="question">Webサイトはわかりやすかったですか？</p>
          <AppInputRadio name="websiteClarity" :items="[
            { label: 'とてもわかりやすかった', value: 'とてもわかりやすかった' },
            { label: 'わかりやすかった', value: 'わかりやすかった' },
            { label: 'どちらともいえない', value: 'どちらともいえない' },
            { label: 'わかりにくかった', value: 'わかりにくかった' },
            { label: 'とてもわかりにくかった', value: 'とてもわかりにくかった' },
          ]" v-model="postData.websiteClarity" />
        </FormBox>

        <FormBox>
          <h2 class="h2">お申し込みについて</h2>

          <p class="question">お申し込み方法は分かりやすかったですか？</p>
          <AppInputRadio name="entryClarity" :items="[
            { label: 'とてもわかりやすかった', value: 'とてもわかりやすかった' },
            { label: 'わかりやすかった', value: 'わかりやすかった' },
            { label: 'どちらともいえない', value: 'どちらともいえない' },
            { label: 'わかりにくかった', value: 'わかりにくかった' },
            { label: 'とてもわかりにくかった', value: 'とてもわかりにくかった' },
          ]" v-model="postData.entryClarity" />

          <p class="question">
            今回の青年キャンプに参加しようと思った理由を教えてください。<br />
            （該当するものをすべて選んでください）
          </p>
          <AppInputCheckbox name="participationReason" :items="[
            { label: '毎回参加しているため', value: '毎回参加しているため' },
            { label: '教会や友人に誘われたため', value: '教会や友人に誘われたから' },
            { label: '案内やWebサイトを見て興味を持ったため', value: '案内やWeb サイトを見て興味を持ったため' },
            { label: '特にメッセージに期待があったため', value: '特にメッセージに期待があったため' },
            { label: '同世代と交流したかったため', value: '同世代と交流したかったため' },
            { label: 'プログラム内容に魅力を感じたため', value: 'プログラム内容に魅力を感じたため' },
            { label: 'キャンプ聖歌隊に参加したかったため', value: 'キャンプ聖歌隊に参加したかったため' },
            { label: '分科会に参加したいテーマがあったため', value: '分科会に参加したいテーマがあったため' },
            { label: 'レクリエーションを楽しみにしていたため', value: 'レクリエーションを楽しみにしていたため' },
          ]" v-model="postData.participationReason" />
        </FormBox>

        <FormBox>
          <h2 class="h2">内容について</h2>

          <p class="question">全体のスケジュール進行はいかがでしたか？</p>
          <AppInputRadio name="schedule" :items="[
            { label: 'とても忙しいと感じた', value: 'とても忙しいと感じた' },
            { label: 'やや忙しいと感じた', value: 'やや忙しいと感じた' },
            { label: '適切だった', value: '適切だった' },
            { label: 'ややゆっくりだと感じた', value: 'ややゆっくりだと感じた' },
            { label: 'とてもゆっくりだと感じた', value: 'とてもゆっくりだと感じた' },
          ]" v-model="postData.schedule" />

          <p class="question">
            特に楽しかった、または満足されたプログラムを教えてください。<br />
            （該当するものをすべて選んでください）
          </p>
          <AppInputCheckbox name="favorite" :items="[
            { label: '自由交わり', value: '自由交わり' },
            { label: 'キャンプ聖歌隊', value: 'キャンプ聖歌隊' },
            { label: '分科会', value: '分科会' },
            { label: '午前レクリエーション', value: '午前レクリエーション' },
            { label: '午後レクリエーション', value: '午後レクリエーション' },
          ]" v-model="postData.favorite" />

          <p class="question">新しい交わりは生まれましたか？</p>
          <AppInputRadio name="fellowship" :items="[
            { label: 'とても生まれた', value: 'とても生まれた' },
            { label: '生まれた', value: '生まれた' },
            { label: 'どちらともいえない', value: 'どちらともいえない' },
            { label: 'あまり生まれなかった', value: 'あまり生まれなかった' },
            { label: '全く生まれなかった', value: '全く生まれなかった' },
          ]" v-model="postData.fellowship" />

          <p class="question">キャンプを通して信仰は深まりましたか？</p>
          <AppInputRadio name="growth" :items="[
            { label: '大いに深まった', value: '大いに深まった' },
            { label: '少し深まった', value: '少し深まった' },
            { label: '変化はなかった', value: '変化はなかった' },
            { label: 'あまり深まらなかった', value: 'あまり深まらなかった' },
            { label: '全く深まらなかった', value: '全く深まらなかった' },
          ]" v-model="postData.growth" />
        </FormBox>

        <FormBox>
          <h2 class="h2">その他</h2>

          <p class="question">改善してほしい点や、新たに取り入れてほしいプログラムがございましたらご記入ください。</p>
          <AppTextarea name="kaizen" v-model="postData.kaizen" />

          <p class="question">その他のご意見やご感想がありましたら、ご自由にご記入ください。</p>
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
      このアンケートは終了しています。
    </FormClose>
  </main>

  <OverlayLoading :show="isShowOverlayLoading" />
  <OverlaySubmit :show="isShowOverlaySubmit" />
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: .75em;
}

.h2 {
  font-size: 100%;
  margin: 0;
  text-align: center;
}

.question {
  border-left: var(--color-divider) solid 3px;
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
