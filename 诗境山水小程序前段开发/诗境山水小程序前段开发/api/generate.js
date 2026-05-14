const request = require('../utils/request')
const config = require('../utils/config')
const mockTask = require('../mock/task')

function generateByPoem(poem) {
  if (config.USE_MOCK) return mockTask.createPoemTask(poem)
  return request({ url: '/api/generate/poem', method: 'POST', data: { poem } })
}

function generateByPainting(data) {
  if (config.USE_MOCK) return mockTask.createPaintingTask(data)
  return request({ url: '/api/generate/painting', method: 'POST', data })
}

module.exports = { generateByPoem, generateByPainting }
