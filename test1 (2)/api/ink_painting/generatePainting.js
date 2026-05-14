export const FALLBACK_INK_PAINTING = {
  history: '由明代艺术家文徵明所画的作品《寒林晴雪图》。',
  content:
    '画面描绘了初冬时节的苍茫山林，枯木交错，一条蜿蜒的小路延伸至深谷，一位高士独自行走其间，笔墨温润秀拔。',
  mood:
    '这是一幅充满文人孤傲与清幽意境的画作，表达了远离尘嚣、回归内心的淡泊情怀。',
  poem: '千山鸟飞绝，万径人踪灭。',
  imageUrl: '/static/ink_painting/test.jpg'
}

const GENERATE_ENDPOINT = '/api/ink-painting/generate'

export function generateInkPainting(payload = {}) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: GENERATE_ENDPOINT,
      method: 'POST',
      data: payload,
      timeout: 15000,
      success: (response) => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`Generate request failed: ${response.statusCode}`))
          return
        }

        const source = response.data && (response.data.data || response.data)
        if (!source) {
          reject(new Error('Generate response is empty'))
          return
        }

        resolve({
          history: source.history || payload.history || FALLBACK_INK_PAINTING.history,
          content: source.content || payload.content || FALLBACK_INK_PAINTING.content,
          mood: source.mood || payload.mood || FALLBACK_INK_PAINTING.mood,
          poem: source.poem || payload.poem || FALLBACK_INK_PAINTING.poem,
          imageUrl: source.imageUrl || source.image || FALLBACK_INK_PAINTING.imageUrl
        })
      },
      fail: reject
    })
  })
}
