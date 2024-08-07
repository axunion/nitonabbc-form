import { ref } from 'vue'

export type State = '' | 'submitting' | 'submitted' | 'failed'

export type GetResponseData = {
  result: 'done' | 'error' | 'expired'
}

export type PostData = {
  [key: string]: string | string[]
}

export type PostResponseData = {
  result: 'done' | 'error'
  error: string
}

export const SITE_KEY = '6LemGUgpAAAAAHNy3XuUPkWhP2KZXkp1EfmC5lDh'
export const POST_URL =
  'https://script.google.com/macros/s/AKfycbwVrcTOx7j6Joi6ia4Hpe7IDoq_zPIcl-MM-Sd8QFfVGwuTiMtQfD7AmEQ046UYhGxD/exec'

export const useSubmit = () => {
  const state = ref<State>('')
  const error = ref('')

  const isExpired = async (): Promise<boolean> => {
    const response = await fetch(POST_URL)
    const responseData: GetResponseData = await response.json()
    return responseData.result === 'expired'
  }

  const post = async (formData: PostData) => {
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

  return { state, error, isExpired, post }
}
