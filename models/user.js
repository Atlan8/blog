let mongoose = require('mongoose')
let Schema = mongoose.Schema

// 连接数据库，这个数据库不用存在
// 当插入第一条数据的时候会自动创建
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });

let userScheama = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        // 注意，这里不能写成 Date.now()，因为这样会立即调用这个函数
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-max-img.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        /**
         *  0 没有权限限制
         *  1 不能评论
         *  2 不能登录
         */
        enum: [0, 1, 2],
        default: 0
    }
})

module.exports = mongoose.model('User', userScheama)
