// 认证相关工具函数

// 检查是否已登录
function isLoggedIn() {
	const token = uni.getStorageSync('token')
	return !!token
}

// 获取token
function getToken() {
	return uni.getStorageSync('token')
}

// 获取用户ID
function getUserId() {
	return uni.getStorageSync('userId')
}

// 清除登录信息
function clearAuth() {
	uni.removeStorageSync('token')
	uni.removeStorageSync('userId')
}

// 跳转到登录页
function goToLogin() {
	uni.reLaunch({
		url: '/pages/login/login'
	})
}

// 导出
module.exports = {
	isLoggedIn: isLoggedIn,
	getToken: getToken,
	getUserId: getUserId,
	clearAuth: clearAuth,
	goToLogin: goToLogin
}
