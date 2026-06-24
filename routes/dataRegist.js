const { Router } = require('express');
const { dataPost,dataGet } = require('../Controllers/dataRegistController');
const db = require('../Controllers/database');

const router = Router();

router.post('/schedule',dataPost);

router.get('/schedule',dataGet);

module.exports = router;