<script setup lang="ts">
import { computed, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import AppInputCheckbox from '@/components/AppInputCheckbox.vue'
import AppInputRadio from '@/components/AppInputRadio.vue'
import AppInputSelect from '@/components/AppInputSelect.vue'
import AppInputText from '@/components/AppInputText.vue'
import IconClose from '@/components/IconClose.vue'
import { type PostData, useSubmit } from '@/composables/useSubmit'
import { KEIYO } from '@/constants/keiyo'

const { state /* error, post */ } = useSubmit()
const datalist = KEIYO.map((item) => item.label)
const dueDate = new Date('2024-02-19')
const now = new Date()
const isExpired = ref(now > dueDate)
const postData = ref<PostData>({
  type: '202402',
  recaptcha: '',
  church: '',
  name: '',
  kana: '',
  generation: '',
  gender: '',
  status: '',
  party: []
})

const isShowInput = computed(() => ['', 'submitting'].includes(state.value))
const isDisabled = computed(() => ['submitting', 'submitted'].includes(state.value))

const submit = async () => {
  // await post(postData.value)
  // if (error.value) {
  //   console.error(error.value)
  // }
}

document.title = '京葉地区合同青年会参加申込'
</script>

<template>
  <header class="header">
    <h1 class="h1">京葉地区合同青年会参加申込</h1>
    <div class="date">開催日：2024年2月25日</div>
  </header>

  <main class="main">
    <template v-if="!isExpired">
      <form v-if="isShowInput" class="form" @submit.prevent="submit">
        <AppInputText
          name="church"
          label="教会名"
          maxlength="128"
          :required="true"
          :disabled="false"
          :datalist="datalist"
          v-model="postData.church"
        />

        <AppInputText
          name="name"
          label="氏名"
          maxlength="64"
          :required="true"
          :disabled="false"
          v-model="postData.name"
        />

        <AppInputText
          name="kana"
          label="ふりがな"
          maxlength="64"
          :required="true"
          :disabled="false"
          v-model="postData.kana"
        />

        <AppInputSelect
          name="generation"
          label="世代"
          :required="true"
          :disabled="false"
          :options="[
            { label: '10代', value: '10代' },
            { label: '20代', value: '20代' },
            { label: '30代', value: '30代' },
            { label: '40代', value: '40代' },
            { label: '50代', value: '50代' },
            { label: '60代', value: '60代' }
          ]"
          v-model="postData.generation"
        />

        <AppInputRadio
          name="gender"
          label="性別"
          :items="[
            { label: '男性', value: '男性' },
            { label: '女性', value: '女性' }
          ]"
          v-model="postData.gender"
        />

        <AppInputRadio
          name="status"
          label="教会員など"
          :items="[
            { label: '教会員', value: '教会員' },
            { label: '非教会員', value: '非教会員' },
            { label: '指導者', value: '指導者' }
          ]"
          v-model="postData.status"
        />

        <AppInputCheckbox
          name="party"
          label="懇親会"
          :items="[{ label: '参加', value: '参加', required: false }]"
          v-model="postData.party"
        />

        <div class="message">
          <p>今回の交わり会は参加費不要です。懇親会にご参加される方は1500円が必要となります。</p>
          <p>
            詳細は
            <a href="https://info.nitonabbc.org/2024/02/" target="_blank" rel="noopener noreferrer">
              ご案内
            </a>
            をご確認ください。
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

  <footer v-if="!isExpired" class="footer">
    <div>主催：仁戸名聖書バプテスト教会</div>
  </footer>
</template>

<style scoped>
.header {
  padding: 1em 0 0;
}

.h1 {
  font-size: 125%;
  letter-spacing: 1px;
  margin: 0 0 0.5em;
  text-align: center;
}

.date {
  font-size: 90%;
  text-align: right;
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
  text-align: center;
}
</style>
