const API_URL = '/api/poetry-image/generate'

export function requestPoetryImage(payload = {}) {
	if (!API_URL) {
		return Promise.reject(new Error('API_URL is not configured'))
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: API_URL,
			method: 'POST',
			data: payload,
			header: {
				'content-type': 'application/json'
			},
			success: (res) => {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data || {})
					return
				}

				reject(new Error(`HTTP ${res.statusCode}`))
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}
