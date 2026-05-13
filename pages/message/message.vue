<template>
	<view class="page">
		<view class="message-list">
			<view class="message-card" v-for="msg in messageList" :key="msg.id" @click="goToAssignment(msg)">
				<view class="card-indicator" :class="{ new: msg.isNew }"></view>
				<view class="card-body">
					<view class="card-header">
						<view class="course-tag">{{ msg.courseName }}</view>
						<text class="time">{{ msg.time }}</text>
					</view>
					<view class="card-content">
						<text class="message-title">发布新作业</text>
						<text class="assignment-name">{{ msg.assignmentName }}</text>
					</view>
					<view class="card-footer">
						<text class="deadline">
							<uni-icons type="calendar" :size="12" color="#9CA3AF" style="margin-right: 3px;"></uni-icons>
							截止：{{ msg.deadline }}
						</text>
						<view class="status-dot" :class="msg.isNew ? 'new' : 'read'"></view>
					</view>
				</view>
			</view>
		</view>

		<view class="empty" v-if="messageList.length === 0">
			<uni-icons type="chat" :size="48" color="#D1D5DB"></uni-icons>
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
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background-color: #F2F3F7;
	padding-bottom: 60px;
}

.message-list {
	padding: 16px;
}

.message-card {
	display: flex;
	background-color: #FFFFFF;
	border-radius: 14px;
	margin-bottom: 12px;
	overflow: hidden;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.card-indicator {
	width: 4px;
	flex-shrink: 0;
	background-color: #E5E7EB;
	transition: background-color 0.3s ease;
}

.card-indicator.new {
	background-color: #4F6EF7;
}

.card-body {
	flex: 1;
	padding: 16px 18px;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.course-tag {
	font-size: 12px;
	color: #4F6EF7;
	background-color: #EEF1FE;
	padding: 3px 10px;
	border-radius: 6px;
	font-weight: 500;
}

.time {
	font-size: 12px;
	color: #9CA3AF;
}

.card-content {
	margin-bottom: 12px;
}

.message-title {
	font-size: 12px;
	color: #9CA3AF;
	display: block;
	margin-bottom: 4px;
}

.assignment-name {
	font-size: 16px;
	color: #1A1A2E;
	font-weight: 600;
	display: block;
	line-height: 1.4;
}

.card-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 12px;
	border-top: 1px solid #F3F4F6;
}

.deadline {
	font-size: 12px;
	color: #9CA3AF;
	display: flex;
	align-items: center;
}

.status-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
}

.status-dot.new {
	background-color: #FF3B30;
	box-shadow: 0 0 6px rgba(255, 59, 48, 0.4);
}

.status-dot.read {
	background-color: #E5E7EB;
}

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
