var noteDao = require('../model/note_dao');

//添加便签方法
exports.add = function (req, res) {
    //判断用户是否登录
    if (!global.userId) {
        return res.render('login.ejs', {res: '登录后才能使用便签'});
    }

    //添加便签逻辑
    noteDao.addNote(global.userId, req.body.notebody, function (err) {
        if (err) {
            res.send('网络错误，便签添加失败！');
        } else {
            refreshPage(res);
        }
    });
};

//刷新页面
function refreshPage(res) {
    noteDao.findNotes(global.userId, function (err, docs) {
        if (err) return res.send('查询所有 网络错误');
        if (docs) {
            res.render('notes.ejs', {user: global.user, docs: docs});
        } else {
            return res.send('没找到便签记录');
        }
    })
}
exports.refreshPage = refreshPage;

//设置便签状态为完成
exports.update = function (req, res) {
    var state = req.query.state === 'yes' ? 1 : 0;
    noteDao.updateState(req.params.id, state, function (err) {
        if (err) return res.send('网络错误');
        //更新页面
        return refreshPage(res);
    })
};

//编辑便签
exports.edit = function (req, res) {
    //编辑便签的模板不是和显示标签同一个，所以需要查出全部标签，然后传进模板做显示。
    noteDao.findNotes(global.userId, function (err, docs) {
        if (err) return res.send('查询所有 网络错误');
        if (docs) {
            noteDao.editNote(req.params.id, function (err, doc) {
                if (err) return res.send('网络错误');
                if (doc) {
                    return res.render('edit.ejs', {user: global.user, docs: docs, noteId: doc._id, body: doc.body});
                } else {
                    return res.send('网络错误');
                }
            })
        } else {
            return res.send('没找到便签记录');
        }
    });
};

//提交编辑的便签
exports.commitEdit = function (req, res) {
    noteDao.commitEditNote(req.params.id, req.body.notebody, function (err) {
        if (err) return res.send('网络错误');
        refreshPage(res);
    })
};

//删除便签
exports.remove = function (req, res) {
    noteDao.removeNote(req.params.id, function (err) {
        if (err) return res.send('网络错误');
        refreshPage(res);
    });
};

