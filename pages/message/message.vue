<template>
	<view class="container">
		<view class="message-list">
			<view class="message-card" v-for="msg in messageList" :key="msg.id" @click="goToAssignment(msg)">
				<view class="card-header">
					<view class="course-tag">{{ msg.courseName }}</view>
					<text class="time">{{ msg.time }}</text>
				</view>
				<view class="card-content">
					<text class="message-title">发布新作业</text>
					<text class="assignment-name">{{ msg.assignmentName }}</text>
				</view>
				<view class="card-footer">
					<text class="deadline">截止时间：{{ msg.deadline }}</text>
					<view class="status-badge" :class="msg.isNew ? 'new' : 'read'">
						{{ msg.isNew ? '未读' : '已读' }}
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty" v-if="messageList.length === 0">
			<text class="empty-text">暂无消息</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			messageList: [
				{
					id: 1,
					courseName: '考研数学强化班',
					assignmentName: '高等数学第二章习题',
					time: '2小时前',
					deadline: '2024-01-20 23:59',
					isNew: true
				},
				{
					id: 2,
					courseName: '考研英语冲刺班',
					assignmentName: '阅读理解专项训练',
					time: '5小时前',
					deadline: '2024-01-19 23:59',
					isNew: true
				},
				{
					id: 3,
					courseName: '考研政治精讲班',
					assignmentName: '毛概重点知识梳理',
					time: '昨天 14:30',
					deadline: '2024-01-18 23:59',
					isNew: false
				},
				{
					id: 4,
					courseName: '考研数学强化班',
					assignmentName: '线性代数综合练习',
					time: '昨天 09:15',
					deadline: '2024-01-17 23:59',
					isNew: false
				},
				{
					id: 5,
					courseName: '考研英语冲刺班',
					assignmentName: '写作模拟练习',
					time: '2天前',
					deadline: '2024-01-16 23:59',
					isNew: false
				}
			]
		}
	},
	methods: {
		goToAssignment(msg) {
			uni.showToast({
				title: '查看作业：' + msg.assignmentName,
				icon: 'none'
			})
		}
	},
	onLoad() {
		
	},
	onShow() {
		if (typeof this.$mp.page.getTabBar === 'function' && this.$mp.page.getTabBar()) {
			this.$mp.page.getTabBar().setData({
				selected: 1
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 50px;
}

.message-list {
	padding: 15px;
}

.message-card {
	background-color: #fff;
	border-radius: 12px;
	padding: 16px;
	margin-bottom: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	position: relative;
}

.message-card::before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 4px;
	background-color: #007AFF;
	border-radius: 12px 0 0 12px;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
}

.course-tag {
	font-size: 13px;
	color: #007AFF;
	background-color: #e6f2ff;
	padding: 4px 12px;
	border-radius: 12px;
	font-weight: 500;
}

.time {
	font-size: 12px;
	color: #999;
}

.card-content {
	margin-bottom: 12px;
}

.message-title {
	font-size: 13px;
	color: #666;
	display: block;
	margin-bottom: 6px;
}

.assignment-name {
	font-size: 16px;
	color: #333;
	font-weight: bold;
	display: block;
	line-height: 1.4;
}

.card-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 12px;
	border-top: 1px solid #f0f0f0;
}

.deadline {
	font-size: 13px;
	color: #666;
}

.status-badge {
	font-size: 12px;
	padding: 3px 10px;
	border-radius: 10px;
	font-weight: 500;
}

.status-badge.new {
	color: #ff6b6b;
	background-color: #ffe6e6;
}

.status-badge.read {
	color: #999;
	background-color: #f5f5f5;
}

.empty {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 100px 0;
}

.empty-text {
	font-size: 14px;
	color: #999;
}
</style>
