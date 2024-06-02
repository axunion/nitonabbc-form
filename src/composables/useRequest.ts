import { ref } from 'vue'

export type State = '' | 'loading' | 'loaded' | 'failed'

export type ResponseData<T> = {
  result: 'done' | 'error'
  data?: T
  error?: string
}

const GET_URL = import.meta.env.DEV ? 'https://example.com/request' : ''
const CHECK_IN_URL = import.meta.env.DEV ? 'https://example.com/checkIn' : ''

export const useRequest = () => {
  const state = ref<State>('')
  const error = ref('')

  const get = async <T>(params: Record<string, string>): Promise<T | void> => {
    state.value = 'loading'

    try {
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(`${GET_URL}?${queryString}`)

      if (!response.ok) {
        throw new Error('Request failed')
      }

      const responseData: ResponseData<T> = await response.json()

      if (responseData.result === 'done') {
        state.value = 'loaded'
      } else if (responseData.result === 'error') {
        state.value = 'failed'
        throw new Error(responseData.error)
      }

      return responseData.data
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      }
    }
  }

  const checkIn = async (id: number) => {
    const response = await fetch(CHECK_IN_URL, {
      method: 'POST',
      body: JSON.stringify({ id })
    })

    if (!response.ok) {
      throw new Error('Form submission failed')
    }

    const responseData: ResponseData<unknown> = await response.json()

    if (responseData.result === 'error' && responseData.error) {
      error.value = responseData.error
    }

    return responseData.result === 'done'
  }

  return { state, error, get, checkIn }
}
