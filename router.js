let express = require('express')
let User = require('./models/user')

let md5 = require('blueimp-md5')

let router = express()

router.get('/', function (req, res) {
    res.render('index.html',{
        user: req.session.user
    })
})

router.get('/login', function (req, res, next) {
    res.render('login.html')
})
router.post('/login', function (req, res) {
    // 1. 获取表单数据
    // 2. 查询数据库用户名密码是否正确
    // 3. 发送响应数据
    let body = req.body

    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function (err, user) {
        if (err) {
            /*return res.status(500).json({
                err_code: 500,
                message: 'Server error.'
            })*/
            return next(err)
        }

        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or password is invalid.'
            })
        }

        // 登录成功，通过 Session 记录登录状态
        req.session.user = user

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})

router.get('/register', function (req, res, next) {
    res.render('register.html')
})

// async 是一种新的异步编程方式，需要结合 Promise
router.post('/register', function (req, res, next) {
    /**
     *  1. 获取表单提交的数据
     *      req.body
     *  2. 操作数据库
     *      判断该用户是否已存在
     *      如果已存在，不允许注册
     *      如果不存在，注册新建用户
     *  3. 发送响应
     */
    let body = req.body
    console.log(body)
    User.findOne({
        $or: [
            {
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]
    }, function (err, data) {
        if (err) {
            /*return res.status(500).json({
                err_code: 500,
                message: 'Server Error.'
            })*/
            return next(err)
        }
        console.log(data)
        if (data) {
            // 邮箱或者昵称已存在
            return res.status(200).json({
                // 这里的状态码用 success 不好判断，改用 err_code
                err_code: 1,
                message: 'Email or nickname already exists.'
            })
        }

        // 在这里的注册密码可能会被别人破解
        // 所以使用 md5 进行加密两次
        body.password = md5(md5(body.password))

        new User(body).save(function (err, user, next) {
            if (err) {
                /*return res.status(500).json({
                    err_code: 500,
                    message: 'Server Error.'
                })*/
                return next(err)
            }

            // 注册成功，使用 Session 记录用户的登录状态
            req.session.user = user

            // Express 提供一个响应方法： json
            // 该方法接收一个对象作为参数，它会自动转换成字符串再发送给浏览器
            res.status(200).json({
                err_code: 0,
                message: 'OK'
            })
        })
    })
})

router.get('/logout', function (req, res) {
    // 清除登录状态
    req.session.user = null

    // 重定向到登录页
    res.redirect('/login')
})

/*
router.post('/register', function (req, res) {
    let body = req.body
    try {
        if (await User.findOne({email: body.email})) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱已存在'
            })
        }

        if (await User.findOne({nickname: body.nickname})) {
            return res.status.json({
                err_code: 2,
                message: '昵称已存在'
            })
        }

        // 对密码进行 md5 加密
        body.password = md5(md5(body.password))

        // 创建用户，执行注册
        await new User(body).save()

        // 注册成功，使用 Session 记录用户登录状态
        req.session.user = user

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    } catch (err) {
        res.status(500).json({
            err_code: 500,
            message: 'Server error.'
        })
    }
}
 */
module.exports = router
