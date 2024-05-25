import { ref } from 'vue'

export type State = '' | 'loading' | 'loaded' | 'failed'

export type ResponseData = {
  result: 'done' | 'error'
  error: string
}

const GET_URL = ''

export const useRequest = () => {
  const state = ref<State>('')
  const error = ref('')

  const get = async (params: Record<string, string>) => {
    state.value = 'loading'

    try {
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(`${GET_URL}?${queryString}`)

      if (!response.ok) {
        throw new Error('Request failed')
      }

      const responseData: ResponseData = await response.json()

      if (responseData.result === 'done') {
        state.value = 'loaded'
      } else if (responseData.result === 'error') {
        state.value = 'failed'
        throw new Error(responseData.error)
      }
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      }
    }
  }

  return { state, error, get }
}
