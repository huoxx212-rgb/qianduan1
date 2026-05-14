<template>
  <view class="challenge-card">
    <view class="challenge-card__pendant">
      <view class="challenge-card__pendant-ring"></view>
      <view class="challenge-card__pendant-drop"></view>
    </view>

    <text class="challenge-card__title">{{ item.title }}</text>
    <text class="challenge-card__description">{{ item.description }}</text>

    <view class="challenge-card__footer">
      <view
        class="challenge-card__button"
      >
        {{ item.actionText }}
      </view>
      <view class="challenge-card__meta">{{ item.participantsText }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CommunityChallengeCard',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.challenge-card {
  position: relative;
  background: #e9e1d1;
  border: 2rpx solid #262626;
  border-radius: 26rpx;
  box-shadow: 0 12rpx 18rpx rgba(0, 0, 0, 0.14);
  padding: 34rpx 28rpx 28rpx;
  min-height: 252rpx;
  box-sizing: border-box;
}

.challenge-card__pendant {
  position: absolute;
  top: -16rpx;
  right: 36rpx;
  width: 26rpx;
  height: 70rpx;
}

.challenge-card__pendant-ring {
  width: 8rpx;
  height: 28rpx;
  border-radius: 999rpx;
  background: #101010;
  margin: 0 auto;
}

.challenge-card__pendant-drop {
  width: 26rpx;
  height: 26rpx;
  margin-top: 2rpx;
  border-radius: 50%;
  background: #101010;
}

.challenge-card__title {
  display: block;
  color: #111111;
  font-size: 40rpx;
  line-height: 1.18;
  font-weight: 900;
  letter-spacing: 1rpx;
  margin-bottom: 30rpx;
}

.challenge-card__description {
  display: block;
  color: #1f1f1f;
  font-size: 24rpx;
  line-height: 1.75;
  min-height: 132rpx;
  font-weight: 600;
}

.challenge-card__footer {
  margin-top: 26rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.challenge-card__button {
  min-width: 170rpx;
  height: 64rpx;
  padding: 0 28rpx;
  border-radius: 22rpx;
  background: linear-gradient(180deg, #ffffff 0%, #f5f2eb 100%);
  color: #111111;
  font-size: 24rpx;
  font-weight: 800;
  box-shadow: 0 8rpx 18rpx rgba(255, 255, 255, 0.58);
  display: flex;
  align-items: center;
  justify-content: center;
}

.challenge-card__meta {
  flex-shrink: 0;
  height: 42rpx;
  padding: 0 18rpx;
  border-radius: 999rpx;
  background: #111111;
  color: #f6f1e8;
  font-size: 22rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
