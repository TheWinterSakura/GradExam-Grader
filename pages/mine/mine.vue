<template>
	<view class="page">
		<!-- 用户信息卡片 -->
		<view class="user-card">
			<view class="user-avatar" @click.stop="uploadAvatar">
				<image 
					class="avatar-img" 
					:src="userInfo.avatar && userInfo.avatar.startsWith('http') ? userInfo.avatar : '/static/logo.png'" 
					mode="aspectFill"
					@error="onAvatarError"
					@load="onAvatarLoad"
				></image>
				<view class="edit-badge">
					<uni-icons type="camera" :size="12" color="#FFFFFF"></uni-icons>
				</view>
			</view>
			<view class="user-info" @click="showEditDialog">
				<text class="username">{{ userInfo.name || '加载中...' }}</text>
				<text class="edit-hint">点击编辑姓名</text>
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

		<!-- 编辑信息弹窗 -->
		<view class="modal-mask" v-if="showDialog" @click="closeEditDialog">
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<text class="modal-title">编辑姓名</text>
				</view>
				<view class="modal-body">
					<view class="form-item">
						<input 
							class="form-input" 
							v-model="editForm.name" 
							placeholder="请输入姓名"
							:focus="showDialog"
						/>
					</view>
				</view>
				<view class="modal-footer">
					<view class="modal-btn cancel" @click="closeEditDialog">
						<text class="btn-text">取消</text>
					</view>
					<view class="modal-btn confirm" @click="saveUserInfo">
						<text class="btn-text">保存</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserInfo, setUserInfo, uploadImage } from '@/api/student.js'

export default {
	data() {
		return {
			showDialog: false,
			userInfo: {
				name: '加载中...',
				avatar: '',
				username: '',
				role: 1
			},
			editForm: {
				name: ''
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
		// 获取用户ID
		getUserId() {
			return uni.getStorageSync('userId')
		},
		
		// 头像加载成功
		onAvatarLoad(e) {
			console.log('头像加载成功:', this.userInfo.avatar)
		},
		
		// 头像加载失败
		onAvatarError(e) {
			console.error('头像加载失败:', this.userInfo.avatar, e)
			// 加载失败时使用默认头像
			this.userInfo.avatar = '/static/logo.png'
		},
		
		// 加载用户信息
		loadUserInfo() {
			const userId = this.getUserId()
			if (!userId) {
				console.log('未登录，跳转到登录页')
				return
			}
			
			console.log('开始获取用户信息，userId:', userId)
			
			getUserInfo(userId).then(result => {
				console.log('getUserInfo接口返回完整数据:', result)
				console.log('getUserInfo接口返回的data:', result.data)
				
				if (result.code === 200) {
					this.userInfo = {
						name: result.data.name || result.data.username || '未设置',
						avatar: result.data.avatar || '',
						username: result.data.username || '',
						role: result.data.role || 1
					}
					console.log('用户信息已更新:', this.userInfo)
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
		
		// 显示编辑弹窗
		showEditDialog() {
			this.editForm = {
				name: this.userInfo.name
			}
			this.showDialog = true
		},
		
		// 关闭编辑弹窗
		closeEditDialog() {
			this.showDialog = false
		},
		
		// 上传头像
		uploadAvatar() {
			const userId = this.getUserId()
			if (!userId) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}
			
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					const tempFilePath = res.tempFilePaths[0]
					console.log('选择的图片:', tempFilePath)
					
					uni.showLoading({
						title: '上传中...'
					})
					
					// 上传图片到服务器
					uploadImage(tempFilePath, userId).then(result => {
						uni.hideLoading()
						
						console.log('图片上传成功:', result)
						
						if (result.code === 200 && result.data) {
							const avatarUrl = result.data
							console.log('获取到的头像URL:', avatarUrl)
							
							// 更新本地显示
							this.userInfo.avatar = avatarUrl
							
							uni.showToast({
								title: '上传成功',
								icon: 'success'
							})
							
							// 重新加载用户信息
							setTimeout(() => {
								this.loadUserInfo()
							}, 1500)
						} else {
							uni.showToast({
								title: result.message || '上传失败',
								icon: 'none'
							})
						}
					}).catch(error => {
						uni.hideLoading()
						console.error('上传图片失败:', error)
						uni.showToast({
							title: error.message || '上传失败',
							icon: 'none'
						})
					})
				},
				fail: (err) => {
					console.error('选择图片失败:', err)
					uni.showToast({
						title: '选择图片失败',
						icon: 'none'
					})
				}
			})
		},
		
		// 保存用户信息
		async saveUserInfo() {
			if (!this.editForm.name || this.editForm.name.trim() === '') {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none'
				})
				return
			}
			
			const userId = this.getUserId()
			if (!userId) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}
			
			try {
				uni.showLoading({
					title: '保存中...'
				})
				
				const name = this.editForm.name.trim()
				
				console.log('保存用户信息，name:', name, 'userId:', userId)
				
				const res = await setUserInfo(name, userId)
				
				uni.hideLoading()
				
				console.log('保存用户信息响应:', res)
				
				if (res.code === 200) {
					this.closeEditDialog()
					
					uni.showToast({
						title: '保存成功',
						icon: 'success'
					})
					
					// 重新加载用户信息
					setTimeout(() => {
						this.loadUserInfo()
					}, 1500)
				}
			} catch (error) {
				uni.hideLoading()
				console.error('保存用户信息失败:', error)
				
				uni.showToast({
					title: error.message || '保存失败',
					icon: 'none'
				})
			}
		},
		
		logout() {
			uni.showModal({
				title: '提示',
				content: '确认退出登录？',
				success: (res) => {
					if (res.confirm) {
						// 清除登录信息
						uni.removeStorageSync('token')
						uni.removeStorageSync('userId')
						
						uni.showToast({
							title: '已退出',
							icon: 'success',
							duration: 1500
						})
						
						// 跳转到登录页
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/login/login'
							})
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
		position: relative;
	}

	.avatar-img {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background-color: #F2F3F7;
		border: 2px solid #F3F4F6;
	}

	.edit-badge {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 20px;
		height: 20px;
		background-color: #4F6EF7;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #FFFFFF;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 4px;
	}

	.username {
		font-size: 20px;
		font-weight: 700;
		color: #1A1A2E;
	}

	.edit-hint {
		font-size: 12px;
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

	/* 编辑信息弹窗 */
	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		padding: 0 20px;
	}

	.modal-content {
		width: 100%;
		max-width: 340px;
		background-color: #FFFFFF;
		border-radius: 16px;
		overflow: hidden;
	}

	.modal-header {
		padding: 20px;
		text-align: center;
		border-bottom: 1px solid #F3F4F6;
	}

	.modal-title {
		font-size: 18px;
		font-weight: 600;
		color: #1A1A2E;
	}

	.modal-body {
		padding: 24px 20px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.form-item {
		display: flex;
		flex-direction: column;
	}

	.form-input {
		height: 48px;
		background-color: #F9FAFB;
		border: 1px solid #E5E7EB;
		border-radius: 12px;
		padding: 0 16px;
		font-size: 16px;
		color: #1A1A2E;
		box-sizing: border-box;
		text-align: center;
	}

	.modal-footer {
		display: flex;
		border-top: 1px solid #F3F4F6;
	}

	.modal-btn {
		flex: 1;
		padding: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-btn.cancel {
		border-right: 1px solid #F3F4F6;
	}

	.modal-btn.cancel .btn-text {
		color: #6B7280;
	}

	.modal-btn.confirm .btn-text {
		color: #4F6EF7;
		font-weight: 600;
	}

	.btn-text {
		font-size: 16px;
	}
</style>
