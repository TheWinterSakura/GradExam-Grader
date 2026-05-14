import request from '@/utils/request.js'

// 学生相关API

// 微信小程序登录
export const login = (code) => {
	return request({
		url: '/api/student/login',
		method: 'POST',
		data: { code }
	})
}

// 获取学生信息
export const getStudentInfo = () => {
	return request({
		url: '/api/student/info',
		method: 'GET'
	})
}

// 更新学生信息
export const updateStudentInfo = (data) => {
	return request({
		url: '/api/student/info',
		method: 'PUT',
		data
	})
}
