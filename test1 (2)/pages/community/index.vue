<template>
  <view class="community-page">
    <view class="community-shell">
      <scroll-view class="community-scroll" scroll-y>
        <view class="community-content">
          <view class="community-header">
            <text class="community-title">{{ texts.pageTitle }}</text>
          </view>

          <view class="leaderboard-section">
            <view class="section-head">
              <text class="section-title">{{ texts.leaderboardTitle }}</text>
              <view class="section-pill">
                <view class="section-pill__icon">
                  <view class="section-pill__bar"></view>
                  <view class="section-pill__bar section-pill__bar--mid"></view>
                  <view class="section-pill__bar section-pill__bar--high"></view>
                </view>
                <text class="section-pill__text">{{ texts.fullBoard }}</text>
              </view>
            </view>

            <view class="leaderboard-list">
              <view
                v-for="item in leaderboard"
                :key="item.id"
                class="leaderboard-list__item"
              >
                <community-rank-item :item="item" />
              </view>
            </view>
          </view>

          <view class="challenge-section">
            <view class="section-head section-head--challenge">
              <text class="section-title section-title--challenge">{{ texts.challengeTitle }}</text>
              <text class="section-link">{{ texts.viewAll }}</text>
            </view>

            <view class="challenge-list">
              <navigator
                v-for="item in challenges"
                :key="item.id"
                class="challenge-list__item"
                :url="item.route"
                hover-class="none"
              >
                <community-challenge-card :item="item" />
              </navigator>
            </view>
          </view>
        </view>
      </scroll-view>

      <view class="community-tabbar">
        <view
          v-for="tab in tabs"
          :key="tab.key"
          class="community-tabbar__item"
          :class="{ 'community-tabbar__item--active': tab.active }"
          @click="handleTabTap(tab)"
        >
          <view v-if="tab.key === 'home'" class="tab-icon tab-icon--home">
            <view class="tab-icon__home-roof"></view>
            <view class="tab-icon__home-body"></view>
          </view>

          <view v-else-if="tab.key === 'discover'" class="tab-icon tab-icon--discover">
            <view class="tab-icon__discover-ring"></view>
            <view class="tab-icon__discover-smile"></view>
          </view>

          <view v-else class="tab-icon tab-icon--profile">
            <view class="tab-icon__profile-head"></view>
            <view class="tab-icon__profile-body"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import CommunityChallengeCard from '../../components/community/CommunityChallengeCard.vue'
import CommunityRankItem from '../../components/community/CommunityRankItem.vue'

export default {
  components: {
    CommunityChallengeCard,
    CommunityRankItem
  },
  data() {
    return {
      texts: {
        pageTitle: '\u5c71\u6c34\u793e\u533a',
        leaderboardTitle: '\u5c71\u6c34\u8fbe\u4eba\u699c',
        fullBoard: '\u5b8c\u6574\u699c\u5355',
        challengeTitle: '\u5b66\u4e60\u6311\u6218',
        viewAll: '\u67e5\u770b\u5168\u90e8'
      },
      leaderboard: [
        {
          id: 'ink-master-1',
          image: '/static/5b6b4c1850beee16ef24a3097cc50118.png',
          badgeIcon: '\u273f'
        },
        {
          id: 'ink-master-2',
          image: '/static/7619b5118ff73a8fa0785fd74b1a8415.png',
          badgeIcon: '\u265c'
        },
        {
          id: 'ink-master-3',
          image: '/static/7f52dfb5a83c0a393b24a563ee917729.png',
          badgeIcon: '\u2726'
        },
        {
          id: 'ink-master-4',
          image: '/static/21f587cb45e49608942c30fc11eb15ca.png',
          badgeIcon: '\u272a'
        }
      ],
      challenges: [
        {
          id: 'poem-painting',
          title: '\u8bd7\u6816\u753b\u5883',
          description:
            '\u53e4\u5178\u8bd7\u8bcd\uff0cAI\u667a\u80fd\u89e3\u6790\u8bd7\u610f\uff0c\u81ea\u52a8\u751f\u6210\u610f\u5883\u76f8\u7b26\u7684\u5c71\u6c34\u753b\u4f5c\u3002\u8ba9\u8bd7\u53e5\u4e2d\u7684\u5c71\u6c34\u4e4b\u7f8e\uff0c\u843d\u5728\u4f60\u7684\u773c\u524d\u3002',
          actionText: '\u7acb\u5373\u5f00\u59cb',
          participantsText: '600\u4eba\u5df2\u53c2\u4e0e',
          route: '/pages/ink_painting/index'
        },
        {
          id: 'season-sketch',
          title: '\u4e07\u8c61\u7ed8\u610f',
          description:
            '\u652f\u6301\u591a\u79cd\u8bed\u4e49\u5206\u7c7b\u7684\u5c71\u6c34\u753b\u751f\u6210\uff0c\u4ece\u56db\u5b63\u53d8\u6362\u5230\u5730\u57df\u98ce\u60c5\uff0c\u7cbe\u51c6\u5339\u914d\u7528\u6237\u7684\u6bcf\u4e00\u79cd\u5c71\u6c34\u60f3\u8c61\u3002',
          actionText: '\u5f00\u59cb\u7814\u4e60',
          participantsText: '350\u4eba\u5df2\u53c2\u4e0e',
          route: '/pages/poetry_image/index'
        }
      ],
      tabs: [
        { key: 'home', active: true },
        { key: 'discover', active: false },
        { key: 'profile', active: false }
      ]
    }
  },
  methods: {
    handleTabTap(tab) {
      if (!tab || tab.active) {
        return
      }
    }
  }
}
</script>

