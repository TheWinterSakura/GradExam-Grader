<template>
	<view class="page">
		<!-- 筛选栏 -->
		<view class="filter-bar">
			<view class="filter-item" :class="{'active': filterStatus === ''}" @click="filterStatus = ''">
				全部
			</view>
			<view class="filter-item" :class="{'active': filterStatus === 'pending'}" @click="filterStatus = 'pending'">
				待批改
			</view>
			<view class="filter-item" :class="{'active': filterStatus === 'completed'}" @click="filterStatus = 'completed'">
				已批改
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
</template>

<script>
	export default {
		data() {
			return {
				filterStatus: '',
				assignmentList: [
					{
						id: 1,
						title: '高等数学第一章习题',
						studentName: '张三',
						submitTime: '2024-01-15 10:30',
						subject: '数学',
						status: 'pending',
						statusText: '待批改'
					},
					{
						id: 2,
						title: '英语阅读理解练习',
						studentName: '李四',
						submitTime: '2024-01-14 15:20',
						subject: '英语',
						status: 'completed',
						statusText: '已批改',
						score: '85'
					},
					{
						id: 3,
						title: '政治马克思主义原理',
						studentName: '王五',
						submitTime: '2024-01-13 09:15',
						subject: '政治',
						status: 'pending',
						statusText: '待批改'
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
		methods: {
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
