# 登录功能调试指南

## 问题已修复

之前的错误 `Cannot read property 'code' of undefined` 是因为使用了错误的 `uni.login()` 调用方式。

### 错误的写法 ❌
```javascript
const loginRes = await uni.login({ provider: 'weixin' })
// loginRes[1].code  // 这是错误的，uni.login不返回数组
```

### 正确的写法 ✅
```javascript
uni.login({
  provider: 'weixin',
  success: (loginRes) => {
    console.log(loginRes.code)  // 直接从loginRes获取code
  },
  fail: (err) => {
    console.error(err)
  }
})
```

## 调试步骤

### 1. 检查控制台日志

登录时会输出以下日志：
```
开始登录流程...
微信登录返回: {code: "071XYZ123abc", errMsg: "login:ok"}
获取到code: 071XYZ123abc
调用后端登录接口...
发起请求: http://localhost:8080/api/student/login POST {code: "071XYZ123abc"}
请求响应: http://localhost:8080/api/student/login 200 {code: 200, message: "成功", data: {...}}
后端返回结果: {code: 200, message: "成功", data: {token: "xxx", userId: 1}}
Token已保存
```

### 2. 检查API地址配置

编辑 `config/index.js`：
```javascript
// 开发环境 - 本地后端
const DEV_BASE_URL = 'http://localhost:8080'

// 生产环境 - 线上后端
const PROD_BASE_URL = 'https://your-api-domain.com'
```

### 3. 微信开发者工具设置

在微信开发者工具中：
1. 点击右上角"详情"
2. 勾选"不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书"
3. 这样可以在开发时访问本地API

### 4. 模拟登录（无后端测试）

如果后端还没准备好，可以临时修改 `api/student.js`：

```javascript
export const login = (code) => {
  // 模拟登录，返回假数据
  return Promise.resolve({
    code: 200,
    message: '成功',
    data: {
      token: 'mock_token_' + Date.now(),
      userId: 1
    }
  })
  
  // 真实请求（后端准备好后使用）
  // return request({
  //   url: '/api/student/login',
  //   method: 'POST',
  //   data: { code }
  // })
}
```

### 5. 检查登录状态

在任意页面的 `onLoad` 中：
```javascript
onLoad() {
  const token = uni.getStorageSync('token')
  const userId = uni.getStorageSync('userId')
  console.log('当前登录状态:', { token, userId })
}
```

## 常见问题

### Q1: 点击登录按钮没反应
**检查：**
- 控制台是否有 "开始登录流程..." 日志
- 是否有报错信息
- `isLoading` 状态是否正确

### Q2: 获取不到微信code
**检查：**
- 是否在微信开发者工具中运行
- 是否配置了AppID（manifest.json）
- 控制台是否显示 "微信登录返回" 日志

### Q3: 网络请求失败
**检查：**
- API地址是否正确（config/index.js）
- 后端服务是否启动
- 是否勾选"不校验合法域名"
- 控制台的请求日志

### Q4: Token保存了但还是跳转登录页
**检查：**
- App.vue 中的 `checkLoginStatus` 逻辑
- 是否在正确的生命周期调用
- Storage中是否真的保存了token

## 测试流程

### 完整测试步骤：

1. **清除旧数据**
   ```javascript
   // 在控制台执行
   uni.clearStorageSync()
   ```

2. **重启小程序**
   - 点击"编译"按钮

3. **应该自动跳转到登录页**
   - 因为没有token

4. **点击"微信一键登录"**
   - 观察控制台日志
   - 应该显示完整的登录流程

5. **登录成功后**
   - 自动跳转到首页
   - 再次重启小程序，应该直接进入首页（不跳转登录页）

6. **测试Token失效**
   ```javascript
   // 手动清除token
   uni.removeStorageSync('token')
   // 然后访问需要登录的页面，应该自动跳转登录页
   ```

## 后端接口要求

### 登录接口规范

**请求：**
```
POST /api/student/login
Content-Type: application/json

{
  "code": "071XYZ123abc"
}
```

**成功响应：**
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

**失败响应：**
```json
{
  "code": 400,
  "message": "登录失败：code无效"
}
```

### 其他接口要求

所有需要认证的接口，前端会自动在请求头添加：
```
Authorization: Bearer {token}
```

后端需要验证这个token，如果无效返回 `401` 状态码。

## 日志说明

| 日志内容 | 说明 |
|---------|------|
| 开始登录流程... | 用户点击了登录按钮 |
| 微信登录返回: {...} | 成功获取微信code |
| 获取到code: xxx | code值 |
| 调用后端登录接口... | 开始请求后端 |
| 发起请求: ... | 请求的完整URL和参数 |
| 请求响应: ... | 后端返回的状态码和数据 |
| Token已保存 | 登录成功，token已存储 |
| 登录失败: ... | 登录过程中的错误 |

## 下一步

登录功能修复后，可以：
1. 对接真实的后端API
2. 添加用户信息展示
3. 实现退出登录功能
4. 添加自动刷新token机制
