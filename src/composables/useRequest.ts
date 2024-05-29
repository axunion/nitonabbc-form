import { ref } from 'vue'

export type State = '' | 'loading' | 'loaded' | 'failed'

export type ResponseData<T> = {
  result: 'done' | 'error'
  data?: T
  error?: string
}

const GET_URL = import.meta.env.DEV ? 'https://example.com/request' : ''

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

  const getApplicants = async (params: Record<string, string>): Promise<string[] | void> => {
    return await get<string[]>(params)
  }

  return { state, error, getApplicants }
}
