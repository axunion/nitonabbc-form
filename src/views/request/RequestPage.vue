<script setup lang="ts">
import { ref, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import OverlayLoading from '@/components/OverlayLoading.vue'
import { japaneseSyllabary } from '@/constants/japaneseSyllabary'

const status = ref<'' | 'loading' | 'loaded' | 'failed'>('')
const isFinished = computed(() => ['loaded', 'failed'].includes(status.value))

const load = (initial: string) => {
  status.value = 'loaded'
  console.log(initial)
}
</script>

<template>
  <main class="main">
    <section class="section" v-if="!isFinished">
      <h1 class="h1">教会名の最初の文字を選択してください</h1>

      <div class="row" v-for="(characters, index) in japaneseSyllabary" :key="index">
        <div class="character" v-for="character in characters" :key="character">
          <AppButton type="button" :label="character" @click.prevent="load(character)" />
        </div>
      </div>
    </section>

    <section class="section" v-if="isFinished">
      <h1 class="h1">申し込み済み一覧</h1>
    </section>
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
</style>
