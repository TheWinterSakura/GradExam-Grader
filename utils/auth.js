// 认证相关工具函数

// 检查是否已登录
export const isLoggedIn = () => {
	const token = uni.getStorageSync('token')
	return !!token
}

// 获取token
export const getToken = () => {
	return uni.getStorageSync('token')
}

// 获取用户ID
export const getUserId = () => {
	return uni.getStorageSync('userId')
}

// 清除登录信息
export const clearAuth = () => {
	uni.removeStorageSync('token')
	uni.removeStorageSync('userId')
}

// 跳转到登录页
export const goToLogin = () => {
	uni.reLaunch({
		url: '/pages/login/login'
	})
}
