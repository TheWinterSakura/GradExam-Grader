const request = require('../utils/request.js')

// 学生相关API

// 微信小程序登录
function login(code) {
	return request({
		url: '/api/student/login',
		method: 'POST',
		data: { code }
	})
}

// 加入班级
function joinClass(code, userId) {
	return request({
		url: '/api/student/joinClass',
		method: 'POST',
		data: { code, userId }
	})
}

// 获取学生信息
function getUserInfo(userId) {
	return request({
		url: '/api/student/getUserInfo',
		method: 'GET',
		data: { userId }
	})
}

// 获取学生所有作业
function getAllWork(studentId) {
	return request({
		url: '/api/student/allWork',
		method: 'GET',
		data: { studentId }
	})
}

// 提交作业
function submitAssignment(data) {
	return request({
		url: '/api/students/submissions',
		method: 'POST',
		data: data
	})
}

// 查看作业列表
function getAssignmentList(classId) {
	return request({
		url: '/api/students/assignment/' + classId,
		method: 'GET'
	})
}

// 查看作业详情（题目列表）
function getAssignmentDetail(assignmentId) {
	return request({
		url: '/api/student/work/' + assignmentId,
		method: 'GET'
	})
}

// 查看作业批改结果
function getAssignmentResult(assignmentId, studentId) {
	return request({
		url: '/api/students/result',
		method: 'GET',
		data: { assignmentId: assignmentId, studentId: studentId }
	})
}

// 设置个人信息
function setUserInfo(name, userId) {
	return request({
		url: '/api/student/setUserInfo',
		method: 'POST',
		data: { 
			userId: userId,
			username: name,
			name: name
		}
	})
}

// 获取班级列表
function getClassList(userId) {
	return request({
		url: '/api/student/getClassList',
		method: 'GET',
		data: { userId }
	})
}

// 上传图片
function uploadImage(filePath, userId) {
	return new Promise(function(resolve, reject) {
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
			success: function(res) {
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
			fail: function(err) {
				console.error('上传头像失败:', err)
				reject(err)
			}
		})
	})
}

// 导出
module.exports = {
	login: login,
	joinClass: joinClass,
	getUserInfo: getUserInfo,
	getAllWork: getAllWork,
	submitAssignment: submitAssignment,
	getAssignmentList: getAssignmentList,
	getAssignmentDetail: getAssignmentDetail,
	getAssignmentResult: getAssignmentResult,
	setUserInfo: setUserInfo,
	getClassList: getClassList,
	uploadImage: uploadImage
}
