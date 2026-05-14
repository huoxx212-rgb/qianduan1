<template>
  <view class="page">
    <view class="shell">
      <button class="back-button" hover-class="back-button--hover" @click="handleBack">
        <view class="back-icon"></view>
      </button>

      <view v-if="screen === 'form'" class="form-panel">
        <view class="prompt-card">
          <textarea
            v-model="poemText"
            class="prompt-card__input"
            maxlength="-1"
            :show-confirm-bar="false"
          ></textarea>
        </view>

        <button
          class="generate-button"
          hover-class="generate-button--hover"
          :loading="loading"
          :disabled="loading"
          @click="handleGenerate"
        >
          {{ loading ? texts.generating : texts.generate }}
        </button>
      </view>

      <view v-else class="result-panel">
        <image class="preview-image" :src="previewImageUrl" mode="widthFix"></image>
      </view>
    </view>
  </view>
</template>

<script>
import { requestPoetryImage } from '@/api/poetry_image/index.js'

const TEXTS = {
  generating: '\u751f\u6210\u4e2d',
  generate: '\u70b9\u51fb\u751f\u6210'
}

const FALLBACK_POEM = '\u98de\u6d41\u76f4\u4e0b\u4e09\u5343\u5c3a\n\u7591\u662f\u94f6\u6cb3\u843d\u4e5d\u5929'
const LOCAL_PREVIEW_IMAGE = '/static/poetry_image/poetry-waterfall.png'

export default {
  data() {
    return {
      texts: TEXTS,
      loading: false,
      screen: 'form',
      poemText: FALLBACK_POEM,
      previewImageUrl: LOCAL_PREVIEW_IMAGE
    }
  },
  methods: {
    handleBack() {
      if (this.screen === 'result') {
        this.screen = 'form'
        return
      }

      const pages = getCurrentPages()
      if (pages.length > 1) {
        uni.navigateBack()
      }
    },
    async handleGenerate() {
      if (this.loading) {
        return
      }

      const prompt = this.poemText.trim() || FALLBACK_POEM
      this.loading = true

      try {
        const response = await requestPoetryImage({
          prompt
        })
        const nextImageUrl = this.resolveImageUrl(response)

        this.poemText = prompt
        this.previewImageUrl = nextImageUrl || LOCAL_PREVIEW_IMAGE
      } catch (error) {
        this.poemText = FALLBACK_POEM
        this.previewImageUrl = LOCAL_PREVIEW_IMAGE
      } finally {
        this.loading = false
        this.screen = 'result'
      }
    },
    resolveImageUrl(response) {
      if (!response) {
        return ''
      }

      if (typeof response === 'string') {
        return response
      }

      const data = response.data || response.result || response

      return data.imageUrl || data.url || data.image || response.imageUrl || response.url || ''
    }
  }
}
</script>

<style>
page {
  background: #202020;
}

button {
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  line-height: 1;
}

button::after {
  border: 0;
}

.page {
  min-height: 100vh;
  background: #202020;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 28rpx 0;
}

.shell {
  width: 100%;
  max-width: 750rpx;
  min-height: calc(100vh - 56rpx);
  background: #ddd4c6;
  box-sizing: border-box;
  padding: calc(62rpx + env(safe-area-inset-top)) 42rpx 58rpx;
  position: relative;
  overflow: hidden;
}

.back-button {
  width: 88rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button--hover {
  opacity: 0.66;
}

.back-icon {
  width: 54rpx;
  height: 54rpx;
  border-left: 8rpx solid #202522;
  border-bottom: 8rpx solid #202522;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.form-panel {
  padding-top: 56rpx;
}

.prompt-card {
  width: 100%;
  height: 236rpx;
  box-sizing: border-box;
  background: #fff;
  border: 2rpx solid #111;
  border-radius: 40rpx;
  box-shadow: 0 5rpx 9rpx rgba(0, 0, 0, 0.22);
  overflow: hidden;
}

.prompt-card__input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: #0f0f0f;
  font-size: 22rpx;
  font-weight: 800;
  line-height: 1.45;
  padding: 34rpx 36rpx;
  overflow-y: auto;
}

.generate-button {
  width: 548rpx;
  height: 84rpx;
  margin: 86rpx auto 0;
  border-radius: 44rpx;
  background: #fbff8a;
  color: #0b0b0b;
  font-size: 36rpx;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 8rpx 14rpx rgba(110, 128, 43, 0.22);
}

.generate-button--hover {
  transform: translateY(2rpx);
  opacity: 0.88;
}

.generate-button[disabled] {
  opacity: 0.78;
}

.result-panel {
  min-height: calc(100vh - 260rpx);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 48rpx;
  padding-bottom: 78rpx;
  box-sizing: border-box;
}

.preview-image {
  width: 598rpx;
  border-radius: 56rpx;
  display: block;
}
</style>
