import { http, HttpResponse } from 'msw'
import { responses } from './api/request'

export const handlers = [
  http.get('https://example.com/request', () => {
    const shuffled = responses.data.sort(() => Math.random() - 0.5)
    const randomLength = Math.floor(Math.random() * shuffled.length) + 1
    responses.data = shuffled.slice(0, randomLength)
    return HttpResponse.json(responses)
  })
]
