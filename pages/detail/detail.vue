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
					<text class="info-label">班级</text>
					<text class="info-value">{{ assignment.className }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">截止时间</text>
					<text class="info-value">{{ assignment.deadline }}</text>
				</view>
				<view class="info-item" v-if="assignment.totalScore != null">
					<text class="info-label">总分</text>
					<text class="info-value score-pass">{{ assignment.totalScore }} 分</text>
				</view>
			</view>
		</view>

		<!-- 题目列表（未提交状态） -->
		<view class="content-card" v-if="!isSubmitted && questions.length > 0">
			<view class="section-header">
				<view class="section-dot"></view>
				<text class="section-title">作业题目</text>
			</view>
			
			<view class="question-item" v-for="(question, index) in questions" :key="'q-' + question.id">
				<view class="question-header">
					<text class="question-number">第 {{ index + 1 }} 题</text>
				</view>
				<text class="question-content">{{ question.content }}</text>
				
				<view class="options-list" v-if="question.options">
					<view 
						class="option-item" 
						v-for="(value, key) in question.options" 
						:key="key"
						:class="{ selected: answers[question.id] === key }"
						@click="selectAnswer(question.id, key)"
					>
						<view class="option-radio">
							<view class="radio-dot" v-if="answers[question.id] === key"></view>
						</view>
						<text class="option-text">{{ key }}. {{ value }}</text>
					</view>
				</view>
				
				<view class="answer-input-box">
					<textarea 
						class="answer-textarea" 
						:value="answerContents[question.id] || ''"
						@input="updateAnswerContent(question.id, $event)"
						placeholder="请输入详细解答过程..."
						:maxlength="500"
						:data-question-id="question.id"
					></textarea>
				</view>
			</view>
		</view>

		<!-- 批改结果（已提交状态） -->
		<view class="content-card" v-if="isSubmitted && results.length > 0">
			<view class="section-header">
				<view class="section-dot done"></view>
				<text class="section-title">批改结果</text>
			</view>
			
			<view class="result-item" v-for="(result, index) in results" :key="result.submissionDetailId">
				<view class="result-header">
					<text class="question-number">第 {{ result.questionOrder }} 题</text>
					<view class="result-status" :class="getResultStatusClass(result)">
						{{ getResultStatusText(result) }}
					</view>
				</view>
				
				<text class="question-content">{{ result.content }}</text>
				
				<view class="options-list" v-if="result.options">
					<view 
						class="option-item readonly" 
						v-for="(value, key) in result.options" 
						:key="key"
					>
						<text class="option-text">{{ key }}. {{ value }}</text>
					</view>
				</view>
				
				<!-- AI评分 -->
				<view class="score-box ai" v-if="result.aiScore != null">
					<view class="score-header">
						<text class="score-label">AI评分</text>
						<text class="score-value">{{ result.aiScore }} 分</text>
					</view>
					<text class="score-comment" v-if="result.aiComment">{{ result.aiComment }}</text>
				</view>
				
				<!-- 教师评分 -->
				<view class="score-box teacher" v-if="result.teacherScore != null">
					<view class="score-header">
						<text class="score-label">教师评分</text>
						<text class="score-value">{{ result.teacherScore }} 分</text>
					</view>
					<text class="score-comment" v-if="result.teacherComment">{{ result.teacherComment }}</text>
				</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view class="empty" v-if="!isSubmitted && questions.length === 0">
			<text class="empty-text">暂无题目</text>
		</view>

		<!-- 操作按钮 -->
		<view class="action-spacer"></view>
		<view class="action-bar">
			<view v-if="!isSubmitted" class="action-btn primary" @click="submitAssignment">
				<text class="btn-text">提交作业</text>
			</view>
			<view v-else class="action-btn outline" @click="goBack">
				<text class="btn-text">返回</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				assignmentId: '',
				studentId: '',
				isSubmitted: false,
				assignment: {
					title: '加载中...',
					className: '',
					deadline: '',
					status: 'pending',
					statusText: '待提交',
					totalScore: null
				},
				questions: [],
				answers: {}, // { questionId: 'A' }
				answerContents: {}, // { questionId: '答案内容' }
				results: []
			}
		},
		onLoad(options) {
			if (options.id) {
				this.assignmentId = options.id
				this.studentId = uni.getStorageSync('userId')
				this.loadAssignmentInfo()
			}
		},
		methods: {
			// 加载作业信息（从首页传递或重新获取）
			loadAssignmentInfo() {
				const that = this
				const token = uni.getStorageSync('token')
				const BASE_URL = 'http://192.168.190.160:8080'
				
				// 先获取所有作业，找到当前作业的提交状态
				uni.request({
					url: BASE_URL + '/api/student/allWork',
					method: 'GET',
					data: { studentId: that.studentId },
					header: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
					success: function(res) {
						if (res.statusCode === 200 && res.data.code === 200) {
							const currentAssignment = res.data.data.find(function(item) {
								return item.assignmentId == that.assignmentId
							})
							
							if (currentAssignment) {
								that.assignment = {
									title: currentAssignment.title,
									className: currentAssignment.className,
									deadline: currentAssignment.deadline || '未设置',
									status: currentAssignment.isSubmitted === 1 ? 'submitted' : 'pending',
									statusText: currentAssignment.isSubmitted === 1 ? '已提交' : '待提交',
									totalScore: currentAssignment.totalScore
								}
								that.isSubmitted = currentAssignment.isSubmitted === 1
								
								// 根据提交状态加载不同内容
								if (that.isSubmitted) {
									that.loadGradingResult()
								} else {
									that.loadQuestions()
								}
							}
						}
					},
					fail: function(error) {
						console.error('加载作业信息失败:', error)
					}
				})
			},
			
			// 加载题目列表
			loadQuestions() {
				const that = this
				const token = uni.getStorageSync('token')
				const BASE_URL = 'http://192.168.190.160:8080'
				
				console.log('请求题目列表，assignmentId:', that.assignmentId)
				
				uni.request({
					url: BASE_URL + '/api/student/work/' + that.assignmentId,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
					success: function(res) {
						console.log('题目列表完整响应:', res)
						
						if (res.statusCode === 200) {
							if (res.data.code === 200) {
								that.questions = res.data.data
								console.log('题目列表:', that.questions)
								
								// 打印每个题目的 questionId，检查是否唯一
								that.questions.forEach(function(q, index) {
									console.log('题目' + (index + 1) + ' - id:', q.id, 'questionId:', q.questionId)
								})
							} else if (res.data.code === 404) {
								console.error('接口不存在:', res.data.message)
								uni.showModal({
									title: '提示',
									content: '该接口暂未实现或路径错误：' + res.data.message,
									showCancel: false
								})
							} else {
								uni.showToast({
									title: res.data.message || '加载题目失败',
									icon: 'none'
								})
							}
						} else {
							uni.showToast({
								title: '服务器错误',
								icon: 'none'
							})
						}
					},
					fail: function(error) {
						console.error('加载题目失败:', error)
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					}
				})
			},
			
			// 加载批改结果
			loadGradingResult() {
				const that = this
				const token = uni.getStorageSync('token')
				const BASE_URL = 'http://192.168.190.160:8080'
				
				uni.request({
					url: BASE_URL + '/api/students/result',
					method: 'GET',
					data: {
						assignmentId: that.assignmentId,
						studentId: that.studentId
					},
					header: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
					success: function(res) {
						console.log('批改结果响应:', res)
						
						if (res.statusCode === 200 && res.data.code === 200) {
							that.results = res.data.data
							console.log('批改结果:', that.results)
						} else {
							uni.showToast({
								title: '加载结果失败',
								icon: 'none'
							})
						}
					},
					fail: function(error) {
						console.error('加载批改结果失败:', error)
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					}
				})
			},
			
			// 选择答案
			selectAnswer(id, option) {
				this.answers[id] = option
				this.$forceUpdate()
			},
			
			// 更新答案内容
			updateAnswerContent(id, event) {
				const value = event.detail.value
				this.$set(this.answerContents, id, value)
				console.log('更新答案内容，题目id:', id, 'value:', value)
				console.log('当前所有答案内容:', this.answerContents)
			},
			
			// 提交作业
			submitAssignment() {
				const that = this
				
				console.log('=== 开始检查作业完成情况 ===')
				console.log('题目列表:', that.questions)
				console.log('当前answers:', that.answers)
				console.log('当前answerContents:', that.answerContents)
				
				// 检查是否所有题目都已作答（只检查答案内容，不检查选项）
				const unansweredQuestions = []
				that.questions.forEach(function(q) {
					console.log('检查题目 id=' + q.id + ':')
					
					// 如果有选项，检查是否选择了选项
					const hasOptions = q.options && Object.keys(q.options).length > 0
					const hasAnswer = that.answers[q.id]
					const hasContent = that.answerContents[q.id] && that.answerContents[q.id].trim() !== ''
					
					console.log('  - hasOptions:', hasOptions)
					console.log('  - hasAnswer:', hasAnswer)
					console.log('  - hasContent:', hasContent)
					console.log('  - answerContents[' + q.id + ']:', that.answerContents[q.id])
					
					// 有选项的题目需要选择选项，所有题目都需要填写内容
					if (hasOptions && !hasAnswer) {
						console.log('  - 未选择选项，加入未完成列表')
						unansweredQuestions.push(q)
					} else if (!hasContent) {
						console.log('  - 未填写内容，加入未完成列表')
						unansweredQuestions.push(q)
					} else {
						console.log('  - 已完成')
					}
				})
				
				console.log('未完成的题目数量:', unansweredQuestions.length)
				console.log('未完成的题目:', unansweredQuestions)
				
				if (unansweredQuestions.length > 0) {
					uni.showModal({
						title: '提示',
						content: '还有 ' + unansweredQuestions.length + ' 道题未完成，确定要提交吗？',
						success: function(res) {
							if (res.confirm) {
								that.doSubmit()
							}
						}
					})
					return
				}
				
				that.doSubmit()
			},
			
			// 执行提交
			doSubmit() {
				const that = this
				const token = uni.getStorageSync('token')
				const BASE_URL = 'http://192.168.190.160:8080'
				
				// 构建提交数据 - 使用 questionId 而不是 id
				const details = []
				that.questions.forEach(function(q) {
					details.push({
						questionId: q.questionId,  // 后端需要的是 questionId
						answer: that.answers[q.id] || '',  // 但我们用 id 来存储答案
						answerContent: that.answerContents[q.id] || ''
					})
				})
				
				const submitData = {
					assignmentId: parseInt(that.assignmentId),
					studentId: parseInt(that.studentId),
					details: details
				}
				
				console.log('提交数据:', submitData)
				
				uni.showLoading({
					title: '提交中...'
				})
				
				uni.request({
					url: BASE_URL + '/api/student/submissions',
					method: 'POST',
					data: submitData,
					header: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
					success: function(res) {
						uni.hideLoading()
						console.log('提交响应:', res)
						
						if (res.statusCode === 200 && res.data.code === 200) {
							uni.showToast({
								title: '提交成功',
								icon: 'success'
							})
							
							// 延迟返回上一页
							setTimeout(function() {
								uni.navigateBack()
							}, 1500)
						} else {
							uni.showToast({
								title: res.data.message || '提交失败',
								icon: 'none'
							})
						}
					},
					fail: function(error) {
						uni.hideLoading()
						console.error('提交失败:', error)
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					}
				})
			},
			
			// 获取结果状态样式
			getResultStatusClass(result) {
				if (result.teacherScore != null) {
					return 'teacher-graded'
				} else if (result.aiScore != null) {
					return 'ai-graded'
				}
				return 'pending'
			},
			
			// 获取结果状态文本
			getResultStatusText(result) {
				if (result.teacherScore != null) {
					return '教师已批改'
				} else if (result.aiScore != null) {
					return 'AI已批改'
				}
				return '待批改'
			},
			
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
	.page {
		min-height: 100vh;
		background-color: #F8F9FA;
		padding: 16px;
		padding-bottom: 80px;
	}

	/* 作业信息 */
	.detail-card {
		background-color: #FFFFFF;
		border-radius: 16px;
		padding: 20px;
		margin-bottom: 14px;
		border: 1px solid #F0F0F0;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 18px;
		padding-bottom: 16px;
		border-bottom: 1px solid #F5F6F7;
	}

	.card-title {
		font-size: 18px;
		font-weight: 700;
		color: #333333;
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
		background-color: #FFF8F0;
	}

	.status-tag.submitted {
		color: #34C759;
		background-color: #F0F9F3;
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
		color: #999999;
	}

	.info-value {
		font-size: 15px;
		color: #333333;
		font-weight: 500;
	}

	.info-value.score-pass {
		color: #34C759;
		font-weight: 700;
	}

	/* 内容卡片 */
	.content-card {
		background-color: #FFFFFF;
		border-radius: 16px;
		padding: 20px;
		margin-bottom: 14px;
		border: 1px solid #F0F0F0;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 16px;
	}

	.section-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #4F6EF7;
	}

	.section-dot.done {
		background-color: #34C759;
	}

	.section-title {
		font-size: 16px;
		font-weight: 600;
		color: #333333;
	}

	/* 题目列表 */
	.question-item {
		padding: 16px 0;
		border-bottom: 1px solid #F5F6F7;
	}

	.question-item:last-child {
		border-bottom: none;
	}

	.question-header {
		margin-bottom: 10px;
	}

	.question-number {
		font-size: 14px;
		font-weight: 600;
		color: #4F6EF7;
	}

	.question-content {
		font-size: 15px;
		color: #333333;
		line-height: 1.6;
		display: block;
		margin-bottom: 12px;
	}

	/* 选项列表 */
	.options-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 12px;
	}

	.option-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 12px;
		background-color: #F8F9FA;
		border-radius: 10px;
		border: 1px solid #F0F0F0;
		transition: all 0.2s;
	}

	.option-item.selected {
		background-color: #EEF1FE;
		border-color: #4F6EF7;
	}

	.option-item.readonly {
		background-color: #FAFAFA;
	}

	.option-radio {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 2px solid #D1D5DB;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.option-item.selected .option-radio {
		border-color: #4F6EF7;
	}

	.radio-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #4F6EF7;
	}

	.option-text {
		font-size: 14px;
		color: #333333;
		line-height: 1.5;
		flex: 1;
	}

	/* 答案输入框 */
	.answer-input-box {
		margin-top: 12px;
	}

	.answer-textarea {
		width: 100%;
		min-height: 100px;
		padding: 12px;
		background-color: #F8F9FA;
		border: 1px solid #E5E7EB;
		border-radius: 10px;
		font-size: 14px;
		color: #333333;
		line-height: 1.6;
		box-sizing: border-box;
	}

	/* 批改结果 */
	.result-item {
		padding: 16px 0;
		border-bottom: 1px solid #F5F6F7;
	}

	.result-item:last-child {
		border-bottom: none;
	}

	.result-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.result-status {
		font-size: 12px;
		padding: 4px 10px;
		border-radius: 8px;
		font-weight: 500;
	}

	.result-status.ai-graded {
		color: #4F6EF7;
		background-color: #EEF1FE;
	}

	.result-status.teacher-graded {
		color: #34C759;
		background-color: #F0F9F3;
	}

	.result-status.pending {
		color: #999999;
		background-color: #F5F6F7;
	}

	/* 评分框 */
	.score-box {
		margin-top: 12px;
		padding: 12px;
		border-radius: 10px;
		border-left: 3px solid;
	}

	.score-box.ai {
		background-color: #F8F9FF;
		border-color: #4F6EF7;
	}

	.score-box.teacher {
		background-color: #F8FCF9;
		border-color: #34C759;
	}

	.score-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 6px;
	}

	.score-label {
		font-size: 13px;
		font-weight: 600;
		color: #666666;
	}

	.score-value {
		font-size: 16px;
		font-weight: 700;
		color: #4F6EF7;
	}

	.score-box.teacher .score-value {
		color: #34C759;
	}

	.score-comment {
		font-size: 14px;
		color: #666666;
		line-height: 1.5;
		display: block;
	}

	/* 空状态 */
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 80px 0;
	}

	.empty-text {
		font-size: 15px;
		color: #CCCCCC;
	}

	/* 操作栏 */
	.action-spacer {
		height: 20px;
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
		border: 1px solid #E5E7EB;
	}

	.action-btn.outline .btn-text {
		color: #666666;
		font-weight: 500;
	}

	.btn-text {
		font-size: 16px;
		color: #FFFFFF;
		font-weight: 600;
	}
</style>
