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

const churches = computed(() => KEIYO.filter((i) => i.initial === character.value) || [])
const isInitial = computed(() => status.value === '' && character.value === '')
const hasCharacter = computed(() => status.value === '' && character.value !== '')
const isLoading = computed(() => status.value === 'loading')
const isLoaded = computed(() => status.value === 'loaded')
const isFailed = computed(() => status.value === 'failed')

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
      <section v-if="isInitial" class="section">
        <h1 class="h1">教会名の最初の文字を選択してください</h1>
        <JapaneseSyllabary @select-character="selectcharacter" />
      </section>

      <section v-else-if="hasCharacter" class="section">
        <div class="back-button">
          <AppButton variant="filled" @click="clearCharacter">
            <IconArrowLeft class="icon-arrow-left" />
          </AppButton>
        </div>

        <ul class="name-list">
          <li v-for="{ label } in churches" :key="label" class="name-list-item">
            <AppButton variant="outlined" @click="selectName(label)">
              {{ label }}
            </AppButton>
          </li>
        </ul>
      </section>

      <section v-else-if="isLoaded || isFailed" class="section">
        <div class="back-button">
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

        <ul v-else class="name-list">
          <li v-for="applicant in applicants" :key="applicant" class="name-list-item">
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
  background: var(--color-accent);
  border-radius: 2em;
  color: white;
  font-size: inherit;
  font-weight: bolder;
  margin: 20px 0 30px;
  padding: 1em 0;
  text-align: center;
}

.back-button {
  height: 3em;
  width: 5em;
}

.icon-arrow-left {
  height: 2em;
  vertical-align: -6px;
}

.name-list {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
}

.name-list-item {
  height: 3em;
  margin: 10px 0;
}
</style>
