// API基础配置
const config = require('../config/index.js')
const BASE_URL = config.BASE_URL

// 请求拦截器
function request(options) {
	return new Promise(function(resolve, reject) {
		// 获取token
		const token = uni.getStorageSync('token')
		
		// 设置请求头
		const header = {
			'Content-Type': 'application/json'
		}
		
		// 合并自定义header
		if (options.header) {
			for (let key in options.header) {
				header[key] = options.header[key]
			}
		}
		
		// 如果有token，添加到请求头
		if (token) {
			header['Authorization'] = 'Bearer ' + token
		}
		
		const requestUrl = BASE_URL + options.url
		console.log('发起请求:', requestUrl, options.method, options.data)
		
		uni.request({
			url: requestUrl,
			method: options.method || 'GET',
			data: options.data || {},
			header: header,
			success: function(res) {
				console.log('请求响应:', requestUrl, res.statusCode, res.data)
				
				// 请求成功
				if (res.statusCode === 200) {
					resolve(res.data)
				} else if (res.statusCode === 401) {
					// token过期或无效，跳转到登录页
					console.log('Token失效，跳转登录页')
					uni.removeStorageSync('token')
					uni.removeStorageSync('userId')
					uni.reLaunch({
						url: '/pages/login/login'
					})
					reject(new Error('登录已过期，请重新登录'))
				} else {
					const errorMsg = res.data.message || '请求失败'
					console.error('请求失败:', requestUrl, res.statusCode, errorMsg)
					reject(new Error(errorMsg))
				}
			},
			fail: function(err) {
				// 请求失败
				console.error('网络请求失败:', requestUrl, err)
				uni.showToast({
					title: '网络请求失败',
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}

// 导出
module.exports = request
