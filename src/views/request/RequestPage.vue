<script setup lang="ts">
import { ref, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import IconArrowLeft from '@/components/IconArrowLeft.vue'
import JapaneseSyllabary from '@/components/JapaneseSyllabary.vue'
import OverlayLoading from '@/components/OverlayLoading.vue'
import { KEIYO } from '@/constants/keiyo'

const status = ref<'' | 'loading' | 'loaded' | 'failed'>('')
const character = ref<string>('')
const applicants = ref<string[]>([])

const isInitial = computed(() => status.value === '' && character.value === '')
const hasCharacter = computed(() => status.value === '' && character.value !== '')
const isLoading = computed(() => status.value === 'loading')
const isLoaded = computed(() => status.value === 'loaded')
const isFailed = computed(() => status.value === 'failed')
const nameList = computed(() => KEIYO.filter((i) => i.initial === character.value) || [])

const selectcharacter = (initial: string) => {
  character.value = initial
}

const clearCharacter = () => {
  character.value = ''
}

const selectName = (name: string) => {
  console.log(name)
  status.value = 'loaded'
}

const clearApplicants = () => {
  applicants.value = []
  status.value = ''
}

const selectApplicant = (applicant: string) => {
  console.log(applicant)
}
</script>

<template>
  <main class="main">
    <Transition mode="out-in">
      <section class="section" v-if="isInitial">
        <h1 class="h1">教会名の最初の文字を選択してください</h1>
        <JapaneseSyllabary @select-character="selectcharacter" />
      </section>

      <section class="section" v-else-if="hasCharacter">
        <div class="back-character">
          <AppButton variant="filled" @click="clearCharacter">
            <IconArrowLeft class="icon-arrow-left" />
          </AppButton>
        </div>

        <ul class="name-list">
          <li class="name-list-item" v-for="{ label } in nameList" :key="label">
            <AppButton variant="outlined" @click="selectName(label)">
              {{ label }}
            </AppButton>
          </li>
        </ul>
      </section>

      <section class="section" v-else-if="isLoaded || isFailed">
        <div class="back-character">
          <AppButton variant="filled" @click="clearApplicants">
            <IconArrowLeft class="icon-arrow-left" />
          </AppButton>
        </div>

        <p v-if="isFailed">データの取得に失敗しました</p>

        <p v-else-if="applicants.length === 0">申し込みがありません</p>

        <ul class="applicant-list" v-else>
          <li class="applicant-list-item" v-for="applicant in applicants" :key="applicant">
            <AppButton variant="outlined" @click="selectApplicant(applicant)">
              {{ applicant }}
            </AppButton>
          </li>
        </ul>
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
  padding: 20px;
}

.h1 {
  background: var(--color-subtext);
  border-radius: 2em;
  color: white;
  font-size: inherit;
  font-weight: bolder;
  margin: 20px 0 30px;
  padding: 1em 0;
  text-align: center;
}

.back-character {
  height: 40px;
  width: 64px;
}

.icon-arrow-left {
  height: 24px;
  vertical-align: -6px;
}

.name-list {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
}

.name-list-item {
  height: 40px;
  margin: 10px 0;
}
</style>
