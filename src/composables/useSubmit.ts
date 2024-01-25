import { ref } from 'vue'

declare const grecaptcha: {
  ready(callback: () => void): Promise<void>
  execute(siteKey: string, options: { action: string }): Promise<string>
}

interface PostResponse {
  status: 'done' | 'error'
  error: string
}

const siteKey = '6LemGUgpAAAAAHNy3XuUPkWhP2KZXkp1EfmC5lDh'

export function useSubmit<T>() {
  const result = ref<'' | 'done' | 'error'>('')
  const error = ref<string>('')

  async function post(url: string, formData: T) {
    try {
      await grecaptcha.ready(async () => {
        formData = {
          ...formData,
          recaptcha: await grecaptcha.execute(siteKey, { action: 'submit' })
        }

        console.log(formData)

        const response = await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        console.log(response)

        if (!response.ok) {
          throw new Error('Form submission failed')
        }

        const responseJson: PostResponse = await response.json()
        result.value = responseJson.status

        if (responseJson.error) {
          throw new Error(responseJson.error)
        }
      })
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      }
    }
  }

  return { result, error, post }
}
