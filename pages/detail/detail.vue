<template>
	<view class="page">
		<!-- 作业信息 -->
		<view class="detail-card">
			<view class="card-header">
				<text class="card-title">{{ assignment.title }}</text>
				<view class="status-tag" :class="assignment.status">
					{{ assignment.statusText }}
				</view>
			</view>

			<view class="info-grid">
				<view class="info-item">
					<text class="info-label">科目</text>
					<text class="info-value">{{ assignment.subject }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">截止时间</text>
					<text class="info-value">{{ assignment.deadline }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">发布老师</text>
					<text class="info-value">{{ assignment.teacher }}</text>
				</view>
				<view class="info-item" v-if="assignment.score != null">
					<text class="info-label">成绩</text>
					<text class="info-value" :class="assignment.score >= 60 ? 'score-pass' : 'score-fail'">{{ assignment.score }} 分</text>
				</view>
			</view>
		</view>

		<!-- 作业内容 -->
		<view class="content-card">
			<view class="section-header">
				<view class="section-dot"></view>
				<text class="section-title">作业内容</text>
			</view>
			<view class="content-text">
				{{ assignment.content }}
			</view>
		</view>

		<!-- 我的作答 -->
		<view class="content-card" v-if="assignment.myAnswer">
			<view class="section-header">
				<view class="section-dot done"></view>
				<text class="section-title">我的作答</text>
			</view>
			<view class="answer-box">
				{{ assignment.myAnswer }}
			</view>
		</view>

		<!-- 老师评语 -->
		<view class="content-card" v-if="assignment.comment">
			<view class="section-header">
				<view class="section-dot comment"></view>
				<text class="section-title">老师评语</text>
			</view>
			<view class="comment-box">
				{{ assignment.comment }}
			</view>
		</view>

		<!-- 操作按钮 -->
		<view class="action-spacer"></view>
		<view class="action-bar">
			<view v-if="assignment.status === 'pending'" class="action-btn primary" @click="goToSubmit">
				<text class="btn-text">提交作业</text>
			</view>
			<view v-else class="action-btn outline" @click="goToSubmit">
				<text class="btn-text">修改作业</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				assignmentId: '',
				assignment: {
					id: 1,
					title: '加载中...',
					subject: '',
					deadline: '',
					teacher: '',
					status: 'pending',
					statusText: '待提交',
					content: '',
					myAnswer: '',
					comment: '',
					score: null
				}
			}
		},
		onLoad(options) {
			if (options.id) {
				this.assignmentId = options.id
				this.loadAssignmentDetail()
			}
		},
		methods: {
			// 加载作业详情
			loadAssignmentDetail() {
				const that = this
				const { getAssignmentDetail } = require('../../api/student.js')
				
				getAssignmentDetail(this.assignmentId).then(result => {
					if (result.code === 200 && result.data.length > 0) {
						// 将题目列表转换为作业内容
						const questions = result.data
						let content = ''
						questions.forEach((q, index) => {
							content += `${index + 1}. ${q.content}\n`
							if (q.options) {
								Object.keys(q.options).forEach(key => {
									content += `${key}. ${q.options[key]}\n`
								})
							}
							content += '\n'
						})
						
						that.assignment.content = content
					}
				}).catch(error => {
					console.error('加载作业详情失败:', error)
					uni.showToast({
						title: '加载失败',
						icon: 'none'
					})
				})
			},
			
			goToSubmit() {
				uni.navigateTo({
					url: `/pages/grading/grading?id=${this.assignmentId}`
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		min-height: 100vh;
		background-color: #F2F3F7;
		padding: 16px;
	}

	/* 作业信息 */
	.detail-card {
		background-color: #FFFFFF;
		border-radius: 16px;
		padding: 20px;
		margin-bottom: 14px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 18px;
		padding-bottom: 16px;
		border-bottom: 1px solid #F3F4F6;
	}

	.card-title {
		font-size: 18px;
		font-weight: 700;
		color: #1A1A2E;
		flex: 1;
	}

	.status-tag {
		font-size: 12px;
		padding: 4px 12px;
		border-radius: 10px;
		font-weight: 500;
	}

	.status-tag.pending {
		color: #FF9500;
		background-color: #FFF3E0;
	}

	.status-tag.submitted {
		color: #4F6EF7;
		background-color: #EEF1FE;
	}

	.status-tag.graded {
		color: #34C759;
		background-color: #E8F8ED;
	}

	.info-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
	}

	.info-item {
		width: calc(50% - 7px);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.info-label {
		font-size: 12px;
		color: #9CA3AF;
	}

	.info-value {
		font-size: 15px;
		color: #1A1A2E;
		font-weight: 500;
	}

	.info-value.score-pass {
		color: #34C759;
		font-weight: 700;
	}

	.info-value.score-fail {
		color: #FF3B30;
		font-weight: 700;
	}

	/* 内容卡片 */
	.content-card {
		background-color: #FFFFFF;
		border-radius: 16px;
		padding: 20px;
		margin-bottom: 14px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 14px;
	}

	.section-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #4F6EF7;
	}

	.section-dot.done {
		background-color: #FF9500;
	}

	.section-dot.comment {
		background-color: #34C759;
	}

	.section-title {
		font-size: 16px;
		font-weight: 600;
		color: #1A1A2E;
	}

	.content-text {
		font-size: 15px;
		color: #6B7280;
		line-height: 1.9;
		white-space: pre-wrap;
	}

	.answer-box {
		font-size: 15px;
		color: #6B7280;
		line-height: 1.9;
		white-space: pre-wrap;
		padding: 14px;
		background-color: #FFF8EC;
		border-radius: 10px;
		border-left: 3px solid #FF9500;
	}

	.comment-box {
		font-size: 15px;
		color: #6B7280;
		line-height: 1.8;
		padding: 14px;
		background-color: #F8FCF9;
		border-radius: 10px;
		border-left: 3px solid #34C759;
	}

	/* 操作栏 */
	.action-spacer {
		height: 80px;
	}

	.action-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 12px 16px;
		padding-bottom: calc(12px + env(safe-area-inset-bottom));
		background-color: #FFFFFF;
		box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
	}

	.action-btn {
		width: 100%;
		height: 48px;
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action-btn.primary {
		background-color: #4F6EF7;
		box-shadow: 0 4px 14px rgba(79, 110, 247, 0.3);
	}

	.action-btn.outline {
		background-color: #FFFFFF;
		border: 1px solid #4F6EF7;
	}

	.action-btn.outline .btn-text {
		color: #4F6EF7;
		font-weight: 600;
	}

	.btn-text {
		font-size: 16px;
		color: #FFFFFF;
		font-weight: 600;
	}
</style>
