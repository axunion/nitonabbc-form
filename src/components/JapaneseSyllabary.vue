<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { JAPANESE_SYLLABARY } from '@/constants/japaneseSyllabary'

defineEmits(['selectCharacter'])
</script>

<template>
  <div class="japanese-syllabary">
    <div class="row" v-for="(characters, index) in JAPANESE_SYLLABARY" :key="index">
      <div class="character" v-for="character in characters" :key="character">
        <AppButton @click.prevent="$emit('selectCharacter', character)">{{ character }}</AppButton>
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
  box-shadow: 0 1px gray;
  color: white;
  font-size: 24px;
  font-weight: bold;
  height: 48px;
  text-shadow: 0 1px black;
}

.row:nth-of-type(10n + 1) > .character {
  background: #8faadc;
}

.row:nth-of-type(10n + 2) > .character {
  background: #ea9999;
}

.row:nth-of-type(10n + 3) > .character {
  background: #a2d5c6;
}

.row:nth-of-type(10n + 4) > .character {
  background: #c49bbb;
}

.row:nth-of-type(10n + 5) > .character {
  background: #8dc3c7;
}

.row:nth-of-type(10n + 6) > .character {
  background: #f2b9a1;
}

.row:nth-of-type(10n + 7) > .character {
  background: #b1b9dc;
}

.row:nth-of-type(10n + 8) > .character {
  background: #e3dcb2;
}

.row:nth-of-type(10n + 9) > .character {
  background: #a8d5a2;
}

.row:nth-of-type(10n + 10) > .character {
  background: #d4a984;
}
</style>
