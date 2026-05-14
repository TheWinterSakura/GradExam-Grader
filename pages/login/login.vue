<template>
	<view class="login-page">
		<view class="login-container">
			<!-- Logo区域 -->
			<view class="logo-section">
				<image class="logo-image" src="/static/logo.png" mode="aspectFit"></image>
				<text class="app-title">考研作业批改</text>
				<text class="app-subtitle">专业的考研作业批改平台</text>
			</view>

			<!-- 登录卡片 -->
			<view class="login-card">
				<view class="card-header">
					<text class="card-title">欢迎使用</text>
					<text class="card-desc">使用微信快速登录</text>
				</view>

				<!-- 登录按钮 -->
				<button 
					class="login-button" 
					:class="{ loading: isLoading }"
					:disabled="isLoading"
					@click="handleLogin"
					open-type="getUserInfo"
					@getuserinfo="onGetUserInfo"
				>
					<view class="button-content">
						<uni-icons v-if="!isLoading" type="weixin" :size="20" color="#FFFFFF"></uni-icons>
						<text class="button-text">{{ isLoading ? '登录中...' : '微信一键登录' }}</text>
					</view>
				</button>

				<!-- 提示信息 -->
				<view class="tips">
					<text class="tips-text">登录即表示同意</text>
					<text class="tips-link">《用户协议》</text>
					<text class="tips-text">和</text>
					<text class="tips-link">《隐私政策》</text>
				</view>
			</view>

			<!-- 装饰元素 -->
			<view class="decoration-circle circle-1"></view>
			<view class="decoration-circle circle-2"></view>
			<view class="decoration-circle circle-3"></view>
		</view>
	</view>
</template>

<script>
	import { login } from '@/api/student.js'
	
	export default {
		data() {
			return {
				isLoading: false
			}
		},
		onLoad() {
			// 检查是否已登录
			const token = uni.getStorageSync('token')
			if (token) {
				console.log('已登录，跳转到首页')
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		methods: {
			// 获取用户信息回调
			onGetUserInfo(e) {
				if (e.detail.errMsg === 'getUserInfo:ok') {
					console.log('用户信息:', e.detail.userInfo)
				}
			},
			
			// 处理登录
			handleLogin() {
				if (this.isLoading) return
				
				this.isLoading = true
				console.log('开始登录流程...')
				
				// 1. 获取微信登录凭证
				uni.login({
					provider: 'weixin',
					success: async (loginRes) => {
						try {
							console.log('微信登录返回:', loginRes)
							
							if (loginRes.code) {
								console.log('获取到code:', loginRes.code)
								
								// 2. 调用后端登录接口
								console.log('调用后端登录接口...')
								const result = await login(loginRes.code)
								console.log('后端返回结果:', result)
								
								if (result.code === 200) {
									// 3. 保存token和用户信息
									uni.setStorageSync('token', result.data.token)
									uni.setStorageSync('userId', result.data.userId)
									console.log('Token已保存')
									
									uni.showToast({
										title: '登录成功',
										icon: 'success',
										duration: 1500
									})
									
									// 4. 延迟跳转到首页
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/index/index'
										})
									}, 1500)
								} else {
									throw new Error(result.message || '登录失败')
								}
							} else {
								throw new Error('获取登录凭证失败：code为空')
							}
						} catch (error) {
							console.error('登录失败:', error)
							uni.showToast({
								title: error.message || '登录失败，请重试',
								icon: 'none',
								duration: 2000
							})
							this.isLoading = false
						}
					},
					fail: (err) => {
						console.error('微信登录失败:', err)
						uni.showToast({
							title: '微信授权失败，请重试',
							icon: 'none',
							duration: 2000
						})
						this.isLoading = false
					}
				})
			}
		}
	}
</script>

<style scoped>
	.login-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		position: relative;
		overflow: hidden;
	}

	.login-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px 32px;
		position: relative;
		z-index: 1;
	}

	/* Logo区域 */
	.logo-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 60px;
	}

	.logo-image {
		width: 100px;
		height: 100px;
		margin-bottom: 24px;
		border-radius: 24px;
		background-color: rgba(255, 255, 255, 0.2);
		padding: 16px;
	}

	.app-title {
		font-size: 32px;
		font-weight: 700;
		color: #FFFFFF;
		margin-bottom: 8px;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.app-subtitle {
		font-size: 15px;
		color: rgba(255, 255, 255, 0.85);
		font-weight: 400;
	}

	/* 登录卡片 */
	.login-card {
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 24px;
		padding: 36px 28px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
	}

	.card-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 32px;
	}

	.card-title {
		font-size: 24px;
		font-weight: 700;
		color: #1A1A2E;
		margin-bottom: 8px;
	}

	.card-desc {
		font-size: 14px;
		color: #9CA3AF;
	}

	/* 登录按钮 */
	.login-button {
		width: 100%;
		height: 50px;
		background: linear-gradient(135deg, #4F6EF7, #7B8FF7);
		border-radius: 14px;
		border: none;
		box-shadow: 0 8px 24px rgba(79, 110, 247, 0.3);
		transition: all 0.3s ease;
		margin-bottom: 24px;
	}

	.login-button::after {
		border: none;
	}

	.login-button.loading {
		opacity: 0.7;
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

	/* 提示信息 */
	.tips {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 4px;
	}

	.tips-text {
		font-size: 12px;
		color: #9CA3AF;
	}

	.tips-link {
		font-size: 12px;
		color: #4F6EF7;
		font-weight: 500;
	}

	/* 装饰圆圈 */
	.decoration-circle {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		z-index: 0;
	}

	.circle-1 {
		width: 200px;
		height: 200px;
		top: -100px;
		right: -50px;
	}

	.circle-2 {
		width: 150px;
		height: 150px;
		bottom: 100px;
		left: -75px;
	}

	.circle-3 {
		width: 100px;
		height: 100px;
		top: 40%;
		right: -30px;
	}
</style>
