<template>
	<view class="page">
		<!-- 顶部品牌区 -->
		<view class="header-bg">
			<text class="header-title">我的专属班级</text>
			<text class="header-subtitle">研途漫漫，我们与你同在</text>
		</view>

		<!-- 内容区 -->
		<view class="content">
			<!-- 加载状态：骨架屏 -->
			<view v-if="loading" class="skeleton-card">
				<view class="skeleton-row skeleton-row-1"></view>
				<view class="skeleton-row skeleton-row-2"></view>
				<view class="skeleton-row skeleton-row-3"></view>
			</view>

			<!-- 成功状态：班级列表 -->
			<view v-else-if="classList.length > 0">
				<!-- 公告栏 -->
				<view class="notice-bar">
					<uni-icons type="sound" :size="14" color="#F59E0B"></uni-icons>
					<text class="notice-text">请按时提交每日作业，老师会在 24 小时内完成批改</text>
				</view>

				<!-- 班级卡片 -->
				<view 
					class="class-card" 
					v-for="item in classList" 
					:key="item.id" 
					@click="goToClassDetail(item)"
				>
					<view class="card-header">
						<view class="subject-tag">
							<text class="subject-text">{{ item.subject }}</text>
						</view>
						<text class="class-name">{{ item.name }}</text>
						<view class="status-tag">
							<text class="status-text">已加入</text>
						</view>
					</view>

					<view class="card-body">
						<view class="info-row">
							<text class="info-label">授课教师</text>
							<text class="info-value">{{ item.teacherName }}</text>
						</view>
						<view class="info-row">
							<text class="info-label">班级人数</text>
							<text class="info-value">{{ item.peopleNumber }} 人</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 空状态 -->
			<view v-else class="empty">
				<view class="empty-illustration">
					<uni-icons type="folder-add" :size="56" color="#D1D5DB"></uni-icons>
				</view>
				<text class="empty-title">暂未分配到班级</text>
				<text class="empty-desc">请耐心等待，或联系授课老师/助教进行添加</text>
			</view>
		</view>
	</view>
</template>

<script>
import { getClassList } from '@/api/student.js'

export default {
	data() {
		return {
			loading: true,
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
		getUserId() {
			return uni.getStorageSync('userId')
		},
		async loadClassList() {
			const userId = this.getUserId()
			if (!userId) {
				this.loading = false
				return
			}
			this.loading = true
			try {
				const res = await getClassList(userId)
				if (res.code === 200 && res.data) {
					this.classList = res.data.map((item, index) => ({
						id: item.id || index,
						name: item.name,
						teacherName: item.teacherName || '未知教师',
						subject: item.subject || '未设置',
						peopleNumber: item.peopleNumber || 0
					}))
				}
			} catch (error) {
				console.error('加载班级列表失败:', error)
			} finally {
				this.loading = false
			}
		},
		goToClassDetail(item) {
			uni.navigateTo({
				url: `/pages/class-detail/class-detail?id=${item.id}&name=${encodeURIComponent(item.name)}&teacherName=${encodeURIComponent(item.teacherName)}&peopleNumber=${item.peopleNumber}&subject=${encodeURIComponent(item.subject)}`
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

/* 顶部品牌区 */
.header-bg {
	background-color: #4F6EF7;
	padding: 60px 24px 60px;
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.header-title {
	font-size: 22px;
	font-weight: 700;
	color: #FFFFFF;
}

.header-subtitle {
	font-size: 13px;
	color: rgba(255, 255, 255, 0.8);
	letter-spacing: 1px;
}

/* 内容区，向上偏移让卡片压在头部 */
.content {
	margin-top: -32px;
	padding: 0 16px 80px;
}

/* 公告栏 */
.notice-bar {
	display: flex;
	align-items: center;
	gap: 8px;
	background-color: #FFFBEB;
	border: 1px solid #FCD34D;
	border-radius: 10px;
	padding: 10px 14px;
	margin-bottom: 12px;
}

.notice-text {
	font-size: 12px;
	color: #B45309;
	flex: 1;
}

/* 班级卡片 */
.class-card {
	background-color: #FFFFFF;
	border-radius: 16px;
	padding: 18px;
	margin-bottom: 12px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.card-header {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 14px;
	padding-bottom: 14px;
	border-bottom: 1px solid #F3F4F6;
}

.subject-tag {
	padding: 4px 10px;
	border-radius: 8px;
	flex-shrink: 0;
	background-color: #EEF2FF;
}

.subject-text {
	font-size: 12px;
	font-weight: 600;
	color: #4F6EF7;
}

.class-name {
	flex: 1;
	font-size: 16px;
	font-weight: 600;
	color: #1A1A2E;
}

.status-tag {
	background-color: #E8F5E9;
	padding: 3px 10px;
	border-radius: 10px;
	flex-shrink: 0;
}

.status-text {
	font-size: 11px;
	color: #34C759;
	font-weight: 500;
}

.card-body {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.info-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.info-label {
	font-size: 13px;
	color: #9CA3AF;
}

.info-value {
	font-size: 13px;
	color: #1A1A2E;
	font-weight: 500;
}

/* 骨架屏 */
.skeleton-card {
	background-color: #FFFFFF;
	border-radius: 16px;
	padding: 18px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
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
	gap: 12px;
	padding: 60px 40px;
	background-color: #FFFFFF;
	border-radius: 16px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
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
