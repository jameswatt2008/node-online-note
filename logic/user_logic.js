var userDao = require('../model/user_dao');
var noteLogic = require('../logic/note_logic');

//登录业务逻辑
exports.login = function (req, res) {
    //得到用户名和密码
    var name = req.body.username;
    var pwd = req.body.userpwd;
    userDao.findUser(name, function (err, doc) {
        if (err)  return res.render('login.ejs', {res: '网络错误'});
        if (doc) {
            if (doc.pwd === pwd) {
                global.userId = doc._id;
                global.user = name;
                noteLogic.refreshPage(res);
            } else {
                res.render('login.ejs', {res: '用户名或密码错误！'});
            }
        } else {
            return res.render('login.ejs', {res: '用户不存在！'});
        }
    });
};

//注册业务逻辑
exports.regist = function (req, res) {
    var name = req.body.username;
    var pwd = req.body.userpwd;
    userDao.findUser(name, function (err, doc) {
        if (err) return res.render('regist.ejs', {res: '网络错误'});
        if (doc) {
            return res.render('regist.ejs', {res: '该用户已经存在！'});
        } else {
            userDao.addUser(name, pwd, function (err) {
                if (err) return res.render('regist.ejs', {res: '网络错误'});
                res.render('login.ejs', {res: '注册成功，快登陆吧！'});
            })
        }
    });
};

//登出的逻辑
exports.logout = function (req, res) {
    global.userId = null;
    global.user = null;
    res.redirect('/');
};