import { ref } from 'vue'

type State = '' | 'submitting' | 'submitted' | 'failed'
type PostResponse = {
  result: 'done' | 'error'
  error: string
}

const siteKey = '6LemGUgpAAAAAHNy3XuUPkWhP2KZXkp1EfmC5lDh'
const postUrl =
  'https://script.google.com/macros/s/AKfycbwVrcTOx7j6Joi6ia4Hpe7IDoq_zPIcl-MM-Sd8QFfVGwuTiMtQfD7AmEQ046UYhGxD/exec'

export const useSubmit = <T>() => {
  const state = ref<State>('')
  const error = ref('')

  const post = async (formData: T) => {
    state.value = 'submitting'

    try {
      grecaptcha.ready(async () => {
        const postData = {
          ...formData,
          recaptcha: await grecaptcha.execute(siteKey, { action: 'submit' })
        }

        const response = await fetch(postUrl, {
          method: 'POST',
          body: JSON.stringify(postData)
        })

        if (!response.ok) {
          throw new Error('Form submission failed')
        }

        const responseData: PostResponse = await response.json()

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

  return { state, error, post }
}
