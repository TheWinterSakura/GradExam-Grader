<template>
	<view class="page">
		<view class="empty">
			<view class="empty-illustration">
				<uni-icons type="compose" :size="56" color="#D1D5DB"></uni-icons>
			</view>
			<text class="empty-title">还没有笔记</text>
			<text class="empty-desc">批改作业时可以添加笔记，方便日后回顾</text>
			<view class="empty-action">
				<text class="action-text">创建新笔记</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {

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
	display: flex;
	align-items: center;
	justify-content: center;
}

.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	padding: 40px;
}

.empty-illustration {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: #F2F3F7;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 8px;
}

.empty-title {
	font-size: 17px;
	font-weight: 600;
	color: #1A1A2E;
}

.empty-desc {
	font-size: 14px;
	color: #9CA3AF;
	text-align: center;
	line-height: 1.5;
}

.empty-action {
	margin-top: 8px;
	padding: 10px 28px;
	background-color: #4F6EF7;
	border-radius: 22px;
}

.action-text {
	font-size: 14px;
	color: #FFFFFF;
	font-weight: 500;
}
</style>
