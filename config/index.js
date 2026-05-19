// 应用配置

// 开发环境API地址
var DEV_BASE_URL = 'http://192.168.190.160:8080'

// 生产环境API地址
var PROD_BASE_URL = 'https://your-api-domain.com'

// 根据环境选择API地址
var BASE_URL = DEV_BASE_URL  // 默认使用开发环境

// 其他配置
var APP_NAME = '考研作业提交'
var APP_VERSION = '1.0.0'

// 请求超时时间（毫秒）
var REQUEST_TIMEOUT = 10000

// 开发模式配置
var DEV_CONFIG = {
	USE_MOCK: false,
	SHOW_LOG: true
}

// 导出
module.exports = {
	BASE_URL: BASE_URL,
	APP_NAME: APP_NAME,
	APP_VERSION: APP_VERSION,
	REQUEST_TIMEOUT: REQUEST_TIMEOUT,
	DEV_CONFIG: DEV_CONFIG
}
