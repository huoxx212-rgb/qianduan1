const request = require('../utils/request')
const config = require('../utils/config')
const mockTask = require('../mock/task')

function getTaskDetail(taskId) {
  if (config.USE_MOCK) return mockTask.getTaskDetail(taskId)
  return request({ url: `/api/tasks/${taskId}`, method: 'GET' })
}
module.exports = { getTaskDetail }
