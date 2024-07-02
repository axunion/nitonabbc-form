<script setup lang="ts">
import { computed, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import AppInputCheckbox from '@/components/AppInputCheckbox.vue'
import AppInputRadio from '@/components/AppInputRadio.vue'
import AppInputSelect from '@/components/AppInputSelect.vue'
import AppInputText from '@/components/AppInputText.vue'
import IconClose from '@/components/IconClose.vue'
import OverlaySubmit from '@/components/OverlaySubmit.vue'
import RecaptchaText from '@/components/RecaptchaText.vue'
import { type PostData, useSubmit } from '@/composables/useSubmit'
import { KEIYO } from '@/constants/keiyo'

const { state, error, post } = useSubmit()
const datalist = KEIYO.map((item) => item.label)
const dueDate = new Date('2024-08-05')
const now = new Date()
const isExpired = ref(now > dueDate)
const postData = ref<PostData>({
  type: '202409',
  recaptcha: '',
  church: '',
  name: '',
  kana: '',
  age: '',
  gender: '',
  status: '',
  party: []
})

const isShowInput = computed(() => ['', 'submitting'].includes(state.value))
const isDisabled = computed(() => ['submitting', 'submitted'].includes(state.value))

const submit = async () => {
  await post(postData.value)

  if (error.value) {
    console.error(error.value)
  }
}

document.title = '京葉地区一泊お泊まり会参加申込'
</script>

<template>
  <header class="header">
    <div class="header-content">
      <h1 class="h1">
        京葉地区一泊お泊まり会参加申込<br />
        Keiyo Area Overnight Retreat Registration
      </h1>
      <div class="date">
        開催日：2024年9月22日〜23日<br />
        Event Dates: September 22-23, 2024
      </div>
    </div>
  </header>

  <main class="main">
    <template v-if="!isExpired">
      <form v-if="isShowInput" class="form" @submit.prevent="submit">
        <AppInputText
          name="church"
          label="教会名 - Church Name"
          maxlength="128"
          :required="true"
          :disabled="false"
          :datalist="datalist"
          v-model="postData.church"
        />

        <AppInputText
          name="name"
          label="氏名 - Full Name"
          maxlength="64"
          :required="true"
          :disabled="false"
          v-model="postData.name"
        />

        <AppInputText
          name="kana"
          label="ふりがな - Phonetic Name"
          maxlength="64"
          :required="true"
          :disabled="false"
          v-model="postData.kana"
        />

        <AppInputText
          name="kana"
          label="年齢 - Age"
          maxlength="3"
          :required="true"
          :disabled="false"
          v-model="postData.age"
        />

        <AppInputRadio
          name="gender"
          label="性別 - Gender"
          :items="[
            { label: '男性 - Male', value: '男性' },
            { label: '女性 - Female', value: '女性' }
          ]"
          v-model="postData.gender"
        />

        <AppInputRadio
          name="status"
          label="教会員など - Church Member"
          :items="[
            { label: '教会員 - Church Member', value: '教会員' },
            { label: '非教会員 - Non-Church Member', value: '非教会員' },
            { label: '指導者 - Leader', value: '指導者' }
          ]"
          v-model="postData.status"
        />

        <div class="message">
          <p>一泊お泊まり会の詳細については、下記の案内をご確認ください。</p>
          <p>Please refer to the information below for details about the event.</p>
          <p>
            <a href="https://info.nitonabbc.org/2024/09/" target="_blank" rel="noopener noreferrer">
              ご案内 - Announcement
            </a>
          </p>
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
      <div v-if="isExpired" class="card">
        <IconClose class="icon-close" />
        <p>この申込は終了しています。</p>
      </div>
    </template>
  </main>

  <footer class="footer">
    <div>担当：仁戸名聖書バプテスト教会</div>
    <!-- <RecaptchaText /> -->
  </footer>

  <OverlaySubmit :isActive="state === 'submitting'" />
</template>

<style scoped>
.header {
  margin: auto;
  max-width: var(--content-max-wieght);
  padding: 1em 1em 0;
}

.header-content {
  background: white;
  border-left: var(--color-primary) solid 4px;
  border-right: var(--color-primary) solid 4px;
  box-shadow: 0 1px 3px gray;
  margin: auto;
  padding: 1.5em 1em;
}

.h1 {
  font-size: 100%;
  margin: 0 0 1.5em;
}

.date {
  font-size: 90%;
  margin: auto;
  text-align: right;
}

.main {
  margin: auto;
  max-width: var(--content-max-wieght);
  padding: 1em;
  position: relative;
  z-index: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.message {
  border: var(--color-divider) solid 1px;
  border-radius: 0.5em;
  margin: 0.5em 0;
  padding: 1em 1.5em;
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
  padding: 1em;
  text-align: center;
}

.v-enter-active {
  animation: fade-up-in 0.5s;
}

.v-leave-active {
  animation: fade-up-in 0.5s reverse;
}
</style>
