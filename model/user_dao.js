//引入包
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost:27017/shimonote');

//得到连接的数据库
var db = mongoose.connection;

//连接出错
db.on('error', function (err) {
    console.error(err);
});

//连接成功
db.once('open', function () {
    console.log('db connected');
});

//得到Schema
var Schema = mongoose.Schema;

//定义模式。 即设计collection中document的字段名。模式会映射到mongodb对应的collection
var userSchema = new Schema({
    name: String,
    pwd: String
});

//创建模型。 将定义的模式转换成我们可以使用的模型。参数一：collection 参数二：模式
var User = mongoose.model('user', userSchema);

//查找用户函数
exports.findUser = function (name, handler) {
    User.findOne({name: name}, function (err, doc) {
        handler(err, doc);
    });
};

//添加用户函数
exports.addUser = function (name, pwd, handler) {
    var user = new User({
        name: name,
        pwd: pwd
    });
    user.save(function (err) {
        handler(err);
    });
};
