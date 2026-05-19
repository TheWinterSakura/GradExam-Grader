<template>
	<view class="page">
		<!-- 用户信息卡片 -->
		<view class="user-card">
			<view class="user-avatar">
				<image class="avatar-img" src="/static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="user-info">
				<text class="username">{{ userInfo.name }}</text>
				<text class="user-detail">{{ userInfo.college }} · {{ userInfo.class }}</text>
				<text class="user-detail">学号 {{ userInfo.studentId }}</text>
			</view>
		</view>

		<!-- 统计数据 -->
		<view class="stats-row">
			<view class="stat-card">
				<text class="stat-number">{{ stats.total }}</text>
				<text class="stat-label">总作业数</text>
			</view>
			<view class="stat-card">
				<text class="stat-number done">{{ stats.completed }}</text>
				<text class="stat-label">已完成</text>
			</view>
			<view class="stat-card">
				<text class="stat-number pending">{{ stats.pending }}</text>
				<text class="stat-label">待完成</text>
			</view>
		</view>

		<!-- 功能列表 -->
		<view class="menu-section">
			<view class="menu-card">
				<view class="menu-item" @click="goToPage('settings')">
					<view class="menu-left">
						<uni-icons type="gear" :size="20" color="#6B7280"></uni-icons>
						<text class="menu-title">设置</text>
					</view>
					<uni-icons type="arrowright" :size="16" color="#D1D5DB"></uni-icons>
				</view>
				<view class="menu-divider"></view>
				<view class="menu-item" @click="goToPage('about')">
					<view class="menu-left">
						<uni-icons type="info" :size="20" color="#6B7280"></uni-icons>
						<text class="menu-title">关于</text>
					</view>
					<uni-icons type="arrowright" :size="16" color="#D1D5DB"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 退出登录 -->
		<view class="logout-section">
			<view class="logout-btn" @click="logout">
				<text class="logout-text">退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					name: '加载中...',
					studentId: '',
					college: '',
					class: ''
				},
				stats: {
					total: 0,
					completed: 0,
					pending: 0
				}
			}
		},
		onShow() {
			this.loadUserInfo()
		},
		methods: {
			// 加载用户信息
			loadUserInfo() {
				const that = this
				const { getUserInfo } = require('../../api/student.js')
				const { getUserId } = require('../../utils/auth.js')
				
				const userId = getUserId()
				getUserInfo(userId).then(result => {
					if (result.code === 200) {
						that.userInfo = {
							name: result.data.name || result.data.username,
							studentId: result.data.id,
							college: '考研学院', // 后端没有返回，使用默认值
							class: '学生'
						}
					}
				}).catch(error => {
					console.error('加载用户信息失败:', error)
				})
			},
			
			goToPage(type) {
				uni.showToast({
					title: '功能开发中',
					icon: 'none'
				})
			},
			
			logout() {
				const { clearAuth, goToLogin } = require('../../utils/auth.js')
				
				uni.showModal({
					title: '提示',
					content: '确认退出登录？',
					success: (res) => {
						if (res.confirm) {
							// 清除登录信息
							clearAuth()
							
							uni.showToast({
								title: '已退出',
								icon: 'success',
								duration: 1500
							})
							
							// 跳转到登录页
							setTimeout(() => {
								goToLogin()
							}, 1500)
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
		background-color: #F2F3F7;
		padding: 20px 16px 80px;
	}

	/* 用户信息 */
	.user-card {
		background-color: #FFFFFF;
		border-radius: 16px;
		padding: 24px;
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 16px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	}

	.user-avatar {
		flex-shrink: 0;
	}

	.avatar-img {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background-color: #F2F3F7;
		border: 2px solid #F3F4F6;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.username {
		font-size: 20px;
		font-weight: 700;
		color: #1A1A2E;
	}

	.user-detail {
		font-size: 13px;
		color: #9CA3AF;
	}

	/* 统计数据 */
	.stats-row {
		display: flex;
		gap: 10px;
		margin-bottom: 16px;
	}

	.stat-card {
		flex: 1;
		background-color: #FFFFFF;
		border-radius: 14px;
		padding: 18px 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	}

	.stat-number {
		font-size: 28px;
		font-weight: 700;
		color: #4F6EF7;
	}

	.stat-number.done {
		color: #34C759;
	}

	.stat-number.pending {
		color: #FF9500;
	}

	.stat-label {
		font-size: 12px;
		color: #9CA3AF;
	}

	/* 菜单 */
	.menu-section {
		margin-bottom: 24px;
	}

	.menu-card {
		background-color: #FFFFFF;
		border-radius: 14px;
		overflow: hidden;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	}

	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 20px;
	}

	.menu-left {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.menu-title {
		font-size: 15px;
		color: #1A1A2E;
	}

	.menu-divider {
		height: 1px;
		background-color: #F3F4F6;
		margin: 0 20px;
	}

	/* 退出登录 */
	.logout-btn {
		background-color: #FFFFFF;
		border-radius: 14px;
		padding: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	}

	.logout-text {
		font-size: 15px;
		color: #FF3B30;
		font-weight: 500;
	}
</style>
