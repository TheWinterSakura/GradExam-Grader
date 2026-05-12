<script>
	export default {
		onLaunch: function() {
			console.log('考研作业批改系统启动')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	page {
		background-color: #F2F3F7;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
			'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 28rpx;
		color: #1A1A2E;
		line-height: 1.6;
	}

	/* #endif */

	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