<style>
page {
  background: #1f1f1f;
}

.community-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.08) 0, rgba(255, 255, 255, 0) 36%),
    linear-gradient(180deg, #232323 0%, #171717 100%);
  padding: 30rpx 20rpx;
  box-sizing: border-box;
}

.community-shell {
  width: 100%;
  min-height: calc(100vh - 60rpx);
  background: #f7f6f3;
  border-radius: 38rpx;
  box-shadow: 0 24rpx 60rpx rgba(0, 0, 0, 0.28);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.community-scroll {
  flex: 1;
  min-height: 0;
}

.community-content {
  padding: calc(56rpx + env(safe-area-inset-top)) 34rpx 0;
}

.community-header {
  padding-top: 12rpx;
}

.community-title {
  display: block;
  text-align: center;
  color: #101010;
  font-size: 62rpx;
  line-height: 1.12;
  font-weight: 900;
  letter-spacing: 2rpx;
  font-family: 'Source Han Serif SC', 'Songti SC', serif;
}

.leaderboard-section {
  margin-top: 34rpx;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  color: #131313;
  font-size: 44rpx;
  line-height: 1.16;
  font-weight: 900;
}

.section-pill {
  height: 46rpx;
  padding: 0 20rpx;
  border-radius: 999rpx;
  background: linear-gradient(180deg, #ffffff 0%, #f1f1f1 100%);
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
}

.section-pill__text {
  margin-left: 10rpx;
  color: #676767;
  font-size: 22rpx;
  line-height: 1;
  font-weight: 700;
}

.section-pill__icon {
  width: 22rpx;
  height: 20rpx;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.section-pill__bar {
  width: 4rpx;
  height: 10rpx;
  border-radius: 999rpx;
  background: #111111;
}

.section-pill__bar--mid {
  height: 18rpx;
}

.section-pill__bar--high {
  height: 14rpx;
}

.leaderboard-list {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-between;
}

.leaderboard-list__item {
  flex-shrink: 0;
}

.challenge-section {
  margin: 38rpx -34rpx 0;
  padding: 28rpx 34rpx 44rpx;
  background: #dedede;
}

.section-head--challenge {
  align-items: flex-start;
}

.section-title--challenge {
  font-size: 60rpx;
  line-height: 1.06;
}

.section-link {
  color: #767676;
  font-size: 26rpx;
  line-height: 1.4;
  font-weight: 700;
  padding-top: 12rpx;
}

.challenge-list {
  margin-top: 24rpx;
}

.challenge-list__item + .challenge-list__item {
  margin-top: 28rpx;
}

.challenge-list__item {
  display: block;
  color: inherit;
  text-decoration: none;
}

.community-tabbar {
  height: calc(118rpx + env(safe-area-inset-bottom));
  padding: 18rpx 56rpx calc(18rpx + env(safe-area-inset-bottom));
  background: #fbfbfb;
  border-top: 2rpx solid rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.community-tabbar__item {
  width: 84rpx;
  height: 84rpx;
  border-radius: 50%;
  background: #ece5d8;
  box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
}

.community-tabbar__item--active {
  background: #e5ddcf;
}

.tab-icon {
  position: relative;
}

.tab-icon--home {
  width: 36rpx;
  height: 36rpx;
}

.tab-icon__home-roof {
  position: absolute;
  left: 2rpx;
  top: 2rpx;
  width: 0;
  height: 0;
  border-left: 16rpx solid transparent;
  border-right: 16rpx solid transparent;
  border-bottom: 18rpx solid #111111;
}

.tab-icon__home-body {
  position: absolute;
  left: 8rpx;
  bottom: 2rpx;
  width: 20rpx;
  height: 18rpx;
  background: #111111;
  border-radius: 2rpx;
}

.tab-icon--discover {
  width: 38rpx;
  height: 38rpx;
}

.tab-icon__discover-ring {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 3rpx solid #111111;
  border-radius: 50%;
}

.tab-icon__discover-smile {
  position: absolute;
  left: 9rpx;
  right: 9rpx;
  bottom: 10rpx;
  height: 10rpx;
  border-bottom: 3rpx solid #111111;
  border-radius: 0 0 18rpx 18rpx;
}

.tab-icon--profile {
  width: 40rpx;
  height: 38rpx;
}

.tab-icon__profile-head {
  width: 14rpx;
  height: 14rpx;
  margin: 0 auto;
  border: 3rpx solid #111111;
  border-radius: 50%;
}

.tab-icon__profile-body {
  width: 26rpx;
  height: 14rpx;
  margin: 4rpx auto 0;
  border: 3rpx solid #111111;
  border-top: 0;
  border-radius: 0 0 20rpx 20rpx;
}
</style>
