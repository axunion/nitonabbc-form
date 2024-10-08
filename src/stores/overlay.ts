import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOverlayStore = defineStore('overlay', () => {
  const isActiveLoading = ref(false)
  const isActiveSubmit = ref(false)

  const showOverlayLoading = () => {
    isActiveLoading.value = true
  }

  const hideOverlayLoading = () => {
    isActiveLoading.value = false
  }

  const showOverlaySubmit = () => {
    isActiveSubmit.value = true
  }

  const hideOverlaySubmit = () => {
    isActiveSubmit.value = false
  }

  return {
    isActiveLoading,
    isActiveSubmit,
    showOverlayLoading,
    hideOverlayLoading,
    showOverlaySubmit,
    hideOverlaySubmit
  }
})
