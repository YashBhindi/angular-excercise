

"use strict";
const jwt = require('jsonwebtoken');
const SECRET = 'VERY_SECRET_KEY!';
const randtoken = require('rand-token');
const {
    getUserByEmail,
    getUsers,
    addUser,
    getUserByRefreshToken,
    removeRefreshToken,
    addRefreshToken
} = require('./../models/user');
const validator = require('../utils/validation');
const {
    loginSchema,
    registerSchema
} = require('../utils/schemas');
class AuthController {

    static async signIn(req, res) {
        validator(req.body, loginSchema, async function (error, value) {
            if (error) {
                next(error);
            } else {
                const { u_email } = req.body;
                const user = await getUserByEmail(u_email);
                if (user) {
                    const userToken = {
                        'username': user.dataValues.u_email,
                        'role': user.dataValues.u_role
                    };
                    //todo compare user email and password
                    const token = jwt.sign(userToken, SECRET, { expiresIn: 600 })
                    const refreshToken = randtoken.uid(256);
                    const result = await addRefreshToken(user.dataValues.u_email, refreshToken);
                    if (result) {
                        res.json({ jwt: token, refreshToken: refreshToken });
                    } else {
                        let error = new Error();
                        error.code = 'NORECORD';
                        next(error);
                    }
                }
                else {
                    let error = new Error();
                    error.code = 'UNAUTHORIZEDACCESS';
                    next(error);
                }
            }
        });
    }


    static async signInWithGoogle(req, res, next) {

        const emailId = req.payload.email;
        req.payload = undefined;
        let user = await getUserByEmail(emailId);
        if (user) {
            user = user.dataValues;
            const userToken = {
                'username': user.u_email,
                'role': user.u_role
            };
            //todo compare user email and password
            const token = jwt.sign(userToken, SECRET, { expiresIn: 600 })
            const refreshToken = randtoken.uid(256);
            const result = await addRefreshToken(user.u_email, refreshToken);

            if (result) {
                res.json({ jwt: token, refreshToken: refreshToken });
            } else {
                let error = new Error();
                error.code = 'NORECORD';
                next(error);
            }
        }
        else {
            let error = new Error();
            error.code = 'UNAUTHORIZEDACCESS';
            next(error);
        }

    }

    static async logout(req, res, next) {
        const refreshToken = req.body.refreshToken;
        const user = await getUserByRefreshToken(refreshToken);
        if (user) {
            const signOut = await removeRefreshToken(refreshToken);
            if (signOut) {
                res.sendStatus(204);
            } else {
                let error = new Error();
                error.code = 'SEQFALSEINSERT';
                next(error);
            }
        } else {
            let error = new Error();
            error.code = 'NORECORD';
            next(error);
        }
    }

    static async getToken(req, res, next) {
        const { refreshToken } = req.body;
        const user = await getUserByRefreshToken(refreshToken);
        if (user) {
            const userToken = {
                'username': user.dataValues.u_email,
                'role': user.dataValues.u_role
            }
            const token = jwt.sign(userToken, SECRET, { expiresIn: 600 });
            res.json({ jwt: token })
        }
        else {
            let error = new Error();
            error.code = 'TOKENFALSE';
            next(error);
        }
    }

    static async register(req, res, next) {
        validator(req.body, registerSchema, async function (error, value) {
            if (error) {
                next(error);
            } else {
                const { u_name, u_email, u_password, u_role } = req.body;
                let userData = {
                    u_email: u_email,
                    u_name: u_name,
                    u_password: u_password,
                    u_role: u_role
                }
                const isUserExists = await getUserByEmail(u_email);
                if (!isUserExists) {
                    const user = await addUser(userData);
                    if (user) {
                        const userToken = {
                            'username': user.dataValues.u_email,
                            'role': user.dataValues.u_role
                        }
                        const token = jwt.sign(userToken, SECRET, { expiresIn: 600 });
                        const refreshToken = randtoken.uid(256);
                        const result = await addRefreshToken(user.dataValues.u_email, refreshToken);
                        if (result) {
                            res.json({ jwt: token, refreshToken: refreshToken });
                        } else {
                            let error = new Error();
                            error.code = 'TOKENFALSE';
                            next(error);
                        }
                    } else {
                        let error = new Error();
                        error.code = 'SEQFALSEINSERT';
                        next(error);
                    }
                }
                else {
                    let error = new Error();
                    error.code = 'NORECORD';
                    next(error);
                }
            }
        });
    }


    static async registerWithGoogle(req, res, next) {
        const u_email = req.payload.email;
        const u_name = req.payload.name;
        req.payload = undefined;

        let userData = {
            u_email: u_email,
            u_name: u_name,
            u_role: 'ADMIN'
        }
        const isUserExists = await getUserByEmail(u_email);
        if (!isUserExists) {
            const user = await addUser(userData);
            if (user) {
                const userToken = {
                    'username': user.dataValues.u_email,
                    'role': user.dataValues.u_role
                }
                const token = jwt.sign(userToken, SECRET, { expiresIn: 600 });
                const refreshToken = randtoken.uid(256);
                const result = await addRefreshToken(user.dataValues.u_email, refreshToken);
                if (result) {
                    res.json({ jwt: token, refreshToken: refreshToken });
                } else {
                    let error = new Error();
                    error.code = 'TOKENFALSE';
                    next(error);
                }
            } else {
                let error = new Error();
                error.code = 'SEQFALSEINSERT';
                next(error);
            }
        }
        else {
            let error = new Error();
            error.code = 'USERALREADYEXISTS';
            next(error);
        }
    }

}
module.exports = AuthController;