import { http, HttpResponse } from 'msw'
import { requestResponses } from './api/request'

export const handlers = [
  http.get('https://example.com/request', (): HttpResponse => {
    const shuffled = requestResponses.sort(() => Math.random() - 0.5)
    const length = Math.floor(Math.random() * shuffled.length)

    if (length === 0) {
      return HttpResponse.json({ result: 'error', error: 'No data found' })
    } else {
      return HttpResponse.json({ result: 'done', data: shuffled.slice(0, length) })
    }
  }),

  http.post('https://example.com/checkIn', async ({ request }) => {
    const data = (await request.json()) as { id: string }
    const target = requestResponses.find((item) => item.id === data?.id)

    if (target) {
      target.isCheckedIn = !target.isCheckedIn
      return HttpResponse.json({ result: 'done' })
    } else {
      return HttpResponse.json({ result: 'error', error: 'No data found' })
    }
  })
]
