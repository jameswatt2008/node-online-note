var router = require('express').Router();
var noteLogic = require('../logic/note_logic');

router.post('/add', noteLogic.add);

router.get('/remove/:id', noteLogic.remove);

router.get('/finish/:id', noteLogic.update);

router.get('/edit/:id', noteLogic.edit);

router.post('/commitEdit/:id', noteLogic.commitEdit);

module.exports = router;

