<template>
	<view class="page">
		<!-- 学生信息 -->
		<view class="info-card">
			<view class="info-bar"></view>
			<view class="info-body">
				<text class="student-name">{{ assignment.studentName }}</text>
				<text class="assignment-title">{{ assignment.title }}</text>
			</view>
		</view>

		<!-- 作业内容预览 -->
		<view class="content-card">
			<view class="section-header">
				<view class="section-dot"></view>
				<text class="section-title">作业内容</text>
			</view>
			<view class="content-preview">
				{{ assignment.content }}
			</view>
		</view>

		<!-- 评分 -->
		<view class="content-card">
			<view class="section-header">
				<view class="section-dot"></view>
				<text class="section-title">评分</text>
			</view>
			<view class="score-input-wrapper">
				<input class="score-input" type="digit" v-model="score" placeholder="请输入分数" />
				<text class="score-unit">分</text>
			</view>
		</view>

		<!-- 批改意见 -->
		<view class="content-card">
			<view class="section-header">
				<view class="section-dot"></view>
				<text class="section-title">批改意见</text>
			</view>
			<textarea class="comment-input" v-model="comment" placeholder="请输入批改意见..." maxlength="500" />
			<view class="char-count">{{ comment.length }}/500</view>
		</view>

		<!-- 快捷评语 -->
		<view class="content-card">
			<view class="section-header">
				<view class="section-dot"></view>
				<text class="section-title">快捷评语</text>
			</view>
			<view class="quick-comments">
				<view
					class="comment-tag"
					v-for="(tag, index) in quickComments"
					:key="index"
					@click="addQuickComment(tag)"
				>
					{{ tag }}
				</view>
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="submit-section">
			<view class="action-btn cancel" @click="cancel">
				<text class="btn-label">取消</text>
			</view>
			<view class="action-btn primary" @click="submit">
				<text class="btn-label white">提交批改</text>
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
		background-color: #F2F3F7;
		padding: 16px 16px 40px;
	}

	/* 学生信息 */
	.info-card {
		display: flex;
		background-color: #FFFFFF;
		border-radius: 14px;
		margin-bottom: 14px;
		overflow: hidden;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	}

	.info-bar {
		width: 4px;
		flex-shrink: 0;
		background: linear-gradient(180deg, #4F6EF7, #7B8FF7);
		border-radius: 2px;
	}

	.info-body {
		flex: 1;
		padding: 18px 20px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.student-name {
		font-size: 20px;
		font-weight: 700;
		color: #1A1A2E;
	}

	.assignment-title {
		font-size: 14px;
		color: #6B7280;
	}

	/* 内容卡片 */
	.content-card {
		background-color: #FFFFFF;
		border-radius: 14px;
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

	.section-title {
		font-size: 16px;
		font-weight: 600;
		color: #1A1A2E;
	}

	.content-preview {
		font-size: 15px;
		color: #6B7280;
		line-height: 1.9;
		white-space: pre-wrap;
		max-height: 160px;
		overflow-y: auto;
	}

	/* 评分输入 */
	.score-input-wrapper {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.score-input {
		flex: 1;
		height: 48px;
		padding: 0 16px;
		font-size: 16px;
		background-color: #F8F9FC;
		border: 1px solid #E5E7EB;
		border-radius: 10px;
	}

	.score-unit {
		font-size: 15px;
		color: #6B7280;
		font-weight: 500;
	}

	/* 评语输入 */
	.comment-input {
		width: 100%;
		min-height: 120px;
		padding: 14px;
		font-size: 15px;
		background-color: #F8F9FC;
		border: 1px solid #E5E7EB;
		border-radius: 10px;
		box-sizing: border-box;
		color: #1A1A2E;
	}

	.char-count {
		text-align: right;
		font-size: 12px;
		color: #9CA3AF;
		margin-top: 8px;
	}

	/* 快捷评语 */
	.quick-comments {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.comment-tag {
		padding: 8px 16px;
		background-color: #F2F3F7;
		border-radius: 8px;
		font-size: 13px;
		color: #6B7280;
		transition: all 0.2s ease;
	}

	.comment-tag:active {
		background-color: #4F6EF7;
		color: #FFFFFF;
	}

	/* 提交按钮 */
	.submit-section {
		display: flex;
		gap: 14px;
		margin-top: 6px;
	}

	.action-btn {
		flex: 1;
		height: 48px;
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action-btn.cancel {
		background-color: #FFFFFF;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}

	.action-btn.primary {
		background-color: #4F6EF7;
		box-shadow: 0 4px 14px rgba(79, 110, 247, 0.3);
	}

	.btn-label {
		font-size: 16px;
		color: #6B7280;
		font-weight: 500;
	}

	.btn-label.white {
		color: #FFFFFF;
		font-weight: 600;
	}
</style>
