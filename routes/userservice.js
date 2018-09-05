import express from 'express';
import User from '../models/user';
import { checkAuth, responseHeader, HTTP_UNAUTHORIZED, HTTP_RA_EXCEPTION } from '../utls/apiUtils';
import { asyncMiddleware } from '../const';
const UserService = express.Router();
UserService.post('/updateUser', checkAuth, responseHeader, (req, res, next) => {
    let userData = req.body.userData;
    let _res = res;
    User.updateById(userData, (error, user) => {
        if (error) {
            return next(error);
        } else {
            return _res.send({ ok: true, user: user });
        }
    });
});

UserService.post('/getUserData', checkAuth, responseHeader, (req, res, next) => {
    let { id } = req.body;
    let _res = res;
    User.findById(id)
        .exec((error, user) => {
            console.log('userdetails', error, user);
            if (error) {
                let err = new Error('User not found');
                err.status = HTTP_RA_EXCEPTION;
                next(err);
            } else {
                return _res.send({ ok: true, user: user });
            }
        });
});

UserService.post('/registerToken', checkAuth, responseHeader, asyncMiddleware(async (req, res, next) => {
    let { userId } = req.session;
    let { token } = req.body;
    try {
        let result = await User.findOneAndUpdate({ _id: userId }, { deviceToken: token }, { new: true }).exec();
        return res.send({ ok: true, result: result });
    } catch (error) {
        console.log(error);
        return next({ errorInfo: 'lol' });
    }
}));
export default UserService;