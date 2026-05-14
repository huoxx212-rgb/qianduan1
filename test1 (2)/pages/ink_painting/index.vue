<template>
  <view class="page">
    <view class="shell">
      <button class="back-button" hover-class="back-button--hover" @click="handleBack">
        <view class="back-icon"></view>
      </button>

      <view v-if="screen === 'form'" class="form-panel">
        <view v-for="field in fields" :key="field.key" class="field-block">
          <text class="field-label">{{ field.label }}:</text>
          <textarea
            v-model="form[field.key]"
            class="field-input"
            maxlength="-1"
            :show-confirm-bar="false"
            :style="{ height: field.height }"
          ></textarea>
        </view>

        <button
          class="generate-button"
          hover-class="generate-button--hover"
          :loading="loading"
          :disabled="loading"
          @click="handleGenerate"
        >
          {{ loading ? '生成中' : '点击生成' }}
        </button>
      </view>

      <view v-else class="result-panel">
        <image class="painting-image" :src="result.imageUrl" mode="widthFix"></image>
      </view>
    </view>
  </view>
</template>

<script>
import {
  FALLBACK_INK_PAINTING,
  generateInkPainting
} from '../../api/ink_painting/generatePainting.js'

export default {
  data() {
    return {
      loading: false,
      screen: 'form',
      fields: [
        { key: 'history', label: 'history', height: '118rpx' },
        { key: 'content', label: 'content', height: '152rpx' },
        { key: 'mood', label: 'mood', height: '118rpx' },
        { key: 'poem', label: 'poem', height: '118rpx' }
      ],
      form: {
        history: FALLBACK_INK_PAINTING.history,
        content: FALLBACK_INK_PAINTING.content,
        mood: FALLBACK_INK_PAINTING.mood,
        poem: FALLBACK_INK_PAINTING.poem
      },
      result: {
        ...FALLBACK_INK_PAINTING
      }
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

      this.loading = true
      try {
        this.result = await generateInkPainting({ ...this.form })
      } catch (error) {
        this.form = { ...FALLBACK_INK_PAINTING }
        this.result = { ...FALLBACK_INK_PAINTING }
      } finally {
        this.loading = false
        this.screen = 'result'
      }
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
  background: #e7e0d2;
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
  padding-top: 18rpx;
}

.field-block {
  margin-bottom: 16rpx;
}

.field-label {
  display: block;
  color: #111;
  font-size: 31rpx;
  line-height: 38rpx;
  font-weight: 800;
  margin-left: 30rpx;
  margin-bottom: 8rpx;
}

.field-input {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border: 2rpx solid #111;
  border-radius: 40rpx;
  box-shadow: 0 5rpx 9rpx rgba(0, 0, 0, 0.22);
  color: #0f0f0f;
  font-size: 22rpx;
  font-weight: 700;
  line-height: 34rpx;
  padding: 18rpx 36rpx;
  overflow-y: auto;
  resize: none;
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
  padding-bottom: 78rpx;
  box-sizing: border-box;
}

.painting-image {
  width: 598rpx;
  border-radius: 56rpx;
  display: block;
}
</style>