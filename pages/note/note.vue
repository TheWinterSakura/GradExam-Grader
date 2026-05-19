<template>
	<view class="page">
		<!-- 顶部标题栏 -->
		<view class="header">
			<text class="header-title">我的课程</text>
			<view class="join-btn" @click="showJoinDialog">
				<uni-icons type="plus" :size="16" color="#FFFFFF"></uni-icons>
				<text class="join-text">加入班级</text>
			</view>
		</view>

		<!-- 课程列表 -->
		<view class="class-list" v-if="classList.length > 0">
			<view class="class-card" v-for="item in classList" :key="item.id" @click="goToClassDetail(item)">
				<view class="card-header">
					<view class="class-info">
						<text class="class-name">{{ item.name }}</text>
						<text class="class-teacher">{{ item.teacher }}</text>
					</view>
					<view class="class-badge" :class="item.status">
						<text class="badge-text">{{ item.statusText }}</text>
					</view>
				</view>
				<view class="card-body">
					<view class="info-item">
						<uni-icons type="person" :size="14" color="#9CA3AF"></uni-icons>
						<text class="info-text">{{ item.studentCount }} 人</text>
					</view>
					<view class="info-item">
						<uni-icons type="calendar" :size="14" color="#9CA3AF"></uni-icons>
						<text class="info-text">{{ item.schedule }}</text>
					</view>
				</view>
				<view class="card-footer">
					<text class="class-code">班级码：{{ item.classCode }}</text>
				</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view class="empty" v-else>
			<view class="empty-illustration">
				<uni-icons type="folder-add" :size="56" color="#D1D5DB"></uni-icons>
			</view>
			<text class="empty-title">还没有加入班级</text>
			<text class="empty-desc">点击右上角"加入班级"按钮，输入班级码即可加入</text>
		</view>

		<!-- 加入班级弹窗 -->
		<view class="modal-mask" v-if="showDialog" @click="closeDialog">
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<text class="modal-title">加入班级</text>
				</view>
				<view class="modal-body">
					<input 
						class="class-code-input" 
						v-model="classCode" 
						placeholder="请输入班级码"
						:focus="showDialog"
					/>
				</view>
				<view class="modal-footer">
					<view class="modal-btn cancel" @click="closeDialog">
						<text class="btn-text">取消</text>
					</view>
					<view class="modal-btn confirm" @click="joinClass">
						<text class="btn-text">确定</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showDialog: false,
			classCode: '',
			classList: []
		}
	},
	onLoad() {
		this.loadClassList()
	},
	onShow() {
		this.loadClassList()
	},
	methods: {
		// 获取用户ID
		getUserId() {
			return uni.getStorageSync('userId')
		},
		
		// 加载班级列表
		loadClassList() {
			const that = this
			const userId = this.getUserId()
			if (!userId) {
				console.log('未登录，无法加载班级列表')
				return
			}
			
			console.log('开始加载班级列表，userId:', userId)
			
			const token = uni.getStorageSync('token')
			const BASE_URL = 'http://192.168.190.160:8080'
			
			uni.request({
				url: BASE_URL + '/api/student/getClassList',
				method: 'GET',
				data: { userId: userId },
				header: {
					'Authorization': token ? `Bearer ${token}` : '',
					'Content-Type': 'application/json'
				},
				success: function(res) {
					console.log('班级列表响应:', res)
					
					if (res.data.code === 200 && res.data.data) {
						// 处理班级列表数据
						that.classList = res.data.data.map(function(item) {
							return {
								id: item.id,
								name: item.name,
								teacher: item.teacherId ? `教师ID: ${item.teacherId}` : '未知教师',
								studentCount: 0, // 接口未返回学生数量
								schedule: item.grade || '未设置',
								classCode: item.code,
								status: 'active',
								statusText: '进行中',
								description: item.description,
								createTime: item.createTime
							}
						})
						
						console.log('班级列表已更新:', that.classList)
					}
				},
				fail: function(error) {
					console.error('加载班级列表失败:', error)
				}
			})
		},
		
		// 显示加入班级弹窗
		showJoinDialog() {
			this.classCode = ''
			this.showDialog = true
		},
		
		// 关闭弹窗
		closeDialog() {
			this.showDialog = false
			this.classCode = ''
		},
		
		// 加入班级
		joinClass() {
			const that = this
			if (!this.classCode || this.classCode.trim() === '') {
				uni.showToast({
					title: '请输入班级码',
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
			
			console.log('加入班级，班级码:', this.classCode, 'userId:', userId)
			
			uni.showLoading({
				title: '加入中...'
			})
			
			const token = uni.getStorageSync('token')
			const BASE_URL = 'http://192.168.190.160:8080'
			
			uni.request({
				url: BASE_URL + '/api/student/joinClass',
				method: 'POST',
				data: { 
					code: that.classCode,
					userId: userId
				},
				header: {
					'Authorization': token ? `Bearer ${token}` : '',
					'Content-Type': 'application/json'
				},
				success: function(res) {
					uni.hideLoading()
					
					console.log('加入班级响应:', res)
					
					if (res.data.code === 200) {
						that.closeDialog()
						
						uni.showToast({
							title: '加入成功',
							icon: 'success'
						})
						
						// 重新加载班级列表
						setTimeout(function() {
							that.loadClassList()
						}, 1500)
					} else {
						uni.showToast({
							title: res.data.message || '加入失败',
							icon: 'none'
						})
					}
				},
				fail: function(error) {
					uni.hideLoading()
					console.error('加入班级失败:', error)
					
					uni.showToast({
						title: '加入失败',
						icon: 'none'
					})
				}
			})
		},
		
		// 进入班级详情
		goToClassDetail(item) {
			uni.showToast({
				title: '进入班级：' + item.name,
				icon: 'none'
			})
			// TODO: 跳转到班级详情页
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background-color: #F2F3F7;
	padding-bottom: 60px;
}

/* 顶部标题栏 */
.header {
	background-color: #FFFFFF;
	padding: 16px 16px 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-title {
	font-size: 20px;
	font-weight: 700;
	color: #1A1A2E;
}

.join-btn {
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 8px 16px;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 20px;
	box-shadow: 0 2px 8px rgba(79, 110, 247, 0.3);
}

.join-text {
	font-size: 14px;
	color: #FFFFFF;
	font-weight: 500;
}

/* 课程列表 */
.class-list {
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.class-card {
	background-color: #FFFFFF;
	border-radius: 16px;
	padding: 16px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 12px;
}

.class-info {
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1;
}

.class-name {
	font-size: 17px;
	font-weight: 600;
	color: #1A1A2E;
}

.class-teacher {
	font-size: 13px;
	color: #9CA3AF;
}

.class-badge {
	padding: 4px 12px;
	border-radius: 12px;
	background-color: #E8F5E9;
}

.class-badge.active {
	background-color: #E8F5E9;
}

.class-badge.ended {
	background-color: #F3F4F6;
}

.badge-text {
	font-size: 12px;
	color: #34C759;
	font-weight: 500;
}

.class-badge.ended .badge-text {
	color: #9CA3AF;
}

.card-body {
	display: flex;
	gap: 16px;
	margin-bottom: 12px;
	padding-bottom: 12px;
	border-bottom: 1px solid #F3F4F6;
}

.info-item {
	display: flex;
	align-items: center;
	gap: 4px;
}

.info-text {
	font-size: 13px;
	color: #6B7280;
}

.card-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.class-code {
	font-size: 12px;
	color: #9CA3AF;
	font-family: monospace;
}

/* 空状态 */
.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	padding: 80px 40px;
}

.empty-illustration {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: #F9FAFB;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 8px;
}

.empty-title {
	font-size: 17px;
	font-weight: 600;
	color: #1A1A2E;
}

.empty-desc {
	font-size: 14px;
	color: #9CA3AF;
	text-align: center;
	line-height: 1.5;
}

/* 自定义弹窗 */
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
	justify-content: center;
}

.class-code-input {
	width: 100%;
	height: 48px;
	background-color: #F9FAFB;
	border: 1px solid #E5E7EB;
	border-radius: 12px;
	padding: 0 16px;
	font-size: 16px;
	color: #1A1A2E;
	text-align: center;
	letter-spacing: 4px;
	box-sizing: border-box;
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
