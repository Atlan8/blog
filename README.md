## 1. 起步

```shell
git clone https://github.com/HsyangG/crud-express.git

npm install

```
## 2. 启动数据库服务
数据库是 MongoDB
```shell
mongod

mongo
```
## 3. 开启服务器
```shell
cd 项目所在文件目录

node app.js
```



## 4. 模板页

- 子模板 https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E5%AD%90%E6%A8%A1%E6%9D%BF

- 模板继承 https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF

##3. 路由设计

|   路径    | 方法 | get 参数 |         post 参数         | 是否需要权限 |     备注     |
| :-------: | :--: | :------: | :-----------------------: | :----------: | :----------: |
|     /     | GET  |          |                           |              |   渲染首页   |
| /register | GET  |          |                           |              | 渲染注册页面 |
| /register | POST |          | email、nickname、password |              | 处理注册请求 |
|  /login   | GET  |          |                           |              | 渲染登录页面 |
|  /login   | POST |          |      email、password      |              | 处理登录请求 |
| /llogout  | GET  |          |                           |              | 处理退出请求 |
|           |      |          |                           |              |              |
|           |      |          |                           |              |              |

## 5. 模型设计

## 6. 功能实现

## 7. 书写步骤

- 创建目录结构
- 整合静态页-模板页
  + include
  + block
  + extend
- 设计用户注册、登录、退出的路由
  + 客户端：
    * 先处理好页面内容（表单控件的 name、收集表单数据、发起请求）
  + 服务端：
    * 获取客户端表单请求数据
    * 操作数据库
    * 如果有错，发送 500 告诉客户端服务器错了
    * 其他根据自己的业务需求发送不同的响应数据
- 用户注册
- 用户登录用户退出
