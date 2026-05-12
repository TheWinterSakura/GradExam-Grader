<template>
	<view class="page">
		<!-- 顶部胶囊切换 -->
		<view class="top-tabs">
			<view class="tab-track">
				<view
					class="tab-pill"
					:class="{ active: currentTab === 'course' }"
					@click="switchTopTab('course')"
				>
					<text class="tab-pill-text">我的课程</text>
				</view>
				<view
					class="tab-pill"
					:class="{ active: currentTab === 'assignment' }"
					@click="switchTopTab('assignment')"
				>
					<text class="tab-pill-text">作业列表</text>
				</view>
			</view>
		</view>

		<!-- 我的课程内容 -->
		<view v-if="currentTab === 'course'" class="content-area">
			<view class="course-list">
				<view class="course-card" v-for="course in courseList" :key="course.id" @click="goToCourse(course)">
					<view class="course-card-top">
						<view class="course-avatar">{{ course.name.charAt(0) }}</view>
						<view class="course-main">
							<text class="course-name">{{ course.name }}</text>
							<text class="course-desc">{{ course.description }}</text>
						</view>
					</view>
					<view class="course-card-bottom">
						<view class="course-meta">
							<uni-icons type="person" :size="14" color="#9CA3AF"></uni-icons>
							<text class="meta-text">{{ course.studentCount }}人</text>
						</view>
						<view class="course-meta">
							<uni-icons type="calendar" :size="14" color="#9CA3AF"></uni-icons>
							<text class="meta-text">{{ course.time }}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="empty" v-if="courseList.length === 0">
				<text class="empty-text">暂无课程</text>
			</view>
		</view>

		<!-- 作业列表内容 -->
		<view v-if="currentTab === 'assignment'" class="content-area">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 'assignment',
				filterStatus: '',
				courseList: [
					{
						id: 1,
						name: '考研数学强化班',
						description: '高等数学、线性代数、概率论与数理统计',
						studentCount: 45,
						time: '周一、周三 19:00-21:00'
					},
					{
						id: 2,
						name: '考研英语冲刺班',
						description: '阅读理解、完形填空、翻译、写作',
						studentCount: 38,
						time: '周二、周四 19:00-21:00'
					},
					{
						id: 3,
						name: '考研政治精讲班',
						description: '马克思主义原理、毛概、近代史、思修',
						studentCount: 52,
						time: '周五 19:00-21:00'
					}
				],
				assignmentList: [
					{
						id: 1,
						title: '高等数学第一章习题',
						studentName: '张三',
						submitTime: '2024-01-15 10:30',
						subject: '数学',
						status: 'pending',
						statusText: '待完成'
					},
					{
						id: 2,
						title: '英语阅读理解练习',
						studentName: '李四',
						submitTime: '2024-01-14 15:20',
						subject: '英语',
						status: 'completed',
						statusText: '已完成',
						score: '85'
					},
					{
						id: 3,
						title: '政治马克思主义原理',
						studentName: '王五',
						submitTime: '2024-01-13 09:15',
						subject: '政治',
						status: 'pending',
						statusText: '待完成'
					}
				]
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
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
				uni.showToast({
					title: '刷新成功',
					icon: 'success'
				})
			}, 1000)
		},
		onShow() {
			if (typeof this.$mp.page.getTabBar === 'function' && this.$mp.page.getTabBar()) {
				this.$mp.page.getTabBar().setData({
					selected: 0
				})
			}
		},
		methods: {
			switchTopTab(tab) {
				this.currentTab = tab
			},
			goToCourse(course) {
				uni.showToast({
					title: '进入课程：' + course.name,
					icon: 'none'
				})
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
		background-color: #F2F3F7;
		padding-bottom: 60px;
	}

	/* 顶部胶囊切换 */
	.top-tabs {
		background-color: #FFFFFF;
		padding: 12px 16px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
	}

	.tab-track {
		display: flex;
		background-color: #F2F3F7;
		border-radius: 10px;
		padding: 3px;
	}

	.tab-pill {
		flex: 1;
		text-align: center;
		padding: 10px 0;
		border-radius: 8px;
		transition: all 0.25s ease;
	}

	.tab-pill.active {
		background-color: #FFFFFF;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
	}

	.tab-pill-text {
		font-size: 15px;
		color: #9CA3AF;
		font-weight: 500;
	}

	.tab-pill.active .tab-pill-text {
		color: #4F6EF7;
		font-weight: 600;
	}

	.content-area {
		padding: 16px;
	}

	/* 课程卡片 */
	.course-card {
		background-color: #FFFFFF;
		border-radius: 14px;
		padding: 20px;
		margin-bottom: 14px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	}

	.course-card-top {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		margin-bottom: 16px;
	}

	.course-avatar {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: linear-gradient(135deg, #4F6EF7, #7B8FF7);
		color: #fff;
		font-size: 20px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.course-main {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.course-name {
		font-size: 17px;
		font-weight: 600;
		color: #1A1A2E;
	}

	.course-desc {
		font-size: 13px;
		color: #6B7280;
		line-height: 1.5;
	}

	.course-card-bottom {
		display: flex;
		justify-content: space-between;
		padding-top: 14px;
		border-top: 1px solid #F3F4F6;
	}

	.course-meta {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.meta-text {
		font-size: 13px;
		color: #9CA3AF;
	}

	/* 筛选栏 */
	.filter-bar {
		display: flex;
		gap: 10px;
		margin-bottom: 16px;
	}

	.filter-chip {
		padding: 8px 20px;
		font-size: 14px;
		color: #6B7280;
		background-color: #FFFFFF;
		border-radius: 20px;
		font-weight: 500;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
		transition: all 0.2s ease;
	}

	.filter-chip.active {
		color: #FFFFFF;
		background-color: #4F6EF7;
		box-shadow: 0 2px 8px rgba(79, 110, 247, 0.25);
	}

	/* 作业卡片 */
	.assignment-card {
		display: flex;
		border-radius: 14px;
		margin-bottom: 12px;
		overflow: hidden;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
		background-color: #FFFFFF;
	}

	.card-status-bar {
		width: 4px;
		flex-shrink: 0;
		background-color: #FF9500;
	}

	.assignment-card.is-completed .card-status-bar {
		background-color: #34C759;
	}

	.card-body {
		flex: 1;
		padding: 16px 18px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.card-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-title {
		font-size: 16px;
		font-weight: 600;
		color: #1A1A2E;
		flex: 1;
	}

	.status-tag {
		font-size: 12px;
		padding: 3px 10px;
		border-radius: 10px;
		font-weight: 500;
	}

	.status-tag.pending {
		color: #FF9500;
		background-color: #FFF3E0;
	}

	.status-tag.completed {
		color: #34C759;
		background-color: #E8F8ED;
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
		color: #9CA3AF;
	}

	.card-row.footer {
		padding-top: 10px;
		border-top: 1px solid #F3F4F6;
	}

	.subject-tag {
		font-size: 12px;
		color: #6B7280;
		background-color: #F2F3F7;
		padding: 3px 12px;
		border-radius: 6px;
	}

	.score {
		display: flex;
		align-items: baseline;
		gap: 2px;
	}

	.score-num {
		font-size: 20px;
		font-weight: 700;
		color: #34C759;
	}

	.score-label {
		font-size: 12px;
		color: #9CA3AF;
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
		color: #9CA3AF;
	}
</style>
