<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import IconClose from '@/components/IconClose.vue'
import RecaptchaText from '@/components/RecaptchaText.vue'
import { type PostData, useSubmit } from '@/composables/useSubmit'

const { state, error, post } = useSubmit()
const type = '202409'
const isExpired = false
const postData = ref<PostData>({
  type,
  recaptcha: '',
  surveyInterested: [],
  surveyImportant: [],
  surveyReflect: []
})

const isShowInput = computed(() => ['', 'submitting'].includes(state.value))
const isDisabled = computed(() => ['submitting', 'submitted'].includes(state.value))

const submit = async () => {
  await post(postData.value)

  if (error.value) {
    console.error(error.value)
  }
}

onMounted(async () => {
  document.title = '京葉地区一泊お泊まり会アンケート'
})
</script>

<template>
  <header class="header">
    <h1 class="h1">
      京葉地区一泊お泊まり会アンケート<br />
      Keiyo Area Retreat Survey
    </h1>
    <div class="date">
      開催日：2024年9月22日〜23日<br />
      Event Dates: September 22-23, 2024
    </div>
  </header>

  <main class="main">
    <template v-if="!isExpired">
      <form v-if="isShowInput" class="form" @submit.prevent="submit">
        <div class="input-box">
          <p>次回開催時の参考にするため、簡単なアンケートにご協力ください。</p>
        </div>

        <div class="submit">
          <AppButton type="submit" variant="filled" :disabled="isDisabled">送信</AppButton>
        </div>
      </form>

      <Transition>
        <div v-if="state === 'submitted'" class="card">
          <p>送信が完了しました。<br />ありがとうございました。</p>
        </div>
      </Transition>

      <Transition>
        <div v-if="state === 'failed'" class="card">
          <p>送信に失敗しました。<br />恐れ入りますが再度お試しください。</p>
        </div>
      </Transition>
    </template>

    <template v-else>
      <div class="card">
        <IconClose class="icon-close" />
        <p>このアンケートは終了しています。</p>
      </div>
    </template>
  </main>

  <footer class="footer">
    <div>担当：仁戸名聖書バプテスト教会</div>
    <RecaptchaText />
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
}

.icon-close {
  height: 4em;
}

.footer {
  font-size: 85%;
  margin: 15vh 0 0;
  text-align: center;
}
</style>
