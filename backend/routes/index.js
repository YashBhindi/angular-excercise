const express = require("express");
const authClassRoutes = require('./auth.routes');
const randomRoutes = require('./random.routes');
const passport = require('passport');
const router = express.Router();

// as strategy in ./passport.js needs passport object
require('./../config/passport.config'); 

router.use("/auth", authClassRoutes);
router.use("/random",passport.authenticate('jwt', { session: false }) ,randomRoutes);

module.exports = router;