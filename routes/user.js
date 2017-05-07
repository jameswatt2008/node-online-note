var router = require('express').Router();
var userLogic = require('../logic/user_logic');

router.post('/login', userLogic.login);

router.post('/regist', userLogic.regist);

router.get('/logout', userLogic.logout);

module.exports = router;

