<script>
	import { isLoggedIn, goToLogin } from '@/utils/auth.js'
	
	export default {
		onLaunch: function() {
			console.log('考研作业批改系统启动')
			
			// 检查登录状态
			this.checkLoginStatus()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			checkLoginStatus() {
				// 获取当前页面路径
				const pages = getCurrentPages()
				const currentPage = pages[pages.length - 1]
				const route = currentPage ? currentPage.route : ''
				
				// 如果不在登录页且未登录，跳转到登录页
				if (route !== 'pages/login/login' && !isLoggedIn()) {
					goToLogin()
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	page {
		background-color: #F8F9FA;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
			'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 28rpx;
		color: #333333;
		line-height: 1.6;
	}

	/* #endif */

	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
