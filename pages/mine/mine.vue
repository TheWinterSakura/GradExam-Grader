<template>
	<view class="page">
<<<<<<< HEAD
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
=======
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
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c
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

<<<<<<< HEAD
		<!-- 编辑姓名弹窗 -->
		<view class="modal-mask" v-if="showDialog" @click="closeEditDialog">
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<text class="modal-title">编辑个人资料</text>
				</view>
				<view class="modal-body">
					<view class="form-item">
						<text class="form-label">姓名</text>
=======
		<!-- 编辑信息弹窗 -->
		<view class="modal-mask" v-if="showDialog" @click="closeEditDialog">
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<text class="modal-title">编辑姓名</text>
				</view>
				<view class="modal-body">
					<view class="form-item">
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c
						<input 
							class="form-input" 
							v-model="editForm.name" 
							placeholder="请输入姓名"
							:focus="showDialog"
						/>
					</view>
<<<<<<< HEAD
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
=======
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c
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
<<<<<<< HEAD
const BASE_URL = 'http://192.168.190.160:8080'

function requestAPI(options) {
	const token = uni.getStorageSync('token')
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + (token || '')
			},
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data)
				} else if (res.statusCode === 401) {
					uni.removeStorageSync('token')
					uni.removeStorageSync('userId')
					uni.reLaunch({ url: '/pages/login/login' })
					reject(new Error('登录已过期'))
				} else {
					reject(new Error(res.data.message || '请求失败'))
				}
			},
			fail: (err) => reject(err)
		})
	})
}

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
=======
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
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c
			}
		}
	},
	onShow() {
		this.loadUserInfo()
<<<<<<< HEAD
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
			requestAPI({
				url: '/api/student/getUserInfo',
				data: { userId }
			}).then(result => {
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
=======
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
			const that = this
			const userId = this.getUserId()
			if (!userId) {
				console.log('未登录，跳转到登录页')
				return
			}
			
			console.log('开始获取用户信息，userId:', userId)
			
			// 直接使用 uni.request 调用 API
			const token = uni.getStorageSync('token')
			const BASE_URL = 'http://192.168.190.160:8080'
			
			uni.request({
				url: BASE_URL + '/api/student/getUserInfo',
				method: 'GET',
				data: { userId: userId },
				header: {
					'Authorization': token ? `Bearer ${token}` : '',
					'Content-Type': 'application/json'
				},
				success: function(res) {
					console.log('getUserInfo接口返回完整数据:', res)
					console.log('getUserInfo接口返回的data:', res.data)
					
					if (res.data.code === 200) {
						that.userInfo = {
							name: res.data.data.name || res.data.data.username || '未设置',
							avatar: res.data.data.avatar || '',
							username: res.data.data.username || '',
							role: res.data.data.role || 1
						}
						console.log('用户信息已更新:', that.userInfo)
					}
				},
				fail: function(error) {
					console.error('加载用户信息失败:', error)
				}
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
			const that = this
			const userId = this.getUserId()
			if (!userId) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}
			
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
<<<<<<< HEAD
				success: (res) => {
					const tempPath = res.tempFilePaths[0]
					uni.getFileInfo({
						filePath: tempPath,
						success: (fileInfo) => {
							const sizeMB = fileInfo.size / (1024 * 1024)
							if (sizeMB > 10) {
								uni.compressImage({
									src: tempPath,
									quality: 60,
									success: (compressRes) => {
										this.doUpload(compressRes.tempFilePath, userId)
									},
									fail: () => {
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
			const token = uni.getStorageSync('token')
			uni.uploadFile({
				url: BASE_URL + '/api/student/uploadAvatar',
				filePath: filePath,
				name: 'file',
				formData: { userId },
				header: {
					'Authorization': 'Bearer ' + (token || '')
				},
				success: (res) => {
					uni.hideLoading()
					try {
						const result = JSON.parse(res.data)
						if (result.code === 200 && result.data) {
							this.userInfo.avatar = result.data
							uni.showToast({ title: '上传成功', icon: 'success' })
							setTimeout(() => this.loadUserInfo(), 1500)
						} else {
							uni.showToast({ title: '上传失败', icon: 'none' })
						}
					} catch (e) {
						uni.showToast({ title: '上传失败', icon: 'none' })
					}
				},
				fail: () => {
					uni.hideLoading()
					uni.showToast({ title: '上传失败', icon: 'none' })
				}
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
				const res = await requestAPI({
					url: '/api/student/updateUserInfo',
					method: 'POST',
					data: { name: this.editForm.name.trim(), userId, phone: this.editForm.phone.trim() }
				})
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
=======
				success: function(res) {
					const tempFilePath = res.tempFilePaths[0]
					console.log('选择的图片:', tempFilePath)
					
					uni.showLoading({
						title: '上传中...'
					})
					
					// 直接使用 uni.uploadFile 上传图片
					const token = uni.getStorageSync('token')
					const BASE_URL = 'http://192.168.190.160:8080'
					
					uni.uploadFile({
						url: BASE_URL + `/api/student/uploadAvatar/${userId}`,
						filePath: tempFilePath,
						name: 'file',
						header: {
							'Authorization': token ? `Bearer ${token}` : ''
						},
						success: function(uploadRes) {
							uni.hideLoading()
							
							console.log('图片上传成功:', uploadRes)
							
							if (uploadRes.statusCode === 200) {
								const data = JSON.parse(uploadRes.data)
								console.log('上传头像解析后的数据:', data)
								
								if (data.code === 200 && data.data) {
									const avatarUrl = data.data
									console.log('获取到的头像URL:', avatarUrl)
									
									// 更新本地显示
									that.userInfo.avatar = avatarUrl
									
									uni.showToast({
										title: '上传成功',
										icon: 'success'
									})
									
									// 重新加载用户信息
									setTimeout(function() {
										that.loadUserInfo()
									}, 1500)
								} else {
									uni.showToast({
										title: data.message || '上传失败',
										icon: 'none'
									})
								}
							} else {
								uni.showToast({
									title: '上传失败',
									icon: 'none'
								})
							}
						},
						fail: function(err) {
							uni.hideLoading()
							console.error('上传图片失败:', err)
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							})
						}
					})
				},
				fail: function(err) {
					console.error('选择图片失败:', err)
					uni.showToast({
						title: '选择图片失败',
						icon: 'none'
					})
				}
			})
		},
		
		// 保存用户信息
		saveUserInfo() {
			const that = this
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
			
			uni.showLoading({
				title: '保存中...'
			})
			
			const name = this.editForm.name.trim()
			
			console.log('保存用户信息，name:', name, 'userId:', userId)
			
			// 直接使用 uni.request 调用 API
			const token = uni.getStorageSync('token')
			const BASE_URL = 'http://192.168.190.160:8080'
			
			uni.request({
				url: BASE_URL + '/api/student/setUserInfo',
				method: 'POST',
				data: { 
					userId: userId,
					username: name,
					name: name
				},
				header: {
					'Authorization': token ? `Bearer ${token}` : '',
					'Content-Type': 'application/json'
				},
				success: function(res) {
					uni.hideLoading()
					
					console.log('保存用户信息响应:', res)
					
					if (res.data.code === 200) {
						that.closeEditDialog()
						
						uni.showToast({
							title: '保存成功',
							icon: 'success'
						})
						
						// 重新加载用户信息
						setTimeout(function() {
							that.loadUserInfo()
						}, 1500)
					} else {
						uni.showToast({
							title: res.data.message || '保存失败',
							icon: 'none'
						})
					}
				},
				fail: function(error) {
					uni.hideLoading()
					console.error('保存用户信息失败:', error)
					
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					})
				}
			})
		},
		
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c
		logout() {
			uni.showModal({
				title: '提示',
				content: '确认退出登录？',
<<<<<<< HEAD
				success: (res) => {
					if (res.confirm) {
						uni.removeStorageSync('token')
						uni.removeStorageSync('userId')
						uni.reLaunch({ url: '/pages/login/login' })
=======
				success: function(res) {
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
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}, 1500)
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c
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

<<<<<<< HEAD
.header-content {
	display: flex;
	align-items: center;
}
=======
	.user-avatar {
		flex-shrink: 0;
		position: relative;
	}
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c

.avatar-wrap {
	flex-shrink: 0;
}

<<<<<<< HEAD
.avatar-img {
	width: 64px;
	height: 64px;
	border-radius: 50%;
	border: 3px solid rgba(255, 255, 255, 0.8);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
=======
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
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c

.user-info {
	flex: 1;
	margin-left: 16px;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

<<<<<<< HEAD
.username {
	font-size: 20px;
	font-weight: 700;
	color: #FFFFFF;
}
=======
	.edit-hint {
		font-size: 12px;
		color: #9CA3AF;
	}
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c

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

<<<<<<< HEAD
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
=======
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
>>>>>>> 39f410922c355951d842b6ff6c9ff5236d60347c
</style>
