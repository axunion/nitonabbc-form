<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import AppInputCheckbox from '@/components/AppInputCheckbox.vue'
import AppInputRadio from '@/components/AppInputRadio.vue'
import AppTextarea from '@/components/AppTextarea.vue'
import IconClose from '@/components/IconClose.vue'
import RecaptchaText from '@/components/RecaptchaText.vue'
import { type PostData, useSubmit } from '@/composables/useSubmit'
import { useOverlayStore } from '@/stores/overlay'

const { state, error, post } = useSubmit()
const { showOverlayLoading, hideOverlayLoading } = useOverlayStore()

const type = 'surveys202409'
const isExpired = false
const postData = ref<PostData>({
  type,
  recaptcha: '',
  place: '',
  meal: '',
  facility: '',
  schedule: '',
  recreation: [],
  thematicMeetings: [],
  nextThematicMeetings: [],
  kaizen: '',
  opinion: ''
})

const isShowInput = computed(() => ['', 'submitting'].includes(state.value))
const isDisabled = computed(() => ['submitting', 'submitted'].includes(state.value))

const submit = async () => {
  await post(postData.value)

  if (error.value) {
    console.error(error.value)
  }
}

showOverlayLoading()

onMounted(async () => {
  document.title = '京葉地区一泊お泊まり会アンケート'
  setTimeout(hideOverlayLoading, 1000)
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

        <div class="input-box">
          <div class="input-label">施設について</div>

          <p class="question">場所はどうでしたか？</p>

          <AppInputRadio
            name="place"
            :items="[
              { label: '満足', value: '満足' },
              { label: '普通', value: '普通' },
              { label: '不満', value: '不満' }
            ]"
            v-model="postData.place"
          />

          <p class="question">食事はどうでしたか？</p>

          <AppInputRadio
            name="meal"
            :items="[
              { label: '満足', value: '満足' },
              { label: '普通', value: '普通' },
              { label: '不満', value: '不満' }
            ]"
            v-model="postData.meal"
          />

          <p class="question">設備はどうでしたか？</p>

          <AppInputRadio
            name="facility"
            :items="[
              { label: '満足', value: '満足' },
              { label: '普通', value: '普通' },
              { label: '不満', value: '不満' }
            ]"
            v-model="postData.meal"
          />
        </div>

        <div class="input-box">
          <div class="input-label">プログラムについて</div>

          <p class="question">スケジュールは適切でしたか？</p>

          <AppInputRadio
            name="schedule"
            :items="[
              { label: '忙しかった', value: '忙しかった' },
              { label: 'ちょうどよかった', value: 'ちょうどよかった' },
              { label: 'ゆっくりすぎた', value: 'ゆっくりすぎた' }
            ]"
            v-model="postData.schedule"
          />

          <p class="question">
            特に楽しかったまたは満足したプログラムに当てはまるものをすべて選択してください。
          </p>

          <AppInputCheckbox
            name="recreation"
            :items="[
              { label: '交流会 - Fellowship time', value: '' },
              { label: 'レクリエーション - Recreation', value: '' },
              { label: 'テーマ別集会 - Themed sessions', value: '' }
            ]"
            v-model="postData.recreation"
          />

          <p class="question">
            今回参加されたテーマ別集会でまた参加したい、または今回参加できなかったため次に参加したいテーマに当てはまるものをすべて選択してください。
          </p>

          <AppInputCheckbox
            name="thematicMeetings"
            :items="[
              { label: '結婚 - Marriage', value: '結婚' },
              { label: '献身 - Devotion', value: '献身' },
              { label: '仕事と教会生活 - Work and Church Life', value: '仕事と教会生活' },
              { label: '礼拝 - Worship', value: '礼拝' },
              { label: '日曜学校 - Sunday School', value: '日曜学校' }
            ]"
            v-model="postData.thematicMeetings"
          />

          <p class="question">
            今後聞いてみたい、または興味のあるテーマに当てはまるものをすべて選択してください。
          </p>

          <AppInputCheckbox
            name="nextThematicMeetings"
            :items="[
              { label: '個人伝道', value: '個人伝道' },
              { label: '賛美', value: '賛美' },
              { label: '青年会の盛り上げ方', value: '青年会の盛り上げ方' },
              { label: '終末論', value: '終末論' },
              { label: 'イスラエルの歴史', value: 'イスラエルの歴史' },
              { label: '教会内の人間関係', value: '教会内の人間関係' },
              { label: '将来の不安', value: '将来の不安' }
            ]"
            v-model="postData.nextThematicMeetings"
          />
        </div>

        <div class="input-box">
          <div class="input-label">その他</div>

          <p class="question">
            改善してほしい点や新たに取り入れてほしいプログラムがあれば教えてください。
          </p>

          <AppTextarea name="kaizen" v-model="postData.kaizen" />

          <p class="question">その他のご意見や感想があれば自由にご記入ください。</p>

          <AppTextarea name="opinion" v-model="postData.opinion" />
        </div>

        <div class="submit">
          <AppButton type="submit" variant="filled" :disabled="isDisabled">送信</AppButton>
        </div>
      </form>

      <Transition>
        <div v-if="state === 'submitted'" class="card">
          <p>送信が完了しました。<br />ご協力ありがとうございました。</p>
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

.question {
  border-left: var(--color-divider) solid 2px;
  margin: 2em 0 1em;
  padding: 0 0 0 1em;
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
