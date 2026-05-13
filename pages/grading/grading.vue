<template>
	<view class="page">
		<!-- 作业信息头 -->
		<view class="info-card">
			<view class="info-bar"></view>
			<view class="info-body">
				<text class="assignment-title">{{ assignment.title }}</text>
				<text class="assignment-meta">{{ assignment.subject }} · {{ assignment.deadline }}</text>
			</view>
		</view>

		<!-- 作业要求 -->
		<view class="content-card">
			<view class="section-header">
				<view class="section-dot"></view>
				<text class="section-title">作业要求</text>
			</view>
			<view class="content-preview">
				{{ assignment.requirement }}
			</view>
		</view>

		<!-- 我的作答 -->
		<view class="content-card">
			<view class="section-header">
				<view class="section-dot"></view>
				<text class="section-title">我的作答</text>
			</view>
			<textarea class="answer-input" v-model="answer" placeholder="请输入你的作答内容..." maxlength="2000" />
			<view class="char-count">{{ answer.length }}/2000</view>
		</view>

		<!-- 附件上传 -->
		<view class="content-card">
			<view class="section-header">
				<view class="section-dot"></view>
				<text class="section-title">附件（可选）</text>
			</view>
			<view class="upload-area" @click="uploadFile">
				<uni-icons type="plusempty" :size="28" color="#D1D5DB"></uni-icons>
				<text class="upload-text">点击上传文件</text>
			</view>
			<view class="file-list" v-if="files.length > 0">
				<view class="file-item" v-for="(file, index) in files" :key="index">
					<uni-icons type="paperclip" :size="16" color="#4F6EF7"></uni-icons>
					<text class="file-name">{{ file.name }}</text>
					<text class="file-del" @click="removeFile(index)">删除</text>
				</view>
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="submit-section">
			<view class="action-btn cancel" @click="cancel">
				<text class="btn-label">取消</text>
			</view>
			<view class="action-btn primary" @click="submit">
				<text class="btn-label white">提交作业</text>
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
					title: '高等数学第一章习题',
					subject: '数学',
					deadline: '2024-01-20 23:59',
					requirement: '1. 求函数 f(x) = x² + 2x + 1 的导数\n2. 计算极限 lim(x→0) (sin x)/x\n3. 求不定积分 ∫x²dx\n请写出完整的解题过程，并拍照上传。'
				},
				answer: '',
				files: []
			}
		},
		onLoad(options) {
			if (options.id) {
				this.assignmentId = options.id
			}
		},
		methods: {
			uploadFile() {
				uni.showToast({
					title: '文件上传功能开发中',
					icon: 'none'
				})
			},
			removeFile(index) {
				this.files.splice(index, 1)
			},
			cancel() {
				uni.navigateBack()
			},
			submit() {
				if (!this.answer.trim()) {
					uni.showToast({
						title: '请输入作答内容',
						icon: 'none'
					})
					return
				}

				uni.showModal({
					title: '提示',
					content: '确认提交作业？',
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

	/* 作业信息 */
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

	.assignment-title {
		font-size: 18px;
		font-weight: 700;
		color: #1A1A2E;
	}

	.assignment-meta {
		font-size: 13px;
		color: #9CA3AF;
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
	}

	/* 作答输入 */
	.answer-input {
		width: 100%;
		min-height: 160px;
		padding: 14px;
		font-size: 15px;
		background-color: #F8F9FC;
		border: 1px solid #E5E7EB;
		border-radius: 10px;
		box-sizing: border-box;
		color: #1A1A2E;
		line-height: 1.7;
	}

	.char-count {
		text-align: right;
		font-size: 12px;
		color: #9CA3AF;
		margin-top: 8px;
	}

	/* 上传 */
	.upload-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 24px;
		border: 1px dashed #E5E7EB;
		border-radius: 10px;
		background-color: #F8F9FC;
	}

	.upload-text {
		font-size: 14px;
		color: #9CA3AF;
	}

	.file-list {
		margin-top: 12px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.file-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		background-color: #F8F9FC;
		border-radius: 8px;
	}

	.file-name {
		flex: 1;
		font-size: 14px;
		color: #1A1A2E;
	}

	.file-del {
		font-size: 13px;
		color: #FF3B30;
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
