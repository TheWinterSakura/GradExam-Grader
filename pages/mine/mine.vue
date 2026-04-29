<template>
	<view class="page">
		<!-- 用户信息卡片 -->
		<view class="user-card">
			<image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
			<view class="user-info">
				<text class="username">{{ userInfo.name }}</text>
				<text class="user-role">学号：{{ userInfo.studentId }}</text>
				<text class="user-role">{{ userInfo.college }}</text>
				<text class="user-role">{{ userInfo.class }}</text>
			</view>
		</view>

		<!-- 统计数据 -->
		<view class="stats-card">
			<view class="stat-item">
				<text class="stat-number">{{ stats.total }}</text>
				<text class="stat-label">总作业数</text>
			</view>
			<view class="stat-divider"></view>
			<view class="stat-item">
				<text class="stat-number">{{ stats.completed }}</text>
				<text class="stat-label">已完成</text>
			</view>
			<view class="stat-divider"></view>
			<view class="stat-item">
				<text class="stat-number">{{ stats.pending }}</text>
				<text class="stat-label">待完成</text>
			</view>
		</view>

		<!-- 功能列表 -->
		<view class="menu-list">
			<view class="menu-item" @click="goToPage('settings')">
				<view class="menu-left">
					<text class="menu-icon">⚙️</text>
					<text class="menu-title">设置</text>
				</view>
				<text class="menu-arrow">›</text>
			</view>
			<view class="menu-item" @click="goToPage('about')">
				<view class="menu-left">
					<text class="menu-icon">ℹ️</text>
					<text class="menu-title">关于</text>
				</view>
				<text class="menu-arrow">›</text>
			</view>
		</view>

		<!-- 退出登录 -->
		<view class="logout-section">
			<button class="logout-btn" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					name: '张三',
					studentId: '2024001',
					college: '软件学院',
					class: '2023级8班'
				},
				stats: {
					total: 156,
					completed: 128,
					pending: 28
				}
			}
		},
		onShow() {
			if (typeof this.$mp.page.getTabBar === 'function' && this.$mp.page.getTabBar()) {
				this.$mp.page.getTabBar().setData({
					selected: 3
				})
			}
		},
		methods: {
			goToPage(type) {
				uni.showToast({
					title: '功能开发中',
					icon: 'none'
				})
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '确认退出登录？',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '已退出',
								icon: 'success'
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding: 30rpx;
		padding-bottom: 80rpx;
	}

	.user-card {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 16rpx;
		padding: 40rpx;
		display: flex;
		align-items: center;
		gap: 30rpx;
		margin-bottom: 20rpx;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		background-color: #fff;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.username {
		font-size: 36rpx;
		font-weight: bold;
		color: #fff;
	}

	.user-role {
		font-size: 26rpx;
		color: rgba(255, 255, 255, 0.9);
	}

	.stats-card {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 40rpx;
		display: flex;
		justify-content: space-around;
		margin-bottom: 20rpx;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10rpx;
	}

	.stat-number {
		font-size: 48rpx;
		font-weight: bold;
		color: #007AFF;
	}

	.stat-label {
		font-size: 26rpx;
		color: #666;
	}

	.stat-divider {
		width: 2rpx;
		background-color: #f0f0f0;
	}

	.menu-list {
		background-color: #fff;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.menu-item:last-child {
		border-bottom: none;
	}

	.menu-left {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.menu-icon {
		font-size: 40rpx;
	}

	.menu-title {
		font-size: 30rpx;
		color: #333;
	}

	.menu-arrow {
		font-size: 48rpx;
		color: #ccc;
	}

	.logout-section {
		margin-top: 40rpx;
	}

	.logout-btn {
		width: 100%;
		height: 88rpx;
		background-color: #fff;
		color: #ff6b6b;
		font-size: 32rpx;
		border-radius: 44rpx;
		border: none;
	}
</style>
