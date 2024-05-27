import { http, HttpResponse } from 'msw'
import { responses } from './api/request'

export const handlers = [
  http.get('https://example.com/request', () => {
    const shuffled = responses.sort(() => Math.random() - 0.5)
    const randomLength = Math.floor(Math.random() * responses.length) + 1
    return HttpResponse.json(shuffled.slice(0, randomLength))
  })
]
