const router = require('express').Router();
// const ballHandler = require('../controller/ballHandler');
const ballHandler = require('../controller/ballHandlerMongo');

router.get('/', ballHandler.getData);

router.post('/', ballHandler.makePredict)

router.use('/', ballHandler.badReq);

module.exports = router;
