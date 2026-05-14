// 应用配置

// 开发环境API地址
const DEV_BASE_URL = 'http://192.168.190.160:8080'

// 生产环境API地址
const PROD_BASE_URL = 'https://your-api-domain.com'

// 根据环境选择API地址
export const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_BASE_URL : PROD_BASE_URL

// 其他配置
export const APP_NAME = '考研作业提交'
export const APP_VERSION = '1.0.0'

// 超时时间（毫秒）
export const REQUEST_TIMEOUT = 10000
