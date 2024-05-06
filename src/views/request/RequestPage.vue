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
    <form class="form" v-if="!isFinished">
      <div class="row" v-for="(characters, index) in japaneseSyllabary" :key="index">
        <div class="column" v-for="character in characters" :key="character">
          <AppButton
            type="button"
            :label="character"
            variant="outlined"
            @click.prevent="load(character)"
          />
        </div>
      </div>
    </form>
  </main>

  <OverlayLoading :isActive="status === 'loading'" />
</template>

<style scoped>
.main {
  margin: auto;
  max-width: var(--content-max-wieght);
  min-width: 320px;
  padding: 1em;
  position: relative;
  z-index: 0;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin: 12px 0;
}

.column {
  overflow: hidden;
}

.row:nth-child(odd) > .column {
  background: #f2f2f2;
}

.row:nth-child(even) > .column {
  background: #e0e0e0;
}
</style>
