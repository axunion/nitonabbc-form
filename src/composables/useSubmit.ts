import { ref } from 'vue'

declare const grecaptcha: {
  ready(callback: () => void): Promise<void>
  execute(siteKey: string, options: { action: string }): Promise<string>
}

interface PostResponse {
  result: 'done' | 'error'
  error: string
}

type State = '' | 'submitting' | 'submitted' | 'failed'

const siteKey = '6LemGUgpAAAAAHNy3XuUPkWhP2KZXkp1EfmC5lDh'
const postUrl =
  'https://script.google.com/macros/s/AKfycbwVrcTOx7j6Joi6ia4Hpe7IDoq_zPIcl-MM-Sd8QFfVGwuTiMtQfD7AmEQ046UYhGxD/exec'

export function useSubmit<T>() {
  const state = ref<State>('')
  const error = ref<string>('')

  async function post(formData: T) {
    state.value = 'submitting'

    try {
      await grecaptcha.ready(async () => {
        formData = {
          ...formData,
          recaptcha: await grecaptcha.execute(siteKey, { action: 'submit' })
        }

        const response = await fetch(postUrl, {
          method: 'POST',
          body: JSON.stringify(formData)
        })

        if (!response.ok) {
          throw new Error('Form submission failed')
        }

        const responseData: PostResponse = await response.json()

        if (responseData.result === 'done') {
          state.value = 'submitted'
        } else if (responseData.result === 'error') {
          state.value = 'failed'
          console.error(responseData.error)
          throw new Error(responseData.error)
        }
      })
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      }
    }
  }

  return { state, error, post }
}
