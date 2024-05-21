import { ref } from 'vue'

export type State = '' | 'submitting' | 'submitted' | 'failed'

export type PostData = {
  [key: string]: string | string[]
}

export type ResponseData = {
  result: 'done' | 'error'
  error: string
}

const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api.js'
const SITE_KEY = '6LemGUgpAAAAAHNy3XuUPkWhP2KZXkp1EfmC5lDh'
const POST_URL =
  'https://script.google.com/macros/s/AKfycbwVrcTOx7j6Joi6ia4Hpe7IDoq_zPIcl-MM-Sd8QFfVGwuTiMtQfD7AmEQ046UYhGxD/exec'

export const useSubmit = () => {
  const recaptchaReady = ref(false)
  const state = ref<State>('')
  const error = ref('')

  const appendRecaptcha = (): Promise<void> => {
    const ID = 'recaptcha-script'

    return new Promise((resolve, reject): void => {
      if (document.getElementById(ID)) {
        resolve()
        return
      }

      const s = document.createElement('script')

      s.id = ID
      s.src = `${RECAPTCHA_URL}?render=${SITE_KEY}`
      s.async = true
      s.defer = true
      s.onerror = () => reject(new Error('Failed to load reCAPTCHA script'))
      s.onload = () => {
        recaptchaReady.value = true
        resolve()
      }

      document.head.appendChild(s)
    })
  }

  const post = async (formData: PostData) => {
    if (!recaptchaReady.value) {
      throw new Error('reCAPTCHA is not ready')
    }

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

        const responseData: ResponseData = await response.json()

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

  return { recaptchaReady, state, error, appendRecaptcha, post }
}
