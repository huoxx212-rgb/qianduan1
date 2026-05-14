const ENV = 'mock' // mock | dev | prod

const CONFIG = {
  mock: { USE_MOCK: true, BASE_URL: '' },
  dev: { USE_MOCK: false, BASE_URL: 'http://127.0.0.1:5000' },
  prod: { USE_MOCK: false, BASE_URL: 'https://api.xxx.com' }
}

module.exports = CONFIG[ENV]
