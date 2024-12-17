<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AppButton from "@/components/AppButton.vue";
import AppInputCheckbox from "@/components/AppInputCheckbox.vue";
import AppInputRadio from "@/components/AppInputRadio.vue";
import AppInputText from "@/components/AppInputText.vue";
import IconClose from "@/components/IconClose.vue";
// import RecaptchaText from '@/components/RecaptchaText.vue'
import { useSubmit } from "@/composables/useSubmit";
import { KEIYO } from "@/constants/keiyo";

const { state /* error, checkExpiration, post */ } = useSubmit();
const datalist = KEIYO.map((item) => item.label);
const type = "202409";
const isExpired = ref<boolean | null>(true);
const postData = ref({
  type,
  recaptcha: "",
  church: "",
  name: "",
  kana: "",
  age: "",
  gender: "",
  status: "",
  participationOption: "",
  participationDetails: [] as string[],
  recreation: "",
  thematicMeetings: "",
  musicMinisters: [] as string[],
  instrument: "",
  surveyInterested: [] as string[],
  surveyImportant: [] as string[],
  surveyReflect: [] as string[],
});

const isShowInput = computed(() => ["", "submitting"].includes(state.value));
const isDisabled = computed(() =>
  ["submitting", "submitted"].includes(state.value),
);

const participationFee = computed(() => {
  const table: Record<string, number> = {
    夕食: 1400,
    宿泊: Number.parseInt(postData.value.age as string) <= 22 ? 3500 : 4500,
    朝食: 700,
    昼食: 1400,
  };
  const details = postData.value.participationDetails;
  const fee = details.reduce((acc, cur) => acc + table[cur], 0);
  return `¥ ${fee.toLocaleString()}`;
});

const submit = async () => {
  // await post(postData.value)
  // if (error.value) {
  //   console.error(error.value)
  // }
};

onMounted(async () => {
  document.title = "京葉地区一泊お泊まり会参加申込";
  // isExpired.value = await checkExpiration(type)
});
</script>

