<template>
	<view class="page">
		<!-- 筛选栏 -->
		<view class="filter-bar">
			<view
				class="filter-chip"
				:class="{ active: filterStatus === '' }"
				@click="filterStatus = ''"
			>全部</view>
			<view
				class="filter-chip"
				:class="{ active: filterStatus === 'pending' }"
				@click="filterStatus = 'pending'"
			>待完成</view>
			<view
				class="filter-chip"
				:class="{ active: filterStatus === 'completed' }"
				@click="filterStatus = 'completed'"
			>已完成</view>
		</view>

		<!-- 作业列表 -->
		<view class="assignment-list">
			<view
				class="assignment-card"
				:class="{ 'is-completed': item.status === 'completed' }"
				v-for="item in filteredList"
				:key="item.id"
				@click="goToDetail(item)"
			>
				<view class="card-status-bar"></view>
				<view class="card-body">
					<view class="card-row">
						<text class="card-title">{{ item.title }}</text>
						<view class="status-tag" :class="item.status">
							{{ item.statusText }}
						</view>
					</view>
					<view class="card-row meta">
						<view class="meta-item">
							<uni-icons type="person" :size="13" color="#9CA3AF"></uni-icons>
							<text>{{ item.studentName }}</text>
						</view>
						<view class="meta-item">
							<uni-icons type="calendar" :size="13" color="#9CA3AF"></uni-icons>
							<text>{{ item.submitTime }}</text>
						</view>
					</view>
					<view class="card-row footer">
						<text class="subject-tag">{{ item.subject }}</text>
						<text class="score" v-if="item.score">
							<text class="score-num">{{ item.score }}</text>
							<text class="score-label">分</text>
						</text>
					</view>
				</view>
			</view>
		</view>

		<view class="empty" v-if="filteredList.length === 0">
			<text class="empty-text">暂无作业</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				filterStatus: '',
				classId: 1, // 默认班级ID
				assignmentList: []
			}
		},
		computed: {
			filteredList() {
				if (this.filterStatus === '') {
					return this.assignmentList
				}
				return this.assignmentList.filter(item => item.status === this.filterStatus)
			}
		},
		onLoad() {
			this.loadAllWork()
		},
		onPullDownRefresh() {
			console.log('触发下拉刷新')
			this.loadAllWork()
		},
		methods: {
			// 加载学生所有作业
			loadAllWork() {
				const that = this
				const studentId = uni.getStorageSync('userId')
				console.log('获取学生作业，studentId:', studentId)
				
				if (!studentId) {
					console.error('未找到userId，请先登录')
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					uni.stopPullDownRefresh()
					return
				}
				
				// 直接调用接口
				uni.request({
					url: 'http://192.168.190.160:8080/api/student/allWork',
					method: 'GET',
					data: { studentId: studentId },
					header: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success: function(res) {
						console.log('getAllWork 返回结果:', res)
						
						if (res.statusCode === 200 && res.data.code === 200) {
							console.log('作业数据:', res.data.data)
							
							// 转换数据格式
							if (Array.isArray(res.data.data)) {
								that.assignmentList = res.data.data.map(function(item) {
									return {
										id: item.assignmentId,
										title: item.title,
										description: item.description,
										className: item.className,
										studentName: '我',
										submitTime: item.deadline || '未设置截止时间',
										subject: that.getSubjectFromTitle(item.title),
										status: item.status === 0 ? 'pending' : 'completed',
										statusText: item.status === 0 ? '待完成' : '已完成',
										score: item.status === 1 ? item.totalScore : null
									}
								})
								
								// 提取课程列表（去重）
								that.extractCourseList()
								
								// 显示刷新成功提示
								uni.showToast({
									title: '刷新成功',
									icon: 'success',
									duration: 1000
								})
							}
						} else {
							uni.showToast({
								title: '加载失败',
								icon: 'none'
							})
						}
						uni.stopPullDownRefresh()
					},
					fail: function(error) {
						console.error('加载作业列表失败:', error)
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
						uni.stopPullDownRefresh()
					}
				})
			},
			
			// 从作业列表中提取课程列表
			extractCourseList() {
				const classMap = {}
				
				// 统计每个班级的作业数量
				this.assignmentList.forEach(function(item) {
					if (item.className) {
						if (!classMap[item.className]) {
							classMap[item.className] = {
								name: item.className,
								total: 0,
								completed: 0,
								pending: 0
							}
						}
						classMap[item.className].total++
						if (item.status === 'completed') {
							classMap[item.className].completed++
						} else {
							classMap[item.className].pending++
						}
					}
				})
				
				// 转换为数组
				this.courseList = Object.keys(classMap).map(function(key, index) {
					const course = classMap[key]
					return {
						id: index + 1,
						name: course.name,
						description: '共' + course.total + '个作业',
						studentCount: course.completed + '/' + course.total,
						time: course.pending + '个待完成'
					}
				})
			},
			
			// 旧的加载方法（保留作为备用）
			loadAssignmentList() {
				const that = this
				const { getAssignmentList } = require('../../api/student.js')
				
				getAssignmentList(this.classId).then(result => {
					if (result.code === 200) {
						// 转换后端数据为页面格式
						that.assignmentList = result.data.map(item => ({
							id: item.id,
							title: item.title,
							studentName: '我',
							submitTime: item.deadline,
							subject: that.getSubjectFromTitle(item.title),
							status: item.status === 0 ? 'pending' : 'completed',
							statusText: item.status === 0 ? '待完成' : '已完成',
							score: item.status === 1 ? item.totalScore : null
						}))
					}
					uni.stopPullDownRefresh()
				}).catch(error => {
					console.error('加载作业列表失败:', error)
					uni.stopPullDownRefresh()
				})
			},
			
			// 从标题提取科目
			getSubjectFromTitle(title) {
				if (title.includes('数学')) return '数学'
				if (title.includes('英语')) return '英语'
				if (title.includes('政治')) return '政治'
				return '其他'
			},
			
			goToDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${item.id}`
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		min-height: 100vh;
		background-color: #F8F9FA;
		padding: 16px 20px;
		padding-bottom: 60px;
	}

	/* 筛选栏 */
	.filter-bar {
		display: flex;
		gap: 10px;
		margin-bottom: 16px;
	}

	.filter-chip {
		padding: 8px 18px;
		font-size: 14px;
		color: #666666;
		background-color: #F5F6F7;
		border-radius: 20px;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.filter-chip.active {
		color: #333333;
		background-color: #FFFFFF;
		border: 1px solid #E5E5E5;
	}

	/* 作业卡片 */
	.assignment-card {
		background-color: #FFFFFF;
		border-radius: 16px;
		margin-bottom: 12px;
		overflow: hidden;
		border: 1px solid #F0F0F0;
	}

	.card-status-bar {
		display: none;
	}

	.card-body {
		flex: 1;
		padding: 18px 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.card-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-title {
		font-size: 15px;
		font-weight: 600;
		color: #333333;
		flex: 1;
	}

	.card-desc {
		font-size: 13px;
		color: #999999;
		line-height: 1.5;
		margin-top: -4px;
	}

	.status-tag {
		font-size: 12px;
		padding: 4px 12px;
		border-radius: 12px;
		font-weight: 500;
	}

	.status-tag.pending {
		color: #FF9500;
		background-color: #FFF8F0;
	}

	.status-tag.completed {
		color: #34C759;
		background-color: #F0F9F3;
	}

	.card-row.meta {
		gap: 20px;
		justify-content: flex-start;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 13px;
		color: #999999;
	}

	.card-row.footer {
		padding-top: 12px;
		border-top: 1px solid #F5F6F7;
	}

	.subject-tag {
		font-size: 12px;
		color: #666666;
		background-color: #F5F6F7;
		padding: 4px 12px;
		border-radius: 8px;
	}

	.score {
		display: flex;
		align-items: baseline;
		gap: 2px;
	}

	.score-num {
		font-size: 20px;
		font-weight: 600;
		color: #333333;
	}

	.score-label {
		font-size: 12px;
		color: #999999;
	}

	/* 空状态 */
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 120px 0;
		gap: 12px;
	}

	.empty-text {
		font-size: 15px;
		color: #CCCCCC;
	}
</style>
