<template>
	<view class="page">
		<view class="detail-card">
			<view class="card-header">
				<text class="card-title">{{ assignment.title }}</text>
				<uni-badge :text="assignment.statusText" :type="assignment.status === 'completed' ? 'success' : 'warning'"></uni-badge>
			</view>

			<view class="info-section">
				<view class="info-row">
					<text class="label">学生姓名：</text>
					<text class="value">{{ assignment.studentName }}</text>
				</view>
				<view class="info-row">
					<text class="label">科目：</text>
					<text class="value">{{ assignment.subject }}</text>
				</view>
				<view class="info-row">
					<text class="label">提交时间：</text>
					<text class="value">{{ assignment.submitTime }}</text>
				</view>
				<view class="info-row" v-if="assignment.score">
					<text class="label">得分：</text>
					<text class="value score">{{ assignment.score }}</text>
				</view>
			</view>
		</view>

		<!-- 作业内容 -->
		<view class="content-card">
			<view class="section-title">作业内容</view>
			<view class="content-text">
				{{ assignment.content }}
			</view>
		</view>

		<!-- 附件 -->
		<view class="content-card" v-if="assignment.attachments && assignment.attachments.length > 0">
			<view class="section-title">附件</view>
			<view class="attachment-list">
				<view class="attachment-item" v-for="(file, index) in assignment.attachments" :key="index">
					<text class="attachment-name">{{ file.name }}</text>
					<text class="attachment-btn" @click="previewFile(file)">查看</text>
				</view>
			</view>
		</view>

		<!-- 批改意见 -->
		<view class="content-card" v-if="assignment.comment">
			<view class="section-title">批改意见</view>
			<view class="comment-text">
				{{ assignment.comment }}
			</view>
		</view>

		<!-- 操作按钮 -->
		<view class="action-bar" v-if="assignment.status === 'pending'">
			<button class="action-btn primary" @click="goToGrading">开始批改</button>
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
					title: '高等数学第一章习题',
					studentName: '张三',
					subject: '数学',
					submitTime: '2024-01-15 10:30',
					status: 'pending',
					statusText: '待批改',
					content: '1. 求函数 f(x) = x² + 2x + 1 的导数\n2. 计算极限 lim(x→0) (sin x)/x\n3. 求不定积分 ∫x²dx',
					attachments: [
						{ name: '作业答案.pdf', url: '' },
						{ name: '解题过程.jpg', url: '' }
					]
				}
			}
		},
		onLoad(options) {
			if (options.id) {
				this.assignmentId = options.id
				// 这里可以根据id加载具体数据
			}
		},
		methods: {
			previewFile(file) {
				uni.showToast({
					title: '预览文件：' + file.name,
					icon: 'none'
				})
			},
			goToGrading() {
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
		background-color: #f5f5f5;
		padding: 30rpx;
		padding-bottom: 150rpx;
	}

	.detail-card {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.card-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		flex: 1;
	}

	.info-section {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.info-row {
		display: flex;
		font-size: 28rpx;
	}

	.label {
		color: #666;
		width: 180rpx;
	}

	.value {
		color: #333;
		flex: 1;
	}

	.value.score {
		color: #ff6b6b;
		font-weight: bold;
	}

	.content-card {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
	}

	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}

	.content-text {
		font-size: 28rpx;
		color: #666;
		line-height: 1.8;
		white-space: pre-wrap;
	}

	.attachment-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.attachment-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		background-color: #f5f5f5;
		border-radius: 12rpx;
	}

	.attachment-name {
		font-size: 28rpx;
		color: #333;
		flex: 1;
	}

	.attachment-btn {
		font-size: 26rpx;
		color: #007AFF;
	}

	.comment-text {
		font-size: 28rpx;
		color: #666;
		line-height: 1.8;
		padding: 20rpx;
		background-color: #fff9e6;
		border-radius: 12rpx;
		border-left: 4rpx solid #ffc107;
	}

	.action-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 30rpx;
		background-color: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.action-btn {
		width: 100%;
		height: 88rpx;
		border-radius: 44rpx;
		font-size: 32rpx;
		border: none;
	}

	.action-btn.primary {
		background-color: #007AFF;
		color: #fff;
	}
</style>
