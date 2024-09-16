import { ref } from 'vue'

export type State = '' | 'submitting' | 'submitted' | 'failed'

export type GetResponseData = {
  result: 'done' | 'error' | 'expired'
}

export type PostResponseData = {
  result: 'done' | 'error'
  error: string
}

export const SITE_KEY = '6LemGUgpAAAAAHNy3XuUPkWhP2KZXkp1EfmC5lDh'

const POST_URL =
  'https://script.google.com/macros/s/AKfycbwVrcTOx7j6Joi6ia4Hpe7IDoq_zPIcl-MM-Sd8QFfVGwuTiMtQfD7AmEQ046UYhGxD/exec'

export const useSubmit = () => {
  const state = ref<State>('')
  const error = ref('')

  const checkExpiration = async (type: string): Promise<boolean> => {
    const response = await fetch(`${POST_URL}?type=${type}`)
    const responseData: GetResponseData = await response.json()
    return responseData.result === 'expired'
  }

  const post = async (formData: Record<string, string | string[]>): Promise<void> => {
    state.value = 'submitting'

    try {
      window.grecaptcha.ready(async () => {
        const postData = {
          ...formData,
          recaptcha: await grecaptcha.execute(SITE_KEY, { action: 'submit' })
        }

        const response = await fetch(POST_URL, {
          method: 'POST',
          body: JSON.stringify(postData)
        })

        if (!response.ok) {
          throw new Error('Form submission failed')
        }

        const responseData: PostResponseData = await response.json()

        if (responseData.result === 'done') {
          state.value = 'submitted'
        } else if (responseData.result === 'error') {
          state.value = 'failed'
          throw new Error(responseData.error)
        }
      })
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      }
    }
  }

  return { state, error, checkExpiration, post }
}
