<template>
	<view class="login-page">
		<!-- 顶部品牌区 -->
		<view class="brand-section">
			<image class="logo-image" src="/static/logo.png" mode="aspectFill"></image>
			<text class="brand-name">考研作业批改助手</text>
			<text class="slogan">研路漫漫，精准批改</text>
			<view class="countdown">
				<text class="countdown-text">距离 {{ examYear }} 年考研还有 <text class="countdown-num">{{ daysLeft }}</text> 天</text>
			</view>
		</view>

		<!-- 中部登录卡片 -->
		<view class="login-card">
			<button 
				class="login-button" 
				:disabled="isLoading"
				@click="handleLogin"
			>
				<view class="button-content">
					<uni-icons v-if="!isLoading" type="weixin" :size="20" color="#FFFFFF"></uni-icons>
					<text class="button-text">{{ isLoading ? '登录中...' : '微信一键登录' }}</text>
				</view>
			</button>
		</view>

		<!-- 底部协议 -->
		<view class="agreement-section">
			<text class="agreement-text">登录即表示同意</text>
			<text class="agreement-link">《用户服务协议》</text>
			<text class="agreement-text">与</text>
			<text class="agreement-link">《隐私政策》</text>
		</view>
	</view>
</template>

<script>
import { login } from '@/api/student.js'

export default {
	data() {
		return {
			isLoading: false,
			examYear: 2026,
			daysLeft: 0
		}
	},
	onLoad() {
		const token = uni.getStorageSync('token')
		if (token) {
			uni.switchTab({ url: '/pages/index/index' })
		}
		this.calcDaysLeft()
	},
	methods: {
		calcDaysLeft() {
			// 考研一般在12月最后一个周末，这里取12月20日作为近似
			const now = new Date()
			const currentYear = now.getFullYear()
			const currentMonth = now.getMonth()
			// 如果当前已过12月，目标为下一年
			let targetYear = currentMonth >= 11 ? currentYear + 1 : currentYear
			// 确保目标年份合理
			if (targetYear < this.examYear) targetYear = this.examYear
			this.examYear = targetYear
			const examDate = new Date(targetYear, 11, 20)
			const diff = examDate.getTime() - now.getTime()
			this.daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
		},
		handleLogin() {
			if (this.isLoading) return
			this.isLoading = true

			uni.login({
				provider: 'weixin',
				success: async (loginRes) => {
					try {
						if (loginRes.code) {
							const result = await login(loginRes.code)
							if (result.code === 200) {
								uni.setStorageSync('token', result.data.token)
								uni.setStorageSync('userId', result.data.userId)
								uni.showToast({ title: '登录成功', icon: 'success', duration: 1500 })
								setTimeout(() => {
									uni.switchTab({ url: '/pages/index/index' })
								}, 1500)
							} else {
								throw new Error(result.message || '登录失败')
							}
						} else {
							throw new Error('获取登录凭证失败')
						}
					} catch (error) {
						uni.showToast({ title: error.message || '登录失败，请重试', icon: 'none' })
						this.isLoading = false
					}
				},
				fail: () => {
					uni.showToast({ title: '微信授权失败，请重试', icon: 'none' })
					this.isLoading = false
				}
			})
		}
	}
}
</script>

<style>
page {
	background-color: #EEF2FF;
}
</style>

<style scoped>
.login-page {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	background-color: #EEF2FF;
}

/* 顶部品牌区 */
.brand-section {
	margin-top: 120px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.logo-image {
	width: 88px;
	height: 88px;
	border-radius: 50%;
	box-shadow: 0 4px 16px rgba(79, 110, 247, 0.15);
}

.brand-name {
	margin-top: 20px;
	font-size: 22px;
	font-weight: 700;
	color: #1A1A2E;
}

.slogan {
	margin-top: 8px;
	font-size: 14px;
	color: #9CA3AF;
	letter-spacing: 2px;
}

.countdown {
	margin-top: 24px;
	padding: 8px 20px;
	background-color: rgba(79, 110, 247, 0.08);
	border-radius: 20px;
}

.countdown-text {
	font-size: 13px;
	color: #6B7280;
}

.countdown-num {
	font-size: 16px;
	font-weight: 700;
	color: #4F6EF7;
}

/* 中部登录卡片 */
.login-card {
	position: absolute;
	top: 62%;
	width: 100%;
	padding: 0 40px;
	box-sizing: border-box;
}

.login-button {
	width: 100%;
	height: 48px;
	background-color: #07C160;
	border-radius: 24px;
	border: none;
	box-shadow: 0 6px 20px rgba(7, 193, 96, 0.25);
}

.login-button::after {
	border: none;
}

.button-content {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	height: 100%;
}

.button-text {
	font-size: 16px;
	font-weight: 600;
	color: #FFFFFF;
}

/* 底部协议 */
.agreement-section {
	position: absolute;
	bottom: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
}

.agreement-text {
	font-size: 12px;
	color: #9CA3AF;
}

.agreement-link {
	font-size: 12px;
	color: #4F6EF7;
}
</style>
