function createPoemTask(poem) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve({ task_id: 'mock_poem_task_001', status: 'queued' }) }, 500)
  })
}

function createPaintingTask(data) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve({ task_id: 'mock_painting_task_001', status: 'queued' }) }, 500)
  })
}

function getTaskDetail(taskId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        task_id: taskId,
        type: taskId.includes('painting') ? 'painting' : 'poem',
        status: 'succeeded',
        progress: 100,
        result: {
          image_url: '../../assets/images/demo-result.png',
          poem: '千山鸟飞绝，万径人踪灭。',
          history: '由明代艺术家文徵明所画的作品《寒林孤客图》。',
          content: '画面描绘了初冬时节的苍茫山林，枯木交错...',
          mood: '这是一幅充满文人孤傲与清幽意境的画作...'
        },
        error_message: null
      })
    }, 2000)
  })
}

module.exports = { createPoemTask, createPaintingTask, getTaskDetail }
