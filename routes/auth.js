import express from 'express';
import User from '../models/user';
import { checkAuth, responseHeader, HTTP_UNAUTHORIZED } from '../utls/apiUtils';
const Router = express.Router();

Router.post('/register', function (req, res, next) {
    let { username, email, password } = req.body;
    let response = {};
    let _res = res;
    User.create({ username, email, password }, (error, user) => {
        console.log(username, password, email, error);
        if (error) {
            _res.send({ OK: false, user: user, });
        } else {
            _res.send({ OK: true, user: user });
        }
    });
});

Router.post('/login', (req, res, next) => {
    let { username, password } = req.body;
    let _res = res;
    User.authenticate(username, password, (error, user, res) => {
        if (error || !user) {
            console.log('Callback user not found');
            let error = new Error('User not found');
            error.ok = false;
            error.status = HTTP_UNAUTHORIZED;
            error.message = 'Wrong email or password';
            return next(error);
        } else {
            console.log('User found');
            req.session.userId = user._id;
            return _res.send({ loginStatus: true, user: user });
        }
    })
});

Router.post('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                return next(error);
            } else {
                return res.send({ ok: true })
            }
        })
    }
});
Router.post('/testAuth', checkAuth, responseHeader, (req, res, next) => {
    return res.json({ result: [1, 2, 3, 4, 5] });
});
export default Router;