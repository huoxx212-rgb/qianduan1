<template>
  <view class="rank-item">
    <view class="rank-item__portrait">
      <image class="rank-item__image" :src="item.image" mode="aspectFill"></image>
    </view>
    <view class="rank-item__badge">
      <text class="rank-item__badge-icon">{{ item.badgeIcon }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CommunityRankItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.rank-item {
  width: 122rpx;
  position: relative;
  padding-bottom: 22rpx;
}

.rank-item__portrait {
  width: 122rpx;
  height: 182rpx;
  border-radius: 46rpx;
  overflow: hidden;
  border: 2rpx solid #242424;
  box-shadow: 0 12rpx 20rpx rgba(0, 0, 0, 0.18);
  background: #f3eee2;
}

.rank-item__image {
  width: 100%;
  height: 100%;
  display: block;
}

.rank-item__badge {
  position: absolute;
  right: 10rpx;
  bottom: 0;
  width: 68rpx;
  height: 68rpx;
  border-radius: 50%;
  background: #ffffff;
  border: 2rpx solid #242424;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-item__badge-icon {
  color: #111111;
  font-size: 32rpx;
  line-height: 1;
  font-weight: 700;
}
</style>
