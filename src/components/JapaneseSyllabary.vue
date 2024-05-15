<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { japaneseSyllabary } from '@/constants/japaneseSyllabary'

defineEmits(['selectCharacter'])
</script>

<template>
  <div class="japanese-syllabary">
    <div class="row" v-for="(characters, index) in japaneseSyllabary" :key="index">
      <div class="character" v-for="character in characters" :key="character">
        <AppButton :label="character" @click.prevent="$emit('selectCharacter', character)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.japanese-syllabary {
  display: grid;
  gap: 10px;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
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
