# 微信小程序登录功能说明

## 功能概述

已实现微信小程序注册登录功能，包含完整的登录流程、token管理和权限验证。

## 文件结构

```
├── pages/
│   └── login/
│       └── login.vue          # 登录页面
├── api/
│   └── student.js             # 学生相关API接口
├── utils/
│   ├── request.js             # 统一请求封装
│   └── auth.js                # 认证工具函数
├── config/
│   └── index.js               # 应用配置
└── App.vue                    # 应用入口（含登录状态检查）
```

## 主要功能

### 1. 登录页面 (`pages/login/login.vue`)
- 渐变背景设计，符合现有UI风格
- 微信一键登录按钮
- 加载状态提示
- 用户协议和隐私政策提示
- 装饰性UI元素

### 2. 请求封装 (`utils/request.js`)
- 统一的请求拦截器
- 自动添加token到请求头
- 401状态自动跳转登录
- 错误统一处理

### 3. 认证工具 (`utils/auth.js`)
- `isLoggedIn()` - 检查登录状态
- `getToken()` - 获取token
- `getUserId()` - 获取用户ID
- `clearAuth()` - 清除登录信息
- `goToLogin()` - 跳转登录页

### 4. API接口 (`api/student.js`)
- `login(code)` - 微信登录接口
- `getStudentInfo()` - 获取学生信息
- `updateStudentInfo(data)` - 更新学生信息

### 5. 应用配置 (`config/index.js`)
- 开发/生产环境API地址配置
- 应用基础信息配置
- 请求超时配置

## 使用说明

### 1. 配置API地址

编辑 `config/index.js` 文件，修改API地址：

```javascript
// 开发环境API地址
const DEV_BASE_URL = 'http://localhost:8080'

// 生产环境API地址
const PROD_BASE_URL = 'https://your-api-domain.com'
```

### 2. 登录流程

1. 用户点击"微信一键登录"按钮
2. 调用 `uni.login()` 获取微信登录凭证 `code`
3. 将 `code` 发送到后端接口 `/api/student/login`
4. 后端返回 `token` 和 `userId`
5. 保存到本地存储
6. 跳转到首页

### 3. 登录状态检查

应用启动时会自动检查登录状态：
- 如果未登录，自动跳转到登录页
- 如果已登录，正常进入应用

### 4. Token失效处理

当请求返回401状态码时：
- 自动清除本地token
- 跳转到登录页
- 提示用户重新登录

## 接口对接

### 登录接口

**接口地址**: `POST /api/student/login`

**请求参数**:
```json
{
  "code": "071XYZ123abc"
}
```

**响应数据**:
```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1
  }
}
```

### 其他接口

所有需要认证的接口，请求头会自动携带：
```
Authorization: Bearer {token}
```

## 样式特点

- 渐变紫色背景（#667eea → #764ba2）
- 圆角卡片设计（24px）
- 蓝色主题按钮（#4F6EF7）
- 柔和阴影效果
- 装饰性圆圈元素
- 符合现有页面风格

## 注意事项

1. **微信小程序配置**
   - 需在微信公众平台配置服务器域名
   - 需配置request合法域名
   - 需配置业务域名

2. **开发调试**
   - 开发工具中需勾选"不校验合法域名"
   - 真机调试需配置合法域名

3. **安全性**
   - Token存储在本地，注意安全
   - 敏感操作需二次验证
   - 定期更新token机制

4. **页面配置**
   - 登录页已设置为首页
   - 使用自定义导航栏（navigationStyle: custom）
   - 其他页面需登录后才能访问

## 扩展功能

可根据需求添加：
- 手机号授权登录
- 用户信息完善
- 记住登录状态
- 多端登录管理
- 登录日志记录
