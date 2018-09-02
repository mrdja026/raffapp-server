import express from 'express';
import { checkAuth, responseHeader } from '../utls/apiUtils';
import { uploadAsset } from '../utls/cloudinaryUtils';
import User from '../models/user';

let AssetsRouter = express.Router();

AssetsRouter.post('/avatar', checkAuth, responseHeader, (req, res, next) => {
    let { type, b64, userId } = req.body.data;
    console.log('USER ID', userId);
    let base64String = 'data:' + type + ';base64,' + b64;
    let _res = res;
    uploadAsset(base64String, null, (error, result) => {
        if (error) {
            return next(error);
        } else {
            let userData = {
                id: userId,
                avatarUri: result.url,
            }
            User.updateById(userData, (error, user) => {
                console.log('User error', error, user);
                if (error) {
                    return next(error);
                } else {
                    return _res.send({ ok: true, user: user });
                }
            });
            //return _res.send({ ok: true, url: result.url })
        }
    })
});

AssetsRouter.post('/media', checkAuth, responseHeader, (req, res, next) => {
    let { b64, type } = req.body;
    
})

export default AssetsRouter;