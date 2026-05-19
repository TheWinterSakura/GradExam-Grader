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

// 更新学生信息
export const updateStudentInfo = (data) => {
	return request({
		url: '/api/student/info',
		method: 'PUT',
		data
	})
}

// 获取用户信息
export const getUserInfo = (userId) => {
	return request({
		url: '/api/student/getUserInfo',
		method: 'GET',
		data: { userId }
	})
}

// 加入班级
export const joinClass = (code, userId) => {
	return request({
		url: '/api/student/joinClass',
		method: 'POST',
		data: { code, userId }
	})
}

// 设置个人信息
export const setUserInfo = (name, userId, phone) => {
	return request({
		url: '/api/student/setUserInfo',
		method: 'POST',
		data: { 
			userId: userId,
			username: name,
			name: name,
			phone: phone || ''
		}
	})
}

// 获取班级列表
export const getClassList = (userId) => {
	return request({
		url: '/api/student/getClassList',
		method: 'GET',
		data: { userId }
	})
}

// 获取作业列表
export const getAssignmentList = (studentId, classId) => {
	return request({
		url: `/api/student/assignment/${studentId}/${classId}`,
		method: 'GET'
	})
}

// 获取作业详情（题目列表）
export const getAssignmentDetail = (assignmentId) => {
	return request({
		url: `/api/student/work/${assignmentId}`,
		method: 'GET'
	})
}

// 上传图片
export const uploadImage = (filePath, userId) => {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync('token')
		const BASE_URL = 'http://192.168.190.160:8080'
		
		console.log('开始上传头像，userId:', userId, 'filePath:', filePath)
		
		uni.uploadFile({
			url: BASE_URL + `/api/student/uploadAvatar/${userId}`,
			filePath: filePath,
			name: 'file',
			header: {
				'Authorization': token ? `Bearer ${token}` : ''
			},
			success: (res) => {
				console.log('上传头像响应:', res)
				if (res.statusCode === 200) {
					const data = JSON.parse(res.data)
					console.log('上传头像解析后的数据:', data)
					if (data.code === 200) {
						resolve(data)
					} else {
						reject(new Error(data.message || '上传失败'))
					}
				} else {
					reject(new Error('上传失败'))
				}
			},
			fail: (err) => {
				console.error('上传头像失败:', err)
				reject(err)
			}
		})
	})
}
