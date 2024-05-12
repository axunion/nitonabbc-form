<script setup lang="ts">
import { ref, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import OverlayLoading from '@/components/OverlayLoading.vue'
import { japaneseSyllabary } from '@/constants/japaneseSyllabary'
import { keiyo } from '@/constants/keiyo'

const status = ref<'' | 'loading' | 'loaded' | 'failed'>('')
const character = ref<string>('')
const list = ref<string[]>([])

const isFinished = computed(() => ['loaded', 'failed'].includes(status.value))
const isInitial = computed(() => character.value === '')
const nameList = computed(() => keiyo.filter((i) => i.initial === character.value) || [])

const selectcharacter = (initial: string) => {
  character.value = initial
}

const clearCharacter = () => {
  character.value = ''
}

const selectName = (name: string) => {
  console.log(name)
}
</script>

<template>
  <main class="main">
    <div v-if="!isFinished">
      <section class="section" v-if="isInitial">
        <h1 class="h1">教会名の最初の文字を選択してください</h1>

        <div class="row" v-for="(characters, index) in japaneseSyllabary" :key="index">
          <div class="character" v-for="character in characters" :key="character">
            <AppButton :label="character" @click.prevent="selectcharacter(character)" />
          </div>
        </div>
      </section>

      <section class="section" v-else>
        <div class="back-character">
          <AppButton label="戻る" variant="filled" @click="clearCharacter" />
        </div>

        <ul class="name-list">
          <li class="name-list-item" v-for="{ label } in nameList" :key="label">
            <AppButton :label="label" variant="outlined" @click="selectName(label)" />
          </li>
        </ul>
      </section>
    </div>

    <div v-else>
      <section class="section" v-if="list.length">
        <h1 class="h1">申し込み済み一覧</h1>
      </section>
    </div>
  </main>

  <OverlayLoading :isActive="status === 'loading'" />
</template>

<style scoped>
.main {
  margin: auto;
  max-width: var(--content-max-wieght);
  position: relative;
  z-index: 0;
}

.section {
  align-content: center;
  box-sizing: border-box;
  display: grid;
  gap: 12px;
  min-height: 100vh;
  padding: 20px;
}

.h1 {
  background: var(--color-subtext);
  border-radius: 4px;
  color: white;
  font-size: inherit;
  font-weight: bolder;
  margin: 0;
  padding: 1em 0;
  text-align: center;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  width: 100%;
}

.character {
  border-radius: 8px;
  color: white;
  font-size: 24px;
  height: 48px;
}

.row:nth-of-type(10n + 1) > .character {
  background: dodgerblue;
}

.row:nth-of-type(10n + 2) > .character {
  background: tomato;
}

.row:nth-of-type(10n + 3) > .character {
  background: limegreen;
}

.row:nth-of-type(10n + 4) > .character {
  background: orchid;
}

.row:nth-of-type(10n + 5) > .character {
  background: aqua;
}

.row:nth-of-type(10n + 6) > .character {
  background: coral;
}

.row:nth-of-type(10n + 7) > .character {
  background: lightsteelblue;
}

.row:nth-of-type(10n + 8) > .character {
  background: khaki;
}

.row:nth-of-type(10n + 9) > .character {
  background: lightgreen;
}

.row:nth-of-type(10n + 10) > .character {
  background: sandybrown;
}

.back-character {
  height: 3em;
  width: 80px;
}

.name-list {
  list-style: none;
  padding: 0;
}

.name-list-item {
  height: 2.5em;
  margin: 0.5em 0;
}
</style>
