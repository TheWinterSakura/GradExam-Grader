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
			this.loadAssignmentList()
		},
		onPullDownRefresh() {
			this.loadAssignmentList()
		},
		methods: {
			// 加载作业列表
			loadAssignmentList() {
				const that = this
				const { getAssignmentList } = require('@/api/student.js')
				
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
