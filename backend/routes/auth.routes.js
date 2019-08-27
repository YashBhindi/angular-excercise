const router = require('express').Router();
const authController = require('./../controller/auth.controller');
const googleVerification = require('../config/google-token.config');

router.post('/login', authController.signIn);
router.post('/login-with-google', googleVerification,authController.signInWithGoogle);
router.post('/register-with-google', googleVerification,authController.registerWithGoogle);

router.post('/logout', authController.logout);
router.post('/refresh', authController.getToken);
router.post('/register', authController.register);




module.exports = router;