<template>
  <header class="header">
    <h1 class="h1">
      京葉地区一泊お泊まり会参加申込<br />
      Keiyo Area Retreat Registration
    </h1>
    <div class="date">
      開催日：2024年9月22日〜23日<br />
      Event Dates: September 22-23, 2024
    </div>
  </header>

  <main class="main">
    <template v-if="isExpired === false">
      <form v-if="isShowInput" class="form" @submit.prevent="submit">
        <div class="input-box">
          <div class="input-label">教会名 - Church Name</div>
          <AppInputText
            name="church"
            maxlength="128"
            :required="true"
            :datalist="datalist"
            v-model="postData.church"
          />
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
          <AppInputRadio
            name="gender"
            :items="[
              { label: '男性 - Male', value: '男性' },
              { label: '女性 - Female', value: '女性' }
            ]"
            v-model="postData.gender"
          />
        </div>

        <div class="input-box">
          <div class="input-label">教会員など - Church Member</div>
          <AppInputRadio
            name="status"
            :items="[
              { label: '教会員 - Church Member', value: '教会員' },
              { label: '非教会員 - Non-Church Member', value: '非教会員' },
              { label: '指導者 - Leader', value: '指導者' }
            ]"
            v-model="postData.status"
          />
        </div>

        <div class="input-box">
          <div class="input-label">参加形式 - Participation Options</div>
          <AppInputRadio
            name="participation-option"
            :items="[
              { label: '全日参加 - Full-day Participation', value: '全日参加' },
              { label: '部分参加 - Partial Participation', value: '部分参加' }
            ]"
            v-model="postData.participationOption"
          />

          <div v-if="postData.participationOption === '部分参加'" class="nest">
            <AppInputCheckbox
              name="participation-details"
              :items="[
                { label: '夕食 - Dinner', value: '夕食' },
                { label: '宿泊 - Accommodation', value: '宿泊' },
                { label: '朝食 - Breakfast', value: '朝食' },
                { label: '昼食 - Lunch', value: '昼食' }
              ]"
              v-model="postData.participationDetails"
            />

            <div class="participation-fee">{{ participationFee }}</div>
          </div>
        </div>

        <div class="input-box">
          <div class="input-label">レクリエーション - Recreation</div>
          <AppInputRadio
            name="recreation"
            :items="[
              { label: 'スポーツ - Sports', value: 'スポーツ' },
              { label: '周辺散策 - Nearby Exploration', value: '周辺散策' },
              { label: '不参加 - Non-attendance', value: '不参加' }
            ]"
            v-model="postData.recreation"
          />
        </div>

        <div class="input-box">
          <div class="input-label">テーマ別集会 - Thematic Meetings</div>
          <AppInputRadio
            name="thematic-meetings"
            :items="[
              { label: '結婚 - Marriage', value: '結婚' },
              { label: '献身 - Devotion', value: '献身' },
              { label: '仕事と教会生活 - Work and Church Life', value: '仕事と教会生活' },
              { label: '礼拝 - Worship', value: '礼拝' },
              { label: '日曜学校 - Sunday School', value: '日曜学校' },
              { label: '不参加 - Non-attendance', value: '不参加' }
            ]"
            v-model="postData.thematicMeetings"
          />
        </div>

        <div class="input-box">
          <div class="input-label">奏楽奉仕 - Music Ministry</div>
          <AppInputCheckbox
            name="music-ministers"
            :items="[{ label: '希望する - I am interested', value: '希望する' }]"
            v-model="postData.musicMinisters"
          />

          <div v-if="postData.musicMinisters.includes('希望する')" class="nest">
            <div class="input-label">楽器 - Instrument</div>
            <AppInputText name="instrument" maxlength="32" v-model="postData.instrument" />
          </div>
        </div>

        <div class="input-box">
          <p>
            グループ分けの参考にするため、簡単なアンケートにご協力ください。当てはまるものをすべて選択し、どれにも当てはまらない場合は、何も選択しないでください。
          </p>
          <p>
            To help with group assignments, please complete this brief survey. Select all that
            apply, and if none of the options apply to you, please do not select any.
          </p>

          <p class="question">
            交わり会で重視する目的を選んでください。<br />
            What objectives do you consider important for attending the retreat?
          </p>
          <AppInputCheckbox
            name="survey-important"
            :items="[
              { label: '新しい出会い - Meeting new people', value: '新しい出会い' },
              { label: '信仰の深まり - Deepening faith', value: '信仰の深まり' },
              { label: '知識の向上 - Improving knowledge', value: '知識の向上' },
              { label: 'アクティブな交流 - Active interaction', value: 'アクティブな交流' },
              { label: 'リフレッシュ - Refreshment', value: 'リフレッシュ' }
            ]"
            v-model="postData.surveyImportant"
          />

          <p class="question">
            興味のあるトピックを教えてください。<br />
            Please select the topics you are interested in.
          </p>
          <AppInputCheckbox
            name="survey-interested"
            :items="[
              { label: 'テクノロジー - Technology', value: 'テクノロジー' },
              { label: 'ウェルネス - Wellness', value: 'ウェルネス' },
              { label: 'アートと文化 - Arts and Culture', value: 'アートと文化' },
              { label: 'ビジネス - Business', value: 'ビジネス' },
              { label: 'サステナビリティ - Sustainability', value: 'サステナビリティ' }
            ]"
            v-model="postData.surveyInterested"
          />

          <p class="question">
            教会の教えと世の中の動向に関して、考えたいテーマを教えてください。<br />
            Please select the themes you would like to reflect on related to the church’s teachings
            and current societal trends.
          </p>
          <AppInputCheckbox
            name="survey-reflect"
            :items="[
              { label: 'AIの倫理 - Ethics of AI', value: 'AIの倫理' },
              { label: 'LGBTQ+', value: 'LGBTQ+' },
              { label: 'SNSと信仰生活 - SNS and faith life', value: 'SNSと信仰生活' },
              { label: '現代医学 - Modern medicine', value: '現代医学' },
              { label: '家族の価値観 - Family values', value: '家族の価値観' }
            ]"
            v-model="postData.surveyReflect"
          />
        </div>

        <div class="message">
          <p>一泊お泊まり会の詳細については、下記のご案内をご確認ください。</p>
          <p>Please refer to the information below for details about the event.</p>
          <p>
            <a href="https://info.nitonabbc.org/2024/09/" target="_blank" rel="noopener noreferrer">
              京葉地区一泊お泊まり会のご案内<br />
              Keiyo Area Retreat Announcement
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

    <template v-if="isExpired === true">
      <div class="card">
        <IconClose class="icon-close" />
        <p>この申込は終了しています。</p>
      </div>
    </template>
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

.nest {
  margin: 1em 2em 0;
}

.participation-fee {
  border-top: var(--color-subtext) solid 1px;
  color: var(--color-subtext);
  margin: 1em 0 0;
  padding: 0.5em 1em 0;
  text-align: right;
  width: 200px;
}

.question {
  border-left: var(--color-divider) solid 2px;
  margin: 2em 0 1em;
  padding: 0 0 0 1em;
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
