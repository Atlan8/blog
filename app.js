let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let session = require('express-session')

let router = require('./router')

let app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前配置）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/**
 *  Express 这个框架不支持 Session 和 Cookie
 *  但我们可以使用第三方中间件：expres-session 来解决
 *  1. npm install express-session
 *  2. 配置（一定要在 router 之前配置）
 *  3. 使用
 *      把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 session 成员
 *      添加 Session 数据：req.session = 'bar'
 *      访问 Session 数据：req.session
 */
app.use(session({
    // secret 可以自定义，配置加密字符串，它会在原有的基础上加上这个字符串拼起来一起加密
    // 增加安全性，防止客户端恶意伪造session
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true // 无论你是否使用 Session，这里都默认给你分配一把钥匙
}))


// 把路由挂载到 app 中
app.use(router)

// 配置一个处理 404 的中间件
app.use(function (req, res) {
    res.render('404.html')
})

// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})

app.listen(5000, function () {
    console.log('Server is running...')
})
