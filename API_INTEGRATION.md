# 接口对接说明

## 已接入的接口

### ✅ 1. 登录模块

#### 微信小程序登录
- **接口**: `POST /api/student/login`
- **页面**: `pages/login/login.vue`
- **功能**: 用户点击登录按钮，获取微信code并发送到后端，保存返回的token和userId

**数据流**:
```
用户点击登录 → 获取微信code → 调用login(code) → 保存token → 跳转首页
```

---

### ✅ 2. 作业列表

#### 查看作业列表
- **接口**: `GET /api/students/assignment/{classId}`
- **页面**: `pages/index/index.vue`
- **功能**: 页面加载时自动获取作业列表，支持下拉刷新

**数据转换**:
```javascript
后端返回:
{
  id: 101,
  title: "2026考研数学模拟一",
  status: 0,  // 0-待完成, 1-已完成
  deadline: "2026-02-01 23:59:59",
  totalScore: 100
}

转换为页面格式:
{
  id: 101,
  title: "2026考研数学模拟一",
  status: 'pending',  // pending/completed
  statusText: '待完成',
  submitTime: "2026-02-01 23:59:59",
  subject: '数学',  // 从标题提取
  score: null
}
```

---

### ✅ 3. 作业详情

#### 查看作业详情（题目列表）
- **接口**: `GET /api/students/work/{assignmentId}`
- **页面**: `pages/detail/detail.vue`
- **功能**: 根据作业ID加载题目列表，展示作业内容

**数据转换**:
```javascript
后端返回题目数组:
[
  {
    id: 1,
    questionId: 1001,
    content: "下列函数中，在x=0处不可导的是？",
    options: {
      "A": "y=x",
      "B": "y=x^2",
      "C": "y=|x|",
      "D": "y=x^3"
    }
  }
]

转换为作业内容文本:
1. 下列函数中，在x=0处不可导的是？
A. y=x
B. y=x^2
C. y=|x|
D. y=x^3
```

---

### ✅ 4. 提交作业

#### 提交作业
- **接口**: `POST /api/students/submissions`
- **页面**: `pages/grading/grading.vue`
- **功能**: 学生填写答案后提交作业

**请求数据格式**:
```javascript
{
  assignmentId: 101,
  studentId: 1,
  details: [
    {
      questionId: 1,
      answer: "A",
      answerContent: "这是答案内容"
    },
    {
      questionId: 2,
      answer: "B",
      answerContent: "这是答案内容"
    }
  ]
}
```

---

### ✅ 5. 用户信息

#### 获取个人信息
- **接口**: `GET /api/student/getUserInfo`
- **页面**: `pages/mine/mine.vue`
- **功能**: 加载并显示学生个人信息，支持退出登录

**数据使用**:
```javascript
后端返回:
{
  id: 1,
  username: "student001",
  name: "张三",
  avatar: "https://example.com/avatar.jpg"
}

页面显示:
- 姓名: name 或 username
- 学号: id
```

---

## 🔧 配置说明

### 1. API地址配置
文件: `config/index.js`

```javascript
// 开发环境（本地测试）
const DEV_BASE_URL = 'http://192.168.190.160:8080'

// 生产环境（线上部署）
const PROD_BASE_URL = 'https://your-api-domain.com'
```

### 2. 默认班级ID
文件: `pages/index/index.vue`

```javascript
data() {
  return {
    classId: 1  // 修改为实际的班级ID
  }
}
```

---

## 📋 待接入的接口

### ❌ 1. 加入班级
- **接口**: `POST /api/student/joinClass`
- **说明**: 需要创建加入班级的页面

### ❌ 2. 查看作业批改结果
- **接口**: `GET /api/students/result`
- **说明**: 需要在作业详情页展示批改结果

---

## 🔍 调试技巧

### 1. 查看请求日志
所有请求都会在控制台输出日志：
```
发起请求: http://192.168.190.160:8080/api/students/assignment/1 GET
请求响应: http://192.168.190.160:8080/api/students/assignment/1 200 {code: 200, ...}
```

### 2. 检查Token
```javascript
// 在控制台执行
console.log('Token:', uni.getStorageSync('token'))
console.log('UserId:', uni.getStorageSync('userId'))
```

### 3. 清除登录状态
```javascript
// 在控制台执行
uni.clearStorageSync()
```

---

## ⚠️ 注意事项

### 1. 微信开发者工具设置
- 勾选"不校验合法域名"
- 否则无法访问本地API

### 2. Token自动管理
- 所有请求自动携带 `Authorization: Bearer {token}`
- 401状态自动跳转登录页

### 3. 数据格式
- 后端返回的status: 0-待完成, 1-已完成
- 前端使用: 'pending'-待完成, 'completed'-已完成

### 4. 用户ID获取
```javascript
import { getUserId } from '@/utils/auth.js'
const userId = getUserId()
```

---

## 📝 接口调用示例

### 示例1: 加载作业列表
```javascript
import { getAssignmentList } from '@/api/student.js'

async loadData() {
  try {
    const result = await getAssignmentList(1)  // classId=1
    if (result.code === 200) {
      console.log('作业列表:', result.data)
    }
  } catch (error) {
    console.error('加载失败:', error)
  }
}
```

### 示例2: 提交作业
```javascript
import { submitAssignment } from '@/api/student.js'
import { getUserId } from '@/utils/auth.js'

async submit() {
  const data = {
    assignmentId: 101,
    studentId: getUserId(),
    details: [
      {
        questionId: 1,
        answer: "A",
        answerContent: "答案内容"
      }
    ]
  }
  
  const result = await submitAssignment(data)
  if (result.code === 200) {
    console.log('提交成功')
  }
}
```

---

## 🎯 下一步

1. 测试所有已接入的接口
2. 根据实际返回数据调整数据转换逻辑
3. 接入剩余的接口（加入班级、批改结果）
4. 完善错误处理和用户提示
