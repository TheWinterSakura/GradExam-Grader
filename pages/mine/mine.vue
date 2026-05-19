<template>
	<view class="page">
		<!-- 沉浸式头部 -->
		<view class="header-bg">
			<view class="header-content" @click="showEditDialog">
				<view class="avatar-wrap" @click.stop="uploadAvatar">
					<image 
						class="avatar-img" 
						:src="userInfo.avatar && userInfo.avatar.startsWith('http') ? userInfo.avatar : '/static/uni.png'" 
						mode="aspectFill"
						@error="onAvatarError"
					></image>
				</view>
				<view class="user-info">
					<text class="username">{{ userInfo.name || '未设置' }}</text>
					<text class="user-sub">手机号：{{ userInfo.phone || '未绑定' }}</text>
				</view>
				<uni-icons type="right" :size="18" color="rgba(255,255,255,0.7)"></uni-icons>
			</view>
		</view>

		<!-- 功能列表 -->
		<view class="menu-card">
			<view class="menu-item" @click="showEditDialog">
				<view class="menu-left">
					<uni-icons type="person" :size="20" color="#4F6EF7"></uni-icons>
					<text class="menu-title">编辑个人资料</text>
				</view>
				<uni-icons type="right" :size="16" color="#D1D5DB"></uni-icons>
			</view>
			<view class="menu-divider"></view>
			<view class="menu-item" @click="clearCache">
				<view class="menu-left">
					<uni-icons type="trash" :size="20" color="#4F6EF7"></uni-icons>
					<text class="menu-title">清除本地缓存</text>
				</view>
				<text class="menu-extra">{{ cacheSize }}</text>
			</view>
			<view class="menu-divider"></view>
			<view class="menu-item" @click="goAbout">
				<view class="menu-left">
					<uni-icons type="info" :size="20" color="#4F6EF7"></uni-icons>
					<text class="menu-title">关于考研批改助手</text>
				</view>
				<text class="menu-extra">v1.0.0</text>
			</view>
		</view>

		<!-- 退出登录 -->
		<view class="logout-section">
			<view class="logout-btn" @click="logout">
				<text class="logout-text">退出登录</text>
			</view>
		</view>

		<!-- 编辑姓名弹窗 -->
		<view class="modal-mask" v-if="showDialog" @click="closeEditDialog">
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<text class="modal-title">编辑个人资料</text>
				</view>
				<view class="modal-body">
					<view class="form-item">
						<text class="form-label">姓名</text>
						<input 
							class="form-input" 
							v-model="editForm.name" 
							placeholder="请输入姓名"
							:focus="showDialog"
						/>
					</view>
					<view class="form-item">
						<text class="form-label">手机号</text>
						<input 
							class="form-input" 
							v-model="editForm.phone" 
							placeholder="请输入手机号"
							type="number"
							maxlength="11"
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
			cacheSize: '0 KB',
			userInfo: {
				name: '',
				avatar: '',
				username: '',
				phone: '',
				role: 1
			},
			editForm: {
				name: '',
				phone: ''
			}
		}
	},
	onShow() {
		this.loadUserInfo()
		this.calcCacheSize()
	},
	methods: {
		getUserId() {
			return uni.getStorageSync('userId')
		},
		onAvatarError() {
			this.userInfo.avatar = '/static/uni.png'
		},
		loadUserInfo() {
			const userId = this.getUserId()
			if (!userId) return
			getUserInfo(userId).then(result => {
				if (result.code === 200) {
					this.userInfo = {
						name: result.data.name || result.data.username || '未设置',
						avatar: result.data.avatar || '',
						username: result.data.username || '',
						phone: result.data.phone || '',
						role: result.data.role || 1
					}
				}
			}).catch(() => {})
		},
		calcCacheSize() {
			const info = uni.getStorageInfoSync()
			const kb = info.currentSize || 0
			this.cacheSize = kb > 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB'
		},
		clearCache() {
			uni.showModal({
				title: '提示',
				content: '确认清除本地缓存？（不会清除登录状态）',
				success: (res) => {
					if (res.confirm) {
						const token = uni.getStorageSync('token')
						const userId = uni.getStorageSync('userId')
						uni.clearStorageSync()
						uni.setStorageSync('token', token)
						uni.setStorageSync('userId', userId)
						this.calcCacheSize()
						uni.showToast({ title: '清除成功', icon: 'success' })
					}
				}
			})
		},
		goAbout() {
			uni.showModal({
				title: '关于考研批改助手',
				content: '版本：v1.0.0\n专业的考研作业批改平台，助力每一位考研学子。',
				showCancel: false
			})
		},
		showEditDialog() {
			this.editForm.name = this.userInfo.name
			this.editForm.phone = this.userInfo.phone
			this.showDialog = true
		},
		closeEditDialog() {
			this.showDialog = false
		},
		uploadAvatar() {
			const userId = this.getUserId()
			if (!userId) return
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					const tempPath = res.tempFilePaths[0]
					// 检查文件大小，超过10MB则压缩
					uni.getFileInfo({
						filePath: tempPath,
						success: (fileInfo) => {
							const sizeMB = fileInfo.size / (1024 * 1024)
							if (sizeMB > 10) {
								// 压缩图片
								uni.compressImage({
									src: tempPath,
									quality: 60,
									success: (compressRes) => {
										this.doUpload(compressRes.tempFilePath, userId)
									},
									fail: () => {
										// 压缩失败仍尝试上传原图
										this.doUpload(tempPath, userId)
									}
								})
							} else {
								this.doUpload(tempPath, userId)
							}
						},
						fail: () => {
							this.doUpload(tempPath, userId)
						}
					})
				}
			})
		},
		doUpload(filePath, userId) {
			uni.showLoading({ title: '上传中...' })
			uploadImage(filePath, userId).then(result => {
				uni.hideLoading()
				if (result.code === 200 && result.data) {
					this.userInfo.avatar = result.data
					uni.showToast({ title: '上传成功', icon: 'success' })
					setTimeout(() => this.loadUserInfo(), 1500)
				}
			}).catch(() => {
				uni.hideLoading()
				uni.showToast({ title: '上传失败', icon: 'none' })
			})
		},
		async saveUserInfo() {
			if (!this.editForm.name || !this.editForm.name.trim()) {
				uni.showToast({ title: '请输入姓名', icon: 'none' })
				return
			}
			const userId = this.getUserId()
			if (!userId) return
			try {
				uni.showLoading({ title: '保存中...' })
				const res = await setUserInfo(this.editForm.name.trim(), userId, this.editForm.phone.trim())
				uni.hideLoading()
				if (res.code === 200) {
					this.closeEditDialog()
					uni.showToast({ title: '保存成功', icon: 'success' })
					setTimeout(() => this.loadUserInfo(), 1500)
				}
			} catch (error) {
				uni.hideLoading()
				uni.showToast({ title: error.message || '保存失败', icon: 'none' })
			}
		},
		logout() {
			uni.showModal({
				title: '提示',
				content: '确认退出登录？',
				success: (res) => {
					if (res.confirm) {
						uni.removeStorageSync('token')
						uni.removeStorageSync('userId')
						uni.reLaunch({ url: '/pages/login/login' })
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
	background-color: #EEF2FF;
}

/* 沉浸式头部 */
.header-bg {
	background-color: #4F6EF7;
	padding: 60px 24px 36px;
	margin-bottom: 24px;
}

.header-content {
	display: flex;
	align-items: center;
}

.avatar-wrap {
	flex-shrink: 0;
}

.avatar-img {
	width: 64px;
	height: 64px;
	border-radius: 50%;
	border: 3px solid rgba(255, 255, 255, 0.8);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-info {
	flex: 1;
	margin-left: 16px;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.username {
	font-size: 20px;
	font-weight: 700;
	color: #FFFFFF;
}

.user-sub {
	font-size: 13px;
	color: rgba(255, 255, 255, 0.7);
}

/* 功能列表 */
.menu-card {
	margin: 16px 16px 0;
	background-color: #FFFFFF;
	border-radius: 16px;
	overflow: hidden;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
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

.menu-extra {
	font-size: 13px;
	color: #9CA3AF;
}

.menu-divider {
	height: 1px;
	background-color: #F3F4F6;
	margin: 0 20px;
}

/* 退出登录 */
.logout-section {
	margin: 40px 16px 0;
}

.logout-btn {
	background-color: #F8F9FA;
	border-radius: 14px;
	padding: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.logout-text {
	font-size: 15px;
	color: #666666;
	font-weight: 500;
}

/* 弹窗 */
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
	max-width: 320px;
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
	gap: 6px;
}

.form-label {
	font-size: 14px;
	color: #6B7280;
}

.form-input {
	height: 48px;
	background-color: #F9FAFB;
	border: 1px solid #E5E7EB;
	border-radius: 12px;
	padding: 0 16px;
	font-size: 16px;
	color: #1A1A2E;
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
