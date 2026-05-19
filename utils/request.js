// API基础配置
import { BASE_URL } from '@/config/index.js'

// 请求拦截器
const request = (options) => {
	return new Promise((resolve, reject) => {
		// 获取token
		const token = uni.getStorageSync('token')
		
		// 设置请求头
		const header = {
			'Content-Type': 'application/json',
			...options.header
		}
		
		// 如果有token，添加到请求头
		if (token) {
			header['Authorization'] = `Bearer ${token}`
		}
		
		const requestUrl = BASE_URL + options.url
		console.log('发起请求:', requestUrl, options.method, options.data)
		
		uni.request({
			url: requestUrl,
			method: options.method || 'GET',
			data: options.data || {},
			header: header,
			success: (res) => {
				console.log('请求响应:', requestUrl, res.statusCode, res.data)
				
				// 请求成功
				if (res.statusCode === 200) {
					// 业务层 token 过期判断（后端可能在200响应里返回过期code）
					if (res.data && (res.data.code === 401 || res.data.code === 403)) {
						console.log('Token失效（业务code），跳转登录页')
						uni.removeStorageSync('token')
						uni.removeStorageSync('userId')
						uni.reLaunch({ url: '/pages/login/login' })
						reject(new Error('登录已过期，请重新登录'))
						return
					}
					resolve(res.data)
				} else if (res.statusCode === 401 || res.statusCode === 403) {
					// HTTP状态码 token过期或无效
					console.log('Token失效，跳转登录页')
					uni.removeStorageSync('token')
					uni.removeStorageSync('userId')
					uni.reLaunch({ url: '/pages/login/login' })
					reject(new Error('登录已过期，请重新登录'))
				} else {
					const errorMsg = res.data.message || '请求失败'
					console.error('请求失败:', requestUrl, res.statusCode, errorMsg)
					reject(new Error(errorMsg))
				}
			},
			fail: (err) => {
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

// 导出请求方法
export default request
