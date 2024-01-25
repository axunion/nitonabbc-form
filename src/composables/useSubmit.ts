import { ref } from 'vue'

interface PostResponse {
  status: 'done' | 'error'
  error: string
}

export function useSubmit<T>() {
  const result = ref<'' | 'done' | 'error'>('')
  const error = ref<string>('')

  async function post(url: string, formData: T) {
    try {
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

      const responseJson: PostResponse = await response.json()
      result.value = responseJson.status

      if (responseJson.error) {
        throw new Error(responseJson.error)
      }
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      }
    }
  }

  return { result, error, post }
}
