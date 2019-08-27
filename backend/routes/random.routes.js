const router = require('express').Router();
const randomController = require('./../controller/random.controller');

router.post('/', randomController.getRandomNumber);


module.exports = router;