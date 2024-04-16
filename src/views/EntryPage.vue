<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSubmit } from '@/composables/useSubmit'
import AppButton from '@/components/AppButton.vue'
import AppInputCheckbox from '@/components/AppInputCheckbox.vue'
import AppInputRadio from '@/components/AppInputRadio.vue'
import AppInputSelect from '@/components/AppInputSelect.vue'
import AppInputText from '@/components/AppInputText.vue'
import IconClose from '@/components/IconClose.vue'
import OverlaySubmit from '@/components/OverlaySubmit.vue'
import RecaptchaText from '@/components/RecaptchaText.vue'
import { type Definition, type PostData, getStructure } from '@/utils/structure'

const route = useRoute()
const { state, error, post } = useSubmit<PostData>()
const definition = ref<Definition>()
const postData = ref<PostData>({})
const isExpired = ref(true)

const isShowInput = computed(() => !isExpired.value && ['', 'submitting'].includes(state.value))
const isSubmitDisabled = computed(() => ['submitting', 'submitted'].includes(state.value))

const submit = async () => {
  await post(postData.value)

  if (error.value) {
    console.error(error.value)
  }
}

watch(
  () => route.params.target,
  (target) => {
    if (target && typeof target === 'string') {
      const structure = getStructure(target)

      if (structure) {
        if (new Date() > new Date(structure.definition.dueDate)) {
          isExpired.value = true
        }

        definition.value = structure.definition
        postData.value = structure.defaultPostData
        document.title = structure.definition.heading || ''
      } else {
        definition.value = undefined
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <template v-if="definition">
    <header class="header">
      <h1 class="h1">{{ definition.heading }}</h1>
      <div v-if="definition.date" class="date">開催日：{{ definition.date }}</div>
    </header>

    <main class="main">
      <form v-if="isShowInput" class="form" @submit.prevent="submit">
        <template v-for="item in definition.items" :key="item.name">
          <AppInputText
            v-if="item.type === 'text'"
            :name="item.name"
            :label="item.label"
            :datalist="item.datalist"
            :maxlength="item.maxlength"
            :required="item.required"
            :disabled="item.disabled"
            v-model="postData[item.name]"
          />

          <AppInputSelect
            v-else-if="item.type === 'select'"
            :name="item.name"
            :label="item.label"
            :options="item.options"
            :required="item.required"
            :disabled="item.disabled"
            v-model="postData[item.name]"
          />

          <AppInputRadio
            v-else-if="item.type === 'radio'"
            :name="item.name"
            :label="item.label"
            :items="item.radioItems"
            v-model="postData[item.name]"
          />

          <AppInputCheckbox
            v-else-if="item.type === 'checkbox'"
            :name="item.name"
            :label="item.label"
            :items="item.checkboxItems"
            v-model="postData[item.name]"
          />
        </template>

        <div v-if="definition.message || definition.link" class="message">
          <p v-if="definition.message" v-text="definition.message"></p>
          <p v-if="definition.link">
            詳細は
            <a :href="definition.link" target="_blank" rel="noopener noreferrer">ご案内</a>
            をご確認ください。
          </p>
        </div>

        <div>
          <AppButton type="submit" label="送信" variant="filled" :disabled="isSubmitDisabled" />
        </div>
      </form>

      <Transition>
        <div v-if="state === 'submitted'" class="note">
          <p>送信が完了しました。<br />ありがとうございました。</p>
        </div>
      </Transition>

      <Transition>
        <div v-if="state === 'failed'" class="note">
          <p>送信に失敗しました。<br />恐れ入りますが再度お試しください。</p>
        </div>
      </Transition>

      <div v-if="isExpired" class="note">
        <IconClose />
        <p>この申込は終了しています。</p>
      </div>
    </main>

    <footer class="footer">
      <div>主催：{{ definition.organizer }}</div>
      <RecaptchaText />
    </footer>

    <OverlaySubmit :isActive="state === 'submitting'" />
  </template>
</template>

<style scoped>
.header {
  padding: 2em 1em 0;
}

.h1 {
  font-size: 125%;
  letter-spacing: 1px;
  margin: 0 0 0.5em;
  text-align: center;
}

.date {
  font-size: 90%;
  margin: auto;
  max-width: var(--content-max-wieght);
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
  padding: 1em 1.5em;
}

.note {
  background: white;
  border-radius: 0.5em;
  box-shadow: 0 1px 3px gray;
  margin: 10vh 1em;
  padding: 10vh 1.5em;
  text-align: center;
}

.footer {
  font-size: 85%;
  margin: 15vh 0 0;
  text-align: center;
}

.v-enter-active {
  animation: fade-up-in 0.5s;
}

.v-leave-active {
  animation: fade-up-in 0.5s reverse;
}
</style>
