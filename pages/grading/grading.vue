<template>
	<view class="page">
		<!-- 学生信息 -->
		<view class="info-card">
			<text class="student-name">{{ assignment.studentName }}</text>
			<text class="assignment-title">{{ assignment.title }}</text>
		</view>

		<!-- 作业内容预览 -->
		<view class="content-card">
			<view class="section-title">作业内容</view>
			<view class="content-preview">
				{{ assignment.content }}
			</view>
		</view>

		<!-- 评分 -->
		<view class="grading-card">
			<view class="section-title">评分</view>
			<view class="score-input-wrapper">
				<input class="score-input" type="digit" v-model="score" placeholder="请输入分数" />
				<text class="score-unit">分</text>
			</view>
		</view>

		<!-- 批改意见 -->
		<view class="grading-card">
			<view class="section-title">批改意见</view>
			<textarea class="comment-input" v-model="comment" placeholder="请输入批改意见..." maxlength="500" />
			<view class="char-count">{{ comment.length }}/500</view>
		</view>

		<!-- 快捷评语 -->
		<view class="grading-card">
			<view class="section-title">快捷评语</view>
			<view class="quick-comments">
				<view class="comment-tag" v-for="(tag, index) in quickComments" :key="index" @click="addQuickComment(tag)">
					{{ tag }}
				</view>
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="action-bar">
			<button class="action-btn cancel" @click="cancel">取消</button>
			<button class="action-btn primary" @click="submit">提交批改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				assignmentId: '',
				assignment: {
					studentName: '张三',
					title: '高等数学第一章习题',
					content: '1. 求函数 f(x) = x² + 2x + 1 的导数\n2. 计算极限 lim(x→0) (sin x)/x\n3. 求不定积分 ∫x²dx'
				},
				score: '',
				comment: '',
				quickComments: [
					'解题思路清晰',
					'计算准确',
					'需要加强基础',
					'步骤完整',
					'有待提高',
					'优秀',
					'格式规范',
					'注意细节'
				]
			}
		},
		onLoad(options) {
			if (options.id) {
				this.assignmentId = options.id
			}
		},
		methods: {
			addQuickComment(tag) {
				if (this.comment) {
					this.comment += '；' + tag
				} else {
					this.comment = tag
				}
			},
			cancel() {
				uni.navigateBack()
			},
			submit() {
				if (!this.score) {
					uni.showToast({
						title: '请输入分数',
						icon: 'none'
					})
					return
				}
				if (!this.comment) {
					uni.showToast({
						title: '请输入批改意见',
						icon: 'none'
					})
					return
				}

				uni.showModal({
					title: '提示',
					content: '确认提交批改结果？',
					success: (res) => {
						if (res.confirm) {
							// 这里提交批改数据
							uni.showToast({
								title: '提交成功',
								icon: 'success'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: 2
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
		background-color: #f5f5f5;
		padding: 30rpx;
		padding-bottom: 150rpx;
	}

	.info-card {
		background-color: #007AFF;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.student-name {
		font-size: 36rpx;
		font-weight: bold;
		color: #fff;
	}

	.assignment-title {
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.9);
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

	.content-preview {
		font-size: 28rpx;
		color: #666;
		line-height: 1.8;
		white-space: pre-wrap;
		max-height: 300rpx;
		overflow-y: auto;
	}

	.grading-card {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
	}

	.score-input-wrapper {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.score-input {
		flex: 1;
		height: 80rpx;
		padding: 0 30rpx;
		font-size: 32rpx;
		border: 2rpx solid #e0e0e0;
		border-radius: 12rpx;
	}

	.score-unit {
		font-size: 28rpx;
		color: #666;
	}

	.comment-input {
		width: 100%;
		min-height: 200rpx;
		padding: 20rpx;
		font-size: 28rpx;
		border: 2rpx solid #e0e0e0;
		border-radius: 12rpx;
		box-sizing: border-box;
	}

	.char-count {
		text-align: right;
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
	}

	.quick-comments {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
	}

	.comment-tag {
		padding: 12rpx 24rpx;
		background-color: #f5f5f5;
		border-radius: 8rpx;
		font-size: 26rpx;
		color: #666;
	}

	.action-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 30rpx;
		background-color: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		display: flex;
		gap: 20rpx;
	}

	.action-btn {
		flex: 1;
		height: 88rpx;
		border-radius: 44rpx;
		font-size: 32rpx;
		border: none;
	}

	.action-btn.cancel {
		background-color: #f5f5f5;
		color: #666;
	}

	.action-btn.primary {
		background-color: #007AFF;
		color: #fff;
	}
</style>
