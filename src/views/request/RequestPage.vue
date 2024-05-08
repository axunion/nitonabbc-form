<script setup lang="ts">
import { ref, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import OverlayLoading from '@/components/OverlayLoading.vue'
import { japaneseSyllabary } from '@/constants/japaneseSyllabary'

const status = ref<'' | 'loading' | 'loaded' | 'failed'>('')
const isFinished = computed(() => status.value === 'loaded' || status.value === 'failed')

const load = (initial: string) => {
  status.value = 'loading'
  console.log(initial)
  return false
}
</script>

<template>
  <main class="main">
    <section class="select" v-if="!isFinished">
      <div class="row" v-for="(characters, index) in japaneseSyllabary" :key="index">
        <div class="character" v-for="character in characters" :key="character">
          <AppButton type="button" :label="character" @click.prevent="load(character)" />
        </div>
      </div>
    </section>
  </main>

  <OverlayLoading :isActive="status === 'loading'" />
</template>

<style scoped>
.main {
  margin: auto;
  max-width: var(--content-max-wieght);
  min-width: 320px;
  position: relative;
  z-index: 0;
}

.select {
  align-content: center;
  box-sizing: border-box;
  display: grid;
  gap: 12px;
  min-height: 100vh;
  padding: 20px;
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

.row:nth-child(10n + 1) > .character {
  background: dodgerblue;
}

.row:nth-child(10n + 2) > .character {
  background: tomato;
}

.row:nth-child(10n + 3) > .character {
  background: limegreen;
}

.row:nth-child(10n + 4) > .character {
  background: orchid;
}

.row:nth-child(10n + 5) > .character {
  background: aqua;
}

.row:nth-child(10n + 6) > .character {
  background: coral;
}

.row:nth-child(10n + 7) > .character {
  background: lightsteelblue;
}

.row:nth-child(10n + 8) > .character {
  background: khaki;
}

.row:nth-child(10n + 9) > .character {
  background: lightgreen;
}

.row:nth-child(10n + 10) > .character {
  background: sandybrown;
}
</style>
