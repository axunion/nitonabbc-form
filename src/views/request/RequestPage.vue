<script setup lang="ts">
import { ref, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import IconArrowLeft from '@/components/IconArrowLeft.vue'
import IconCheckCircle from '@/components/IconCheckCircle.vue'
import JapaneseSyllabary from '@/components/JapaneseSyllabary.vue'
import OverlayLoading from '@/components/OverlayLoading.vue'
import { useRequest } from '@/composables/useRequest'
import { KEIYO } from '@/constants/keiyo'

type Appricant = {
  id: string
  name: string
  isCheckedIn: boolean
}

const { state, error, get, checkIn } = useRequest()
const character = ref<string>('')
const applicants = ref<Appricant[]>([])

const churches = computed(() => KEIYO.filter((i) => i.initial === character.value) || [])
const isInitial = computed(() => state.value === '' && character.value === '')
const hasCharacter = computed(() => state.value === '' && character.value !== '')
const isLoading = computed(() => state.value === 'loading')
const isLoaded = computed(() => state.value === 'loaded')
const isFailed = computed(() => state.value === 'failed')

const selectcharacter = (initial: string) => {
  character.value = initial
}

const clearCharacter = () => {
  character.value = ''
}

const selectChurch = async (church: string) => {
  const response = await get<Appricant[]>({ church })

  if (error.value || !response) {
    console.error(error.value)
  } else {
    applicants.value = response
  }
}

const clearApplicants = () => {
  applicants.value = []
  state.value = ''
}

const selectApplicant = async (applicant: Appricant) => {
  const result = await checkIn(applicant.id)

  if (result) {
    applicant.isCheckedIn = !applicant.isCheckedIn
  } else {
    console.error(error.value)
  }
}
</script>

<template>
  <main class="main">
    <Transition mode="out-in">
      <section v-if="isInitial" class="section">
        <h1 class="h1">教会名の最初の文字を選択してください</h1>
        <JapaneseSyllabary @select-character="selectcharacter" />
      </section>

      <section v-else-if="hasCharacter" class="section">
        <div class="back">
          <AppButton variant="filled" @click="clearCharacter">
            <IconArrowLeft class="icon-arrow-left" />
          </AppButton>
        </div>

        <div v-if="churches.length === 0" class="card">
          <p>対象の教会がありません</p>
        </div>

        <div v-else class="content">
          <ul class="list">
            <li v-for="{ label } in churches" :key="label" class="list-item">
              <AppButton @click="selectChurch(label)">{{ label }}</AppButton>
            </li>
          </ul>
        </div>
      </section>

      <section v-else-if="isLoaded || isFailed" class="section">
        <div class="back">
          <AppButton variant="filled" @click="clearApplicants">
            <IconArrowLeft class="icon-arrow-left" />
          </AppButton>
        </div>

        <div v-if="isFailed" class="card">
          <p>データの取得に失敗しました</p>
        </div>

        <div v-else-if="applicants.length === 0" class="card">
          <p>申し込みがありません</p>
        </div>

        <div v-else class="content">
          <ul class="list">
            <li
              v-for="applicant in applicants"
              :key="applicant.name"
              :class="{ checked: applicant.isCheckedIn }"
              class="list-item"
            >
              <IconCheckCircle v-if="applicant.isCheckedIn" class="icon-check-circle" />
              <AppButton @click="selectApplicant(applicant)">{{ applicant.name }}</AppButton>
            </li>
          </ul>
        </div>
      </section>
    </Transition>
  </main>

  <OverlayLoading :isActive="isLoading" />
</template>

<style scoped>
.main {
  margin: auto;
  max-width: var(--content-max-wieght);
  position: relative;
  z-index: 0;
}

.v-enter-active {
  transition: 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.section {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.h1 {
  background: var(--color-accent);
  border-radius: 2em;
  color: white;
  font-size: inherit;
  font-weight: bolder;
  margin: 0 0 20px;
  padding: 1em 0;
  text-align: center;
}

.back {
  height: 3em;
  margin: 0 0 20px;
  width: 5em;
}

.icon-arrow-left {
  height: 24px;
  vertical-align: -6px;
}

.card {
  border-radius: 4px;
  margin: 0 0 auto;
}

.content {
  margin: 0 0 auto;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-item {
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px gray;
  height: 3em;
  margin: 0 0 10px;
  position: relative;
}

.list-item.checked {
  background: transparent;
  box-shadow: inset 0 0 0 1px currentColor;
  color: var(--color-primary);
}

.icon-check-circle {
  height: 24px;
  position: absolute;
  right: 12px;
  top: 12px;
}
</style>
