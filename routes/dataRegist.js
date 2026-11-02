const { Router } = require('express');
const { dataPost,dataGet, dataDeleteById, dataDeleteAll } = require('../Controllers/dataRegistController');
const db = require('../Controllers/database');

const router = Router();

router.post('/schedule',dataPost);

router.delete('/schedule/:id',dataDeleteById)

router.delete('/schedule/',dataDeleteAll);

router.get('/schedule',dataGet);

module.exports = router;