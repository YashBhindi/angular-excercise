

"use strict";
const jwt = require('jsonwebtoken');
const refreshTokens = {};

class RandomController {

    static async getRandomNumber(req, res) {
        res.json({ value: Math.floor(Math.random() * 100) });
    }
}
module.exports = RandomController;