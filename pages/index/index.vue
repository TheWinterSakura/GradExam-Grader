<template>
	<view class="page">
		<!-- 顶部选项卡 -->
		<view class="top-tabs">
			<view 
				class="top-tab-item" 
				:class="{'active': currentTab === 'course'}" 
				@click="switchTopTab('course')"
			>
				<text class="top-tab-text">我的课程</text>
			</view>
			<view 
				class="top-tab-item" 
				:class="{'active': currentTab === 'assignment'}" 
				@click="switchTopTab('assignment')"
			>
				<text class="top-tab-text">作业列表</text>
			</view>
		</view>

		<!-- 我的课程内容 -->
		<view v-if="currentTab === 'course'" class="course-content">
			<view class="course-list">
				<view class="course-item" v-for="course in courseList" :key="course.id" @click="goToCourse(course)">
					<view class="course-header">
						<text class="course-name">{{ course.name }}</text>
						<text class="student-count">{{ course.studentCount }}人</text>
					</view>
					<view class="course-info">
						<text class="course-desc">{{ course.description }}</text>
					</view>
					<view class="course-footer">
						<text class="course-time">{{ course.time }}</text>
					</view>
				</view>
			</view>
			
			<!-- 空状态 -->
			<view class="empty" v-if="courseList.length === 0">
				<text class="empty-text">暂无课程</text>
			</view>
		</view>

		<!-- 作业列表内容 -->
		<view v-if="currentTab === 'assignment'" class="assignment-content">
			<!-- 筛选栏 -->
			<view class="filter-bar">
				<view class="filter-item" :class="{'active': filterStatus === ''}" @click="filterStatus = ''">
					全部
				</view>
				<view class="filter-item" :class="{'active': filterStatus === 'pending'}" @click="filterStatus = 'pending'">
					待完成
				</view>
				<view class="filter-item" :class="{'active': filterStatus === 'completed'}" @click="filterStatus = 'completed'">
					已完成
				</view>
			</view>

			<!-- 作业列表 -->
			<view class="assignment-list">
				<view class="assignment-item" v-for="item in filteredList" :key="item.id" @click="goToDetail(item)">
					<view class="item-header">
						<text class="title">{{ item.title }}</text>
						<uni-badge :text="item.statusText" :type="item.status === 'completed' ? 'success' : 'warning'"></uni-badge>
					</view>
					<view class="item-info">
						<text class="info-text">学生：{{ item.studentName }}</text>
						<text class="info-text">提交时间：{{ item.submitTime }}</text>
					</view>
					<view class="item-footer">
						<text class="subject">{{ item.subject }}</text>
						<text class="score" v-if="item.score">得分：{{ item.score }}</text>
					</view>
				</view>
			</view>

			<!-- 空状态 -->
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
		background-color: #f5f5f5;
		padding-bottom: 50px;
	}

	.top-tabs {
		display: flex;
		background-color: #fff;
		border-bottom: 1px solid #e5e5e5;
	}

	.top-tab-item {
		flex: 1;
		text-align: center;
		padding: 15px 0;
		position: relative;
	}

	.top-tab-text {
		font-size: 16px;
		color: #666;
	}

	.top-tab-item.active .top-tab-text {
		color: #007AFF;
		font-weight: bold;
	}

	.top-tab-item.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		height: 3px;
		background-color: #007AFF;
		border-radius: 2px;
	}

	.course-content,
	.assignment-content {
		min-height: calc(100vh - 100px);
	}

	.course-list {
		padding: 15px;
	}

	.course-item {
		background-color: #fff;
		border-radius: 12px;
		padding: 20px;
		margin-bottom: 15px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.course-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.course-name {
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.student-count {
		font-size: 14px;
		color: #007AFF;
		background-color: #e6f2ff;
		padding: 4px 12px;
		border-radius: 12px;
	}

	.course-info {
		margin-bottom: 12px;
	}

	.course-desc {
		font-size: 14px;
		color: #666;
		line-height: 1.5;
	}

	.course-footer {
		padding-top: 12px;
		border-top: 1px solid #f0f0f0;
	}

	.course-time {
		font-size: 13px;
		color: #999;
	}

	.filter-bar {
		display: flex;
		background-color: #fff;
		padding: 20rpx 0;
		margin-bottom: 20rpx;
	}

	.filter-item {
		flex: 1;
		text-align: center;
		padding: 10rpx 0;
		font-size: 28rpx;
		color: #666;
	}

	.filter-item.active {
		color: #007AFF;
		font-weight: bold;
		border-bottom: 4rpx solid #007AFF;
	}

	.assignment-list {
		padding: 0 30rpx;
	}

	.assignment-item {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.item-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		flex: 1;
	}

	.item-info {
		display: flex;
		flex-direction: column;
		gap: 10rpx;
		margin-bottom: 20rpx;
	}

	.info-text {
		font-size: 26rpx;
		color: #666;
	}

	.item-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		border-top: 1rpx solid #f0f0f0;
	}

	.subject {
		font-size: 24rpx;
		color: #999;
		padding: 8rpx 20rpx;
		background-color: #f5f5f5;
		border-radius: 8rpx;
	}

	.score {
		font-size: 28rpx;
		color: #ff6b6b;
		font-weight: bold;
	}

	.empty {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 200rpx 0;
	}

	.empty-text {
		font-size: 28rpx;
		color: #999;
	}
</style>
