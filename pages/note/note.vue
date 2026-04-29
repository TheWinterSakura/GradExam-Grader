<template>
	<view class="container">
		<view class="header">
			<text class="title">笔记</text>
		</view>
		<view class="content">
			<text class="placeholder">暂无笔记</text>
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
		if (typeof this.$mp.page.getTabBar === 'function' && this.$mp.page.getTabBar()) {
			this.$mp.page.getTabBar().setData({
				selected: 2
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

.header {
	padding: 20rpx 30rpx;
	background-color: #ffffff;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333333;
}

.content {
	margin-top: 20rpx;
	padding: 100rpx 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.placeholder {
	font-size: 28rpx;
	color: #999999;
}
</style>
