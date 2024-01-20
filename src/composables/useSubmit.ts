import { ref } from 'vue'

export function useFormSubmit<T>() {
  const errorMessage = ref<string>('')

  async function submitForm(url: string, formData: T) {
    try {
      errorMessage.value = ''

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message
      }
    }
  }

  return { errorMessage, submitForm }
}
