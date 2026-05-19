<template>
	<view class="page">
		<!-- 沉浸式班级头部 -->
		<view class="header-bg">
			<text class="class-name">{{ classInfo.name }}</text>
			<view class="meta-row">
				<text class="meta-item">授课教师：{{ classInfo.teacherName }}</text>
				<text class="meta-divider">|</text>
				<text class="meta-item">班级人数：{{ classInfo.peopleNumber }}人</text>
			</view>

			<!-- 进度面板 -->
			<view class="progress-panel">
				<view class="progress-item">
					<text class="progress-num pending">{{ pendingCount }}</text>
					<text class="progress-label">待完成</text>
				</view>
				<view class="progress-divider"></view>
				<view class="progress-item">
					<text class="progress-num">{{ submittedCount }}</text>
					<text class="progress-label">已提交</text>
				</view>
				<view class="progress-divider"></view>
				<view class="progress-item">
					<text class="progress-num">{{ assignmentList.length }}</text>
					<text class="progress-label">总作业</text>
				</view>
			</view>
		</view>

		<!-- Tab 切换 -->
		<view class="tab-bar">
			<view 
				class="tab-item" 
				:class="{ active: activeTab === 'pending' }" 
				@click="activeTab = 'pending'"
			>
				<text class="tab-text">待完成</text>
				<view class="tab-badge" v-if="pendingCount > 0">{{ pendingCount }}</view>
			</view>
			<view 
				class="tab-item" 
				:class="{ active: activeTab === 'graded' }" 
				@click="activeTab = 'graded'"
			>
				<text class="tab-text">已批改</text>
			</view>
			<view 
				class="tab-item" 
				:class="{ active: activeTab === 'all' }" 
				@click="activeTab = 'all'"
			>
				<text class="tab-text">全部作业</text>
			</view>
		</view>

		<!-- 作业列表 -->
		<view class="content">
			<!-- Loading -->
			<view v-if="loading" class="skeleton-card">
				<view class="skeleton-row skeleton-row-1"></view>
				<view class="skeleton-row skeleton-row-2"></view>
				<view class="skeleton-row skeleton-row-3"></view>
			</view>

			<!-- 列表 -->
			<view v-else-if="filteredList.length > 0">
				<view 
					class="task-card" 
					v-for="item in filteredList" 
					:key="item.assignment_id" 
					@click="goToDetail(item)"
				>
					<view class="card-header">
						<text class="task-title">{{ item.title }}</text>
						<view class="status-tag" :class="getStatusClass(item)">
							<text class="status-text">{{ getStatusText(item) }}</text>
						</view>
					</view>

					<view class="card-body">
						<view class="info-line" v-if="item.description">
							<uni-icons type="info" :size="13" color="#9CA3AF"></uni-icons>
							<text class="info-text">{{ item.description }}</text>
						</view>
						<view class="info-line">
							<uni-icons type="calendar" :size="13" color="#EF4444"></uni-icons>
							<text class="info-text deadline">截止：{{ formatDate(item.endTime) }}</text>
						</view>
						<view class="info-line">
							<uni-icons type="clock" :size="13" color="#9CA3AF"></uni-icons>
							<text class="info-text muted">发布：{{ formatDate(item.createTime) }}</text>
						</view>
					</view>

					<!-- 已批改且有分数 -->
					<view v-if="item.gradeStatus === 1 && item.score !== -1" class="card-footer">
						<text class="score-label">得分</text>
						<text class="score-value">{{ item.score }} 分</text>
					</view>

					<view class="card-arrow">
						<uni-icons type="right" :size="14" color="#D1D5DB"></uni-icons>
					</view>
				</view>
			</view>

			<!-- 空状态 -->
			<view v-else class="empty">
				<view class="empty-illustration">
					<uni-icons type="checkbox" :size="56" color="#D1D5DB"></uni-icons>
				</view>
				<text class="empty-title">{{ getEmptyTitle() }}</text>
				<text class="empty-desc">{{ getEmptyDesc() }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { getAssignmentList } from '@/api/student.js'

export default {
	data() {
		return {
			loading: true,
			activeTab: 'pending',
			classInfo: {
				id: '',
				name: '',
				teacherName: '',
				peopleNumber: 0,
				subject: ''
			},
			assignmentList: []
		}
	},
	computed: {
		pendingCount() {
			return this.assignmentList.filter(i => i.commit !== 1).length
		},
		submittedCount() {
			return this.assignmentList.filter(i => i.commit === 1).length
		},
		filteredList() {
			if (this.activeTab === 'pending') {
				return this.assignmentList.filter(i => i.commit !== 1)
			}
			if (this.activeTab === 'graded') {
				return this.assignmentList.filter(i => i.gradeStatus === 1)
			}
			return this.assignmentList
		}
	},
	onLoad(options) {
		this.classInfo = {
			id: options.id || '',
			name: decodeURIComponent(options.name || '班级'),
			teacherName: decodeURIComponent(options.teacherName || '未知'),
			peopleNumber: options.peopleNumber || 0,
			subject: decodeURIComponent(options.subject || '')
		}
		uni.setNavigationBarTitle({ title: this.classInfo.name })
		this.loadAssignments()
	},
	methods: {
		async loadAssignments() {
			if (!this.classInfo.id) {
				this.loading = false
				return
			}
			const studentId = uni.getStorageSync('userId')
			if (!studentId) {
				this.loading = false
				return
			}
			this.loading = true
			try {
				const res = await getAssignmentList(studentId, this.classInfo.id)
				if (res.code === 200 && res.data) {
					this.assignmentList = res.data
				}
			} catch (error) {
				console.error('加载作业列表失败:', error)
			} finally {
				this.loading = false
			}
		},
		// 计算作业状态：0=待完成 1=已批改 2=已提交待批改
		getDisplayStatus(item) {
			if (item.gradeStatus === 1) return 'graded'
			if (item.commit === 1) return 'submitted'
			return 'pending'
		},
		getStatusClass(item) {
			return this.getDisplayStatus(item)
		},
		getStatusText(item) {
			const s = this.getDisplayStatus(item)
			if (s === 'graded') return '已批改'
			if (s === 'submitted') return '待批改'
			return '待完成'
		},
		formatDate(str) {
			if (!str) return '-'
			// 兼容 ISO 格式 2026-05-13T09:40:00
			return str.replace('T', ' ').slice(5, 16)
		},
		getEmptyTitle() {
			if (this.activeTab === 'pending') return '太棒了！'
			if (this.activeTab === 'graded') return '暂无已批改作业'
			return '暂无作业'
		},
		getEmptyDesc() {
			if (this.activeTab === 'pending') return '你已清空所有待办作业，去复习一下错题吧'
			if (this.activeTab === 'graded') return '提交作业后，老师会尽快批改'
			return '老师正在奋笔疾书准备作业中，稍后再来看看吧'
		},
		goToDetail(item) {
			uni.navigateTo({
				url: `/pages/detail/detail?id=${item.assignment_id}`
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
	padding: 24px 20px 50px;
}

.class-name {
	font-size: 22px;
	font-weight: 700;
	color: #FFFFFF;
	display: block;
	margin-bottom: 10px;
}

.meta-row {
	display: flex;
	align-items: center;
	gap: 8px;
}

.meta-item {
	font-size: 13px;
	color: rgba(255, 255, 255, 0.85);
}

.meta-divider {
	font-size: 12px;
	color: rgba(255, 255, 255, 0.4);
}

/* 进度面板 */
.progress-panel {
	margin-top: 20px;
	background-color: rgba(255, 255, 255, 0.18);
	border-radius: 14px;
	padding: 16px;
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.progress-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
}

.progress-num {
	font-size: 22px;
	font-weight: 700;
	color: #FFFFFF;
}

.progress-num.pending {
	color: #FCD34D;
}

.progress-label {
	font-size: 12px;
	color: rgba(255, 255, 255, 0.85);
}

.progress-divider {
	width: 1px;
	height: 30px;
	background-color: rgba(255, 255, 255, 0.25);
}

/* Tab */
.tab-bar {
	margin: -32px 16px 0;
	background-color: #FFFFFF;
	border-radius: 14px;
	display: flex;
	padding: 6px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.tab-item {
	flex: 1;
	padding: 10px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	border-radius: 10px;
	position: relative;
}

.tab-item.active {
	background-color: #EEF2FF;
}

.tab-text {
	font-size: 14px;
	color: #6B7280;
}

.tab-item.active .tab-text {
	color: #4F6EF7;
	font-weight: 600;
}

.tab-badge {
	min-width: 18px;
	height: 18px;
	border-radius: 9px;
	background-color: #EF4444;
	color: #FFFFFF;
	font-size: 11px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 6px;
}

/* 内容 */
.content {
	padding: 16px;
}

/* 作业卡片 */
.task-card {
	background-color: #FFFFFF;
	border-radius: 14px;
	padding: 16px 18px;
	margin-bottom: 12px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	position: relative;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 10px;
	margin-bottom: 12px;
}

.task-title {
	flex: 1;
	font-size: 15px;
	font-weight: 600;
	color: #1A1A2E;
	line-height: 1.4;
}

.status-tag {
	padding: 3px 10px;
	border-radius: 8px;
	flex-shrink: 0;
}

.status-tag.pending {
	background-color: #FEF3C7;
}

.status-tag.pending .status-text {
	color: #D97706;
}

.status-tag.graded {
	background-color: #D1FAE5;
}

.status-tag.graded .status-text {
	color: #059669;
}

.status-tag.rejected {
	background-color: #FEE2E2;
}

.status-tag.rejected .status-text {
	color: #DC2626;
}

.status-text {
	font-size: 11px;
	font-weight: 500;
}

.card-body {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.info-line {
	display: flex;
	align-items: center;
	gap: 6px;
}

.info-text {
	font-size: 12px;
	color: #6B7280;
	flex: 1;
}

.info-text.deadline {
	color: #EF4444;
}

.info-text.muted {
	color: #9CA3AF;
}

.card-footer {
	margin-top: 10px;
	padding-top: 10px;
	border-top: 1px dashed #F3F4F6;
	display: flex;
	align-items: baseline;
	gap: 6px;
}

.score-label {
	font-size: 12px;
	color: #9CA3AF;
}

.score-value {
	font-size: 16px;
	font-weight: 700;
	color: #4F6EF7;
}

.card-arrow {
	position: absolute;
	right: 12px;
	top: 50%;
	transform: translateY(-50%);
}

/* 骨架屏 */
.skeleton-card {
	background-color: #FFFFFF;
	border-radius: 14px;
	padding: 18px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.skeleton-row {
	height: 14px;
	background: linear-gradient(90deg, #F3F4F6 0%, #E5E7EB 50%, #F3F4F6 100%);
	border-radius: 7px;
	margin-bottom: 12px;
	animation: skeleton 1.4s ease infinite;
}

.skeleton-row-1 { width: 60%; height: 18px; }
.skeleton-row-2 { width: 90%; }
.skeleton-row-3 { width: 40%; }

@keyframes skeleton {
	0% { opacity: 1; }
	50% { opacity: 0.5; }
	100% { opacity: 1; }
}

/* 空状态 */
.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	padding: 60px 30px;
	background-color: #FFFFFF;
	border-radius: 14px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.empty-illustration {
	width: 90px;
	height: 90px;
	border-radius: 50%;
	background-color: #F9FAFB;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 6px;
}

.empty-title {
	font-size: 16px;
	font-weight: 600;
	color: #1A1A2E;
}

.empty-desc {
	font-size: 13px;
	color: #9CA3AF;
	text-align: center;
	line-height: 1.6;
}
</style>
