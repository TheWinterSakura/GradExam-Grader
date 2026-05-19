<template>
	<view class="page">
		<!-- 加载中 -->
		<view v-if="loading" class="loading-wrap">
			<view class="skeleton-row skeleton-row-1"></view>
			<view class="skeleton-row skeleton-row-2"></view>
			<view class="skeleton-row skeleton-row-3"></view>
		</view>

		<!-- 题目列表 -->
		<view v-else-if="questions.length > 0">
			<view class="question-card" v-for="(item, index) in questions" :key="item.id">
				<view class="question-header">
					<view class="question-num">{{ index + 1 }}</view>
					<text class="question-content">{{ item.content }}</text>
				</view>

				<view class="question-meta">
					<view class="type-tag">{{ item.type === 0 ? '选择题' : '主观题' }}</view>
					<text class="score-text">{{ item.score }} 分</text>
				</view>

				<view class="options-list" v-if="item.options">
					<view 
						class="option-item" 
						v-for="(value, key) in item.options" 
						:key="key"
					>
						<text class="option-key">{{ key }}</text>
						<text class="option-value">{{ value }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view v-else class="empty">
			<uni-icons type="info" :size="48" color="#D1D5DB"></uni-icons>
			<text class="empty-text">暂无题目</text>
		</view>
	</view>
</template>

<script>
import { getAssignmentDetail } from '@/api/student.js'

export default {
	data() {
		return {
			loading: true,
			assignmentId: '',
			questions: []
		}
	},
	onLoad(options) {
		if (options.id) {
			this.assignmentId = options.id
			this.loadDetail()
		} else {
			this.loading = false
		}
	},
	methods: {
		async loadDetail() {
			this.loading = true
			try {
				const res = await getAssignmentDetail(this.assignmentId)
				if (res.code === 200 && res.data) {
					this.questions = res.data
				}
			} catch (error) {
				console.error('加载作业详情失败:', error)
				uni.showToast({ title: '加载失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		}
	}
}
</script>

<style scoped>
.page {
	min-height: 100vh;
	background-color: #EEF2FF;
	padding: 16px;
	padding-bottom: 40px;
}

/* 题目卡片 */
.question-card {
	background-color: #FFFFFF;
	border-radius: 14px;
	padding: 18px;
	margin-bottom: 12px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.question-header {
	display: flex;
	align-items: flex-start;
	gap: 12px;
	margin-bottom: 14px;
}

.question-num {
	width: 26px;
	height: 26px;
	border-radius: 50%;
	background-color: #4F6EF7;
	color: #FFFFFF;
	font-size: 13px;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.question-content {
	font-size: 15px;
	color: #1A1A2E;
	line-height: 1.6;
	flex: 1;
}

/* 题目元信息 */
.question-meta {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 14px;
	padding-left: 38px;
}

.type-tag {
	font-size: 12px;
	padding: 3px 10px;
	border-radius: 8px;
	background-color: #EEF2FF;
	color: #4F6EF7;
	font-weight: 500;
}

.score-text {
	font-size: 12px;
	color: #9CA3AF;
}

/* 选项 */
.options-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding-left: 38px;
}

.option-item {
	display: flex;
	align-items: flex-start;
	gap: 8px;
	padding: 10px 14px;
	background-color: #F9FAFB;
	border-radius: 10px;
}

.option-key {
	font-size: 14px;
	font-weight: 600;
	color: #4F6EF7;
	flex-shrink: 0;
}

.option-value {
	font-size: 14px;
	color: #374151;
	line-height: 1.5;
}

/* 骨架屏 */
.loading-wrap {
	background-color: #FFFFFF;
	border-radius: 14px;
	padding: 18px;
}

.skeleton-row {
	height: 14px;
	background: linear-gradient(90deg, #F3F4F6 0%, #E5E7EB 50%, #F3F4F6 100%);
	border-radius: 7px;
	margin-bottom: 12px;
	animation: skeleton 1.4s ease infinite;
}

.skeleton-row-1 { width: 70%; height: 18px; }
.skeleton-row-2 { width: 90%; }
.skeleton-row-3 { width: 50%; }

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
	padding: 80px 0;
}

.empty-text {
	font-size: 15px;
	color: #9CA3AF;
}
</style>
