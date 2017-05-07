//引入包
var mongoose = require('mongoose');
var tool = require('../utils/tool');

//得到Schema
var Schema = mongoose.Schema;

//定义便签的表头
var noteSchema = new Schema({
    userId: String, //关联用户
    body: String,
    post_date: String, //提交时间 添加时转换为
    finish_state: {type: Number, default: 0} //默认0（未完成） 完成（1）
});

//创建模型。 将定义的模式转换成我们可以使用的模型。参数一：collection 参数二：模式
var Note = mongoose.model('note', noteSchema);

//添加标签
exports.addNote = function (userId, body, handler) {
    var note = new Note({
        userId: userId,
        body: body,
        post_date: tool.formatDate()
    });

    note.save(function (err) {
        handler(err);
    })
};

//查找所有便签
exports.findNotes = function (userId, handler) {
    Note.find({userId: userId}, function (err, docs) {
        handler(err, docs);
    })
};

//设置便签状态
exports.updateState = function (noteId, state, handler) {
    Note.update({_id: noteId}, {finish_state: state}, function (err) {
        handler(err);
    })
};

//编辑便签
exports.editNote = function (noteId, handler) {
    Note.findById({_id: noteId}, function (err, doc) {
        handler(err, doc);
    })
};

//提交编辑便签
exports.commitEditNote = function (noteId, body, handler) {
    Note.update({_id: noteId}, {body: body}, function (err) {
        handler(err);
    })
};

//删除便签
exports.removeNote = function (noteId, handler) {
    Note.remove({_id: noteId}, function (err) {
        handler(err);
    })
};

