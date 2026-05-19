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
		url: '/api/students/work/' + assignmentId,
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

// 导出
module.exports = {
	login: login,
	joinClass: joinClass,
	getUserInfo: getUserInfo,
	getAllWork: getAllWork,
	submitAssignment: submitAssignment,
	getAssignmentList: getAssignmentList,
	getAssignmentDetail: getAssignmentDetail,
	getAssignmentResult: getAssignmentResult
}
